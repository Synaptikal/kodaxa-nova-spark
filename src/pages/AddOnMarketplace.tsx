import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/common/Layout';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { 
  Brain, Shield, Scale, TrendingUp, Globe, Database, Zap, Users,
  Code, FileText, BarChart3, Lock, Briefcase, Heart, Truck, 
  Factory, Banknote, GraduationCap, Home, Smartphone, Car,
  Microscope, Leaf, Building, Camera, Music, Gamepad2, Coffee,
  Star, Download, Eye, ShoppingCart, Filter, Search, Tag,
  Clock, Award, Verified, Sparkles, ChevronRight, ExternalLink,
  DollarSign, Check
} from 'lucide-react';

// Types
interface MarketplaceAddon {
  id: string;
  name: string;
  category: AddonCategory;
  subcategory: string;
  description: string;
  longDescription: string;
  price: number;
  priceModel: 'one-time' | 'monthly' | 'usage' | 'freemium';
  usageUnit?: string;
  provider: 'kodaxa' | 'partner' | 'community';
  rating: number;
  reviews: number;
  downloads: number;
  featured: boolean;
  verified: boolean;
  icon: React.ComponentType<any>;
  screenshots: string[];
  features: string[];
  integrations: string[];
  requirements: string[];
  supportedModules: string[];
  tags: string[];
  lastUpdated: string;
  version: string;
  developer: {
    name: string;
    verified: boolean;
    rating: number;
  };
}

type AddonCategory = 
  | 'ai-agents' 
  | 'industry-solutions' 
  | 'data-connectors' 
  | 'analytics-tools' 
  | 'compliance-modules' 
  | 'automation-workflows' 
  | 'visualization-tools'
  | 'security-enhancements'
  | 'productivity-tools'
  | 'integration-apis';

const marketplaceAddons: MarketplaceAddon[] = [
  // AI AGENTS CATEGORY
  {
    id: 'financial-analyst-ai',
    name: 'Advanced Financial Analyst AI',
    category: 'ai-agents',
    subcategory: 'Financial Analysis',
    description: 'Specialized AI agent for complex financial modeling, DCF analysis, and investment valuations',
    longDescription: 'This advanced AI agent combines years of financial expertise with real-time market data to perform sophisticated financial analysis. Features include DCF modeling, comparable company analysis, LBO modeling, and risk assessment.',
    price: 199,
    priceModel: 'monthly',
    provider: 'kodaxa',
    rating: 4.8,
    reviews: 234,
    downloads: 1250,
    featured: true,
    verified: true,
    icon: BarChart3,
    screenshots: ['financial-dashboard.jpg', 'dcf-model.jpg', 'valuation-report.jpg'],
    features: [
      'Advanced DCF modeling with sensitivity analysis',
      'Real-time market data integration',
      'Comparable company analysis',
      'Monte Carlo simulations for risk assessment',
      'Custom financial report generation'
    ],
    integrations: ['Bloomberg API', 'Yahoo Finance', 'Alpha Vantage', 'Quandl'],
    requirements: ['Business Foundry module', 'Professional tier or higher'],
    supportedModules: ['business-foundry'],
    tags: ['finance', 'valuation', 'modeling', 'dcf', 'investment'],
    lastUpdated: '2024-03-15',
    version: '2.1.0',
    developer: {
      name: 'Kodaxa Financial Labs',
      verified: true,
      rating: 4.9
    }
  },
  {
    id: 'legal-research-ai',
    name: 'Legal Research & Analysis AI',
    category: 'ai-agents',
    subcategory: 'Legal Analysis',
    description: 'AI agent specialized in legal research, case law analysis, and regulatory compliance interpretation',
    longDescription: 'Powered by extensive legal databases and trained on millions of legal documents, this AI agent provides comprehensive legal research capabilities, case law analysis, and regulatory interpretation.',
    price: 299,
    priceModel: 'monthly',
    provider: 'partner',
    rating: 4.7,
    reviews: 156,
    downloads: 890,
    featured: true,
    verified: true,
    icon: Scale,
    screenshots: ['legal-research.jpg', 'case-analysis.jpg', 'compliance-report.jpg'],
    features: [
      'Natural language legal query processing',
      'Case law precedent analysis',
      'Regulatory change monitoring',
      'Contract clause optimization',
      'Legal risk assessment scoring'
    ],
    integrations: ['Westlaw', 'LexisNexis', 'Google Scholar', 'Court APIs'],
    requirements: ['IP Fortress or Compliance Sentinel module', 'Enterprise tier'],
    supportedModules: ['ip-fortress', 'compliance-sentinel'],
    tags: ['legal', 'research', 'compliance', 'contracts', 'risk'],
    lastUpdated: '2024-03-10',
    version: '1.8.0',
    developer: {
      name: 'LegalTech Solutions Inc.',
      verified: true,
      rating: 4.6
    }
  },
  {
    id: 'market-intelligence-ai',
    name: 'Real-time Market Intelligence AI',
    category: 'ai-agents',
    subcategory: 'Market Research',
    description: 'AI agent that continuously monitors market trends, competitor activities, and industry developments',
    longDescription: 'This AI agent provides real-time market intelligence by monitoring thousands of sources including news, social media, financial reports, and industry publications to deliver actionable market insights.',
    price: 149,
    priceModel: 'monthly',
    provider: 'kodaxa',
    rating: 4.6,
    reviews: 189,
    downloads: 1100,
    featured: false,
    verified: true,
    icon: TrendingUp,
    screenshots: ['market-dashboard.jpg', 'competitor-analysis.jpg', 'trend-alerts.jpg'],
    features: [
      'Real-time news and social media monitoring',
      'Competitor activity tracking',
      'Market sentiment analysis',
      'Industry trend identification',
      'Custom alert system'
    ],
    integrations: ['Twitter API', 'Google News', 'Reddit API', 'Financial APIs'],
    requirements: ['Business Foundry module', 'Professional tier or higher'],
    supportedModules: ['business-foundry'],
    tags: ['market', 'intelligence', 'competitors', 'trends', 'monitoring'],
    lastUpdated: '2024-03-20',
    version: '1.5.2',
    developer: {
      name: 'Kodaxa Market Labs',
      verified: true,
      rating: 4.7
    }
  },

  // INDUSTRY SOLUTIONS
  {
    id: 'healthcare-compliance-suite',
    name: 'Healthcare Compliance Suite',
    category: 'industry-solutions',
    subcategory: 'Healthcare',
    description: 'Comprehensive HIPAA, FDA, and healthcare regulation compliance toolkit',
    longDescription: 'Complete healthcare compliance solution covering HIPAA, FDA regulations, clinical trial compliance, and medical device regulations. Includes automated assessments, documentation templates, and audit trails.',
    price: 499,
    priceModel: 'monthly',
    provider: 'partner',
    rating: 4.9,
    reviews: 78,
    downloads: 420,
    featured: true,
    verified: true,
    icon: Heart,
    screenshots: ['hipaa-dashboard.jpg', 'audit-trail.jpg', 'compliance-report.jpg'],
    features: [
      'HIPAA compliance assessment and monitoring',
      'FDA regulation tracking and updates',
      'Clinical trial documentation management',
      'Medical device compliance workflows',
      'Automated audit trail generation'
    ],
    integrations: ['Epic', 'Cerner', 'Allscripts', 'FDA databases'],
    requirements: ['Compliance Sentinel module', 'Enterprise tier'],
    supportedModules: ['compliance-sentinel'],
    tags: ['healthcare', 'hipaa', 'fda', 'medical', 'compliance'],
    lastUpdated: '2024-03-18',
    version: '3.2.1',
    developer: {
      name: 'HealthTech Compliance Co.',
      verified: true,
      rating: 4.8
    }
  },
  {
    id: 'fintech-regulatory-pack',
    name: 'FinTech Regulatory Pack',
    category: 'industry-solutions',
    subcategory: 'Financial Services',
    description: 'Complete regulatory compliance solution for financial technology companies',
    longDescription: 'Specialized compliance toolkit for FinTech companies covering PCI-DSS, SOX, banking regulations, cryptocurrency compliance, and anti-money laundering (AML) requirements.',
    price: 699,
    priceModel: 'monthly',
    provider: 'partner',
    rating: 4.7,
    reviews: 92,
    downloads: 380,
    featured: true,
    verified: true,
    icon: Banknote,
    screenshots: ['fintech-dashboard.jpg', 'aml-monitoring.jpg', 'regulatory-updates.jpg'],
    features: [
      'PCI-DSS compliance automation',
      'SOX financial controls monitoring',
      'AML transaction monitoring',
      'Cryptocurrency regulation tracking',
      'Banking regulation compliance'
    ],
    integrations: ['Plaid', 'Stripe', 'Banking APIs', 'Blockchain explorers'],
    requirements: ['Compliance Sentinel module', 'Professional tier or higher'],
    supportedModules: ['compliance-sentinel', 'business-foundry'],
    tags: ['fintech', 'banking', 'pci-dss', 'sox', 'aml', 'cryptocurrency'],
    lastUpdated: '2024-03-12',
    version: '2.4.0',
    developer: {
      name: 'RegTech Financial Solutions',
      verified: true,
      rating: 4.6
    }
  },
  {
    id: 'manufacturing-optimization',
    name: 'Smart Manufacturing Analytics',
    category: 'industry-solutions',
    subcategory: 'Manufacturing',
    description: 'AI-powered manufacturing optimization with predictive maintenance and quality control',
    longDescription: 'Comprehensive manufacturing solution combining IoT data, predictive analytics, and quality control systems to optimize production efficiency, reduce downtime, and improve product quality.',
    price: 399,
    priceModel: 'monthly',
    provider: 'partner',
    rating: 4.5,
    reviews: 67,
    downloads: 290,
    featured: false,
    verified: true,
    icon: Factory,
    screenshots: ['manufacturing-dashboard.jpg', 'predictive-maintenance.jpg', 'quality-control.jpg'],
    features: [
      'Predictive maintenance algorithms',
      'Real-time quality control monitoring',
      'Production efficiency optimization',
      'Supply chain analytics',
      'Equipment performance tracking'
    ],
    integrations: ['SAP', 'Oracle Manufacturing', 'Siemens', 'GE Predix'],
    requirements: ['Business Foundry module', 'Professional tier or higher'],
    supportedModules: ['business-foundry', 'ai-workspace'],
    tags: ['manufacturing', 'iot', 'predictive', 'quality', 'optimization'],
    lastUpdated: '2024-03-08',
    version: '1.9.3',
    developer: {
      name: 'Industrial AI Systems',
      verified: true,
      rating: 4.4
    }
  },

  // DATA CONNECTORS
  {
    id: 'salesforce-connector',
    name: 'Salesforce Data Connector',
    category: 'data-connectors',
    subcategory: 'CRM Systems',
    description: 'Real-time bidirectional sync with Salesforce CRM data',
    longDescription: 'Complete Salesforce integration enabling real-time data synchronization, automated workflows, and advanced analytics on your CRM data within the Kodaxa platform.',
    price: 99,
    priceModel: 'monthly',
    provider: 'kodaxa',
    rating: 4.8,
    reviews: 445,
    downloads: 2340,
    featured: true,
    verified: true,
    icon: Database,
    screenshots: ['salesforce-sync.jpg', 'crm-analytics.jpg', 'workflow-automation.jpg'],
    features: [
      'Real-time bidirectional data sync',
      'Custom field mapping',
      'Automated workflow triggers',
      'Advanced CRM analytics',
      'Data quality monitoring'
    ],
    integrations: ['Salesforce API', 'Salesforce Lightning', 'Einstein Analytics'],
    requirements: ['Any tier', 'Valid Salesforce license'],
    supportedModules: ['business-foundry', 'ai-workspace'],
    tags: ['salesforce', 'crm', 'sync', 'automation', 'analytics'],
    lastUpdated: '2024-03-22',
    version: '4.1.2',
    developer: {
      name: 'Kodaxa Integration Team',
      verified: true,
      rating: 4.9
    }
  },
  {
    id: 'aws-data-lake-connector',
    name: 'AWS Data Lake Connector',
    category: 'data-connectors',
    subcategory: 'Cloud Storage',
    description: 'Connect and analyze data from AWS S3, Redshift, and other AWS services',
    longDescription: 'Comprehensive AWS integration enabling seamless access to data stored in S3, Redshift, RDS, and other AWS services. Includes automated data discovery and schema mapping.',
    price: 149,
    priceModel: 'monthly',
    provider: 'partner',
    rating: 4.6,
    reviews: 178,
    downloads: 890,
    featured: false,
    verified: true,
    icon: Database,
    screenshots: ['aws-integration.jpg', 'data-lake-explorer.jpg', 'schema-mapping.jpg'],
    features: [
      'Multi-service AWS integration',
      'Automated data discovery',
      'Schema mapping and transformation',
      'Data lineage tracking',
      'Cost optimization insights'
    ],
    integrations: ['AWS S3', 'Redshift', 'RDS', 'Athena', 'Glue'],
    requirements: ['Professional tier or higher', 'AWS account'],
    supportedModules: ['business-foundry', 'ai-workspace'],
    tags: ['aws', 'data-lake', 'cloud', 's3', 'redshift'],
    lastUpdated: '2024-03-15',
    version: '2.3.1',
    developer: {
      name: 'CloudData Solutions',
      verified: true,
      rating: 4.5
    }
  },

  // ANALYTICS TOOLS
  {
    id: 'advanced-visualization-suite',
    name: 'Advanced Visualization Suite',
    category: 'visualization-tools',
    subcategory: 'Data Visualization',
    description: 'Professional-grade data visualization tools with interactive dashboards and custom charts',
    longDescription: 'Comprehensive visualization toolkit featuring advanced chart types, interactive dashboards, real-time updates, and custom visualization builder for creating stunning data presentations.',
    price: 79,
    priceModel: 'monthly',
    provider: 'kodaxa',
    rating: 4.7,
    reviews: 312,
    downloads: 1650,
    featured: true,
    verified: true,
    icon: BarChart3,
    screenshots: ['advanced-charts.jpg', 'interactive-dashboard.jpg', 'custom-viz.jpg'],
    features: [
      '50+ advanced chart types',
      'Interactive dashboard builder',
      'Real-time data updates',
      'Custom visualization scripting',
      'Export to multiple formats'
    ],
    integrations: ['D3.js', 'Chart.js', 'Plotly', 'Observable'],
    requirements: ['Any tier'],
    supportedModules: ['business-foundry', 'ai-workspace', 'ip-fortress', 'compliance-sentinel'],
    tags: ['visualization', 'charts', 'dashboard', 'interactive', 'reporting'],
    lastUpdated: '2024-03-20',
    version: '3.5.0',
    developer: {
      name: 'Kodaxa Visualization Labs',
      verified: true,
      rating: 4.8
    }
  },
  {
    id: 'predictive-analytics-engine',
    name: 'Predictive Analytics Engine',
    category: 'analytics-tools',
    subcategory: 'Machine Learning',
    description: 'Advanced machine learning models for forecasting and predictive analysis',
    longDescription: 'Powerful predictive analytics engine featuring pre-built ML models, automated feature engineering, and no-code model building for business forecasting and trend prediction.',
    price: 199,
    priceModel: 'monthly',
    provider: 'kodaxa',
    rating: 4.6,
    reviews: 167,
    downloads: 720,
    featured: false,
    verified: true,
    icon: Brain,
    screenshots: ['ml-models.jpg', 'forecast-charts.jpg', 'model-performance.jpg'],
    features: [
      'Pre-built ML models for common use cases',
      'Automated feature engineering',
      'No-code model builder',
      'Real-time prediction API',
      'Model performance monitoring'
    ],
    integrations: ['scikit-learn', 'TensorFlow', 'PyTorch', 'AutoML'],
    requirements: ['Professional tier or higher'],
    supportedModules: ['business-foundry', 'ai-workspace'],
    tags: ['machine-learning', 'forecasting', 'prediction', 'automl', 'analytics'],
    lastUpdated: '2024-03-12',
    version: '1.7.4',
    developer: {
      name: 'Kodaxa AI Research',
      verified: true,
      rating: 4.7
    }
  },

  // SECURITY ENHANCEMENTS
  {
    id: 'advanced-encryption-suite',
    name: 'Advanced Encryption & Security Suite',
    category: 'security-enhancements',
    subcategory: 'Data Protection',
    description: 'Enterprise-grade encryption, key management, and advanced security features',
    longDescription: 'Comprehensive security enhancement providing end-to-end encryption, advanced key management, zero-trust architecture, and enhanced audit logging for enterprise security requirements.',
    price: 299,
    priceModel: 'monthly',
    provider: 'partner',
    rating: 4.9,
    reviews: 89,
    downloads: 340,
    featured: true,
    verified: true,
    icon: Lock,
    screenshots: ['encryption-dashboard.jpg', 'key-management.jpg', 'security-audit.jpg'],
    features: [
      'End-to-end encryption for all data',
      'Advanced key management system',
      'Zero-trust security architecture',
      'Enhanced audit logging',
      'Compliance reporting automation'
    ],
    integrations: ['AWS KMS', 'Azure Key Vault', 'HashiCorp Vault', 'HSMs'],
    requirements: ['Enterprise tier', 'Security clearance verification'],
    supportedModules: ['all'],
    tags: ['security', 'encryption', 'compliance', 'audit', 'zero-trust'],
    lastUpdated: '2024-03-18',
    version: '2.1.0',
    developer: {
      name: 'CyberSec Pro Solutions',
      verified: true,
      rating: 4.8
    }
  },

  // AUTOMATION WORKFLOWS
  {
    id: 'smart-workflow-automation',
    name: 'Smart Workflow Automation',
    category: 'automation-workflows',
    subcategory: 'Process Automation',
    description: 'AI-powered workflow automation with smart triggers and decision trees',
    longDescription: 'Intelligent workflow automation system that learns from user behavior, automatically optimizes processes, and provides smart suggestions for workflow improvements.',
    price: 129,
    priceModel: 'monthly',
    provider: 'kodaxa',
    rating: 4.5,
    reviews: 203,
    downloads: 980,
    featured: false,
    verified: true,
    icon: Zap,
    screenshots: ['workflow-builder.jpg', 'automation-rules.jpg', 'process-optimization.jpg'],
    features: [
      'Visual workflow designer',
      'AI-powered process optimization',
      'Smart trigger system',
      'Decision tree automation',
      'Performance analytics'
    ],
    integrations: ['Zapier', 'Microsoft Power Automate', 'Slack', 'Email systems'],
    requirements: ['Professional tier or higher'],
    supportedModules: ['all'],
    tags: ['automation', 'workflow', 'process', 'optimization', 'ai'],
    lastUpdated: '2024-03-14',
    version: '2.8.1',
    developer: {
      name: 'Kodaxa Automation Labs',
      verified: true,
      rating: 4.6
    }
  },

  // PRODUCTIVITY TOOLS
  {
    id: 'collaboration-hub',
    name: 'Advanced Collaboration Hub',
    category: 'productivity-tools',
    subcategory: 'Team Collaboration',
    description: 'Enhanced team collaboration with video conferencing, shared workspaces, and project management',
    longDescription: 'Comprehensive collaboration platform integrating video conferencing, shared workspaces, real-time document editing, and project management tools within the Kodaxa environment.',
    price: 59,
    priceModel: 'monthly',
    provider: 'kodaxa',
    rating: 4.4,
    reviews: 256,
    downloads: 1450,
    featured: false,
    verified: true,
    icon: Users,
    screenshots: ['collaboration-workspace.jpg', 'video-conference.jpg', 'project-management.jpg'],
    features: [
      'Integrated video conferencing',
      'Real-time document collaboration',
      'Project management tools',
      'Team chat and messaging',
      'Shared workspace management'
    ],
    integrations: ['Zoom', 'Microsoft Teams', 'Slack', 'Google Workspace'],
    requirements: ['Any tier'],
    supportedModules: ['ai-workspace'],
    tags: ['collaboration', 'video', 'chat', 'project-management', 'teamwork'],
    lastUpdated: '2024-03-16',
    version: '1.4.3',
    developer: {
      name: 'Kodaxa Collaboration Team',
      verified: true,
      rating: 4.5
    }
  },

  // SPECIALIZED VERTICAL SOLUTIONS
  {
    id: 'esg-sustainability-tracker',
    name: 'ESG & Sustainability Tracker',
    category: 'industry-solutions',
    subcategory: 'Sustainability',
    description: 'Comprehensive ESG reporting and sustainability metrics tracking',
    longDescription: 'Complete Environmental, Social, and Governance (ESG) solution providing sustainability metrics tracking, carbon footprint analysis, and automated ESG reporting for regulatory compliance.',
    price: 249,
    priceModel: 'monthly',
    provider: 'partner',
    rating: 4.7,
    reviews: 134,
    downloads: 560,
    featured: true,
    verified: true,
    icon: Leaf,
    screenshots: ['esg-dashboard.jpg', 'carbon-tracking.jpg', 'sustainability-report.jpg'],
    features: [
      'Carbon footprint calculation and tracking',
      'ESG metrics dashboard',
      'Sustainability goal setting and monitoring',
      'Automated ESG reporting',
      'Supply chain sustainability analysis'
    ],
    integrations: ['CDP', 'GRI Standards', 'SASB', 'TCFD'],
    requirements: ['Professional tier or higher'],
    supportedModules: ['business-foundry', 'compliance-sentinel'],
    tags: ['esg', 'sustainability', 'carbon', 'environment', 'governance'],
    lastUpdated: '2024-03-10',
    version: '1.6.2',
    developer: {
      name: 'GreenTech Analytics',
      verified: true,
      rating: 4.6
    }
  },
  {
    id: 'crypto-blockchain-analyzer',
    name: 'Crypto & Blockchain Analyzer',
    category: 'industry-solutions',
    subcategory: 'Cryptocurrency',
    description: 'Advanced cryptocurrency and blockchain analysis tools',
    longDescription: 'Comprehensive cryptocurrency analysis platform providing blockchain analytics, DeFi tracking, portfolio analysis, and regulatory compliance for crypto businesses.',
    price: 349,
    priceModel: 'monthly',
    provider: 'partner',
    rating: 4.3,
    reviews: 78,
    downloads: 290,
    featured: false,
    verified: true,
    icon: Banknote,
    screenshots: ['crypto-dashboard.jpg', 'blockchain-analysis.jpg', 'defi-tracking.jpg'],
    features: [
      'Multi-chain blockchain analysis',
      'DeFi protocol tracking',
      'Cryptocurrency portfolio analytics',
      'Regulatory compliance monitoring',
      'Smart contract analysis'
    ],
    integrations: ['Ethereum', 'Bitcoin', 'Polygon', 'Binance Smart Chain'],
    requirements: ['Professional tier or higher'],
    supportedModules: ['business-foundry', 'compliance-sentinel'],
    tags: ['cryptocurrency', 'blockchain', 'defi', 'analysis', 'compliance'],
    lastUpdated: '2024-03-05',
    version: '0.9.8',
    developer: {
      name: 'CryptoAnalytics Pro',
      verified: false,
      rating: 4.2
    }
  }
];

const AddOnMarketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState<AddonCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'downloads' | 'price'>('featured');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'under-100' | 'under-500' | 'premium'>('all');
  const [providerFilter, setProviderFilter] = useState<'all' | 'kodaxa' | 'partner' | 'community'>('all');
  const [showFeatured, setShowFeatured] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Supabase integration for backend functionality
  const [userAddOns, setUserAddOns] = useState<string[]>([]);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const { user, session } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    setIsLoaded(true);
    if (user) {
      loadUserAddOns();
    }
  }, [user]);

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
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          tier: 'addon',
          addOnId, 
          priceId: `addon_${addOnId}`,
          price 
        },
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

  const categories = [
    { id: 'all' as const, name: 'All Add-ons', icon: Star, count: marketplaceAddons.length },
    { id: 'ai-agents' as const, name: 'AI Agents', icon: Brain, count: marketplaceAddons.filter(a => a.category === 'ai-agents').length },
    { id: 'industry-solutions' as const, name: 'Industry Solutions', icon: Building, count: marketplaceAddons.filter(a => a.category === 'industry-solutions').length },
    { id: 'data-connectors' as const, name: 'Data Connectors', icon: Database, count: marketplaceAddons.filter(a => a.category === 'data-connectors').length },
    { id: 'analytics-tools' as const, name: 'Analytics Tools', icon: BarChart3, count: marketplaceAddons.filter(a => a.category === 'analytics-tools').length },
    { id: 'security-enhancements' as const, name: 'Security', icon: Lock, count: marketplaceAddons.filter(a => a.category === 'security-enhancements').length },
    { id: 'automation-workflows' as const, name: 'Automation', icon: Zap, count: marketplaceAddons.filter(a => a.category === 'automation-workflows').length },
    { id: 'visualization-tools' as const, name: 'Visualization', icon: BarChart3, count: marketplaceAddons.filter(a => a.category === 'visualization-tools').length },
    { id: 'productivity-tools' as const, name: 'Productivity', icon: Users, count: marketplaceAddons.filter(a => a.category === 'productivity-tools').length }
  ];

  const filteredAddons = marketplaceAddons.filter(addon => {
    // Category filter
    if (selectedCategory !== 'all' && addon.category !== selectedCategory) return false;
    
    // Search filter
    if (searchQuery && !addon.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !addon.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !addon.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
    
    // Price filter
    if (priceFilter === 'free' && addon.price > 0) return false;
    if (priceFilter === 'under-100' && addon.price >= 100) return false;
    if (priceFilter === 'under-500' && addon.price >= 500) return false;
    if (priceFilter === 'premium' && addon.price < 500) return false;
    
    // Provider filter
    if (providerFilter !== 'all' && addon.provider !== providerFilter) return false;
    
    // Featured filter
    if (showFeatured && !addon.featured) return false;
    
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      case 'price':
        return a.price - b.price;
      case 'featured':
      default:
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
    }
  });

  const AddonCard = ({ addon }: { addon: MarketplaceAddon }) => {
    const isPurchased = userAddOns.includes(addon.id);
    const isPurchasing = purchasing === addon.id;
    
    return (
      <Card className={`glass border-glass-border/30 relative transition-all duration-300 hover:scale-105 hover:border-primary/20 ${isPurchased ? 'ring-2 ring-success' : ''}`}>
        {addon.featured && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 z-10">
            <Star size={12} className="fill-current" />
            Featured
          </div>
        )}
        
        {isPurchased && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-success to-success-glow text-success-foreground text-center py-2 text-sm font-semibold rounded-t-lg">
            ✅ Active
          </div>
        )}

        <CardHeader className={isPurchased ? 'pt-12' : 'pt-6'}>
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-gradient-primary rounded-xl p-3">
              <addon.icon size={24} className="text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg mb-1">{addon.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-2">{addon.subcategory}</p>
                </div>
                {addon.verified && (
                  <Badge className="bg-success/20 text-success border-success/30">
                    <Verified size={12} className="mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={12} 
                      className={i < Math.floor(addon.rating) ? 'text-yellow-400 fill-current' : 'text-muted-foreground'} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {addon.rating} ({addon.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
          
          <CardDescription className="mb-4">{addon.description}</CardDescription>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {addon.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-accent" />
              Key Features
            </h4>
            <ul className="space-y-1">
              {addon.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start text-sm">
                  <Check className="w-3 h-3 text-success mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Download size={14} />
              {addon.downloads.toLocaleString()} downloads
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Badge variant="outline" className={
                addon.provider === 'kodaxa' ? 'border-primary/30 text-primary' :
                addon.provider === 'partner' ? 'border-accent/30 text-accent' :
                'border-muted text-muted-foreground'
              }>
                {addon.provider === 'kodaxa' ? 'Official' : 
                 addon.provider === 'partner' ? 'Partner' : 'Community'}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center justify-between border-t border-glass-border/30 pt-4">
            <div className="text-right">
              <div className="text-2xl font-bold">
                {addon.price === 0 ? 'Free' : `$${addon.price}`}
              </div>
              {addon.price > 0 && (
                <div className="text-sm text-muted-foreground">
                  /{addon.priceModel === 'monthly' ? 'mo' : 
                    addon.priceModel === 'usage' ? addon.usageUnit || 'use' : 
                    addon.priceModel === 'one-time' ? 'once' : 'mo'}
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye size={16} className="mr-1" />
                Preview
              </Button>
              <Button
                onClick={() => handlePurchase(addon.id, addon.price)}
                disabled={isPurchasing || isPurchased}
                className="flex items-center gap-1"
              >
                {isPurchasing ? (
                  <LoadingSpinner size="sm" />
                ) : isPurchased ? (
                  "Purchased"
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    {addon.price === 0 ? 'Install' : 'Buy'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout title="Add-on Marketplace">
      <div className="space-y-6">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingCart className="w-8 h-8 text-primary animate-pulse" />
                <div className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full animate-ping" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-glow via-accent-glow to-success-glow bg-clip-text text-transparent">
                Kodaxa Marketplace
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Discover powerful add-ons to supercharge your business intelligence platform
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                <Verified className="w-3 h-3 mr-1" />
                All verified for security
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Shield className="w-3 h-3 mr-1" />
                Enterprise-grade compliance
              </Badge>
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                <Sparkles className="w-3 h-3 mr-1" />
                30-day money-back guarantee
              </Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="glass border-glass-border/30 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300">
              <Code className="w-4 h-4 mr-2" />
              Developer Portal
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow transition-all duration-300 shadow-lg hover:shadow-xl">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Documentation
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className={`glass border-glass-border/30 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="Search add-ons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              {/* Sort */}
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Sort by Featured</SelectItem>
                  <SelectItem value="rating">Sort by Rating</SelectItem>
                  <SelectItem value="downloads">Sort by Downloads</SelectItem>
                  <SelectItem value="price">Sort by Price</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Price Filter */}
              <Select value={priceFilter} onValueChange={(value: any) => setPriceFilter(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="under-100">Under $100</SelectItem>
                  <SelectItem value="under-500">Under $500</SelectItem>
                  <SelectItem value="premium">Premium ($500+)</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Provider Filter */}
              <Select value={providerFilter} onValueChange={(value: any) => setProviderFilter(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="kodaxa">Official (Kodaxa)</SelectItem>
                  <SelectItem value="partner">Verified Partners</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Additional Filters */}
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showFeatured}
                  onChange={(e) => setShowFeatured(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-foreground">Featured only</span>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className="flex items-center gap-2 glass border-glass-border/30"
              >
                <category.icon size={16} />
                {category.name}
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Showing {filteredAddons.length} of {marketplaceAddons.length} add-ons
          </p>
          
          {filteredAddons.length > 0 && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Avg. Rating: {(filteredAddons.reduce((sum, addon) => sum + addon.rating, 0) / filteredAddons.length).toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                Total Downloads: {filteredAddons.reduce((sum, addon) => sum + addon.downloads, 0).toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Add-ons Grid */}
        {filteredAddons.length > 0 ? (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {filteredAddons.map((addon) => (
              <AddonCard key={addon.id} addon={addon} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No add-ons found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
            <Button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setPriceFilter('all');
                setProviderFilter('all');
                setShowFeatured(false);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Featured Categories */}
        <div className={`transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: 'AI Agents', 
                icon: Brain, 
                count: marketplaceAddons.filter(a => a.category === 'ai-agents').length,
                description: 'Specialized AI agents for domain expertise',
                gradient: 'from-primary to-accent'
              },
              { 
                name: 'Industry Solutions', 
                icon: Building, 
                count: marketplaceAddons.filter(a => a.category === 'industry-solutions').length,
                description: 'Vertical-specific business solutions',
                gradient: 'from-success to-accent'
              },
              { 
                name: 'Data Connectors', 
                icon: Database, 
                count: marketplaceAddons.filter(a => a.category === 'data-connectors').length,
                description: 'Connect to your existing data sources',
                gradient: 'from-warning to-destructive'
              },
              { 
                name: 'Security Tools', 
                icon: Lock, 
                count: marketplaceAddons.filter(a => a.category === 'security-enhancements').length,
                description: 'Enterprise-grade security enhancements',
                gradient: 'from-accent to-primary'
              }
            ].map((category) => (
              <Card 
                key={category.name}
                onClick={() => setSelectedCategory(category.name.toLowerCase().replace(' ', '-') as AddonCategory)}
                className="glass border-glass-border/30 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-primary/20"
              >
                <CardContent className="p-6">
                  <div className={`bg-gradient-to-br ${category.gradient} rounded-xl p-4 w-fit mb-4`}>
                    <category.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-medium">{category.count} add-ons</span>
                    <ChevronRight className="text-muted-foreground" size={16} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Developer Program CTA */}
        <Card className="glass border-glass-border/30 bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Build for the Kodaxa Marketplace
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our developer program and reach thousands of businesses worldwide
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-success/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <DollarSign size={24} className="text-success" />
                </div>
                <h3 className="text-lg font-semibold mb-2">70% Revenue Share</h3>
                <p className="text-muted-foreground text-sm">Keep the majority of your earnings</p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Code size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Easy Integration</h3>
                <p className="text-muted-foreground text-sm">Simple APIs and comprehensive docs</p>
              </div>
              
              <div className="text-center">
                <div className="bg-accent/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users size={24} className="text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Global Reach</h3>
                <p className="text-muted-foreground text-sm">Access to enterprise customers worldwide</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="flex items-center gap-2">
                <ExternalLink size={20} />
                Developer Portal
              </Button>
              <Button variant="outline" size="lg">
                View Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddOnMarketplace;
