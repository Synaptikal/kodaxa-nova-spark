import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import BusinessFoundry from "./pages/BusinessFoundry";
import MarketSizing from "./pages/foundry/MarketSizing";
import FinancialProjections from "./pages/foundry/FinancialProjections";
import CompetitiveAnalysis from "./pages/foundry/CompetitiveAnalysis";
import CustomerSegmentation from "./pages/foundry/CustomerSegmentation";
import AIWorkspace from "./pages/AIWorkspace";
import IPFortress from "./pages/IPFortress";
import AdminPanel from "./pages/AdminPanel";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Pricing from "./pages/Pricing";
import Subscription from "./pages/Subscription";
import AddOnMarketplace from "./pages/AddOnMarketplace";
import RevenueAnalytics from "./pages/RevenueAnalytics";
import NotFound from "./pages/NotFound";

const App = () => (
  <AppProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        } />
        <Route path="/business-foundry" element={
          <ProtectedRoute>
            <BusinessFoundry />
          </ProtectedRoute>
        } />
        <Route path="/foundry" element={
          <ProtectedRoute>
            <BusinessFoundry />
          </ProtectedRoute>
        } />
        <Route path="/foundry/market-sizing" element={
          <ProtectedRoute>
            <MarketSizing />
          </ProtectedRoute>
        } />
        <Route path="/foundry/financial-projections" element={
          <ProtectedRoute>
            <FinancialProjections />
          </ProtectedRoute>
        } />
        <Route path="/foundry/competitive-analysis" element={
          <ProtectedRoute>
            <CompetitiveAnalysis />
          </ProtectedRoute>
        } />
        <Route path="/foundry/customer-segmentation" element={
          <ProtectedRoute>
            <CustomerSegmentation />
          </ProtectedRoute>
        } />
        <Route path="/ai-workspace" element={
          <ProtectedRoute>
            <AIWorkspace />
          </ProtectedRoute>
        } />
        <Route path="/ai" element={
          <ProtectedRoute>
            <AIWorkspace />
          </ProtectedRoute>
        } />
        <Route path="/ip-fortress" element={
          <ProtectedRoute>
            <IPFortress />
          </ProtectedRoute>
        } />
        <Route path="/ip" element={
          <ProtectedRoute>
            <IPFortress />
          </ProtectedRoute>
        } />
        <Route path="/compliance-sentinel" element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="/pricing" element={
          <ProtectedRoute>
            <Pricing />
          </ProtectedRoute>
        } />
        <Route path="/subscription" element={
          <ProtectedRoute>
            <Subscription />
          </ProtectedRoute>
        } />
        <Route path="/subscription-success" element={
          <ProtectedRoute>
            <Subscription />
          </ProtectedRoute>
        } />
        <Route path="/add-ons" element={
          <ProtectedRoute>
            <AddOnMarketplace />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <RevenueAnalytics />
          </ProtectedRoute>
        } />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </AppProvider>
);

export default App;
