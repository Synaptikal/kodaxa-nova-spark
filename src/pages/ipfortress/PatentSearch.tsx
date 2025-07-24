import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/common/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, Filter, Download, Eye, BookOpen, Clock, MapPin, User, 
  TrendingUp, BarChart3, PieChart, Activity, Zap, Shield, Globe
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Patent {
  id: string;
  title: string;
  patentNumber: string;
  inventor: string;
  assignee: string;
  filingDate: string;
  publicationDate: string;
  status: 'granted' | 'pending' | 'expired' | 'abandoned';
  abstract: string;
  classification: string;
  citationCount: number;
  relevanceScore: number;
  legalStatus: string;
  country: string;
}

interface SearchAnalytics {
  totalResults: number;
  avgRelevance: number;
  topAssignees: { name: string; count: number }[];
  statusDistribution: { status: string; count: number; color: string }[];
  filingTrends: { year: string; count: number; grants: number }[];
  citationTrends: { patent: string; citations: number }[];
  geographicDistribution: { country: string; count: number }[];
}

const PatentSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [patents, setPatents] = useState<Patent[]>([]);
  const [analytics, setAnalytics] = useState<SearchAnalytics | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPatent, setSelectedPatent] = useState<Patent | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('relevance');
  const { toast } = useToast();

  // Mock data for demonstration
  const mockPatents: Patent[] = [
    {
      id: '1',
      title: 'Artificial Intelligence-Based Business Intelligence System',
      patentNumber: 'US11234567B2',
      inventor: 'John Smith, Jane Doe',
      assignee: 'TechCorp Industries',
      filingDate: '2022-03-15',
      publicationDate: '2023-09-20',
      status: 'granted',
      abstract: 'A system and method for automated business intelligence using artificial intelligence and machine learning algorithms to analyze enterprise data...',
      classification: 'G06F 16/00',
      citationCount: 45,
      relevanceScore: 95,
      legalStatus: 'Active',
      country: 'US'
    },
    {
      id: '2',
      title: 'Blockchain-Based Supply Chain Management',
      patentNumber: 'US11567890B1',
      inventor: 'Alice Johnson',
      assignee: 'BlockChain Solutions Inc.',
      filingDate: '2021-11-08',
      publicationDate: '2023-05-15',
      status: 'granted',
      abstract: 'A distributed ledger system for tracking and managing supply chain operations with immutable records...',
      classification: 'H04L 9/00',
      citationCount: 38,
      relevanceScore: 87,
      legalStatus: 'Active',
      country: 'US'
    },
    {
      id: '3',
      title: 'Quantum Computing Algorithm for Financial Modeling',
      patentNumber: 'US20230789012A1',
      inventor: 'Robert Chen, Maria Garcia',
      assignee: 'QuantumFinance Corp',
      filingDate: '2023-01-20',
      publicationDate: '2023-10-25',
      status: 'pending',
      abstract: 'Novel quantum algorithms for complex financial modeling and risk assessment in real-time trading systems...',
      classification: 'G06N 10/00',
      citationCount: 12,
      relevanceScore: 92,
      legalStatus: 'Under Review',
      country: 'US'
    }
  ];

  const mockAnalytics: SearchAnalytics = {
    totalResults: 1247,
    avgRelevance: 78.5,
    topAssignees: [
      { name: 'TechCorp Industries', count: 156 },
      { name: 'InnovateAI Ltd', count: 134 },
      { name: 'DataSystems Inc', count: 98 },
      { name: 'QuantumFinance Corp', count: 87 },
      { name: 'BlockChain Solutions', count: 76 }
    ],
    statusDistribution: [
      { status: 'Granted', count: 789, color: '#10B981' },
      { status: 'Pending', count: 234, color: '#F59E0B' },
      { status: 'Expired', count: 156, color: '#6B7280' },
      { status: 'Abandoned', count: 68, color: '#EF4444' }
    ],
    filingTrends: [
      { year: '2019', count: 89, grants: 67 },
      { year: '2020', count: 156, grants: 134 },
      { year: '2021', count: 234, grants: 198 },
      { year: '2022', count: 345, grants: 267 },
      { year: '2023', count: 423, grants: 123 }
    ],
    citationTrends: [
      { patent: 'AI-System', citations: 45 },
      { patent: 'Blockchain-SCM', citations: 38 },
      { patent: 'Quantum-Algo', citations: 12 },
      { patent: 'ML-Finance', citations: 67 },
      { patent: 'IoT-Manufacturing', citations: 34 }
    ],
    geographicDistribution: [
      { country: 'United States', count: 567 },
      { country: 'China', count: 234 },
      { country: 'European Union', count: 189 },
      { country: 'Japan', count: 145 },
      { country: 'South Korea', count: 89 },
      { country: 'Canada', count: 23 }
    ]
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: 'Search Required',
        description: 'Please enter a search term',
        variant: 'destructive'
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setPatents(mockPatents);
      setAnalytics(mockAnalytics);
      setIsSearching(false);
      
      toast({
        title: 'Search Complete',
        description: `Found ${mockPatents.length} patents matching your criteria`
      });
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'granted': return 'bg-success/20 text-success border-success/30';
      case 'pending': return 'bg-warning/20 text-warning border-warning/30';
      case 'expired': return 'bg-muted/20 text-muted-foreground border-muted/30';
      case 'abandoned': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const exportResults = () => {
    toast({
      title: 'Export Started',
      description: 'Patent search results are being exported to CSV'
    });
  };

  const handlePatentClick = (patent: Patent) => {
    setSelectedPatent(patent);
  };

  return (
    <Layout title="Patent Search & Prior Art Analysis">
      <div className="space-y-6">
        {/* Search Header */}
        <Card className="glass border-glass-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-cyber">
              <Search className="w-6 h-6 text-primary" />
              Advanced Patent Search
            </CardTitle>
            <CardDescription>
              Comprehensive patent search with AI-powered relevance scoring and analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter keywords, patent numbers, or inventor names..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="text-base"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="granted">Granted</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="abandoned">Abandoned</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSearch} disabled={isSearching} className="px-8">
                {isSearching ? (
                  <Activity className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Dashboard */}
        {analytics && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Key Metrics */}
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle className="text-lg">Search Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Results</span>
                    <span className="text-2xl font-bold text-primary">{analytics.totalResults.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Avg Relevance</span>
                    <span className="text-2xl font-bold text-success">{analytics.avgRelevance}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Active Patents</span>
                    <span className="text-2xl font-bold text-accent">{analytics.statusDistribution[0].count}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status Distribution Pie Chart */}
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={analytics.statusDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="count"
                      label={({ status, count }) => `${status}: ${count}`}
                    >
                      {analytics.statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Assignees */}
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top Assignees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analytics.topAssignees.map((assignee, index) => (
                    <div key={assignee.name} className="flex justify-between items-center">
                      <span className="text-sm truncate">{assignee.name}</span>
                      <Badge variant="secondary">{assignee.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Trending Charts */}
        {analytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Filing Trends */}
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Filing Trends Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analytics.filingTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stackId="1"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary) / 0.3)"
                      name="Total Filings"
                    />
                    <Area
                      type="monotone"
                      dataKey="grants"
                      stackId="1"
                      stroke="hsl(var(--success))"
                      fill="hsl(var(--success) / 0.3)"
                      name="Granted Patents"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Citation Analysis */}
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Citation Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.citationTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="patent" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="citations"
                      fill="hsl(var(--accent))"
                      name="Citation Count"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search Results */}
        {patents.length > 0 && (
          <Card className="glass border-glass-border/30">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Search Results ({patents.length})
                </CardTitle>
                <CardDescription>
                  Patents matching your search criteria
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Sort by Relevance</SelectItem>
                    <SelectItem value="date">Sort by Date</SelectItem>
                    <SelectItem value="citations">Sort by Citations</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={exportResults}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patents.map((patent) => (
                  <Card
                    key={patent.id}
                    className="glass border-glass-border/30 cursor-pointer hover:border-primary/30 transition-colors"
                    onClick={() => handlePatentClick(patent)}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{patent.title}</h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className={getStatusColor(patent.status)}>
                              {patent.status.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">{patent.patentNumber}</Badge>
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              Relevance: {patent.relevanceScore}%
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground mb-1">Citations</div>
                          <div className="text-2xl font-bold text-accent">{patent.citationCount}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Inventor(s)</div>
                          <div className="text-sm font-medium">{patent.inventor}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Assignee</div>
                          <div className="text-sm font-medium">{patent.assignee}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Filing Date</div>
                          <div className="text-sm font-medium">{patent.filingDate}</div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {patent.abstract.substring(0, 200)}...
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <Badge variant="outline">
                            <MapPin className="w-3 h-3 mr-1" />
                            {patent.country}
                          </Badge>
                          <Badge variant="outline">{patent.classification}</Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Results State */}
        {patents.length === 0 && !isSearching && (
          <Card className="glass border-glass-border/30">
            <CardContent className="p-12 text-center">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Start Your Patent Search</h3>
              <p className="text-muted-foreground mb-6">
                Enter keywords, patent numbers, or inventor names to begin your comprehensive patent analysis
              </p>
              <Button onClick={() => setSearchQuery('artificial intelligence business')}>
                Try Example Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default PatentSearch;
