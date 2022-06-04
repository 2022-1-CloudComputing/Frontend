import React, { useRef } from "react";

const FolderCreate = (props) => {
  const outSection = useRef();

  const outClickHandler = (e) => {
    if (outSection.current === e.target) {
      props.setShowCreateFolder(false);
      props.setmodalOn(false);
    }
  };

  return (
    <div
      className="folder-container"
      ref={outSection}
      onClick={outClickHandler}
    >
      <div className="create-folder-modal">
        <p>HIHI zz</p>
      </div>
    </div>
  );
};

export default FolderCreate;
