import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/total.css'
import axios from 'axios';

const LoginPage = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPw, setInputPw] = useState('');

  const inputEmailHandler = (email) => {
    setInputEmail(email.target.value);
  }

  const inputPwHandler = (pw) => {
    setInputPw(pw.target.value);
  }

  const loginButtonHandler = () => {
    console.log('Login');
  }

  //<div className="text-3xl font-bold underline h-6">
  return (
    <div>
      <div className='login-wrapper'>
        <h1 className='font-bold text-gray-800 login-ou-header'>
            <Link to='/'>OU</Link>
        </h1>
        <div className='login-box-wrapper'>
          <div className='login-container'>
            <h2 className='login-header'>
              Login
            </h2>
            <div className='login-input-container'>
              <label htmlFor='input_email'>Email</label>
              <input type='text' name='input_email' value={inputEmail} onChange={inputEmailHandler} />
            </div>
            <div className='login-input-container'>
              <label htmlFor='input_pw'>PW</label>
              <input type='password' name='input_pw' value={inputPw} onChange={inputPwHandler} />
            </div>
            <div className='login-button-container'>
              <input type='submit' onClick={loginButtonHandler} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
