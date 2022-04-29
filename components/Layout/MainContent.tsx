import React from 'react';

interface MainContentProps {
  children: any;
}

const MainContent = ({ children }: MainContentProps) => {
  return <div className="my-6">{children}</div>;
};

export default MainContent;
