import React, { useRef } from "react";
import { Link } from "react-router-dom";

const UserMenu = (props) => {
  const outSection = useRef();

  const outClickHandler = (e) => {
    console.log("clicked!");
    if (outSection.current === e.target) props.setShowProfileMenu(false);
    console.log(outSection.current);
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
        <li>
          <Link to="#">
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
