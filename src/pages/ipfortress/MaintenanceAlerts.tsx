import React, { useState } from 'react';
import { Layout } from '@/components/common/Layout';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Calendar, DollarSign, Bell, CheckCircle } from 'lucide-react';

interface MaintenanceAlert {
  id: string;
  patentNumber: string;
  patentTitle: string;
  alertType: 'renewal' | 'fee-due' | 'deadline' | 'expiry-warning';
  dueDate: string;
  amount?: number;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed' | 'overdue';
  description: string;
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
    description: 'Annual maintenance fee due for patent renewal'
  },
  {
    id: '2',
    patentNumber: 'US11234568B2', 
    patentTitle: 'Blockchain-Based Identity Verification',
    alertType: 'fee-due',
    dueDate: '2024-03-30',
    amount: 800,
    priority: 'medium',
    status: 'pending',
    description: 'Examination fee payment required'
  },
  {
    id: '3',
    patentNumber: 'US11234569B2',
    patentTitle: 'Machine Learning Data Pipeline',
    alertType: 'expiry-warning',
    dueDate: '2025-01-20',
    priority: 'low',
    status: 'pending',
    description: 'Patent will expire in 10 months - consider renewal'
  }
];

export default function MaintenanceAlerts() {
  const [alerts] = useState<MaintenanceAlert[]>(mockAlerts);
  const [filter, setFilter] = useState<string>('all');

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'renewal': return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'fee-due': return <DollarSign className="w-4 h-4 text-orange-500" />;
      case 'deadline': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'expiry-warning': return <Bell className="w-4 h-4 text-yellow-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(alert => alert.priority === filter);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Patent Maintenance Alerts</h1>
            <p className="text-muted-foreground">Track important deadlines and maintenance requirements</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-border rounded-md px-3 py-1 bg-background"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <GlassCard className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {alerts.filter(a => a.priority === 'high').length}
            </div>
            <div className="text-sm text-muted-foreground">High Priority</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {alerts.filter(a => a.priority === 'medium').length}
            </div>
            <div className="text-sm text-muted-foreground">Medium Priority</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {alerts.filter(a => a.priority === 'low').length}
            </div>
            <div className="text-sm text-muted-foreground">Low Priority</div>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              ${alerts.reduce((sum, alert) => sum + (alert.amount || 0), 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Fees Due</div>
          </GlassCard>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => {
            const daysUntilDue = getDaysUntilDue(alert.dueDate);
            const isUrgent = daysUntilDue <= 30;

            return (
              <GlassCard key={alert.id} className={`p-6 ${isUrgent ? 'ring-2 ring-red-200' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getAlertIcon(alert.alertType)}
                      <h3 className="font-semibold text-lg">{alert.patentTitle}</h3>
                      <Badge className={getPriorityColor(alert.priority)}>
                        {alert.priority} priority
                      </Badge>
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Patent Number:</span>
                        <p className="font-medium">{alert.patentNumber}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Due Date:</span>
                        <p className="font-medium">
                          {new Date(alert.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Days Remaining:</span>
                        <p className={`font-medium ${daysUntilDue <= 7 ? 'text-red-600' : daysUntilDue <= 30 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {daysUntilDue} days
                        </p>
                      </div>
                      {alert.amount && (
                        <div>
                          <span className="text-muted-foreground">Amount Due:</span>
                          <p className="font-medium">${alert.amount.toLocaleString()}</p>
                        </div>
                      )}
                    </div>

                    {isUrgent && (
                      <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium text-red-800">
                            Urgent: Due within 30 days
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    {alert.status === 'pending' && (
                      <Button size="sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark Complete
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No maintenance alerts found</p>
          </div>
        )}
      </div>
    </Layout>
  );
}