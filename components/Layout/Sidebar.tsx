import React, { Fragment } from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="z-20 flex-shrink-0 hidden w-64 overflow-y-auto bg-white md:block">
      <div className="py-4 text-gray-500 ">
        <a className="ml-6 text-lg font-bold text-gray-800 " href="#">
          OU
        </a>
        <ul className="mt-6">
          <li className="relative px-6 py-3">
            <a className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              <span className="ml-4">My Box</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
