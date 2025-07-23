import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/common/Layout';
import { 
  Building2, 
  Calculator, 
  FileText, 
  TrendingUp, 
  Users, 
  DollarSign,
  Download,
  Send,
  Target,
  Clock,
  CheckCircle
} from 'lucide-react';

interface EnterpriseQuote {
  id?: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  company_size: number;
  use_cases: string;
  estimated_value: number;
  implementation_timeline: string;
  custom_requirements: string;
  quote_total: number;
  created_at?: string;
  status?: string;
}

const EnterpriseSales = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [quotes, setQuotes] = useState<EnterpriseQuote[]>([]);
  const [currentQuote, setCurrentQuote] = useState<EnterpriseQuote>({
    company_name: '',
    contact_name: '',
    contact_email: '',
    company_size: 100,
    use_cases: '',
    estimated_value: 0,
    implementation_timeline: '3-6 months',
    custom_requirements: '',
    quote_total: 0
  });
  const [roiResults, setRoiResults] = useState<any>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadQuotes();
    }
  }, [user]);

  useEffect(() => {
    calculateQuote();
  }, [currentQuote.company_size, currentQuote.use_cases]);

  const loadQuotes = async () => {
    try {
      // TODO: Enable once types are updated
      // const { data, error } = await supabase
      //   .from('enterprise_quotes')
      //   .select('*')
      //   .order('created_at', { ascending: false });

      // if (error) throw error;
      // setQuotes(data || []);
      console.log('Loading quotes - database integration pending');
    } catch (error) {
      console.error('Error loading quotes:', error);
    }
  };

  const calculateQuote = () => {
    const basePrice = 799; // Per user per year
    const { company_size } = currentQuote;
    
    // Volume discounts
    let discount = 0;
    if (company_size >= 1000) discount = 0.25;
    else if (company_size >= 500) discount = 0.20;
    else if (company_size >= 250) discount = 0.15;
    else if (company_size >= 100) discount = 0.10;

    const subtotal = basePrice * company_size;
    const discountAmount = subtotal * discount;
    const total = subtotal - discountAmount;

    // Implementation and customization fees
    let implementationFee = 0;
    if (company_size >= 1000) implementationFee = 100000;
    else if (company_size >= 500) implementationFee = 75000;
    else if (company_size >= 250) implementationFee = 50000;
    else implementationFee = 25000;

    const finalTotal = total + implementationFee;

    setCurrentQuote(prev => ({
      ...prev,
      quote_total: finalTotal,
      estimated_value: finalTotal
    }));

    // Calculate ROI
    const monthlySavingsPerUser = 2400; // $2,400 saved per user per month
    const annualSavings = monthlySavingsPerUser * company_size * 12;
    const paybackPeriod = finalTotal / (annualSavings / 12);
    const threeYearROI = ((annualSavings * 3 - finalTotal) / finalTotal) * 100;

    setRoiResults({
      annualSavings,
      paybackPeriod,
      threeYearROI,
      costPerUser: Math.round(finalTotal / company_size),
      discount: discount * 100,
      implementationFee
    });
  };

  const saveQuote = async () => {
    try {
      // TODO: Enable once types are updated
      // const { data, error } = await supabase
      //   .from('enterprise_quotes')
      //   .insert([{
      //     ...currentQuote,
      //     status: 'draft'
      //   }])
      //   .select()
      //   .single();

      // if (error) throw error;

      // setQuotes(prev => [data, ...prev]);
      
      // For now, just add to local state
      const newQuote = {
        ...currentQuote,
        id: Date.now().toString(),
        status: 'draft',
        created_at: new Date().toISOString()
      };
      setQuotes(prev => [newQuote, ...prev]);
      
      toast({
        title: "Quote saved",
        description: "Enterprise quote has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving quote:', error);
      toast({
        title: "Error",
        description: "Failed to save quote.",
        variant: "destructive",
      });
    }
  };

  const sendQuote = async () => {
    await saveQuote();
    // In real implementation, would integrate with email service
    toast({
      title: "Quote sent",
      description: `Quote sent to ${currentQuote.contact_email}`,
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Enterprise Sales</h1>
          <p className="text-muted-foreground">
            Generate custom quotes and ROI calculations for enterprise prospects
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calculator">ROI Calculator</TabsTrigger>
            <TabsTrigger value="quote">Quote Builder</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="pipeline">Sales Pipeline</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calculator Input */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    ROI Calculator
                  </CardTitle>
                  <CardDescription>
                    Calculate value proposition for enterprise prospects
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="company-size">Company Size (Users)</Label>
                    <Input
                      id="company-size"
                      type="number"
                      value={currentQuote.company_size}
                      onChange={(e) => setCurrentQuote(prev => ({
                        ...prev,
                        company_size: parseInt(e.target.value) || 100
                      }))}
                      min="50"
                      max="10000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="use-cases">Primary Use Cases</Label>
                    <Textarea
                      id="use-cases"
                      value={currentQuote.use_cases}
                      onChange={(e) => setCurrentQuote(prev => ({
                        ...prev,
                        use_cases: e.target.value
                      }))}
                      placeholder="e.g., Patent analysis, Market research, Compliance automation..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="timeline">Implementation Timeline</Label>
                    <Select 
                      value={currentQuote.implementation_timeline}
                      onValueChange={(value) => setCurrentQuote(prev => ({
                        ...prev,
                        implementation_timeline: value
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-3 months">1-3 months</SelectItem>
                        <SelectItem value="3-6 months">3-6 months</SelectItem>
                        <SelectItem value="6-12 months">6-12 months</SelectItem>
                        <SelectItem value="12+ months">12+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* ROI Results */}
              {roiResults && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      ROI Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          ${roiResults.annualSavings.toLocaleString()}
                        </div>
                        <p className="text-sm text-muted-foreground">Annual Savings</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {roiResults.paybackPeriod.toFixed(1)} months
                        </div>
                        <p className="text-sm text-muted-foreground">Payback Period</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>3-Year ROI</span>
                        <span className="font-bold text-green-600">
                          {roiResults.threeYearROI.toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cost per User (Annual)</span>
                        <span className="font-semibold">
                          ${roiResults.costPerUser.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Volume Discount</span>
                        <span className="font-semibold text-green-600">
                          {roiResults.discount}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Implementation Fee</span>
                        <span className="font-semibold">
                          ${roiResults.implementationFee.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="text-center">
                      <div className="text-lg font-semibold mb-2">Total Investment</div>
                      <div className="text-3xl font-bold">
                        ${currentQuote.quote_total.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">First year</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="quote" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Quote Builder
                </CardTitle>
                <CardDescription>
                  Create custom enterprise quotes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input
                        id="company-name"
                        value={currentQuote.company_name}
                        onChange={(e) => setCurrentQuote(prev => ({
                          ...prev,
                          company_name: e.target.value
                        }))}
                        placeholder="Acme Corporation"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact-name">Contact Name</Label>
                      <Input
                        id="contact-name"
                        value={currentQuote.contact_name}
                        onChange={(e) => setCurrentQuote(prev => ({
                          ...prev,
                          contact_name: e.target.value
                        }))}
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contact-email">Contact Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={currentQuote.contact_email}
                        onChange={(e) => setCurrentQuote(prev => ({
                          ...prev,
                          contact_email: e.target.value
                        }))}
                        placeholder="john@acme.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="custom-requirements">Custom Requirements</Label>
                      <Textarea
                        id="custom-requirements"
                        value={currentQuote.custom_requirements}
                        onChange={(e) => setCurrentQuote(prev => ({
                          ...prev,
                          custom_requirements: e.target.value
                        }))}
                        placeholder="SSO integration, custom branding, dedicated support..."
                        rows={4}
                      />
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Quote Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Users:</span>
                          <span>{currentQuote.company_size.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Timeline:</span>
                          <span>{currentQuote.implementation_timeline}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>${currentQuote.quote_total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={saveQuote} variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Save Quote
                  </Button>
                  <Button onClick={sendQuote}>
                    <Send className="w-4 h-4 mr-2" />
                    Send Quote
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="proposals" className="space-y-6">
            <div className="grid gap-6">
              {quotes.map((quote) => (
                <Card key={quote.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{quote.company_name}</CardTitle>
                        <CardDescription>{quote.contact_name} • {quote.contact_email}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${quote.quote_total.toLocaleString()}</div>
                        <Badge variant={quote.status === 'sent' ? 'default' : 'secondary'}>
                          {quote.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Company Size:</span>
                        <div>{quote.company_size.toLocaleString()} users</div>
                      </div>
                      <div>
                        <span className="font-medium">Timeline:</span>
                        <div>{quote.implementation_timeline}</div>
                      </div>
                      <div>
                        <span className="font-medium">Created:</span>
                        <div>{quote.created_at ? new Date(quote.created_at).toLocaleDateString() : 'N/A'}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    <Target className="w-5 h-5 mr-2" />
                    Prospects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-sm text-muted-foreground">Active prospects</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-600">
                    <Clock className="w-5 h-5 mr-2" />
                    In Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-sm text-muted-foreground">Quotes sent</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Closed Won
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-sm text-muted-foreground">This quarter</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-600">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Pipeline Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2.4M</div>
                  <p className="text-sm text-muted-foreground">Total pipeline</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EnterpriseSales;