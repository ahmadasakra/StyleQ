import React, { useEffect, useState } from "react";
import basestyle from "../Base.module.css";
import registerstyle from "./Signup.module.css";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { urlauth } from '../../Appurl';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyle } from '../../themes';
import { useTranslation } from 'react-i18next';

const Signup = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [user, setUserDetails] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    cpassword: "",
    phone: "",
  });

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

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
      error.name = t('signup.nameRequired');
    }
    if (!values.email) {
      error.email = t('signup.emailRequired');
    } else if (!emailRegex.test(values.email)) {
      error.email = t('signup.emailInvalid');
    }
    if (!values.address) {
      error.address = t('signup.addressRequired');
    }
    if (!values.password) {
      error.password = t('signup.passwordRequired');
    } else if (values.password.length < 5) {
      error.password = t('signup.passwordMinLength');
    }
    if (!values.cpassword) {
      error.cpassword = t('signup.confirmPasswordRequired');
    } else if (values.cpassword !== values.password) {
      error.cpassword = t('signup.passwordMismatch');
    }
    if (!values.phone) {
      error.phone = t('signup.phoneRequired');
    } else if (!phoneRegex.test(values.phone)) {
      error.phone = t('signup.phoneInvalid');
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
  }, [formErrors, isSubmit, navigate, user]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Header toggleTheme={() => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      }} theme={theme} />
      <div className={registerstyle.register}>
        <form>
          <h1>{t('signup.createAccount')}</h1>
          <input
            type="text"
            name="name"
            id="name"
            placeholder={t('signup.name')}
            onChange={changeHandler}
            value={user.name}
          />
          <p className={basestyle.error}>{formErrors.name}</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder={t('signup.email')}
            onChange={changeHandler}
            value={user.email}
          />
          <p className={basestyle.error}>{formErrors.email}</p>
          <input
            type="text"
            name="address"
            id="address"
            placeholder={t('signup.address')}
            onChange={changeHandler}
            value={user.address}
          />
          <p className={basestyle.error}>{formErrors.address}</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder={t('signup.password')}
            onChange={changeHandler}
            value={user.password}
          />
          <p className={basestyle.error}>{formErrors.password}</p>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            placeholder={t('signup.confirmPassword')}
            onChange={changeHandler}
            value={user.cpassword}
          />
          <p className={basestyle.error}>{formErrors.cpassword}</p>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder={t('signup.phone')}
            onChange={changeHandler}
            value={user.phone}
          />
          <p className={basestyle.error}>{formErrors.phone}</p>
          <button className={basestyle.button_common} onClick={signupHandler}>
            {t('signup.register')}
          </button>
        </form>
        <NavLink to="/login">{t('signup.alreadyRegistered')}</NavLink>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default Signup;
