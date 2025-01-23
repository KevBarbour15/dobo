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
  console.log("stripe webhook hit");
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
  console.log("event: ", event.type);

  switch (event.type) {
    case "checkout.session.completed":
      updateEventSeats(eventMetadata, session)
        .then(() => {
          res.json({ received: true });
        })
        .catch((error) => {
          res.status(500).send();
          console.error("Error decrementing seat:", error);
        });
      break;

    case "charge.refund.updated":
      // Only process if refund status is succeeded
      console.log("session", session);
      if (session.status === "succeeded") {
        console.log("refund succeeded");
        updatePaymentDetails(session)
          .then(() => {
            res.json({ received: true });
          })
          .catch((error) => {
            res.status(500).send();
            console.error("Error processing refund:", error);
          });
      } else {
        res.json({ received: true }); // Acknowledge but don't process other statuses
      }
      break;

    default:
      //console.log(`Unhandled event type ${event.type}`);
      res.send();
  }
});

// adjust event seats and create attendee
async function updateEventSeats(eventMetadata, session) {
  try {
    const event = await Event.findById(eventMetadata.eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    const attendee = {
      eventId: eventMetadata.eventId,
      firstName: eventMetadata.firstName,
      lastName: eventMetadata.lastName,
      email: eventMetadata.email,
      seats: eventMetadata.seats,
      message: eventMetadata.message,
      status: "Confirmed",
      winePairings: eventMetadata.winePairings,
      totalPayment: eventMetadata.totalPrice,
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
      $inc: {
        totalPayment: eventMetadata.totalPrice,
        winePairings: eventMetadata.winePairings,
        seatsRemaining: -eventMetadata.seats,
      },
    });
  } catch (error) {
    throw error;
  }
}

// handle payment related updates
async function updatePaymentDetails(session) {
  try {
    // Add refund tracking to prevent double processing
    const paymentIntent = await stripe.paymentIntents.retrieve(
      session.payment_intent
    );
    const paymentMetadata = paymentIntent.metadata;

    const attendee = await Attendee.findById(paymentMetadata.attendeeId);
    if (!attendee) {
      throw new Error("Attendee not found");
    }

    const event = await Event.findById(paymentMetadata.eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    event.totalPayment -= session.amount / 100;
    attendee.totalPayment -= session.amount / 100;

    await event.save();
    await attendee.save();
  } catch (error) {
    throw error;
  }
}

module.exports = router;
