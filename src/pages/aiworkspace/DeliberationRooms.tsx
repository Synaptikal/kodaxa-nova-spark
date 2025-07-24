import React, { useState } from 'react';
import { Layout } from '@/components/common/Layout';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, MessageSquare, Users, Brain, Clock, Settings, Activity, Send, Bot } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  description: string;
  agents: string[];
  members: number;
  status: 'active' | 'idle' | 'completing';
  lastActivity: string;
  createdAt: string;
  objective?: string;
  messages?: Message[];
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'agent' | 'user' | 'system';
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
    createdAt: '2024-03-15',
    objective: 'Analyze competitor strategies and market positioning for Q2 2024',
    messages: [
      { id: '1', sender: 'Research Agent', content: 'I\'ve gathered data on 15 key competitors. Initial analysis shows 3 major trends emerging.', timestamp: '10:30 AM', type: 'agent' },
      { id: '2', sender: 'Data Analyst', content: 'The market share data indicates a 12% shift towards mobile-first solutions.', timestamp: '10:32 AM', type: 'agent' },
      { id: '3', sender: 'Strategy Advisor', content: 'Based on this data, I recommend focusing our positioning on enterprise mobility.', timestamp: '10:35 AM', type: 'agent' }
    ]
  },
  {
    id: '2',
    name: 'Product Development Hub',
    description: 'Cross-functional AI team for product roadmap planning',
    agents: ['Product Manager', 'Tech Lead', 'UX Researcher'],
    members: 8,
    status: 'idle',
    lastActivity: '1 hour ago',
    createdAt: '2024-03-10',
    objective: 'Define product roadmap for the next 6 months with focus on user experience improvements',
    messages: [
      { id: '1', sender: 'Product Manager', content: 'Let\'s prioritize the top 5 user-requested features for the next sprint.', timestamp: '9:15 AM', type: 'agent' },
      { id: '2', sender: 'UX Researcher', content: 'User testing shows 73% prefer the new navigation design. Should we proceed?', timestamp: '9:20 AM', type: 'agent' }
    ]
  },
  {
    id: '3',
    name: 'Financial Modeling AI Council',
    description: 'Specialized AI agents working on complex financial projections',
    agents: ['Financial Analyst', 'Risk Assessor', 'Market Forecaster'],
    members: 3,
    status: 'completing',
    lastActivity: '5 minutes ago',
    createdAt: '2024-03-18',
    objective: 'Generate comprehensive financial forecasts for next fiscal year including risk scenarios',
    messages: []
  }
];

export default function DeliberationRooms() {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  // Create room form state
  const [newRoom, setNewRoom] = useState({
    name: '',
    description: '',
    objective: '',
    agents: [] as string[]
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/20 text-success border-success/30';
      case 'idle': return 'bg-warning/20 text-warning border-warning/30';
      case 'completing': return 'bg-primary/20 text-primary border-primary/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const availableAgents = [
    'Research Agent', 'Data Analyst', 'Strategy Advisor', 'Product Manager',
    'Tech Lead', 'UX Researcher', 'Financial Analyst', 'Risk Assessor',
    'Market Forecaster', 'Legal Advisor', 'Marketing Specialist', 'Operations Expert'
  ];

  const handleCreateRoom = () => {
    if (!newRoom.name.trim() || !newRoom.description.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    const room: Room = {
      id: Date.now().toString(),
      name: newRoom.name,
      description: newRoom.description,
      objective: newRoom.objective,
      agents: newRoom.agents,
      members: 1,
      status: 'idle',
      lastActivity: 'Just created',
      createdAt: new Date().toISOString().split('T')[0],
      messages: []
    };

    setRooms([...rooms, room]);
    setNewRoom({ name: '', description: '', objective: '', agents: [] });
    setShowCreateDialog(false);

    toast({
      title: 'Room Created!',
      description: `"${room.name}" has been created successfully.`
    });
  };

  const handleJoinRoom = (room: Room) => {
    setSelectedRoom(room);
    setShowRoomDetails(true);

    // Update room status to active when someone joins
    const updatedRooms = rooms.map(r =>
      r.id === room.id
        ? { ...r, status: 'active' as const, lastActivity: 'Now', members: r.members + 1 }
        : r
    );
    setRooms(updatedRooms);

    toast({
      title: 'Joined Room',
      description: `You are now participating in "${room.name}"`
    });
  };

  const handleViewDetails = (room: Room) => {
    setSelectedRoom(room);
    setShowRoomDetails(true);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedRoom) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'user'
    };

    // Update the room with the new message
    const updatedRooms = rooms.map(room =>
      room.id === selectedRoom.id
        ? {
            ...room,
            messages: [...(room.messages || []), message],
            lastActivity: 'Now'
          }
        : room
    );

    setRooms(updatedRooms);
    setSelectedRoom({
      ...selectedRoom,
      messages: [...(selectedRoom.messages || []), message]
    });
    setNewMessage('');

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: selectedRoom.agents[Math.floor(Math.random() * selectedRoom.agents.length)],
        content: generateAIResponse(newMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'agent'
      };

      const updatedRoomsWithAI = updatedRooms.map(room =>
        room.id === selectedRoom.id
          ? {
              ...room,
              messages: [...(room.messages || []), message, aiResponse]
            }
          : room
      );

      setRooms(updatedRoomsWithAI);
      setSelectedRoom({
        ...selectedRoom,
        messages: [...(selectedRoom.messages || []), message, aiResponse]
      });
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "That's an interesting perspective. Let me analyze the data and provide insights.",
      "I've processed your input. Here are three key considerations we should explore.",
      "Based on current market trends, I recommend we focus on this approach.",
      "The data suggests we need to dive deeper into this area. Let me gather more information.",
      "I agree with that direction. Here's how we can implement this strategy effectively.",
      "That raises important questions. Let me consult with the other agents for a comprehensive view."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Deliberation Rooms</h1>
            <p className="text-muted-foreground">Collaborative AI workspaces for complex problem solving</p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Room
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] glass border-glass-border/30">
              <DialogHeader>
                <DialogTitle className="font-cyber">Create AI Deliberation Room</DialogTitle>
                <DialogDescription>
                  Set up a collaborative workspace for AI agents to work on complex problems
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="room-name">Room Name *</Label>
                  <Input
                    id="room-name"
                    placeholder="e.g., Market Research Team"
                    value={newRoom.name}
                    onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-description">Description *</Label>
                  <Textarea
                    id="room-description"
                    placeholder="Describe what this room will accomplish..."
                    value={newRoom.description}
                    onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room-objective">Objective</Label>
                  <Textarea
                    id="room-objective"
                    placeholder="What specific goal should the AI agents work towards?"
                    value={newRoom.objective}
                    onChange={(e) => setNewRoom({ ...newRoom, objective: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Select AI Agents</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                    {availableAgents.map((agent) => (
                      <label key={agent} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={newRoom.agents.includes(agent)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewRoom({ ...newRoom, agents: [...newRoom.agents, agent] });
                            } else {
                              setNewRoom({ ...newRoom, agents: newRoom.agents.filter(a => a !== agent) });
                            }
                          }}
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                        <span>{agent}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateRoom}>
                  Create Room
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
                <Button
                  className="flex-1"
                  onClick={() => handleJoinRoom(room)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Join Room
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleViewDetails(room)}
                >
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

        {/* Room Details Dialog */}
        <Dialog open={showRoomDetails} onOpenChange={setShowRoomDetails}>
          <DialogContent className="sm:max-w-[800px] sm:max-h-[600px] glass border-glass-border/30">
            <DialogHeader>
              <DialogTitle className="font-cyber flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                {selectedRoom?.name}
              </DialogTitle>
              <DialogDescription>
                {selectedRoom?.description}
              </DialogDescription>
            </DialogHeader>

            {selectedRoom && (
              <div className="space-y-4">
                {/* Room Info */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="glass border-glass-border/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Objective</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {selectedRoom.objective || 'No specific objective set'}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="glass border-glass-border/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">AI Agents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {selectedRoom.agents.map((agent) => (
                          <Badge key={agent} variant="secondary" className="text-xs">
                            <Bot className="w-3 h-3 mr-1" />
                            {agent}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Chat Messages */}
                <Card className="glass border-glass-border/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Live Discussion
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                      {selectedRoom.messages && selectedRoom.messages.length > 0 ? (
                        selectedRoom.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                message.type === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : message.type === 'agent'
                                  ? 'bg-accent/20 border border-accent/30'
                                  : 'bg-muted'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium">
                                  {message.sender}
                                </span>
                                <span className="text-xs opacity-70">
                                  {message.timestamp}
                                </span>
                              </div>
                              <p className="text-sm">{message.content}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No messages yet. Start the conversation!</p>
                        </div>
                      )}
                    </div>

                    {/* Message Input */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message to the AI agents..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
