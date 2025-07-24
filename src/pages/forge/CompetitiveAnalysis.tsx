import { Layout } from "@/components/common/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Target, 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign,
  BarChart3,
  Search,
  Filter,
  Download,
  Settings,
  Eye,
  Star,
  Award,
  Zap,
  Shield,
  Globe,
  Building,
  MapPin,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from "lucide-react";
import { useState } from "react";

interface Competitor {
  id: string;
  name: string;
  logo?: string;
  description: string;
  founded: string;
  headquarters: string;
  employees: string;
  valuation: number;
  funding: number;
  revenue: number;
  marketShare: number;
  strengths: string[];
  weaknesses: string[];
  products: string[];
  targetMarket: string[];
  pricing: string;
  status: 'public' | 'private' | 'acquired';
  threat: 'high' | 'medium' | 'low';
  trend: 'up' | 'down' | 'stable';
  score: number;
}

interface CompetitiveMetric {
  category: string;
  ourScore: number;
  avgCompetitor: number;
  leader: string;
  leaderScore: number;
  trend: 'up' | 'down' | 'stable';
}

const competitors: Competitor[] = [
  {
    id: "1",
    name: "DataCorp Analytics",
    description: "Enterprise data analytics and business intelligence platform",
    founded: "2018",
    headquarters: "San Francisco, CA",
    employees: "250-500",
    valuation: 450000000,
    funding: 125000000,
    revenue: 85000000,
    marketShare: 15.2,
    strengths: ["Strong enterprise sales", "Advanced AI capabilities", "Robust integrations"],
    weaknesses: ["High pricing", "Complex onboarding", "Limited SMB focus"],
    products: ["Analytics Platform", "AI Insights", "Data Warehouse"],
    targetMarket: ["Enterprise", "Mid-market"],
    pricing: "$50-200/user/month",
    status: "private",
    threat: "high",
    trend: "up",
    score: 8.5
  },
  {
    id: "2",
    name: "IntelliMetrics",
    description: "AI-powered business metrics and forecasting solutions",
    founded: "2019",
    headquarters: "Austin, TX",
    employees: "100-250",
    valuation: 180000000,
    funding: 45000000,
    revenue: 25000000,
    marketShare: 8.7,
    strengths: ["Fast implementation", "Competitive pricing", "Great UX"],
    weaknesses: ["Limited enterprise features", "Smaller team", "Less AI sophistication"],
    products: ["Metrics Dashboard", "Forecasting Tool", "Report Builder"],
    targetMarket: ["SMB", "Mid-market"],
    pricing: "$15-75/user/month",
    status: "private",
    threat: "medium",
    trend: "up",
    score: 7.2
  },
  {
    id: "3",
    name: "AnalyticsGiant",
    description: "Market leading analytics suite with comprehensive features",
    founded: "2015",
    headquarters: "Seattle, WA",
    employees: "1000+",
    valuation: 2800000000,
    funding: 500000000,
    revenue: 340000000,
    marketShare: 28.5,
    strengths: ["Market leader", "Comprehensive features", "Strong brand"],
    weaknesses: ["Legacy architecture", "Slow innovation", "High costs"],
    products: ["Enterprise Suite", "Cloud Analytics", "Mobile App"],
    targetMarket: ["Enterprise", "Government"],
    pricing: "$100-500/user/month",
    status: "public",
    threat: "high",
    trend: "stable",
    score: 9.1
  },
  {
    id: "4",
    name: "StartupAnalyze",
    description: "Emerging player focused on real-time analytics",
    founded: "2021",
    headquarters: "New York, NY",
    employees: "50-100",
    valuation: 75000000,
    funding: 15000000,
    revenue: 8000000,
    marketShare: 2.1,
    strengths: ["Innovation", "Real-time capabilities", "Modern tech stack"],
    weaknesses: ["Limited track record", "Small customer base", "Funding constraints"],
    products: ["Real-time Dashboard", "API Platform"],
    targetMarket: ["Startups", "SMB"],
    pricing: "$10-40/user/month",
    status: "private",
    threat: "low",
    trend: "up",
    score: 6.8
  }
];

const competitiveMetrics: CompetitiveMetric[] = [
  { category: "Product Features", ourScore: 8.5, avgCompetitor: 7.8, leader: "AnalyticsGiant", leaderScore: 9.1, trend: "up" },
  { category: "Pricing", ourScore: 7.9, avgCompetitor: 6.5, leader: "StartupAnalyze", leaderScore: 8.8, trend: "up" },
  { category: "Customer Support", ourScore: 8.8, avgCompetitor: 7.2, leader: "Our Company", leaderScore: 8.8, trend: "stable" },
  { category: "Market Presence", ourScore: 6.2, avgCompetitor: 8.1, leader: "AnalyticsGiant", leaderScore: 9.5, trend: "up" },
  { category: "Technology", ourScore: 9.2, avgCompetitor: 7.6, leader: "Our Company", leaderScore: 9.2, trend: "up" },
  { category: "Sales & Marketing", ourScore: 7.1, avgCompetitor: 8.3, leader: "DataCorp Analytics", leaderScore: 9.0, trend: "up" }
];

export default function CompetitiveAnalysis() {
  const [searchQuery, setSearchQuery] = useState("");
  const [threatFilter, setThreatFilter] = useState<string>("all");

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(0)}M`;
    return `$${value.toLocaleString()}`;
  };

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'low': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'public': return 'bg-primary/20 text-primary border-primary/30';
      case 'private': return 'bg-accent/20 text-accent border-accent/30';
      case 'acquired': return 'bg-muted/20 text-muted-foreground border-muted/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-success" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-destructive" />;
      case 'stable': return <Minus className="w-4 h-4 text-muted-foreground" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const filteredCompetitors = competitors.filter(competitor => {
    const matchesSearch = competitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         competitor.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesThreat = threatFilter === 'all' || competitor.threat === threatFilter;
    return matchesSearch && matchesThreat;
  });

  const totalMarketShare = competitors.reduce((sum, comp) => sum + comp.marketShare, 0);
  const avgThreatScore = competitors.reduce((sum, comp) => sum + comp.score, 0) / competitors.length;

  return (
    <Layout title="Competitive Analysis">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-glow to-destructive-glow bg-clip-text text-transparent">
              Competitive Analysis
            </h1>
            <p className="text-muted-foreground mt-2">
              Real-time competitive intelligence and market positioning analysis
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
            <Button>
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass border-glass-border/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tracked Competitors</p>
                  <p className="text-2xl font-bold">{competitors.length}</p>
                </div>
                <Target className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-glass-border/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Threat</p>
                  <p className="text-2xl font-bold text-destructive">
                    {competitors.filter(c => c.threat === 'high').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-glass-border/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Market Coverage</p>
                  <p className="text-2xl font-bold">{totalMarketShare.toFixed(1)}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-glass-border/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Threat Score</p>
                  <p className="text-2xl font-bold">{avgThreatScore.toFixed(1)}/10</p>
                </div>
                <Shield className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="glass border-glass-border/30">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search competitors by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={threatFilter}
                  onChange={(e) => setThreatFilter(e.target.value)}
                  className="border border-border rounded-md px-3 py-2 bg-background"
                >
                  <option value="all">All Threats</option>
                  <option value="high">High Threat</option>
                  <option value="medium">Medium Threat</option>
                  <option value="low">Low Threat</option>
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="competitors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="competitors">Competitor Profiles</TabsTrigger>
            <TabsTrigger value="comparison">Feature Comparison</TabsTrigger>
            <TabsTrigger value="positioning">Market Positioning</TabsTrigger>
          </TabsList>

          <TabsContent value="competitors" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {filteredCompetitors.map((competitor) => (
                <Card key={competitor.id} className="glass border-glass-border/30 hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold">
                            {competitor.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold text-lg">{competitor.name}</h3>
                            <Badge className={getThreatColor(competitor.threat)}>
                              {competitor.threat} threat
                            </Badge>
                            <Badge className={getStatusColor(competitor.status)}>
                              {competitor.status}
                            </Badge>
                            <div className="flex items-center gap-1">
                              {getTrendIcon(competitor.trend)}
                              <span className="text-sm">Trend</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{competitor.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="text-2xl font-bold">{competitor.score}/10</div>
                          <div className="text-xs text-muted-foreground">Threat Score</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Founded:</span>
                        <p className="font-medium">{competitor.founded}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">HQ:</span>
                        <p className="font-medium">{competitor.headquarters}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Employees:</span>
                        <p className="font-medium">{competitor.employees}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Revenue:</span>
                        <p className="font-medium">{formatCurrency(competitor.revenue)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Market Share:</span>
                        <p className="font-medium">{competitor.marketShare}%</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-success mb-2">Strengths</h4>
                        <div className="space-y-1">
                          {competitor.strengths.map((strength, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-3 h-3 text-success" />
                              <span>{strength}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-destructive mb-2">Weaknesses</h4>
                        <div className="space-y-1">
                          {competitor.weaknesses.map((weakness, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <AlertTriangle className="w-3 h-3 text-destructive" />
                              <span>{weakness}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Key Products</h4>
                        <div className="flex flex-wrap gap-1">
                          {competitor.products.map((product, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {product}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-3">
                          <span className="text-xs text-muted-foreground">Pricing: </span>
                          <span className="text-xs font-medium">{competitor.pricing}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 text-sm">
                        <span><strong>Valuation:</strong> {formatCurrency(competitor.valuation)}</span>
                        <span><strong>Funding:</strong> {formatCurrency(competitor.funding)}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Building className="w-4 h-4 mr-1" />
                          Company Info
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="w-4 h-4 mr-1" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle>Competitive Positioning Matrix</CardTitle>
                <CardDescription>
                  Compare key performance metrics across competitors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {competitiveMetrics.map((metric, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{metric.category}</h4>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(metric.trend)}
                          <span className="text-sm text-muted-foreground">Our Score: {metric.ourScore}/10</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Our Company</span>
                            <span className="font-bold">{metric.ourScore}/10</span>
                          </div>
                          <Progress value={metric.ourScore * 10} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Competitor Avg</span>
                            <span className="font-bold">{metric.avgCompetitor}/10</span>
                          </div>
                          <Progress value={metric.avgCompetitor * 10} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Leader ({metric.leader})</span>
                            <span className="font-bold">{metric.leaderScore}/10</span>
                          </div>
                          <Progress value={metric.leaderScore * 10} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="positioning" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle>Market Position Map</CardTitle>
                  <CardDescription>Competitive positioning based on market share and innovation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">Interactive positioning map coming soon...</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle>SWOT Analysis</CardTitle>
                  <CardDescription>Strategic analysis of competitive landscape</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Shield className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">SWOT analysis coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
