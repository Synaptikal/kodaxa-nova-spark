import { Layout } from "@/components/common/Layout";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { AIInsightsCard } from "@/components/dashboard/AIInsightsCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import heroImage from "@/assets/hero-dashboard.jpg";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Play, ArrowRight, Activity } from "lucide-react";
import { useState, useEffect } from "react";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  return (
    <Layout title="Dashboard" showSidebar={false}>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className={`relative rounded-xl overflow-hidden glass border-glass-border/30 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
          <div className="relative p-8 md:p-12">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <Activity className="w-10 h-10 text-primary animate-pulse" />
                  <div className="absolute inset-0 w-10 h-10 bg-primary/20 rounded-full animate-ping" />
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    <Zap className="w-3 h-3 mr-1" />
                    AI-Powered
                  </Badge>
                  <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                    Real-time
                  </Badge>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-glow via-accent-glow to-success-glow bg-clip-text text-transparent mb-6 leading-tight">
                Welcome to Kodaxa Orchestrator
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Your AI-powered business analytics, IP management, and strategic intelligence platform.
                <br />
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent font-medium">
                  Make data-driven decisions with confidence.
                </span>
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow transition-all duration-300 shadow-lg hover:shadow-xl group px-8 py-3 text-lg">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Start Analysis
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="glass border-glass-border/30 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group px-8 py-3 text-lg">
                  <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Explore AI Features
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
