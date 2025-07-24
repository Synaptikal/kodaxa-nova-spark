import React from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { FloatingMarketplaceButton } from '../common/FloatingMarketplaceButton';

interface ContextualHeaderProps {
  title?: string;
}

const getPageTitle = (pathname: string): string => {
  if (pathname.startsWith('/ai')) return 'AI Workspace';
  if (pathname.startsWith('/ip')) return 'IP Fortress';
  if (pathname.startsWith('/forge')) return 'Capital Forge';
  if (pathname.startsWith('/quantum')) return 'Quantum Workspace';
  if (pathname.startsWith('/compliance')) return 'Compliance Sentinel';
  if (pathname.startsWith('/analytics')) return 'Analytics';
  if (pathname.startsWith('/files')) return 'File Manager';
  if (pathname.startsWith('/history')) return 'History & Logs';
  if (pathname.startsWith('/dashboard')) return 'Dashboard';
  return 'Kodaxa Platform';
};

export const ContextualHeader: React.FC<ContextualHeaderProps> = ({ title }) => {
  const { pathname } = useLocation();
  const pageTitle = title || getPageTitle(pathname);

  return (
    <header className="h-15 glass border-b border-glass-border/30 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-foreground tracking-tight font-cyber">
          {pageTitle}
        </h1>
        <div className="h-4 w-px bg-border/50" />
        <Breadcrumbs />
      </div>
      <div className="flex items-center space-x-4">
        <FloatingMarketplaceButton />
      </div>
    </header>
  );
};