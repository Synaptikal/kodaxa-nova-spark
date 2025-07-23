import { Layout } from "@/components/common/Layout";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { AIInsightsCard } from "@/components/dashboard/AIInsightsCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import heroImage from "@/assets/hero-dashboard.jpg";

const Index = () => {
  return (
    <Layout title="Dashboard" showSidebar={false}>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden glass border-glass-border/30">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="relative p-8 md:p-12">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-glow to-accent-glow bg-clip-text text-transparent mb-4">
                Welcome to Kodaxa Orchestrator
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Your AI-powered business analytics, IP management, and strategic intelligence platform.
                Make data-driven decisions with confidence.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:shadow-glow transition-all duration-300 hover:scale-105">
                  Start Analysis
                </button>
                <button className="px-6 py-3 glass border-glass-border/30 text-foreground rounded-lg font-medium hover:border-primary/50 transition-all duration-300">
                  Explore AI Features
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <MetricsGrid />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
        <RecentActivity />
      </div>
    </Layout>
  );
};

export default Index;
