import React, { useState,useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { registerUser } from "../Redux/features/userSlice.js";
import { useDispatch,useSelector } from "react-redux";
import "../style/SignUp.css";


const SignUp=()=>{
  const [formData,setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user,isAuthenticated} = useSelector((state) => state.user);


  useEffect(() => {
    if (isAuthenticated){ 
      navigate('/');
        }
  }, [user.success, navigate]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    }else if(formData.name){
        if(formData.name.length < 3){
            newErrors.name = "Name must be at least 3 characters long"
        }
    }
    if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (formData.email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(formData.email).toLowerCase())) {
          newErrors.email = "Invalid email";
        }
      }
    if (!formData.password) {
        newErrors.password = "Password is required";
        }else if(formData.password){
            if(formData.password.length < 6){
                newErrors.password = "Password must be at least 6 characters long"
            }
        }
    if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm Password is required";
        }else if(formData.confirmPassword){
            if(formData.confirmPassword!== formData.password){
                newErrors.confirmPassword = "Passwords do not match"
            }
        }
        
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      dispatch(registerUser(formData));
    }
  };
  return(
    <div className="signup">
      <form noValidate className="signup_form" onSubmit={handleSubmit}>
      <h1><Link to="/" style={{textDecoration:'none'}}>LoGo</Link></h1>
        <h2>Sign up to explore the world of fashion</h2>
        <h3>Sign Up</h3>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value })}
          placeholder= "Name"
        />
        {errors && errors.name && <span id="error" >{errors.name}</span>}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value })}
          placeholder="Email"
        />
        {errors && errors.email && <span id="error" >{errors.email}</span>}
        <div style={{position:'relative', width:'100%'}} >
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value })}
          placeholder= "Password"
        />
        {errors && errors.password && <span id="error" >{errors.password}</span>}
        <span onClick={toggleShowPassword}
        style={{position: "absolute",
        top: "5vh",
        right: "10px",
        transform: "translateY(-50%)",}}
        >
          {showPassword ? <VisibilityIcon id="visibilityIcon"  /> : <VisibilityOffIcon id="visibilityIcon" />}
        </span>
        </div>
        <div style={{position:'relative', width:'100%' }} >
            <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value })}
            placeholder="Confirm Password"
            />
            {errors && errors.confirmPassword && <span id="error" >{errors.confirmPassword}</span>}
            <span onClick={toggleShowConfirmPassword}
            style={{position: "absolute",
            top: "5vh",
            right: "10px",
            transform: "translateY(-50%)",}}
            >
            
            {showConfirmPassword ? <VisibilityIcon id="visibilityIcon"  /> : <VisibilityOffIcon  id="visibilityIcon" />}
            </span>
        </div>
        <button type="submit">Sign Up</button>
        <p>
          Already have an account{" "}
          <span>
            <strong>
              <Link to="/log-In">Log In</Link>
            </strong>
          </span>
        </p>
      </form>
    </div>
  )
}

export default SignUp;