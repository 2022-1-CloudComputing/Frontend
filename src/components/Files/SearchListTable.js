import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { bookmarkActions, fileActions } from "../../store";
import { useParams } from "react-router-dom";
import axios from "axios";

const SearchListTable = (props) => {
  const fileList = useSelector((state) => state.file.totalFile);
  const bookmarkId = useSelector((state) => state.bookmark.file_id);

  const dispatch = useDispatch();

  const params = useParams();
  const userID = params.userId;
  const searchText = params.searchtext;

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
    <table className="listtable">
      <thead>
        <tr>
          <th>이름</th>
          <th>유저</th>
          <th>업로드</th>
          <th>파일크기</th>
        </tr>
      </thead>
      <tbody>
        {fileList.map(
          (list) =>
            list.title.includes(searchText) && (
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
              </tr>
            )
        )}
      </tbody>
    </table>
  );
};

export default SearchListTable;
