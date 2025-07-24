import React, { ReactNode } from 'react';

interface SimpleWrapperProps {
  children: ReactNode;
}

export const SimpleWrapper: React.FC<SimpleWrapperProps> = ({ children }) => {
  console.log('SimpleWrapper rendering - React is working');
  return <>{children}</>;
};
