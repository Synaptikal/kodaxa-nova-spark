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
  Settings,
  ShoppingCart,
  ExternalLink
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
      label: "Market Intelligence",
      description: "Generate TAM/SAM analysis",
      variant: "default" as const,
      action: () => handleAction("Market Analysis", "Launching comprehensive market intelligence suite", "/forge"),
    },
    {
      icon: Brain,
      label: "AI Strategy Session",
      description: "Get predictive insights",
      variant: "secondary" as const,
      action: () => handleAction("AI Workspace", "Initializing strategic AI advisory session", "/ai"),
    },
    {
      icon: ShoppingCart,
      label: "Browse Marketplace",
      description: "Discover powerful add-ons",
      variant: "secondary" as const,
      action: () => handleAction("Marketplace", "Opening add-on marketplace for enhanced capabilities", "/add-ons"),
    },
    {
      icon: Shield,
      label: "IP Portfolio Review",
      description: "Patent filing & analysis",
      variant: "outline" as const,
      action: () => handleAction("IP Management", "Accessing intellectual property fortress", "/ip"),
    },
    {
      icon: FileText,
      label: "Executive Summary",
      description: "Export board presentation",
      variant: "outline" as const,
      action: () => handleAction("Report Generation", "Preparing C-suite analytics dashboard"),
    },
    {
      icon: Settings,
      label: "System Administration",
      description: "Configure enterprise settings",
      variant: "ghost" as const,
      action: () => handleAction("Admin Panel", "Accessing enterprise configuration center", "/settings"),
    },
    {
      icon: ExternalLink,
      label: "View Marketing Page",
      description: "See platform overview",
      variant: "ghost" as const,
      action: () => window.open('/landing', '_blank'),
    },
  ];

  return (
    <Card className="glass border-glass-border/30 hover:shadow-hover transition-all duration-300">
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
              className={`h-auto p-4 flex flex-col items-start text-left transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group ${
                action.variant === "default" 
                  ? "bg-gradient-primary hover:shadow-glow border-primary/20" 
                  : "hover:bg-muted/40 hover:border-primary/15 border border-transparent"
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
