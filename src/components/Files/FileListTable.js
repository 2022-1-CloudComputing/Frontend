import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fileActions, bookmarkActions, folderActions } from "../../store";
import {
  FaBookmark,
  FaRegBookmark,
  FaTrash,
  FaFolder,
  FaTags,
  FaSortAmountUpAlt,
  FaSortAmountDown,
  FaDownload,
} from "react-icons/fa";
import axios from "axios";

import { useParams } from "react-router-dom";
import TagCreate from "../Layout/TagCreate";

const FileListTable = (props) => {
  const params = useParams();
  const userID = params.userId;

  const newFolderName = useRef();
  const navigate = useNavigate();
  const [showTagCreate, setShowTagCreate] = useState(false);
  const [tagFileId, setTagFileId] = useState(0);
  const [isTagged, setIsTagged] = useState(false);
  const [isSorted, setIsSorted] = useState(true);
  const [dateSorted, setDateSorted] = useState(true);

  const [folderId, setFolderId] = useState(0);
  const [renameFolder, setRenameFolder] = useState({});

  const fileList = useSelector((state) => state.file.file);
  const folderList = useSelector((state) => state.folder.folder);
  const bookmarkId = useSelector((state) => state.bookmark.file_id);

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

  const dispatch = useDispatch();

  const clickHandler = (fileId) => {
    dispatch(fileActions.fileClicked(fileId));
  };

  const sortIconClickHandler = () => {
    setIsSorted(!isSorted);
    setDateSorted(true);

    if (isSorted) {
      dispatch(fileActions.descendingFile());
      dispatch(folderActions.descendingFolder());
    } else {
      dispatch(fileActions.ascendingFile());
      dispatch(folderActions.ascendingFolder());
    }
  };

  const dateIconClickHandler = () => {
    setDateSorted(!dateSorted);
    setIsSorted(true);
    if (dateSorted) {
      dispatch(fileActions.descendingDateFile());
      dispatch(folderActions.descendingDateFolder());
    } else {
      dispatch(fileActions.ascendingDateFile());
      dispatch(folderActions.ascendingDateFolder());
    }
  };

  const downloadClickHandler = async (fileId) => {
    await axios
      .get(`/user/${userID}/file/${fileId}`, {
        headers: headers,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const tagClickHandler = async (fileId) => {
    setShowTagCreate(true);
    // console.log(fileId);
    setTagFileId(fileId);
    const tagRes = await axios.get(`/user/${userID}/search/tag/${fileId}`);

    if (tagRes.data.length === 1) {
      setIsTagged(true);
    } else {
      setIsTagged(false);
    }
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

  const folderClickHandler = (folders) => {
    setFolderId(folders.folder_id);
    setRenameFolder({
      folder_id: folders.folder_id,
      name: folders.name,
    });
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      setFolderId(-1);
      dispatch(
        folderActions.renameFolder({
          folder_id: renameFolder.folder_id,
          name: newFolderName.current.value,
        })
      );
      axios.put(
        `/folder_detail/${renameFolder.folder_id}`,
        {
          id: userID,
          new_name: newFolderName.current.value,
        },
        {
          headers: headers,
        }
      );
    }
  };

  return (
    <div>
      {showTagCreate && (
        <TagCreate
          isTagged={isTagged}
          tagFileId={tagFileId}
          setShowTagCreate={setShowTagCreate}
        />
      )}

      <table className="listtable">
        <thead>
          <tr>
            <th>
              이름{"   "}
              {"      "}
              {isSorted ? (
                <FaSortAmountUpAlt
                  className="sortIcon"
                  onClick={sortIconClickHandler}
                />
              ) : (
                <FaSortAmountDown
                  className="sortIcon"
                  onClick={sortIconClickHandler}
                />
              )}
            </th>
            <th>유저</th>
            <th>
              업로드
              {"      "}
              {dateSorted ? (
                <FaSortAmountUpAlt
                  className="sortIcon"
                  onClick={dateIconClickHandler}
                />
              ) : (
                <FaSortAmountDown
                  className="sortIcon"
                  onClick={dateIconClickHandler}
                />
              )}
            </th>
            <th>파일크기</th>
            <th>삭제</th>
            <th>태그</th>
          </tr>
        </thead>
        <tbody>
          {folderList.map((list) => (
            <tr
              key={Math.random()}
              onDoubleClick={() =>
                navigate(`/${userID}/folder/${list.folder_id}/${list.name}`)
              }
            >
              <td className="td-div">
                <div className="td-div-div">
                  <span>
                    <div onClick={() => folderClickHandler(list)}>
                      <FaFolder />
                    </div>
                  </span>
                </div>
                {folderId !== list.folder_id ? (
                  <p>{list.name}</p>
                ) : (
                  <input onKeyPress={keyPressHandler} ref={newFolderName} />
                )}
              </td>
              <td className="td-user-date">{list.user}</td>
              <td className="td-user-date">{list.created_at}</td>
              <td className="td-user-date">-</td>
              <td className="td-user-date">
                <button
                  onClick={() => deleteClickHandler(list)}
                  className="btn-color"
                >
                  <FaTrash />
                </button>
              </td>
              <td className="td-user-date">
                <div>
                  <button
                    className="tag-icon"
                    onClick={() => tagClickHandler(list.file_id)}
                  >
                    <FaTags />
                  </button>
                </div>
              </td>
              <td className="td-user-date">
                <div>
                  <button
                    onClick={() => tagClickHandler(list.file_id)}
                    className="tag-icon"
                  >
                    -
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {fileList.map((list) => (
            <tr
              className={list.isClicked ? "file-clicked" : ""}
              key={Math.random()}
              onClick={() => clickHandler(list.file_id)}
            >
              <td>
                <div className="td-div">
                  <div className="td-div-div bookmark-color">
                    <span>
                      {bookmarkId.indexOf(list.file_id) !== -1 ? (
                        <div
                          className="onBookmark"
                          onClick={() =>
                            deleteBookmarkClickHandler(list.file_id)
                          }
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

                  <p>{list.title}</p>
                </div>
              </td>
              <td className="td-user-date">{list.user}</td>
              <td className="td-user-date">{list.created_at}</td>
              <td className="td-user-date">{list.file_size}</td>
              <td className="td-user-date">
                <button
                  onClick={() => deleteClickHandler(list)}
                  className="btn-color"
                >
                  <div>
                    <FaTrash />
                  </div>
                </button>
              </td>
              <td className="td-user-date">
                <div>
                  <button
                    onClick={() => tagClickHandler(list.file_id)}
                    className="tag-icon"
                  >
                    <FaTags />
                    {"   "}

                    {list.tag}
                  </button>
                </div>
              </td>
              <td className="td-user-date">
                <div>
                  <button
                    onClick={() => downloadClickHandler(list.file_id)}
                    className="tag-icon"
                  >
                    <FaDownload />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileListTable;
