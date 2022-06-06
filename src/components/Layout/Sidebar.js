import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBookmark } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Sidebar = (props) => {
  const userId = window.sessionStorage.getItem("Id");

  const sideBarData = [
    { id: "side1", name: "My Box", path: `/${userId}/file`, icon: <FaHome /> },
    {
      id: "side3",
      name: "Bookmark",
      path: `/${userId}/favorites`,
      icon: <FaBookmark />,
    },
  ];
  const router = useLocation();

  return (
    <aside className={"sidebar-aside " + (!props.modalOn && "sidebar-white")}>
      <div className="sidebar-content">
        <a className="title-size sidebar-logo title-center">OU</a>
        <ul className="sidebar-ul">
          {sideBarData.map((side) => (
            <li key={side.id} className="sidebar-li">
              {side.path === router.pathname ? (
                <span className="sidebar-span side-selected "></span>
              ) : (
                ""
              )}

              <div
                className={
                  "sidebar-div " +
                  (side.path === router.pathname ? "text-gray-800" : "")
                }
              >
                <svg
                  className="sidebar-icon"
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
                  <div
                    className={
                      side.path === router.pathname
                        ? "text-gray-800 sidebar-name"
                        : "sidebar-name"
                    }
                    style={{ marginLeft: "1rem" }}
                    // onClick={() => sideClickHandler('myBox')}
                  >
                    {side.name}
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
