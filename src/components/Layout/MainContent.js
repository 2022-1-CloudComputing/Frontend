import React from "react";

const MainContent = (props) => {
  return (
    <div className="my-4">
      {props.children}
      <div className="my_path">/</div>
    </div>
  );
};

export default MainContent;
