import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/common/Layout';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { 
  CheckCircle, 
  Settings, 
  CreditCard, 
  BarChart3, 
  Calendar,
  Zap,
  Crown,
  Rocket,
  RefreshCw,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_status: string;
  subscription_end: string | null;
  annual_billing: boolean;
}

interface UsageData {
  service_type: string;
  current_usage: number;
  limit: number;
  cost_this_month: number;
}

const Subscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [usage, setUsage] = useState<UsageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (user) {
      checkSubscription();
      loadUsageData();
    }
  }, [user]);

  useEffect(() => {
    // Check for successful subscription from URL params
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      toast({
        title: "Subscription successful!",
        description: "Welcome to your new plan. It may take a few moments to activate.",
      });
      // Refresh subscription status
      setTimeout(() => {
        checkSubscription();
      }, 2000);
    }
  }, [searchParams]);

  const checkSubscription = async () => {
    if (!session) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      setSubscription(data);
    } catch (error) {
      console.error('Error checking subscription:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadUsageData = async () => {
    if (!user) return;

    try {
      // Get current month usage
      const currentMonth = new Date().toISOString().slice(0, 7);
      const { data: usageData, error } = await supabase
        .from('usage_tracking')
        .select('service_type, quantity, total_cost')
        .eq('user_id', user.id)
        .gte('created_at', `${currentMonth}-01`)
        .lt('created_at', `${currentMonth}-31`);

      if (error) throw error;

      // Aggregate usage by service type
      const aggregated = usageData.reduce((acc, record) => {
        const existing = acc.find(item => item.service_type === record.service_type);
        if (existing) {
          existing.current_usage += record.quantity;
          existing.cost_this_month += record.total_cost;
        } else {
          acc.push({
            service_type: record.service_type,
            current_usage: record.quantity,
            limit: 0, // Will be filled from subscription limits
            cost_this_month: record.total_cost
          });
        }
        return acc;
      }, [] as UsageData[]);

      // Get subscription limits
      if (subscription?.subscription_tier) {
        const { data: limits } = await supabase
          .from('subscription_limits')
          .select('*')
          .eq('tier', subscription.subscription_tier)
          .single();

        if (limits) {
          aggregated.forEach(item => {
            const limitField = `${item.service_type}_limit`;
            item.limit = limits[limitField] || 0;
          });
        }
      }

      setUsage(aggregated);
    } catch (error) {
      console.error('Error loading usage:', error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await checkSubscription();
    await loadUsageData();
    setRefreshing(false);
    toast({
      title: "Refreshed",
      description: "Subscription and usage data updated.",
    });
  };

  const openCustomerPortal = async () => {
    if (!session) return;

    setPortalLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: "Failed to open customer portal.",
        variant: "destructive",
      });
    } finally {
      setPortalLoading(false);
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'starter': return Zap;
      case 'professional': return Crown;
      case 'enterprise': return Rocket;
      default: return Settings;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'starter': return 'text-blue-600 bg-blue-100';
      case 'professional': return 'text-purple-600 bg-purple-100';
      case 'enterprise': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatServiceType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getUsagePercentage = (current: number, limit: number) => {
    if (limit === -1) return 0; // Unlimited
    return Math.min((current / limit) * 100, 100);
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Subscription Management</h1>
            <p className="text-muted-foreground">
              Manage your plan, view usage, and track billing
            </p>
          </div>
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Plan */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Current Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                {subscription?.subscribed ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {subscription.subscription_tier && (
                          <>
                            <div className={`p-2 rounded-lg ${getTierColor(subscription.subscription_tier)}`}>
                              {React.createElement(getTierIcon(subscription.subscription_tier), { className: 'w-5 h-5' })}
                            </div>
                            <div>
                              <h3 className="font-semibold capitalize">
                                {subscription.subscription_tier} Plan
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {subscription.annual_billing ? 'Annual billing' : 'Monthly billing'}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                      <Badge 
                        variant={subscription.subscription_status === 'active' ? 'default' : 'secondary'}
                      >
                        {subscription.subscription_status}
                      </Badge>
                    </div>

                    {subscription.subscription_end && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Renews on {new Date(subscription.subscription_end).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    <Separator />

                    <div className="flex space-x-3">
                      <Button 
                        onClick={openCustomerPortal}
                        disabled={portalLoading}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        {portalLoading ? 'Opening...' : 'Manage Billing'}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" onClick={() => window.open('/pricing', '_blank')}>
                        View All Plans
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No Active Subscription</h3>
                    <p className="text-muted-foreground mb-4">
                      Subscribe to unlock the full power of the platform
                    </p>
                    <Button onClick={() => window.open('/pricing', '_blank')}>
                      View Plans
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Usage Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Usage This Month
                </CardTitle>
                <CardDescription>
                  Track your usage across all services
                </CardDescription>
              </CardHeader>
              <CardContent>
                {usage.length > 0 ? (
                  <div className="space-y-4">
                    {usage.map((item) => {
                      const percentage = getUsagePercentage(item.current_usage, item.limit);
                      const isUnlimited = item.limit === -1;
                      
                      return (
                        <div key={item.service_type} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">
                              {formatServiceType(item.service_type)}
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-muted-foreground">
                                {item.current_usage.toLocaleString()} 
                                {!isUnlimited && ` / ${item.limit.toLocaleString()}`}
                                {isUnlimited && ' (Unlimited)'}
                              </span>
                              {item.cost_this_month > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  ${item.cost_this_month.toFixed(2)}
                                </Badge>
                              )}
                            </div>
                          </div>
                          {!isUnlimited && (
                            <Progress 
                              value={percentage} 
                              className={`h-2 ${percentage > 80 ? 'text-red-500' : percentage > 60 ? 'text-yellow-500' : 'text-green-500'}`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No usage data for this month yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => window.open('/pricing', '_blank')}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade Plan
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={openCustomerPortal}
                  disabled={!subscription?.subscribed || portalLoading}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Billing Portal
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => window.open('/add-ons', '_blank')}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Browse Add-ons
                </Button>
              </CardContent>
            </Card>

            {/* Billing Summary */}
            {subscription?.subscribed && (
              <Card>
                <CardHeader>
                  <CardTitle>Billing Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Base Plan</span>
                      <span className="font-semibold">
                        {subscription.subscription_tier === 'starter' && (subscription.annual_billing ? '$999/year' : '$99/month')}
                        {subscription.subscription_tier === 'professional' && (subscription.annual_billing ? '$2,999/year' : '$299/month')}
                        {subscription.subscription_tier === 'enterprise' && (subscription.annual_billing ? '$9,999/year' : '$999/month')}
                      </span>
                    </div>
                    
                    {usage.some(item => item.cost_this_month > 0) && (
                      <>
                        <Separator />
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Usage Charges</div>
                          {usage.filter(item => item.cost_this_month > 0).map(item => (
                            <div key={item.service_type} className="flex justify-between text-sm text-muted-foreground">
                              <span>{formatServiceType(item.service_type)}</span>
                              <span>${item.cost_this_month.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Subscription;