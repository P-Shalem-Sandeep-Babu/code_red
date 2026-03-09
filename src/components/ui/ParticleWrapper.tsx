import React, { useState } from 'react';
import { HoverParticles } from './HoverParticles';

interface ParticleWrapperProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  count?: number;
}

export const ParticleWrapper: React.FC<ParticleWrapperProps> = ({ 
  children, 
  className = '',
  color = '#E71D36',
  count = 15
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <HoverParticles isHovered={isHovered} color={color} count={count} />
    </div>
  );
};
