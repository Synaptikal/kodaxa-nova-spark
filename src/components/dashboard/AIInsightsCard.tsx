import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, ArrowRight, Clock } from "lucide-react";

export function AIInsightsCard() {
  const insights = [
    {
      id: 1,
      title: "Strategic M&A Opportunity Identified",
      description: "Machine learning analysis detected a potential acquisition target with 94% strategic alignment. Estimated synergies: $12.3M annually.",
      confidence: 96,
      priority: "high",
      timestamp: "12 minutes ago",
    },
    {
      id: 2,
      title: "Patent Landscape Alert",
      description: "Competitive intelligence flagged 3 similar filings from Acme Corp. Recommend expedited review of claims 7-12 for potential conflicts.",
      confidence: 89,
      priority: "medium",
      timestamp: "2 hours ago",
    },
    {
      id: 3,
      title: "Market Timing Signal Detected",
      description: "Algorithmic trend analysis suggests optimal product launch window in Q2 2025. Market readiness score: 87/100.",
      confidence: 92,
      priority: "low",
      timestamp: "4 hours ago",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="glass border-glass-border/30 hover:shadow-hover transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-accent" />
            <CardTitle className="text-lg">AI Insights</CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="text-accent hover:text-accent-glow">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <CardDescription>
          AI-powered recommendations and alerts for your business
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <div 
              key={insight.id} 
              className="p-4 rounded-xl bg-muted/20 hover:bg-muted/35 border border-transparent hover:border-primary/20 transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-accent group-hover:text-accent-glow transition-colors" />
                  <h4 className="font-medium text-sm">{insight.title}</h4>
                </div>
                <Badge className={`text-xs ${getPriorityColor(insight.priority)}`}>
                  {insight.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {insight.description}
              </p>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-4">
                  <span className="text-muted-foreground">Confidence: {insight.confidence}%</span>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {insight.timestamp}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}