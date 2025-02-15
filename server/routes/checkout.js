require("dotenv").config();
const express = require("express");
const router = express.Router();
const Event = require("../schemas/eventInfo");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const baseUrl = process.env.BASE_URL;

router.post("/create-checkout-session", async (req, res) => {
  const { attendee } = req.body;
  try {
    const event = await Event.findById(attendee.selectedEventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const eventName = "Dobo NYC " + attendee.date + " at " + attendee.time;

    let totalPrice = event.price * 100 * attendee.seats;
    const winePairingPrice = 40 * 100 * attendee.winePairings;

    // multiply by 100 to convert to cents for stripe
    totalPrice = totalPrice + winePairingPrice;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: eventName,
            },
            unit_amount: totalPrice,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/attend`,
      metadata: {
        eventPrice: event.price,
        totalPrice: totalPrice / 100,
        winePairings: attendee.winePairings,
        eventId: attendee.selectedEventId,
        firstName: attendee.firstName,
        lastName: attendee.lastName,
        email: attendee.email,
        seats: attendee.seats,
        message: attendee.message,
      },
      payment_intent_data: {
        metadata: {
          eventPrice: event.price,
          totalPrice: totalPrice / 100,
          winePairings: attendee.winePairings,
          eventId: attendee.selectedEventId,
          firstName: attendee.firstName,
          lastName: attendee.lastName,
          email: attendee.email,
          seats: attendee.seats,
          message: attendee.message,
        },
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Checkout session error:", error.message);
    console.error("Full error:", error);
    res.status(500).json({
      error: "Error creating checkout session",
      message: error.message,
    });
  }
});

module.exports = router;
