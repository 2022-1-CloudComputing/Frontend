import React from "react";

import TagSearchListTable from "../Files/TagSearchListTable";
import MainContent from "../Layout/MainContent";
import RightContainer from "../Layout/RightContainer";
import RightPage from "../Layout/RightPage";
import Sidebar from "../Layout/Sidebar";
import TotalPage from "../Layout/TotalPage";

const TagSearchPage = () => {
  return (
    <TotalPage>
      <Sidebar />
      <RightPage>
        <RightContainer>
          <MainContent></MainContent>
          <TagSearchListTable />
        </RightContainer>
      </RightPage>
    </TotalPage>
  );
};

export default TagSearchPage;
