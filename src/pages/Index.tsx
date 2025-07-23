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
                Enterprise Orchestration
                <br />
                <span className="bg-gradient-executive bg-clip-text text-transparent">
                  Intelligence Platform
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-4xl">
                Comprehensive business intelligence, intellectual property management, and strategic analytics 
                designed for enterprise-scale operations and institutional decision-making.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-gradient-primary hover:shadow-executive transition-all duration-300 group px-8 py-4 text-lg font-medium">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Initialize Analysis
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="glass border-glass-border/40 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 group px-8 py-4 text-lg font-medium">
                  Platform Overview
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
