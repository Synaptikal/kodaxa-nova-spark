import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { UserMenu } from './UserMenu';
import { usePreloadRoutes } from '@/hooks/usePreloadRoutes';

interface HeaderProps {
  title?: string;
}

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  const location = useLocation();
  const { preloadOnHover } = usePreloadRoutes();
  const isActive = location.pathname === href || location.pathname.startsWith(href + '/');
  
  return (
    <Link 
      to={href}
      onMouseEnter={() => preloadOnHover(href)}
      className={`px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 relative ${
        isActive 
          ? 'text-primary bg-primary/8 border border-primary/20' 
          : 'text-muted-foreground hover:text-foreground hover:bg-glass/50'
      }`}
    >
      {children}
      {isActive && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
      )}
    </Link>
  );
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="glass border-b border-glass-border/30 sticky top-0 z-50 p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <Logo />
          {title && (
            <div className="h-6 w-px bg-border/50" />
          )}
          {title && <h1 className="text-xl font-semibold text-foreground tracking-tight">{title}</h1>}
        </div>
        <nav className="flex items-center gap-1">
          <NavLink href="/ai">AI Workspace</NavLink>
          <NavLink href="/ip">IP Fortress</NavLink>
          <NavLink href="/forge">Capital Forge</NavLink>
          <NavLink href="/admin">Administration</NavLink>
          <div className="h-6 w-px bg-border/50 mx-2" />
          <UserMenu />
        </nav>
      </div>
    </header>
  );
};