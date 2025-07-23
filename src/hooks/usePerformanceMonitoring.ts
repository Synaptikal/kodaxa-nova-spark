import { useEffect } from 'react';

// Performance monitoring and analytics
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        // Log performance metrics for monitoring
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        
        if (entry.entryType === 'first-input') {
          const fidEntry = entry as PerformanceEventTiming;
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
        }
        
        if (entry.entryType === 'layout-shift') {
          const clsEntry = entry as any; // Layout shift entries have custom properties
          if (!clsEntry.hadRecentInput) {
            console.log('CLS:', clsEntry.value);
          }
        }
      });
    });

    // Observe different performance metrics
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (error) {
      console.warn('Performance observer not supported:', error);
    }

    // Monitor memory usage if available
    if ('memory' in performance) {
      const memoryInfo = (performance as any).memory;
      console.log('Memory usage:', {
        used: Math.round(memoryInfo.usedJSHeapSize / 1048576),
        total: Math.round(memoryInfo.totalJSHeapSize / 1048576),
        limit: Math.round(memoryInfo.jsHeapSizeLimit / 1048576)
      });
    }

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  // Report long tasks that could affect performance
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.duration > 50) {
          console.warn('Long task detected:', entry.duration + 'ms');
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['longtask'] });
    } catch (error) {
      console.warn('Long task observer not supported:', error);
    }

    return () => observer.disconnect();
  }, []);
};