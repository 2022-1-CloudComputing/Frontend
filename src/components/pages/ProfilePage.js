import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/total.css';
import axios from 'axios';
import settings from '../../settings.json';

const ProfilePage = () => {
    const id = window.sessionStorage.getItem("Id");
    const name = window.sessionStorage.getItem("Name");
    const email = window.sessionStorage.getItem("Email");

    // dropout api not work
    const dropoutButtonHandler = () => {
        // if dropout api work, delete this
        document.location.href = '/';

        axios.post(settings.DropoutIP, {
            "id": id,
            "name": name,
            "email": email
        })
        .then((res) => {
            console.log(res);
            console.log("Drop Out!");
            
            window.sessionStorage.clear();

            //document.location.href = '/';
        });
    }

    return (
        <div>
            <div className='login-wrapper'>
                <h1 className='font-bold text-gray-800 login-ou-header'>
                    <Link to='/file'>OU</Link>
                </h1>

                <div className='login-box-wrapper'>
                    <div className='login-container'>
                        <h2 className='login-header'>
                            User Profile
                        </h2>

                        <table className='table-header'>
                            <tr>
                                <th type="left">UserID</th>
                                <td type="right">{id}</td>
                            </tr>
                            <tr>
                                <th type="left">UserName</th>
                                <td type="right">{name}</td>
                            </tr>
                            <tr>
                                <th type="left">UserEmail</th>
                                <td type="right">{email}</td>
                            </tr>
                        </table>

                        <input type='submit' value="DropOut" onClick={dropoutButtonHandler} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;