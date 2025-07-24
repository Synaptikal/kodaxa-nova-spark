import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/common/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Shield, TrendingUp, DollarSign, Calendar, AlertTriangle, 
  Plus, Eye, Edit, Trash2, Download, Filter, BarChart3,
  PieChart, Activity, Award, Globe, Clock, Users
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart } from 'recharts';

interface PortfolioPatent {
  id: string;
  patentNumber: string;
  title: string;
  status: 'active' | 'pending' | 'expired' | 'abandoned';
  filingDate: string;
  grantDate?: string;
  expiryDate: string;
  maintenanceFees: {
    nextDue: string;
    amount: number;
    status: 'paid' | 'due' | 'overdue';
  };
  valuation: number;
  licenseRevenue: number;
  technology: string;
  inventors: string[];
  jurisdiction: string;
  familySize: number;
  citationCount: number;
  riskLevel: 'low' | 'medium' | 'high';
}

interface PortfolioAnalytics {
  totalValue: number;
  totalRevenue: number;
  maintenanceCosts: number;
  portfolioGrowth: number;
  statusBreakdown: { status: string; count: number; color: string }[];
  technologyDistribution: { tech: string; count: number; value: number }[];
  revenueTimeline: { month: string; licensing: number; maintenance: number; valuation: number }[];
  jurisdictionMap: { country: string; patents: number; value: number }[];
  riskAnalysis: { level: string; count: number; color: string }[];
  expirationTimeline: { year: string; expiring: number; value: number }[];
}

const PatentPortfolio = () => {
  const [patents, setPatents] = useState<PortfolioPatent[]>([]);
  const [analytics, setAnalytics] = useState<PortfolioAnalytics | null>(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  // Mock portfolio data
  const mockPatents: PortfolioPatent[] = [
    {
      id: '1',
      patentNumber: 'US11234567B2',
      title: 'AI-Powered Business Intelligence System',
      status: 'active',
      filingDate: '2020-03-15',
      grantDate: '2022-09-20',
      expiryDate: '2040-03-15',
      maintenanceFees: {
        nextDue: '2024-09-20',
        amount: 7700,
        status: 'due'
      },
      valuation: 2500000,
      licenseRevenue: 450000,
      technology: 'Artificial Intelligence',
      inventors: ['John Smith', 'Jane Doe'],
      jurisdiction: 'US',
      familySize: 8,
      citationCount: 23,
      riskLevel: 'low'
    },
    {
      id: '2',
      patentNumber: 'US11567890B1',
      title: 'Blockchain Supply Chain Management',
      status: 'active',
      filingDate: '2019-11-08',
      grantDate: '2021-05-15',
      expiryDate: '2039-11-08',
      maintenanceFees: {
        nextDue: '2025-05-15',
        amount: 7700,
        status: 'paid'
      },
      valuation: 1800000,
      licenseRevenue: 320000,
      technology: 'Blockchain',
      inventors: ['Alice Johnson'],
      jurisdiction: 'US',
      familySize: 5,
      citationCount: 18,
      riskLevel: 'medium'
    },
    {
      id: '3',
      patentNumber: 'EP3456789B1',
      title: 'Quantum Computing Financial Algorithms',
      status: 'pending',
      filingDate: '2023-01-20',
      expiryDate: '2043-01-20',
      maintenanceFees: {
        nextDue: '2024-01-20',
        amount: 5500,
        status: 'due'
      },
      valuation: 3200000,
      licenseRevenue: 0,
      technology: 'Quantum Computing',
      inventors: ['Robert Chen', 'Maria Garcia'],
      jurisdiction: 'EU',
      familySize: 12,
      citationCount: 0,
      riskLevel: 'high'
    }
  ];

  const mockAnalytics: PortfolioAnalytics = {
    totalValue: 7500000,
    totalRevenue: 770000,
    maintenanceCosts: 45000,
    portfolioGrowth: 23.5,
    statusBreakdown: [
      { status: 'Active', count: 45, color: '#10B981' },
      { status: 'Pending', count: 12, color: '#F59E0B' },
      { status: 'Expired', count: 8, color: '#6B7280' },
      { status: 'Abandoned', count: 3, color: '#EF4444' }
    ],
    technologyDistribution: [
      { tech: 'Artificial Intelligence', count: 15, value: 12500000 },
      { tech: 'Blockchain', count: 8, value: 8900000 },
      { tech: 'Quantum Computing', count: 5, value: 15600000 },
      { tech: 'IoT & Sensors', count: 12, value: 6700000 },
      { tech: 'Cybersecurity', count: 9, value: 7800000 }
    ],
    revenueTimeline: [
      { month: 'Jan', licensing: 45000, maintenance: 8000, valuation: 7200000 },
      { month: 'Feb', licensing: 52000, maintenance: 12000, valuation: 7350000 },
      { month: 'Mar', licensing: 48000, maintenance: 15000, valuation: 7400000 },
      { month: 'Apr', licensing: 67000, maintenance: 9000, valuation: 7500000 },
      { month: 'May', licensing: 71000, maintenance: 18000, valuation: 7650000 },
      { month: 'Jun', licensing: 89000, maintenance: 11000, valuation: 7750000 }
    ],
    jurisdictionMap: [
      { country: 'United States', patents: 28, value: 35600000 },
      { country: 'European Union', patents: 18, value: 23400000 },
      { country: 'China', patents: 12, value: 15700000 },
      { country: 'Japan', patents: 8, value: 12300000 },
      { country: 'Canada', patents: 6, value: 8900000 }
    ],
    riskAnalysis: [
      { level: 'Low Risk', count: 32, color: '#10B981' },
      { level: 'Medium Risk', count: 18, color: '#F59E0B' },
      { level: 'High Risk', count: 8, color: '#EF4444' }
    ],
    expirationTimeline: [
      { year: '2024', expiring: 2, value: 1200000 },
      { year: '2025', expiring: 4, value: 2800000 },
      { year: '2026', expiring: 6, value: 4200000 },
      { year: '2027', expiring: 3, value: 2100000 },
      { year: '2028', expiring: 8, value: 5600000 }
    ]
  };

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setPatents(mockPatents);
      setAnalytics(mockAnalytics);
      setIsLoaded(true);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/20 text-success border-success/30';
      case 'pending': return 'bg-warning/20 text-warning border-warning/30';
      case 'expired': return 'bg-muted/20 text-muted-foreground border-muted/30';
      case 'abandoned': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-success/20 text-success border-success/30';
      case 'medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const handleAddPatent = () => {
    toast({
      title: 'Add Patent',
      description: 'Patent addition form will be implemented'
    });
  };

  const handleExport = () => {
    toast({
      title: 'Export Started',
      description: 'Portfolio report is being generated'
    });
  };

  if (!isLoaded) {
    return (
      <Layout title="Patent Portfolio">
        <div className="min-h-screen flex items-center justify-center">
          <Activity className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Patent Portfolio Management">
      <div className="space-y-6">
        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass border-glass-border/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                  <p className="text-2xl font-bold text-primary">
                    ${analytics?.totalValue.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-success mr-1" />
                <span className="text-success">+{analytics?.portfolioGrowth}%</span>
                <span className="text-muted-foreground ml-1">from last year</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">License Revenue</p>
                  <p className="text-2xl font-bold text-success">
                    ${analytics?.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-success" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground mr-1" />
                <span className="text-muted-foreground">This year</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Patents</p>
                  <p className="text-2xl font-bold text-accent">
                    {analytics?.statusBreakdown[0].count}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <Award className="w-4 h-4 text-muted-foreground mr-1" />
                <span className="text-muted-foreground">Protected innovations</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Maintenance Due</p>
                  <p className="text-2xl font-bold text-warning">
                    ${analytics?.maintenanceCosts.toLocaleString()}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-warning" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <Clock className="w-4 h-4 text-muted-foreground mr-1" />
                <span className="text-muted-foreground">Next 90 days</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Dashboard */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList className="glass border-glass-border/30">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="patents">Patents</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button onClick={handleAddPatent}>
                <Plus className="w-4 h-4 mr-2" />
                Add Patent
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Revenue & Valuation Timeline */}
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Revenue & Portfolio Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={analytics?.revenueTimeline}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="licensing" fill="hsl(var(--success))" name="Licensing Revenue" />
                    <Bar yAxisId="left" dataKey="maintenance" fill="hsl(var(--warning))" name="Maintenance Costs" />
                    <Line yAxisId="right" type="monotone" dataKey="valuation" stroke="hsl(var(--primary))" strokeWidth={3} name="Portfolio Value" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Status Distribution */}
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Portfolio Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsPieChart>
                      <Pie
                        data={analytics?.statusBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="count"
                        label={({ status, count }) => `${status}: ${count}`}
                      >
                        {analytics?.statusBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Risk Analysis */}
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={analytics?.riskAnalysis}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="level" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--accent))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Technology Distribution */}
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle>Technology Distribution & Value</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics?.technologyDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tech" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="count" fill="hsl(var(--primary))" name="Patent Count" />
                    <Bar yAxisId="right" dataKey="value" fill="hsl(var(--success))" name="Total Value ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Geographic Distribution */}
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Geographic Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics?.jurisdictionMap.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.country}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{item.patents} patents</Badge>
                          <span className="text-sm text-muted-foreground">
                            ${(item.value / 1000000).toFixed(1)}M
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Expiration Timeline */}
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Expiration Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={analytics?.expirationTimeline}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="expiring"
                        stroke="hsl(var(--destructive))"
                        fill="hsl(var(--destructive) / 0.3)"
                        name="Expiring Patents"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patents" className="space-y-6">
            {/* Patents List */}
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle>Portfolio Patents</CardTitle>
                <CardDescription>Manage and monitor your patent portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patents.map((patent) => (
                    <Card key={patent.id} className="glass border-glass-border/30">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-2">{patent.title}</h3>
                            <div className="flex flex-wrap gap-2">
                              <Badge className={getStatusColor(patent.status)}>
                                {patent.status.toUpperCase()}
                              </Badge>
                              <Badge variant="outline">{patent.patentNumber}</Badge>
                              <Badge className={getRiskColor(patent.riskLevel)}>
                                {patent.riskLevel.toUpperCase()} RISK
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Valuation</div>
                            <div className="text-xl font-bold text-success">
                              ${(patent.valuation / 1000000).toFixed(1)}M
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Technology</div>
                            <div className="text-sm font-medium">{patent.technology}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Jurisdiction</div>
                            <div className="text-sm font-medium">{patent.jurisdiction}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Family Size</div>
                            <div className="text-sm font-medium">{patent.familySize} patents</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Citations</div>
                            <div className="text-sm font-medium">{patent.citationCount}</div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Next maintenance: </span>
                            <span className={patent.maintenanceFees.status === 'due' ? 'text-warning font-medium' : 'text-muted-foreground'}>
                              {patent.maintenanceFees.nextDue} (${patent.maintenanceFees.amount.toLocaleString()})
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            {/* Maintenance Schedule */}
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Maintenance Schedule
                </CardTitle>
                <CardDescription>
                  Upcoming maintenance fees and deadlines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patents.filter(p => p.maintenanceFees.status !== 'paid').map((patent) => (
                    <div key={patent.id} className="flex justify-between items-center p-4 border border-glass-border/30 rounded-lg">
                      <div>
                        <h4 className="font-medium">{patent.title}</h4>
                        <p className="text-sm text-muted-foreground">{patent.patentNumber}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Due Date</div>
                        <div className={`font-medium ${patent.maintenanceFees.status === 'due' ? 'text-warning' : 'text-muted-foreground'}`}>
                          {patent.maintenanceFees.nextDue}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Amount</div>
                        <div className="font-medium">${patent.maintenanceFees.amount.toLocaleString()}</div>
                      </div>
                      <Button 
                        variant={patent.maintenanceFees.status === 'due' ? 'default' : 'outline'} 
                        size="sm"
                      >
                        Pay Fee
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PatentPortfolio;
