import { Layout } from "@/components/common/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Target,
  BarChart3,
  PieChart,
  Search,
  Filter,
  Download,
  Settings,
  Eye,
  Star,
  Award,
  Zap,
  Clock,
  Globe,
  Building,
  Heart,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  UserCheck,
  TrendingFlat,
  CreditCard,
  ShoppingCart,
  Mail,
  Phone
} from "lucide-react";
import { useState, useEffect } from "react";

interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  size: number;
  percentage: number;
  avgRevenue: number;
  ltv: number;
  cac: number;
  churnRate: number;
  growthRate: number;
  satisfaction: number;
  characteristics: string[];
  behaviors: string[];
  preferences: string[];
  color: string;
  trend: 'up' | 'down' | 'stable';
  priority: 'high' | 'medium' | 'low';
}

interface CustomerMetric {
  label: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  benchmark: number;
}

const customerSegments: CustomerSegment[] = [
  {
    id: "enterprise",
    name: "Enterprise Leaders",
    description: "Large corporations with 1000+ employees requiring comprehensive analytics solutions",
    size: 245,
    percentage: 15.2,
    avgRevenue: 125000,
    ltv: 450000,
    cac: 35000,
    churnRate: 8.5,
    growthRate: 23.4,
    satisfaction: 8.7,
    characteristics: ["Large teams", "Complex requirements", "Budget authority", "Long sales cycles"],
    behaviors: ["Thorough evaluation", "Multi-stakeholder decisions", "Annual contracts", "High engagement"],
    preferences: ["Enterprise features", "White-glove support", "Custom integrations", "Security"],
    color: "primary",
    trend: "up",
    priority: "high"
  },
  {
    id: "growth",
    name: "Growth Companies",
    description: "Mid-size companies (100-1000 employees) scaling rapidly and need scalable analytics",
    size: 567,
    percentage: 35.1,
    avgRevenue: 45000,
    ltv: 180000,
    cac: 12000,
    churnRate: 12.3,
    growthRate: 34.7,
    satisfaction: 8.2,
    characteristics: ["Rapid growth", "Tech-savvy", "Results-driven", "Resource conscious"],
    behaviors: ["Quick decisions", "Self-service", "Monthly/quarterly contracts", "High feature adoption"],
    preferences: ["Easy onboarding", "Scalable pricing", "Modern UI", "Integration flexibility"],
    color: "success",
    trend: "up",
    priority: "high"
  },
  {
    id: "smb",
    name: "Small Business",
    description: "Small businesses (10-100 employees) looking for simple, cost-effective analytics",
    size: 1205,
    percentage: 74.6,
    avgRevenue: 8500,
    ltv: 35000,
    cac: 2500,
    churnRate: 18.7,
    growthRate: 15.2,
    satisfaction: 7.8,
    characteristics: ["Price sensitive", "Simple needs", "Limited IT resources", "Owner-operated"],
    behaviors: ["Price comparison", "DIY setup", "Monthly billing", "Basic feature usage"],
    preferences: ["Affordable pricing", "Simple interface", "Quick setup", "Basic reporting"],
    color: "accent",
    trend: "stable",
    priority: "medium"
  },
  {
    id: "startup",
    name: "Tech Startups",
    description: "Early-stage startups needing analytics to prove product-market fit and growth",
    size: 389,
    percentage: 24.1,
    avgRevenue: 12000,
    ltv: 48000,
    cac: 3200,
    churnRate: 25.4,
    growthRate: 45.8,
    satisfaction: 8.5,
    characteristics: ["Innovation focused", "Data-driven", "Limited budget", "High growth potential"],
    behaviors: ["Free trial usage", "Viral sharing", "Flexible contracts", "Power user features"],
    preferences: ["Startup discounts", "Modern features", "API access", "Growth tools"],
    color: "warning",
    trend: "up",
    priority: "medium"
  }
];

const overallMetrics: CustomerMetric[] = [
  { label: "Total Customers", value: 2406, unit: "", change: 18.5, trend: "up", benchmark: 2000 },
  { label: "Average LTV", value: 142500, unit: "$", change: 12.3, trend: "up", benchmark: 125000 },
  { label: "Average CAC", value: 8750, unit: "$", change: -5.2, trend: "down", benchmark: 10000 },
  { label: "LTV/CAC Ratio", value: 16.3, unit: ":1", change: 18.7, trend: "up", benchmark: 12.5 },
  { label: "Churn Rate", value: 14.2, unit: "%", change: -8.3, trend: "down", benchmark: 15.5 },
  { label: "NPS Score", value: 68, unit: "", change: 5.2, trend: "up", benchmark: 60 }
];

// Animated counter hook
const useAnimatedCounter = (end: number, duration: number = 2000, decimals: number = 0) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  
  return parseFloat(count.toFixed(decimals));
};

export default function CustomerSegmentation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toLocaleString()}`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'low': return 'bg-success/20 text-success border-success/30';
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

  const getSegmentIcon = (segmentId: string) => {
    switch (segmentId) {
      case 'enterprise': return <Building className="w-6 h-6 text-primary" />;
      case 'growth': return <TrendingUp className="w-6 h-6 text-success" />;
      case 'smb': return <Users className="w-6 h-6 text-accent" />;
      case 'startup': return <Zap className="w-6 h-6 text-warning" />;
      default: return <Users className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const filteredSegments = customerSegments.filter(segment => {
    const matchesSearch = segment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         segment.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || segment.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  // Animated values
  const totalCustomers = useAnimatedCounter(2406, 3000);
  const totalRevenue = useAnimatedCounter(142.5, 3000, 1);
  const avgLTV = useAnimatedCounter(142500, 3000);

  return (
    <Layout title="Customer Segmentation">
      <div className="space-y-6">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Users className="w-8 h-8 text-primary animate-pulse" />
                <div className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full animate-ping" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-glow via-success-glow to-accent-glow bg-clip-text text-transparent">
                Customer Segmentation
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Advanced customer analytics with AI-powered segmentation and lifetime value modeling
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Target className="w-3 h-3 mr-1" />
                ML-Powered
              </Badge>
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                Real-time
              </Badge>
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                Predictive
              </Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="glass border-glass-border/30 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group">
              <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Export Analysis
            </Button>
            <Button variant="outline" className="glass border-glass-border/30 hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 group">
              <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Refresh Data
            </Button>
            <Button className="bg-gradient-to-r from-primary to-success hover:from-primary-glow hover:to-success-glow transition-all duration-300 shadow-lg hover:shadow-xl group">
              <Settings className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Configure
            </Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card className="glass border-glass-border/30 relative overflow-hidden group hover:glow-primary hover:scale-105 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Users className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/30">Total</Badge>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {totalCustomers.toLocaleString()}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 mb-4">Active Customers</p>
              <div className="flex items-center text-sm mb-4">
                <TrendingUp className="w-4 h-4 text-success mr-2" />
                <span className="text-success font-medium">+18.5% Growth</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30 relative overflow-hidden group hover:glow-accent hover:scale-105 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <DollarSign className="w-10 h-10 text-success group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-success/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                </div>
                <Badge className="bg-success/20 text-success border-success/30">Avg LTV</Badge>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-success to-success-glow bg-clip-text text-transparent">
                ${totalRevenue}K
              </h3>
              <p className="text-sm text-muted-foreground mt-2 mb-4">Average LTV</p>
              <div className="flex items-center text-sm mb-4">
                <ArrowUp className="w-4 h-4 text-success mr-2" />
                <span className="text-success font-medium">+12.3% Increase</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30 relative overflow-hidden group hover:glow-accent hover:scale-105 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Target className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                </div>
                <Badge className="bg-accent/20 text-accent border-accent/30">Ratio</Badge>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
                16.3:1
              </h3>
              <p className="text-sm text-muted-foreground mt-2 mb-4">LTV/CAC Ratio</p>
              <div className="flex items-center text-sm mb-4">
                <TrendingUp className="w-4 h-4 text-accent mr-2" />
                <span className="text-accent font-medium">+18.7% Improvement</span>
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
                  placeholder="Search segments by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="border border-border rounded-md px-3 py-2 bg-background"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
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
        <div className={`transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Tabs defaultValue="segments" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 glass border-glass-border/30 p-1">
              <TabsTrigger value="segments" className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-lg">
                <Users className="w-4 h-4 mr-2" />
                Segments
              </TabsTrigger>
              <TabsTrigger value="metrics" className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-accent/20 data-[state=active]:text-accent data-[state=active]:shadow-lg">
                <BarChart3 className="w-4 h-4 mr-2" />
                Metrics
              </TabsTrigger>
              <TabsTrigger value="behavior" className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-success/20 data-[state=active]:text-success data-[state=active]:shadow-lg">
                <Heart className="w-4 h-4 mr-2" />
                Behavior
              </TabsTrigger>
              <TabsTrigger value="insights" className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-warning/20 data-[state=active]:text-warning data-[state=active]:shadow-lg">
                <Eye className="w-4 h-4 mr-2" />
                Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="segments" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredSegments.map((segment) => (
                  <Card key={segment.id} className="glass border-glass-border/30 hover:border-primary/20 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getSegmentIcon(segment.id)}
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-semibold text-lg">{segment.name}</h3>
                              <Badge className={getPriorityColor(segment.priority)}>
                                {segment.priority} priority
                              </Badge>
                              <div className="flex items-center gap-1">
                                {getTrendIcon(segment.trend)}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{segment.description}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Size:</span>
                            <span className="font-bold">{segment.size.toLocaleString()} customers</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Market Share:</span>
                            <span className="font-bold">{segment.percentage}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Avg Revenue:</span>
                            <span className="font-bold">{formatCurrency(segment.avgRevenue)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>LTV:</span>
                            <span className="font-bold text-success">{formatCurrency(segment.ltv)}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>CAC:</span>
                            <span className="font-bold">{formatCurrency(segment.cac)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Churn Rate:</span>
                            <span className="font-bold">{segment.churnRate}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Growth Rate:</span>
                            <span className="font-bold text-success">+{segment.growthRate}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Satisfaction:</span>
                            <span className="font-bold">{segment.satisfaction}/10</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-sm mb-2">Key Characteristics</h4>
                          <div className="flex flex-wrap gap-1">
                            {segment.characteristics.map((char, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {char}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-sm mb-2">Behaviors</h4>
                          <div className="flex flex-wrap gap-1">
                            {segment.behaviors.map((behavior, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-accent/10">
                                {behavior}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm mb-2">Preferences</h4>
                          <div className="flex flex-wrap gap-1">
                            {segment.preferences.map((pref, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-success/10">
                                {pref}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between mt-4 pt-4 border-t border-glass-border/30">
                        <div className="text-sm">
                          <span className="text-muted-foreground">LTV/CAC: </span>
                          <span className="font-bold">{(segment.ltv / segment.cac).toFixed(1)}:1</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle>Customer Metrics Overview</CardTitle>
                  <CardDescription>
                    Key performance indicators across all customer segments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {overallMetrics.map((metric, index) => (
                      <div key={index} className="p-4 rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{metric.label}</span>
                          <div className={`flex items-center text-sm ${
                            metric.trend === 'up' ? 'text-success' : 
                            metric.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                          }`}>
                            {getTrendIcon(metric.trend)}
                            <span className="ml-1">{Math.abs(metric.change)}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl font-bold">
                            {metric.unit === '$' ? formatCurrency(metric.value) : 
                             metric.unit === ':1' ? `${metric.value}${metric.unit}` :
                             `${metric.value}${metric.unit}`}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>vs. Benchmark</span>
                            <span>{metric.unit === '$' ? formatCurrency(metric.benchmark) : `${metric.benchmark}${metric.unit}`}</span>
                          </div>
                          <Progress 
                            value={metric.unit === '$' ? (metric.value / metric.benchmark) * 100 : 
                                   metric.label === "Churn Rate" ? ((20 - metric.value) / 20) * 100 :
                                   (metric.value / metric.benchmark) * 100} 
                            className="h-1" 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="behavior" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle>Customer Journey Analysis</CardTitle>
                    <CardDescription>Understanding customer touchpoints and behavior patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">Journey analysis coming soon...</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle>Engagement Patterns</CardTitle>
                    <CardDescription>Feature usage and engagement trends by segment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Zap className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">Engagement analysis coming soon...</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle>AI-Powered Insights</CardTitle>
                    <CardDescription>Machine learning recommendations for customer optimization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          <span className="font-medium text-success">High-Value Opportunity</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Growth Companies segment shows 34.7% growth rate with strong LTV/CAC ratio. 
                          Recommend increasing marketing spend for this segment.
                        </p>
                      </div>
                      
                      <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-warning" />
                          <span className="font-medium text-warning">Attention Needed</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Tech Startups segment has 25.4% churn rate. Consider implementing 
                          improved onboarding and success programs.
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-accent" />
                          <span className="font-medium text-accent">Expansion Opportunity</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Enterprise Leaders have highest LTV but lowest growth rate. 
                          Focus on enterprise sales team expansion.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle>Predictive Analytics</CardTitle>
                    <CardDescription>Forecasted trends and segment evolution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">Predictive models coming soon...</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
