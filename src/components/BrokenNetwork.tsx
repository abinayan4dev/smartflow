import { useEffect, useRef } from 'react';

export default function BrokenNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      radius: number;
      baseAlpha: number;
      color: string;
      dimOffset: number;
      dimSpeed: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.radius = Math.random() * 1.5 + 0.5;
        this.baseAlpha = Math.random() * 0.4 + 0.1;
        
        // For smooth, slow dimming
        this.dimOffset = Math.random() * Math.PI * 2;
        this.dimSpeed = Math.random() * 0.01 + 0.005;
        
        // Muted tech colors with blue/purple accents
        const colors = ['#3b82f6', '#8b5cf6', '#60a5fa', '#a78bfa', '#ffffff', '#1e3a8a'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Smooth, slow pulse
        this.dimOffset += this.dimSpeed;
        
        // Add very subtle base drift
        this.vx += (Math.random() - 0.5) * 0.01;
        this.vy += (Math.random() - 0.5) * 0.01;
        
        // Speed limit
        this.vx = Math.max(-0.5, Math.min(0.5, this.vx));
        this.vy = Math.max(-0.5, Math.min(0.5, this.vy));
        
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        // Smooth, slow pulse instead of harsh flicker
        const pulse = (Math.sin(this.dimOffset) + 1) / 2; // 0 to 1
        // Map pulse to 0.3 - 1.0 so it doesn't completely disappear
        const dimFactor = pulse * 0.7 + 0.3;
        
        ctx.globalAlpha = this.baseAlpha * dimFactor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        ctx.fillStyle = this.color;
        ctx.fill();
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
      const numParticles = Math.min(Math.floor((width * height) / 8000), 100);
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(width, height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Add some broken connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Randomly draw broken, short-lived lines between close particles
          if (distance < 150 && Math.random() > 0.98) {
            const isPurple = Math.random() > 0.5;
            const r = isPurple ? 139 : 59;
            const g = isPurple ? 92 : 130;
            const b = isPurple ? 246 : 246;
            const alpha = Math.random() * 0.3 + 0.1;
            
            // Incomplete/fading line end (doesn't perfectly connect)
            const breakFactor = Math.random() * 0.4 + 0.4; // Line only goes 40-80% of the way
            const endX = particles[i].x - dx * breakFactor;
            const endY = particles[i].y - dy * breakFactor;
            
            // Create gradient to fade out the broken line smoothly
            const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, endX, endY);
            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
            gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = Math.random() * 1.2;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
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
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50 pointer-events-none" />;
}
