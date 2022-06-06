import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { bookmarkActions, fileActions } from "../../store";
import axios from "axios";
import Sidebar from "../Layout/Sidebar";
import TotalPage from "../Layout/TotalPage";
import RightPage from "../Layout/RightPage";
import RightContainer from "../Layout/RightContainer";
import MainContent from "../Layout/MainContent";
import BookmarkListTable from "../Files/BookmarkListTable";

const FavoritesPage = () => {
  const initFile = useSelector((state) => state.file.file);

  const dispatch = useDispatch();
  const params = useParams();
  const userID = params.userId;

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
    async function getBookmark() {
      let tempList = [];
      const res2 = await axios.get(`/user/${userID}/bookmark`);
      console.log(res2);
      res2.data.map((list) => tempList.push(list.file.file_id));

      dispatch(bookmarkActions.setBookmark(tempList));
    }

    if (initFile.length === 0) {
      getFile();
      getBookmark();
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

  return (
    <TotalPage>
      <Sidebar />
      <RightPage>
        <RightContainer>
          <MainContent></MainContent>
          <BookmarkListTable />
        </RightContainer>
      </RightPage>
    </TotalPage>
  );
};

export default FavoritesPage;
