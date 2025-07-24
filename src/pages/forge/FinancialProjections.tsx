import { Layout } from "@/components/common/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  BarChart3,
  LineChart,
  PieChart,
  Calculator,
  Download,
  Settings,
  RefreshCw,
  Target,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Zap,
  Edit,
  Play,
  Share,
  FileSpreadsheet
} from "lucide-react";
import { useState, useEffect } from "react";

interface FinancialMetric {
  label: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  probability: number;
  color: string;
  metrics: {
    revenue: number;
    expenses: number;
    profit: number;
    margins: number;
    growth: number;
  };
}

// Animated counter hook
const useAnimatedCounter = (end: number, duration: number = 2000, decimals: number = 0) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  
  return parseFloat(count.toFixed(decimals));
};

export default function FinancialProjections() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string>("realistic");
  const [timeHorizon, setTimeHorizon] = useState([5]);
  const [growthRate, setGrowthRate] = useState([15]);
  const [includeInflation, setIncludeInflation] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const currentMetrics: FinancialMetric[] = [
    { label: "Annual Revenue", value: 2400000, unit: "$", change: 23.5, trend: 'up', confidence: 92 },
    { label: "Gross Margin", value: 68.5, unit: "%", change: 4.2, trend: 'up', confidence: 89 },
    { label: "Operating Expenses", value: 1200000, unit: "$", change: 8.3, trend: 'up', confidence: 94 },
    { label: "Net Profit", value: 440000, unit: "$", change: 45.2, trend: 'up', confidence: 87 },
    { label: "Cash Flow", value: 520000, unit: "$", change: 32.1, trend: 'up', confidence: 91 },
    { label: "Burn Rate", value: 85000, unit: "$/month", change: -12.3, trend: 'down', confidence: 95 }
  ];

  const scenarios: Scenario[] = [
    {
      id: "optimistic",
      name: "Optimistic",
      description: "Best-case scenario with high growth",
      probability: 25,
      color: "success",
      metrics: {
        revenue: 4800000,
        expenses: 2200000,
        profit: 2600000,
        margins: 75.2,
        growth: 35.8
      }
    },
    {
      id: "realistic",
      name: "Realistic",
      description: "Most likely scenario based on current trends",
      probability: 50,
      color: "primary",
      metrics: {
        revenue: 3600000,
        expenses: 1800000,
        profit: 1800000,
        margins: 68.5,
        growth: 23.5
      }
    },
    {
      id: "conservative",
      name: "Conservative",
      description: "Cautious projections with lower growth",
      probability: 25,
      color: "warning",
      metrics: {
        revenue: 2800000,
        expenses: 1600000,
        profit: 1200000,
        margins: 62.1,
        growth: 12.4
      }
    }
  ];

  const yearlyProjections = [
    { year: "2024", revenue: 2400000, expenses: 1200000, profit: 440000 },
    { year: "2025", revenue: 3600000, expenses: 1800000, profit: 720000 },
    { year: "2026", revenue: 5200000, expenses: 2400000, profit: 1200000 },
    { year: "2027", revenue: 7100000, expenses: 3200000, profit: 1800000 },
    { year: "2028", revenue: 9400000, expenses: 4100000, profit: 2600000 }
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toLocaleString()}`;
  };

  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  // Animated values
  const animatedRevenue = useAnimatedCounter(3.6, 3000, 1);
  const animatedProfit = useAnimatedCounter(1.8, 3000, 1);
  const animatedMargin = useAnimatedCounter(68.5, 3000, 1);

  const selectedScenarioData = scenarios.find(s => s.id === selectedScenario);

  return (
    <Layout title="Financial Projections">
      <div className="space-y-6">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <LineChart className="w-8 h-8 text-primary animate-pulse" />
                <div className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full animate-ping" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-glow via-success-glow to-accent-glow bg-clip-text text-transparent">
                Financial Projections
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Advanced financial modeling with AI-powered scenario analysis and real-time projections
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Calculator className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                Multi-Scenario
              </Badge>
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                Real-time
              </Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="glass border-glass-border/30 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group">
              <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Export Model
            </Button>
            <Button variant="outline" className="glass border-glass-border/30 hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 group">
              <Share className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Share
            </Button>
            <Button className="bg-gradient-to-r from-primary to-success hover:from-primary-glow hover:to-success-glow transition-all duration-300 shadow-lg hover:shadow-xl group">
              <Settings className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Configure
            </Button>
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card className="glass border-glass-border/30 relative overflow-hidden group hover:glow-primary hover:scale-105 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <DollarSign className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/30">Projected</Badge>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                ${animatedRevenue}M
              </h3>
              <p className="text-sm text-muted-foreground mt-2 mb-4">Annual Revenue (5Y)</p>
              <div className="flex items-center text-sm mb-4">
                <TrendingUp className="w-4 h-4 text-success mr-2" />
                <span className="text-success font-medium">+23.5% Growth</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary to-primary-glow"></div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30 relative overflow-hidden group hover:glow-accent hover:scale-105 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Target className="w-10 h-10 text-success group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-success/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                </div>
                <Badge className="bg-success/20 text-success border-success/30">Net Profit</Badge>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-success to-success-glow bg-clip-text text-transparent">
                ${animatedProfit}M
              </h3>
              <p className="text-sm text-muted-foreground mt-2 mb-4">Net Profit (5Y)</p>
              <div className="flex items-center text-sm mb-4">
                <ArrowUp className="w-4 h-4 text-success mr-2" />
                <span className="text-success font-medium">+45.2% YoY</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-success to-success-glow"></div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30 relative overflow-hidden group hover:glow-accent hover:scale-105 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <BarChart3 className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                </div>
                <Badge className="bg-accent/20 text-accent border-accent/30">Margin</Badge>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
                {animatedMargin}%
              </h3>
              <p className="text-sm text-muted-foreground mt-2 mb-4">Gross Margin</p>
              <div className="flex items-center text-sm mb-4">
                <TrendingUp className="w-4 h-4 text-accent mr-2" />
                <span className="text-accent font-medium">+4.2% Improvement</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-accent to-accent-glow"></div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className={`transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Tabs defaultValue="projections" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 glass border-glass-border/30 p-1">
              <TabsTrigger value="projections" className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-lg">
                <LineChart className="w-4 h-4 mr-2" />
                Projections
              </TabsTrigger>
              <TabsTrigger value="scenarios" className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-accent/20 data-[state=active]:text-accent data-[state=active]:shadow-lg">
                <BarChart3 className="w-4 h-4 mr-2" />
                Scenarios
              </TabsTrigger>
              <TabsTrigger value="assumptions" className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-success/20 data-[state=active]:text-success data-[state=active]:shadow-lg">
                <Settings className="w-4 h-4 mr-2" />
                Assumptions
              </TabsTrigger>
              <TabsTrigger value="analytics" className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-warning/20 data-[state=active]:text-warning data-[state=active]:shadow-lg">
                <PieChart className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projections" className="space-y-6">
              {/* 5-Year Projections */}
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle>5-Year Financial Projections</CardTitle>
                  <CardDescription>
                    Detailed year-over-year financial projections with growth trajectories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {yearlyProjections.map((year, index) => (
                      <div key={year.year} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-lg">{year.year}</h4>
                          <div className="flex gap-4 text-sm">
                            <span className="text-primary font-medium">Revenue: {formatCurrency(year.revenue)}</span>
                            <span className="text-destructive font-medium">Expenses: {formatCurrency(year.expenses)}</span>
                            <span className="text-success font-medium">Profit: {formatCurrency(year.profit)}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label className="text-xs text-muted-foreground">Revenue</Label>
                            <Progress value={(year.revenue / 10000000) * 100} className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Expenses</Label>
                            <Progress value={(year.expenses / 10000000) * 100} className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Profit Margin</Label>
                            <Progress value={(year.profit / year.revenue) * 100} className="mt-1" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Current Metrics */}
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle>Current Financial Metrics</CardTitle>
                  <CardDescription>
                    Real-time financial performance indicators with trend analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentMetrics.map((metric, index) => (
                      <div key={index} className="p-4 rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{metric.label}</span>
                          <Badge variant="outline" className="text-xs">
                            {metric.confidence}% confidence
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl font-bold">
                            {metric.unit === '$' ? formatCurrency(metric.value) : `${metric.value}${metric.unit}`}
                          </span>
                          <div className={`flex items-center text-sm ${
                            metric.trend === 'up' ? 'text-success' : 
                            metric.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                          }`}>
                            {metric.trend === 'up' ? <ArrowUp className="w-3 h-3 mr-1" /> : 
                             metric.trend === 'down' ? <ArrowDown className="w-3 h-3 mr-1" /> : null}
                            {Math.abs(metric.change)}%
                          </div>
                        </div>
                        <Progress value={metric.confidence} className="h-1" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scenarios" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {scenarios.map((scenario) => (
                  <Card 
                    key={scenario.id} 
                    className={`glass border-glass-border/30 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      selectedScenario === scenario.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedScenario(scenario.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className={`text-${scenario.color}`}>
                          {scenario.name}
                        </CardTitle>
                        <Badge className={`bg-${scenario.color}/20 text-${scenario.color} border-${scenario.color}/30`}>
                          {scenario.probability}% likely
                        </Badge>
                      </div>
                      <CardDescription>{scenario.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Revenue:</span>
                          <span className="font-bold">{formatCurrency(scenario.metrics.revenue)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Profit:</span>
                          <span className="font-bold">{formatCurrency(scenario.metrics.profit)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Margin:</span>
                          <span className="font-bold">{formatPercentage(scenario.metrics.margins)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Growth:</span>
                          <span className="font-bold">{formatPercentage(scenario.metrics.growth)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedScenarioData && (
                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle>Scenario Details: {selectedScenarioData.name}</CardTitle>
                    <CardDescription>
                      Detailed breakdown and assumptions for the {selectedScenarioData.name.toLowerCase()} scenario
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold">Financial Metrics</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                            <span>Annual Revenue</span>
                            <span className="font-bold text-xl">{formatCurrency(selectedScenarioData.metrics.revenue)}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                            <span>Operating Expenses</span>
                            <span className="font-bold text-xl">{formatCurrency(selectedScenarioData.metrics.expenses)}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                            <span>Net Profit</span>
                            <span className="font-bold text-xl text-success">{formatCurrency(selectedScenarioData.metrics.profit)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-semibold">Key Ratios</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                            <span>Gross Margin</span>
                            <span className="font-bold text-xl">{formatPercentage(selectedScenarioData.metrics.margins)}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                            <span>Growth Rate</span>
                            <span className="font-bold text-xl">{formatPercentage(selectedScenarioData.metrics.growth)}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                            <span>Probability</span>
                            <span className="font-bold text-xl">{selectedScenarioData.probability}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="assumptions" className="space-y-6">
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle>Model Assumptions</CardTitle>
                  <CardDescription>
                    Configure key assumptions for financial projections
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label>Time Horizon: {timeHorizon[0]} years</Label>
                        <Slider
                          value={timeHorizon}
                          onValueChange={setTimeHorizon}
                          max={10}
                          min={1}
                          step={1}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label>Growth Rate: {growthRate[0]}%</Label>
                        <Slider
                          value={growthRate}
                          onValueChange={setGrowthRate}
                          max={50}
                          min={0}
                          step={1}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Include Inflation</Label>
                        <Switch checked={includeInflation} onCheckedChange={setIncludeInflation} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Discount Rate (%)</Label>
                        <Input type="number" defaultValue="12" />
                      </div>
                      <div className="space-y-2">
                        <Label>Tax Rate (%)</Label>
                        <Input type="number" defaultValue="25" />
                      </div>
                      <div className="space-y-2">
                        <Label>Inflation Rate (%)</Label>
                        <Input type="number" defaultValue="2.5" disabled={!includeInflation} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle>Sensitivity Analysis</CardTitle>
                    <CardDescription>Impact of key variables on financial outcomes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">Sensitivity analysis coming soon...</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle>Risk Assessment</CardTitle>
                    <CardDescription>Financial risk factors and mitigation strategies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-muted-foreground">Risk analysis coming soon...</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Actions */}
        <Card className="glass border-glass-border/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Model Actions</h3>
                <p className="text-sm text-muted-foreground">Manage your financial projection model</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Model
                </Button>
                <Button variant="outline" size="sm">
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Export to Excel
                </Button>
                <Button size="sm">
                  <Play className="w-4 h-4 mr-2" />
                  Run Simulation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
