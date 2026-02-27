/* =========================================
   Smart Home Nerd - Subtle Particle Network
   Interaktives Mesh-Hintergrund mit GSAP
   ========================================= */

class ParticleNetwork {
  constructor() {
    this.canvas = document.getElementById('particle-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null };
    this.animationId = null;

    // Konfiguration
    this.config = {
      particleCount: window.innerWidth < 768 ? 60 : 100,
      connectionDistance: 200,
      mouseDistance: 200,
      baseSpeed: 0.3,
      baseOpacity: 0.4,
      accentColor: [59, 130, 246], // #3b82f6
      secondaryColor: [139, 155, 179] // #8b9bb3
    };

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.config.baseSpeed,
        vy: (Math.random() - 0.5) * this.config.baseSpeed,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
  }

  bindEvents() {
    // Mouse tracking mit GSAP für Smoothness
    window.addEventListener('mousemove', (e) => {
      gsap.to(this.mouse, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Resize-Handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resize();
        this.createParticles();
      }, 250);
    });

    // Visibility-Handling (Performance)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(this.animationId);
      } else {
        this.animate();
      }
    });

    // Scroll-basierte Opacity (GSAP ScrollTrigger)
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        // Canvas wird subtiler beim Scrollen
        const progress = self.progress;
        this.canvas.style.opacity = 1 - (progress * 0.3);
      }
    });
  }

  drawParticle(particle) {
    const pulse = Math.sin(particle.pulsePhase) * 0.5 + 0.5;
    const currentRadius = particle.radius * (0.8 + pulse * 0.4);
    const currentOpacity = particle.opacity * (0.7 + pulse * 0.3);

    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(${this.config.accentColor[0]}, ${this.config.accentColor[1]}, ${this.config.accentColor[2]}, ${currentOpacity})`;
    this.ctx.fill();

    // Glow-Effekt für größere Partikel
    if (particle.radius > 2) {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, currentRadius * 3, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${this.config.accentColor[0]}, ${this.config.accentColor[1]}, ${this.config.accentColor[2]}, ${currentOpacity * 0.1})`;
      this.ctx.fill();
    }

    particle.pulsePhase += 0.02;
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      let connections = 0;

      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.config.connectionDistance && connections < 3) {
          const opacity = (1 - distance / this.config.connectionDistance) * this.config.baseOpacity;

          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(${this.config.accentColor[0]}, ${this.config.accentColor[1]}, ${this.config.accentColor[2]}, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();

          connections++;
        }
      }

      // Maus-Verbindungen
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const mdx = this.particles[i].x - this.mouse.x;
        const mdy = this.particles[i].y - this.mouse.y;
        const mDistance = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDistance < this.config.mouseDistance) {
          const opacity = (1 - mDistance / this.config.mouseDistance) * 0.25;

          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(${this.config.accentColor[0]}, ${this.config.accentColor[1]}, ${this.config.accentColor[2]}, ${opacity})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }
  }

  updateParticles() {
    this.particles.forEach(particle => {
      // Position aktualisieren
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bildschirmgrenzen (Wrap-around)
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      // Maus-Repulsion (sanft)
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = particle.x - this.mouse.x;
        const dy = particle.y - this.mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.config.mouseDistance) {
          const force = (this.config.mouseDistance - distance) / this.config.mouseDistance;
          particle.vx += (dx / distance) * force * 0.02;
          particle.vy += (dy / distance) * force * 0.02;
        }
      }

      // Geschwindigkeit begrenzen
      const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      if (speed > this.config.baseSpeed * 2) {
        particle.vx = (particle.vx / speed) * this.config.baseSpeed * 2;
        particle.vy = (particle.vy / speed) * this.config.baseSpeed * 2;
      }

      // Sanft zurück zur Basisgeschwindigkeit
      particle.vx += (Math.random() - 0.5) * 0.01;
      particle.vy += (Math.random() - 0.5) * 0.01;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateParticles();
    this.drawConnections();

    this.particles.forEach(particle => {
      this.drawParticle(particle);
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  // Öffentliche Methode für Pause/Resume
  pause() {
    cancelAnimationFrame(this.animationId);
  }

  resume() {
    this.animate();
  }
}

// Initialisierung
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ParticleNetwork();
  });
} else {
  new ParticleNetwork();
}

// Export für externe Steuerung
window.ParticleNetwork = ParticleNetwork;
