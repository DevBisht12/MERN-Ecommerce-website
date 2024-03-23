import { useState } from "react";
import { useSelector } from "react-redux"
import { loadStripe } from "@stripe/stripe-js";
import Cookies from 'js-cookie';
const PUBLISHABLE_KEY ="pk_test_51OsfqASBx2TO3YR25toRQSvQYVVGVQeSzTbZmMRQMj1d6HTKCMHEA2NoCEEzN933mzAAWWFxQUjJ2VdYNmQVYi4A00KbfNC5N4";
const stripePromise = loadStripe(PUBLISHABLE_KEY); 
import '../style/ConfirmOrder.css'


const ConfirmOrder=()=>{

    const{user}=useSelector(state=>state.user);
    const{shippingAddress}=useSelector(state=>state.shippingAddress);


    const [error, setError] = useState(null);
    const{cartItem}=useSelector(state=>state.cart);




    const subTotal=cartItem.map(item=>item.price*item.quantity).reduce((a, b) => a + b, 0);
    const shippingPrice = subTotal > 500 ? 0 : 300;
    const GST = 0;

    const Total=subTotal+shippingPrice+GST;

    const handlePayment = async () => {
        const stripe = await stripePromise;
    
        try {
          if (cartItem && cartItem.length > 0) {
            const response = await fetch(
              "http://localhost:5000/checkout/payment/process",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  items: cartItem.map((product) => ({
                    name: product.name,
                    price: product.price,
                    quantity: product.quantity
                  })),
                  customer:{
                    name:user.name,
                    address:{
                      line1:shippingAddress.address,
                      city:shippingAddress.city,
                      state:shippingAddress.state,
                      postal_code:shippingAddress.pinCode,
                      country: 'US'
                    }
                  }
                }),
              }
            );
    
            const session = await response.json();
            Cookies.set('sessionId', session.sessionId);
            const result = await stripe.redirectToCheckout({
              sessionId: session.sessionId,
            });
            
            if (result.error) {
              setError(result.error.message);
             }
          } else {
          }
        } catch (error) {
          console.error("Error:", error);
          setError("Failed to process payment");
        }
      };

    
    return(
        <div className="confirmOrder">
            <div className="confirmOrder_left" >
                <div className="Shipping_info">
                    <h2>Shipping Info</h2>
                    <div className="Shipping_main">
                    <p><strong>Name: </strong>{user.name} </p>
                    <p><strong>Email: </strong>{user.email}</p>
                    <p><strong>Phone: </strong>{shippingAddress.phone}</p>
                    <p><strong>Address: </strong>{shippingAddress.address}</p>
                    </div>
                </div>
                <div className="cartItem_main">
                    <h2>Your Cart Items</h2>
                    <div className="CartItems">
                    
                        {cartItem ? cartItem.map((item) => (
                            <div className="CartItem">
                                
                                    <img src={item.image} alt="" srcset="" />
                                    <p>{item.name}</p>
                                
                                <p>{item.quantity}X{item.price}= <strong>{Intl.NumberFormat("en-US",{style: "currency",currency: "INR"}).format(item.quantity*item.price)}</strong></p>
                            </div>    
                        )) : null}
                    
                    </div>
                </div>
            </div>
            <div className="confirmOrder_Summery">
                <h2>Order Summery</h2>
                <hr />
                <div className="Summery_main">
                    <p>Subtotal: <span>{Intl.NumberFormat("en-US",{style: "currency",currency: "INR"}).format(subTotal)}</span> </p>
                    <p>Shipping Charges: <span>{shippingPrice}</span>  </p>
                    <p>GST: <span>18%</span> </p>
                  </div>
                <hr />
                <p>Total <strong>{Intl.NumberFormat("en-US",{style: "currency",currency: "INR"}).format(Total)}</strong></p>
                <button onClick={handlePayment} >Proceed To Payment</button>
            </div>
        </div>
    )
}

export default ConfirmOrder
