import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Send, 
  Sparkles, 
  MessageSquare, 
  FileText, 
  Zap,
  Clock,
  CheckCircle,
  ArrowRight,
  PlusCircle
} from "lucide-react";

export default function AIWorkspace() {
  const chatHistory = [
    {
      id: 1,
      type: "user",
      message: "Analyze our Q4 revenue trends and predict Q1 performance",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      type: "ai",
      message: "Based on your Q4 data, I've identified a 15% growth trend. Your revenue increased from $1.2M in Q3 to $1.38M in Q4. Considering seasonal patterns and market conditions, I predict Q1 2025 revenue will reach $1.45M - $1.52M range.",
      timestamp: "10:31 AM",
      confidence: 94,
    },
    {
      id: 3,
      type: "user",
      message: "What are the key factors driving this growth?",
      timestamp: "10:32 AM",
    },
    {
      id: 4,
      type: "ai",
      message: "Three primary factors: 1) Enterprise client acquisition increased 23%, 2) Customer retention improved to 96%, and 3) Average deal size grew from $8.5K to $11.2K. I recommend focusing on enterprise sales in Q1.",
      timestamp: "10:33 AM",
      confidence: 89,
    },
  ];

  const aiTasks = [
    {
      id: 1,
      title: "Market Analysis Report",
      description: "Generate comprehensive TAM/SAM/SOM analysis",
      status: "completed",
      progress: 100,
      timestamp: "2 hours ago",
      result: "Report generated with 94% confidence",
    },
    {
      id: 2,
      title: "Competitive Intelligence",
      description: "Analyze competitor pricing and positioning",
      status: "in-progress",
      progress: 65,
      timestamp: "30 minutes ago",
      result: "Processing 15 competitors...",
    },
    {
      id: 3,
      title: "Customer Segmentation",
      description: "Identify high-value customer personas",
      status: "queued",
      progress: 0,
      timestamp: "5 minutes ago",
      result: "Waiting for data processing",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground";
      case "in-progress": return "bg-accent text-accent-foreground";
      case "queued": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "in-progress": return Clock;
      case "queued": return Clock;
      default: return Clock;
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-glow to-primary-glow bg-clip-text text-transparent">
              AI Workspace
            </h1>
            <p className="text-muted-foreground mt-2">
              Intelligent analysis, insights, and automation for your business
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Export Chat
            </Button>
            <Button variant="accent">
              <PlusCircle className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Chat */}
          <div className="lg:col-span-2">
            <Card className="glass border-glass-border/30 h-[600px] flex flex-col">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-accent" />
                  <CardTitle>AI Assistant</CardTitle>
                  <Badge className="bg-accent/20 text-accent border-accent/30">
                    <Zap className="w-3 h-3 mr-1" />
                    Online
                  </Badge>
                </div>
                <CardDescription>
                  Ask questions about your data, request analyses, or get strategic recommendations
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* Chat Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                  {chatHistory.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === "user"
                            ? "bg-gradient-primary text-primary-foreground"
                            : "bg-muted/50 text-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                          <span>{message.timestamp}</span>
                          {message.type === "ai" && message.confidence && (
                            <span>Confidence: {message.confidence}%</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask about your business data, request analysis, or get recommendations..."
                    className="flex-1"
                  />
                  <Button size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Tasks */}
          <div className="lg:col-span-1">
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <CardTitle>AI Tasks</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription>
                  Active and queued AI analysis tasks
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {aiTasks.map((task) => {
                    const StatusIcon = getStatusIcon(task.status);
                    return (
                      <div
                        key={task.id}
                        className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{task.title}</h4>
                          <Badge className={`${getStatusColor(task.status)} text-xs`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {task.status}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mb-3">
                          {task.description}
                        </p>
                        
                        {task.status === "in-progress" && (
                          <div className="w-full bg-muted rounded-full h-2 mb-2">
                            <div
                              className="bg-accent h-2 rounded-full transition-all duration-300"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{task.timestamp}</span>
                          <span className="text-foreground">{task.result}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}