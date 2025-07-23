import React from 'react';
import { Zap } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
        <Zap className="w-5 h-5 text-primary-foreground" />
      </div>
      <div>
        <h1 className="text-lg font-bold text-foreground">Kodaxa</h1>
        <p className="text-xs text-muted-foreground">Orchestrator</p>
      </div>
    </div>
  );
};