import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookmarkActions, fileActions, folderActions } from "../../store";
import {
  FaBookmark,
  FaTrash,
  FaTags,
  FaDownload,
  FaSortAmountUpAlt,
  FaSortAmountDown,
} from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookmarkListTable = (props) => {
  const params = useParams();
  const userID = params.userId;
  const [isSorted, setIsSorted] = useState(true);
  const [dateSorted, setDateSorted] = useState(true);
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

  const fileList = useSelector((state) => state.file.totalFile);
  const bookmarkId = useSelector((state) => state.bookmark.file_id);
  // console.log(bookmarkId);

  const dispatch = useDispatch();

  const deleteBookmarkClickHandler = (fileId) => {
    axios
      .delete(`/user/${userID}/bookmark/${fileId}`)
      .then((res) => console.log(res));

    dispatch(bookmarkActions.deleteBookmark(fileId));
  };

  return (
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
        {fileList.map(
          (list) =>
            bookmarkId.indexOf(list.file_id) !== -1 && (
              <tr key={Math.random()}>
                <td>
                  <div className="td-div">
                    <div className="td-div-div bookmark-color">
                      <span>
                        <div
                          className="onBookmark"
                          onClick={() =>
                            deleteBookmarkClickHandler(list.file_id)
                          }
                        >
                          <FaBookmark />
                        </div>
                      </span>
                    </div>
                    <div>
                      <p>{list.title}</p>
                    </div>
                  </div>
                </td>
                <td className="td-user-date">{list.user}</td>
                <td className="td-user-date">{list.created_at}</td>
                <td className="td-user-date">{list.file_size}</td>

                <td className="td-user-date">
                  <button className="btn-color">
                    <div>
                      <FaTrash />
                    </div>
                  </button>
                </td>
                <td className="td-user-date">
                  <div>
                    <button className="tag-icon">
                      <FaTags />
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
            )
        )}
      </tbody>
    </table>
  );
};

export default BookmarkListTable;
