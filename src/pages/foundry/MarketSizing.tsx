import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import circuitPattern from "@/assets/circuit-pattern.jpg";
import { 
  Target, 
  TrendingUp, 
  BarChart3,
  Activity,
  Zap,
  Download,
  Settings,
  RefreshCw,
  Edit,
  Copy,
  Play
} from "lucide-react";

export default function MarketSizing() {
  const tamData = {
    total: 2400000000,
    segments: [
      { name: "Enterprise", value: 1200000000, growth: 15.3 },
      { name: "Mid-Market", value: 720000000, growth: 12.8 },
      { name: "SMB", value: 480000000, growth: 8.2 }
    ]
  };

  const samData = {
    total: 480000000,
    regions: [
      { name: "North America", value: 240000000, share: 50 },
      { name: "Europe", value: 144000000, share: 30 },
      { name: "APAC", value: 96000000, share: 20 }
    ]
  };

  const somData = {
    total: 48000000,
    timeline: [
      { year: "Y1", value: 2400000, growth: 0 },
      { year: "Y2", value: 7200000, growth: 200 },
      { year: "Y3", value: 16800000, growth: 133 },
      { year: "Y4", value: 33600000, growth: 100 },
      { year: "Y5", value: 48000000, growth: 43 }
    ]
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)}B`;
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-glow to-accent-glow bg-clip-text text-transparent">
              Market Sizing Analysis
            </h1>
            <p className="text-muted-foreground mt-2">
              TAM/SAM/SOM analysis with AI-powered market intelligence
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Model
            </Button>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
            <Button>
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
        </div>

        {/* Overview Cards with HUD styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass border-glass-border/30 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
            <div 
              className="absolute inset-0 opacity-5 bg-cover bg-center"
              style={{ backgroundImage: `url(${circuitPattern})` }}
            />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Target className="w-8 h-8 text-primary group-hover:text-primary-glow transition-colors" />
                <Badge className="bg-primary/20 text-primary border-primary/30 glow-primary">TAM</Badge>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">{formatCurrency(tamData.total)}</h3>
              <p className="text-sm text-muted-foreground mt-1">Total Addressable Market</p>
              <div className="mt-4 flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-success mr-1" />
                <span className="text-success font-medium">+12.4% CAGR</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-primary"></div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-8 h-8 text-accent" />
                <Badge className="bg-accent/20 text-accent">SAM</Badge>
              </div>
              <h3 className="text-2xl font-bold">{formatCurrency(samData.total)}</h3>
              <p className="text-sm text-muted-foreground mt-1">Serviceable Addressable Market</p>
              <div className="mt-4 flex items-center text-sm">
                <Activity className="w-4 h-4 text-warning mr-1" />
                <span className="text-warning">20% of TAM</span>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Zap className="w-8 h-8 text-success" />
                <Badge className="bg-success/20 text-success">SOM</Badge>
              </div>
              <h3 className="text-2xl font-bold">{formatCurrency(somData.total)}</h3>
              <p className="text-sm text-muted-foreground mt-1">Serviceable Obtainable Market</p>
              <div className="mt-4 flex items-center text-sm">
                <Target className="w-4 h-4 text-success mr-1" />
                <span className="text-success">5-year target</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <Tabs defaultValue="tam" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tam">TAM Analysis</TabsTrigger>
            <TabsTrigger value="sam">SAM Breakdown</TabsTrigger>
            <TabsTrigger value="som">SOM Projection</TabsTrigger>
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          </TabsList>

          <TabsContent value="tam" className="space-y-4">
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle>Total Addressable Market Segments</CardTitle>
                <CardDescription>
                  Market size breakdown by customer segment with growth projections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tamData.segments.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{segment.name}</h4>
                          <span className="text-2xl font-bold">{formatCurrency(segment.value)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Progress value={(segment.value / tamData.total) * 100} className="flex-1 mr-4" />
                          <Badge className="bg-success/20 text-success">
                            +{segment.growth}% growth
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sam" className="space-y-4">
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle>Serviceable Addressable Market by Region</CardTitle>
                <CardDescription>
                  Geographic distribution of addressable market opportunity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {samData.regions.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{region.name}</h4>
                          <span className="text-xl font-bold">{formatCurrency(region.value)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Progress value={region.share} className="flex-1 mr-4" />
                          <Badge variant="outline">
                            {region.share}% share
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="som" className="space-y-4">
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle>5-Year SOM Projection</CardTitle>
                <CardDescription>
                  Realistic market capture timeline with growth assumptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {somData.timeline.map((year, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{year.year}</h4>
                          <span className="text-xl font-bold">{formatCurrency(year.value)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Progress value={(year.value / somData.total) * 100} className="flex-1 mr-4" />
                          {year.growth > 0 && (
                            <Badge className="bg-accent/20 text-accent">
                              +{year.growth}% YoY
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-success">Optimistic</CardTitle>
                  <CardDescription>High growth scenario</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>5Y SOM:</span>
                      <span className="font-bold">{formatCurrency(72000000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Market Share:</span>
                      <span className="font-bold">3.0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Confidence:</span>
                      <Badge className="bg-success/20 text-success">85%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-warning">Realistic</CardTitle>
                  <CardDescription>Base case scenario</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>5Y SOM:</span>
                      <span className="font-bold">{formatCurrency(48000000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Market Share:</span>
                      <span className="font-bold">2.0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Confidence:</span>
                      <Badge className="bg-warning/20 text-warning">92%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="text-destructive">Conservative</CardTitle>
                  <CardDescription>Low growth scenario</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>5Y SOM:</span>
                      <span className="font-bold">{formatCurrency(24000000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Market Share:</span>
                      <span className="font-bold">1.0%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Confidence:</span>
                      <Badge className="bg-destructive/20 text-destructive">78%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <Card className="glass border-glass-border/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Analysis Actions</h3>
                <p className="text-sm text-muted-foreground">Manage your market sizing model</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Assumptions
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Clone Model
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
    </MainLayout>
  );
}