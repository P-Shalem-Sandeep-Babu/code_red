import React, { useEffect, useRef, memo } from 'react';

export const Vines = memo(({ active }: { active: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const vines: any[] = [];

    class Vine {
      x: number;
      y: number;
      angle: number;
      width: number;
      color: string;
      length: number;
      maxLength: number;

      constructor(x: number, y: number, angle: number) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.width = 2 + Math.random() * 3;
        this.color = '#1a0505';
        this.length = 0;
        this.maxLength = 100 + Math.random() * 200;
      }

      update() {
        if (this.length >= this.maxLength) return false;

        const nextX = this.x + Math.cos(this.angle) * 2;
        const nextY = this.y + Math.sin(this.angle) * 2;

        ctx!.beginPath();
        ctx!.strokeStyle = this.color;
        ctx!.lineWidth = this.width;
        ctx!.lineCap = 'round';
        ctx!.moveTo(this.x, this.y);
        ctx!.lineTo(nextX, nextY);
        ctx!.stroke();

        this.x = nextX;
        this.y = nextY;
        this.angle += (Math.random() - 0.5) * 0.2;
        this.width *= 0.99;
        this.length += 2;

        if (Math.random() > 0.98 && vines.length < 50) {
          vines.push(new Vine(this.x, this.y, this.angle + (Math.random() - 0.5) * 1));
        }

        return true;
      }
    }

    // Start from corners
    vines.push(new Vine(0, 0, Math.PI / 4));
    vines.push(new Vine(canvas.width, 0, (3 * Math.PI) / 4));
    vines.push(new Vine(0, canvas.height, -Math.PI / 4));
    vines.push(new Vine(canvas.width, canvas.height, (-3 * Math.PI) / 4));

    let animationId: number;
    const animate = () => {
      let growing = false;
      vines.forEach(vine => {
        if (vine.update()) growing = true;
      });
      if (growing) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, [active]);

  return <canvas ref={canvasRef} className={`vine-canvas transition-opacity duration-1000 ${active ? 'opacity-100' : 'opacity-0'}`} />;
});
