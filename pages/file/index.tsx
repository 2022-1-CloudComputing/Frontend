import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import '../../styles/file.css';

const FilePage: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([]);

  const fetchFile = (filename: string) => {
    axios.post('http://localhost:8000/api/File/', {
      name: filename,
    });
  };

  useEffect(() => {
    const fetchGetFile = async () => {
      const res = await axios.get('http://localhost:8000/api/File/');
      console.log(res.data[0]);
      setFileList((filelist) => [...filelist, res.data[0].name]);
      //console.log(fileList);
    };
    fetchGetFile();
  }, []);

  const handleChangeFile = (e: any) => {
    e.preventDefault();
    for (let i: number = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        const fileName: string = e.target.files[i].name;
        setFileList((filelist) => [...filelist, fileName]);
        fetchFile(fileName);
      }
    }
  };

  return (
    <div className="container">
      <div className="main-circle">
        <div className="filebox">
          <label htmlFor="file">파일찾기</label>
          <input type="file" id="file" onChange={handleChangeFile} multiple />
          {fileList.map((list) => (
            <div className="filelist" key={Math.random()}>
              {list}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilePage;
