import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import UserMenu from "./UserMenu";

const Header = (props) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const params = useParams();
  const userID = params.userId;
  const navigate = useNavigate();

  const userIconClickHandler = () => {
    setShowProfileMenu(true);
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      if (e.target.value[0] === "#") {
        navigate(
          `/${userID}/search/tag/${e.target.value.substr(
            1,
            e.target.value.length
          )}`
        );
      } else {
        navigate(`/${userID}/search/${e.target.value}`);
      }
    }
  };

  return (
    <nav className="header-nav">
      <div className="nav-container">
        <div className="search">
          <div className="icon-color">
            <div className="searchIcon">
              <svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              className="form-input"
              type="text"
              placeholder="Search for files"
              aria-label="Search"
              onKeyPress={keyPressHandler}
            />
          </div>
        </div>

        <div className="iconul">
          <button
            onClick={userIconClickHandler}
            className={showProfileMenu ? "btn-color iconli" : "iconli"}
          >
            <FaRegUserCircle />
          </button>
          {showProfileMenu && (
            <UserMenu setShowProfileMenu={setShowProfileMenu} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
