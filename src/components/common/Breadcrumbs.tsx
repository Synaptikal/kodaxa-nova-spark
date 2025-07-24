import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<any>;
}

const pathLabels: Record<string, string> = {
  '': 'Dashboard',
  'ai': 'AI Workspace',
  'ai-workspace': 'AI Workspace',
  'quorum': 'AI Quorum',
  'tasks': 'Active Tasks',
  'task-history': 'Task History',
  'settings': 'Settings',
  'ip': 'IP Fortress',
  'ip-fortress': 'IP Fortress',
  'search': 'Patent Search',
  'patents': 'Patent Portfolio',
  'maintenance': 'Maintenance Alerts',
  'forge': 'Capital Forge',
  'capital-forge': 'Capital Forge',
  'market-sizing': 'Market Sizing',
  'financial-projections': 'Financial Projections',
  'competitive-analysis': 'Competitive Analysis',
  'customer-segmentation': 'Customer Segmentation',
  'admin': 'Administration',
  'profile': 'Profile',
  'pricing': 'Pricing Plans',
  'subscription': 'My Subscription',
  'subscription-success': 'Subscription Success',
  'add-ons': 'Marketplace',
  'analytics': 'Revenue Analytics',
  'auth': 'Authentication',
  'enterprise-sales': 'Enterprise Sales'
};

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  if (pathSegments.length === 0) {
    return null; // Don't show breadcrumbs on homepage
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/', icon: Home }
  ];

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    // Don't add link for the current page (last item)
    const href = index === pathSegments.length - 1 ? undefined : currentPath;
    
    breadcrumbs.push({ label, href });
  });

  return (
    <nav className="flex items-center flex-wrap text-sm text-muted-foreground mb-4">
      {breadcrumbs.map((item, index) => {
        const Icon = item.icon;
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-muted-foreground/50 mx-1" />
            )}

            {item.href ? (
              <Link
                to={item.href}
                className="flex items-center hover:text-foreground transition-colors duration-200"
              >
                {Icon && <Icon className="w-4 h-4 mr-1" />}
                {item.label}
              </Link>
            ) : (
              <span className={`flex items-center ${isLast ? 'text-foreground font-medium' : ''}`}>
                {Icon && <Icon className="w-4 h-4 mr-1" />}
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
};
