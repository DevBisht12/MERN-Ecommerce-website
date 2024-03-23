import React from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IoMdMenu } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useState } from "react";
import UserDropDownMenu from "./DropDownMenu.jsx";
import { useSelector } from "react-redux";

import "../../style/Header.css";

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };
  const closetoggleMenu = () => {
    setOpen(false);
  };
  const cartItems = useSelector((state) => state.cart.cartItem);

  return (
    <header>
      <div className="header">
        <div className="left_section">
          <p>
            <strong>New Arrival</strong>
          </p>
          <Link
            style={{ color: "black", textDecoration: "none" }}
            to="/view-all-products"
          >
            <p>
              <strong>All Product</strong>
            </p>
          </Link>
          <p>
            <strong>About Us</strong>
          </p>
          <p>
            <strong>Contact Us</strong>
          </p>
        </div>
        <div className="logo">
          <h1>
            <Link to="/" style={{ color: "black", textDecoration: "none" }}>
              LoGo
            </Link>
          </h1>
        </div>
        <div className="right_section">
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Search Products"
              style={{ paddingRight: "30px" }}
            />
            <IoMdSearch
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
              }}
            />
          </div>
          <UserDropDownMenu />
          <div className="cart_section">
            {cartItems.length === 0 ? null : <span>{cartItems.length}</span>}
            <Link to="/cart">
              <ShoppingBagIcon />
            </Link>
          </div>
        </div>
      </div>
      <div className="hamburger_menu">
        <Link to="/">
          <h1>LoGo</h1>
        </Link>
        <div className="side_menu">
        <div className="cart_section">
            {cartItems.length === 0 ? null : <span>{cartItems.length}</span>}
            <Link to="/cart">
              <ShoppingBagIcon />
            </Link>
          </div>  
          <UserDropDownMenu id="userIcon" />
          <IoMdMenu id="menu" onClick={toggleMenu} />
          {open && (
            <div className="menu open">
              <RxCross2 id="RxCross2" onClick={closetoggleMenu} />
              <p>
                <strong>New Arrival</strong>
              </p>
              <Link to="view-all-products">
                <p>
                  <strong>All Product</strong>
                </p>
              </Link>
              <p>
                <strong>About Us</strong>
              </p>
              <p>
                <strong>Contact Us</strong>
              </p>
              <input type="text" placeholder="Search product..." />
              <button>Log Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
