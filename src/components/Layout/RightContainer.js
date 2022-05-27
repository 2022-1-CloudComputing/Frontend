import React from 'react';

const RightContainer = (props) => {
  return (
    <div className="container grid px-6 mx-auto overflow-auto scroll-smooth">
      {props.children}
    </div>
  );
};

export default RightContainer;
