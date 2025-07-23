import { Layout } from "@/components/common/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Upload,
  Download,
  Search,
  Filter,
  PlusCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function IPFortress() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleExportPortfolio = () => {
    toast({
      title: "Export Initiated",
      description: "Generating IP portfolio report...",
    });
  };

  const handleNewFiling = () => {
    toast({
      title: "New Filing",
      description: "Opening IP application wizard...",
    });
  };

  const handleViewDetails = (assetId: string) => {
    toast({
      title: "Asset Details",
      description: `Opening detailed view for ${assetId}`,
    });
  };

  const handleManage = (assetId: string) => {
    toast({
      title: "Asset Management",
      description: `Opening management panel for ${assetId}`,
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filter Applied",
      description: "Filtering IP assets by criteria...",
    });
  };

  const handleImport = () => {
    toast({
      title: "Import Data",
      description: "Opening file import dialog...",
    });
  };

  const ipAssets = [
    {
      id: "PAT-2024-001",
      type: "Patent",
      title: "AI-Powered Analytics Engine",
      status: "granted",
      filingDate: "2024-01-15",
      expiryDate: "2044-01-15",
      jurisdiction: "USPTO",
      riskLevel: "low",
      nextAction: "Annual fee due in 90 days",
    },
    {
      id: "TM-2024-002",
      type: "Trademark",
      title: "Kodaxa Orchestrator",
      status: "pending",
      filingDate: "2024-03-10",
      expiryDate: "N/A",
      jurisdiction: "USPTO",
      riskLevel: "medium",
      nextAction: "Office action response due",
    },
    {
      id: "PAT-2023-003",
      type: "Patent",
      title: "Business Intelligence Framework",
      status: "published",
      filingDate: "2023-11-22",
      expiryDate: "2043-11-22",
      jurisdiction: "EPO",
      riskLevel: "high",
      nextAction: "Prior art review required",
    },
    {
      id: "CR-2024-004",
      type: "Copyright",
      title: "Software Documentation Suite",
      status: "registered",
      filingDate: "2024-02-01",
      expiryDate: "2094-02-01",
      jurisdiction: "USCO",
      riskLevel: "low",
      nextAction: "Renewal in 5 years",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "granted":
      case "registered": return "bg-success text-success-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      case "published": return "bg-accent text-accent-foreground";
      case "rejected": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low": return CheckCircle;
      case "medium": return Clock;
      case "high": return AlertTriangle;
      default: return Shield;
    }
  };

  return (
    <Layout title="IP Fortress">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-glow to-success-glow bg-clip-text text-transparent">
              IP Fortress
            </h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive intellectual property management and protection
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExportPortfolio}>
              <Download className="w-4 h-4 mr-2" />
              Export Portfolio
            </Button>
            <Button onClick={handleNewFiling}>
              <PlusCircle className="w-4 h-4 mr-2" />
              New Filing
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass border-glass-border/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Assets</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <Shield className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-glass-border/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Patents</p>
                  <p className="text-2xl font-bold">15</p>
                </div>
                <FileText className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-glass-border/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">6</p>
                </div>
                <Clock className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass border-glass-border/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Risk</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-destructive" />
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
                  placeholder="Search patents, trademarks, copyrights..."
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleFilter}>
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" onClick={handleImport}>
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* IP Assets Table */}
        <Card className="glass border-glass-border/30">
          <CardHeader>
            <CardTitle>IP Portfolio</CardTitle>
            <CardDescription>
              Manage your intellectual property assets with AI-powered risk assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ipAssets.map((asset) => {
                const RiskIcon = getRiskIcon(asset.riskLevel);
                return (
                  <div
                    key={asset.id}
                    className="p-4 rounded-lg border border-glass-border/30 hover:border-primary/20 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {asset.id}
                          </Badge>
                          <Badge className={getStatusColor(asset.status)}>
                            {asset.status}
                          </Badge>
                          <div className={`flex items-center ${getRiskColor(asset.riskLevel)}`}>
                            <RiskIcon className="w-4 h-4 mr-1" />
                            <span className="text-xs font-medium uppercase">{asset.riskLevel} Risk</span>
                          </div>
                        </div>
                        
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {asset.title}
                        </h3>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Type:</span> {asset.type}
                          </div>
                          <div>
                            <span className="font-medium">Filed:</span> {asset.filingDate}
                          </div>
                          <div>
                            <span className="font-medium">Jurisdiction:</span> {asset.jurisdiction}
                          </div>
                          <div>
                            <span className="font-medium">Expires:</span> {asset.expiryDate}
                          </div>
                        </div>
                        
                        <div className="mt-2 text-sm">
                          <span className="font-medium text-accent">Next Action:</span> {asset.nextAction}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(asset.id)}
                        >
                          View Details
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleManage(asset.id)}
                        >
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}