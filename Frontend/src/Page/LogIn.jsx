import React, { useState,useEffect} from "react";
import { Link ,useNavigate } from "react-router-dom";
import "../style/LogIn.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { loginUser } from "../Redux/features/userSlice";
import { useDispatch,useSelector } from "react-redux";

const LogIn = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [Error, setError] = useState(); 
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const user = useSelector((state) => state.user);


  useEffect(() => {
    if (user.isAuthenticated){
      navigate('/');
    }
  }, [navigate, user.isAuthenticated]);
  


  const validateLoInForm = () => {
    let newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (formData.email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(formData.email).toLowerCase())) {
        newErrors.email = "Invalid email";
      }
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }
    setError(newErrors);
    return Object.keys(newErrors).length === 0; //not clear about this part
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateLoInForm();
    if (isValid) {
      dispatch(loginUser(formData));
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); 
  };
  

  return (
    <div className="login">
      <form noValidate className="login_form" onSubmit={handleSubmit}>
      <h1><Link to="/" style={{textDecoration:'none'}}>LoGo</Link></h1>
        <h2>Log In to explore the world of fashion</h2>
        <h3>Log In</h3>
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {Error && Error.email && <span id="error">{Error.email}</span>}
        <div style={{ position: "relative",width:'100%' }}>
          <input
            type={showPassword ? "text" : "password"}
            style={{width:'100%'}}
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <span
            onClick={toggleShowPassword}
            style={{
              position: "absolute",
              top: "5vh",
              right: "10px",
              transform: "translateY(-50%)",
            }}
          >
            {showPassword ? (
              <VisibilityIcon id="visibilityIcon" />
            ) : (
              <VisibilityOffIcon id="visibilityIcon" />
            )}
          </span>
          {Error && Error.password && <p id="error">{Error.password}</p>}
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? 
          <span>
            <strong>
              <Link to="/sign_up"> Sign Up</Link>
            </strong>
          </span>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
