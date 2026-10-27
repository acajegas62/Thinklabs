'use strict';

// ---------------------------------------------------------------------------
// Mobile Navigation Menu
// ---------------------------------------------------------------------------
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

function closeMenu() {
  if (!mobileMenu || !menuButton) return;
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  menuButton.textContent = '☰';
}

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    mobileMenu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuButton.textContent = open ? '×' : '☰';
  });

  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !mobileMenu.hidden) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', e => {
    if (!mobileMenu.hidden && !mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
      closeMenu();
    }
  });
}

// ---------------------------------------------------------------------------
// Services Tab Navigation
// ---------------------------------------------------------------------------
const services = {
  strategy: [
    'Clarity before\ncreativity.',
    'A shared vision. A clear purpose.\nA brand that knows where it’s going.',
    'We ask the right questions, find your difference, and turn a clear direction into a creative advantage.',
    ['Brand strategy', 'Art direction', 'Creative concept']
  ],
  design: [
    'Distinctly,\nunmistakably you.',
    'A visual language with a point of view.\nBuilt to be recognized. Made to last.',
    'We translate your ambition into an identity with character, from the mark on your door to every brand touchpoint.',
    ['Brand identity', 'Graphic design', 'Packaging']
  ],
  production: [
    'Make them\nfeel something.',
    'Stories with substance. Images with impact.\nFrom the first frame to the final cut.',
    'Film, photography, and production that bring your story into focus. Thoughtfully directed. Carefully made.',
    ['Film & photography', 'Creative production', 'Events']
  ],
  digital: [
    'Your next\npossibility.',
    'Beautifully considered. Effortlessly connected.\nExperiences designed around people.',
    'We build digital experiences and campaigns that connect your brand with the people who matter.',
    ['Web development', 'Digital marketing', 'Content strategy']
  ]
};

function bindTabs(selector, activate) {
  const tabs = [...document.querySelectorAll(selector)];
  function select(tab) {
    tabs.forEach(t => {
      t.setAttribute('aria-selected', String(t === tab));
      t.tabIndex = t === tab ? 0 : -1;
    });
    activate(tab);
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', e => {
      let next;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        e.preventDefault();
        select(tabs[next]);
        tabs[next].focus();
      }
    });
  });
}

bindTabs('[data-service]', tab => {
  const data = services[tab.dataset.service];
  const title = document.querySelector('#service-title');
  if (title) {
    title.textContent = data[0];
    title.style.whiteSpace = 'pre-line';
  }
  const detail = document.querySelector('#service-detail');
  if (detail) {
    detail.textContent = data[1];
    detail.style.whiteSpace = 'pre-line';
  }
  const desc = document.querySelector('#service-description');
  if (desc) desc.textContent = data[2];
  const tags = document.querySelector('#service-tags');
  if (tags) {
    tags.replaceChildren(
      ...data[3].map(text => {
        const span = document.createElement('span');
        span.textContent = text;
        return span;
      })
    );
  }
  const panel = document.querySelector('#service-panel');
  if (panel) panel.setAttribute('aria-labelledby', tab.id);
  const footerIndex = document.querySelector('.window-footer>span:last-child');
  if (footerIndex) {
    footerIndex.textContent = `0${Object.keys(services).indexOf(tab.dataset.service) + 1} / 04`;
  }
});

// ---------------------------------------------------------------------------
// Process Steps Tabs
// ---------------------------------------------------------------------------
const steps = [
  ['It starts with a conversation.', 'Your ambition. Our curiosity. A shared starting point.', ['Listen & learn', 'Find the opportunity', 'Make a plan'], ['Get to know your world', 'A fresh perspective', 'The way forward, together']],
  ['A clear direction. A shared vision.', 'Connect the insights. Find the idea worth pursuing.', ['Define your purpose', 'Shape the strategy', 'Align the vision'], ['What makes you different', 'A direction with meaning', 'Everyone on the same page']],
  ['This is where it comes to life.', 'Thoughtful exploration. Hands-on craft. Every detail.', ['Explore the possibilities', 'Craft the experience', 'Refine together'], ['Make room for the unexpected', 'Ideas become real', 'Good becomes great']],
  ['Ready for the world.', 'Launch with intention. Keep looking forward.', ['Prepare for launch', 'Put it into the world', 'Learn & evolve'], ['Every detail, considered', 'Your next chapter starts', 'Keep the momentum going']]
];

bindTabs('[data-step]', tab => {
  const s = steps[Number(tab.dataset.step)];
  const title = document.querySelector('#process-title');
  if (title) title.textContent = s[0];
  const desc = document.querySelector('#process-description');
  if (desc) desc.textContent = s[1];
  const panel = document.querySelector('#process-panel');
  if (panel) panel.setAttribute('aria-labelledby', tab.id);
  document.querySelectorAll('.project-row>div').forEach((row, i) => {
    const small = document.createElement('small');
    small.textContent = s[3][i];
    row.replaceChildren(document.createTextNode(s[2][i]), small);
  });
});

// FAQ Accordion
document.querySelectorAll('.faq-list details').forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      document.querySelectorAll('.faq-list details').forEach(other => {
        if (other !== item) other.open = false;
      });
    }
  });
});

// Clock & Year
function updateClock() {
  const el = document.querySelector('#cebu-time');
  if (el) {
    el.textContent = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(new Date());
  }
}
updateClock();
setInterval(updateClock, 60000);

const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------------------------------------------------------------------------
// Smooth Inertial Scrolling & Scroll Animation Physics (Like Reference Video)
// ---------------------------------------------------------------------------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenisInstance = null;

if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
  lenisInstance = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.4,
    infinite: false,
  });

  function raf(time) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// Fixed Header Glass Effect & Hero Parallax
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-image');
const heroContent = document.querySelector('.hero-content');
const heroCaption = document.querySelector('.hero-caption');
const workCards = document.querySelectorAll('.work-card');

function handleScrollUpdates() {
  const scrollY = window.scrollY || window.pageYOffset || 0;

  // Header frosted glass on scroll
  if (header) {
    header.classList.toggle('scrolled', scrollY > 40);
  }

  // Hero parallax & fade
  if (hero && heroImage && scrollY < 950 && !prefersReducedMotion) {
    const heroHeight = hero.offsetHeight || 730;
    const progress = Math.min(1, scrollY / heroHeight);
    heroImage.style.transform = `translate3d(0, ${(scrollY * 0.32).toFixed(1)}px, 0) scale(${(1 + progress * 0.05).toFixed(4)})`;
    if (heroContent) {
      heroContent.style.opacity = Math.max(0, 1 - progress * 1.45).toFixed(3);
      heroContent.style.transform = `translate3d(0, ${(-scrollY * 0.16).toFixed(1)}px, 0)`;
    }
    if (heroCaption) {
      heroCaption.style.opacity = Math.max(0, 1 - progress * 2.2).toFixed(3);
    }
  }

  // Work card image parallax (window effect from reference video)
  if (workCards.length && !prefersReducedMotion) {
    const vh = window.innerHeight;
    workCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < vh + 100 && rect.bottom > -100) {
        const img = card.querySelector('.work-image img');
        if (img) {
          const progress = (vh - rect.top) / (vh + rect.height);
          const shiftY = ((progress - 0.5) * 36).toFixed(1);
          img.style.transform = `translate3d(0, ${shiftY}px, 0) scale(1.04)`;
        }
      }
    });
  }
}

if (lenisInstance) {
  lenisInstance.on('scroll', handleScrollUpdates);
} else {
  window.addEventListener('scroll', handleScrollUpdates, { passive: true });
}
handleScrollUpdates();

// Smooth Anchor Link Navigation via Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.length > 1) {
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (lenisInstance) {
          lenisInstance.scrollTo(targetEl, { offset: -70, duration: 1.35 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
        if (typeof closeMenu === 'function' && !mobileMenu.hidden) {
          closeMenu();
        }
      }
    }
  });
});

// Scroll Reveal Animations (IntersectionObserver)
const revealSelectors = [
  '.manifesto p',
  '.section-heading',
  '.work-card',
  '.belief-grid',
  '.service-visual',
  '.service-list',
  '.process-tabs button',
  '.project-window',
  '.use-grid article',
  '.principles > div',
  '.faq-grid > div',
  '.cta-content'
];

const revealTargets = document.querySelectorAll(revealSelectors.join(','));
revealTargets.forEach(el => el.classList.add('reveal-item'));

// Stagger delays for grid lists
document.querySelectorAll('.work-grid, .use-grid, .principles').forEach(grid => {
  [...grid.children].forEach((child, i) => {
    child.classList.add(`stagger-${(i % 4) + 1}`);
  });
});

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.12
  });

  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('is-visible'));
}
