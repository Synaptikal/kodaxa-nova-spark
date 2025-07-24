import React from 'react';
import { PersistentSidebar } from './PersistentSidebar';
import { ContextualHeader } from './ContextualHeader';

interface MasterLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const MasterLayout: React.FC<MasterLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Persistent Left Sidebar - 240px */}
      <PersistentSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col" style={{ width: 'calc(100vw - 240px)' }}>
        {/* Contextual Header - 60px height */}
        <ContextualHeader title={title} />
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto glass p-6">
          {children}
        </main>
      </div>
    </div>
  );
};