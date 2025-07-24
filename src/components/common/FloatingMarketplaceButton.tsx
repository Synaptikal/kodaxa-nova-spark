import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Plus, 
  Sparkles, 
  Package,
  X
} from 'lucide-react';

export const FloatingMarketplaceButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  
  // Don't show on marketplace pages
  if (location.pathname.startsWith('/add-ons') || 
      location.pathname.startsWith('/pricing') || 
      location.pathname.startsWith('/subscription')) {
    return null;
  }

  const quickLinks = [
    {
      href: '/add-ons',
      label: 'Browse Add-ons',
      icon: ShoppingCart,
      description: 'Discover new capabilities',
      badge: 'Hot'
    },
    {
      href: '/pricing',
      label: 'Pricing Plans',
      icon: Package,
      description: 'Upgrade your plan',
    },
    {
      href: '/subscription',
      label: 'My Subscription',
      icon: Sparkles,
      description: 'Manage subscription',
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Menu */}
      {isExpanded && (
        <div className="mb-4 space-y-2">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="block"
              onClick={() => setIsExpanded(false)}
            >
              <div className="glass border-glass-border/30 p-3 rounded-lg hover:scale-105 transition-all duration-300 hover:border-primary/30 w-64">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-primary rounded-lg p-2">
                    <link.icon size={16} className="text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{link.label}</span>
                      {link.badge && (
                        <Badge variant="secondary" className="text-xs bg-accent/20 text-accent">
                          {link.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {link.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        size="lg"
        className={`rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 ${
          isExpanded 
            ? 'bg-destructive hover:bg-destructive/90' 
            : 'bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow'
        } border-2 border-white/20`}
      >
        {isExpanded ? (
          <X size={24} className="text-white" />
        ) : (
          <div className="relative">
            <ShoppingCart size={24} className="text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
          </div>
        )}
      </Button>
    </div>
  );
};
