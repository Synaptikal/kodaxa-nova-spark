import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedIconProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'glow' | 'bounce' | 'spin' | 'pulse' | 'neon';
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'destructive';
  className?: string;
}

export const EnhancedIcon: React.FC<EnhancedIconProps> = ({
  icon: Icon,
  size = 'md',
  variant = 'default',
  color = 'primary',
  className
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-success',
    warning: 'text-warning',
    destructive: 'text-destructive'
  };

  const variantClasses = {
    default: 'transition-all duration-300 hover:scale-110',
    glow: 'transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_currentColor]',
    bounce: 'animate-bounce hover:animate-none transition-all duration-300',
    spin: 'animate-spin hover:animate-none transition-all duration-300',
    pulse: 'animate-pulse hover:animate-none transition-all duration-300 hover:scale-110',
    neon: 'transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_currentColor] hover:brightness-125'
  };

  return (
    <div className="relative inline-block group">
      <Icon 
        className={cn(
          sizeClasses[size],
          colorClasses[color],
          variantClasses[variant],
          className
        )}
      />
      {variant === 'glow' && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
          <Icon 
            className={cn(
              sizeClasses[size],
              colorClasses[color],
              'blur-sm'
            )}
          />
        </div>
      )}
    </div>
  );
};