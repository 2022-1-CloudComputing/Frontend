import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBookmark, FaRegBookmark, FaTags } from "react-icons/fa";
import { bookmarkActions, fileActions } from "../../store";
import { useParams } from "react-router-dom";
import axios from "axios";

const TagSearchListTable = (props) => {
  const fileList = useSelector((state) => state.file.totalFile);
  const bookmarkId = useSelector((state) => state.bookmark.file_id);

  const dispatch = useDispatch();

  const params = useParams();
  const userID = params.userId;
  const tagText = params.tag;

  const clickHandler = (fileId) => {
    dispatch(fileActions.fileClicked(fileId));
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
                            onClick={() =>
                              addBookmarkClickHandler(list.file_id)
                            }
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
                <td className="px-4 py-3 text-sm text-center">
                  {list.created_at}
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  {list.file_size}
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <div className="tag">
                    <button className="tag-icon">
                      <FaTags />
                    </button>
                    <div className="tagname">
                      <p>{list.tag}</p>
                    </div>
                  </div>
                </td>
              </tr>
            )
        )}
      </tbody>
    </table>
  );
};

export default TagSearchListTable;
