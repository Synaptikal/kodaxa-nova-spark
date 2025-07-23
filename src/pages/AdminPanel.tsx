import { Layout } from "@/components/common/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Users, 
  Database, 
  Activity, 
  Shield, 
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from "lucide-react";

export default function AdminPanel() {
  const systemStats = [
    { label: "Total Users", value: "1,247", change: "+12%", icon: Users },
    { label: "Active Sessions", value: "89", change: "+5%", icon: Activity },
    { label: "Data Storage", value: "2.4TB", change: "+18%", icon: Database },
    { label: "API Calls/Day", value: "45.2K", change: "+23%", icon: BarChart3 },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "user",
      action: "User registered",
      details: "sarah.johnson@company.com joined Analytics team",
      timestamp: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      type: "system",
      action: "Data backup completed",
      details: "Daily backup of 2.4TB completed successfully",
      timestamp: "1 hour ago",
      status: "success",
    },
    {
      id: 3,
      type: "security",
      action: "Failed login attempt",
      details: "Multiple failed attempts from IP 192.168.1.100",
      timestamp: "2 hours ago",
      status: "warning",
    },
    {
      id: 4,
      type: "system",
      action: "API rate limit reached",
      details: "External data provider rate limit hit, retrying...",
      timestamp: "3 hours ago",
      status: "error",
    },
  ];

  const managementCards = [
    {
      title: "User Management",
      description: "Manage user accounts, roles, and permissions",
      icon: Users,
      stats: "1,247 users",
      actions: ["Add User", "Bulk Import", "Export List"],
    },
    {
      title: "System Settings",
      description: "Configure system parameters and integrations",
      icon: Settings,
      stats: "12 integrations",
      actions: ["API Keys", "Webhooks", "Backup"],
    },
    {
      title: "Security Center",
      description: "Monitor security events and manage access",
      icon: Shield,
      stats: "3 alerts",
      actions: ["View Logs", "MFA Setup", "Audit Trail"],
    },
    {
      title: "Data Management",
      description: "Manage datasets, exports, and data quality",
      icon: Database,
      stats: "2.4TB stored",
      actions: ["Export Data", "Clean Data", "Sync Sources"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-success";
      case "warning": return "text-warning";
      case "error": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return CheckCircle;
      case "warning": return AlertTriangle;
      case "error": return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <Layout title="Admin Panel">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-glow to-warning-glow bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-muted-foreground mt-2">
              System administration and management console
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {systemStats.map((stat, index) => (
            <Card key={index} className="glass border-glass-border/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-success">{stat.change} from last month</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Management Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {managementCards.map((card, index) => (
                <Card key={index} className="glass border-glass-border/30 hover:border-primary/20 transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <card.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {card.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {card.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Badge variant="outline" className="text-xs">
                        {card.stats}
                      </Badge>
                      <div className="flex flex-wrap gap-2">
                        {card.actions.map((action, actionIndex) => (
                          <Button key={actionIndex} variant="outline" size="sm" className="text-xs">
                            {action}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  System events and user actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const StatusIcon = getStatusIcon(activity.status);
                    const statusColor = getStatusColor(activity.status);

                    return (
                      <div
                        key={activity.id}
                        className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <StatusIcon className={`w-4 h-4 ${statusColor}`} />
                            <span className="text-sm font-medium">{activity.action}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {activity.type}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mb-2">
                          {activity.details}
                        </p>
                        
                        <p className="text-xs text-muted-foreground">
                          {activity.timestamp}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}