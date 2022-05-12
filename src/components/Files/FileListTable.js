import React, { useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark, FaTrash } from 'react-icons/fa';

const FileListTable = (props) => {
  // const [propsFileList, setPropsFileList] = useState(props.fileList);

  const deleteClickHandler = (fileName) => {
    props.deleteFile(fileName);

    props.setFileList(props.fileList.filter((list) => list.name !== fileName));
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
        {props.fileList.map((list) => (
          <tr className="text-gray-700 " key={Math.random()}>
            <td className="px-4 py-3">
              <div className="flex items-center text-sm">
                <div
                  className="relatevie hidden w-8 mr-3 rounded-full md:block"
                  onClick={() => props.bookmarkClickHandler(list.name)}
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
                className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
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
