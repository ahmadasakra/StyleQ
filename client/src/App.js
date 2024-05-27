import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import HomePage from './components/HomePage';
import Admin from './admin/Admin';
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
  return <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/admin/*' element={<Admin />} />
      </Routes>
    </Router>

  </Provider>;

};

export default App;
