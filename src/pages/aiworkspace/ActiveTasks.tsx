import React, { useState } from 'react';
import { Layout } from '@/components/common/Layout';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Play, 
  Pause, 
  Square, 
  Clock, 
  Users, 
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Plus,
  Filter,
  Calendar
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'running' | 'paused' | 'completed' | 'failed' | 'queued';
  progress: number;
  assignedAgents: string[];
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  startedAt: string;
  estimatedCompletion: string;
  category: string;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Q1 2025 Market Forecast Analysis',
    description: 'Comprehensive analysis of market trends and forecasting for Q1 2025 including competitor analysis and growth opportunities.',
    status: 'running',
    progress: 75,
    assignedAgents: ['analyst', 'data-scientist'],
    priority: 'high',
    deadline: '2024-03-22',
    startedAt: '2024-03-20T09:00:00Z',
    estimatedCompletion: '2024-03-21T16:00:00Z',
    category: 'Market Analysis'
  },
  {
    id: '2',
    title: 'Competitive Intelligence Report',
    description: 'Deep dive into competitor strategies, pricing models, and market positioning.',
    status: 'running',
    progress: 45,
    assignedAgents: ['analyst', 'strategist'],
    priority: 'medium',
    deadline: '2024-03-25',
    startedAt: '2024-03-19T14:00:00Z',
    estimatedCompletion: '2024-03-24T12:00:00Z',
    category: 'Strategy'
  },
  {
    id: '3',
    title: 'IP Portfolio Review',
    description: 'Complete review of existing patents and identification of new filing opportunities.',
    status: 'paused',
    progress: 90,
    assignedAgents: ['ip-expert'],
    priority: 'high',
    deadline: '2024-03-21',
    startedAt: '2024-03-18T10:00:00Z',
    estimatedCompletion: '2024-03-21T14:00:00Z',
    category: 'IP Management'
  },
  {
    id: '4',
    title: 'Customer Segmentation Analysis',
    description: 'Advanced customer segmentation using machine learning to identify key customer groups.',
    status: 'queued',
    progress: 0,
    assignedAgents: ['data-scientist', 'strategist'],
    priority: 'low',
    deadline: '2024-03-30',
    startedAt: '2024-03-21T09:00:00Z',
    estimatedCompletion: '2024-03-28T17:00:00Z',
    category: 'Customer Analytics'
  },
  {
    id: '5',
    title: 'Financial Risk Assessment',
    description: 'Comprehensive risk analysis for upcoming investment decisions.',
    status: 'completed',
    progress: 100,
    assignedAgents: ['financial-advisor'],
    priority: 'high',
    deadline: '2024-03-20',
    startedAt: '2024-03-18T08:00:00Z',
    estimatedCompletion: '2024-03-20T15:00:00Z',
    category: 'Finance'
  },
  {
    id: '6',
    title: 'Market Entry Strategy',
    description: 'Strategy development for entering new geographic markets.',
    status: 'failed',
    progress: 25,
    assignedAgents: ['strategist', 'analyst'],
    priority: 'medium',
    deadline: '2024-03-24',
    startedAt: '2024-03-19T11:00:00Z',
    estimatedCompletion: '2024-03-23T16:00:00Z',
    category: 'Strategy'
  }
];

const agentAvatars: Record<string, { name: string; avatar: string; color: string }> = {
  'analyst': { name: 'Marcus', avatar: 'MA', color: 'primary' },
  'strategist': { name: 'Sophia', avatar: 'SA', color: 'accent' },
  'ip-expert': { name: 'Victor', avatar: 'VE', color: 'success' },
  'data-scientist': { name: 'Luna', avatar: 'LD', color: 'warning' },
  'financial-advisor': { name: 'Alexander', avatar: 'AF', color: 'destructive' }
};

export default function ActiveTasks() {
  const [tasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<string>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="w-4 h-4 text-success" />;
      case 'paused': return <Pause className="w-4 h-4 text-warning" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'queued': return <Clock className="w-4 h-4 text-muted-foreground" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-success/20 text-success border-success/30';
      case 'paused': return 'bg-warning/20 text-warning border-warning/30';
      case 'completed': return 'bg-success/20 text-success border-success/30';
      case 'failed': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'queued': return 'bg-muted/20 text-muted-foreground border-muted/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
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

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

  const runningTasks = tasks.filter(t => t.status === 'running').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const failedTasks = tasks.filter(t => t.status === 'failed').length;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Active AI Tasks</h1>
            <p className="text-muted-foreground">Monitor and manage AI agent task execution</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-border rounded-md px-3 py-1 bg-background"
              >
                <option value="all">All Tasks</option>
                <option value="running">Running</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="queued">Queued</option>
              </select>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Running</p>
                <p className="text-2xl font-bold">{runningTasks}</p>
              </div>
              <Play className="w-8 h-8 text-success" />
            </div>
          </GlassCard>
          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedTasks}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </GlassCard>
          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold">{failedTasks}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </GlassCard>
          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-accent" />
            </div>
          </GlassCard>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <GlassCard key={task.id} className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{task.title}</h3>
                      <Badge className={getStatusColor(task.status)}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(task.status)}
                          <span className="capitalize">{task.status}</span>
                        </div>
                      </Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority} priority
                      </Badge>
                      <Badge variant="outline">{task.category}</Badge>
                    </div>
                    <p className="text-muted-foreground">{task.description}</p>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    {task.status === 'running' && (
                      <Button variant="outline" size="sm">
                        <Pause className="w-3 h-3 mr-1" />
                        Pause
                      </Button>
                    )}
                    {task.status === 'paused' && (
                      <Button variant="outline" size="sm">
                        <Play className="w-3 h-3 mr-1" />
                        Resume
                      </Button>
                    )}
                    {(task.status === 'running' || task.status === 'paused') && (
                      <Button variant="destructive" size="sm">
                        <Square className="w-3 h-3 mr-1" />
                        Stop
                      </Button>
                    )}
                    {task.status === 'failed' && (
                      <Button size="sm">
                        <Play className="w-3 h-3 mr-1" />
                        Retry
                      </Button>
                    )}
                  </div>
                </div>

                {/* Progress */}
                {task.status !== 'queued' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Assigned Agents:</span>
                    <div className="flex -space-x-1 mt-1">
                      {task.assignedAgents.map((agentId) => {
                        const agent = agentAvatars[agentId];
                        return agent ? (
                          <Avatar key={agentId} className="w-6 h-6 border-2 border-background">
                            <AvatarFallback className={`bg-${agent.color} text-${agent.color}-foreground text-xs`}>
                              {agent.avatar}
                            </AvatarFallback>
                          </Avatar>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Started:</span>
                    <p className="font-medium">
                      {new Date(task.startedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Deadline:</span>
                    <p className="font-medium flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(task.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Est. Completion:</span>
                    <p className="font-medium">
                      {new Date(task.estimatedCompletion).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No tasks found matching the current filter</p>
          </div>
        )}
      </div>
    </Layout>
  );
}