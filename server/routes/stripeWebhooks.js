require("dotenv").config();
const express = require("express");
const router = express.Router();
const Event = require("../schemas/eventInfo");
const Attendee = require("../schemas/attendees");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET;

// to test locally: stripe listen --forward-to localhost:3001/webhook/update
// then update the endpoint in the .env file

// stripe trigger checkout.session.completed
// stripe trigger charge.refunded

router.post("/update", (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, ENDPOINT_SECRET);
  } catch (err) {
    console.log("Error", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  const session = event.data.object;
  const eventMetadata = session.metadata;

  switch (event.type) {
    case "checkout.session.completed":
      updateEventSeats("success", eventMetadata, session)
        .then(() => {
          res.json({ received: true });
        })
        .catch((error) => {
          res.status(500).send();
          console.error("Error decrementing seat:", error);
        });
      break;

    case "charge.refunded":
      break;
      const charge = event.data.object;

      stripe.paymentIntents
        .retrieve(charge.payment_intent)
        .then((paymentIntent) => {
          if (eventMetadata.eventId) {
            updateEventSeats("refund", eventMetadata, session)
              .then(() => {
                console.log("Seat incremented successfully due to refund!");
                res.json({ received: true });
              })
              .catch((error) => {
                console.error("Error incrementing seat:", error);
                res.status(500).send();
              });
          } else {
            console.error("Event ID not found in metadata.");
            res.status(500).send("Metadata not found");
          }
        })
        .catch((err) => {
          console.error("Error retrieving PaymentIntent:", err);
          res.status(500).send("Error retrieving PaymentIntent");
        });
      break;

    default:
      //console.log(`Unhandled event type ${event.type}`);
      res.send();
  }
});

// adjust event seats accordingly
async function updateEventSeats(type, eventMetadata, session) {
  try {
    const event = await Event.findById(eventMetadata.eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    if (type === "success") {
      event.seatsRemaining -= eventMetadata.seats;

      const attendee = {
        eventId: eventMetadata.eventId,
        firstName: eventMetadata.firstName,
        lastName: eventMetadata.lastName,
        email: eventMetadata.email,
        seats: eventMetadata.seats,
        message: eventMetadata.message,
        status: "Confirmed",
      };

      const newAttendee = new Attendee(attendee);
      const savedAttendee = await newAttendee.save();

      await stripe.paymentIntents.update(session.payment_intent, {
        metadata: {
          ...eventMetadata,
          attendeeId: savedAttendee._id.toString(),
        },
      });

      await Event.findByIdAndUpdate(eventMetadata.eventId, {
        $push: { attendees: savedAttendee._id },
      });
    } else if (type === "refund") {
      const attendee = await Attendee.findOne({
        eventId: eventMetadata.eventId,
        status: "Confirmed",
      });

      if (!attendee) {
        throw new Error("Attendee not found");
      }

      event.seatsRemaining += parseInt(attendee.seats);
      console.log("Added " + attendee.seats + " seats back to event");

      attendee.status = "Refunded";
      await attendee.save();

      await Event.findByIdAndUpdate(eventMetadata.eventId, {
        $pull: { attendees: attendee._id },
      });
    }

    await event.save();
  } catch (error) {
    throw error;
  }
}

module.exports = router;
