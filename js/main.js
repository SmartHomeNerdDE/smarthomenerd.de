/* =========================================
   Smart Home Nerd - Main JavaScript
   GSAP Animations & Mobile Menu
   ========================================= */

// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Smart Home Nerd Website initialized');
  
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Initialize Lucide icons
  lucide.createIcons();
  
  // =========================================
  // Mobile Menu Toggle
  // =========================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  let isMenuOpen = false;
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      isMenuOpen = !isMenuOpen;
      
      if (isMenuOpen) {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
      }
      
      // Re-initialize icons after changing HTML
      lucide.createIcons();
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        isMenuOpen = false;
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
        lucide.createIcons();
      });
    });
  }
  
  // =========================================
  // Header Scroll Effect
  // =========================================
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });
  
  // =========================================
  // Hero Animations
  // =========================================
  
  // Hero Badge fade in
  gsap.fromTo('.hero-badge', 
    { opacity: 0, y: 20 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      ease: 'power2.out',
      delay: 0.2 
    }
  );
  
  // Hero Headline animation
  gsap.fromTo('.hero-headline', 
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1, 
      ease: 'power2.out',
      delay: 0.4 
    }
  );
  
  // Hero Subtitle animation
  gsap.fromTo('.hero-subtitle', 
    { opacity: 0, y: 20 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      ease: 'power2.out',
      delay: 0.6 
    }
  );
  
  // Hero CTA Buttons animation
  gsap.fromTo('.hero-cta', 
    { opacity: 0, y: 20 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      ease: 'power2.out',
      delay: 0.8 
    }
  );
  
  // Hero Stats animation
  gsap.fromTo('.hero-stats', 
    { opacity: 0, y: 20 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      ease: 'power2.out',
      delay: 1 
    }
  );
  
  // =========================================
  // Scroll-Triggered Animations
  // =========================================
  
  // About Section
  gsap.fromTo('.about-content', 
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }
  );
  
  // About Image
  gsap.fromTo('.about-image', 
    { opacity: 0, x: -40 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#about',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }
  );
  
  // About Features staggered
  gsap.fromTo('.about-feature', 
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.about-features',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  );
  
  // Videos Section
  gsap.fromTo('.videos-header', 
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#videos',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }
  );
  
  // Video Cards staggered
  gsap.fromTo('.video-card', 
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.videos-grid',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    }
  );
  
  // Setup Section
  gsap.fromTo('.setup-header', 
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#setup',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }
  );
  
  // Setup Cards staggered
  gsap.fromTo('.setup-card', 
    { opacity: 0, y: 40, scale: 0.95 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.setup-grid',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Contact Section
  gsap.fromTo('.contact-header', 
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Contact Content
  gsap.fromTo('.contact-content', 
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Footer
  gsap.fromTo('.footer-content', 
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: 'footer',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Show success message (in production, this would send data to a server)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i> Nachricht gesendet!';
      submitBtn.disabled = true;
      submitBtn.classList.add('bg-green-600');
      submitBtn.classList.remove('bg-accent');
      lucide.createIcons();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('bg-green-600');
        submitBtn.classList.add('bg-accent');
        contactForm.reset();
        lucide.createIcons();
      }, 3000);
    });
  }

});
