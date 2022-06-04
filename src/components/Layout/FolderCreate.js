import axios from "axios";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";

const FolderCreate = (props) => {
  const outSection = useRef();
  const inputText = useRef();

  const params = useParams();
  const userID = params.userId;

  const IdToken = window.sessionStorage.getItem("IdToken");
  const AccessKeyId = window.sessionStorage.getItem("AccessKeyId");
  const SecretKey = window.sessionStorage.getItem("SecretKey");
  const SessionToken = window.sessionStorage.getItem("SessionToken");
  const headers = {
    "Content-Type": "multipart/form-data",
    IdToken: IdToken,
    AccessKeyId: AccessKeyId,
    SecretKey: SecretKey,
    SessionToken: SessionToken,
  };

  const outClickHandler = (e) => {
    if (outSection.current === e.target) {
      props.setShowCreateFolder(false);
      props.setmodalOn(false);
    }
  };

  const createFolderHandler = (e) => {
    props.setShowCreateFolder(false);
    props.setmodalOn(false);
    console.log(inputText.current.value);
    axios.post(
      `/folder_create`,
      {
        id: userID,
        path: "",
        name: inputText.current.value + "/",
        user_id: userID,
        parent_id: 1,
      },
      {
        headers: headers,
      }
    );
  };

  return (
    <div
      className="folder-container"
      ref={outSection}
      onClick={outClickHandler}
    >
      <div className="create-folder-modal">
        <div className="folder-input-box">
          <p>새 폴더</p>
          <input className="folder-input" ref={inputText} />
          <div>
            <button className="folder-create-btn" onClick={createFolderHandler}>
              생성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderCreate;
