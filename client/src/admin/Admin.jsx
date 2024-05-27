import React from 'react';
import {Route, Routes} from 'react-router-dom';
import AdminLogin from './AdminLogin/AdminLogin';
import style from './Admin.module.css';

function admin() {
  return (
    <div className={style.mainAdmin}>
      <AdminLogin/>
      <div className={style.adminside} >
        <Routes>
          <Route exact path='/' element={<div></div>}/>
        </Routes>
      </div>
    </div>
  );
}

export default admin;
