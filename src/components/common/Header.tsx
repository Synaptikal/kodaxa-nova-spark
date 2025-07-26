import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from './Logo';
import { UserMenu } from './UserMenu';

interface HeaderProps {
  title?: string;
}

const navigationTabs = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'ai', label: 'AI Workspace', href: '/ai' },
  { id: 'ip', label: 'IP Fortress', href: '/ip' },
  { id: 'forge', label: 'Capital Forge', href: '/forge' },
  { id: 'quantum', label: 'Quantum Workspace', href: '/quantum' },
  { id: 'compliance', label: 'Compliance Sentinel', href: '/compliance' },
  { id: 'analytics', label: 'Analytics', href: '/analytics' },
  { id: 'files', label: 'File Manager', href: '/files' },
  { id: 'history', label: 'History & Logs', href: '/history' }
];

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { pathname } = useLocation();

  return (
    <header className="h-16 glass border-b border-glass-border/30 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      {/* Left Section - Logo & Navigation */}
      <div className="flex items-center space-x-8">
        <Logo />
        
        {/* Main Navigation Tabs */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationTabs.map((tab) => {
            const isActive = pathname.startsWith(tab.href) || (pathname === '/' && tab.href === '/dashboard');
            return (
              <Link
                key={tab.id}
                to={tab.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/20 text-primary shadow-[0_0_20px_rgba(var(--primary)_/_0.3)] border border-primary/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-glass/30'
                }`}
              >
                {tab.label}
                {isActive && (
                  <div className="h-0.5 bg-primary rounded-full mt-1 shadow-[0_0_10px_currentColor]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Center Section - Global Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects, files, AI outputs..."
            className="pl-10 glass border-glass-border/30 focus:border-primary focus:shadow-[0_0_20px_rgba(var(--primary)_/_0.2)]"
          />
        </div>
      </div>

      {/* Right Section - Actions & User */}
      <div className="flex items-center space-x-4">
        <Button 
          size="sm" 
          className="bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(var(--primary)_/_0.4)] hover:shadow-[0_0_25px_rgba(var(--primary)_/_0.6)]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
        
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
        
        <UserMenu />
      </div>
    </header>
  );
};