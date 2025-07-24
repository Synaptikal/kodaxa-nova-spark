import React from 'react';
import { Layout } from '@/components/common/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FolderOpen, Upload, Download, Search, Filter } from 'lucide-react';

const FileManager: React.FC = () => {
  return (
    <Layout title="File Manager">
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="relative">
            <FolderOpen className="w-24 h-24 mx-auto mb-6 text-accent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-accent/20 rounded-full animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            File Manager
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Centralized asset management with intelligent organization and secure collaboration features.
          </p>
          <Badge variant="outline" className="mb-8">
            <Upload className="w-4 h-4 mr-2" />
            Enterprise Ready
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass border-glass-border/30">
            <CardContent className="p-6 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Upload Files</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop or browse to upload
              </p>
              <Button variant="outline" size="sm">
                Browse Files
              </Button>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30">
            <CardContent className="p-6 text-center">
              <Search className="w-12 h-12 mx-auto mb-4 text-success" />
              <h3 className="font-semibold mb-2">Smart Search</h3>
              <p className="text-sm text-muted-foreground mb-4">
                AI-powered content search
              </p>
              <Button variant="outline" size="sm">
                Search Assets
              </Button>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30">
            <CardContent className="p-6 text-center">
              <Filter className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="font-semibold mb-2">Organization</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Intelligent categorization
              </p>
              <Button variant="outline" size="sm">
                Organize
              </Button>
            </CardContent>
          </Card>

          <Card className="glass border-glass-border/30">
            <CardContent className="p-6 text-center">
              <Download className="w-12 h-12 mx-auto mb-4 text-warning" />
              <h3 className="font-semibold mb-2">Bulk Actions</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Download, move, or delete
              </p>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="glass border-glass-border/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">Enterprise Asset Management</h3>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
              Streamline your digital asset workflow with intelligent organization, 
              version control, and team collaboration features.
            </p>
            <Button>
              <FolderOpen className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FileManager;