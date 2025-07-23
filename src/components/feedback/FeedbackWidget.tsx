import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { 
  MessageSquare, ThumbsUp, ThumbsDown, Plus, TrendingUp, 
  Clock, CheckCircle, AlertCircle, Lightbulb, Bug, Zap
} from 'lucide-react';

interface FeedbackItem {
  id: string;
  title: string;
  description: string;
  category: 'feature' | 'bug' | 'improvement' | 'other';
  status: 'submitted' | 'under-review' | 'in-progress' | 'completed' | 'rejected';
  votes: number;
  userVoted: boolean;
  author: string;
  createdAt: string;
  aiSummary?: string;
}

const mockFeedback: FeedbackItem[] = [
  {
    id: '1',
    title: 'Dark mode support',
    description: 'Please add a dark mode option to the interface for better usability in low-light environments.',
    category: 'feature',
    status: 'in-progress',
    votes: 89,
    userVoted: true,
    author: 'Sarah Johnson',
    createdAt: '2024-03-15',
    aiSummary: 'High demand feature for improved user experience during extended usage sessions.'
  },
  {
    id: '2',
    title: 'Export data to CSV',
    description: 'Allow users to export analytics data and reports in CSV format for external analysis.',
    category: 'feature',
    status: 'submitted',
    votes: 45,
    userVoted: false,
    author: 'Mike Chen',
    createdAt: '2024-03-18',
    aiSummary: 'Common request for data portability and integration with external tools.'
  },
  {
    id: '3',
    title: 'Dashboard loading too slow',
    description: 'The main dashboard takes 5-10 seconds to load, especially with large datasets.',
    category: 'bug',
    status: 'under-review',
    votes: 67,
    userVoted: true,
    author: 'Alex Rivera',
    createdAt: '2024-03-12',
    aiSummary: 'Performance issue affecting user experience, requires optimization investigation.'
  },
  {
    id: '4',
    title: 'Keyboard shortcuts',
    description: 'Add keyboard shortcuts for common actions like search, navigation, and data entry.',
    category: 'improvement',
    status: 'completed',
    votes: 123,
    userVoted: false,
    author: 'Emma Wilson',
    createdAt: '2024-02-28',
    aiSummary: 'Power user feature that significantly improves workflow efficiency.'
  }
];

export const FeedbackWidget: React.FC = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotifications();
  const [feedback, setFeedback] = useState<FeedbackItem[]>(mockFeedback);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [sortBy, setSortBy] = useState<'votes' | 'recent' | 'status'>('votes');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'feature' as FeedbackItem['category']
  });

  const handleVote = (feedbackId: string) => {
    setFeedback(prev => prev.map(item => {
      if (item.id === feedbackId) {
        return {
          ...item,
          votes: item.userVoted ? item.votes - 1 : item.votes + 1,
          userVoted: !item.userVoted
        };
      }
      return item;
    }));
  };

  const submitFeedback = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      showError('Please fill in all required fields');
      return;
    }

    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      status: 'submitted',
      votes: 1,
      userVoted: true,
      author: user?.email?.split('@')[0] || 'Anonymous',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setFeedback(prev => [newFeedback, ...prev]);
    setFormData({ title: '', description: '', category: 'feature' });
    setShowSubmissionForm(false);
    showSuccess('Feedback submitted successfully!');
  };

  const getStatusIcon = (status: FeedbackItem['status']) => {
    switch (status) {
      case 'submitted': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'under-review': return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'in-progress': return <Zap className="w-4 h-4 text-orange-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <ThumbsDown className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: FeedbackItem['category']) => {
    switch (category) {
      case 'feature': return <Lightbulb className="w-4 h-4 text-blue-500" />;
      case 'bug': return <Bug className="w-4 h-4 text-red-500" />;
      case 'improvement': return <TrendingUp className="w-4 h-4 text-green-500" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: FeedbackItem['status']) => {
    switch (status) {
      case 'submitted': return 'bg-yellow-100 text-yellow-800';
      case 'under-review': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sortedAndFilteredFeedback = feedback
    .filter(item => filterCategory === 'all' || item.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'votes': return b.votes - a.votes;
        case 'recent': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'status': return a.status.localeCompare(b.status);
        default: return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Feedback & Feature Requests</h2>
          <p className="text-muted-foreground">Share your ideas and vote on features</p>
        </div>
        <Button onClick={() => setShowSubmissionForm(!showSubmissionForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Submit Feedback
        </Button>
      </div>

      {/* Submission Form */}
      {showSubmissionForm && (
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Submit New Feedback</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Brief description of your feedback"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as FeedbackItem['category'] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="improvement">Improvement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Provide detailed information about your feedback"
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={submitFeedback}>Submit Feedback</Button>
              <Button variant="outline" onClick={() => setShowSubmissionForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Filters and Sorting */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label>Sort by:</Label>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="votes">Most Voted</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label>Filter:</Label>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="feature">Features</SelectItem>
              <SelectItem value="bug">Bugs</SelectItem>
              <SelectItem value="improvement">Improvements</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {sortedAndFilteredFeedback.map((item) => (
          <GlassCard key={item.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              {/* Vote Section */}
              <div className="flex flex-col items-center gap-2 min-w-[60px]">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVote(item.id)}
                  className={`w-12 h-12 ${item.userVoted ? 'bg-primary text-primary-foreground' : ''}`}
                >
                  <ThumbsUp className="w-4 h-4" />
                </Button>
                <span className="font-bold text-sm">{item.votes}</span>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getCategoryIcon(item.category)}
                      <span className="capitalize">{item.category}</span>
                    </Badge>
                    <Badge className={getStatusColor(item.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(item.status)}
                        <span className="capitalize">{item.status.replace('-', ' ')}</span>
                      </div>
                    </Badge>
                  </div>
                </div>

                {/* AI Summary */}
                {item.aiSummary && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">AI Summary</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.aiSummary}</p>
                  </div>
                )}

                {/* Metadata */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Submitted by {item.author}</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {sortedAndFilteredFeedback.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No feedback found matching your criteria</p>
        </div>
      )}
    </div>
  );
};