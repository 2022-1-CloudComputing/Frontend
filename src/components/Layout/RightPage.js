import React from "react";
import Header from "./Header";

const RightPage = (props) => {
  return (
    <div className="flex flex-col flex-1 w-full">
      <Header />
      {props.children}
    </div>
  );
};

export default RightPage;
