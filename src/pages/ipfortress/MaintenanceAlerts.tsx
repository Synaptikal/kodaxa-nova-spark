import React, { useState } from 'react';
import { Layout } from '@/components/common/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Calendar, 
  DollarSign, 
  Bell, 
  CheckCircle, 
  Clock,
  Search,
  Filter,
  Download,
  Settings,
  Eye,
  CreditCard,
  FileText,
  Zap
} from 'lucide-react';

interface MaintenanceAlert {
  id: string;
  patentNumber: string;
  patentTitle: string;
  alertType: 'renewal' | 'fee-due' | 'deadline' | 'expiry-warning' | 'response-due';
  dueDate: string;
  amount?: number;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed' | 'overdue' | 'processing';
  description: string;
  category: string;
  jurisdiction: string;
}

const mockAlerts: MaintenanceAlert[] = [
  {
    id: '1',
    patentNumber: 'US11234567B2',
    patentTitle: 'AI-Powered Document Analysis System',
    alertType: 'renewal',
    dueDate: '2024-04-15',
    amount: 1600,
    priority: 'high',
    status: 'pending',
    description: 'Annual maintenance fee due for patent renewal',
    category: 'Maintenance Fee',
    jurisdiction: 'USPTO'
  },
  {
    id: '2',
    patentNumber: 'US11234568B2', 
    patentTitle: 'Blockchain-Based Identity Verification',
    alertType: 'fee-due',
    dueDate: '2024-03-30',
    amount: 800,
    priority: 'high',
    status: 'overdue',
    description: 'Examination fee payment required - OVERDUE',
    category: 'Examination Fee',
    jurisdiction: 'USPTO'
  },
  {
    id: '3',
    patentNumber: 'EP3456789B1',
    patentTitle: 'Machine Learning Data Pipeline',
    alertType: 'response-due',
    dueDate: '2024-04-10',
    priority: 'medium',
    status: 'pending',
    description: 'Office action response due - 6 months deadline',
    category: 'Office Action',
    jurisdiction: 'EPO'
  },
  {
    id: '4',
    patentNumber: 'US11234569B2',
    patentTitle: 'Distributed Computing Framework',
    alertType: 'expiry-warning',
    dueDate: '2025-01-20',
    priority: 'low',
    status: 'pending',
    description: 'Patent will expire in 10 months - consider renewal',
    category: 'Expiry Warning',
    jurisdiction: 'USPTO'
  },
  {
    id: '5',
    patentNumber: 'JP6789123B2',
    patentTitle: 'Quantum Encryption Protocol',
    alertType: 'renewal',
    dueDate: '2024-03-28',
    amount: 2400,
    priority: 'high',
    status: 'processing',
    description: 'Renewal fee payment being processed',
    category: 'Maintenance Fee',
    jurisdiction: 'JPO'
  }
];

export default function MaintenanceAlerts() {
  const [alerts] = useState<MaintenanceAlert[]>(mockAlerts);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'renewal': return <Calendar className="w-5 h-5 text-primary" />;
      case 'fee-due': return <DollarSign className="w-5 h-5 text-warning" />;
      case 'deadline': return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'response-due': return <FileText className="w-5 h-5 text-accent" />;
      case 'expiry-warning': return <Bell className="w-5 h-5 text-muted-foreground" />;
      default: return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'low': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-primary/20 text-primary border-primary/30';
      case 'completed': return 'bg-success/20 text-success border-success/30';
      case 'overdue': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'processing': return 'bg-accent/20 text-accent border-accent/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyLevel = (days: number) => {
    if (days < 0) return { level: 'overdue', color: 'text-destructive', bgColor: 'bg-destructive/10' };
    if (days <= 7) return { level: 'critical', color: 'text-destructive', bgColor: 'bg-destructive/10' };
    if (days <= 30) return { level: 'urgent', color: 'text-warning', bgColor: 'bg-warning/10' };
    return { level: 'normal', color: 'text-success', bgColor: 'bg-success/10' };
  };

  // Filter alerts
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.patentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.patentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || alert.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  // Statistics
  const totalFeesDue = alerts.reduce((sum, alert) => sum + (alert.amount || 0), 0);
  const overdueAlerts = alerts.filter(a => a.status === 'overdue').length;
  const urgentAlerts = alerts.filter(a => {
    const days = getDaysUntilDue(a.dueDate);
    return days <= 30 && days >= 0;
  }).length;

  return (
    <Layout title="IP Maintenance Alerts">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-glow to-warning-glow bg-clip-text text-transparent">
              IP Maintenance Alerts
            </h1>
            <p className="text-muted-foreground mt-2">
              Monitor critical deadlines and maintenance requirements for your IP portfolio
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Alert Settings
            </Button>
            <Button>
              <Bell className="w-4 h-4 mr-2" />
              Set Reminder
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass border-glass-border/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Alerts</p>
                  <p className="text-2xl font-bold">{alerts.length}</p>
                </div>
                <Bell className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-glass-border/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold text-destructive">{overdueAlerts}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-glass-border/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Urgent (30 days)</p>
                  <p className="text-2xl font-bold text-warning">{urgentAlerts}</p>
                </div>
                <Clock className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-glass-border/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Fees Due</p>
                  <p className="text-2xl font-bold">${totalFeesDue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="glass border-glass-border/30">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by patent title, number, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {filteredAlerts.map((alert) => {
              const daysUntilDue = getDaysUntilDue(alert.dueDate);
              const urgency = getUrgencyLevel(daysUntilDue);

              return (
                <Card key={alert.id} className={`glass border-glass-border/30 hover:border-primary/20 transition-all duration-300 ${urgency.bgColor}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {getAlertIcon(alert.alertType)}
                          <h3 className="font-semibold text-lg">{alert.patentTitle}</h3>
                          <Badge className={getPriorityColor(alert.priority)}>
                            {alert.priority} priority
                          </Badge>
                          <Badge className={getStatusColor(alert.status)}>
                            {alert.status}
                          </Badge>
                          <Badge variant="outline">{alert.category}</Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">{alert.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Patent Number:</span>
                            <p className="font-medium">{alert.patentNumber}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Jurisdiction:</span>
                            <p className="font-medium">{alert.jurisdiction}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Due Date:</span>
                            <p className="font-medium">
                              {new Date(alert.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Days Remaining:</span>
                            <div className="flex items-center space-x-2">
                              <p className={`font-bold ${urgency.color}`}>
                                {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` : `${daysUntilDue} days`}
                              </p>
                              {urgency.level === 'critical' && <Zap className="w-4 h-4 text-destructive" />}
                            </div>
                          </div>
                          {alert.amount && (
                            <div>
                              <span className="text-muted-foreground">Amount Due:</span>
                              <p className="font-bold text-lg">${alert.amount.toLocaleString()}</p>
                            </div>
                          )}
                        </div>

                        {(urgency.level === 'critical' || urgency.level === 'overdue') && (
                          <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-destructive" />
                              <span className="text-sm font-medium text-destructive">
                                {urgency.level === 'overdue' ? 'OVERDUE - Immediate action required' : 'CRITICAL - Due within 7 days'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        {alert.status === 'pending' && (
                          <Button size="sm">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Mark Complete
                          </Button>
                        )}
                        {alert.amount && alert.status === 'pending' && (
                          <Button variant="outline" size="sm">
                            <CreditCard className="w-4 h-4 mr-1" />
                            Pay Now
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card className="glass border-glass-border/30">
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
                <CardDescription>
                  Visual timeline of upcoming deadlines and maintenance activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">Calendar view coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle>Alert Trends</CardTitle>
                  <CardDescription>Monthly alert patterns and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-glass-border/30">
                <CardHeader>
                  <CardTitle>Cost Analysis</CardTitle>
                  <CardDescription>Maintenance fee projections and cost breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <DollarSign className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">Cost analysis coming soon...</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {filteredAlerts.length === 0 && (
          <Card className="glass border-glass-border/30">
            <CardContent className="text-center py-12">
              <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No maintenance alerts found matching your filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
