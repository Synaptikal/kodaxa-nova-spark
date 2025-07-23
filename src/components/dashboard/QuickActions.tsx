import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  PlusCircle, 
  BarChart3, 
  FileText, 
  Shield, 
  Brain,
  Download,
  Upload,
  Settings
} from "lucide-react";

export function QuickActions() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAction = (actionType: string, description: string, route?: string) => {
    if (route) {
      navigate(route);
    } else {
      toast({
        title: `${actionType} Initiated`,
        description: description,
      });
    }
  };

  const actions = [
    {
      icon: BarChart3,
      label: "New Analysis",
      description: "Create market sizing or financial model",
      variant: "default" as const,
      action: () => handleAction("New Analysis", "Redirecting to Business Foundry for analysis creation", "/foundry"),
    },
    {
      icon: Brain,
      label: "Ask AI",
      description: "Get insights from your data",
      variant: "secondary" as const,
      action: () => handleAction("AI Workspace", "Opening AI Quorum for intelligent insights", "/ai"),
    },
    {
      icon: Shield,
      label: "File Patent",
      description: "Submit new IP application",
      variant: "outline" as const,
      action: () => handleAction("IP Filing", "Opening IP Fortress for patent management", "/ip"),
    },
    {
      icon: FileText,
      label: "Generate Report",
      description: "Export analytics to PDF",
      variant: "outline" as const,
      action: () => handleAction("Report Generation", "Preparing comprehensive analytics report for download"),
    },
    {
      icon: Upload,
      label: "Import Data",
      description: "Upload financial or market data",
      variant: "ghost" as const,
      action: () => handleAction("Data Import", "File upload dialog would open for data ingestion"),
    },
    {
      icon: Settings,
      label: "Configure",
      description: "Manage integrations and settings",
      variant: "ghost" as const,
      action: () => handleAction("System Configuration", "Opening administrative settings panel", "/settings"),
    },
  ];

  return (
    <Card className="glass border-glass-border/30">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <PlusCircle className="w-5 h-5 mr-2 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              onClick={action.action}
              className={`h-auto p-4 flex flex-col items-start text-left transition-all duration-200 hover:scale-105 ${
                action.variant === "default" 
                  ? "bg-gradient-primary hover:shadow-glow" 
                  : "hover:bg-muted/50"
              }`}
            >
              <action.icon className="w-5 h-5 mb-2" />
              <div>
                <div className="font-medium text-sm">{action.label}</div>
                <div className="text-xs opacity-70 mt-1">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}