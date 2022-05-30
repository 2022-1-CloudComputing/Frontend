import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fileActions } from "../../store";
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
  const dispatch = useDispatch();

  // const fileList2 = useSelector((state) => state.file.file);

  const fileInput = useRef();

  const postFile = async (files) => {
    await axios.post("http://localhost:8000/user/2/file", files);
  };

  const deleteFile = async (fileId) => {
    await axios.delete(`http://localhost:8000/user/2/file/${fileId}`, {
      data: {
        fileId: fileId,
      },
    });
  };

  useEffect(() => {
    async function getFile() {
      const res = await axios.get("http://localhost:8000/user/2");
      const tempFileList = res.data.file_list;
      tempFileList.map((list) => {
        const getFileBox = {
          fileId: list.fileId,
          title: list.title,
          user: list.user,
          created_at: list.created_at.substr(0, 10),
        };
        console.log(getFileBox);
        dispatch(fileActions.addFile(getFileBox));
      });
    }
    getFile();
    console.log("useEffect Hook");
  }, []);

  const fileSizeCheck = (tempSize) => {
    if (tempSize >= 1000000) {
      return String(Math.round(tempSize / 100000) / 10) + "MB";
    } else if (tempSize >= 1000000000) {
      return String(Math.round(tempSize / 100000000) / 10) + "GB";
    } else {
      return String(Math.round(tempSize / 1000)) + "KB";
    }
  };

  const clickHandler = () => {
    fileInput.current.click();
  };

  const handleChangeFile = (e) => {
    e.preventDefault();

    const postFileBox = e.target.files;
    for (let i = 0; i < postFileBox.length; i++) {
      if (postFileBox[i]) {
        console.log(postFileBox[i]);
        const fileBox = {
          file: postFileBox[i].name,
          title: postFileBox[i].name,
          file_path: `"C:/User/${postFileBox[i].name}"`,
          user: 2,
        };
        console.log(fileBox);
        dispatch(fileActions.addFile(fileBox));
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
          <FileListTable deleteFile={deleteFile} />
        </RightContainer>
      </RightPage>
    </TotalPage>
  );
};

export default FilePage;
