import React from 'react';

interface UploadButtonProps {
  onclick: any;
  children: any;
}

const UploadButton = ({ onclick, children }: UploadButtonProps) => {
  return (
    <button
      className="px-5 py-3 font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-blue right-btn"
      onClick={onclick}
    >
      {children}
    </button>
  );
};

export default UploadButton;
