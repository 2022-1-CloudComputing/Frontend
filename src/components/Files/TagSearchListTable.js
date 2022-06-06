import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBookmark,
  FaDownload,
  FaRegBookmark,
  FaSortAmountDown,
  FaSortAmountUpAlt,
  FaTags,
} from "react-icons/fa";
import { bookmarkActions, fileActions, folderActions } from "../../store";
import { useParams } from "react-router-dom";
import axios from "axios";
import TagCreate from "../Layout/TagCreate";

const TagSearchListTable = (props) => {
  const fileList = useSelector((state) => state.file.totalFile);
  const bookmarkId = useSelector((state) => state.bookmark.file_id);

  const [showTagCreate, setShowTagCreate] = useState(false);
  const [tagFileId, setTagFileId] = useState(0);
  const [isTagged, setIsTagged] = useState(false);
  const [isSorted, setIsSorted] = useState(true);
  const [dateSorted, setDateSorted] = useState(true);
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

  const downloadClickHandler = async (fileId) => {
    await axios
      .get(`/user/${userID}/file/${fileId}`, {
        headers: headers,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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

  const dispatch = useDispatch();

  const params = useParams();
  const userID = params.userId;
  const tagText = params.tag;

  const clickHandler = (fileId) => {
    dispatch(fileActions.fileClicked(fileId));
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
          </tr>
        </thead>
        <tbody className="bg-white divide-y ">
          {fileList.map(
            (list) =>
              list.tag.includes(tagText) && (
                <tr
                  className={
                    "text-gray-700 " + (list.isClicked ? "file-clicked" : "")
                  }
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
                              onClick={() =>
                                addBookmarkClickHandler(list.file_id)
                              }
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
              )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TagSearchListTable;
