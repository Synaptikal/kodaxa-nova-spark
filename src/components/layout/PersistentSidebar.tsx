import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { UserMenu } from '../common/UserMenu';
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
  description: string;
}

const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: Home, description: 'Primary overview' },
  { id: 'ai', label: 'AI Workspace', href: '/ai', icon: Brain, description: 'Quorum deliberation' },
  { id: 'ip', label: 'IP Fortress', href: '/ip', icon: Shield, description: 'Patent management' },
  { id: 'forge', label: 'Capital Forge', href: '/forge', icon: DollarSign, description: 'Business modeling' },
  { id: 'quantum', label: 'Quantum Workspace', href: '/quantum', icon: Atom, description: 'Future development' },
  { id: 'compliance', label: 'Compliance Sentinel', href: '/compliance', icon: Scale, description: 'Regulatory tracking' },
  { id: 'analytics', label: 'Analytics', href: '/analytics', icon: BarChart3, description: 'Performance metrics' },
  { id: 'files', label: 'File Manager', href: '/files', icon: FolderOpen, description: 'Asset management' },
  { id: 'history', label: 'History & Logs', href: '/history', icon: History, description: 'Audit trails' }
];

const NavigationItem: React.FC<NavigationItem & { isActive: boolean }> = ({ 
  label, 
  href, 
  icon: Icon, 
  isActive, 
  description 
}) => {
  return (
    <Link
      to={href}
      className={`group flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-primary/10 text-primary border border-primary/20'
          : 'text-muted-foreground hover:text-foreground hover:bg-glass/30'
      }`}
      title={description}
    >
      <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'group-hover:text-foreground'}`} />
      <span>{label}</span>
      {isActive && (
        <div className="ml-auto w-1 h-4 bg-primary rounded-full" />
      )}
    </Link>
  );
};

export const PersistentSidebar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <aside className="w-60 h-screen glass border-r border-glass-border/30 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-glass-border/20">
        <Logo />
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => (
          <NavigationItem
            key={item.id}
            {...item}
            isActive={pathname.startsWith(item.href)}
          />
        ))}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-glass-border/20">
        <UserMenu />
      </div>
    </aside>
  );
};