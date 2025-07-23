import React, { useState } from 'react';
import { Layout } from '@/components/common/Layout';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MessageSquare, Users, Brain, Clock } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  description: string;
  agents: string[];
  members: number;
  status: 'active' | 'idle' | 'completing';
  lastActivity: string;
  createdAt: string;
}

const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Market Analysis Team',
    description: 'AI agents collaborating on competitive market analysis',
    agents: ['Research Agent', 'Data Analyst', 'Strategy Advisor'],
    members: 5,
    status: 'active',
    lastActivity: '2 minutes ago',
    createdAt: '2024-03-15'
  },
  {
    id: '2',
    name: 'Product Development Hub',
    description: 'Cross-functional AI team for product roadmap planning',
    agents: ['Product Manager', 'Tech Lead', 'UX Researcher'],
    members: 8,
    status: 'idle',
    lastActivity: '1 hour ago', 
    createdAt: '2024-03-10'
  }
];

export default function DeliberationRooms() {
  const [rooms] = useState<Room[]>(mockRooms);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'idle': return 'bg-yellow-100 text-yellow-800';
      case 'completing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Deliberation Rooms</h1>
            <p className="text-muted-foreground">Collaborative AI workspaces for complex problem solving</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Room
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <GlassCard key={room.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{room.name}</h3>
                    <Badge className={getStatusColor(room.status)}>
                      {room.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{room.description}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">AI Agents:</span>
                  <span className="text-sm text-muted-foreground">{room.agents.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{room.members} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Last activity: {room.lastActivity}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Join Room
                </Button>
                <Button variant="outline">
                  View Details
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>

        {rooms.length === 0 && (
          <div className="text-center py-12">
            <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No deliberation rooms created yet</p>
          </div>
        )}
      </div>
    </Layout>
  );
}