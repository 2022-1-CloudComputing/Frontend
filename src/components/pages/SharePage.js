import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Sidebar from "../Layout/Sidebar";
import TotalPage from "../Layout/TotalPage";
import RightPage from "../Layout/RightPage";
import UploadButton from "../Files/UploadButton";
import RightContainer from "../Layout/RightContainer";
import MainContent from "../Layout/MainContent";
import FileInput from "../Files/FileInput";
import FileListTable from "../Files/FileListTable";

const FilePage = () => {
  return (
    <TotalPage>
      <Sidebar />
      <RightPage>
        <RightContainer>
          <MainContent></MainContent>
          <FileListTable />
        </RightContainer>
      </RightPage>
    </TotalPage>
  );
};

export default FilePage;
