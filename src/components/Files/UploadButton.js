import React from 'react';

const UploadButton = (props) => {
  return (
    <button className="upload-btn upload-button" onClick={props.onclick}>
      {props.children}
    </button>
  );
};

export default UploadButton;
