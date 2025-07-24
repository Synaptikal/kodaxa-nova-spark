import React from 'react';
import { ResponsiveLayout } from '../layout/ResponsiveLayout';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showSidebar?: boolean;
  showBreadcrumbs?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title
}) => {
  useKeyboardNavigation();
  return (
    <ResponsiveLayout title={title}>
      {children}
    </ResponsiveLayout>
  );
};
