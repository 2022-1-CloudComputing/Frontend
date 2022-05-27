import React from 'react';

const FileInput = (props) => {
  return (
    <input
      type="file"
      onChange={props.onChange}
      multiple
      ref={props.fileRef}
      style={{ display: 'none' }}
    />
  );
};

export default FileInput;
