import React from "react";
import { FaShareAlt, FaLink, FaTags, FaGithub } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="main-top-container">
        <div className="main-top-contents">
          <div className="main-title">
            <span>OU</span>
          </div>
          <div className="main-subtitle">
            <span>Cloud Computing</span>
          </div>
        </div>
        <div className="main-btn-content">
          <Link to="login">
            <button className="button-55">시작하기</button>
          </Link>
        </div>
      </div>
      <div className="main-center-contents">
        <div className="main-center-icon">
          <div className="main-icons">
            <FaShareAlt />
          </div>
          <div className="main-center-text">
            SHARE <br />
            공유 최적화
          </div>
        </div>
        <div className="main-center-icon">
          <div className="main-icons">
            <FaLink />
          </div>
          <div className="main-center-text">
            LINK <br />
            링크 암호화
          </div>
        </div>
        <div className="main-center-icon">
          <div className="main-icons">
            <GrGroup />
          </div>
          <div className="main-center-text">
            GROUP
            <br />
            그룹간 공유
          </div>
        </div>
        <div className="main-center-icon">
          <div className="main-icons">
            <FaTags />
          </div>
          <div className="main-center-text">
            TAGS <br />
            태그를 통한 분류
          </div>
        </div>
      </div>
      <div className="main-bottom-container">
        <footer>
          <a href="https://github.com/2022-1-CloudComputing">
            <FaGithub />
          </a>
          <br />
          <span>2022-1 Cloud Computing B조</span> <br />
          <span>
            DEVELOPER : 김진우, 민수빈, 이세진, 정승우, 정홍주, 허인경
          </span>
        </footer>
      </div>
    </div>
  );
};
export default HomePage;
