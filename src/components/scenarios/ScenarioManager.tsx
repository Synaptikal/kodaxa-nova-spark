import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { 
  Plus, Edit, Trash2, Copy, GitBranch, MessageSquare, 
  Brain, Clock, User, Calendar, Eye, Download
} from 'lucide-react';

interface Scenario {
  id: string;
  name: string;
  description: string;
  category: 'financial' | 'market' | 'operational' | 'strategic';
  status: 'draft' | 'active' | 'completed' | 'archived';
  lastModified: string;
  createdBy: string;
  version: number;
  parentScenario?: string;
  data: Record<string, any>;
  aiRecommendations?: string[];
  collaborators: string[];
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  aiGenerated?: boolean;
}

const mockScenarios: Scenario[] = [
  {
    id: '1',
    name: 'Q4 Revenue Projection',
    description: 'Conservative revenue forecasting model for Q4 2024 based on current market trends',
    category: 'financial',
    status: 'active',
    lastModified: '2024-03-20',
    createdBy: 'John Smith',
    version: 3,
    data: { revenue: 2500000, growth: 15, confidence: 0.85 },
    aiRecommendations: [
      'Consider seasonal variations in your model',
      'Include competitor analysis for more accuracy',
      'Factor in economic indicators'
    ],
    collaborators: ['Alice Johnson', 'Bob Wilson'],
    comments: [
      {
        id: 'c1',
        author: 'Alice Johnson',
        content: 'The growth rate seems optimistic given current market conditions',
        timestamp: '2024-03-19T10:30:00Z'
      },
      {
        id: 'c2',
        author: 'AI Assistant',
        content: 'Based on historical data, consider adding a 10% buffer for economic uncertainty',
        timestamp: '2024-03-19T11:15:00Z',
        aiGenerated: true
      }
    ]
  },
  {
    id: '2',
    name: 'Market Expansion - Europe',
    description: 'Analysis of European market entry strategy with risk assessment',
    category: 'market',
    status: 'draft',
    lastModified: '2024-03-18',
    createdBy: 'Sarah Davis',
    version: 1,
    data: { investment: 1000000, roi: 180, timeframe: 18 },
    aiRecommendations: [
      'Research local regulations and compliance requirements',
      'Analyze cultural factors affecting product adoption',
      'Consider partnerships with local distributors'
    ],
    collaborators: ['Mike Chen'],
    comments: []
  }
];

export const ScenarioManager: React.FC = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const [scenarios, setScenarios] = useState<Scenario[]>(mockScenarios);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  // Form state for creating scenarios
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'financial' as Scenario['category']
  });

  const createScenario = () => {
    if (!formData.name.trim()) {
      showError('Scenario name is required');
      return;
    }

    const newScenario: Scenario = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      status: 'draft',
      lastModified: new Date().toISOString().split('T')[0],
      createdBy: user?.email?.split('@')[0] || 'Anonymous',
      version: 1,
      data: {},
      collaborators: [],
      comments: []
    };

    setScenarios(prev => [newScenario, ...prev]);
    setFormData({ name: '', description: '', category: 'financial' });
    setShowCreateDialog(false);
    showSuccess('Scenario created successfully!');
  };

  const duplicateScenario = (scenario: Scenario) => {
    const duplicate: Scenario = {
      ...scenario,
      id: Date.now().toString(),
      name: `${scenario.name} (Copy)`,
      version: 1,
      status: 'draft',
      lastModified: new Date().toISOString().split('T')[0],
      createdBy: user?.email?.split('@')[0] || 'Anonymous',
      parentScenario: scenario.id,
      comments: []
    };

    setScenarios(prev => [duplicate, ...prev]);
    showSuccess('Scenario duplicated successfully!');
  };

  const deleteScenario = (scenarioId: string) => {
    setScenarios(prev => prev.filter(s => s.id !== scenarioId));
    showSuccess('Scenario deleted successfully!');
  };

  const addComment = () => {
    if (!newComment.trim() || !selectedScenario) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: user?.email?.split('@')[0] || 'Anonymous',
      content: newComment,
      timestamp: new Date().toISOString()
    };

    setScenarios(prev => prev.map(scenario => 
      scenario.id === selectedScenario.id
        ? { ...scenario, comments: [...scenario.comments, comment] }
        : scenario
    ));

    setNewComment('');
    showSuccess('Comment added successfully!');
  };

  const getStatusColor = (status: Scenario['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: Scenario['category']) => {
    switch (category) {
      case 'financial': return 'bg-blue-100 text-blue-800';
      case 'market': return 'bg-green-100 text-green-800';
      case 'operational': return 'bg-orange-100 text-orange-800';
      case 'strategic': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Scenario Management</h2>
          <p className="text-muted-foreground">Create, compare, and collaborate on business scenarios</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Scenario
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Scenario</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Scenario Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter scenario name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the scenario"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as Scenario['category'] }))}
                  className="w-full p-2 border border-border rounded-md bg-background"
                >
                  <option value="financial">Financial</option>
                  <option value="market">Market</option>
                  <option value="operational">Operational</option>
                  <option value="strategic">Strategic</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={createScenario}>Create Scenario</Button>
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <GlassCard key={scenario.id} className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{scenario.name}</h3>
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {scenario.description}
                </p>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <Badge className={getStatusColor(scenario.status)}>
                  {scenario.status}
                </Badge>
                <Badge variant="outline" className={getCategoryColor(scenario.category)}>
                  {scenario.category}
                </Badge>
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-2 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{scenario.createdBy}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Modified {new Date(scenario.lastModified).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                <span>Version {scenario.version}</span>
              </div>
              {scenario.parentScenario && (
                <div className="flex items-center gap-2">
                  <Copy className="w-4 h-4" />
                  <span>Derived from scenario</span>
                </div>
              )}
            </div>

            {/* AI Recommendations */}
            {scenario.aiRecommendations && scenario.aiRecommendations.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">AI Recommendations</span>
                </div>
                <div className="space-y-1">
                  {scenario.aiRecommendations.slice(0, 2).map((recommendation, index) => (
                    <p key={index} className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                      {recommendation}
                    </p>
                  ))}
                  {scenario.aiRecommendations.length > 2 && (
                    <p className="text-xs text-muted-foreground">
                      +{scenario.aiRecommendations.length - 2} more recommendations
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Comments Preview */}
            {scenario.comments.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{scenario.comments.length} Comments</span>
                </div>
                <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                  Latest: {scenario.comments[scenario.comments.length - 1]?.content.slice(0, 50)}...
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setSelectedScenario(scenario)}
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => duplicateScenario(scenario)}
              >
                <Copy className="w-4 h-4 mr-1" />
                Duplicate
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => deleteScenario(scenario.id)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>

      {scenarios.length === 0 && (
        <div className="text-center py-12">
          <GitBranch className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No scenarios created yet</p>
          <Button className="mt-4" onClick={() => setShowCreateDialog(true)}>
            Create Your First Scenario
          </Button>
        </div>
      )}

      {/* Scenario Detail Dialog */}
      {selectedScenario && (
        <Dialog open={!!selectedScenario} onOpenChange={() => setSelectedScenario(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedScenario.name}</span>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(selectedScenario.status)}>
                    {selectedScenario.status}
                  </Badge>
                  <Badge variant="outline" className={getCategoryColor(selectedScenario.category)}>
                    {selectedScenario.category}
                  </Badge>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="ai">AI Insights</TabsTrigger>
                <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedScenario.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-1">Created By</h4>
                    <p className="text-sm text-muted-foreground">{selectedScenario.createdBy}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Last Modified</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedScenario.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Version</h4>
                    <p className="text-sm text-muted-foreground">{selectedScenario.version}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Collaborators</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedScenario.collaborators.length || 'None'}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="data" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Scenario Data</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                    {JSON.stringify(selectedScenario.data, null, 2)}
                  </pre>
                </div>
              </TabsContent>

              <TabsContent value="ai" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">AI Recommendations</h3>
                  {selectedScenario.aiRecommendations?.map((recommendation, index) => (
                    <div key={index} className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="collaboration" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Comments</h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {selectedScenario.comments.map((comment) => (
                      <div key={comment.id} className="bg-muted/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{comment.author}</span>
                            {comment.aiGenerated && (
                              <Badge variant="outline" className="text-xs">
                                <Brain className="w-3 h-3 mr-1" />
                                AI
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Input
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1"
                    />
                    <Button onClick={addComment} disabled={!newComment.trim()}>
                      Add Comment
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};