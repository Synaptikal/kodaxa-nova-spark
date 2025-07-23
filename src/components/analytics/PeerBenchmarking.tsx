import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { 
  TrendingUp, Target, Users, Award, BarChart3, 
  Filter, Download, RefreshCw, ArrowUp, ArrowDown
} from 'lucide-react';

interface BenchmarkData {
  metric: string;
  yourValue: number;
  peerAverage: number;
  topPerformer: number;
  unit: string;
  percentile: number;
  industry: string;
}

interface PeerGroup {
  id: string;
  name: string;
  criteria: string;
  memberCount: number;
  averageRevenue: string;
}

const mockBenchmarkData: BenchmarkData[] = [
  {
    metric: 'Customer Acquisition Cost',
    yourValue: 2400,
    peerAverage: 3200,
    topPerformer: 1800,
    unit: '$',
    percentile: 75,
    industry: 'SaaS'
  },
  {
    metric: 'Monthly Churn Rate',
    yourValue: 2.1,
    peerAverage: 3.5,
    topPerformer: 1.2,
    unit: '%',
    percentile: 80,
    industry: 'SaaS'
  },
  {
    metric: 'Customer Lifetime Value',
    yourValue: 24000,
    peerAverage: 18500,
    topPerformer: 35000,
    unit: '$',
    percentile: 85,
    industry: 'SaaS'
  },
  {
    metric: 'Monthly Recurring Revenue',
    yourValue: 67000,
    peerAverage: 45000,
    topPerformer: 120000,
    unit: '$',
    percentile: 90,
    industry: 'SaaS'
  },
  {
    metric: 'Time to Value',
    yourValue: 21,
    peerAverage: 35,
    topPerformer: 14,
    unit: 'days',
    percentile: 70,
    industry: 'SaaS'
  },
  {
    metric: 'Net Promoter Score',
    yourValue: 68,
    peerAverage: 45,
    topPerformer: 82,
    unit: '',
    percentile: 95,
    industry: 'SaaS'
  }
];

const peerGroups: PeerGroup[] = [
  {
    id: 'saas-mid-market',
    name: 'Mid-Market SaaS',
    criteria: 'SaaS companies with $1M-$10M ARR',
    memberCount: 47,
    averageRevenue: '$4.2M ARR'
  },
  {
    id: 'ai-startups',
    name: 'AI/ML Startups',
    criteria: 'AI-focused companies, Series A-B',
    memberCount: 23,
    averageRevenue: '$2.8M ARR'
  },
  {
    id: 'b2b-analytics',
    name: 'B2B Analytics',
    criteria: 'Business analytics platforms',
    memberCount: 31,
    averageRevenue: '$5.1M ARR'
  }
];

const trendData = [
  { month: 'Jan', cac: 2800, ltv: 22000, churn: 2.8 },
  { month: 'Feb', cac: 2600, ltv: 23000, churn: 2.5 },
  { month: 'Mar', cac: 2500, ltv: 23500, churn: 2.3 },
  { month: 'Apr', cac: 2400, ltv: 24000, churn: 2.1 },
  { month: 'May', cac: 2300, ltv: 24200, churn: 2.0 },
  { month: 'Jun', cac: 2400, ltv: 24000, churn: 2.1 }
];

const radarData = [
  { metric: 'Revenue Growth', value: 85, fullMark: 100 },
  { metric: 'Customer Retention', value: 80, fullMark: 100 },
  { metric: 'Market Share', value: 60, fullMark: 100 },
  { metric: 'Product Innovation', value: 75, fullMark: 100 },
  { metric: 'Customer Satisfaction', value: 95, fullMark: 100 },
  { metric: 'Operational Efficiency', value: 70, fullMark: 100 }
];

export const PeerBenchmarking: React.FC = () => {
  const [selectedPeerGroup, setSelectedPeerGroup] = useState<string>('saas-mid-market');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('6m');
  const [refreshing, setRefreshing] = useState(false);

  const refreshData = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const getPercentileColor = (percentile: number) => {
    if (percentile >= 90) return 'text-green-600 bg-green-50';
    if (percentile >= 75) return 'text-blue-600 bg-blue-50';
    if (percentile >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getPerformanceIcon = (yourValue: number, peerAverage: number, metric: string) => {
    const isRevenueMetric = metric.includes('Revenue') || metric.includes('Value');
    const isGoodHigher = isRevenueMetric || metric.includes('Score');
    const isGoodLower = metric.includes('Cost') || metric.includes('Churn') || metric.includes('Time');
    
    let isPerformingBetter = false;
    if (isGoodHigher) {
      isPerformingBetter = yourValue > peerAverage;
    } else if (isGoodLower) {
      isPerformingBetter = yourValue < peerAverage;
    }

    return isPerformingBetter ? (
      <ArrowUp className="w-4 h-4 text-green-500" />
    ) : (
      <ArrowDown className="w-4 h-4 text-red-500" />
    );
  };

  const exportData = () => {
    // Implementation for exporting benchmark data
    console.log('Exporting benchmark data...');
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Peer Benchmarking</h2>
          <p className="text-muted-foreground">Compare your performance against industry peers</p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={refreshData} 
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportData}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>Peer Group:</Label>
          <Select value={selectedPeerGroup} onValueChange={setSelectedPeerGroup}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {peerGroups.map(group => (
                <SelectItem key={group.id} value={group.id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label>Timeframe:</Label>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Peer Group Info */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{peerGroups.find(g => g.id === selectedPeerGroup)?.name}</h3>
            <p className="text-sm text-muted-foreground">
              {peerGroups.find(g => g.id === selectedPeerGroup)?.criteria}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Members</span>
                <p className="font-semibold">{peerGroups.find(g => g.id === selectedPeerGroup)?.memberCount}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Avg Revenue</span>
                <p className="font-semibold">{peerGroups.find(g => g.id === selectedPeerGroup)?.averageRevenue}</p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="radar">Competitive Radar</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        {/* Key Metrics */}
        <TabsContent value="metrics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockBenchmarkData.map((data, index) => (
              <GlassCard key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{data.metric}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      {getPerformanceIcon(data.yourValue, data.peerAverage, data.metric)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPercentileColor(data.percentile)}`}>
                        {data.percentile}th percentile
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Your Performance */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Your Performance</span>
                      <span className="text-lg font-bold text-primary">
                        {data.unit}{data.yourValue.toLocaleString()}{data.unit === '%' ? '' : data.unit === '' ? '' : ''}
                      </span>
                    </div>
                    <Progress value={data.percentile} className="h-2" />
                  </div>

                  {/* Comparisons */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Peer Average</span>
                      <p className="font-semibold">
                        {data.unit}{data.peerAverage.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Top Performer</span>
                      <p className="font-semibold text-success">
                        {data.unit}{data.topPerformer.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Performance vs Peers */}
                  <div className="pt-2 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">vs Peer Average</span>
                      <span className={`text-xs font-medium ${
                        data.yourValue > data.peerAverage ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {data.yourValue > data.peerAverage ? '+' : ''}
                        {(((data.yourValue - data.peerAverage) / data.peerAverage) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        {/* Performance Trends */}
        <TabsContent value="trends">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Customer Acquisition Cost Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cac" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="Your CAC"
                  />
                </LineChart>
              </ResponsiveContainer>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Customer Lifetime Value Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ltv" 
                    stroke="hsl(var(--success))" 
                    strokeWidth={3}
                    name="Your LTV"
                  />
                </LineChart>
              </ResponsiveContainer>
            </GlassCard>

            <GlassCard className="p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Percentile Rankings Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockBenchmarkData.slice(0, 4)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="percentile" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>
          </div>
        </TabsContent>

        {/* Competitive Radar */}
        <TabsContent value="radar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Competitive Position</h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Radar 
                    name="Your Company" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary) / 0.3)"
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Competitive Strengths & Gaps</h3>
              <div className="space-y-4">
                {radarData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.metric}</span>
                      <span className="text-sm font-bold">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Opportunity for improvement</span>
                      <span>{100 - item.value}% gap to leader</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </TabsContent>

        {/* AI Insights */}
        <TabsContent value="insights">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Key Strengths</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Exceptional Customer Satisfaction</p>
                  <p className="text-xs text-green-600">95th percentile NPS score indicates strong product-market fit</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Strong Revenue Growth</p>
                  <p className="text-xs text-blue-600">MRR growth outpacing 90% of peers in your segment</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-800">Efficient Customer Acquisition</p>
                  <p className="text-xs text-purple-600">CAC is 25% below peer average while maintaining quality</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-warning" />
                <h3 className="text-lg font-semibold">Growth Opportunities</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">Reduce Time to Value</p>
                  <p className="text-xs text-yellow-600">Current 21 days vs. top performer's 14 days - optimize onboarding</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm font-medium text-orange-800">Improve Market Share</p>
                  <p className="text-xs text-orange-600">60th percentile suggests room for expansion in target segments</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-sm font-medium text-red-800">Enhance Operational Efficiency</p>
                  <p className="text-xs text-red-600">70th percentile indicates potential for cost optimization</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-success" />
                <h3 className="text-lg font-semibold">AI-Powered Recommendations</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Short-term (30 days)</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Implement automated onboarding flows</li>
                    <li>• A/B test pricing strategy with high-value segments</li>
                    <li>• Launch customer success program for enterprise accounts</li>
                  </ul>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Long-term (90 days)</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Develop partnership strategy for market expansion</li>
                    <li>• Invest in product features for operational efficiency</li>
                    <li>• Create tiered support model to improve retention</li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};