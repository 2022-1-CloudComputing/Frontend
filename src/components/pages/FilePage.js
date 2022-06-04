import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { bookmarkActions, fileActions, folderActions } from "../../store";
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
  const initFile = useSelector((state) => state.file.file);
  const initFolder = useSelector((state) => state.folder.folder);
  const [modalOn, setmodalOn] = useState(false);

  const dispatch = useDispatch();
  const IdToken = window.sessionStorage.getItem("IdToken");
  const AccessKeyId = window.sessionStorage.getItem("AccessKeyId");
  const SecretKey = window.sessionStorage.getItem("SecretKey");
  const SessionToken = window.sessionStorage.getItem("SessionToken");
  const headers = {
    "Content-Type": "multipart/form-data",
    IdToken: IdToken,
    AccessKeyId: AccessKeyId,
    SecretKey: SecretKey,
    SessionToken: SessionToken,
  };

  const params = useParams();
  const userID = params.userId;

  // const fileList2 = useSelector((state) => state.file.file);

  const fileInput = useRef();

  const postFile = async (files) => {
    console.log(files);
    await axios
      .post(`/user/${userID}/file`, files, {
        headers: headers,
      })
      .catch((err) => console.log(err));
  };

  const deleteFile = async (files) => {
    await axios.delete(`/user/${userID}/file/${files.file_id}`, {
      headers: headers,
    });
  };

  useEffect(() => {
    async function getFile() {
      const res = await axios.get(`/user/${userID}`);
      console.log(res);
      const tempFileList = res.data.file_list;
      tempFileList.map((list) => {
        const getFileBox = {
          file_id: list.file_id,
          title: list.title,
          user: userID,
          created_at: list.created_at.substr(0, 10),
          file_size: fileSizeCheck(list.file_size),
        };

        dispatch(fileActions.addFile(getFileBox));
      });
    }
    async function getFolder() {
      const res = await axios.get(`/folder_elements/1/list?id=${userID}`, {
        headers: headers,
      });

      res.data.folders.map((list) => {
        const folderBox = {
          name: list.name.substr(0, list.name.length - 1),
          created_at: list.created_at.substr(0, 10),
          folder_id: list.folder_id,
          parent_id: list.parent_id,
          user: list.user_id,
        };
        dispatch(folderActions.addFolder(folderBox));
      });
    }
    async function getBookmark() {
      let tempList = [];
      const res2 = await axios.get(`/user/${userID}/bookmark`);
      console.log(res2);
      res2.data.map((list) => tempList.push(list.file.file_id));

      dispatch(bookmarkActions.setBookmark(tempList));
    }

    if (initFile.length === 0 && initFolder.length === 0) {
      getFile();
      getBookmark();
      getFolder();
    }
  }, []);

  const fileSizeCheck = (tempSize) => {
    if (tempSize >= 1000000) {
      return String(Math.round(tempSize / 100000) / 10) + "MB";
    } else if (tempSize >= 1000000000) {
      return String(Math.round(tempSize / 100000000) / 10) + "GB";
    } else if (tempSize >= 1000) {
      return String(Math.round(tempSize / 1000)) + "KB";
    } else {
      return String(Math.round(tempSize)) + "B";
    }
  };

  const dayCheck = (day) => {
    let returnDate = "" + day;
    if (returnDate.length < 2) {
      returnDate = "0" + returnDate;
    }

    return returnDate;
  };

  const dateCheck = () => {
    const now = new Date();
    const year = "" + now.getFullYear();
    const month = dayCheck(now.getMonth() + 1);
    const date = dayCheck(now.getDate());

    return year + "-" + month + "-" + date;
  };

  const clickHandler = () => {
    fileInput.current.click();
  };

  const handleChangeFile = (e) => {
    e.preventDefault();

    const postFileBox = e.target.files;
    for (let i = 0; i < postFileBox.length; i++) {
      if (postFileBox[i]) {
        const fileBox = new FormData();
        fileBox.append("file", postFileBox[i]);
        fileBox.append("title", postFileBox[i].name);
        fileBox.append("file_path", "");
        fileBox.append("owner", userID);
        fileBox.append("file_size", postFileBox[i].size);

        const storeFileBox = {
          isClicked: false,
          title: postFileBox[i].name,
          file_path: `"C:/User/${postFileBox[i].name}"`,
          user: userID,
          file_size: fileSizeCheck(postFileBox[i].size),
          created_at: dateCheck(),
        };

        dispatch(fileActions.addFile(storeFileBox));
        postFile(fileBox);
      }
    }
  };

  return (
    <TotalPage>
      <Sidebar modalOn={modalOn} />
      <RightPage>
        <RightContainer>
          <MainContent>
            <UploadButton setmodalOn={setmodalOn} onclick={clickHandler}>
              +
            </UploadButton>
            <FileInput onChange={handleChangeFile} fileRef={fileInput} />
          </MainContent>
          <FileListTable deleteFile={deleteFile} />
        </RightContainer>
      </RightPage>
    </TotalPage>
  );
};

export default FilePage;
