import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { UserMenu } from './UserMenu';
import { Zap } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  const location = useLocation();
  const isActive = location.pathname === href || location.pathname.startsWith(href + '/');
  
  return (
    <Link 
      to={href}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
      }`}
    >
      {children}
    </Link>
  );
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="glass border-b border-glass-border/30 sticky top-0 z-50 p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Kodaxa</h1>
              <p className="text-xs text-muted-foreground">Orchestrator</p>
            </div>
          </div>
          {title && <h1 className="text-2xl font-bold text-foreground">{title}</h1>}
        </div>
        <nav className="flex items-center gap-6">
          <NavLink href="/ai">🤖 AI Workspace</NavLink>
          <NavLink href="/ip">🛡️ IP Fortress</NavLink>
          <NavLink href="/foundry">📊 Business Foundry</NavLink>
          <NavLink href="/admin">⚙️ Admin</NavLink>
          <UserMenu />
        </nav>
      </div>
    </header>
  );
};