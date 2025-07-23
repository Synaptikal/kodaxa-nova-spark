import React, { useState } from 'react';
import { Layout } from '@/components/common/Layout';
import { GlassCard } from '@/components/common/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Settings, 
  Brain, 
  Zap, 
  Shield, 
  Save, 
  RotateCcw,
  Plus,
  Trash2
} from 'lucide-react';

interface AgentConfig {
  id: string;
  name: string;
  role: string;
  specialization: string;
  avatar: string;
  color: string;
  isEnabled: boolean;
  creativity: number;
  responseTime: number;
  confidence: number;
  permissions: string[];
}

const mockAgents: AgentConfig[] = [
  {
    id: "analyst",
    name: "Marcus",
    role: "Business Analyst",
    specialization: "Market analysis, financial modeling, competitive intelligence",
    avatar: "MA",
    color: "primary",
    isEnabled: true,
    creativity: 75,
    responseTime: 2,
    confidence: 94,
    permissions: ["read_data", "generate_reports", "market_analysis"]
  },
  {
    id: "strategist",
    name: "Sophia",
    role: "Strategic Advisor",
    specialization: "Growth strategy, market positioning, risk assessment",
    avatar: "SA",
    color: "accent",
    isEnabled: true,
    creativity: 85,
    responseTime: 3,
    confidence: 89,
    permissions: ["read_data", "strategic_planning", "risk_assessment"]
  },
  {
    id: "ip-expert",
    name: "Victor",
    role: "IP Specialist",
    specialization: "Patent analysis, trademark strategy, IP risk assessment",
    avatar: "VE",
    color: "success",
    isEnabled: true,
    creativity: 60,
    responseTime: 1,
    confidence: 96,
    permissions: ["read_data", "ip_analysis", "patent_search"]
  }
];

export default function AgentSettings() {
  const [agents, setAgents] = useState<AgentConfig[]>(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<string>(agents[0]?.id || '');

  const selectedAgentData = agents.find(agent => agent.id === selectedAgent);

  const updateAgent = (agentId: string, updates: Partial<AgentConfig>) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId ? { ...agent, ...updates } : agent
    ));
  };

  const resetAgent = (agentId: string) => {
    const originalAgent = mockAgents.find(a => a.id === agentId);
    if (originalAgent) {
      updateAgent(agentId, originalAgent);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agent Configuration</h1>
            <p className="text-muted-foreground">Customize AI agent behaviors and capabilities</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Agent
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Agent Selection */}
          <div className="lg:col-span-1">
            <GlassCard className="p-4">
              <h3 className="font-semibold mb-4 flex items-center">
                <Brain className="w-4 h-4 mr-2 text-accent" />
                AI Agents
              </h3>
              <div className="space-y-2">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedAgent === agent.id
                        ? 'bg-primary/20 border border-primary/30'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedAgent(agent.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className={`bg-${agent.color} text-${agent.color}-foreground text-xs font-bold`}>
                          {agent.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{agent.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{agent.role}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Switch
                          checked={agent.isEnabled}
                          onCheckedChange={(checked) => updateAgent(agent.id, { isEnabled: checked })}
                        />
                        <span className="text-xs text-muted-foreground">{agent.confidence}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Agent Configuration */}
          <div className="lg:col-span-3">
            {selectedAgentData && (
              <div className="space-y-6">
                {/* Basic Info */}
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-lg flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-accent" />
                      Agent Profile
                    </h3>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => resetAgent(selectedAgentData.id)}
                      >
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Reset
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="agent-name">Agent Name</Label>
                        <Input
                          id="agent-name"
                          value={selectedAgentData.name}
                          onChange={(e) => updateAgent(selectedAgentData.id, { name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="agent-role">Role</Label>
                        <Input
                          id="agent-role"
                          value={selectedAgentData.role}
                          onChange={(e) => updateAgent(selectedAgentData.id, { role: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="agent-color">Color Theme</Label>
                        <Select 
                          value={selectedAgentData.color}
                          onValueChange={(value) => updateAgent(selectedAgentData.id, { color: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="primary">Primary</SelectItem>
                            <SelectItem value="accent">Accent</SelectItem>
                            <SelectItem value="success">Success</SelectItem>
                            <SelectItem value="warning">Warning</SelectItem>
                            <SelectItem value="destructive">Destructive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="agent-specialization">Specialization</Label>
                        <Textarea
                          id="agent-specialization"
                          value={selectedAgentData.specialization}
                          onChange={(e) => updateAgent(selectedAgentData.id, { specialization: e.target.value })}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Performance Settings */}
                <GlassCard className="p-6">
                  <h3 className="font-semibold text-lg mb-6 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-accent" />
                    Performance Settings
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label>Creativity Level: {selectedAgentData.creativity}%</Label>
                      <Slider
                        value={[selectedAgentData.creativity]}
                        onValueChange={([value]) => updateAgent(selectedAgentData.id, { creativity: value })}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Higher creativity means more innovative but potentially less predictable responses
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label>Response Time: {selectedAgentData.responseTime}s</Label>
                      <Slider
                        value={[selectedAgentData.responseTime]}
                        onValueChange={([value]) => updateAgent(selectedAgentData.id, { responseTime: value })}
                        min={1}
                        max={10}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Target response time for agent replies
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label>Confidence Threshold: {selectedAgentData.confidence}%</Label>
                      <Slider
                        value={[selectedAgentData.confidence]}
                        onValueChange={([value]) => updateAgent(selectedAgentData.id, { confidence: value })}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground">
                        Minimum confidence level before providing recommendations
                      </p>
                    </div>
                  </div>
                </GlassCard>

                {/* Permissions */}
                <GlassCard className="p-6">
                  <h3 className="font-semibold text-lg mb-6 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-accent" />
                    Permissions & Access
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-base">Current Permissions</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedAgentData.permissions.map((permission) => (
                          <Badge key={permission} variant="outline">
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Data Access</Label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Read financial data</span>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Read customer data</span>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Read market data</span>
                            <Switch checked />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-medium">Action Permissions</Label>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Generate reports</span>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Execute analysis</span>
                            <Switch checked />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Send notifications</span>
                            <Switch />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}