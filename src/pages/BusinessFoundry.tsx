import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  DollarSign, 
  Users, 
  Zap,
  FileText,
  Settings,
  PlusCircle
} from "lucide-react";

export default function BusinessFoundry() {
  const analysisCards = [
    {
      title: "Market Sizing (TAM/SAM/SOM)",
      description: "Comprehensive market analysis with AI-powered insights",
      status: "active",
      lastUpdated: "2 hours ago",
      icon: Target,
      metrics: ["TAM: $2.4B", "SAM: $480M", "SOM: $48M"],
    },
    {
      title: "Financial Projections",
      description: "Multi-year revenue and cost modeling",
      status: "draft",
      lastUpdated: "1 day ago",
      icon: DollarSign,
      metrics: ["5-Year NPV", "Break-even: Q3 2025", "IRR: 23%"],
    },
    {
      title: "Competitive Analysis",
      description: "Real-time peer benchmarking and positioning",
      status: "completed",
      lastUpdated: "3 days ago",
      icon: BarChart3,
      metrics: ["15 Competitors", "Market Share: 12%", "Ranking: #3"],
    },
    {
      title: "Customer Segmentation",
      description: "User cohort analysis and lifetime value modeling",
      status: "active",
      lastUpdated: "5 hours ago",
      icon: Users,
      metrics: ["4 Segments", "LTV: $2,840", "CAC: $185"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "completed": return "bg-primary text-primary-foreground";
      case "draft": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-glow to-accent-glow bg-clip-text text-transparent">
              Business Foundry
            </h1>
            <p className="text-muted-foreground mt-2">
              Advanced business analytics and modeling powered by AI
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Export Reports
            </Button>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass border-glass-border/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Models</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-glass-border/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">AI Confidence</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
                <Zap className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-glass-border/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Scenarios</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-glass-border/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Updates</p>
                  <p className="text-2xl font-bold">Real-time</p>
                </div>
                <Settings className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {analysisCards.map((card, index) => (
            <Card key={index} className="glass border-glass-border/30 hover:border-primary/20 transition-all duration-300 group cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <card.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {card.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {card.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(card.status)}>
                    {card.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">
                    Last updated: {card.lastUpdated}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {card.metrics.map((metric, metricIndex) => (
                      <Badge key={metricIndex} variant="outline" className="text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1">
                      Open Model
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}