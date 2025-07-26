import React from 'react';
import { Header } from '../common/Header';

interface MasterLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const MasterLayout: React.FC<MasterLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen w-full bg-background">
      {/* Global Header - Fixed at top */}
      <Header title={title} />
      
      {/* Main Content Area with top padding for fixed header */}
      <main className="pt-16 min-h-screen glass">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};