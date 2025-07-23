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
  Search
} from "lucide-react";

export default function CompetitiveAnalysis() {
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

  const pieColors = ["#0ea5e9", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#6b7280"];

  return (
    <Layout title="Competitive Analysis">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-glow to-accent-glow bg-clip-text text-transparent">
              Competitive Analysis
            </h1>
            <p className="text-muted-foreground mt-2">
              Real-time competitor intelligence and market positioning analysis
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

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass border-glass-border/30 relative overflow-hidden group">
            <div 
              className="absolute inset-0 opacity-5 bg-cover bg-center"
              style={{ backgroundImage: `url(${circuitPattern})` }}
            />
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Market Rank</p>
                  <p className="text-2xl font-bold text-accent">#3</p>
                </div>
                <Target className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30 relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-5 bg-cover bg-center"
              style={{ backgroundImage: `url(${circuitPattern})` }}
            />
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Market Share</p>
                  <p className="text-2xl font-bold text-primary">12%</p>
                </div>
                <PieChartIcon className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30 relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-5 bg-cover bg-center"
              style={{ backgroundImage: `url(${circuitPattern})` }}
            />
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Growth Rate</p>
                  <p className="text-2xl font-bold text-success">+23%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30 relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-5 bg-cover bg-center"
              style={{ backgroundImage: `url(${circuitPattern})` }}
            />
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Competitors</p>
                  <p className="text-2xl font-bold text-warning">15</p>
                </div>
                <Users className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Market Overview</TabsTrigger>
            <TabsTrigger value="features">Feature Comparison</TabsTrigger>
            <TabsTrigger value="positioning">Positioning</TabsTrigger>
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
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
    </Layout>
  );
}