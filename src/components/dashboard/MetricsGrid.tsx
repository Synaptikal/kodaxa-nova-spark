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
    <Card className="glass border-glass-border/30 hover:border-primary/20 transition-all duration-300 group">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-primary group-hover:text-primary-glow transition-colors" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className={`flex items-center text-xs ${changeColor} mt-1`}>
          <ChangeIcon className="h-3 w-3 mr-1" />
          {change}
        </div>
      </CardContent>
    </Card>
  );
}

export function MetricsGrid() {
  const metrics = [
    {
      title: "Total Addressable Market",
      value: "$2.4B",
      change: "+12.5% from last quarter",
      changeType: "positive" as const,
      icon: Target,
    },
    {
      title: "Annual Recurring Revenue",
      value: "$14.2M",
      change: "+8.1% from last month",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Active Users",
      value: "12,845",
      change: "+4.3% from last week",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Growth Rate",
      value: "23.1%",
      change: "-2.4% from target",
      changeType: "negative" as const,
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