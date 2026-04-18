import { useEffect, useRef } from 'react';
import { useInView } from 'motion/react';

export default function TransformationNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Trigger the animation when the section is well within the viewport
  const isInView = useInView(containerRef, { once: false, margin: "-20%" });
  const progressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      targetX: number;
      targetY: number;
      radius: number;
      baseAlpha: number;
      isPurple: boolean;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        
        const gridSize = 80;
        this.targetX = Math.round(this.x / gridSize) * gridSize;
        this.targetY = Math.round(this.y / gridSize) * gridSize;
        this.radius = Math.random() * 1.5 + 0.5;
        this.baseAlpha = Math.random() * 0.4 + 0.1;
        this.isPurple = Math.random() > 0.8;
      }

      update(progress: number) {
        // Chaotic movement
        this.x += this.vx * (1 - progress);
        this.y += this.vy * (1 - progress);
        
        // Erratic glitching when broken (progress < 0.3)
        if (progress < 0.3 && Math.random() > 0.95) {
          this.vx += (Math.random() - 0.5) * 1;
          this.vy += (Math.random() - 0.5) * 1;
          this.vx = Math.max(-1.5, Math.min(1.5, this.vx));
          this.vy = Math.max(-1.5, Math.min(1.5, this.vy));
        }

        // Wrap around for chaos
        if (this.x < 0) this.x += width;
        if (this.x > width) this.x -= width;
        if (this.y < 0) this.y += height;
        if (this.y > height) this.y -= height;

        // Structured movement
        if (progress > 0) {
          // Ease into the target grid position
          this.x += (this.targetX - this.x) * 0.05 * progress;
          this.y += (this.targetY - this.y) * 0.05 * progress;
          
          // Occasionally pick a new grid target when fully structured
          if (progress > 0.8 && Math.random() > 0.98) {
             const gridSize = 80;
             const directions = [[1,0], [-1,0], [0,1], [0,-1]];
             const dir = directions[Math.floor(Math.random() * directions.length)];
             this.targetX += dir[0] * gridSize;
             this.targetY += dir[1] * gridSize;
             
             if (this.targetX < 0) this.targetX += width;
             if (this.targetX > width) this.targetX -= width;
             if (this.targetY < 0) this.targetY += height;
             if (this.targetY > height) this.targetY -= height;
          }
        }
      }

      draw(progress: number) {
        if (!ctx) return;
        
        // Interpolate color from muted gray/blue to electric blue/purple
        // Start: #4b5563 (75, 85, 99)
        // End Blue: #3b82f6 (59, 130, 246)
        // End Purple: #8b5cf6 (139, 92, 246)
        
        const endR = this.isPurple ? 139 : 59;
        const endG = this.isPurple ? 92 : 130;
        const endB = 246;

        const r = Math.floor(75 + (endR - 75) * progress);
        const g = Math.floor(85 + (endG - 85) * progress);
        const b = Math.floor(99 + (endB - 99) * progress);
        const color = `rgb(${r}, ${g}, ${b})`;

        // Flicker when broken
        const flicker = progress < 0.3 && Math.random() > 0.9 ? 0.5 : 1;
        
        ctx.globalAlpha = this.baseAlpha * flicker + (0.5 * progress);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + (progress * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Add glow as it becomes structured
        if (progress > 0.3) {
          ctx.globalAlpha = 0.2 * progress;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    }

    const init = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particles = [];
      const numParticles = Math.min(Math.floor((width * height) / 10000), 100);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(width, height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update progress smoothly based on scroll visibility
      if (isInView) {
        progressRef.current = Math.min(1, progressRef.current + 0.005); // ~3 seconds to complete
      } else {
        progressRef.current = Math.max(0, progressRef.current - 0.015); // Faster reset when out of view
      }
      
      // Easing function for smoother visual transition
      const easeInOutCubic = (x: number): number => {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
      };
      
      const p = easeInOutCubic(progressRef.current);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(p);
        particles[i].draw(p);
        
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            // Chaotic connection logic (connect anything close, but weakly)
            const chaoticAlpha = (1 - p) * (1 - distance / 150) * 0.15;
            
            // Structured connection logic (connect only orthogonal, strongly)
            const isAligned = Math.abs(dx) < 15 || Math.abs(dy) < 15;
            const structuredAlpha = p * (isAligned ? (1 - distance / 150) * 0.6 : 0);
            
            const alpha = chaoticAlpha + structuredAlpha;
            
            if (alpha > 0.02) {
              const r = Math.floor(75 + (59 - 75) * p);
              const g = Math.floor(85 + (130 - 85) * p);
              const b = Math.floor(99 + (246 - 99) * p);
              
              ctx.beginPath();
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
              ctx.lineWidth = 0.5 + (p * 1);
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener('resize', init);
    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full opacity-70" />
    </div>
  );
}
