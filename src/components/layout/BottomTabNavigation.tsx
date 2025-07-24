import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Home,
  Brain,
  Shield,
  DollarSign,
  BarChart3
} from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Mobile gets only the 5 most important tabs
const tabItems: TabItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: Home },
  { id: 'ai', label: 'AI', href: '/ai', icon: Brain },
  { id: 'ip', label: 'IP', href: '/ip', icon: Shield },
  { id: 'forge', label: 'Forge', href: '/forge', icon: DollarSign },
  { id: 'analytics', label: 'Analytics', href: '/analytics', icon: BarChart3 }
];

export const BottomTabNavigation: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-glass-border/30 h-16 flex items-center justify-around z-40">
      {tabItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname.startsWith(item.href);
        
        return (
          <Link
            key={item.id}
            to={item.href}
            className={`flex flex-col items-center justify-center space-y-1 px-2 py-1 min-w-0 flex-1 ${
              isActive ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
            <span className="text-xs font-medium truncate">{item.label}</span>
            {isActive && (
              <div className="w-4 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};