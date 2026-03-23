import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const AnimatedBackground = ({ children }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let isAnimating = true;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.color = this.getRandomColor();
      }

      getRandomColor() {
        const colors = ['#3a86ff', '#8338ec', '#ff006e'];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const init = () => {
      resizeCanvas();
      particles = [];
      // Reduced particle count for better performance
      for (let i = 0; i < 30; i++) { // Further reduced from 50 to 30
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!isAnimating) return;
      
      // Clear canvas with very light trail effect
      ctx.fillStyle = 'rgba(26, 26, 46, 0.01)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections only for nearby particles (further reduced for performance)
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 60) { // Further reduced from 80 to 60
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - distance / 60) * 0.05; // Further reduced opacity
            ctx.lineWidth = 0.2; // Further reduced line width
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      // Pause animation when scrolling
      isAnimating = false;
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        isAnimating = true;
        animate();
      }, 150); // Resume after scroll stops
    };

    const handleResize = () => {
      resizeCanvas();
    };

    init();
    animate();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(window.scrollTimeout);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default AnimatedBackground;
