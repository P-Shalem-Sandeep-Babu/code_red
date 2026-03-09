import React, { useState, useEffect } from 'react';

export const Flashlight = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="flashlight" 
      style={{ '--x': `${mousePos.x}px`, '--y': `${mousePos.y}px` } as any} 
    />
  );
};
