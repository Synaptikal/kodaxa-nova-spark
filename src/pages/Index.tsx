import { Layout } from "@/components/common/Layout";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { AIInsightsCard } from "@/components/dashboard/AIInsightsCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { OptimizedImage } from "@/components/common/OptimizedImage";
import { usePreloadRoutes } from "@/hooks/usePreloadRoutes";
const heroImage = "/hero-dashboard.svg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Play, ArrowRight, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const navigate = useNavigate();
  const { preloadOnHover } = usePreloadRoutes();
  
  useEffect(() => {
    // Stagger the loading animation
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Layout title="Dashboard" showSidebar={false}>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className={`relative rounded-xl overflow-hidden glass border-glass-border/30 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <OptimizedImage
            src={heroImage}
            alt="Enterprise dashboard hero"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            priority={true}
            onLoad={() => setHeroImageLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
          <div className="relative p-8 md:p-12">
            <div className="max-w-4xl">
              <div className="flex items-center gap-6 mb-8">
                <div className="flex gap-3">
                  <Badge variant="secondary" className="bg-primary/8 text-primary border-primary/20 font-medium">
                    Enterprise AI
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/8 text-accent border-accent/20 font-medium">
                    Real-time Analytics
                  </Badge>
                  <Badge variant="secondary" className="bg-success/8 text-success border-success/20 font-medium">
                    Strategic Intelligence
                  </Badge>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
                Enterprise Intelligence
                <br />
                <span className="bg-gradient-executive bg-clip-text text-transparent">
                  Orchestration Platform
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-4xl font-medium">
                Advanced artificial intelligence meets enterprise-grade analytics to deliver strategic insights, 
                intellectual property management, and predictive market intelligence for Fortune 500 decision makers.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigate("/ai")}
                  onMouseEnter={() => preloadOnHover("/ai")}
                  className="bg-gradient-primary hover:shadow-executive transition-all duration-500 group px-8 py-4 text-lg font-semibold relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform relative z-10" />
                  <span className="relative z-10">Launch Intelligence Suite</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
                </Button>
                <Button 
                  onClick={() => navigate("/forge")}
                  onMouseEnter={() => preloadOnHover("/forge")}
                  variant="outline" 
                  className="glass border-glass-border/40 hover:bg-primary/8 hover:border-primary/40 hover:shadow-card transition-all duration-500 group px-8 py-4 text-lg font-semibold"
                >
                  <span className="relative z-10">Strategic Overview</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <MetricsGrid />
        </div>

        {/* Main Content Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* AI Insights - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <AIInsightsCard />
          </div>
          
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <RecentActivity />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
