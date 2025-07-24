import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/hooks/useAuth'
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring'
import App from './App.tsx'
import './index.css'
import { ErrorBoundary } from './components/common/ErrorBoundary'

// Enhanced QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Performance monitoring wrapper
const AppWithMonitoring = () => {
  // Temporarily disable performance monitoring to isolate issue
  // usePerformanceMonitoring();
  return <App />;
};

// Ensure DOM is ready
const root = document.getElementById("root");
if (!root) {
  throw new Error('Root element not found');
}

// Create root and render app
const reactRoot = createRoot(root);
reactRoot.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <AppWithMonitoring />
          </QueryClientProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
