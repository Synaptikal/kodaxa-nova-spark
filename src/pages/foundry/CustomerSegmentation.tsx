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
  UserPlus
} from "lucide-react";

export default function CustomerSegmentation() {
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

  const segmentColors = ["#0ea5e9", "#8b5cf6", "#10b981", "#f59e0b"];

  const formatCurrency = (value: number) => {
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

  return (
    <Layout title="Customer Segmentation">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-success-glow to-primary-glow bg-clip-text text-transparent">
              Customer Segmentation
            </h1>
            <p className="text-muted-foreground mt-2">
              Advanced customer analytics and lifetime value modeling
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Analysis
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass border-glass-border/30 relative overflow-hidden">
            <div 
              className="absolute inset-0 opacity-5 bg-cover bg-center"
              style={{ backgroundImage: `url(${circuitPattern})` }}
            />
            <CardContent className="p-4 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Customers</p>
                  <p className="text-2xl font-bold text-primary">40,260</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
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
                  <p className="text-sm text-muted-foreground">Avg LTV</p>
                  <p className="text-2xl font-bold text-success">$8,420</p>
                </div>
                <DollarSign className="w-8 h-8 text-success" />
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
                  <p className="text-sm text-muted-foreground">Avg CAC</p>
                  <p className="text-2xl font-bold text-warning">$875</p>
                </div>
                <Target className="w-8 h-8 text-warning" />
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
                  <p className="text-sm text-muted-foreground">LTV/CAC Ratio</p>
                  <p className="text-2xl font-bold text-accent">12.3x</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Segment Overview</TabsTrigger>
            <TabsTrigger value="cohort">Cohort Analysis</TabsTrigger>
            <TabsTrigger value="ltvcac">LTV/CAC Analysis</TabsTrigger>
            <TabsTrigger value="behavior">Behavior Patterns</TabsTrigger>
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
    </Layout>
  );
}