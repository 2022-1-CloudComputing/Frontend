import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { folderActions } from "../../store";

const FolderCreate = (props) => {
  const outSection = useRef();
  const inputText = useRef();
  const dispatch = useDispatch();

  const params = useParams();
  const userID = params.userId;
  const parentID = params.folderId;
  console.log(parentID === "2");

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

  const dayCheck = (day) => {
    let returnDate = "" + day;
    if (returnDate.length < 2) {
      returnDate = "0" + returnDate;
    }

    return returnDate;
  };

  const dateCheck = () => {
    const now = new Date();
    const year = "" + now.getFullYear();
    const month = dayCheck(now.getMonth() + 1);
    const date = dayCheck(now.getDate());

    return year + "-" + month + "-" + date;
  };

  const createFolderHandler = (e) => {
    props.setShowCreateFolder(false);
    props.setmodalOn(false);
    console.log(inputText.current.value);
    const folderBox = {
      id: userID,
      path: "",
      name: inputText.current.value + "/",
      user_id: userID,
      parent_id: parentID ? parentID : 1,
    };
    const storeFolderBox = {
      user: userID,
      path: "",
      name: inputText.current.value,
      user_id: userID,
      parent_id: parentID ? parentID : 1,
      created_at: dateCheck(),
    };
    axios.post(`/folder_create`, folderBox, {
      headers: headers,
    });
    dispatch(folderActions.addFolder(storeFolderBox));
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
