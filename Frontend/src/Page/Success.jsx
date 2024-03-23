import {  useEffect, useRef,useState } from "react";
import { Link } from "react-router-dom";
import { createOrder } from "../Redux/features/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Redux/features/addtoCartSlice.js";

import "../style/Success.css";

const Success = () => {
  const dispatch = useDispatch();
  const orderCreated = useRef(false);
  const { shippingAddress } = useSelector((state) => state.shippingAddress);
  const { cartItem  } = useSelector((state) => state.cart);
  console.log(cartItem)
  

  const subTotal = cartItem
    .map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b, 0);

  const shippingPrice = subTotal > 500 ? 0 : 300;
  const GST = 0;

  const Total = subTotal + shippingPrice + GST;

  const Order = {
    shippingInfo: shippingAddress,
    orderItems: cartItem,
    taxPrice: GST,
    shippingPrice: shippingPrice,
    totalPrice: Total,
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/checkout/payment/success",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();

        if (data.success && !orderCreated.current) {
          const paymentInfo = {
            id: data.payment.id,
            status: data.payment.status,
          };
          dispatch(createOrder({ ...Order, paymentInfo }));
          dispatch(clearCart())
          orderCreated.current = true;
        }
      } catch (error) {
      }
    };

    fetchOrder();
  }, []);

   return (
    <div className="success">
      <div class="success-checkmark">
        <div class="check-icon">
          <span class="icon-line line-tip"></span>
          <span class="icon-line line-long"></span>
          <div class="icon-circle"></div>
          <div class="icon-fix"></div>
        </div>
      </div>
      <p>
        <strong>Your order has been successfully placed!</strong>
      </p>
      <span className="sub_message">
        Thank you for shopping with us. Your product will be shipped to you
        shortly.
      </span>
      <Link to="/view-all-products">
        <button>
          Continue Shopping
        </button>
      </Link>
    </div>
  );
};


export default Success;