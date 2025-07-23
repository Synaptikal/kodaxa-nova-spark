import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Brain, 
  Shield, 
  Settings,
  Target,
  DollarSign,
  Users,
  TrendingUp
} from 'lucide-react';

interface MenuItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SidebarItem: React.FC<MenuItem & { isActive?: boolean }> = ({ 
  label, 
  href, 
  icon: Icon, 
  isActive 
}) => {
  return (
    <Link
      to={href}
      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </Link>
  );
};

const defaultMenuItems: MenuItem[] = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'AI Workspace', href: '/ai', icon: Brain },
  { label: 'IP Fortress', href: '/ip', icon: Shield },
  { label: 'Business Foundry', href: '/foundry', icon: BarChart3 },
  { label: 'Admin Panel', href: '/admin', icon: Settings },
];

const aiWorkspaceMenuItems: MenuItem[] = [
  { label: 'AI Dashboard', href: '/ai', icon: Brain },
  { label: 'Quorum Discussion', href: '/ai/quorum', icon: Users },
  { label: 'Active Tasks', href: '/ai/tasks', icon: TrendingUp },
  { label: 'Task History', href: '/ai/task-history', icon: BarChart3 },
  { label: 'Agent Settings', href: '/ai/settings', icon: Settings },
];

const businessMenuItems: MenuItem[] = [
  { label: 'Foundry Dashboard', href: '/foundry', icon: BarChart3 },
  { label: 'Market Sizing', href: '/foundry/market-sizing', icon: Target },
  { label: 'Financial Projections', href: '/foundry/financial-projections', icon: DollarSign },
  { label: 'Competitive Analysis', href: '/foundry/competitive-analysis', icon: TrendingUp },
  { label: 'Customer Segmentation', href: '/foundry/customer-segmentation', icon: Users },
];

const ipFortressMenuItems: MenuItem[] = [
  { label: 'IP Dashboard', href: '/ip', icon: Shield },
  { label: 'Patent Portfolio', href: '/ip/patents', icon: Shield },
  { label: 'Prior Art Search', href: '/ip/search', icon: TrendingUp },
  { label: 'Maintenance Tracker', href: '/ip/maintenance', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  
  const getMenuItems = (): MenuItem[] => {
    if (pathname.startsWith('/ai')) return aiWorkspaceMenuItems;
    if (pathname.startsWith('/ip')) return ipFortressMenuItems;
    if (pathname.startsWith('/foundry')) return businessMenuItems;
    return defaultMenuItems;
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-64 glass border-r border-glass-border/30 h-screen sticky top-20">
      <nav className="p-4 space-y-1">
        {menuItems.map((item, index) => (
          <SidebarItem 
            key={index} 
            {...item} 
            isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
          />
        ))}
      </nav>
    </aside>
  );
};