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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  AreaChart,
  Area
} from "recharts";
import circuitPattern from "@/assets/circuit-pattern.jpg";
import { 
  Users, 
  Target, 
  TrendingUp, 
  Heart,
  DollarSign,
  Clock,
  Star,
  Download,
  Settings,
  RefreshCw,
  Filter,
  UserPlus,
  Zap,
  Activity,
  BarChart3,
  PieChart as PieChartIcon
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

export default function CustomerSegmentation() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const segmentData = [
    { segment: "Enterprise", users: 2847, ltv: 28500, cac: 2400, churn: 2.1, satisfaction: 9.2 },
    { segment: "Mid-Market", users: 8923, ltv: 12300, cac: 980, churn: 3.8, satisfaction: 8.7 },
    { segment: "SMB", users: 15640, ltv: 4800, cac: 340, churn: 7.2, satisfaction: 8.1 },
    { segment: "Startup", users: 12850, ltv: 2100, cac: 180, churn: 12.5, satisfaction: 7.8 }
  ];

  const cohortData = [
    { month: "Jan", enterprise: 95, midMarket: 88, smb: 82, startup: 75 },
    { month: "Feb", enterprise: 94, midMarket: 85, smb: 78, startup: 68 },
    { month: "Mar", enterprise: 93, midMarket: 83, smb: 74, startup: 62 },
    { month: "Apr", enterprise: 92, midMarket: 81, smb: 71, startup: 58 },
    { month: "May", enterprise: 91, midMarket: 79, smb: 68, startup: 54 },
    { month: "Jun", enterprise: 90, midMarket: 77, smb: 65, startup: 51 }
  ];

  const ltvcacData = [
    { segment: "Enterprise", ltv: 285, cac: 24, ratio: 11.9 },
    { segment: "Mid-Market", ltv: 123, cac: 9.8, ratio: 12.6 },
    { segment: "SMB", ltv: 48, cac: 3.4, ratio: 14.1 },
    { segment: "Startup", ltv: 21, cac: 1.8, ratio: 11.7 }
  ];

  const behaviorData = [
    { feature: "Analytics", enterprise: 98, midMarket: 85, smb: 72, startup: 58 },
    { feature: "Reports", enterprise: 92, midMarket: 78, smb: 65, startup: 45 },
    { feature: "API", enterprise: 87, midMarket: 62, smb: 34, startup: 23 },
    { feature: "Integrations", enterprise: 94, midMarket: 71, smb: 48, startup: 31 },
    { feature: "Support", enterprise: 89, midMarket: 76, smb: 68, startup: 52 }
  ];

  const segmentColors = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--success))", "hsl(var(--warning))"];

  const formatCurrency = (value: number) => {
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

  // Animated values for metric cards
  const totalCustomers = useAnimatedCounter(40260, 3000);
  const avgLTV = useAnimatedCounter(8420, 3000);
  const avgCAC = useAnimatedCounter(875, 3000);
  const ltvCacRatio = useAnimatedCounter(123, 3000);

  // Loading state component
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-4 bg-muted/20 rounded w-3/4 mb-2"></div>
      <div className="h-8 bg-muted/20 rounded w-1/2"></div>
    </div>
  );

  return (
    <Layout title="Customer Segmentation">
      <div className="space-y-6">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Activity className="w-8 h-8 text-primary animate-pulse" />
                <div className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full animate-ping" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-glow via-accent-glow to-success-glow bg-clip-text text-transparent">
                Customer Segmentation
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Advanced customer analytics and lifetime value modeling with real-time insights
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Zap className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                Live Data
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
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow transition-all duration-300 shadow-lg hover:shadow-xl group">
              <Settings className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Configure
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card className="glass border-glass-border/30 relative overflow-hidden hover:glow-primary hover:scale-105 transition-all duration-500 group">
            <div 
              className="absolute inset-0 opacity-5 bg-cover bg-center transition-opacity duration-500 group-hover:opacity-10"
              style={{ backgroundImage: `url(${circuitPattern})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Total Customers</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                      {totalCustomers.toLocaleString()}
                    </p>
                    <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                      +12.5%
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <Users className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
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
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Avg LTV</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold bg-gradient-to-r from-success to-success-glow bg-clip-text text-transparent">
                      ${avgLTV.toLocaleString()}
                    </p>
                    <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                      +8.3%
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <DollarSign className="w-10 h-10 text-success group-hover:scale-110 transition-transform duration-300" />
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
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Avg CAC</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold bg-gradient-to-r from-warning to-warning-glow bg-clip-text text-transparent">
                      ${avgCAC.toLocaleString()}
                    </p>
                    <Badge variant="secondary" className="bg-warning/10 text-warning text-xs">
                      -5.2%
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <Target className="w-10 h-10 text-warning group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-warning/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30 relative overflow-hidden hover:glow-accent hover:scale-105 transition-all duration-500 group">
            <div 
              className="absolute inset-0 opacity-5 bg-cover bg-center transition-opacity duration-500 group-hover:opacity-10"
              style={{ backgroundImage: `url(${circuitPattern})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">LTV/CAC Ratio</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
                      {(ltvCacRatio / 10).toFixed(1)}x
                    </p>
                    <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                      +15.7%
                    </Badge>
                  </div>
                </div>
                <div className="relative">
                  <TrendingUp className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
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
                <span className="relative z-10">Segment Overview</span>
              </TabsTrigger>
              <TabsTrigger 
                value="cohort" 
                className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-accent/20 data-[state=active]:text-accent data-[state=active]:shadow-lg group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-success/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300" />
                <Activity className="w-4 h-4 mr-2" />
                <span className="relative z-10">Cohort Analysis</span>
              </TabsTrigger>
              <TabsTrigger 
                value="ltvcac" 
                className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-success/20 data-[state=active]:text-success data-[state=active]:shadow-lg group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-success/10 to-warning/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300" />
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="relative z-10">LTV/CAC Analysis</span>
              </TabsTrigger>
              <TabsTrigger 
                value="behavior" 
                className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-warning/20 data-[state=active]:text-warning data-[state=active]:shadow-lg group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-warning/10 to-primary/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300" />
                <PieChartIcon className="w-4 h-4 mr-2" />
                <span className="relative z-10">Behavior Patterns</span>
              </TabsTrigger>
            </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle>Customer Distribution</CardTitle>
                  <CardDescription>Users by segment</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={segmentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="users"
                        label={({ segment, users }) => `${segment}: ${users.toLocaleString()}`}
                      >
                        {segmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={segmentColors[index % segmentColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value.toLocaleString(), "Users"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle>LTV by Segment</CardTitle>
                  <CardDescription>Customer lifetime value comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={segmentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="segment" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(Number(value)), "LTV"]}
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }} 
                      />
                      <Bar dataKey="ltv" fill="hsl(var(--success))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Segment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {segmentData.map((segment, index) => (
                <Card key={segment.segment} className="glass border-glass-border/30 hover:border-primary/20 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{segment.segment}</CardTitle>
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: segmentColors[index] }}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Users:</span>
                        <p className="font-bold">{segment.users.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">LTV:</span>
                        <p className="font-bold">{formatCurrency(segment.ltv)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">CAC:</span>
                        <p className="font-bold">{formatCurrency(segment.cac)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Churn:</span>
                        <p className="font-bold">{segment.churn}%</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Satisfaction</span>
                        <span className="font-bold">{segment.satisfaction}/10</span>
                      </div>
                      <Progress value={segment.satisfaction * 10} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cohort" className="space-y-4">
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle>6-Month Retention Cohort</CardTitle>
                <CardDescription>Customer retention rates by segment over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={cohortData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" domain={[40, 100]} />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, "Retention"]}
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Line type="monotone" dataKey="enterprise" stroke={segmentColors[0]} strokeWidth={3} />
                    <Line type="monotone" dataKey="midMarket" stroke={segmentColors[1]} strokeWidth={3} />
                    <Line type="monotone" dataKey="smb" stroke={segmentColors[2]} strokeWidth={3} />
                    <Line type="monotone" dataKey="startup" stroke={segmentColors[3]} strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ltvcac" className="space-y-4">
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle>LTV vs CAC Analysis</CardTitle>
                <CardDescription>Customer economics by segment</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart data={segmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="cac" stroke="hsl(var(--muted-foreground))" name="CAC" />
                    <YAxis dataKey="ltv" stroke="hsl(var(--muted-foreground))" name="LTV" />
                    <Tooltip 
                      formatter={(value, name) => [formatCurrency(Number(value)), name]}
                      labelFormatter={(label) => `Segment: ${label}`}
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Scatter name="Segments" dataKey="ltv" fill="hsl(var(--primary))" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-4">
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle>Feature Usage by Segment</CardTitle>
                <CardDescription>Feature adoption rates across customer segments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={behaviorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="feature" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, "Usage"]}
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }} 
                    />
                    <Bar dataKey="enterprise" fill={segmentColors[0]} />
                    <Bar dataKey="midMarket" fill={segmentColors[1]} />
                    <Bar dataKey="smb" fill={segmentColors[2]} />
                    <Bar dataKey="startup" fill={segmentColors[3]} />
                  </BarChart>
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