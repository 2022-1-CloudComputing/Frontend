import React from 'react';
import MainContent from '../../components/Layout/MainContent';
import RightContainer from '../../components/Layout/RightContainer';
import RightPage from '../../components/Layout/RightPage';
import Sidebar from '../../components/Layout/Sidebar';
import TotalPage from '../../components/Layout/TotalPage';

const SharePage = () => {
  return (
    <TotalPage>
      <Sidebar />
      <RightPage>
        <RightContainer>
          <MainContent>
            <h1>Share</h1>
          </MainContent>
        </RightContainer>
      </RightPage>
    </TotalPage>
  );
};

export default SharePage;
