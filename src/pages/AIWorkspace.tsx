import { useState } from "react";
import { Layout } from "@/components/common/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Send, 
  Sparkles, 
  BarChart3, 
  Shield, 
  Users,
  Zap,
  CheckCircle,
  Clock,
  MessageSquare,
  TrendingUp,
  Target,
  DollarSign,
  FileText,
  Play,
  Pause,
  Settings
} from "lucide-react";

interface AIAgent {
  id: string;
  name: string;
  role: string;
  specialization: string;
  avatar: string;
  color: string;
  status: "online" | "thinking" | "offline";
  confidence: number;
  tasksCompleted: number;
}

interface AgentMessage {
  id: number;
  agentId: string;
  message: string;
  timestamp: string;
  confidence?: number;
  type: "analysis" | "recommendation" | "question" | "consensus";
}

export default function AIWorkspace() {
  const [selectedAgent, setSelectedAgent] = useState<string>("quorum");
  const [inputMessage, setInputMessage] = useState("");

  const aiAgents: AIAgent[] = [
    {
      id: "analyst",
      name: "Marcus",
      role: "Business Analyst",
      specialization: "Market analysis, financial modeling, competitive intelligence",
      avatar: "MA",
      color: "primary",
      status: "online",
      confidence: 94,
      tasksCompleted: 247
    },
    {
      id: "strategist",
      name: "Sophia",
      role: "Strategic Advisor",
      specialization: "Growth strategy, market positioning, risk assessment",
      avatar: "SA",
      color: "accent",
      status: "thinking",
      confidence: 89,
      tasksCompleted: 198
    },
    {
      id: "ip-expert",
      name: "Victor",
      role: "IP Specialist",
      specialization: "Patent analysis, trademark strategy, IP risk assessment",
      avatar: "VE",
      color: "success",
      status: "online",
      confidence: 96,
      tasksCompleted: 156
    },
    {
      id: "data-scientist",
      name: "Luna",
      role: "Data Scientist",
      specialization: "Predictive modeling, customer analytics, data insights",
      avatar: "LD",
      color: "warning",
      status: "online",
      confidence: 92,
      tasksCompleted: 289
    },
    {
      id: "financial-advisor",
      name: "Alexander",
      role: "Financial Advisor",
      specialization: "Financial planning, investment analysis, valuation",
      avatar: "AF",
      color: "destructive",
      status: "online",
      confidence: 88,
      tasksCompleted: 167
    }
  ];

  const quorumMessages: AgentMessage[] = [
    {
      id: 1,
      agentId: "analyst",
      message: "Based on Q4 data analysis, I'm seeing strong market momentum. Revenue trends show 23% quarter-over-quarter growth with enterprise segment leading adoption.",
      timestamp: "10:30 AM",
      confidence: 94,
      type: "analysis"
    },
    {
      id: 2,
      agentId: "strategist",
      message: "Marcus's analysis aligns with my strategic assessment. I recommend doubling down on enterprise sales while maintaining SMB growth. Market timing is optimal for expansion.",
      timestamp: "10:32 AM",
      confidence: 89,
      type: "recommendation"
    },
    {
      id: 3,
      agentId: "data-scientist",
      message: "My predictive models support this consensus. Customer lifetime value in enterprise segment is 3.2x higher than SMB. Churn prediction shows 94% retention probability.",
      timestamp: "10:33 AM",
      confidence: 92,
      type: "analysis"
    },
    {
      id: 4,
      agentId: "financial-advisor",
      message: "From a financial perspective, enterprise focus will improve unit economics significantly. I project 40% improvement in gross margins by Q2 2025.",
      timestamp: "10:35 AM",
      confidence: 88,
      type: "analysis"
    },
    {
      id: 5,
      agentId: "ip-expert",
      message: "Before scaling, we should file additional patents for our enterprise features. I've identified 3 key innovations that need IP protection.",
      timestamp: "10:36 AM",
      confidence: 96,
      type: "recommendation"
    },
    {
      id: 6,
      agentId: "quorum",
      message: "CONSENSUS REACHED: Focus on enterprise expansion with supporting IP strategy. Confidence level: 91%. Recommended next steps: 1) Scale enterprise sales team, 2) File strategic patents, 3) Optimize pricing for enterprise tier.",
      timestamp: "10:37 AM",
      confidence: 91,
      type: "consensus"
    }
  ];

  const activeTasks = [
    {
      id: 1,
      title: "Q1 2025 Market Forecast",
      assignedAgents: ["analyst", "data-scientist"],
      progress: 75,
      status: "in-progress",
      deadline: "Tomorrow",
      priority: "high"
    },
    {
      id: 2,
      title: "Competitive Intelligence Report",
      assignedAgents: ["analyst", "strategist"],
      progress: 45,
      status: "in-progress",
      deadline: "3 days",
      priority: "medium"
    },
    {
      id: 3,
      title: "IP Portfolio Review",
      assignedAgents: ["ip-expert"],
      progress: 90,
      status: "review",
      deadline: "1 day",
      priority: "high"
    },
    {
      id: 4,
      title: "Customer Segmentation Analysis",
      assignedAgents: ["data-scientist", "strategist"],
      progress: 30,
      status: "in-progress",
      deadline: "1 week",
      priority: "low"
    }
  ];

  const getAgent = (agentId: string) => aiAgents.find(agent => agent.id === agentId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-success text-success-foreground";
      case "thinking": return "bg-warning text-warning-foreground";
      case "offline": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Here you would normally send the message to the AI system
      console.log("Sending message:", inputMessage, "to:", selectedAgent);
      setInputMessage("");
    }
  };

  return (
    <Layout title="AI Quorum Workspace">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-glow to-primary-glow bg-clip-text text-transparent">
              AI Quorum Workspace
            </h1>
            <p className="text-muted-foreground mt-2">
              Collaborate with specialized AI agents for comprehensive business intelligence
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Export Session
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Configure Agents
            </Button>
          </div>
        </div>

        <Tabs defaultValue="quorum" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quorum">AI Quorum</TabsTrigger>
            <TabsTrigger value="agents">Individual Agents</TabsTrigger>
            <TabsTrigger value="tasks">Active Tasks</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="quorum" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Agent Status Panel */}
              <div className="lg:col-span-1">
                <Card className="glass border-glass-border/30">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-accent" />
                      Quorum Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {aiAgents.map((agent) => (
                      <div key={agent.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className={`bg-${agent.color} text-${agent.color}-foreground text-xs font-bold`}>
                            {agent.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{agent.name}</p>
                          <div className="flex items-center space-x-2">
                            <Badge className={`${getStatusColor(agent.status)} text-xs`}>
                              {agent.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{agent.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Main Chat Interface */}
              <div className="lg:col-span-3">
                <Card className="glass border-glass-border/30 h-[600px] flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Brain className="w-5 h-5 text-accent" />
                        <CardTitle>AI Quorum Discussion</CardTitle>
                        <Badge className="bg-accent/20 text-accent border-accent/30">
                          <Zap className="w-3 h-3 mr-1" />
                          All Agents Active
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Pause className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>
                      Multi-agent collaboration for comprehensive business analysis
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    {/* Messages */}
                    <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                      {quorumMessages.map((message) => {
                        const agent = getAgent(message.agentId);
                        const isConsensus = message.type === "consensus";
                        
                        return (
                          <div
                            key={message.id}
                            className={`flex items-start space-x-3 p-3 rounded-lg ${
                              isConsensus 
                                ? "bg-gradient-accent text-accent-foreground" 
                                : "bg-muted/30"
                            }`}
                          >
                            {!isConsensus ? (
                              <Avatar className="w-8 h-8 flex-shrink-0">
                                <AvatarFallback className={`bg-${agent?.color} text-${agent?.color}-foreground text-xs font-bold`}>
                                  {agent?.avatar}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-accent-glow flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-4 h-4 text-accent-foreground" />
                              </div>
                            )}
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-sm">
                                  {isConsensus ? "AI Quorum" : agent?.name}
                                </span>
                                <span className="text-xs opacity-70">{message.timestamp}</span>
                                {message.confidence && (
                                  <Badge variant="outline" className="text-xs">
                                    {message.confidence}% confidence
                                  </Badge>
                                )}
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    message.type === "consensus" ? "border-accent-glow" : ""
                                  }`}
                                >
                                  {message.type}
                                </Badge>
                              </div>
                              <p className="text-sm">{message.message}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Input */}
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Ask the AI quorum about your business strategy, analysis, or decisions..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiAgents.map((agent) => (
                <Card key={agent.id} className="glass border-glass-border/30 hover:border-primary/20 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className={`bg-${agent.color} text-${agent.color}-foreground font-bold`}>
                          {agent.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {agent.name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {agent.role}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        {agent.specialization}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Confidence:</span>
                          <div className="flex items-center space-x-2 mt-1">
                            <Progress value={agent.confidence} className="flex-1" />
                            <span className="font-medium">{agent.confidence}%</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Tasks:</span>
                          <p className="font-bold text-lg">{agent.tasksCompleted}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Chat
                        </Button>
                        <Button size="sm" className="flex-1">
                          <Settings className="w-4 h-4 mr-1" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <div className="space-y-4">
              {activeTasks.map((task) => (
                <Card key={task.id} className="glass border-glass-border/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{task.title}</h3>
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority} priority
                          </Badge>
                          <Badge variant="outline">
                            {task.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Due: {task.deadline}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <span>Agents:</span>
                            <div className="flex space-x-1">
                              {task.assignedAgents.map(agentId => {
                                const agent = getAgent(agentId);
                                return agent ? (
                                  <Avatar key={agentId} className="w-5 h-5">
                                    <AvatarFallback className={`bg-${agent.color} text-${agent.color}-foreground text-xs`}>
                                      {agent.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                ) : null;
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold mb-1">{task.progress}%</div>
                        <Progress value={task.progress} className="w-24" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-success" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                      <p className="text-sm font-medium text-success">Market Opportunity</p>
                      <p className="text-sm text-muted-foreground">AI consensus shows 23% growth potential in Q1</p>
                    </div>
                    <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                      <p className="text-sm font-medium text-accent">Strategic Recommendation</p>
                      <p className="text-sm text-muted-foreground">Focus enterprise expansion with IP protection</p>
                    </div>
                    <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                      <p className="text-sm font-medium text-warning">Risk Assessment</p>
                      <p className="text-sm text-muted-foreground">Competitive pressure increasing in Q2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                    Consensus Confidence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Overall Consensus</span>
                        <span className="font-bold">91%</span>
                      </div>
                      <Progress value={91} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Strategic Alignment</span>
                        <span className="font-bold">89%</span>
                      </div>
                      <Progress value={89} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Data Confidence</span>
                        <span className="font-bold">94%</span>
                      </div>
                      <Progress value={94} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}