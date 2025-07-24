import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Breadcrumbs } from './Breadcrumbs';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showSidebar?: boolean;
  showBreadcrumbs?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  showSidebar = true,
  showBreadcrumbs = true
}) => {
  return (
    <div className="min-h-screen bg-background">
      <Header title={title} />
      <div className="flex">
        {showSidebar && <Sidebar />}
        <main className="flex-1 p-6">
          {showBreadcrumbs && <Breadcrumbs />}
          {children}
        </main>
      </div>
    </div>
  );
};
