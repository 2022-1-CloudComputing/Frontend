import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/total.css'
import axios from 'axios';
import settings from '../../settings.json';

const LoginPage = () => {
  const [inputID, setInputID] = useState('');
  const [inputPw, setInputPw] = useState('');

  const inputIDHandler = (id) => {
    setInputID(id.target.value);
  }

  const inputPwHandler = (pw) => {
    setInputPw(pw.target.value);
  }

  const loginButtonHandler = () => {
    console.log('Login');

    let body = {
      "id": inputID,
      "pw": inputPw
    }

    axios.post(settings.LoginIP, body)
    .then((res) => {
      console.log(res)

      let sessionStorage = window.sessionStorage
      sessionStorage.setItem("Id", res.data.User.id)
      sessionStorage.setItem("Name", res.data.User.name)
      sessionStorage.setItem("Email", res.data.User.email)
      sessionStorage.setItem("Sub", res.data.User.sub)
      sessionStorage.setItem("RootFolderId", res.data.User.root_folder_id)
      sessionStorage.setItem("IdentityId", res.data.IdentityId)
      sessionStorage.setItem("IdToken", res.data.IdToken)
      sessionStorage.setItem("AccessToken", res.data.AccessToken)
      sessionStorage.setItem("RefreshToken", res.data.RefreshToken)
      sessionStorage.setItem("AccessKeyId", res.data.Credentials.AccessKeyId)
      sessionStorage.setItem("SessionToken", res.data.Credentials.SessionToken)
      sessionStorage.setItem("SecretKey", res.data.Credentials.SecretKey)

      document.location.href = '/share'
    });
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
              <label htmlFor='input_id'>ID</label>
              <input type='text' name='input_id' value={inputID} onChange={inputIDHandler} />
            </div>
            <div className='login-input-container'>
              <label htmlFor='input_pw'>PW</label>
              <input type='password' name='input_pw' value={inputPw} onChange={inputPwHandler} />
            </div>
            <div className='login-button-container'>
              <input type='submit' value="Login" onClick={loginButtonHandler} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
