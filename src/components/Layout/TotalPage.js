import React from 'react';

const TotalPage = (props) => {
  return (
    <div className="flex h-screen bg-gray-50  overflow-hidden">
      {props.children}
    </div>
  );
};

export default TotalPage;
