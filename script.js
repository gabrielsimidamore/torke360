// =========================================
// TORKE360 — WEBSITE SCRIPTS
// =========================================

document.addEventListener('DOMContentLoaded', () => {

  // ========== AOS INIT ==========
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });

  // ========== NAVBAR SCROLL ==========
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // ========== MOBILE MENU ==========
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ========== HERO PARTICLES ==========
  const particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.bottom = '0';
      particle.style.animationDuration = (8 + Math.random() * 12) + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';
      particle.style.width = (2 + Math.random() * 3) + 'px';
      particle.style.height = particle.style.width;
      particle.style.opacity = (0.3 + Math.random() * 0.5).toString();
      particlesContainer.appendChild(particle);

      setTimeout(() => particle.remove(), 20000);
    };

    // Create initial batch
    for (let i = 0; i < 20; i++) {
      setTimeout(createParticle, i * 300);
    }

    // Keep creating
    setInterval(createParticle, 1200);
  }

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ========== ACTIVE NAV LINKS ==========
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links li a:not(.btn-nav)');

  const observerOptions = {
    rootMargin: '-40% 0px -50% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinksAll.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--yellow)';
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ========== CHART ANIMATION ==========
  const chartBars = document.querySelectorAll('.chart-bar');
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.height = entry.target.style.getPropertyValue('--h');
      }
    });
  }, { threshold: 0.5 });

  chartBars.forEach(bar => {
    const targetHeight = bar.style.height;
    bar.style.setProperty('--h', targetHeight);
    bar.style.height = '0%';
    chartObserver.observe(bar);
  });

  // ========== STAT COUNTER ANIMATION ==========
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(10px)';
        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ========== FORM HANDLING ==========
  window.submitForm = function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const goal = document.getElementById('goal').value;

    // Build WhatsApp message
    const goalMap = {
      vendas: 'Aumentar vendas',
      custo: 'Reduzir custo operacional',
      escala: 'Escalar o negócio',
      automacao: 'Automatizar processos',
      dados: 'Tomar decisões com dados',
    };

    const msg = encodeURIComponent(
      `Olá! Tenho interesse em conhecer a Torke360.\n\n` +
      `*Nome:* ${name}\n` +
      `*Empresa:* ${company}\n` +
      `*E-mail:* ${email}\n` +
      `*Telefone:* ${phone || 'Não informado'}\n` +
      `*Objetivo:* ${goalMap[goal] || goal || 'Não informado'}\n\n` +
      `Gostaria de conversar com um consultor.`
    );

    // Show success state
    document.getElementById('ctaForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';

    // Open WhatsApp after short delay
    setTimeout(() => {
      window.open(`https://wa.me/55?text=${msg}`, '_blank');
    }, 800);
  };

  // Select style fix
  const goalSelect = document.getElementById('goal');
  if (goalSelect) {
    goalSelect.addEventListener('change', () => {
      goalSelect.classList.add('selected');
      goalSelect.style.color = 'var(--white)';
    });
  }

  // ========== PHASE ITEMS STAGGER ==========
  const phaseCards = document.querySelectorAll('.phase-card');
  phaseCards.forEach((card, i) => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'rgba(245, 197, 24, 0.4)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
    });
  });

  // ========== TOGGLE HAMBURGER ANIMATION ==========
  navToggle.addEventListener('click', function() {
    const isOpen = navLinks.classList.contains('open');
    const spans = this.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // ========== WHY LIST HOVER EFFECT ==========
  document.querySelectorAll('.why-list-good li').forEach(li => {
    li.addEventListener('mouseenter', () => {
      li.style.transform = 'translateX(4px)';
      li.style.transition = 'transform 0.2s ease';
    });
    li.addEventListener('mouseleave', () => {
      li.style.transform = '';
    });
  });

});

// ========== PERFORMANCE: reduce animation on low-end devices ==========
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--transition', '0.1s');
}
