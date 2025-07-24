import React, { useState } from 'react';
import { CollapsibleSidebar } from './CollapsibleSidebar';
import { ContextualHeader } from './ContextualHeader';

interface TabletLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const TabletLayout: React.FC<TabletLayoutProps> = ({ children, title }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Collapsible Sidebar */}
      <CollapsibleSidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <ContextualHeader title={title} />
        <main className="flex-1 overflow-auto glass p-4">
          {children}
        </main>
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};