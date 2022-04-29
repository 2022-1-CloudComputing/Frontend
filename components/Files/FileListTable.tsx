import React from 'react';

interface FileListTableProps {
  fileList: any;
}

const FileListTable = ({ fileList }: FileListTableProps) => {
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
        {fileList.map((list: any) => (
          <tr className="text-gray-700 " key={Math.random()}>
            <td className="px-4 py-3">
              <div className="flex items-center text-sm">
                <div className="relatevie hidden w-8 mr-3 rounded-full md:block">
                  <div>
                    <p className="font-semibold">{list.name}</p>
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-sm">{list.uploadDate}</td>
            <td className="px-4 py-3 text-sm">{list.uploadDate}</td>
            <td className="px-4 py-3 text-sm">{list.fileSize}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FileListTable;
