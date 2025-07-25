import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/common/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Target, TrendingUp, DollarSign, Users, Globe, Building, BarChart3, 
  PieChart, Activity, Search, Filter, Download, Plus, Calculator,
  Lightbulb, Zap, Award, MapPin, Clock, ArrowUp, ArrowDown, Settings,
  RefreshCw, Edit, Copy, Play, AlertTriangle
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, FunnelChart, Funnel, LabelList } from 'recharts';

interface MarketData {
  id: string;
  name: string;
  industry: string;
  tam: number;
  sam: number;
  som: number;
  growth: number;
  confidence: number;
  createdAt: string;
  marketSegments: { segment: string; size: number; growth: number; color: string }[];
  competitors: { name: string; marketShare: number; revenue: number }[];
  geographicBreakdown: { region: string; size: number; growth: number; color: string }[];
  trends: { year: string; tam: number; sam: number; som: number }[];
  scenarios: {
    optimistic: { som: number; marketShare: number; confidence: number };
    realistic: { som: number; marketShare: number; confidence: number };
    conservative: { som: number; marketShare: number; confidence: number };
  };
  keyDrivers: string[];
  risks: string[];
  opportunities: string[];
}

interface MarketSizingRequest {
  industry: string;
  productCategory: string;
  targetGeography: string;
  timeframe: string;
  businessModel: string;
  targetCustomers: string;
}

const MarketSizing = () => {
  const [markets, setMarkets] = useState<MarketData[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<MarketData | null>(null);
  const [showNewAnalysis, setShowNewAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [newRequest, setNewRequest] = useState<MarketSizingRequest>({
    industry: '',
    productCategory: '',
    targetGeography: '',
    timeframe: '5-year',
    businessModel: '',
    targetCustomers: ''
  });
  const { toast } = useToast();

  // Comprehensive mock market data
  const mockMarkets: MarketData[] = [
    {
      id: '1',
      name: 'AI-Powered Business Intelligence Platform',
      industry: 'Enterprise Software',
      tam: 125.6,
      sam: 45.2,
      som: 12.8,
      growth: 23.5,
      confidence: 87,
      createdAt: '2024-03-15',
      marketSegments: [
        { segment: 'Large Enterprise (1000+ employees)', size: 78.5, growth: 18.2, color: '#10B981' },
        { segment: 'Mid-Market (100-999 employees)', size: 32.1, growth: 28.7, color: '#3B82F6' },
        { segment: 'Small Business (10-99 employees)', size: 15.0, growth: 35.4, color: '#F59E0B' }
      ],
      competitors: [
        { name: 'Tableau', marketShare: 28.5, revenue: 1800 },
        { name: 'Microsoft Power BI', marketShare: 22.1, revenue: 1400 },
        { name: 'Qlik', marketShare: 15.8, revenue: 1000 },
        { name: 'SAS', marketShare: 12.3, revenue: 780 },
        { name: 'Others', marketShare: 21.3, revenue: 1350 }
      ],
      geographicBreakdown: [
        { region: 'North America', size: 56.8, growth: 20.1, color: '#8B5CF6' },
        { region: 'Europe', size: 34.2, growth: 25.3, color: '#06B6D4' },
        { region: 'Asia Pacific', size: 25.6, growth: 32.7, color: '#84CC16' },
        { region: 'Latin America', size: 6.4, growth: 28.9, color: '#F97316' },
        { region: 'Middle East & Africa', size: 2.6, growth: 35.2, color: '#EF4444' }
      ],
      trends: [
        { year: '2019', tam: 78.2, sam: 28.1, som: 7.8 },
        { year: '2020', tam: 89.2, sam: 32.1, som: 8.9 },
        { year: '2021', tam: 102.5, sam: 36.8, som: 10.2 },
        { year: '2022', tam: 112.8, sam: 40.5, som: 11.3 },
        { year: '2023', tam: 125.6, sam: 45.2, som: 12.8 },
        { year: '2024', tam: 142.3, sam: 51.2, som: 14.8 },
        { year: '2025', tam: 165.7, sam: 59.6, som: 17.2 },
        { year: '2026', tam: 189.4, sam: 68.1, som: 19.8 }
      ],
      scenarios: {
        optimistic: { som: 18.5, marketShare: 3.2, confidence: 78 },
        realistic: { som: 12.8, marketShare: 2.1, confidence: 87 },
        conservative: { som: 8.4, marketShare: 1.4, confidence: 93 }
      },
      keyDrivers: [
        'Digital transformation acceleration across industries',
        'Increased demand for real-time analytics and insights',
        'AI/ML adoption in business processes',
        'Remote work driving cloud adoption',
        'Regulatory compliance requirements',
        'Data-driven decision making becoming standard'
      ],
      risks: [
        'Economic downturn reducing IT spending',
        'Increasing competition from tech giants (Google, Microsoft)',
        'Data privacy regulations limiting analytics capabilities',
        'Skills shortage in data science and analytics',
        'Market saturation in developed regions'
      ],
      opportunities: [
        'Expansion into emerging markets (India, Brazil, SEA)',
        'Integration with IoT and edge computing',
        'Industry-specific vertical solutions',
        'Acquisition of smaller specialized competitors',
        'Partnership with system integrators',
        'Development of no-code/low-code analytics tools'
      ]
    },
    {
      id: '2',
      name: 'Quantum Computing for Financial Services',
      industry: 'Financial Technology',
      tam: 89.3,
      sam: 32.1,
      som: 8.9,
      growth: 45.2,
      confidence: 73,
      createdAt: '2024-03-10',
      marketSegments: [
        { segment: 'Investment Banks', size: 45.2, growth: 35.1, color: '#DC2626' },
        { segment: 'Asset Management', size: 28.9, growth: 42.7, color: '#7C3AED' },
        { segment: 'Insurance Companies', size: 15.2, growth: 50.4, color: '#059669' }
      ],
      competitors: [
        { name: 'IBM Quantum', marketShare: 35.2, revenue: 890 },
        { name: 'Google Quantum AI', marketShare: 28.7, revenue: 720 },
        { name: 'Rigetti Computing', marketShare: 15.3, revenue: 380 },
        { name: 'IonQ', marketShare: 12.1, revenue: 310 },
        { name: 'Others', marketShare: 8.7, revenue: 220 }
      ],
      geographicBreakdown: [
        { region: 'North America', size: 42.8, growth: 39.5, color: '#1E40AF' },
        { region: 'Europe', size: 28.1, growth: 47.8, color: '#7C2D12' },
        { region: 'Asia Pacific', size: 15.4, growth: 54.2, color: '#166534' },
        { region: 'Rest of World', size: 3.0, growth: 61.5, color: '#92400E' }
      ],
      trends: [
        { year: '2020', tam: 12.1, sam: 4.2, som: 1.2 },
        { year: '2021', tam: 23.3, sam: 8.9, som: 2.3 },
        { year: '2022', tam: 41.2, sam: 15.6, som: 4.1 },
        { year: '2023', tam: 89.3, sam: 32.1, som: 8.9 },
        { year: '2024', tam: 156.5, sam: 56.4, som: 15.7 },
        { year: '2025', tam: 267.8, sam: 96.4, som: 26.8 },
        { year: '2026', tam: 445.2, sam: 160.3, som: 44.5 }
      ],
      scenarios: {
        optimistic: { som: 15.2, marketShare: 4.8, confidence: 65 },
        realistic: { som: 8.9, marketShare: 2.8, confidence: 73 },
        conservative: { som: 4.2, marketShare: 1.3, confidence: 85 }
      },
      keyDrivers: [
        'Breakthrough in quantum algorithm development',
        'Increased government and private funding',
        'Growing need for complex financial modeling',
        'Risk management and fraud detection requirements',
        'Optimization of trading strategies'
      ],
      risks: [
        'Technical limitations of current quantum hardware',
        'High implementation and maintenance costs',
        'Lack of quantum-skilled workforce',
        'Regulatory uncertainty around quantum technology',
        'Potential security vulnerabilities'
      ],
      opportunities: [
        'Quantum-as-a-Service (QaaS) business model',
        'Partnership with major cloud providers',
        'Integration with existing financial systems',
        'Development of quantum-safe security protocols',
        'Expansion into cryptocurrency and blockchain'
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setMarkets(mockMarkets);
      setSelectedMarket(mockMarkets[0]);
      setIsLoaded(true);
    }, 1000);
  }, []);

  const handleNewAnalysis = async () => {
    if (!newRequest.industry || !newRequest.productCategory) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in industry and product category',
        variant: 'destructive'
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI-powered market analysis
    setTimeout(() => {
      const tamSize = Math.random() * 200 + 50;
      const samSize = tamSize * (0.15 + Math.random() * 0.25);
      const somSize = samSize * (0.1 + Math.random() * 0.3);
      
      const newMarket: MarketData = {
        id: Date.now().toString(),
        name: `${newRequest.productCategory} - ${newRequest.industry}`,
        industry: newRequest.industry,
        tam: Number(tamSize.toFixed(1)),
        sam: Number(samSize.toFixed(1)),
        som: Number(somSize.toFixed(1)),
        growth: Math.random() * 40 + 10,
        confidence: Math.random() * 20 + 70,
        createdAt: new Date().toISOString().split('T')[0],
        marketSegments: [
          { segment: 'Enterprise', size: tamSize * 0.6, growth: 15 + Math.random() * 20, color: '#10B981' },
          { segment: 'Mid-Market', size: tamSize * 0.3, growth: 20 + Math.random() * 20, color: '#3B82F6' },
          { segment: 'SMB', size: tamSize * 0.1, growth: 25 + Math.random() * 20, color: '#F59E0B' }
        ],
        competitors: [
          { name: 'Market Leader', marketShare: 25 + Math.random() * 15, revenue: 500 + Math.random() * 1000 },
          { name: 'Challenger 1', marketShare: 15 + Math.random() * 10, revenue: 300 + Math.random() * 700 },
          { name: 'Challenger 2', marketShare: 10 + Math.random() * 10, revenue: 200 + Math.random() * 500 },
          { name: 'Others', marketShare: 40 + Math.random() * 20, revenue: 400 + Math.random() * 800 }
        ],
        geographicBreakdown: [
          { region: 'North America', size: tamSize * 0.4, growth: 15 + Math.random() * 15, color: '#8B5CF6' },
          { region: 'Europe', size: tamSize * 0.3, growth: 12 + Math.random() * 18, color: '#06B6D4' },
          { region: 'Asia Pacific', size: tamSize * 0.2, growth: 20 + Math.random() * 25, color: '#84CC16' },
          { region: 'Rest of World', size: tamSize * 0.1, growth: 25 + Math.random() * 30, color: '#F97316' }
        ],
        trends: [],
        scenarios: {
          optimistic: { som: somSize * 1.5, marketShare: 3.5, confidence: 70 },
          realistic: { som: somSize, marketShare: 2.2, confidence: 85 },
          conservative: { som: somSize * 0.6, marketShare: 1.4, confidence: 95 }
        },
        keyDrivers: ['Market demand growth', 'Technology advancement', 'Regulatory support'],
        risks: ['Competition intensity', 'Economic uncertainty', 'Technology risks'],
        opportunities: ['Market expansion', 'Product innovation', 'Strategic partnerships']
      };
      
      setMarkets([...markets, newMarket]);
      setSelectedMarket(newMarket);
      setIsAnalyzing(false);
      setShowNewAnalysis(false);
      setNewRequest({
        industry: '',
        productCategory: '',
        targetGeography: '',
        timeframe: '5-year',
        businessModel: '',
        targetCustomers: ''
      });
      
      toast({
        title: 'Analysis Complete!',
        description: `Generated comprehensive market analysis for ${newRequest.productCategory}`
      });
    }, 3000);
  };

  const handleAction = (action: string) => {
    const actions = {
      'edit': 'Edit Assumptions',
      'clone': 'Clone Model', 
      'simulate': 'Run Simulation',
      'export': 'Export Report',
      'refresh': 'Refresh Data',
      'configure': 'Configure Settings'
    };

    toast({
      title: `${actions[action as keyof typeof actions]} Started`,
      description: `Processing ${action} request...`
    });
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}B`;
    return `$${value.toFixed(1)}B`;
  };

  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];

  if (!isLoaded) {
    return (
      <Layout title="Market Sizing Analysis">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Activity className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading market intelligence...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Market Sizing & TAM/SAM Analysis">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-cyber">Market Sizing Intelligence</h1>
            <p className="text-muted-foreground">AI-powered TAM, SAM, and SOM analysis with competitive intelligence</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleAction('export')}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" onClick={() => handleAction('refresh')}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
            <Dialog open={showNewAnalysis} onOpenChange={setShowNewAnalysis}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Analysis
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] glass border-glass-border/30">
                <DialogHeader>
                  <DialogTitle className="font-cyber">AI Market Analysis Generator</DialogTitle>
                  <DialogDescription>
                    Generate comprehensive TAM/SAM/SOM analysis using AI and real-time market data
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="industry">Industry *</Label>
                      <Input
                        id="industry"
                        placeholder="e.g., Enterprise Software, FinTech"
                        value={newRequest.industry}
                        onChange={(e) => setNewRequest({ ...newRequest, industry: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="product">Product Category *</Label>
                      <Input
                        id="product"
                        placeholder="e.g., Business Intelligence, AI Platform"
                        value={newRequest.productCategory}
                        onChange={(e) => setNewRequest({ ...newRequest, productCategory: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="geography">Target Geography</Label>
                      <Select value={newRequest.targetGeography} onValueChange={(value) => setNewRequest({ ...newRequest, targetGeography: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select geography" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="global">Global</SelectItem>
                          <SelectItem value="north-america">North America</SelectItem>
                          <SelectItem value="europe">Europe</SelectItem>
                          <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                          <SelectItem value="emerging">Emerging Markets</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timeframe">Analysis Timeframe</Label>
                      <Select value={newRequest.timeframe} onValueChange={(value) => setNewRequest({ ...newRequest, timeframe: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3-year">3 Year Forecast</SelectItem>
                          <SelectItem value="5-year">5 Year Forecast</SelectItem>
                          <SelectItem value="10-year">10 Year Forecast</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="business-model">Business Model</Label>
                    <Input
                      id="business-model"
                      placeholder="e.g., SaaS, Marketplace, Licensing"
                      value={newRequest.businessModel}
                      onChange={(e) => setNewRequest({ ...newRequest, businessModel: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="target-customers">Target Customers</Label>
                    <Input
                      id="target-customers"
                      placeholder="e.g., Enterprise, SMB, Consumers"
                      value={newRequest.targetCustomers}
                      onChange={(e) => setNewRequest({ ...newRequest, targetCustomers: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowNewAnalysis(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleNewAnalysis} disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <Activity className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Calculator className="w-4 h-4 mr-2" />
                    )}
                    {isAnalyzing ? 'Analyzing...' : 'Generate Analysis'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Market Selection */}
        <Card className="glass border-glass-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Market Analysis Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Select value={selectedMarket?.id} onValueChange={(value) => setSelectedMarket(markets.find(m => m.id === value) || null)}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select market analysis" />
                </SelectTrigger>
                <SelectContent>
                  {markets.map((market) => (
                    <SelectItem key={market.id} value={market.id}>
                      {market.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedMarket && (
                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    Confidence: {selectedMarket.confidence}%
                  </Badge>
                  <Badge variant="outline">
                    Created: {selectedMarket.createdAt}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard */}
        {selectedMarket && (
          <>
            {/* TAM/SAM/SOM Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass border-glass-border/30 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Addressable Market</p>
                      <p className="text-3xl font-bold text-primary">{formatCurrency(selectedMarket.tam)}</p>
                    </div>
                    <Target className="w-10 h-10 text-primary" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <ArrowUp className="w-4 h-4 text-success mr-1" />
                    <span className="text-success">+{selectedMarket.growth.toFixed(1)}%</span>
                    <span className="text-muted-foreground ml-1">CAGR</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-glass-border/30 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Serviceable Addressable Market</p>
                      <p className="text-3xl font-bold text-accent">{formatCurrency(selectedMarket.sam)}</p>
                    </div>
                    <Users className="w-10 h-10 text-accent" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-muted-foreground">
                      {((selectedMarket.sam / selectedMarket.tam) * 100).toFixed(1)}% of TAM
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-glass-border/30 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Serviceable Obtainable Market</p>
                      <p className="text-3xl font-bold text-success">{formatCurrency(selectedMarket.som)}</p>
                    </div>
                    <DollarSign className="w-10 h-10 text-success" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-muted-foreground">
                      {((selectedMarket.som / selectedMarket.sam) * 100).toFixed(1)}% of SAM
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analysis Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="glass border-glass-border/30">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="segments">Segments</TabsTrigger>
                <TabsTrigger value="competition">Competition</TabsTrigger>
                <TabsTrigger value="geography">Geography</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Market Funnel Visualization */}
                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Market Opportunity Funnel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={[
                          { name: 'TAM', value: selectedMarket.tam, fill: 'hsl(var(--primary))' },
                          { name: 'SAM', value: selectedMarket.sam, fill: 'hsl(var(--accent))' },
                          { name: 'SOM', value: selectedMarket.som, fill: 'hsl(var(--success))' }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`${formatCurrency(Number(value))}`, 'Market Size']} />
                          <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Market Analysis Summary</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span>Total Market (TAM)</span>
                            <span className="font-bold text-primary">{formatCurrency(selectedMarket.tam)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Addressable Market (SAM)</span>
                            <span className="font-bold text-accent">
                              {((selectedMarket.sam / selectedMarket.tam) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Obtainable Market (SOM)</span>
                            <span className="font-bold text-success">
                              {((selectedMarket.som / selectedMarket.tam) * 100).toFixed(1)}%
                            </span>
                          </div>
                          <div className="border-t pt-3">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold">5-Year Revenue Potential</span>
                              <span className="font-bold text-primary text-lg">
                                {formatCurrency(selectedMarket.som * 0.75)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="segments" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="glass border-glass-border/30">
                    <CardHeader>
                      <CardTitle>Market Segments Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsPieChart>
                          <Pie
                            data={selectedMarket.marketSegments}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="size"
                            label={({ segment, size }) => `${segment}: ${formatCurrency(size)}`}
                          >
                            {selectedMarket.marketSegments.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="glass border-glass-border/30">
                    <CardHeader>
                      <CardTitle>Segment Growth Rates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={selectedMarket.marketSegments}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="segment" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="growth" fill="hsl(var(--success))" name="Growth Rate (%)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="competition" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="glass border-glass-border/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="w-5 h-5" />
                        Competitive Landscape
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsPieChart>
                          <Pie
                            data={selectedMarket.competitors}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="marketShare"
                            label={({ name, marketShare }) => `${name}: ${marketShare}%`}
                          >
                            {selectedMarket.competitors.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card className="glass border-glass-border/30">
                    <CardHeader>
                      <CardTitle>Competitor Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedMarket.competitors.map((competitor, index) => (
                          <div key={index} className="flex justify-between items-center p-3 border border-glass-border/30 rounded-lg">
                            <div>
                              <h4 className="font-medium">{competitor.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                ${competitor.revenue}M revenue
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline" className="mb-1">
                                {competitor.marketShare}%
                              </Badge>
                              <div className="text-xs text-muted-foreground">market share</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="geography" className="space-y-6">
                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Geographic Market Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={selectedMarket.geographicBreakdown}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="region" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="size"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary) / 0.3)"
                            name="Market Size ($B)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Regional Breakdown</h3>
                        {selectedMarket.geographicBreakdown.map((region, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="font-medium">{region.region}</span>
                            <div className="text-right">
                              <div className="font-bold">{formatCurrency(region.size)}</div>
                              <div className="text-sm text-success">+{region.growth.toFixed(1)}% CAGR</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trends" className="space-y-6">
                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Market Growth Trends & Forecast
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={selectedMarket.trends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="tam"
                          stroke="hsl(var(--primary))"
                          strokeWidth={3}
                          name="TAM ($B)"
                        />
                        <Line
                          type="monotone"
                          dataKey="sam"
                          stroke="hsl(var(--accent))"
                          strokeWidth={3}
                          name="SAM ($B)"
                        />
                        <Line
                          type="monotone"
                          dataKey="som"
                          stroke="hsl(var(--success))"
                          strokeWidth={3}
                          name="SOM ($B)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scenarios" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="glass border-glass-border/30">
                    <CardHeader>
                      <CardTitle className="text-success flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Optimistic Scenario
                      </CardTitle>
                      <CardDescription>Best case market conditions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>5Y SOM Target:</span>
                          <span className="font-bold text-lg">{formatCurrency(selectedMarket.scenarios.optimistic.som)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Market Share:</span>
                          <span className="font-bold">{selectedMarket.scenarios.optimistic.marketShare}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Confidence Level:</span>
                          <Badge className="bg-success/20 text-success">
                            {selectedMarket.scenarios.optimistic.confidence}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass border-glass-border/30 ring-2 ring-primary">
                    <CardHeader>
                      <CardTitle className="text-primary flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Realistic Scenario
                      </CardTitle>
                      <CardDescription>Most likely outcome (Base Case)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>5Y SOM Target:</span>
                          <span className="font-bold text-lg">{formatCurrency(selectedMarket.scenarios.realistic.som)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Market Share:</span>
                          <span className="font-bold">{selectedMarket.scenarios.realistic.marketShare}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Confidence Level:</span>
                          <Badge className="bg-primary/20 text-primary">
                            {selectedMarket.scenarios.realistic.confidence}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass border-glass-border/30">
                    <CardHeader>
                      <CardTitle className="text-warning flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Conservative Scenario
                      </CardTitle>
                      <CardDescription>Worst case market conditions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>5Y SOM Target:</span>
                          <span className="font-bold text-lg">{formatCurrency(selectedMarket.scenarios.conservative.som)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Market Share:</span>
                          <span className="font-bold">{selectedMarket.scenarios.conservative.marketShare}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Confidence Level:</span>
                          <Badge className="bg-warning/20 text-warning">
                            {selectedMarket.scenarios.conservative.confidence}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="glass border-glass-border/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-success">
                        <Lightbulb className="w-5 h-5" />
                        Key Market Drivers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedMarket.keyDrivers.map((driver, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <ArrowUp className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                            {driver}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="glass border-glass-border/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="w-5 h-5" />
                        Risk Factors
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedMarket.risks.map((risk, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <ArrowDown className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="glass border-glass-border/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-primary">
                        <Award className="w-5 h-5" />
                        Growth Opportunities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedMarket.opportunities.map((opportunity, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            {opportunity}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Panel */}
            <Card className="glass border-glass-border/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Analysis Actions</h3>
                    <p className="text-sm text-muted-foreground">Manage and customize your market analysis</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" onClick={() => handleAction('edit')}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Assumptions
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleAction('clone')}>
                      <Copy className="w-4 h-4 mr-2" />
                      Clone Model
                    </Button>
                    <Button size="sm" onClick={() => handleAction('simulate')}>
                      <Play className="w-4 h-4 mr-2" />
                      Run Simulation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
};

export default MarketSizing;
