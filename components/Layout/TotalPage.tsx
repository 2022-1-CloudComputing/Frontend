import React from 'react';

interface TotalProps {
  children: any;
}

const TotalPage = ({ children }: TotalProps) => {
  return (
    <div className="flex h-screen bg-gray-50  overflow-hidden">{children}</div>
  );
};

export default TotalPage;
