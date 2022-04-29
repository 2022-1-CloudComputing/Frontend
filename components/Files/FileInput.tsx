import React from 'react';

interface FileInputProps {
  onChange: any;
  fileRef: any;
}

const FileInput = ({ onChange, fileRef }: FileInputProps) => {
  return (
    <input
      type="file"
      onChange={onChange}
      multiple
      ref={fileRef}
      style={{ display: 'none' }}
    />
  );
};

export default FileInput;
