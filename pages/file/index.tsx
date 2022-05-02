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

  const postFile = async (file: any) => {
    await axios.post('http://localhost:8000/files/', {
      title: file.name,
      file: 'media/upload_file/2022/05/01/1ed12f1f3f2f22d',
    });
  };

  const deleteFile = async (fileName: any) => {
    await axios.delete('http://localhost:8000/files/', {
      data: {
        title: fileName,
      },
    });
  };

  const bookmarkClickHandler = (fileName: string) => {
    fileList.filter((list: any) => {
      if (list.name == fileName) list.bookmark = !list.bookmark;
    });
    const tempFileList = fileList;
    console.log(tempFileList);
    setFileList(tempFileList);
    console.log(fileList);
  };

  useEffect(() => {
    async function getFile() {
      const res = await axios.get('http://localhost:8000/files/');
      for (let i: number = 0; i < res.data.length; i++) {
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
    console.log(e.target.files);
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
            <UploadButton onclick={clickHandler}>업로드</UploadButton>
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
