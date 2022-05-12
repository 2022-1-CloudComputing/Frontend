import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaBookmark } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const sideBarData = [
  { id: 'side1', name: 'My Box', path: '/file', icon: <FaHome /> },
  { id: 'side2', name: 'Share Box', path: '/share', icon: <FaUsers /> },
  {
    id: 'side3',
    name: 'Favorites',
    path: '/favorites',
    icon: <FaBookmark />,
  },
];

const Sidebar = () => {
  const router = useLocation();

  return (
    <aside className="z-20 flex-shrink-0 hidden w-64 overflow-y-auto bg-white md:block">
      <div className="py-4 text-gray-500 ">
        <a className="ml-6 text-lg font-bold text-gray-800 " href="#">
          OU
        </a>
        <ul className="mt-6">
          {sideBarData.map((side) => (
            <li key={side.id} className="relative px-6 py-3">
              {side.path === router.pathname ? (
                <span className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"></span>
              ) : (
                ''
              )}

              <a className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ">
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="-1 2.5 15 9"
                  stroke="currentColor"
                >
                  {side.icon}
                </svg>
                <Link to={side.path}>
                  <span
                    className="ml-4"
                    // onClick={() => sideClickHandler('myBox')}
                  >
                    {side.name}
                  </span>
                </Link>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
