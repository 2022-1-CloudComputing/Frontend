import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fileActions } from "../../store";
import { FaUserCircle, FaShareAlt } from "react-icons/fa";

const FileShare = (props) => {
  const outSection = useRef();
  const inputText = useRef();
  const dispatch = useDispatch();

  const params = useParams();
  const userID = params.userId;

  const outClickHandler = (e) => {
    if (outSection.current === e.target) {
      props.setShowShare(false);
    }
  };

  const shareClickHandler = (e) => {
    props.setShowShare(false);
  };

  return (
    <div
      className="modal-background"
      ref={outSection}
      onClick={outClickHandler}
    >
      <div className="share-container">
        <div className="share-modal">
          <div className="tag-input-box">
            <div className="share-title">
              <p>파일 공유</p>
            </div>
            <div>
              <ul className="share-box">
                <li className="share-user">
                  <div className="share-profile">
                    <FaUserCircle />
                  </div>
                  <div className="share-name">muzy</div>
                  <div className="share-button" onClick={shareClickHandler}>
                    <FaShareAlt />
                  </div>
                </li>
                <li className="share-user">
                  <div className="share-profile">
                    <FaUserCircle />
                  </div>
                  <div className="share-name">swj1001</div>
                  <div className="share-button" onClick={shareClickHandler}>
                    <FaShareAlt />
                  </div>
                </li>
                <li className="share-user">
                  <div className="share-profile">
                    <FaUserCircle />
                  </div>
                  <div className="share-name">sunny</div>

                  <div className="share-button" onClick={shareClickHandler}>
                    <FaShareAlt />
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <button className="share-btn" onClick={shareClickHandler}>
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileShare;
