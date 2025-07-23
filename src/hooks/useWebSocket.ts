import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: string;
  agentId?: string;
  confidence?: number;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'thinking' | 'offline';
  avatar: string;
}

export const useWebSocket = (roomId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!roomId) return;

    try {
      // In production, this would be wss://your-domain.com/ws/room/${roomId}
      ws.current = new WebSocket(`ws://localhost:8000/ws/room/${roomId}`);
      
      ws.current.onopen = () => {
        setIsConnected(true);
        setConnectionError(null);
      };
      
      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          switch (data.type) {
            case 'message':
              setMessages(prev => [...prev, data.message]);
              break;
            case 'agent_update':
              setAgents(prev => 
                prev.map(agent => 
                  agent.id === data.agent.id ? { ...agent, ...data.agent } : agent
                )
              );
              break;
            case 'agents_list':
              setAgents(data.agents);
              break;
            default:
              console.log('Unknown message type:', data.type);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionError('Connection error occurred');
      };
      
      ws.current.onclose = () => {
        setIsConnected(false);
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setConnectionError('Failed to connect to server');
    }
    
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [roomId]);

  const sendMessage = (content: string, type: 'user' | 'system' = 'user') => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const message = {
        type: 'send_message',
        message: {
          id: Date.now().toString(),
          type,
          content,
          timestamp: new Date().toISOString(),
        }
      };
      ws.current.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  };

  const joinRoom = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'join_room',
        roomId
      }));
    }
  };

  return { 
    messages, 
    agents, 
    isConnected, 
    connectionError,
    sendMessage, 
    joinRoom 
  };
};