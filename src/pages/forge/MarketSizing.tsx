import { Layout } from "@/components/common/Layout";
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
  Play,
  Globe,
  Calculator
} from "lucide-react";
import { useState, useEffect } from "react";

// Animated Counter Hook
const useAnimatedCounter = (end: number, duration: number = 2000) => {
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
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  
  return count;
};

export default function MarketSizing() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
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

  // Animated values
  const tamTotal = useAnimatedCounter(240, 3000);
  const samTotal = useAnimatedCounter(48, 3000);
  const somTotal = useAnimatedCounter(48, 3000);

  return (
    <Layout title="Market Sizing Analysis">
      <div className="space-y-6">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Globe className="w-8 h-8 text-primary animate-pulse" />
                <div className="absolute inset-0 w-8 h-8 bg-primary/20 rounded-full animate-ping" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-glow via-accent-glow to-success-glow bg-clip-text text-transparent">
                Market Sizing Analysis
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              TAM/SAM/SOM analysis with AI-powered market intelligence and real-time validation
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Calculator className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                Multi-Scenario
              </Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="glass border-glass-border/30 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group">
              <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Export Model
            </Button>
            <Button variant="outline" className="glass border-glass-border/30 hover:bg-accent/10 hover:border-accent/30 transition-all duration-300 group">
              <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Refresh Data
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent-glow transition-all duration-300 shadow-lg hover:shadow-xl group">
              <Settings className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Configure
            </Button>
          </div>
        </div>

        {/* Overview Cards with HUD styling */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Card className="glass border-glass-border/30 relative overflow-hidden group hover:glow-primary hover:scale-105 transition-all duration-500">
            <div 
              className="absolute inset-0 opacity-5 bg-cover bg-center transition-opacity duration-500 group-hover:opacity-10"
              style={{ backgroundImage: `url(${circuitPattern})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Target className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/30 glow-primary">TAM</Badge>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                ${tamTotal}B
              </h3>
              <p className="text-sm text-muted-foreground mt-2 mb-4">Total Addressable Market</p>
              <div className="flex items-center text-sm mb-4">
                <TrendingUp className="w-4 h-4 text-success mr-2" />
                <span className="text-success font-medium">+12.4% CAGR</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary to-primary-glow"></div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30 relative overflow-hidden group hover:glow-accent hover:scale-105 transition-all duration-500">
            <div 
              className="absolute inset-0 opacity-5 bg-cover bg-center transition-opacity duration-500 group-hover:opacity-10"
              style={{ backgroundImage: `url(${circuitPattern})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <BarChart3 className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                </div>
                <Badge className="bg-accent/20 text-accent border-accent/30">SAM</Badge>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent">
                ${samTotal}M
              </h3>
              <p className="text-sm text-muted-foreground mt-2 mb-4">Serviceable Addressable Market</p>
              <div className="flex items-center text-sm mb-4">
                <Activity className="w-4 h-4 text-warning mr-2" />
                <span className="text-warning font-medium">20% of TAM</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-accent to-accent-glow"></div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30 relative overflow-hidden group hover:glow-accent hover:scale-105 transition-all duration-500">
            <div 
              className="absolute inset-0 opacity-5 bg-cover bg-center transition-opacity duration-500 group-hover:opacity-10"
              style={{ backgroundImage: `url(${circuitPattern})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="relative">
                  <Zap className="w-10 h-10 text-success group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-success/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
                </div>
                <Badge className="bg-success/20 text-success border-success/30">SOM</Badge>
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-success to-success-glow bg-clip-text text-transparent">
                ${somTotal}M
              </h3>
              <p className="text-sm text-muted-foreground mt-2 mb-4">Serviceable Obtainable Market</p>
              <div className="flex items-center text-sm mb-4">
                <Target className="w-4 h-4 text-success mr-2" />
                <span className="text-success font-medium">5-year target</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-success to-success-glow"></div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <div className={`transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Tabs defaultValue="tam" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 glass border-glass-border/30 p-1">
              <TabsTrigger 
                value="tam" 
                className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-lg group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300" />
                <Target className="w-4 h-4 mr-2" />
                <span className="relative z-10">TAM Analysis</span>
              </TabsTrigger>
              <TabsTrigger 
                value="sam" 
                className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-accent/20 data-[state=active]:text-accent data-[state=active]:shadow-lg group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-success/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300" />
                <BarChart3 className="w-4 h-4 mr-2" />
                <span className="relative z-10">SAM Breakdown</span>
              </TabsTrigger>
              <TabsTrigger 
                value="som" 
                className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-success/20 data-[state=active]:text-success data-[state=active]:shadow-lg group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-success/10 to-warning/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300" />
                <Zap className="w-4 h-4 mr-2" />
                <span className="relative z-10">SOM Projection</span>
              </TabsTrigger>
              <TabsTrigger 
                value="scenarios" 
                className="relative overflow-hidden transition-all duration-300 data-[state=active]:bg-warning/20 data-[state=active]:text-warning data-[state=active]:shadow-lg group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-warning/10 to-primary/10 opacity-0 group-data-[state=active]:opacity-100 transition-opacity duration-300" />
                <Activity className="w-4 h-4 mr-2" />
                <span className="relative z-10">Scenarios</span>
              </TabsTrigger>
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
        </div>

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
    </Layout>
  );
}