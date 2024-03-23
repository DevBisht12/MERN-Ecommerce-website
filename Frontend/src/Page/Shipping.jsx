import "../style/shipping.css";
import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import { setShippingAddress } from "../Redux/features/addShippingInfo.js";
import { useDispatch, useSelector } from "react-redux";

const Shipping = () => {
  const dispatch = useDispatch();
  const [countryCode, setCountryCode] = useState();
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "", 
    country: "",
    pinCode: "", 
    phone: "",
  });

  const navigate = useNavigate();
  const countries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(
    () => State.getStatesOfCountry(countryCode),
    [countryCode]
  );

  const handleCountryChange = (e) => {
    const countryAndCode = e.target.value;
    const country = countryAndCode.split(",")[0];
    const code = countryAndCode.split(",")[1];
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: country,
    }));
    setCountryCode(code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.address &&
      formData.city &&
      formData.country &&
      formData.state &&
      formData.phone &&
      formData.pinCode
    ) {
      dispatch(setShippingAddress(formData));
      navigate("/confirmOrder");
    } else window.alert("Please fill all the fields");
  };




  return (
    <div className="shipping">
      <form className="shipping_main" onSubmit={handleSubmit}>
        <h2>Shipping address</h2>
        <input
          type="text"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          placeholder="Address"
        />
        <input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
        <select
          name="Country"
          id="Country"
          placeholder="Country"
          onChange={handleCountryChange}
        >
          <option>Country</option>
          {countries.map((country, index) => (
            <option key={index} value={`${country.name},${country.isoCode}`}>
              {country.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <div className="TowInput">
          <select
            name="State"
            id="State"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
          >
            <option>State</option>
            {states.map((state, index) => (
              <option key={index} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={formData.pinCode}
            onChange={(e) =>
              setFormData({ ...formData, pinCode: e.target.value })
            }
            placeholder="Pin Code"
            style={{ marginLeft: "10px" }}
          />
        </div>

        <button>Continue to payment</button>
        <Link to="/" style={{ width: "100%" }}>
          <button>Return to home</button>
        </Link>
      </form>
    </div>
  );
};

export default Shipping;
