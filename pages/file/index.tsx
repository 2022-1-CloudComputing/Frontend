import React, { Fragment, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Layout/Sidebar';
import TotalPage from '../../components/Layout/TotalPage';
import RightPage from '../../components/Layout/RightPage';
import UploadButton from '../../components/Files/UploadButton';
import RightContainer from '../../components/Layout/RightContainer';
import MainContent from '../../components/Layout/MainContent';
import FileInput from '../../components/Files/FileInput';
import FileListTable from '../../components/Files/FileListTable';

const FilePage: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([]);

  const fileInput = useRef<any>();

  // const fetchFile = (filename: string) => {
  //   axios.post('http://localhost:8000/api/File/', {
  //     name: filename,
  //   });
  // };

  const fileSizeCheck = (tempSize: number) => {
    if (tempSize >= 1000000) {
      return String(Math.round(tempSize / 100000) / 10) + 'MB';
    } else if (tempSize >= 1000000000) {
      return String(Math.round(tempSize / 100000000) / 10) + 'GB';
    } else {
      return String(Math.round(tempSize / 1000)) + 'KB';
    }
  };

  const clickHandler = () => {
    fileInput.current.click();
  };

  const handleChangeFile = (e: any) => {
    e.preventDefault();
    for (let i: number = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const date = today.getDate();
        const now = year + '-' + month + '-' + date;
        const fileSize: string = fileSizeCheck(e.target.files[i].size);
        const fileBox = {
          name: e.target.files[i].name,
          uploadDate: now,
          fileSize: fileSize,
        };
        setFileList((filelist) => [...filelist, fileBox]);
      }
    }
  };

  return (
    <TotalPage>
      <Sidebar />
      <RightPage>
        <RightContainer>
          <MainContent>
            <UploadButton onclick={clickHandler}>업로드</UploadButton>
            <FileInput onChange={handleChangeFile} fileRef={fileInput} />
          </MainContent>
          <FileListTable fileList={fileList} />
        </RightContainer>
      </RightPage>
    </TotalPage>
  );
};

export default FilePage;
