import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { 
  Send, 
  Bot, 
  User, 
  Settings, 
  MessageSquare,
  Trash2,
  RotateCcw,
  Copy
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  agent?: string;
}

interface AIAgent {
  id: string;
  name: string;
  model: string;
  description: string;
  available: boolean;
  requiresSubscription: boolean;
}

// Default Hugging Face models
const defaultAgents: AIAgent[] = [
  {
    id: 'hf-gpt2',
    name: 'GPT-2',
    model: 'gpt2',
    description: 'Fast general-purpose text generation',
    available: true,
    requiresSubscription: false
  },
  {
    id: 'hf-distilbert',
    name: 'DistilBERT',
    model: 'distilbert-base-uncased',
    description: 'Efficient question answering',
    available: true,
    requiresSubscription: false
  },
  {
    id: 'hf-blenderbot',
    name: 'BlenderBot',
    model: 'facebook/blenderbot-400M-distill',
    description: 'Conversational AI assistant',
    available: true,
    requiresSubscription: false
  }
];

// Premium agents (require subscription)
const premiumAgents: AIAgent[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    model: 'gpt-4',
    description: 'Advanced reasoning and analysis',
    available: true,
    requiresSubscription: true
  },
  {
    id: 'claude-3',
    name: 'Claude 3',
    model: 'claude-3-sonnet',
    description: 'Expert in complex reasoning',
    available: true,
    requiresSubscription: true
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    model: 'gemini-pro',
    description: 'Multimodal AI assistant',
    available: true,
    requiresSubscription: true
  }
];

export const AIChatSidebar: React.FC = () => {
  const { profile, subscription } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string>('hf-blenderbot');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get user's preferred agent from profile or default to Hugging Face
  const userPreferredAgent = profile?.preferred_agent || 'hf-blenderbot';
  
  // Combine available agents based on subscription
  const availableAgents = [
    ...defaultAgents,
    ...(subscription?.subscribed ? premiumAgents : premiumAgents.map(agent => ({ ...agent, available: false })))
  ];

  const currentAgent = availableAgents.find(agent => agent.id === selectedAgent);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Set initial agent based on user preference
    setSelectedAgent(userPreferredAgent);
  }, [userPreferredAgent]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate AI response (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: `Hello! I'm ${currentAgent?.name || 'your AI assistant'}. I received your message: "${userMessage.content}". This is a demo response. In a real implementation, this would connect to the selected AI model.`,
        timestamp: new Date(),
        agent: currentAgent?.name
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        agent: currentAgent?.name
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <aside className="w-80 glass border-r border-glass-border/30 h-screen sticky top-20 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-glass-border/30">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold flex items-center">
            <Bot className="w-5 h-5 mr-2 text-primary" />
            AI Assistant
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Agent Selection */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">AI Agent</label>
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="glass border-glass-border/30">
              <SelectValue placeholder="Select an AI agent" />
            </SelectTrigger>
            <SelectContent>
              <div className="px-2 py-1">
                <p className="text-xs font-medium text-muted-foreground mb-1">Free Models</p>
              </div>
              {defaultAgents.map((agent) => (
                <SelectItem key={agent.id} value={agent.id}>
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.description}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs ml-2">Free</Badge>
                  </div>
                </SelectItem>
              ))}
              {subscription?.subscribed && (
                <>
                  <div className="px-2 py-1 mt-2">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Premium Models</p>
                  </div>
                  {premiumAgents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-xs text-muted-foreground">{agent.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs ml-2">Pro</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
          
          {currentAgent && (
            <div className="text-xs text-muted-foreground flex items-center">
              <Bot className="w-3 h-3 mr-1" />
              {currentAgent.name} • {currentAgent.model}
            </div>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Start a conversation with your AI assistant</p>
              <p className="text-xs mt-1">Ask questions, get insights, or brainstorm ideas</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div key={message.id} className="group">
              <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Avatar className="w-6 h-6 mt-1">
                    <AvatarFallback className={`text-xs ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {message.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'glass border-glass-border/30'}`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {message.agent && ` • ${message.agent}`}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 h-5 w-5 p-0"
                        onClick={() => copyMessage(message.content)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <Avatar className="w-6 h-6 mt-1">
                  <AvatarFallback className="bg-muted">
                    <Bot className="w-3 h-3" />
                  </AvatarFallback>
                </Avatar>
                <div className="glass border-glass-border/30 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-glass-border/30">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="glass border-glass-border/30"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !inputValue.trim()}
            size="sm"
            className="px-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {!subscription?.subscribed && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Upgrade to access premium AI models • <Button variant="link" className="p-0 h-auto text-xs">View Plans</Button>
          </p>
        )}
      </div>
    </aside>
  );
};
