import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fileActions } from '../../store';
import { FaBookmark, FaRegBookmark, FaTrash } from 'react-icons/fa';

const FileListTable = (props) => {
  const fileList2 = useSelector((state) => state.file.file);
  const dispatch = useDispatch();

  const deleteClickHandler = (fileName) => {
    props.deleteFile(fileName);

    dispatch(fileActions.deleteFile(fileName));
  };

  const bookmarkClickHandler = (fileName) => {
    dispatch(fileActions.bookmarkFile(fileName));
  };

  return (
    <table className="w-full whitespace-no-wrap">
      <thead>
        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b  bg-gray-50 ">
          <th className="px-4 py-3">이름</th>
          <th className="px-4 py-3">업로드</th>
          <th className="px-4 py-3">수정날짜</th>
          <th className="px-4 py-3">파일크기</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y ">
        {fileList2.map((list) => (
          <tr className="text-gray-700 " key={Math.random()}>
            <td className="px-4 py-3">
              <div className="flex items-center text-sm">
                <div
                  className="relatevie hidden w-8 mr-3 rounded-full md:block bookmark-color"
                  onClick={() => bookmarkClickHandler(list.name)}
                >
                  <span>
                    {list.bookmark === true ? (
                      <FaBookmark />
                    ) : (
                      <FaRegBookmark />
                    )}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{list.name}</p>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-sm">{list.uploadDate}</td>
            <td className="px-4 py-3 text-sm">{list.uploadDate}</td>
            <td className="px-4 py-3 text-sm">{list.fileSize}</td>
            <td className="px-4 py-3">
              <button
                onClick={() => deleteClickHandler(list.name)}
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
