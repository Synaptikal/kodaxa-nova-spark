import React, { useState } from 'react';
import { Layout } from '@/components/common/Layout';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Shield, AlertTriangle, Calendar } from 'lucide-react';

interface Patent {
  id: string;
  title: string;
  patentNumber: string;
  status: 'active' | 'pending' | 'expired';
  expiryDate: string;
  inventors: string[];
  description: string;
}

const mockPatents: Patent[] = [
  {
    id: '1',
    title: 'AI-Powered Document Analysis System',
    patentNumber: 'US11234567B2',
    status: 'active',
    expiryDate: '2035-03-15',
    inventors: ['Dr. Smith', 'J. Johnson'],
    description: 'Machine learning system for automated document classification and analysis'
  },
  {
    id: '2', 
    title: 'Blockchain-Based Identity Verification',
    patentNumber: 'US11234568B2',
    status: 'pending',
    expiryDate: '2036-01-20',
    inventors: ['A. Wilson', 'M. Chen'],
    description: 'Decentralized identity verification using blockchain technology'
  }
];

export default function PatentSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [patents] = useState<Patent[]>(mockPatents);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPatents = patents.filter(patent =>
    patent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patent.patentNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patent Search</h1>
          <p className="text-muted-foreground">Search and analyze patent portfolios</p>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search patents by title or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>Advanced Search</Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredPatents.map((patent) => (
            <GlassCard key={patent.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{patent.title}</h3>
                    <Badge className={getStatusColor(patent.status)}>
                      {patent.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{patent.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Patent Number:</span>
                      <p className="font-medium">{patent.patentNumber}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Inventors:</span>
                      <p className="font-medium">{patent.inventors.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expiry Date:</span>
                      <p className="font-medium">{new Date(patent.expiryDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </Layout>
  );
}