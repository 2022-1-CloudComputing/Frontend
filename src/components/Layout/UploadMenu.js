import React, { useRef } from "react";
import { Link } from "react-router-dom";

const UploadMenu = (props) => {
  console.log("UploadMenu On");
  const outSection = useRef();

  const outClickHandler = (e) => {
    if (outSection.current === e.target) props.onClick(false);
  };

  return (
    <div
      className="modal-background"
      ref={outSection}
      onClick={outClickHandler}
    >
      <ul className="upload-modal-div-style">
        <li>
          <div className="modal-menu-style" onClick={props.uploadBtn}>
            <span>Upload</span>
          </div>
        </li>
        <li>
          <Link to="/group">
            <div className="modal-menu-style">
              <span>Create Folder</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UploadMenu;
