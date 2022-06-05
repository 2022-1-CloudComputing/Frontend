import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fileActions, bookmarkActions } from "../../store";
import { FaBookmark, FaRegBookmark, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

const BookmarkListTable = (props) => {
  const params = useParams();
  const userID = params.userId;

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
        {fileList.map(
          (list) =>
            bookmarkId.indexOf(list.file_id) !== -1 && (
              <tr className="text-gray-700 " key={Math.random()}>
                <td className="px-4 py-3">
                  <div className="flex items-center text-sm">
                    <div className="relatevie hidden w-8 mr-3 rounded-full md:block bookmark-color">
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
              </tr>
            )
        )}
      </tbody>
    </table>
  );
};

export default BookmarkListTable;
