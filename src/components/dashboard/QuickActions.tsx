import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  const actions = [
    {
      icon: BarChart3,
      label: "New Analysis",
      description: "Create market sizing or financial model",
      variant: "default" as const,
    },
    {
      icon: Brain,
      label: "Ask AI",
      description: "Get insights from your data",
      variant: "secondary" as const,
    },
    {
      icon: Shield,
      label: "File Patent",
      description: "Submit new IP application",
      variant: "outline" as const,
    },
    {
      icon: FileText,
      label: "Generate Report",
      description: "Export analytics to PDF",
      variant: "outline" as const,
    },
    {
      icon: Upload,
      label: "Import Data",
      description: "Upload financial or market data",
      variant: "ghost" as const,
    },
    {
      icon: Settings,
      label: "Configure",
      description: "Manage integrations and settings",
      variant: "ghost" as const,
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
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
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