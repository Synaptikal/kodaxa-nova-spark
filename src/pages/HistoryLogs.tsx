import React from 'react';
import { Layout } from '@/components/common/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, Activity, Clock, Search, Filter, Download } from 'lucide-react';

const HistoryLogs: React.FC = () => {
  return (
    <Layout title="History & Logs">
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="relative">
            <History className="w-24 h-24 mx-auto mb-6 text-success" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-success/20 rounded-full animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-success to-primary bg-clip-text text-transparent">
            History & Logs
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Comprehensive audit trails and system activity logs for full transparency and compliance.
          </p>
          <Badge variant="outline" className="mb-8">
            <Activity className="w-4 h-4 mr-2" />
            Real-time Monitoring
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="glass border-glass-border/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                System Activity
              </CardTitle>
              <CardDescription>
                Real-time system events and operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">User Logins</span>
                  <Badge className="bg-success/20 text-success">1,247</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Data Queries</span>
                  <Badge className="bg-primary/20 text-primary">5,432</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Calls</span>
                  <Badge className="bg-accent/20 text-accent">12,891</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-warning" />
                Audit Trail
              </CardTitle>
              <CardDescription>
                Complete audit log for compliance and security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Data Changes</span>
                  <Badge className="bg-warning/20 text-warning">234</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Access Requests</span>
                  <Badge className="bg-success/20 text-success">89</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Policy Violations</span>
                  <Badge className="bg-destructive/20 text-destructive">3</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-accent" />
                Log Search
              </CardTitle>
              <CardDescription>
                Advanced search and filtering capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Search Logs
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass border-glass-border/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">Complete Audit Trail</h3>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              Track every action, monitor system health, and maintain comprehensive 
              logs for security, compliance, and performance optimization.
            </p>
            <Button>
              <History className="w-4 h-4 mr-2" />
              View Full Logs
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default HistoryLogs;