import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/total.css';
import axios from 'axios';
import settings from '../../settings.json';

const LoginPage = () => {
  const [inputName, setInputName] = useState('');
  const [inputID, setInputID] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [inputCheckPw, setInputCheckPw] = useState('');

  const inputNameHandler = (name) => {
    setInputName(name.target.value);
  }

  const inputIDHandler = (id) => {
    setInputID(id.target.value);
  }

  const inputEmailHandler = (email) => {
    setInputEmail(email.target.value);
  }

  const inputPwHandler = (pw) => {
    setInputPw(pw.target.value);
  }

  const inputCheckPwHandler = (checkpw) => {
    setInputCheckPw(checkpw.target.value);
  }

  const registerButtonHandler = () => {
    if(inputPw === inputCheckPw) {
      console.log('Login');
      //console.log(settings);
      
      let body = {
        "id": inputID,
        "pw": inputPw,
        "name" : inputName,
        "email" : inputEmail
      }

      axios.post(settings.RegisterIP, body)
      .then((res) => {
        console.log(res)
        document.location.href = '/'
      });

      
    }
    else {
      console.log('Not same');
    }
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
              Register
            </h2>
            <div className='login-input-container'>
              <label htmlFor='input_name'>Name</label>
              <input type='text' name='input_name' value={inputName} onChange={inputNameHandler} />
            </div>
            <div className='login-input-container'>
              <label htmlFor='input_email'>Email</label>
              <input type='text' name='input_email' value={inputEmail} onChange={inputEmailHandler} />
            </div>
            <div className='login-input-container'>
              <label htmlFor='input_id'>ID</label>
              <input type='text' name='input_id' value={inputID} onChange={inputIDHandler} />
            </div>
            <div className='login-input-container'>
              <label htmlFor='input_pw'>PW</label>
              <input type='password' name='input_pw' value={inputPw} onChange={inputPwHandler} />
            </div>
            <div className='login-input-container'>
              <label htmlFor='input_pw'>Check PW</label>
              <input type='password' name='input_check_pw' value={inputCheckPw} onChange={inputCheckPwHandler} />
            </div>
            <div className='login-button-container'>
              <input type='submit' value="SignUp" onClick={registerButtonHandler} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
