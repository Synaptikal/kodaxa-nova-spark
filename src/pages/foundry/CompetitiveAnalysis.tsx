import { Layout } from "@/components/common/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import circuitPattern from "@/assets/circuit-pattern.jpg";
import { 
  Users, 
  Target, 
  TrendingUp, 
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Download,
  Settings,
  RefreshCw,
  Filter,
  Search,
  Zap,
  Award,
  TrendingDown
} from "lucide-react";
import { useState, useEffect } from "react";

// Animated Counter Hook
const useAnimatedCounter = (end: number, duration: number = 2000) => {
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
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  
  return count;
};

export default function CompetitiveAnalysis() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const competitorData = [
    { name: "Competitor A", marketShare: 28, revenue: 850, growth: 12, features: 8.5 },
    { name: "Competitor B", marketShare: 22, revenue: 670, growth: 8, features: 7.2 },
    { name: "Kodaxa", marketShare: 12, revenue: 360, growth: 23, features: 9.1 },
    { name: "Competitor C", marketShare: 15, revenue: 450, growth: 6, features: 6.8 },
    { name: "Competitor D", marketShare: 10, revenue: 300, growth: 15, features: 7.5 },
    { name: "Others", marketShare: 13, revenue: 390, growth: 5, features: 6.0 }
  ];

  const featureComparison = [
    { feature: "Analytics", kodaxa: 9, average: 7.2 },
    { feature: "AI/ML", kodaxa: 9.5, average: 6.8 },
    { feature: "UI/UX", kodaxa: 8.8, average: 7.1 },
    { feature: "Integration", kodaxa: 8.2, average: 7.5 },
    { feature: "Security", kodaxa: 9.2, average: 8.1 },
    { feature: "Support", kodaxa: 8.5, average: 7.3 },
    { feature: "Pricing", kodaxa: 7.8, average: 7.0 }
  ];

  const marketTrends = [
    { month: "Jan", marketSize: 2100, growth: 5 },
    { month: "Feb", marketSize: 2180, growth: 7 },
    { month: "Mar", marketSize: 2250, growth: 8 },
    { month: "Apr", marketSize: 2340, growth: 12 },
    { month: "May", marketSize: 2420, growth: 15 },
    { month: "Jun", marketSize: 2500, growth: 18 }
  ];

  const pieColors = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--success))", "hsl(var(--warning))", "hsl(var(--destructive))", "hsl(var(--muted-foreground))"];

  // Animated values
  const marketRank = useAnimatedCounter(3, 2000);
  const marketShare = useAnimatedCounter(12, 2000);
  const growthRate = useAnimatedCounter(23, 2000);
  const competitorCount = useAnimatedCounter(15, 2000);

  return (
    <Layout title="Competitive Analysis">
      <div className="space-y-6">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Award className="w-8 h-8 text-primary animate-pulse" />
                <div className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full animate-ping" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-glow via-accent-glow to-warning-glow bg-clip-text text-transparent">
                Competitive Analysis
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Real-time competitor intelligence and market positioning analysis with AI insights
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Zap className="w-3 h-3 mr-1" />
                Live Intelligence
              </Badge>
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                15 Tracked Competitors
              </Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="glass border-glass-border/30 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group">
              <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Export Report
            </Button>
            <Button variant="outline" className="glass border-glass-border/30 hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 group">
              <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Refresh Data
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow transition-all duration-300 shadow-lg hover:shadow-xl group">
              <Settings className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Configure
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card className="glass border-glass-border/30 relative overflow-hidden hover:glow-accent hover:scale-105 transition-all duration-500 group">
            <div 
              className="absolute inset-0 opacity-5 bg-cover bg-center transition-opacity duration-500 group-hover:opacity-10"
              style={{ backgroundImage: `url(${circuitPattern})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Market Rank</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
                      #{marketRank}
                    </p>
                    <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                      ↑2 positions
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <Target className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30 relative overflow-hidden hover:glow-primary hover:scale-105 transition-all duration-500 group">
            <div 
              className="absolute inset-0 opacity-5 bg-cover bg-center transition-opacity duration-500 group-hover:opacity-10"
              style={{ backgroundImage: `url(${circuitPattern})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Market Share</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                      {marketShare}%
                    </p>
                    <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                      +3.2%
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <PieChartIcon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30 relative overflow-hidden hover:glow-accent hover:scale-105 transition-all duration-500 group">
            <div 
              className="absolute inset-0 opacity-5 bg-cover bg-center transition-opacity duration-500 group-hover:opacity-10"
              style={{ backgroundImage: `url(${circuitPattern})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Growth Rate</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold bg-gradient-to-r from-success to-success-glow bg-clip-text text-transparent">
                      +{growthRate}%
                    </p>
                    <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                      Leading
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <TrendingUp className="w-10 h-10 text-success group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-success/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30 relative overflow-hidden hover:glow-accent hover:scale-105 transition-all duration-500 group">
            <div 
              className="absolute inset-0 opacity-5 bg-cover bg-center transition-opacity duration-500 group-hover:opacity-10"
              style={{ backgroundImage: `url(${circuitPattern})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Tracked Competitors</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold bg-gradient-to-r from-warning to-warning-glow bg-clip-text text-transparent">
                      {competitorCount}
                    </p>
                    <Badge variant="secondary" className="bg-warning/10 text-warning text-xs">
                      +2 new
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <Users className="w-10 h-10 text-warning group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-warning/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Tabs */}
        <div className={`transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 glass border-glass-border/30 p-1">
              <TabsTrigger 
                value="overview" 
                className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-lg group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300" />
                <BarChart3 className="w-4 h-4 mr-2" />
                <span className="relative z-10">Market Overview</span>
              </TabsTrigger>
              <TabsTrigger 
                value="features" 
                className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-accent/20 data-[state=active]:text-accent data-[state=active]:shadow-lg group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-success/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300" />
                <Activity className="w-4 h-4 mr-2" />
                <span className="relative z-10">Feature Comparison</span>
              </TabsTrigger>
              <TabsTrigger 
                value="positioning" 
                className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-success/20 data-[state=active]:text-success data-[state=active]:shadow-lg group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-success/10 to-warning/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300" />
                <Target className="w-4 h-4 mr-2" />
                <span className="relative z-10">Positioning</span>
              </TabsTrigger>
              <TabsTrigger 
                value="trends" 
                className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-warning/20 data-[state=active]:text-warning data-[state=active]:shadow-lg group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-warning/10 to-primary/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300" />
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="relative z-10">Market Trends</span>
              </TabsTrigger>
            </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle>Market Share Distribution</CardTitle>
                  <CardDescription>Current market share by competitor</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={competitorData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="marketShare"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {competitorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle>Revenue vs Growth Analysis</CardTitle>
                  <CardDescription>Competitor positioning by revenue and growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={competitorData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }} 
                      />
                      <Bar dataKey="revenue" fill="hsl(var(--primary))" />
                      <Bar dataKey="growth" fill="hsl(var(--accent))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle>Feature Comparison Radar</CardTitle>
                <CardDescription>Kodaxa vs market average across key features</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={featureComparison}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="feature" stroke="hsl(var(--muted-foreground))" />
                    <PolarRadiusAxis domain={[0, 10]} stroke="hsl(var(--muted-foreground))" />
                    <Radar
                      name="Kodaxa"
                      dataKey="kodaxa"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Market Average"
                      dataKey="average"
                      stroke="hsl(var(--muted-foreground))"
                      fill="hsl(var(--muted))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle>Market Growth Trends</CardTitle>
                <CardDescription>6-month market size and growth trajectory</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={marketTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="marketSize" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="growth" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}