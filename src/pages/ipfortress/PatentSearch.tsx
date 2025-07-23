import React, { useState } from 'react';
import { Layout } from '@/components/common/Layout';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, FileText, Shield, AlertTriangle, Calendar, Lightbulb, Database, Eye, Download, Upload } from 'lucide-react';

interface Patent {
  id: string;
  title: string;
  patentNumber: string;
  status: 'active' | 'pending' | 'expired';
  expiryDate: string;
  inventors: string[];
  description: string;
  claims?: string[];
  classifications?: string[];
}

interface PriorArtResult {
  id: string;
  title: string;
  source: string;
  relevanceScore: number;
  publicationDate: string;
  summary: string;
  type: 'patent' | 'publication' | 'article';
}

const mockPatents: Patent[] = [
  {
    id: '1',
    title: 'AI-Powered Document Analysis System',
    patentNumber: 'US11234567B2',
    status: 'active',
    expiryDate: '2035-03-15',
    inventors: ['Dr. Smith', 'J. Johnson'],
    description: 'Machine learning system for automated document classification and analysis',
    claims: ['Automated text classification using neural networks', 'Real-time document processing'],
    classifications: ['G06F40/20', 'G06N3/04']
  },
  {
    id: '2', 
    title: 'Blockchain-Based Identity Verification',
    patentNumber: 'US11234568B2',
    status: 'pending',
    expiryDate: '2036-01-20',
    inventors: ['A. Wilson', 'M. Chen'],
    description: 'Decentralized identity verification using blockchain technology',
    claims: ['Distributed identity verification system', 'Cryptographic proof mechanisms'],
    classifications: ['H04L9/32', 'G06F21/60']
  }
];

const mockPriorArt: PriorArtResult[] = [
  {
    id: '1',
    title: 'Machine Learning Approaches to Document Classification',
    source: 'IEEE Transactions on Pattern Analysis',
    relevanceScore: 95,
    publicationDate: '2019-03-15',
    summary: 'Comprehensive study on neural network architectures for automated document classification...',
    type: 'publication'
  },
  {
    id: '2',
    title: 'Natural Language Processing in Document Analysis',
    source: 'Nature Machine Intelligence',
    relevanceScore: 88,
    publicationDate: '2020-08-22',
    summary: 'Research on advanced NLP techniques for document understanding and categorization...',
    type: 'article'
  },
  {
    id: '3',
    title: 'Automated Text Analysis System',
    source: 'US10987654B1',
    relevanceScore: 92,
    publicationDate: '2018-11-10',
    summary: 'Patent describing automated text processing and classification methodologies...',
    type: 'patent'
  }
];

export default function PatentSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorArtQuery, setPriorArtQuery] = useState('');
  const [selectedDatabase, setSelectedDatabase] = useState('all');
  const [patents] = useState<Patent[]>(mockPatents);
  const [priorArtResults] = useState<PriorArtResult[]>(mockPriorArt);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 90) return 'bg-red-100 text-red-800';
    if (score >= 75) return 'bg-orange-100 text-orange-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'patent': return 'bg-blue-100 text-blue-800';
      case 'publication': return 'bg-purple-100 text-purple-800';
      case 'article': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPatents = patents.filter(patent =>
    patent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patent.patentNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPriorArt = priorArtResults.filter(result =>
    result.title.toLowerCase().includes(priorArtQuery.toLowerCase()) ||
    result.summary.toLowerCase().includes(priorArtQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">IP Fortress Search</h1>
          <p className="text-muted-foreground">Search patents and conduct prior art analysis</p>
        </div>

        <Tabs defaultValue="patents" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="patents" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Patent Portfolio
            </TabsTrigger>
            <TabsTrigger value="prior-art" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Prior Art Search
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patents" className="space-y-6">
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
                      {patent.claims && (
                        <div className="mt-3">
                          <span className="text-muted-foreground text-sm">Key Claims:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {patent.claims.map((claim, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {claim}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
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
          </TabsContent>

          <TabsContent value="prior-art" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Describe your invention for prior art search..."
                    value={priorArtQuery}
                    onChange={(e) => setPriorArtQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Select value={selectedDatabase} onValueChange={setSelectedDatabase}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select database" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Databases</SelectItem>
                    <SelectItem value="uspto">USPTO</SelectItem>
                    <SelectItem value="google">Google Patents</SelectItem>
                    <SelectItem value="ieee">IEEE Xplore</SelectItem>
                    <SelectItem value="pubmed">PubMed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button>
                <Search className="w-4 h-4 mr-2" />
                Run Prior Art Search
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Claims
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredPriorArt.map((result) => (
                <GlassCard key={result.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{result.title}</h3>
                        <Badge className={getRelevanceColor(result.relevanceScore)}>
                          {result.relevanceScore}% Relevant
                        </Badge>
                        <Badge className={getTypeColor(result.type)}>
                          {result.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{result.summary}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Source:</span>
                          <p className="font-medium">{result.source}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Publication Date:</span>
                          <p className="font-medium">{new Date(result.publicationDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}