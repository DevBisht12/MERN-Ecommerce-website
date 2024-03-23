import { useEffect,useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "../src/components/common/Header.jsx";
import Home from "../src/Page/Home.jsx";
import Cart from "../src/Page/Cart.jsx";
import Footer from "../src/components/common/Footer.jsx";
import LogIn from "../src/Page/LogIn.jsx";
import AllProducts from "../src/Page/AllProducts.jsx";
import SignUp from "./Page/SignUp.jsx";
import Shipping from "./Page/Shipping.jsx";
import ProductDetails from "../src/Page/ProductDetail.jsx";
import { getUserDetails} from "./Redux/features/userSlice.js";
import { useSelector, useDispatch} from "react-redux";
import ConfirmOrder from "./Page/ConfirmOrder.jsx";
import Success from "./Page/Success.jsx";
import Payment from "./Page/Payment.jsx";
import MyOrders from "./Page/MyOrders.jsx";
import AlertWithDecorators from "./components/common/Alert.jsx";
import "./App.css";


function App() {

  return (
    <BrowserRouter>
      <RoutesWithHeaderAndFooter />
    </BrowserRouter>
  );
}

function RoutesWithHeaderAndFooter() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const [showAlert, setShowAlert] = useState(false);


  async function getStripeKey() {
    const response =await fetch("http://localhost:5000/checkout/stripeApiKey",{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const {api_key} = await response.json();
  }
  


  
  useEffect(() => {
    dispatch(getUserDetails());
    getStripeKey();
  }, []);

  useEffect(() => {
    setShowAlert(true);
    const timer = setTimeout(() => setShowAlert(false), 3000); 
    return () => clearTimeout(timer);
  }, [user]);



  return (
    <>
      {location.pathname !== "/log-In" && location.pathname !== "/sign_up" && location.pathname !=="/shipping" && (
        <Header />
      )}

      {showAlert && (
        <AlertWithDecorators
          message={isAuthenticated ? `Welcome ${user.name}` : 'Logout Successfully'}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view-all-products" element={<AllProducts />} />
        <Route path="/view-all-products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/log-In" element={<LogIn />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/confirmOrder" element={<ConfirmOrder/>} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/success" element={<Success/>} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
      {location.pathname !== "/log-In" && location.pathname !== "/sign_up" && location.pathname !=="/shipping" && (
        <Footer />
      )}
    </>
  );
}

export default App;