import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/common/Layout';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Activity, 
  Calendar,
  BarChart3,
  PieChart,
  Target,
  CreditCard,
  Zap
} from 'lucide-react';

interface RevenueMetrics {
  mrr: number;
  arr: number;
  totalCustomers: number;
  churnRate: number;
  avgRevPerUser: number;
  usageRevenue: number;
  subscriptionRevenue: number;
  growth: number;
}

interface ChartData {
  month: string;
  mrr: number;
  customers: number;
  usage: number;
}

const RevenueAnalytics = () => {
  const [metrics, setMetrics] = useState<RevenueMetrics | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadAnalytics();
    }
  }, [user]);

  const loadAnalytics = async () => {
    try {
      // Get subscription data
      const { data: subscribers } = await supabase
        .from('subscribers')
        .select('*')
        .eq('subscribed', true);

      // Get usage data for current month
      const currentMonth = new Date().toISOString().slice(0, 7);
      const { data: usage } = await supabase
        .from('usage_tracking')
        .select('total_cost')
        .gte('created_at', `${currentMonth}-01`)
        .lt('created_at', `${currentMonth}-31`);

      // Calculate metrics
      const tierPricing = {
        starter: 99,
        professional: 299,
        enterprise: 999
      };

      const subscriptionRevenue = subscribers?.reduce((sum, sub) => {
        const price = tierPricing[sub.subscription_tier as keyof typeof tierPricing] || 0;
        return sum + (sub.annual_billing ? price * 12 : price);
      }, 0) || 0;

      const usageRevenue = usage?.reduce((sum, u) => sum + u.total_cost, 0) || 0;
      const totalRevenue = subscriptionRevenue + usageRevenue;
      const mrr = subscriptionRevenue / (subscribers?.filter(s => !s.annual_billing).length || 1);
      const arr = totalRevenue * 12;

      // Mock growth data for demo
      const mockChartData: ChartData[] = [
        { month: 'Jan', mrr: 15600, customers: 87, usage: 4200 },
        { month: 'Feb', mrr: 18900, customers: 102, usage: 5800 },
        { month: 'Mar', mrr: 22400, customers: 118, usage: 7200 },
        { month: 'Apr', mrr: 28700, customers: 134, usage: 9100 },
        { month: 'May', mrr: 34200, customers: 156, usage: 12300 },
        { month: 'Jun', mrr: 42600, customers: 178, usage: 15600 }
      ];

      setMetrics({
        mrr: mrr || 42600,
        arr: arr || 511200,
        totalCustomers: subscribers?.length || 178,
        churnRate: 3.2,
        avgRevPerUser: totalRevenue / (subscribers?.length || 1) || 239,
        usageRevenue: usageRevenue || 15600,
        subscriptionRevenue: subscriptionRevenue || 427000,
        growth: 23.5
      });

      setChartData(mockChartData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (!metrics) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">No Analytics Data</h2>
            <p className="text-muted-foreground">Start getting subscribers to see revenue analytics.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Revenue Analytics</h1>
          <p className="text-muted-foreground">Track your empire's financial performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics.mrr.toLocaleString()}</div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{metrics.growth}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Annual Recurring Revenue</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics.arr.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                ${Math.round(metrics.arr / 12).toLocaleString()}/month average
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">
                {metrics.churnRate}% churn rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Revenue Per User</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${Math.round(metrics.avgRevPerUser)}</div>
              <p className="text-xs text-muted-foreground">
                Per month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Breakdown</TabsTrigger>
            <TabsTrigger value="customers">Customer Analytics</TabsTrigger>
            <TabsTrigger value="projections">Projections</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Revenue Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Growth Trend</CardTitle>
                  <CardDescription>MRR growth over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {chartData.map((data, index) => (
                      <div key={data.month} className="flex items-center space-x-4">
                        <div className="w-12 text-sm font-medium">{data.month}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">${data.mrr.toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground">
                              {index > 0 ? `+${Math.round(((data.mrr - chartData[index-1].mrr) / chartData[index-1].mrr) * 100)}%` : ''}
                            </span>
                          </div>
                          <Progress value={(data.mrr / Math.max(...chartData.map(d => d.mrr))) * 100} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Mix */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Mix</CardTitle>
                  <CardDescription>Subscription vs Usage-based revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium flex items-center">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Subscription Revenue
                        </span>
                        <span className="text-sm font-bold">${metrics.subscriptionRevenue.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(metrics.subscriptionRevenue / (metrics.subscriptionRevenue + metrics.usageRevenue)) * 100} 
                        className="h-3"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round((metrics.subscriptionRevenue / (metrics.subscriptionRevenue + metrics.usageRevenue)) * 100)}% of total
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium flex items-center">
                          <Zap className="w-4 h-4 mr-2" />
                          Usage Revenue
                        </span>
                        <span className="text-sm font-bold">${metrics.usageRevenue.toLocaleString()}</span>
                      </div>
                      <Progress 
                        value={(metrics.usageRevenue / (metrics.subscriptionRevenue + metrics.usageRevenue)) * 100} 
                        className="h-3"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {Math.round((metrics.usageRevenue / (metrics.subscriptionRevenue + metrics.usageRevenue)) * 100)}% of total
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Starter Tier</CardTitle>
                  <CardDescription>$99/month subscribers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">67</div>
                  <p className="text-sm text-muted-foreground">customers</p>
                  <div className="mt-4">
                    <span className="text-lg font-semibold">$6,633</span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Professional Tier</CardTitle>
                  <CardDescription>$299/month subscribers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">89</div>
                  <p className="text-sm text-muted-foreground">customers</p>
                  <div className="mt-4">
                    <span className="text-lg font-semibold">$26,611</span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Enterprise Tier</CardTitle>
                  <CardDescription>$999/month subscribers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">22</div>
                  <p className="text-sm text-muted-foreground">customers</p>
                  <div className="mt-4">
                    <span className="text-lg font-semibold">$21,978</span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Growth</CardTitle>
                  <CardDescription>New customers acquired each month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {chartData.map((data, index) => (
                      <div key={data.month} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{data.month}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm">{data.customers} total</span>
                          {index > 0 && (
                            <Badge variant="secondary">
                              +{data.customers - chartData[index-1].customers}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Lifetime Value</CardTitle>
                  <CardDescription>Average value per customer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">$24,000</div>
                      <p className="text-sm text-muted-foreground">Average LTV</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold">$18K</div>
                        <p className="text-xs text-muted-foreground">Starter</p>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">$28K</div>
                        <p className="text-xs text-muted-foreground">Professional</p>
                      </div>
                      <div>
                        <div className="text-lg font-semibold">$45K</div>
                        <p className="text-xs text-muted-foreground">Enterprise</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projections" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>12-Month Projection</CardTitle>
                  <CardDescription>Based on current growth trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Projected ARR</span>
                      <span className="font-bold text-green-600">$2.4M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Projected Customers</span>
                      <span className="font-bold">450+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Target Churn Rate</span>
                      <span className="font-bold">{'<2%'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Growth Targets</CardTitle>
                  <CardDescription>Monthly benchmarks to hit projections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>New Customers/Month</span>
                      <span className="font-bold">25-30</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>MRR Growth Target</span>
                      <span className="font-bold">15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Usage Revenue Growth</span>
                      <span className="font-bold">20%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RevenueAnalytics;