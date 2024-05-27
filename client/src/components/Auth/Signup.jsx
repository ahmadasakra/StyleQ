import React, { useEffect, useState } from "react";
import basestyle from "../Base.module.css";
import registerstyle from "./Signup.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

import {urlauth} from '../../Appurl'

const Signup = () => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    cpassword: "",
    phone: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    const error = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^\d{10,}$/;
    
    if (!values.name) {
      error.name = "Name is required";
    }
    if (!values.email) {
      error.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.address) {
      error.address = "Address is required";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 5) {
      error.password = "Password must be more than 5 characters";
    }
    if (!values.cpassword) {
      error.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      error.cpassword = "Confirm password and password should be the same";
    }
    if (!values.phone) {
      error.phone = "Phone number is required";
    } else if (!phoneRegex.test(values.phone)) {
      error.phone = "Phone number must be at least 10 digits";
    }
    return error;
  };

  const signupHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios.post(`${urlauth}/signup`, user)
        .then((res) => {
          if (res.data.status === 0) {
            alert("Signup successful!");
            navigate("/login", { replace: true });
          } else {
            alert("Signup failed. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error during signup:", error);
          alert("An error occurred. Please try again later.");
        });
    }
  }, [formErrors]);

  return (
    <>
      <div className={registerstyle.register}>
        <form>
          <h1>Create your account</h1>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={changeHandler}
            value={user.name}
          />
          <p className={basestyle.error}>{formErrors.name}</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={user.email}
          />
          <p className={basestyle.error}>{formErrors.email}</p>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            onChange={changeHandler}
            value={user.address}
          />
          <p className={basestyle.error}>{formErrors.address}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={changeHandler}
            value={user.password}
          />
          <p className={basestyle.error}>{formErrors.password}</p>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            placeholder="Confirm Password"
            onChange={changeHandler}
            value={user.cpassword}
          />
          <p className={basestyle.error}>{formErrors.cpassword}</p>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone"
            onChange={changeHandler}
            value={user.phone}
          />
          <p className={basestyle.error}>{formErrors.phone}</p>
          <button className={basestyle.button_common} onClick={signupHandler}>
            Register
          </button>
        </form>
        <NavLink to="/login">Already registered? Login</NavLink>
      </div>
    </>
  );
};

export default Signup;
