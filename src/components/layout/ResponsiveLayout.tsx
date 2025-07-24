import React, { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MasterLayout } from './MasterLayout';
import { MobileLayout } from './MobileLayout';
import { TabletLayout } from './TabletLayout';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children, title }) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  if (isDesktop) {
    return <MasterLayout title={title}>{children}</MasterLayout>;
  }

  if (isTablet) {
    return <TabletLayout title={title}>{children}</TabletLayout>;
  }

  return <MobileLayout title={title}>{children}</MobileLayout>;
};