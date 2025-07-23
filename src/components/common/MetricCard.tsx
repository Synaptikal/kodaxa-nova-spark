import React from 'react';
import { GlassCard } from './GlassCard';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  value: string | number;
  label: string;
  change?: {
    value: number;
    positive: boolean;
  };
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  value, 
  label, 
  change,
  icon: Icon,
  color = 'primary'
}) => {
  return (
    <GlassCard hover className="text-center">
      {Icon && (
        <div className="flex justify-center mb-3">
          <Icon className={`w-8 h-8 text-${color}`} />
        </div>
      )}
      <div className={`text-3xl font-bold text-${color} mb-2`}>
        {value}
      </div>
      <div className="text-muted-foreground text-sm uppercase tracking-wide mb-3">
        {label}
      </div>
      {change && (
        <div className={`inline-flex items-center text-xs px-3 py-1 rounded-full ${
          change.positive 
            ? 'bg-success/20 text-success' 
            : 'bg-destructive/20 text-destructive'
        }`}>
          {change.positive ? (
            <TrendingUp className="w-3 h-3 mr-1" />
          ) : (
            <TrendingDown className="w-3 h-3 mr-1" />
          )}
          {Math.abs(change.value)}%
        </div>
      )}
    </GlassCard>
  );
};