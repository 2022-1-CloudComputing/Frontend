import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import settings from "../../settings.json";

const UserMenu = (props) => {
  const outSection = useRef();

  const accessToken = window.sessionStorage.getItem("AccessToken");

  const outClickHandler = (e) => {
    if (outSection.current === e.target) props.setShowProfileMenu(false);
  };

  const logoutHandler = (e) => {
    axios
      .post(settings.LogoutIP, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        console.log("Log Out!");

        window.sessionStorage.clear();
      });
  };

  return (
    <div
      className="modal-background"
      ref={outSection}
      onClick={outClickHandler}
    >
      <ul className="modal-div-style">
        <li>
          <Link to="/userProfile">
            <div className="modal-menu-style">
              <span>Profile</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/group">
            <div className="modal-menu-style">
              <span>Group</span>
            </div>
          </Link>
        </li>
        <li onClick={logoutHandler}>
          <Link to="/">
            <div className="modal-menu-style">
              <span>Log Out</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
