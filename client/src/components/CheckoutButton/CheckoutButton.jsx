import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../../axiosConfig.jsx";

const stripePromise = loadStripe(
  "pk_test_51O5vqNFi2BcJnxIL47ZUyAwJpQRJMyhiqXQjeqXfdxTA8dGBJ4ZtLmG6AHVrccjF3mlVYzIiEn13KjjmurFncbQI00xalBaqon"
);

/*
  Stripe Test Card Numbers:
  Successful charge: 4242 4242 4242 4242
  Unsuccessful charge: 4000 0000 0000 9995
  Authentication Required: 4000 0027 6000 3184

  Expiration, CVC and Zip can be anything
*/

const CheckoutButton = ({ eventId, attendee }) => {
  const handleClick = async () => {
    try {
      const { data: session } = await axios.post(
        "/checkout/create-checkout-session",
        { eventId, attendee }
      );

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error("Stripe redirect error:", result.error);
        alert(result.error.message);
      }
    } catch (error) {
      // Improved error handling
      console.error("Error during checkout:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred";
      alert(`Checkout error: ${errorMessage}`);
    }
  };

  return (
    <button className="checkout-button" role="link" onClick={handleClick}>
      Purchase Ticket
    </button>
  );
};

export default CheckoutButton;
