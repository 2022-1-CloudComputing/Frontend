import React from "react";
import { FaWrench, FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <nav className="z-10 py-4 bg-white shadow-md ">
      <div className="container flex items-center justify-between h-full px-6 mx-auto">
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 icon-color">
            <div className="absolute inset-y-0 flex items-center pl-3">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100  rounded-md  focus:placeholder-gray-500 focus:bg-white  focus:outline-none  form-input"
              type="text"
              placeholder="Search for files"
              aria-label="Search"
            />
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="flex">
            <FaRegUserCircle />
          </li>
          <li className="flex">
            <FaWrench />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
