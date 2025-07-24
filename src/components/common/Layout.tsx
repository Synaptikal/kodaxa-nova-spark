import React from 'react';
import { Header } from './Header';
import { AIChatSidebar } from './AIChatSidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { FloatingMarketplaceButton } from './FloatingMarketplaceButton';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

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
  useKeyboardNavigation();
  return (
    <div className="min-h-screen bg-background">
      <Header title={title} />
      <div className="flex">
        {showSidebar && <AIChatSidebar />}
        <main className="flex-1 p-6">
          {showBreadcrumbs && <Breadcrumbs />}
          {children}
        </main>
      </div>
      <FloatingMarketplaceButton />
    </div>
  );
};
