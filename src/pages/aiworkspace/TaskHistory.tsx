import React, { useState } from 'react';
import { Layout } from '@/components/common/Layout';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertTriangle, ArrowRight, Filter } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'failed' | 'pending';
  agent: string;
  room: string;
  startTime: string;
  completionTime?: string;
  duration?: string;
  result?: string;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Market Research Analysis',
    description: 'Comprehensive analysis of competitor pricing strategies',
    status: 'completed',
    agent: 'Research Agent',
    room: 'Market Analysis Team',
    startTime: '2024-03-20T10:30:00Z',
    completionTime: '2024-03-20T11:45:00Z',
    duration: '1h 15m',
    result: 'Generated detailed competitor pricing report with 15 key insights'
  },
  {
    id: '2',
    title: 'Customer Segmentation Model',
    description: 'Build ML model for customer behavior prediction',
    status: 'in-progress',
    agent: 'Data Analyst',
    room: 'Product Development Hub',
    startTime: '2024-03-20T09:00:00Z',
    duration: '2h 30m (ongoing)'
  },
  {
    id: '3',
    title: 'Patent Landscape Review',
    description: 'Analysis of existing patents in target technology area',
    status: 'failed',
    agent: 'Legal Research AI',
    room: 'IP Strategy Room',
    startTime: '2024-03-19T14:20:00Z',
    completionTime: '2024-03-19T14:25:00Z',
    duration: '5m',
    result: 'Failed due to API rate limiting - retry scheduled'
  }
];

export default function TaskHistory() {
  const [tasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<string>('all');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Task History</h1>
            <p className="text-muted-foreground">Monitor AI agent task execution and results</p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-border rounded-md px-3 py-1 bg-background"
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <GlassCard key={task.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <Badge className={getStatusColor(task.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(task.status)}
                        <span className="capitalize">{task.status.replace('-', ' ')}</span>
                      </div>
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{task.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Agent:</span>
                      <p className="font-medium">{task.agent}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Room:</span>
                      <p className="font-medium">{task.room}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Started:</span>
                      <p className="font-medium">
                        {new Date(task.startTime).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">{task.duration}</p>
                    </div>
                  </div>

                  {task.result && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm font-medium">Result:</span>
                      <p className="text-sm text-muted-foreground mt-1">{task.result}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    View Details
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                  {task.status === 'failed' && (
                    <Button size="sm">
                      Retry
                    </Button>
                  )}
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