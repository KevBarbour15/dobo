import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../../axiosConfig.jsx";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

/*
  Stripe Test Card Numbers:
  Successful charge: 4242 4242 4242 4242
  Unsuccessful charge: 4000 0000 0000 9995
  Authentication Required: 4000 0027 6000 3184

  Expiration, CVC and Zip can be anything
*/

const CheckoutButton = ({ attendee }) => {
  const handleClick = async () => {
    try {
      const { data: session } = await axios.post(
        "/checkout/create-checkout-session",
        { attendee }
      );

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error("Stripe redirect error:", result.error);
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred";
      throw new Error(errorMessage);
    }
  };

  return (
    <button className="checkout-button" role="link" onClick={handleClick}>
      Checkout
    </button>
  );
};

export default CheckoutButton;
