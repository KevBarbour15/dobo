require("dotenv").config();
const express = require("express");
const router = express.Router();
const Event = require("../schemas/eventInfo");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const baseUrl = process.env.BASE_URL;

router.post("/create-checkout-session", async (req, res) => {
  const { eventId, attendee } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    console.log("Found event: " + event._id);
    console.log("Attendee: " + attendee);

    const eventName = "Dobo NYC " + event.date;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: eventName,
            },
            unit_amount: event.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/attend`,
      cancel_url: `${baseUrl}/attend`,
      metadata: { eventId: eventId },
      payment_intent_data: {
        metadata: { eventId: eventId, attendee: attendee },
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: "Error creating checkout session" });
  }
});

module.exports = router;
