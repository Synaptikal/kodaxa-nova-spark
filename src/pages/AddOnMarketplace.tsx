import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/common/Layout';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { 
  Bot, 
  BarChart3, 
  Shield, 
  TrendingUp, 
  Server, 
  Headphones,
  ShoppingCart,
  Check,
  Star
} from 'lucide-react';

interface AddOn {
  id: string;
  name: string;
  description: string;
  price_monthly: number;
  category: string;
  features: any;
  active: boolean;
  purchased?: boolean;
}

const categoryIcons = {
  ai: Bot,
  ip: Shield,
  compliance: Shield,
  analytics: BarChart3,
  infrastructure: Server,
  support: Headphones
};

const categoryColors = {
  ai: 'bg-blue-100 text-blue-600',
  ip: 'bg-purple-100 text-purple-600',
  compliance: 'bg-green-100 text-green-600',
  analytics: 'bg-orange-100 text-orange-600',
  infrastructure: 'bg-gray-100 text-gray-600',
  support: 'bg-pink-100 text-pink-600'
};

const AddOnMarketplace = () => {
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [userAddOns, setUserAddOns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { user, session } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadAddOns();
    if (user) {
      loadUserAddOns();
    }
  }, [user]);

  const loadAddOns = async () => {
    try {
      const { data, error } = await supabase
        .from('add_ons')
        .select('*')
        .eq('active', true)
        .order('category, price_monthly');

      if (error) throw error;
      setAddOns(data || []);
    } catch (error) {
      console.error('Error loading add-ons:', error);
      toast({
        title: "Error",
        description: "Failed to load add-ons.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadUserAddOns = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_add_ons')
        .select('add_on_id')
        .eq('user_id', user.id)
        .eq('active', true);

      if (error) throw error;
      setUserAddOns(data?.map(item => item.add_on_id) || []);
    } catch (error) {
      console.error('Error loading user add-ons:', error);
    }
  };

  const handlePurchase = async (addOnId: string, price: number) => {
    if (!session) return;

    setPurchasing(addOnId);
    try {
      // Create Stripe checkout for add-on subscription
      const { data, error } = await supabase.functions.invoke('create-addon-checkout', {
        body: { addOnId, price },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      window.open(data.url, '_blank');
      toast({
        title: "Redirecting to checkout",
        description: "Complete your add-on purchase in the new tab.",
      });
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error", 
        description: "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setPurchasing(null);
    }
  };

  const categories = ['all', ...Array.from(new Set(addOns.map(addon => addon.category)))];
  const filteredAddOns = selectedCategory === 'all' 
    ? addOns 
    : addOns.filter(addon => addon.category === selectedCategory);

  const groupedAddOns = categories.reduce((acc, category) => {
    if (category === 'all') return acc;
    acc[category] = addOns.filter(addon => addon.category === category);
    return acc;
  }, {} as Record<string, AddOn[]>);

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
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Add-on Marketplace
          </h1>
          <p className="text-xl text-muted-foreground">
            Supercharge your empire with specialized tools and capabilities
          </p>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="ai">AI Tools</TabsTrigger>
            <TabsTrigger value="ip">IP Management</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className="space-y-12">
              {Object.entries(groupedAddOns).map(([category, categoryAddOns]) => (
                <div key={category}>
                  <div className="flex items-center mb-6">
                    <div className={`p-2 rounded-lg mr-3 ${categoryColors[category as keyof typeof categoryColors]}`}>
                      {React.createElement(categoryIcons[category as keyof typeof categoryIcons], { className: 'w-5 h-5' })}
                    </div>
                    <h2 className="text-2xl font-bold capitalize">{category} Add-ons</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryAddOns.map((addOn) => (
                      <AddOnCard 
                        key={addOn.id} 
                        addOn={addOn} 
                        isPurchased={userAddOns.includes(addOn.id)}
                        onPurchase={handlePurchase}
                        purchasing={purchasing === addOn.id}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {categories.slice(1).map(category => (
            <TabsContent key={category} value={category} className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedAddOns[category]?.map((addOn) => (
                  <AddOnCard 
                    key={addOn.id} 
                    addOn={addOn} 
                    isPurchased={userAddOns.includes(addOn.id)}
                    onPurchase={handlePurchase}
                    purchasing={purchasing === addOn.id}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

interface AddOnCardProps {
  addOn: AddOn;
  isPurchased: boolean;
  onPurchase: (id: string, price: number) => void;
  purchasing: boolean;
}

const AddOnCard = ({ addOn, isPurchased, onPurchase, purchasing }: AddOnCardProps) => {
  const Icon = categoryIcons[addOn.category as keyof typeof categoryIcons];
  const features = Object.entries(addOn.features || {});

  return (
    <Card className={`relative transition-all duration-300 hover:shadow-lg ${isPurchased ? 'ring-2 ring-green-500' : 'hover:border-primary/50'}`}>
      {isPurchased && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-2 text-sm font-semibold">
          ✅ Active
        </div>
      )}

      <CardHeader className={isPurchased ? 'pt-12' : 'pt-6'}>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${categoryColors[addOn.category as keyof typeof categoryColors]}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg">{addOn.name}</CardTitle>
              <Badge variant="secondary" className="mt-1">
                {addOn.category}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${addOn.price_monthly}</div>
            <div className="text-sm text-muted-foreground">/month</div>
          </div>
        </div>
        <CardDescription className="mt-4">{addOn.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2 flex items-center">
            <Star className="w-4 h-4 mr-2" />
            Features
          </h4>
          <ul className="space-y-1">
            {features.map(([key, value]) => (
              <li key={key} className="flex items-center text-sm">
                <Check className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                <span>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button
          className="w-full"
          onClick={() => onPurchase(addOn.id, addOn.price_monthly)}
          disabled={purchasing || isPurchased}
        >
          {purchasing ? (
            <LoadingSpinner size="sm" />
          ) : isPurchased ? (
            "Purchased"
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Subscription
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddOnMarketplace;