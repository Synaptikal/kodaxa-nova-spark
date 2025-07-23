import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, ArrowRight, Clock } from "lucide-react";

export function AIInsightsCard() {
  const insights = [
    {
      id: 1,
      title: "Market Opportunity Detected",
      description: "AI identified a 15% growth opportunity in the enterprise segment based on competitor analysis.",
      confidence: 94,
      priority: "high",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title: "Patent Risk Assessment",
      description: "Potential IP conflict detected with USPTO filing #12847. Recommend legal review.",
      confidence: 87,
      priority: "medium",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      title: "Revenue Forecast Update",
      description: "Q4 projections updated based on recent market trends. 8% increase expected.",
      confidence: 91,
      priority: "low",
      timestamp: "1 day ago",
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
    <Card className="glass border-glass-border/30">
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
              className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
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