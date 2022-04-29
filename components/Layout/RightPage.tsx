import React from 'react';
import Header from './Header';

interface RightPageProps {
  children: any;
}

const RightPage = ({ children }: RightPageProps) => {
  return (
    <div className="flex flex-col flex-1 w-full">
      <Header />
      {children}
    </div>
  );
};

export default RightPage;
