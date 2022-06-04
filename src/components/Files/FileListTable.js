import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fileActions, bookmarkActions } from "../../store";
import { FaBookmark, FaRegBookmark, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

const FileListTable = (props) => {
  const params = useParams();
  const userID = params.userId;

  const fileList = useSelector((state) => state.file.file);
  const bookmarkId = useSelector((state) => state.bookmark.file_id);
  // console.log(bookmarkId);

  const dispatch = useDispatch();

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
        {fileList.map((list) => (
          <tr className="text-gray-700 " key={Math.random()}>
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

export default FileListTable;
