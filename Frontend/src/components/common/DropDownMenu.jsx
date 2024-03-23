import * as React from "react";
import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logoutUser } from "../../Redux/features/userSlice";  
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom"; 


export default function UserDropDownMenu() {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.user);

  
    return (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { color: "neutral" } }}
        >
          <AccountCircleIcon />
        </MenuButton>
        <Menu>
          <MenuItem>{isAuthenticated ? `Hello ${user.name}` : "Guest"}</MenuItem>
          <MenuItem>{isAuthenticated ?
          <Link to="/my-orders" >My Orders</Link>: "All Products"}</MenuItem>
          {isAuthenticated==true ? (
            <MenuItem onClick={() => dispatch(logoutUser())}>Log out</MenuItem>
          ) : (
            <MenuItem>
              <Link to="/log-In">Log in</Link>
            </MenuItem>
          )}
        </Menu>
      </Dropdown>
    );
  }
  