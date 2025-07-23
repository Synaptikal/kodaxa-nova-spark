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
      title: "Enterprise Market Analysis Completed",
      description: "Total Addressable Market assessment for North American enterprise SaaS segment completed with 96% confidence. Identified $127M opportunity.",
      timestamp: "8 minutes ago",
      status: "completed",
      user: "Dr. Sarah Chen",
    },
    {
      id: 2,
      type: "ai",
      title: "Strategic AI Recommendation Generated",
      description: "Machine learning models identified optimal market entry timing for Q2 2025 with 89% probability of success. Revenue projection: $24M.",
      timestamp: "42 minutes ago",
      status: "info",
      user: "AI Strategic Advisor",
    },
    {
      id: 3,
      type: "ip",
      title: "Patent Portfolio Update",
      description: "USPTO application #US20240789456 approved for \"Predictive Analytics Engine\". Portfolio value increased by $3.2M.",
      timestamp: "2 hours ago",
      status: "completed",
      user: "Legal Counsel",
    },
    {
      id: 4,
      type: "user",
      title: "Executive Team Member Onboarded",
      description: "Michael Rodriguez joined as VP of Strategic Operations. Security clearance approved, system access provisioned.",
      timestamp: "4 hours ago",
      status: "info",
      user: "Security Admin",
    },
    {
      id: 5,
      type: "system",
      title: "Data Pipeline Health Alert",
      description: "Bloomberg Terminal API experiencing intermittent latency. Failover to Refinitiv activated. Data integrity maintained at 99.7%.",
      timestamp: "6 hours ago",
      status: "warning",
      user: "System Monitor",
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
    <Card className="glass border-glass-border/30 hover:shadow-hover transition-all duration-300">
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
                className="flex items-start space-x-3 p-4 rounded-xl hover:bg-muted/25 hover:border hover:border-primary/15 transition-all duration-300 cursor-pointer group relative"
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