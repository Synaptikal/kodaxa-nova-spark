import React from 'react';
import { Layout } from '@/components/common/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Scale, Shield, AlertTriangle, FileText, CheckCircle } from 'lucide-react';

const ComplianceSentinel: React.FC = () => {
  return (
    <Layout title="Compliance Sentinel">
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="relative">
            <Scale className="w-24 h-24 mx-auto mb-6 text-warning" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-warning/20 rounded-full animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-warning to-destructive bg-clip-text text-transparent">
            Compliance Sentinel
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Automated regulatory compliance monitoring and risk assessment for enterprise operations.
          </p>
          <Badge variant="outline" className="mb-8">
            <Shield className="w-4 h-4 mr-2" />
            Beta Available
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="glass border-glass-border/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Risk Monitoring
              </CardTitle>
              <CardDescription>
                Real-time compliance risk assessment and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">GDPR Compliance</span>
                  <Badge className="bg-success/20 text-success">Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">SOX Compliance</span>
                  <Badge className="bg-warning/20 text-warning">Monitoring</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">HIPAA</span>
                  <Badge className="bg-muted/20 text-muted-foreground">N/A</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Audit Trail
              </CardTitle>
              <CardDescription>
                Comprehensive audit logging and documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">Data Access Logs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">System Changes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">User Activities</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                Policy Engine
              </CardTitle>
              <CardDescription>
                Automated policy enforcement and validation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <p className="text-muted-foreground">Coming Soon</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass border-glass-border/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">Regulatory Compliance Made Simple</h3>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              Stay ahead of regulatory requirements with automated monitoring, real-time alerts, 
              and comprehensive audit trails across all major compliance frameworks.
            </p>
            <Button>
              <Scale className="w-4 h-4 mr-2" />
              Request Demo
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ComplianceSentinel;