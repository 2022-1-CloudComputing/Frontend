import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Layout/Sidebar';
import TotalPage from '../Layout/TotalPage';
import RightPage from '../Layout/RightPage';
import UploadButton from '../Files/UploadButton';
import RightContainer from '../Layout/RightContainer';
import MainContent from '../Layout/MainContent';
import FileInput from '../Files/FileInput';
import FileListTable from '../Files/FileListTable';

const FilePage = () => {
  const [fileList, setFileList] = useState([]);

  const fileInput = useRef();

  const postFile = async (file) => {
    await axios.post('http://localhost:8000/files/', {
      title: file.name,
      file: 'media/upload_file/2022/05/01/1ed12f1f3f2f22d',
    });
  };

  const deleteFile = async (fileName) => {
    await axios.delete('http://localhost:8000/files/', {
      data: {
        title: fileName,
      },
    });
  };

  const bookmarkClickHandler = (fileName) => {
    fileList.filter((list) => {
      if (list.name === fileName) list.bookmark = !list.bookmark;
    });
    const tempFileList = fileList;
    console.log(tempFileList);
    setFileList(tempFileList);
    console.log(fileList);
  };

  useEffect(() => {
    async function getFile() {
      const res = await axios.get('http://localhost:8000/files/');
      for (let i = 0; i < res.data.length; i++) {
        const getFileBox = {
          name: res.data[i].title,
          uploadDate: res.data[i].created_at.slice(0, 10),
          fileSize: 1234123,
          bookmark: false,
        };
        setFileList((filelist) => [...filelist, getFileBox]);
      }
    }
    getFile();
  }, []);

  const fileSizeCheck = (tempSize) => {
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

  const handleChangeFile = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const date = today.getDate();
        const now = year + '-' + month + '-' + date;
        const fileSize = fileSizeCheck(e.target.files[i].size);
        const fileBox = {
          name: e.target.files[i].name,
          uploadDate: now,
          fileSize: fileSize,
          bookmark: false,
        };
        setFileList((filelist) => [...filelist, fileBox]);
        postFile(fileBox);
      }
    }
  };

  return (
    <TotalPage>
      <Sidebar />
      <RightPage>
        <RightContainer>
          <MainContent>
            <UploadButton onclick={clickHandler}>+</UploadButton>
            <FileInput onChange={handleChangeFile} fileRef={fileInput} />
          </MainContent>
          <FileListTable
            fileList={fileList}
            setFileList={setFileList}
            deleteFile={deleteFile}
            bookmarkClickHandler={bookmarkClickHandler}
          />
        </RightContainer>
      </RightPage>
    </TotalPage>
  );
};

export default FilePage;
