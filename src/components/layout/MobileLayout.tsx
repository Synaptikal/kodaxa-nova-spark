import React from 'react';
import { ContextualHeader } from './ContextualHeader';
import { BottomTabNavigation } from './BottomTabNavigation';

interface MobileLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      {/* Header */}
      <ContextualHeader title={title} />
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto glass p-4 pb-20">
        {children}
      </main>
      
      {/* Bottom Tab Navigation */}
      <BottomTabNavigation />
    </div>
  );
};