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
const LandingPage = lazy(() => import("./pages/LandingPage"));
const CapitalForge = lazy(() => import("./pages/CapitalForge"));
const MarketSizing = lazy(() => import("./pages/forge/MarketSizing"));
const FinancialProjections = lazy(() => import("./pages/forge/FinancialProjections"));
const CompetitiveAnalysis = lazy(() => import("./pages/forge/CompetitiveAnalysis"));
const CustomerSegmentation = lazy(() => import("./pages/forge/CustomerSegmentation"));
const AIWorkspace = lazy(() => import("./pages/AIWorkspace"));
const IPFortress = lazy(() => import("./pages/IPFortress"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Subscription = lazy(() => import("./pages/Subscription"));
const AddOnMarketplace = lazy(() => import("./pages/AddOnMarketplace"));
const RevenueAnalytics = lazy(() => import("./pages/RevenueAnalytics"));
const DeliberationRooms = lazy(() => import("./pages/aiworkspace/DeliberationRooms"));
const TaskHistory = lazy(() => import("./pages/aiworkspace/TaskHistory"));
const ActiveTasks = lazy(() => import("./pages/aiworkspace/ActiveTasks"));
const AgentSettings = lazy(() => import("./pages/aiworkspace/AgentSettings"));
const PatentSearch = lazy(() => import("./pages/ipfortress/PatentSearch"));
const MaintenanceAlerts = lazy(() => import("./pages/ipfortress/MaintenanceAlerts"));

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
          {/* Public Routes */}
          <Route path="/" element={
            <Suspense fallback={<PageLoadingFallback />}>
              <LandingPage />
            </Suspense>
          } />
          <Route path="/landing" element={
            <Suspense fallback={<PageLoadingFallback />}>
              <LandingPage />
            </Suspense>
          } />
          <Route path="/home" element={
            <Suspense fallback={<PageLoadingFallback />}>
              <LandingPage />
            </Suspense>
          } />
          <Route path="/auth" element={<Auth />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } />
          <Route path="/capital-forge" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <CapitalForge />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/forge" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <CapitalForge />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/forge/market-sizing" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <MarketSizing />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/forge/financial-projections" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <FinancialProjections />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/forge/competitive-analysis" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <CompetitiveAnalysis />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/forge/customer-segmentation" element={
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
          <Route path="/ai/quorum" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <DeliberationRooms />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/ai/tasks" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <ActiveTasks />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/ai/task-history" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <TaskHistory />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/ai/settings" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <AgentSettings />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/ip/patents" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <PatentSearch />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/ip/search" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <PatentSearch />
              </Suspense>
            </ProtectedRoute>
          } />
          <Route path="/ip/maintenance" element={
            <ProtectedRoute>
              <Suspense fallback={<PageLoadingFallback />}>
                <MaintenanceAlerts />
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
