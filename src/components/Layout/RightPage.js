import React from "react";
import Header from "./Header";

const RightPage = (props) => {
  return (
    <div className="rightpage">
      <Header />
      {props.children}
    </div>
  );
};

export default RightPage;
