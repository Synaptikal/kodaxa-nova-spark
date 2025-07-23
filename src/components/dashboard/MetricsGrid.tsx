import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, TrendingUp, DollarSign, Users, Target } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
}

function MetricCard({ title, value, change, changeType, icon: Icon }: MetricCardProps) {
  const changeColor = changeType === "positive" ? "text-success" : 
                     changeType === "negative" ? "text-destructive" : "text-muted-foreground";
  
  const ChangeIcon = changeType === "positive" ? ArrowUpIcon : 
                    changeType === "negative" ? ArrowDownIcon : TrendingUp;

  return (
    <Card className="glass border-glass-border/30 hover:border-primary/25 hover:shadow-hover transition-all duration-300 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-muted-foreground/90 transition-colors">{title}</CardTitle>
        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
          <Icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary/90 transition-colors">{value}</div>
        <div className={`flex items-center text-xs ${changeColor} font-medium`}>
          <ChangeIcon className="h-3 w-3 mr-1.5" />
          {change}
        </div>
      </CardContent>
    </Card>
  );
}

export function MetricsGrid() {
  const metrics = [
    {
      title: "Enterprise Pipeline Value",
      value: "$47.8M",
      change: "+23.7% from last quarter",
      changeType: "positive" as const,
      icon: Target,
    },
    {
      title: "Monthly Recurring Revenue",
      value: "$3.2M",
      change: "+12.4% from last month",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Active Enterprise Clients",
      value: "847",
      change: "+156 new accounts",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "AI Model Accuracy",
      value: "94.7%",
      change: "+2.1% optimization gain",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}