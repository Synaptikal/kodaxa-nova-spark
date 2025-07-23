import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  DollarSign, 
  TrendingUp, 
  Calculator,
  LineChart,
  PieChart,
  BarChart,
  Download,
  Save,
  Play,
  RefreshCw,
  Settings
} from "lucide-react";

export default function FinancialProjections() {
  const projectionData = {
    revenue: [
      { year: "Y1", value: 500000, growth: 0 },
      { year: "Y2", value: 1200000, growth: 140 },
      { year: "Y3", value: 2800000, growth: 133 },
      { year: "Y4", value: 5600000, growth: 100 },
      { year: "Y5", value: 9800000, growth: 75 }
    ],
    costs: [
      { year: "Y1", cogs: 150000, opex: 800000, total: 950000 },
      { year: "Y2", cogs: 360000, opex: 1400000, total: 1760000 },
      { year: "Y3", cogs: 840000, opex: 2200000, total: 3040000 },
      { year: "Y4", cogs: 1680000, opex: 3500000, total: 5180000 },
      { year: "Y5", cogs: 2940000, opex: 5400000, total: 8340000 }
    ]
  };

  const scenarios = [
    {
      name: "Base Case",
      confidence: 85,
      arr: 9800000,
      ebitda: 1460000,
      valuation: 98000000,
      color: "primary"
    },
    {
      name: "Optimistic",
      confidence: 70,
      arr: 14700000,
      ebitda: 3675000,
      valuation: 147000000,
      color: "success"
    },
    {
      name: "Conservative",
      confidence: 90,
      arr: 6860000,
      ebitda: 343000,
      valuation: 68600000,
      color: "warning"
    }
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-glow to-success-glow bg-clip-text text-transparent">
              Financial Projections
            </h1>
            <p className="text-muted-foreground mt-2">
              Multi-scenario financial modeling with AI-powered validation
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Model
            </Button>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Recalculate
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Model
            </Button>
          </div>
        </div>

        {/* Scenario Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((scenario, index) => (
            <Card key={index} className="glass border-glass-border/30 hover:border-primary/20 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{scenario.name}</CardTitle>
                  <Badge className={`bg-${scenario.color}/20 text-${scenario.color}`}>
                    {scenario.confidence}% confidence
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">5Y ARR:</span>
                    <span className="font-bold">{formatCurrency(scenario.arr)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">EBITDA:</span>
                    <span className="font-bold">{formatCurrency(scenario.ebitda)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Valuation:</span>
                    <span className="font-bold">{formatCurrency(scenario.valuation)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Projections */}
        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="costs">Costs</TabsTrigger>
            <TabsTrigger value="profitability">P&L</TabsTrigger>
            <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
            <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-4">
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="w-5 h-5 mr-2 text-primary" />
                  Revenue Projections
                </CardTitle>
                <CardDescription>
                  5-year revenue forecast with growth assumptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectionData.revenue.map((year, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                          <span className="text-primary-foreground font-bold">{year.year}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{formatCurrency(year.value)}</h4>
                          <p className="text-sm text-muted-foreground">Annual Revenue</p>
                        </div>
                      </div>
                      {year.growth > 0 && (
                        <Badge className="bg-success/20 text-success">
                          +{year.growth}% YoY
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs" className="space-y-4">
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-accent" />
                  Cost Structure
                </CardTitle>
                <CardDescription>
                  Operating expenses and cost of goods sold breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectionData.costs.map((year, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">Year {index + 1}</h4>
                        <span className="text-lg font-bold">{formatCurrency(year.total)}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">COGS:</span>
                          <span className="font-medium">{formatCurrency(year.cogs)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">OpEx:</span>
                          <span className="font-medium">{formatCurrency(year.opex)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assumptions" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle>Revenue Assumptions</CardTitle>
                  <CardDescription>Key drivers for revenue projections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerGrowth">Customer Growth Rate (%)</Label>
                    <Input id="customerGrowth" defaultValue="25" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="averageRevenue">Average Revenue per Customer</Label>
                    <Input id="averageRevenue" defaultValue="2400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="churnRate">Monthly Churn Rate (%)</Label>
                    <Input id="churnRate" defaultValue="3.5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricingModel">Pricing Model</Label>
                    <Select defaultValue="subscription">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="subscription">Subscription</SelectItem>
                        <SelectItem value="usage">Usage-based</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle>Cost Assumptions</CardTitle>
                  <CardDescription>Operating cost parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cogsMargin">COGS as % of Revenue</Label>
                    <Input id="cogsMargin" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salesTeam">Sales Team Size</Label>
                    <Input id="salesTeam" defaultValue="15" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marketingSpend">Marketing Spend (% of Revenue)</Label>
                    <Input id="marketingSpend" defaultValue="25" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rdSpend">R&D Spend (% of Revenue)</Label>
                    <Input id="rdSpend" defaultValue="20" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="glass border-glass-border/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">Model Actions</h3>
                    <p className="text-sm text-muted-foreground">Update and validate your financial model</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      <Calculator className="w-4 h-4 mr-2" />
                      Validate Assumptions
                    </Button>
                    <Button size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Run Monte Carlo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}