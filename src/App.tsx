import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BusinessFoundry from "./pages/BusinessFoundry";
import MarketSizing from "./pages/foundry/MarketSizing";
import FinancialProjections from "./pages/foundry/FinancialProjections";
import AIWorkspace from "./pages/AIWorkspace";
import IPFortress from "./pages/IPFortress";
import AdminPanel from "./pages/AdminPanel";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/foundry" element={<BusinessFoundry />} />
          <Route path="/foundry/market-sizing" element={<MarketSizing />} />
          <Route path="/foundry/financial-projections" element={<FinancialProjections />} />
          <Route path="/ai" element={<AIWorkspace />} />
          <Route path="/ip" element={<IPFortress />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
