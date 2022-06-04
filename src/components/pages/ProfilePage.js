import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/total.css';

const ProfilePage = () => {
    const id = window.sessionStorage.getItem("Id");
    const name = window.sessionStorage.getItem("Name");
    const email = window.sessionStorage.getItem("Email");

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

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;