import React, { useState } from "react";
import UploadMenu from "../Layout/UploadMenu";

const UploadButton = (props) => {
  const [showUploadMenu, setShowUploadMenu] = useState(false);

  const clickHandler = () => {
    setShowUploadMenu(true);
  };

  return (
    <div>
      {!showUploadMenu ? (
        <button className="upload-btn upload-button" onClick={clickHandler}>
          {props.children}
        </button>
      ) : (
        <UploadMenu uploadBtn={props.onclick} onClick={setShowUploadMenu} />
      )}
    </div>
  );
};

export default UploadButton;
