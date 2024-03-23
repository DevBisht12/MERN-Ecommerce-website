import React from "react";
import "../style/CartItem.css";
import DeleteIcon from '@mui/icons-material/Delete';
import {
  updateCartItem,
  removeFromCart,
} from "../Redux/features/addtoCartSlice";
import IconButton from "@mui/joy/IconButton";
import { useDispatch } from "react-redux";

const CartItem = ({ Product, imgSrc, productName, price, size, quantity }) => {
  const dispatch = useDispatch();

  const handleQuantity = (e) => {
    dispatch(updateCartItem({ Product, quantity: e.target.value }));
  };
  const deleteFromCart = (Product) => {
    dispatch(removeFromCart({ Product }));
  };

  // currency formatter
  const formatedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(price);

  return (
    <div className="cartItem">
      <img src={imgSrc} alt="" />
      <div className="cartItem_details">
        <strong>
          <p>{productName}</p>
        </strong>
        <p>{formatedPrice}</p>
        <div className="product_details" id="product_id" >
          <p>color:Black</p>
          <p>size:{size}</p>
          <p>Total{formatedPrice}</p>
        </div>
        <select id="opations" onChange={handleQuantity}>
          <option value="default" selected>
            {quantity}
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <IconButton onClick={()=>deleteFromCart(Product)} >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default CartItem;
