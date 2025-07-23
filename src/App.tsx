import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AppProvider } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { LoadingSpinner } from "./components/common/LoadingSpinner";

// Critical components - loaded immediately
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load non-critical pages for better performance
const BusinessFoundry = lazy(() => import("./pages/BusinessFoundry"));
const MarketSizing = lazy(() => import("./pages/foundry/MarketSizing"));
const FinancialProjections = lazy(() => import("./pages/foundry/FinancialProjections"));
const CompetitiveAnalysis = lazy(() => import("./pages/foundry/CompetitiveAnalysis"));
const CustomerSegmentation = lazy(() => import("./pages/foundry/CustomerSegmentation"));
const AIWorkspace = lazy(() => import("./pages/AIWorkspace"));
const IPFortress = lazy(() => import("./pages/IPFortress"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Subscription = lazy(() => import("./pages/Subscription"));
const AddOnMarketplace = lazy(() => import("./pages/AddOnMarketplace"));
const RevenueAnalytics = lazy(() => import("./pages/RevenueAnalytics"));

// Enhanced loading fallback component
const PageLoadingFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="glass p-8 rounded-xl border-glass-border/30">
      <LoadingSpinner size="lg" text="Loading workspace..." />
    </div>
  </div>
);

const App = () => (
  <AppProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } />
          <Route path="/business-foundry" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <BusinessFoundry />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/foundry" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <BusinessFoundry />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/foundry/market-sizing" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <MarketSizing />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/foundry/financial-projections" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <FinancialProjections />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/foundry/competitive-analysis" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <CompetitiveAnalysis />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/foundry/customer-segmentation" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <CustomerSegmentation />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/ai-workspace" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <AIWorkspace />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/ai" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <AIWorkspace />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/ip-fortress" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <IPFortress />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/ip" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <IPFortress />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/compliance-sentinel" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <AdminPanel />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <AdminPanel />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <Profile />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <Settings />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/pricing" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <Pricing />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/subscription" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <Subscription />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/subscription-success" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <Subscription />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/add-ons" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <AddOnMarketplace />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <RevenueAnalytics />
              </Suspense>
            </ProtectedRoute>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </TooltipProvider>
  </AppProvider>
);

export default App;
