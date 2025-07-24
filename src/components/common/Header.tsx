import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { UserMenu } from './UserMenu';
import { usePreloadRoutes } from '@/hooks/usePreloadRoutes';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  Brain,
  MessageSquare,
  History,
  Settings,
  Shield,
  Search,
  AlertTriangle,
  Target,
  BarChart3,
  TrendingUp,
  Users,
  Database,
  Activity,
  Key,
  ShoppingCart,
  DollarSign,
  Monitor,
  CreditCard,
  Package
} from 'lucide-react';

interface HeaderProps {
  title?: string;
}

interface NavItem {
  href: string;
  label: string;
  icon?: React.ComponentType<any>;
}

const navigationMenus = {
  ai: {
    label: 'AI Workspace',
    href: '/ai',
    items: [
      { href: '/ai/quorum', label: 'AI Quorum', icon: Brain },
      { href: '/ai/tasks', label: 'Active Tasks', icon: Activity },
      { href: '/ai/task-history', label: 'Task History', icon: History },
      { href: '/ai/settings', label: 'Agent Settings', icon: Settings }
    ]
  },
  ip: {
    label: 'IP Fortress',
    href: '/ip',
    items: [
      { href: '/ip/search', label: 'Patent Search', icon: Search },
      { href: '/ip/maintenance', label: 'Maintenance Alerts', icon: AlertTriangle },
      { href: '/ip/patents', label: 'Patent Portfolio', icon: Shield }
    ]
  },
  forge: {
    label: 'Capital Forge',
    href: '/forge',
    items: [
      { href: '/forge/market-sizing', label: 'Market Sizing', icon: Target },
      { href: '/forge/financial-projections', label: 'Financial Projections', icon: TrendingUp },
      { href: '/forge/competitive-analysis', label: 'Competitive Analysis', icon: BarChart3 },
      { href: '/forge/customer-segmentation', label: 'Customer Segmentation', icon: Users }
    ]
  },
  marketplace: {
    label: 'Marketplace',
    href: '/add-ons',
    items: [
      { href: '/add-ons', label: 'Browse Add-ons', icon: ShoppingCart },
      { href: '/pricing', label: 'Pricing Plans', icon: CreditCard },
      { href: '/subscription', label: 'My Subscription', icon: Package }
    ]
  },
  admin: {
    label: 'Administration',
    href: '/admin',
    items: [
      { href: '/admin', label: 'System Overview', icon: Database },
      { href: '/analytics', label: 'Revenue Analytics', icon: Monitor },
      { href: '/settings', label: 'Settings', icon: Settings },
      { href: '/profile', label: 'Profile', icon: Users }
    ]
  }
};

const NavDropdown: React.FC<{ menu: any; isActive: boolean }> = ({ menu, isActive }) => {
  const { preloadOnHover } = usePreloadRoutes();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`px-4 py-2.5 text-sm font-medium transition-all duration-200 relative group ${
            isActive 
              ? 'text-primary bg-primary/8 border border-primary/20' 
              : 'text-muted-foreground hover:text-foreground hover:bg-glass/50'
          }`}
          onMouseEnter={() => preloadOnHover(menu.href)}
        >
          {menu.label}
          <ChevronDown className="w-4 h-4 ml-1 transition-transform group-data-[state=open]:rotate-180" />
          {isActive && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="glass border-glass-border/30 backdrop-blur-lg">
        <DropdownMenuItem asChild>
          <Link 
            to={menu.href} 
            className="flex items-center w-full"
            onMouseEnter={() => preloadOnHover(menu.href)}
          >
            <Database className="w-4 h-4 mr-2" />
            {menu.label} Overview
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {menu.items.map((item: NavItem) => {
          const Icon = item.icon || Settings;
          return (
            <DropdownMenuItem key={item.href} asChild>
              <Link 
                to={item.href} 
                className="flex items-center w-full"
                onMouseEnter={() => preloadOnHover(item.href)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const SimpleNavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
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
  const location = useLocation();

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
          {/* AI Workspace */}
          <NavDropdown
            menu={navigationMenus.ai}
            isActive={location.pathname.startsWith('/ai')}
          />

          {/* IP Fortress */}
          <NavDropdown
            menu={navigationMenus.ip}
            isActive={location.pathname.startsWith('/ip')}
          />

          {/* Capital Forge */}
          <NavDropdown
            menu={navigationMenus.forge}
            isActive={location.pathname.startsWith('/forge')}
          />

          {/* Marketplace */}
          <NavDropdown
            menu={navigationMenus.marketplace}
            isActive={location.pathname.startsWith('/add-ons') || location.pathname.startsWith('/pricing') || location.pathname.startsWith('/subscription')}
          />

          {/* Administration */}
          <NavDropdown
            menu={navigationMenus.admin}
            isActive={location.pathname.startsWith('/admin') || location.pathname.startsWith('/settings') || location.pathname.startsWith('/profile') || location.pathname.startsWith('/analytics')}
          />

          <div className="h-6 w-px bg-border/50 mx-2" />
          <UserMenu />
        </nav>
      </div>
    </header>
  );
};
