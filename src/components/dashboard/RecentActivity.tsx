import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  FileText, 
  Brain, 
  Shield, 
  Users, 
  BarChart3,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

interface ActivityItem {
  id: number;
  type: "analysis" | "ai" | "ip" | "user" | "system";
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "in-progress" | "warning" | "info";
  user?: string;
}

export function RecentActivity() {
  const activities: ActivityItem[] = [
    {
      id: 1,
      type: "analysis",
      title: "Market Analysis Completed",
      description: "TAM/SAM/SOM analysis for Q4 2024 finished with 94% confidence",
      timestamp: "10 minutes ago",
      status: "completed",
      user: "John Doe",
    },
    {
      id: 2,
      type: "ai",
      title: "AI Recommendation Generated",
      description: "New growth opportunities identified in enterprise segment",
      timestamp: "1 hour ago",
      status: "info",
      user: "AI Assistant",
    },
    {
      id: 3,
      type: "ip",
      title: "Patent Filed Successfully",
      description: "USPTO application #12847 submitted for review",
      timestamp: "3 hours ago",
      status: "completed",
      user: "Legal Team",
    },
    {
      id: 4,
      type: "user",
      title: "New Team Member Added",
      description: "Sarah Johnson joined the Analytics team",
      timestamp: "5 hours ago",
      status: "info",
      user: "Admin",
    },
    {
      id: 5,
      type: "system",
      title: "Data Sync Warning",
      description: "External API rate limit reached, retrying in 1 hour",
      timestamp: "6 hours ago",
      status: "warning",
      user: "System",
    },
  ];

  const getIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "analysis": return BarChart3;
      case "ai": return Brain;
      case "ip": return Shield;
      case "user": return Users;
      case "system": return Info;
      default: return FileText;
    }
  };

  const getStatusIcon = (status: ActivityItem["status"]) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "warning": return AlertCircle;
      case "in-progress": return Clock;
      default: return Info;
    }
  };

  const getStatusColor = (status: ActivityItem["status"]) => {
    switch (status) {
      case "completed": return "text-success";
      case "warning": return "text-warning";
      case "in-progress": return "text-accent";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card className="glass border-glass-border/30">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Clock className="w-5 h-5 mr-2 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getIcon(activity.type);
            const StatusIcon = getStatusIcon(activity.status);
            const statusColor = getStatusColor(activity.status);

            return (
              <div 
                key={activity.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer group"
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity.title}
                    </p>
                    <StatusIcon className={`w-4 h-4 ${statusColor} flex-shrink-0 ml-2`} />
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
                    {activity.user && (
                      <Badge variant="outline" className="text-xs">
                        {activity.user}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}