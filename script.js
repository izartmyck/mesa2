const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

document.querySelectorAll('#navMenu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    const formData = new FormData(contactForm);
    const name = String(formData.get('name')).trim();
    const email = String(formData.get('email')).trim();
    const message = String(formData.get('message')).trim();
    const whatsappText = document.getElementById('contactWhatsAppText');

    whatsappText.value = [
      'Halo, saya ' + name + '.',
      email ? 'Email: ' + email : '',
      '',
      message
    ].filter(Boolean).join('\n');
  });
}

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('#navMenu a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => observer.observe(section));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-enabled');

  const revealTargets = document.querySelectorAll(
    '.section-kicker, .section-heading, .intro-grid, .story-banner, .potential-card, .callout, .school-card, .church-card, .map-image-wrap, .closing-content'
  );
  const revealObserver = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((target, index) => {
    target.classList.add('reveal');
    target.style.setProperty('--reveal-index', String(index % 4));
    revealObserver.observe(target);
  });

  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const targetValue = Number(counter.dataset.count);
      const startedAt = performance.now();
      const duration = 1100;
      currentObserver.unobserve(counter);

      const updateCount = now => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        counter.textContent = String(Math.round(targetValue * easedProgress));
        if (progress < 1) requestAnimationFrame(updateCount);
      };

      requestAnimationFrame(updateCount);
    });
  }, { threshold: 0.5 });
  counters.forEach(counter => counterObserver.observe(counter));
}
