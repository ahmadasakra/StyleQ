import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import HomePage from './components/HomePage';
import About from './components/About/About';
import NotFound from './components/NotFound/NotFound';
import Appointment from './components/Appointment/Appointment';

import Admin from './admin/Admin';
import { Provider } from 'react-redux';
import store from './store';
import './i18n';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
