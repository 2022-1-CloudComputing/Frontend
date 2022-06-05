import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fileActions,
  bookmarkActions,
  clickedActions,
  folderActions,
} from "../../store";
import { FaBookmark, FaRegBookmark, FaTrash, FaFolder } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

const FolderListTable = (props) => {
  const params = useParams();
  const userID = params.userId;
  const navigate = useNavigate();

  const [nextFileList, setNextFileList] = useState([]);
  const [nextFolderList, setNextFolderList] = useState([]);

  const bookmarkId = useSelector((state) => state.bookmark.file_id);

  const initFile = useSelector((state) => state.file.file);
  const initFolder = useSelector((state) => state.folder.folder);

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

  const folderID = params.folderId;

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

  useEffect(() => {
    async function getFile() {
      dispatch(fileActions.resetFile([]));
      const res = await axios.get(
        `/folder_elements/${folderID}/list?id=${userID}`,
        {
          headers: headers,
        }
      );
      res.data.files.map((list) => {
        const fileBox = {
          title: list.title,
          created_at: list.created_at.substr(0, 10),
          folder_id: list.folder_id,
          file_id: list.file_id,
          user: list.owner,
          file_size: fileSizeCheck(list.file_size),
        };

        dispatch(fileActions.addFile(fileBox));
      });
    }
    async function getFolder() {
      dispatch(folderActions.resetFolder([]));
      const res = await axios.get(
        `/folder_elements/${folderID}/list?id=${userID}`,
        {
          headers: headers,
        }
      );
      res.data.folders.map((list) => {
        const folderBox = {
          user: list.user_id,
          path: "",
          name: list.name.substr(0, list.name.length - 1),
          user_id: list.user_id,
          parent_id: list.parent_id,
          created_at: dateCheck(),
        };

        dispatch(folderActions.addFolder(folderBox));
      });
      //   setNextFolderList(res.data.folders);
    }
    async function getBookmark() {
      let tempList = [];
      const res2 = await axios.get(`/user/${userID}/bookmark`);
      //   console.log(res2);
      res2.data.map((list) => tempList.push(list.file.file_id));

      dispatch(bookmarkActions.setBookmark(tempList));
    }

    getFile();
    getBookmark();
    getFolder();
  }, []);

  const clickHandler = (fileId) => {
    dispatch(fileActions.fileClicked(fileId));
  };

  const deleteClickHandler = (files) => {
    props.deleteFile(files);
    dispatch(fileActions.deleteFile(files.file_id));
  };

  const addBookmarkClickHandler = async (fileId) => {
    axios
      .post(`/user/${userID}/bookmark`, {
        fileId: fileId,
      })
      .then((res) => console.log(res));

    dispatch(bookmarkActions.addBookmark(fileId));
  };

  const deleteBookmarkClickHandler = (fileId) => {
    axios
      .delete(`/user/${userID}/bookmark/${fileId}`)
      .then((res) => console.log(res));

    dispatch(bookmarkActions.deleteBookmark(fileId));
  };

  return (
    <table className="w-full whitespace-no-wrap">
      <thead>
        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b  bg-gray-50 ">
          <th className="px-4 py-3 text-center">이름</th>
          <th className="px-4 py-3 text-center">유저</th>
          <th className="px-4 py-3 text-center">업로드</th>
          <th className="px-4 py-3 text-center">파일크기</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y ">
        {initFolder.map((list) => (
          <tr
            className={"text-gray-700 "}
            key={Math.random()}
            onDoubleClick={() =>
              navigate(`/${userID}/folder/${list.folder_id}/${list.name}`)
            }
          >
            <td className="px-4 py-3">
              <div className="flex items-center text-sm">
                <div className="relatevie hidden w-8 mr-3 rounded-full md:block">
                  <span>
                    <div>
                      <FaFolder />
                    </div>
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{list.name}</p>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-sm text-center">{list.user}</td>
            <td className="px-4 py-3 text-sm text-center">{list.created_at}</td>
            <td className="px-4 py-3 text-sm text-center">-</td>
            <td className="px-4 py-3">
              <button
                onClick={() => deleteClickHandler(list)}
                className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 btn-color rounded-lg focus:outline-none focus:shadow-outline-gray"
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
        {initFile.map((list) => (
          <tr
            className={
              "text-gray-700 " + (list.isClicked ? "file-clicked" : "")
            }
            key={Math.random()}
            onClick={() => clickHandler(list.file_id)}
          >
            <td className="px-4 py-3">
              <div className="flex items-center text-sm">
                <div className="relatevie hidden w-8 mr-3 rounded-full md:block bookmark-color">
                  <span>
                    {bookmarkId.indexOf(list.file_id) !== -1 ? (
                      <div
                        className="onBookmark"
                        onClick={() => deleteBookmarkClickHandler(list.file_id)}
                      >
                        <FaBookmark />
                      </div>
                    ) : (
                      <div
                        onClick={() => addBookmarkClickHandler(list.file_id)}
                      >
                        <FaRegBookmark />
                      </div>
                    )}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{list.title}</p>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-sm text-center">{list.user}</td>
            <td className="px-4 py-3 text-sm text-center">{list.created_at}</td>
            <td className="px-4 py-3 text-sm text-center">{list.file_size}</td>
            <td className="px-4 py-3">
              <button
                onClick={() => deleteClickHandler(list)}
                className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 btn-color rounded-lg focus:outline-none focus:shadow-outline-gray"
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FolderListTable;