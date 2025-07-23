import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-9 h-9 rounded-lg bg-gradient-executive flex items-center justify-center shadow-lg">
          <div className="w-5 h-5 rounded-sm bg-background/90 flex items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full" />
          </div>
        </div>
        <div className="absolute -inset-1 bg-gradient-executive rounded-lg opacity-20 blur-sm" />
      </div>
      <div>
        <h1 className="text-lg font-bold text-foreground tracking-tight">KODAXA</h1>
        <p className="text-xs text-muted-foreground font-medium tracking-widest">ORCHESTRATOR</p>
      </div>
    </div>
  );
};