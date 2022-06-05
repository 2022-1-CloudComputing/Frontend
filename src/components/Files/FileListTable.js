import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fileActions, bookmarkActions, clickedActions } from "../../store";
import {
  FaBookmark,
  FaRegBookmark,
  FaTrash,
  FaFolder,
  FaTags,
} from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import TagCreate from "../Layout/TagCreate";

const FileListTable = (props) => {
  const params = useParams();
  const userID = params.userId;
  const navigate = useNavigate();
  const [showTagCreate, setShowTagCreate] = useState(false);
  const [tagFileId, setTagFileId] = useState(0);
  const [fileTagName, setFileTagName] = useState("");
  const [isTagged, setIsTagged] = useState(false);

  const fileList = useSelector((state) => state.file.file);
  const folderList = useSelector((state) => state.folder.folder);
  const bookmarkId = useSelector((state) => state.bookmark.file_id);
  // console.log(bookmarkId);

  const dispatch = useDispatch();

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
    <div>
      {showTagCreate && (
        <TagCreate
          isTagged={isTagged}
          tagFileId={tagFileId}
          setShowTagCreate={setShowTagCreate}
        />
      )}
      <table className="w-full whitespace-no-wrap">
        <thead>
          <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b  bg-gray-50 ">
            <th className="px-4 py-3 text-center">이름</th>
            <th className="px-4 py-3 text-center">유저</th>
            <th className="px-4 py-3 text-center">업로드</th>
            <th className="px-4 py-3 text-center">파일크기</th>
            <th className="px-4 py-3 text-center">삭제</th>
            <th className="px-4 py-3 text-center">태그</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y ">
          {folderList.map((list) => (
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
              <td className="px-4 py-3 text-sm text-center">
                {list.created_at}
              </td>
              <td className="px-4 py-3 text-sm text-center">-</td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => deleteClickHandler(list)}
                  className="text-sm btn-color rounded-lg  "
                >
                  <FaTrash />
                </button>
              </td>
              <td className="px-4 py-3 text-sm text-center">
                <div className="tag">
                  <button
                    className="tag-icon"
                    onClick={() => tagClickHandler(list.file_id)}
                  >
                    <FaTags />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {fileList.map((list) => (
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
                  <div className="filename-tag">
                    <p className="font-semibold">{list.title}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-center">{list.user}</td>
              <td className="px-4 py-3 text-sm text-center">
                {list.created_at}
              </td>
              <td className="px-4 py-3 text-sm text-center">
                {list.file_size}
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => deleteClickHandler(list)}
                  className="text-sm btn-color rounded-lg  "
                >
                  <div>
                    <FaTrash />
                  </div>
                </button>
              </td>
              <td className="px-4 py-3 text-sm text-center">
                <div className="tag">
                  <button
                    className="tag-icon"
                    onClick={() => tagClickHandler(list.file_id)}
                  >
                    <FaTags />
                  </button>
                  <div className="tagname">
                    <p>{list.tag}</p>
                  </div>
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
