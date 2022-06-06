import React from "react";
import SearchListTable from "../Files/SearchListTable";
import MainContent from "../Layout/MainContent";
import RightContainer from "../Layout/RightContainer";
import RightPage from "../Layout/RightPage";
import Sidebar from "../Layout/Sidebar";
import TotalPage from "../Layout/TotalPage";

const SearchPage = () => {
  return (
    <TotalPage>
      <Sidebar />
      <RightPage>
        <RightContainer>
          <MainContent></MainContent>
          <SearchListTable />
        </RightContainer>
      </RightPage>
    </TotalPage>
  );
};

export default SearchPage;
