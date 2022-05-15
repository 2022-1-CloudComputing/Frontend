import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { counterActions, fileActions } from '../../store';

const HomePage = () => {
  // const fileList = useSelector((state) => state.file.file);
  // console.log(fileList);
  // const dispatch = useDispatch();

  // const clickHandler = () => {
  //   dispatch(
  //     fileActions.addFile({
  //       name: 'SWIFT',
  //       created_at: '2022-05-11T15:40:36.961502+09:00',
  //     })
  //   );
  // };

  return (
    <div>
      <h1> HomePage</h1>
      {/* <button onClick={clickHandler}>증가하기</button>
      
      {fileList.map((file) => (
        <div>
          <h1>{file.name}</h1>
          <h2>{file.created_at}</h2>
        </div>
      ))}
      <div></div> */}
    </div>
  );
};
export default HomePage;
