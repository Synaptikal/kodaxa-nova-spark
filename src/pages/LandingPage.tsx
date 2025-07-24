import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, Shield, BarChart3, ShoppingCart, Settings, Target, TrendingUp, 
  Users, Database, Lock, Zap, Eye, Star, Check, ArrowRight, Play,
  Building, DollarSign, Clock, Award, Sparkles, Globe, Activity,
  FileText, Search, AlertTriangle, Package, CreditCard, HeartHandshake,
  Rocket, Trophy, Lightbulb, ChevronRight, ExternalLink, MessageSquare
} from 'lucide-react';

const LandingPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);

    // Smooth scroll behavior for anchor links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.href && target.href.includes('#')) {
        e.preventDefault();
        const id = target.href.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI Workspace',
      description: 'Strategic AI advisory sessions with advanced machine learning',
      details: 'Deploy intelligent AI agents for complex decision-making, predictive analytics, and strategic planning.',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Shield,
      title: 'IP Fortress',
      description: 'Comprehensive intellectual property management and protection',
      details: 'Patent search, portfolio management, maintenance alerts, and competitive IP analysis.',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: BarChart3,
      title: 'Capital Forge',
      description: 'Advanced business intelligence and financial modeling',
      details: 'Market sizing, financial projections, competitive analysis, and customer segmentation.',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: ShoppingCart,
      title: 'Marketplace',
      description: 'Extensive ecosystem of enterprise add-ons and integrations',
      details: 'Discover, purchase, and deploy specialized tools to extend your platform capabilities.',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      price: 99,
      period: 'month',
      description: 'Perfect for small teams getting started with business intelligence',
      features: [
        'Basic AI Workspace access',
        'Standard dashboard analytics',
        'Email support',
        'Up to 5 team members',
        'Basic IP portfolio tracking',
        '10GB data storage',
        'Monthly usage reports'
      ],
      highlighted: false,
      cta: 'Start Free Trial'
    },
    {
      name: 'Professional',
      price: 299,
      period: 'month',
      description: 'Advanced features for growing businesses and professional teams',
      features: [
        'Full AI Workspace with advanced agents',
        'Complete IP Fortress access',
        'Capital Forge business intelligence',
        'Priority support & training',
        'Up to 25 team members',
        'Advanced analytics & reporting',
        '100GB data storage',
        'API access & integrations',
        'Custom workflows',
        'Marketplace access (Basic tier add-ons)'
      ],
      highlighted: true,
      cta: 'Start Professional Trial'
    },
    {
      name: 'Enterprise',
      price: 999,
      period: 'month',
      description: 'Complete solution for large organizations with custom requirements',
      features: [
        'Unlimited AI Workspace capabilities',
        'Enterprise IP Fortress with compliance',
        'Advanced Capital Forge with custom models',
        'Full marketplace access',
        'Dedicated account manager',
        'Unlimited team members',
        'Advanced security & compliance',
        'Unlimited data storage',
        'Custom integrations & APIs',
        'White-label options',
        'On-premise deployment available',
        'SLA guarantees'
      ],
      highlighted: false,
      cta: 'Contact Sales'
    }
  ];

  const testimonials = [
    {
      quote: "KODAXA transformed our strategic planning process. The AI insights are incredibly accurate and have saved us months of analysis work.",
      author: "Sarah Chen",
      role: "VP of Strategy",
      company: "TechCorp Industries"
    },
    {
      quote: "The IP Fortress module helped us identify critical patent gaps and strengthen our intellectual property portfolio significantly.",
      author: "Michael Rodriguez",
      role: "Chief IP Officer", 
      company: "Innovation Labs"
    },
    {
      quote: "Capital Forge's financial modeling capabilities are enterprise-grade. It's like having a team of analysts at your fingertips.",
      author: "David Park",
      role: "CFO",
      company: "Growth Ventures"
    }
  ];

  const stats = [
    { value: '500+', label: 'Enterprise Clients' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '2M+', label: 'Data Points Analyzed' },
    { value: '$50B+', label: 'Decisions Supported' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass border-b border-glass-border/30 sticky top-0 z-50 p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-lg bg-gradient-executive flex items-center justify-center shadow-lg">
                <div className="w-5 h-5 rounded-sm bg-background/90 flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-executive rounded-lg opacity-20 blur-sm"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">KODAXA</h1>
              <p className="text-xs text-muted-foreground font-medium tracking-widest">ORCHESTRATOR</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
            <Button variant="outline" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/auth')}>
              Start Free Trial
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`relative py-20 overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Enterprise Business Intelligence Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
              Strategic Intelligence
              <br />
              <span className="text-foreground">Orchestrated</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Empower your organization with AI-driven insights, comprehensive IP management, 
              advanced financial modeling, and strategic business intelligence—all in one unified platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow text-lg px-8 py-4" onClick={() => navigate('/auth')}>
              <Play className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => setShowDemo(true)}
            >
              <Eye className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Business Intelligence Suite</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Four powerful modules working together to drive strategic decision-making and business growth
            </p>
          </div>

          {/* Feature Tabs */}
          <Tabs value={activeFeature.toString()} onValueChange={(value) => setActiveFeature(parseInt(value))} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 glass border-glass-border/30 mb-8">
              {features.map((feature, index) => (
                <TabsTrigger 
                  key={index} 
                  value={index.toString()}
                  className="flex items-center gap-2 data-[state=active]:bg-primary/10"
                >
                  <feature.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{feature.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {features.map((feature, index) => (
              <TabsContent key={index} value={index.toString()}>
                <Card className="glass border-glass-border/30">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                        <p className="text-lg text-muted-foreground mb-6">{feature.description}</p>
                        <p className="text-foreground mb-6">{feature.details}</p>
                        <Button className="group">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                      <div className="relative">
                        <div className="glass border-glass-border/30 rounded-xl p-6 bg-gradient-to-br from-background/50 to-muted/50">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Feature Status</span>
                              <Badge variant="secondary" className="bg-success/20 text-success">Active</Badge>
                            </div>
                            <div className="h-24 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                              <feature.icon className="w-12 h-12 text-primary" />
                            </div>
                            <div className="space-y-2">
                              <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-4/5 rounded-full"></div>
                              </div>
                              <div className="text-xs text-muted-foreground">Performance: 95%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* Detailed Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              { icon: Brain, title: 'AI Quorum', description: 'Multi-agent collaborative intelligence' },
              { icon: Search, title: 'Patent Search', description: 'Advanced IP research and analysis' },
              { icon: Target, title: 'Market Sizing', description: 'TAM/SAM/SOM analysis' },
              { icon: Package, title: 'Add-on Ecosystem', description: 'Extensible marketplace platform' },
              { icon: Activity, title: 'Real-time Analytics', description: 'Live performance monitoring' },
              { icon: Lock, title: 'Enterprise Security', description: 'SOC 2 Type II compliance' },
              { icon: Database, title: 'Data Integration', description: 'Connect all your systems' },
              { icon: Award, title: 'Expert Support', description: '24/7 dedicated assistance' }
            ].map((item, index) => (
              <Card key={index} className="glass border-glass-border/30 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <item.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Flexible pricing options designed to scale with your business needs
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <Badge variant="secondary" className="bg-success/20 text-success">
                <Clock className="w-3 h-3 mr-1" />
                30-day free trial
              </Badge>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                <HeartHandshake className="w-3 h-3 mr-1" />
                No setup fees
              </Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative glass border-glass-border/30 ${tier.highlighted ? 'ring-2 ring-primary border-primary/30 scale-105' : ''}`}>
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">${tier.price}</span>
                    <span className="text-muted-foreground">/{tier.period}</span>
                  </div>
                  <CardDescription className="text-center">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-4 h-4 text-success mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${tier.highlighted ? 'bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow' : ''}`}
                    variant={tier.highlighted ? 'default' : 'outline'}
                    onClick={() => navigate('/auth')}
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enterprise Features */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-6">Enterprise Features</h3>
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Shield, title: 'Advanced Security', description: 'SOC 2, ISO 27001 compliance' },
                { icon: Users, title: 'Team Management', description: 'Role-based access control' },
                { icon: Globe, title: 'Global Support', description: '24/7 multilingual assistance' },
                { icon: Building, title: 'Custom Deployment', description: 'On-premise & cloud options' }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-muted-foreground">
              See how organizations worldwide are transforming their decision-making with KODAXA
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass border-glass-border/30">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold mr-3">
                      {testimonial.author[0]}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Business Intelligence?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of organizations already using KODAXA to drive strategic decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow text-lg px-8 py-4" onClick={() => navigate('/auth')}>
              <Rocket className="w-5 h-5 mr-2" />
              Start Your Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4"
              onClick={() => setShowDemo(true)}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="glass border-glass-border/30 max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl">KODAXA Platform Demo</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowDemo(false)}>
                ✕
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Interactive Platform Demo</h3>
                  <p className="text-muted-foreground mb-4">See KODAXA in action with our comprehensive walkthrough</p>
                  <Button onClick={() => navigate('/auth')}>
                    Start Your Free Trial Instead
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="py-12 border-t border-glass-border/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-executive flex items-center justify-center">
                  <div className="w-4 h-4 rounded-sm bg-background/90 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="font-bold">KODAXA</div>
                  <div className="text-xs text-muted-foreground">ORCHESTRATOR</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Enterprise business intelligence platform for strategic decision-making
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">AI Workspace</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">IP Fortress</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Capital Forge</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Marketplace</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-glass-border/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 KODAXA. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-muted-foreground mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
