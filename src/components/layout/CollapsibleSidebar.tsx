import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { UserMenu } from '../common/UserMenu';
import { Button } from '../ui/button';
import { Menu, X } from 'lucide-react';
import {
  Home,
  Brain,
  Shield,
  DollarSign,
  Atom,
  Scale,
  BarChart3,
  FolderOpen,
  History
} from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: Home },
  { id: 'ai', label: 'AI Workspace', href: '/ai', icon: Brain },
  { id: 'ip', label: 'IP Fortress', href: '/ip', icon: Shield },
  { id: 'forge', label: 'Capital Forge', href: '/forge', icon: DollarSign },
  { id: 'quantum', label: 'Quantum Workspace', href: '/quantum', icon: Atom },
  { id: 'compliance', label: 'Compliance Sentinel', href: '/compliance', icon: Scale },
  { id: 'analytics', label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { id: 'files', label: 'File Manager', href: '/files', icon: FolderOpen },
  { id: 'history', label: 'History & Logs', href: '/history', icon: History }
];

interface CollapsibleSidebarProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

export const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({ isOpen, onToggle }) => {
  const { pathname } = useLocation();

  return (
    <>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => onToggle(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative
        h-screen w-60 glass border-r border-glass-border/30 
        flex flex-col z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-16'}
      `}>
        {/* Logo Section */}
        <div className="p-6 border-b border-glass-border/20">
          {isOpen ? <Logo /> : <div className="w-8 h-8 bg-primary rounded" />}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            
            return (
              <Link
                key={item.id}
                to={item.href}
                className={`group flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-glass/30'
                }`}
                onClick={() => onToggle(false)}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'group-hover:text-foreground'}`} />
                {isOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        {isOpen && (
          <div className="p-4 border-t border-glass-border/20">
            <UserMenu />
          </div>
        )}
      </aside>
    </>
  );
};