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
  window.lenis = lenisInstance;

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

let heroHeight = 730;
let lastHeaderScrolled = false;

// Pre-cache work card DOM nodes and metrics (Zero querySelector / layout calls on scroll)
const cachedWorkCards = Array.from(workCards).map(card => ({
  card,
  img: card.querySelector('.work-image img'),
  top: 0,
  height: 0,
  lastShiftY: -9999
}));

function refreshParallaxMetrics() {
  if (hero) heroHeight = hero.offsetHeight || 730;
  const currentScroll = window.scrollY || window.pageYOffset || 0;
  for (let i = 0; i < cachedWorkCards.length; i++) {
    const item = cachedWorkCards[i];
    const rect = item.card.getBoundingClientRect();
    item.top = rect.top + currentScroll;
    item.height = rect.height || item.card.offsetHeight;
  }
}
refreshParallaxMetrics();

function handleScrollUpdates() {
  const scrollY = lenisInstance ? lenisInstance.scroll : (window.scrollY || window.pageYOffset || 0);

  // Header frosted glass on scroll (only update DOM when state toggles)
  if (header) {
    const isScrolled = scrollY > 40;
    if (isScrolled !== lastHeaderScrolled) {
      header.classList.toggle('scrolled', isScrolled);
      lastHeaderScrolled = isScrolled;
    }
  }

  // Hero parallax & fade
  if (hero && heroImage && scrollY < 950 && !prefersReducedMotion) {
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

  // Work card image parallax using cached metrics (zero layout queries!)
  if (cachedWorkCards.length && !prefersReducedMotion) {
    const vh = window.innerHeight || 800;
    for (let i = 0; i < cachedWorkCards.length; i++) {
      const item = cachedWorkCards[i];
      if (!item.img) continue;
      const cardTop = item.top - scrollY;
      if (cardTop < vh + 100 && cardTop + item.height > -100) {
        const progress = (vh - cardTop) / (vh + item.height);
        const shiftY = ((progress - 0.5) * 36) | 0; // integer px, zero float churn
        if (shiftY !== item.lastShiftY) {
          item.img.style.transform = `translate3d(0, ${shiftY}px, 0) scale(1.04)`;
          item.lastShiftY = shiftY;
        }
      }
    }
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

// Jump to hash if present on initial load
if (window.location.hash) {
  setTimeout(() => {
    const target = document.querySelector(window.location.hash);
    if (target) {
      if (lenisInstance) {
        lenisInstance.scrollTo(target, { offset: -70, immediate: true });
      } else {
        target.scrollIntoView();
      }
    }
  }, 100);
}

// Scroll Reveal Animations (IntersectionObserver)
const revealSelectors = [
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
revealTargets.forEach(el => {
  if (!el.matches('[data-scroll="scrub"], [data-reveal="scrub"], [data-reveal="auto"]')) {
    el.classList.add('reveal-item');
  }
});

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

// ---------------------------------------------------------------------------
// High-Performance Color Wave Text Reveal Engine
// (Zero Layout Thrashing, Precomputed LUTs, Zero Allocation, Bidirectional Scrub)
// Reference: assets/images/6cd205a7-2630-490a-8584-48b9ff950dc4.mp4
// ---------------------------------------------------------------------------

function initColorWaveReveal() {
  const scrubElements = document.querySelectorAll('[data-scroll="scrub"], [data-reveal="scrub"], .color-wave-scrub');
  const autoElements = document.querySelectorAll('[data-reveal="auto"], .color-wave-auto');
  
  if (!scrubElements.length && !autoElements.length) return;

  // Build a 64-step static Color/Shadow Look-Up Table (LUT)
  // Completely eliminates string concatenation and GC allocations during scrolling!
  const LUT_STEPS = 64;
  const lutCache = new Map();

  function getPaletteLUT(dim, wave, lit) {
    const key = `${dim.r},${dim.g},${dim.b},${dim.a}|${wave.r},${wave.g},${wave.b}|${lit.r},${lit.g},${lit.b}`;
    if (lutCache.has(key)) return lutCache.get(key);

    const colors = new Array(LUT_STEPS);
    const shadows = new Array(LUT_STEPS);
    const dimStr = `rgba(${dim.r}, ${dim.g}, ${dim.b}, ${dim.a})`;
    const litStr = `rgb(${lit.r}, ${lit.g}, ${lit.b})`;
    const waveStr = `rgb(${wave.r}, ${wave.g}, ${wave.b})`;

    for (let step = 0; step < LUT_STEPS; step++) {
      if (step === 0) {
        colors[step] = dimStr;
        shadows[step] = 'none';
        continue;
      }
      if (step === LUT_STEPS - 1) {
        colors[step] = litStr;
        shadows[step] = 'none';
        continue;
      }
      if (step === 32) {
        colors[step] = waveStr;
        shadows[step] = `0 0 14px rgba(${wave.r}, ${wave.g}, ${wave.b}, 0.55)`;
        continue;
      }

      let r, g, b, a, glow;
      if (step < 32) {
        const f = step / 32;
        const k = 0.5 - 0.5 * Math.cos(Math.PI * f);
        r = Math.round(dim.r + (wave.r - dim.r) * k);
        g = Math.round(dim.g + (wave.g - dim.g) * k);
        b = Math.round(dim.b + (wave.b - dim.b) * k);
        a = +(dim.a + (wave.a - dim.a) * k).toFixed(3);
        glow = k;
      } else {
        const f = (step - 32) / 31;
        const k = 0.5 - 0.5 * Math.cos(Math.PI * f);
        r = Math.round(wave.r + (lit.r - wave.r) * k);
        g = Math.round(wave.g + (lit.g - wave.g) * k);
        b = Math.round(wave.b + (lit.b - wave.b) * k);
        a = +(wave.a + (lit.a - wave.a) * k).toFixed(3);
        glow = 1 - k;
      }

      colors[step] = `rgba(${r}, ${g}, ${b}, ${a})`;
      shadows[step] = glow > 0.08
        ? `0 0 ${Math.round(glow * 14)}px rgba(${wave.r}, ${wave.g}, ${wave.b}, ${(glow * 0.55).toFixed(2)})`
        : 'none';
    }

    const lut = { colors, shadows, dimStr, litStr, waveStr };
    lutCache.set(key, lut);
    return lut;
  }

  function parseWaveColor(str) {
    if (!str) return null;
    str = str.trim();
    if (str.startsWith('#')) {
      let hex = str.slice(1);
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
      const num = parseInt(hex, 16);
      return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255, a: 1.0 };
    }
    const match = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (match) {
      return {
        r: parseInt(match[1], 10),
        g: parseInt(match[2], 10),
        b: parseInt(match[3], 10),
        a: match[4] !== undefined ? parseFloat(match[4]) : 1.0
      };
    }
    return null;
  }

  function splitIntoChars(el) {
    if (el.dataset.cwInitialized) return el._charElements || [];

    const fullText = el.textContent.trim();
    el.setAttribute('aria-label', fullText);
    
    const innerWrapper = document.createElement('span');
    innerWrapper.className = 'cw-inner';
    innerWrapper.setAttribute('aria-hidden', 'true');

    const charElements = [];

    function walk(node, target) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (!text) return;
        const tokens = text.split(/(\s+)/);
        tokens.forEach(tok => {
          if (!tok) return;
          if (/^\s+$/.test(tok)) {
            const sp = document.createElement('span');
            sp.className = 'cw-space';
            sp.textContent = tok;
            target.appendChild(sp);
          } else {
            const w = document.createElement('span');
            w.className = 'cw-word';
            for (const ch of tok) {
              const c = document.createElement('span');
              c.className = 'cw-char';
              c.textContent = ch;
              c._state = -1;
              w.appendChild(c);
              charElements.push(c);
            }
            target.appendChild(w);
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName.toLowerCase() === 'br') {
          target.appendChild(document.createElement('br'));
        } else {
          const clone = node.cloneNode(false);
          node.childNodes.forEach(child => walk(child, clone));
          target.appendChild(clone);
        }
      }
    }

    el.childNodes.forEach(child => walk(child, innerWrapper));
    el.replaceChildren(innerWrapper);
    el.classList.add('cw-container');
    el.dataset.cwInitialized = 'true';
    el._charElements = charElements;

    return charElements;
  }

  const scrubItems = [];
  const autoItems = [];

  function createItem(el, isAuto = false) {
    const chars = splitIntoChars(el);
    const isLight = Boolean(el.closest('.light-zone'));
    const isMuted = el.classList.contains('muted');
    const isSoft = el.classList.contains('soft');

    let lit;
    if (isLight) {
      lit = { r: 48, g: 51, b: 47, a: 1.0 };
    } else if (isMuted) {
      lit = { r: 168, g: 173, b: 162, a: 1.0 };
    } else if (isSoft) {
      lit = { r: 117, g: 122, b: 111, a: 1.0 };
    } else {
      lit = { r: 255, g: 255, b: 255, a: 1.0 };
    }

    const dim = isLight
      ? { r: 48, g: 51, b: 47, a: 0.22 }
      : { r: 255, g: 255, b: 255, a: 0.22 };

    const waveColor = parseWaveColor(el.dataset.waveColor) || (isLight ? { r: 235, g: 65, b: 20, a: 1.0 } : { r: 255, g: 85, b: 34, a: 1.0 });

    const lut = getPaletteLUT(dim, waveColor, lit);

    const count = chars.length;
    const charPositions = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      charPositions[i] = count > 1 ? i / (count - 1) : 0.5;
    }

    const startRatio = parseFloat(el.dataset.scrollStart) || 0.88;
    const endRatio = parseFloat(el.dataset.scrollEnd) || 0.28;
    const spread = Math.max(0.12, Math.min(0.24, 7.5 / count));

    const item = {
      el,
      chars,
      charPositions,
      count,
      lut,
      spread,
      startRatio,
      endRatio,
      top: 0,
      height: 0,
      currentP: 0,
      targetP: 0,
      hasPlayed: false,
      isLight
    };

    renderColorWave(item, 0);
    return item;
  }

  function renderColorWave(item, progress) {
    const chars = item.chars;
    const count = item.count;
    if (!count) return;

    if (prefersReducedMotion) {
      const litStr = item.lut.litStr;
      for (let i = 0; i < count; i++) {
        chars[i].style.color = litStr;
        chars[i].style.textShadow = 'none';
      }
      return;
    }

    const lut = item.lut;
    const spread = item.spread;
    const charPositions = item.charPositions;
    const center = progress * (1 + 2 * spread) - spread;
    const maxIdx = LUT_STEPS - 1;

    for (let i = 0; i < count; i++) {
      const diff = charPositions[i] - center;
      const span = chars[i];

      if (diff >= spread) {
        if (span._state !== 0) {
          span.style.color = lut.dimStr;
          span.style.textShadow = 'none';
          span._state = 0;
        }
      } else if (diff <= -spread) {
        if (span._state !== maxIdx) {
          span.style.color = lut.litStr;
          span.style.textShadow = 'none';
          span._state = maxIdx;
        }
      } else {
        const u = (diff + spread) / (2 * spread);
        const step = Math.min(maxIdx, Math.max(0, Math.round((1 - u) * maxIdx)));
        if (span._state !== step) {
          span.style.color = lut.colors[step];
          span.style.textShadow = lut.shadows[step];
          span._state = step;
        }
      }
    }
  }

  scrubElements.forEach(el => scrubItems.push(createItem(el, false)));
  autoElements.forEach(el => autoItems.push(createItem(el, true)));

  // Cache document offsets once - ZERO getBoundingClientRect() during scroll!
  function refreshMetrics() {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    for (let i = 0; i < scrubItems.length; i++) {
      const it = scrubItems[i];
      const rect = it.el.getBoundingClientRect();
      it.top = rect.top + scrollY;
      it.height = it.el.offsetHeight || rect.height;
    }
    refreshParallaxMetrics();
  }

  refreshMetrics();
  window.addEventListener('resize', refreshMetrics);

  let isTicking = false;

  function tickColorWave() {
    const vh = window.innerHeight || 800;
    const scrollY = lenisInstance ? lenisInstance.scroll : (window.scrollY || window.pageYOffset || 0);
    let hasPending = false;

    for (let i = 0; i < scrubItems.length; i++) {
      const item = scrubItems[i];
      const rectTop = item.top - scrollY;
      const rectBottom = rectTop + item.height;

      // Virtual viewport bounds culling
      if (rectBottom < -120) {
        if (item.currentP < 1) {
          item.targetP = 1;
          item.currentP = 1;
          renderColorWave(item, 1);
        }
        continue;
      }
      if (rectTop > vh + 120) {
        if (item.currentP > 0) {
          item.targetP = 0;
          item.currentP = 0;
          renderColorWave(item, 0);
        }
        continue;
      }

      // Compute target progress from cached metrics (zero layout queries)
      const startY = vh * item.startRatio;
      const endY = vh * item.endRatio;
      const travel = (startY - endY) + item.height * 0.55;
      const current = startY - rectTop;
      const rawP = current / travel;
      item.targetP = rawP <= 0 ? 0 : rawP >= 1 ? 1 : rawP;

      // Smooth bidirectional lerp
      const diff = item.targetP - item.currentP;
      if (diff > 0.0008 || diff < -0.0008) {
        item.currentP += diff * 0.22;
        renderColorWave(item, item.currentP);
        hasPending = true;
      } else if (item.currentP !== item.targetP) {
        item.currentP = item.targetP;
        renderColorWave(item, item.currentP);
      }
    }

    if (hasPending) {
      requestAnimationFrame(tickColorWave);
      isTicking = true;
    } else {
      isTicking = false;
    }
  }

  function requestTick() {
    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(tickColorWave);
    }
  }

  // Hook into Lenis scroll and window scroll
  if (lenisInstance) {
    lenisInstance.on('scroll', () => {
      handleScrollUpdates();
      requestTick();
    });
  } else {
    window.addEventListener('scroll', () => {
      handleScrollUpdates();
      requestTick();
    }, { passive: true });
  }

  // Initial trigger
  requestTick();

  // Auto-reveal elements
  function playAutoWave(item, duration = 1450) {
    if (item.hasPlayed) return;
    item.hasPlayed = true;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      renderColorWave(item, ease);
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        renderColorWave(item, 1);
      }
    }
    requestAnimationFrame(step);
  }

  if (autoItems.length) {
    autoItems.forEach(item => {
      const rect = item.el.getBoundingClientRect();
      const inView = rect.top < (window.innerHeight || 800) && rect.bottom > 0;
      if (inView && !prefersReducedMotion) {
        setTimeout(() => playAutoWave(item), 250);
      }
    });

    if ('IntersectionObserver' in window && !prefersReducedMotion) {
      const autoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const item = autoItems.find(it => it.el === entry.target);
            if (item && !item.hasPlayed) {
              setTimeout(() => playAutoWave(item), 200);
            }
            autoObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      autoItems.forEach(item => {
        if (!item.hasPlayed) autoObserver.observe(item.el);
      });
    } else {
      autoItems.forEach(item => renderColorWave(item, 1));
    }
  }

  window.colorWave = {
    scrubItems,
    autoItems,
    renderColorWave,
    requestTick,
    refreshMetrics
  };
}

// ---------------------------------------------------------------------------
// Looping Review Carousel ("Our point of view")
// ---------------------------------------------------------------------------
function initReviewCarousel() {
  const carousel = document.querySelector('#belief-carousel');
  const track = document.querySelector('#belief-track');
  const prevBtn = document.querySelector('#belief-prev');
  const nextBtn = document.querySelector('#belief-next');
  const currentNumEl = document.querySelector('#belief-current');
  const totalNumEl = document.querySelector('#belief-total');
  const dotsContainer = document.querySelector('#belief-dots');

  if (!carousel || !track) return;

  const originalSlides = Array.from(track.querySelectorAll('.belief-slide'));
  const totalSlides = originalSlides.length;
  if (totalSlides === 0) return;

  if (totalNumEl) {
    totalNumEl.textContent = String(totalSlides).padStart(2, '0');
  }

  // Clone first and last slide for seamless infinite loop
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[totalSlides - 1].cloneNode(true);
  firstClone.setAttribute('aria-hidden', 'true');
  lastClone.setAttribute('aria-hidden', 'true');
  firstClone.classList.add('is-clone');
  lastClone.classList.add('is-clone');

  track.appendChild(firstClone);
  track.insertBefore(lastClone, originalSlides[0]);

  let currentIndex = 1; // 1 represents the first real slide
  let isAnimating = false;
  let autoPlayTimer = null;
  const AUTOPLAY_DELAY = 5000;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Build pagination dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'belief-dot';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to review ${i + 1}`);
      dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => {
        if (isAnimating) return;
        goToSlide(i + 1);
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function getRealIndex(idx) {
    return ((idx - 1) % totalSlides + totalSlides) % totalSlides;
  }

  function updateIndicators() {
    const realIndex = getRealIndex(currentIndex);
    if (currentNumEl) {
      currentNumEl.textContent = String(realIndex + 1).padStart(2, '0');
    }
    if (dotsContainer) {
      const dots = dotsContainer.children;
      for (let i = 0; i < dots.length; i++) {
        dots[i].setAttribute('aria-selected', i === realIndex ? 'true' : 'false');
      }
    }
  }

  function applyPosition(index, animate) {
    if (animate && !prefersReduced) {
      track.style.transition = 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)';
    } else {
      track.style.transition = 'none';
    }
    track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
  }

  applyPosition(currentIndex, false);
  updateIndicators();

  function goToSlide(index) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex = index;
    applyPosition(currentIndex, true);
    updateIndicators();
  }

  function nextSlide() {
    if (isAnimating) return;
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    if (isAnimating) return;
    goToSlide(currentIndex - 1);
  }

  // Handle seamless loop boundaries on transition end
  track.addEventListener('transitionend', e => {
    if (e.target !== track) return;

    if (currentIndex >= totalSlides + 1) {
      currentIndex = 1;
      applyPosition(currentIndex, false);
    } else if (currentIndex <= 0) {
      currentIndex = totalSlides;
      applyPosition(currentIndex, false);
    }
    isAnimating = false;
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  // Autoplay functionality
  function startAutoPlay() {
    if (prefersReduced) return;
    stopAutoPlay();
    autoPlayTimer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DELAY);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
  }

  // Pause on hover or focus
  carousel.addEventListener('pointerenter', stopAutoPlay);
  carousel.addEventListener('pointerleave', startAutoPlay);
  carousel.addEventListener('focusin', stopAutoPlay);
  carousel.addEventListener('focusout', startAutoPlay);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  });

  // Touch and drag swipe
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  carousel.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    isDragging = true;
    startX = e.clientX;
    currentX = e.clientX;
    stopAutoPlay();
  });

  carousel.addEventListener('pointermove', e => {
    if (!isDragging) return;
    currentX = e.clientX;
  });

  function handleDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    const diff = currentX - startX;
    const threshold = 40;
    if (diff > threshold) {
      prevSlide();
    } else if (diff < -threshold) {
      nextSlide();
    }
    startAutoPlay();
  }

  carousel.addEventListener('pointerup', handleDragEnd);
  carousel.addEventListener('pointercancel', handleDragEnd);

  // Keyboard navigation
  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      resetAutoPlay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      resetAutoPlay();
    }
  });

  startAutoPlay();

  window.addEventListener('resize', () => {
    if (window.colorWave && typeof window.colorWave.refreshMetrics === 'function') {
      window.colorWave.refreshMetrics();
    }
  }, { passive: true });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initColorWaveReveal();
    initReviewCarousel();
  });
} else {
  initColorWaveReveal();
  initReviewCarousel();
}

