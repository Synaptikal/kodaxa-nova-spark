import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/common/Layout';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { 
  Check, 
  Zap, 
  Crown, 
  Rocket,
  Users,
  Shield,
  BarChart3,
  Headphones,
  Infinity,
  ArrowRight
} from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  limits: {
    aiProcessing: number | string;
    patentSearches: number | string;
    complianceAssessments: number | string;
    businessAnalyses: number | string;
    storage: number | string;
    apiCalls: number | string;
    teamMembers: number | string;
  };
  popular?: boolean;
  icon: React.ComponentType<any>;
}

const plans: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small teams getting started',
    monthlyPrice: 99,
    yearlyPrice: 999,
    icon: Zap,
    limits: {
      aiProcessing: '1,000',
      patentSearches: '50',
      complianceAssessments: '5',
      businessAnalyses: '10',
      storage: '100 GB',
      apiCalls: '10,000',
      teamMembers: '5'
    },
    features: [
      'Basic Analytics Dashboard',
      'Email Support',
      'Standard Integrations',
      'Monthly Reports',
      'Basic AI Workspace'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Most popular for growing businesses',
    monthlyPrice: 299,
    yearlyPrice: 2999,
    popular: true,
    icon: Crown,
    limits: {
      aiProcessing: '5,000',
      patentSearches: '200',
      complianceAssessments: '25',
      businessAnalyses: '50',
      storage: '500 GB',
      apiCalls: '50,000',
      teamMembers: '25'
    },
    features: [
      'Advanced Analytics & Insights',
      'Priority Support',
      'Premium Integrations',
      'Custom Reports',
      'Advanced AI Agents',
      'Collaboration Tools',
      'Real-time Notifications'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Unlimited power for large organizations',
    monthlyPrice: 999,
    yearlyPrice: 9999,
    icon: Rocket,
    limits: {
      aiProcessing: 'Unlimited',
      patentSearches: 'Unlimited',
      complianceAssessments: 'Unlimited',
      businessAnalyses: 'Unlimited',
      storage: 'Unlimited',
      apiCalls: 'Unlimited',
      teamMembers: 'Unlimited'
    },
    features: [
      'Everything in Professional',
      'Dedicated Success Manager',
      'Custom Integrations',
      'White-label Options',
      'SLA Guarantee',
      'Custom AI Training',
      'On-premises Deployment',
      'Advanced Security Features'
    ]
  }
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);
  const { user, session } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      checkSubscription();
    }
  }, [user]);

  const checkSubscription = async () => {
    if (!session) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      setCurrentSubscription(data);
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setLoading(planId);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          tier: planId,
          billing: isYearly ? 'yearly' : 'monthly'
        },
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (error) throw error;

      // Open Stripe checkout in new tab
      window.open(data.url, '_blank');
      
      toast({
        title: "Redirecting to checkout",
        description: "Complete your subscription in the new tab.",
      });
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const calculateSavings = (monthlyPrice: number, yearlyPrice: number) => {
    const yearlyCostIfMonthly = monthlyPrice * 12;
    const savings = yearlyCostIfMonthly - yearlyPrice;
    const percentage = Math.round((savings / yearlyCostIfMonthly) * 100);
    return { savings, percentage };
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Choose Your Empire Building Plan
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Scale your business with the power you need to dominate your market
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${!isYearly ? 'font-semibold' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-sm ${isYearly ? 'font-semibold' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            <Badge variant="secondary" className="ml-2">
              Save 17%
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const { savings, percentage } = calculateSavings(plan.monthlyPrice, plan.yearlyPrice);
            const isCurrentPlan = currentSubscription?.subscription_tier === plan.id;
            
            return (
              <Card 
                key={plan.id} 
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-2 border-primary scale-105 shadow-lg' 
                    : 'hover:border-primary/50'
                } ${isCurrentPlan ? 'ring-2 ring-green-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-center py-2 text-sm font-semibold">
                    🔥 Most Popular
                  </div>
                )}
                
                {isCurrentPlan && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-2 text-sm font-semibold">
                    ✅ Your Current Plan
                  </div>
                )}

                <CardHeader className={plan.popular || isCurrentPlan ? 'pt-12' : 'pt-6'}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-2 rounded-lg ${
                      plan.id === 'starter' ? 'bg-blue-100 text-blue-600' :
                      plan.id === 'professional' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-bold">${price}</span>
                      <span className="text-muted-foreground">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    </div>
                    
                    {isYearly && (
                      <div className="text-sm text-green-600 font-semibold">
                        Save ${savings} ({percentage}% off)
                      </div>
                    )}
                    
                    {!isYearly && (
                      <div className="text-sm text-muted-foreground">
                        Or ${plan.yearlyPrice}/year (save 17%)
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Usage Limits */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Usage Limits
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>AI Processing: <strong>{plan.limits.aiProcessing}</strong></div>
                      <div>Patent Searches: <strong>{plan.limits.patentSearches}</strong></div>
                      <div>Compliance: <strong>{plan.limits.complianceAssessments}</strong></div>
                      <div>Business Analysis: <strong>{plan.limits.businessAnalyses}</strong></div>
                      <div>Storage: <strong>{plan.limits.storage}</strong></div>
                      <div>API Calls: <strong>{plan.limits.apiCalls}</strong></div>
                    </div>
                  </div>

                  <Separator />

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Features Included
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading === plan.id || isCurrentPlan}
                  >
                    {loading === plan.id ? (
                      <LoadingSpinner size="sm" />
                    ) : isCurrentPlan ? (
                      "Current Plan"
                    ) : (
                      <>
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pay-per-use section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-br from-background to-primary/5">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Pay-per-Use Pricing</CardTitle>
              <CardDescription>
                Only pay for what you use beyond your plan limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">$0.02</div>
                  <div className="text-sm text-muted-foreground">per AI operation</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">$1.50</div>
                  <div className="text-sm text-muted-foreground">per patent search</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">$25</div>
                  <div className="text-sm text-muted-foreground">per compliance assessment</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-4">Need a Custom Solution?</h3>
              <p className="text-muted-foreground mb-6">
                Enterprise deployments, white-label solutions, and custom AI training available.
              </p>
              <Button size="lg" variant="outline">
                <Headphones className="w-5 h-5 mr-2" />
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;