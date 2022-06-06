import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import FolderCreate from "./FolderCreate";

const UploadMenu = (props) => {
  const [showCreateFolder, setShowCreateFolder] = useState(false);

  const outSection = useRef();

  const outClickHandler = (e) => {
    if (outSection.current === e.target) props.onClick(false);
  };

  const createFolder = () => {
    setShowCreateFolder(true);
    props.setmodalOn(true);
  };

  return (
    <div
      className="modal-background"
      ref={outSection}
      onClick={outClickHandler}
    >
      {showCreateFolder && (
        <FolderCreate
          setmodalOn={props.setmodalOn}
          onclick={props.onClick}
          setShowCreateFolder={setShowCreateFolder}
        />
      )}
      <ul
        className={"upload-modal-div-style " + (showCreateFolder && "modal-on")}
      >
        <li>
          <div className="modal-menu-style" onClick={props.uploadBtn}>
            <span>Upload</span>
          </div>
        </li>
        <li>
          <div onClick={createFolder}>
            <div className="modal-menu-style">
              <span>Create Folder</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default UploadMenu;
