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

// Mock project data matching the specification
const mockProjects = {
  active: [
    {
      id: 1,
      name: "AI-Driven Market Analysis",
      phase: "Execution",
      budget: "$2.4M",
      ipStatus: "3 Patents Pending",
      icon: "🧠",
      progress: 75
    },
    {
      id: 2,
      name: "Quantum Security Protocol",
      phase: "Research",
      budget: "$1.8M",
      ipStatus: "Trade Secret",
      icon: "⚛️",
      progress: 45
    }
  ],
  paused: [
    {
      id: 3,
      name: "Blockchain Integration",
      phase: "Planning",
      budget: "$950K",
      ipStatus: "1 Patent Filed",
      icon: "🔗",
      progress: 25
    }
  ]
};

const mockMetrics = [
  { label: "AI Tasks Completed", value: "1,247", change: "+12%", icon: Activity },
  { label: "Active Projects", value: "8", change: "+2", icon: Play },
  { label: "Code Files", value: "23,456", change: "+345", icon: Zap },
  { label: "Storage Used", value: "2.3TB", change: "+12GB", icon: ArrowRight }
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { preloadOnHover } = usePreloadRoutes();
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout title="Project Nexus">
      <div className="space-y-8">
        {/* Global Metrics Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {mockMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="glass border-glass-border/30 rounded-xl p-6 hover:shadow-card transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                  <Badge variant="outline" className="text-xs">
                    {metric.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Active Projects */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">ACTIVE Projects</h2>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                New Project
              </Button>
            </div>
            <div className="space-y-4">
              {mockProjects.active.map((project) => (
                <div
                  key={project.id}
                  className="glass border-glass-border/30 rounded-xl p-6 hover:shadow-card hover:border-primary/30 transition-all duration-300 group cursor-pointer"
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">
                        {project.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">Phase: {project.phase}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Budget:</span>
                      <span className="font-medium">{project.budget}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">IP Status:</span>
                      <span className="font-medium">{project.ipStatus}</span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-muted/20 rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2 transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Paused Projects */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">PAUSED Projects</h2>
            <div className="space-y-4">
              {mockProjects.paused.map((project) => (
                <div
                  key={project.id}
                  className="glass border-glass-border/30 rounded-xl p-6 hover:shadow-card hover:border-warning/30 transition-all duration-300 group cursor-pointer opacity-70"
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center text-2xl">
                        {project.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-warning transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">Phase: {project.phase}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Budget:</span>
                      <span className="font-medium">{project.budget}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">IP Status:</span>
                      <span className="font-medium">{project.ipStatus}</span>
                    </div>
                    <Badge variant="outline" className="text-warning border-warning/30">
                      Paused
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Recent AI Outputs */}
          <div className="glass border-glass-border/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Recent AI Outputs</h3>
            <div className="space-y-3">
              {[
                { name: "Market Analysis Report", model: "Claude", time: "2 hours ago" },
                { name: "Code Optimization", model: "Cursor", time: "4 hours ago" },
                { name: "Visual Mockups", model: "Grok", time: "6 hours ago" }
              ].map((output, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-glass/30 transition-colors">
                  <div>
                    <p className="font-medium">{output.name}</p>
                    <p className="text-sm text-muted-foreground">Generated by {output.model}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{output.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass border-glass-border/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/ai")}
                onMouseEnter={() => preloadOnHover("/ai")}
                className="h-auto p-4 flex flex-col items-center space-y-2"
              >
                <Activity className="w-6 h-6" />
                <span className="text-sm">New AI Task</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/forge")}
                onMouseEnter={() => preloadOnHover("/forge")}
                className="h-auto p-4 flex flex-col items-center space-y-2"
              >
                <Play className="w-6 h-6" />
                <span className="text-sm">Create Project</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/files")}
                onMouseEnter={() => preloadOnHover("/files")}
                className="h-auto p-4 flex flex-col items-center space-y-2"
              >
                <Zap className="w-6 h-6" />
                <span className="text-sm">Sync Files</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/analytics")}
                onMouseEnter={() => preloadOnHover("/analytics")}
                className="h-auto p-4 flex flex-col items-center space-y-2"
              >
                <ArrowRight className="w-6 h-6" />
                <span className="text-sm">Generate Report</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
