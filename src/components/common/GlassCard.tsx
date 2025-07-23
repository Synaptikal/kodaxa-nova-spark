import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  gradient 
}) => {
  return (
    <div className={`
      glass border border-glass-border/30 p-6 rounded-xl relative
      ${hover ? 'hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer' : ''}
      ${gradient ? `before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r ${gradient} before:rounded-t-xl` : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};