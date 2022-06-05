import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fileActions, folderActions } from "../../store";

const TagCreate = (props) => {
  const outSection = useRef();
  const inputText = useRef();
  const dispatch = useDispatch();

  const params = useParams();
  const userID = params.userId;

  const outClickHandler = (e) => {
    if (outSection.current === e.target) {
      props.setShowTagCreate(false);
    }
  };

  const tagCreateClick = (e) => {
    console.log(inputText.current.value);
    props.setShowTagCreate(false);
    console.log(props.tagFileId);
    dispatch(
      fileActions.addTag({
        file_id: props.tagFileId,
        tag: inputText.current.value,
      })
    );
    axios.post(`/user/${userID}/file/tag/upload`, {
      fileId: props.tagFileId,
      tagName: inputText.current.value,
    });
  };

  const tagDeleteClick = (e) => {
    axios
      .delete(`/user/${userID}/file/${props.tagFileId}/tag/delete`, {
        fileId: props.tagFileId,
      })
      .then((res) => console.log(res));
    props.setShowTagCreate(false);
    dispatch(
      fileActions.addTag({
        file_id: props.tagFileId,
        tag: "",
      })
    );
  };

  return (
    <div className="tag-container" ref={outSection} onClick={outClickHandler}>
      <div className="create-tag-modal">
        <div className="tag-input-box">
          {!props.isTagged ? (
            <div>
              <p>새 태그</p> <input className="tag-input" ref={inputText} />
            </div>
          ) : (
            <div className="tag-delete">
              <div>
                <p>태그 삭제</p>
              </div>
              <h1>태그를 삭제하시겠습니까?</h1>
            </div>
          )}

          <div>
            {!props.isTagged ? (
              <button className="tag-create-btn" onClick={tagCreateClick}>
                생성
              </button>
            ) : (
              <button className="tag-create-btn" onClick={tagDeleteClick}>
                삭제
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagCreate;
