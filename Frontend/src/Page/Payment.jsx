import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
const PUBLISHABLE_KEY='pk_test_51OsfqASBx2TO3YR25toRQSvQYVVGVQeSzTbZmMRQMj1d6HTKCMHEA2NoCEEzN933mzAAWWFxQUjJ2VdYNmQVYi4A00KbfNC5N4'
import { useSelector } from "react-redux";

const stripePromise = loadStripe(PUBLISHABLE_KEY); 

const Payment = () => {
  const [error, setError] = useState(null);
  const cartItem = useSelector((state) => state.cart.cartItem);

  const handlePayment = async () => {
    const stripe = await stripePromise;
  
    try {
      if (cartItem && cartItem.length > 0) {
        const response = await fetch('http://localhost:5000/checkout/payment/process', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials:'include',
          body: JSON.stringify({
            items: cartItem.map((product) => ({
              name: product.name,
              price: product.price,
              quantity: product.Quantity,
            })),
          }),
        });
  
        const session = await response.json();
  
        const result = await stripe.redirectToCheckout({
          sessionId: session.sessionId,
        });
  
        if (result.error) {
          setError(result.error.message);
        }
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to process payment');
    }
  };
  

  return (
    <div>
      <button onClick={handlePayment}>Pay Now</button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Payment;


