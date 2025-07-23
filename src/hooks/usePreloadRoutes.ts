import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Preload components based on user navigation patterns
const routePreloadMap: Record<string, () => Promise<any>> = {
  '/': () => import('@/pages/AIWorkspace'),
  '/ai': () => import('@/pages/BusinessFoundry'),
  '/foundry': () => import('@/pages/foundry/MarketSizing'),
  '/ip': () => import('@/pages/Profile'),
};

export const usePreloadRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    // Preload likely next routes based on current path
    const preloadRoutes = routePreloadMap[location.pathname];
    
    if (preloadRoutes) {
      // Delay preloading to not interfere with current page load
      const timer = setTimeout(() => {
        preloadRoutes().catch(() => {
          // Silently fail - preloading is not critical
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  // Preload on hover for navigation links
  const preloadOnHover = (path: string) => {
    const routeImporter = routePreloadMap[path];
    if (routeImporter) {
      routeImporter().catch(() => {
        // Silently fail
      });
    }
  };

  return { preloadOnHover };
};