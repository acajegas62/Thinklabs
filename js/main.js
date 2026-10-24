/**
 * THINKLAB STUDIO — INTERACTIVE LOGIC & APPLE STANDARD MICRO-INTERACTIONS
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // 01. Dynamic Real-time Studio Clocks (Cebu HQ, NYC & London)
  // -------------------------------------------------------------------------
  const cebuClockEl = document.getElementById('cebuClock');
  const nycClockEl = document.getElementById('nycClock');
  const ldnClockEl = document.getElementById('ldnClock');
  const currentYearEl = document.getElementById('currentYear');

  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  function updateStudioClocks() {
    const now = new Date();
    
    // Cebu Headquarters Time (Philippines - GMT+8)
    const cebuOptions = { timeZone: 'Asia/Manila', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    if (cebuClockEl) {
      cebuClockEl.textContent = `${now.toLocaleTimeString('en-US', cebuOptions)} PHT`;
    }

    // New York Time
    const nycOptions = { timeZone: 'America/New_York', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    if (nycClockEl) {
      nycClockEl.textContent = `${now.toLocaleTimeString('en-US', nycOptions)} EST`;
    }

    // London Time
    const ldnOptions = { timeZone: 'Europe/London', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    if (ldnClockEl) {
      ldnClockEl.textContent = `${now.toLocaleTimeString('en-GB', ldnOptions)} GMT`;
    }
  }

  updateStudioClocks();
  setInterval(updateStudioClocks, 1000);

  // -------------------------------------------------------------------------
  // 02. Sticky Header & Glassmorphism on Scroll
  // -------------------------------------------------------------------------
  const siteHeader = document.getElementById('siteHeader');

  let lastScrollY = window.scrollY;

  // Global functions to open and close mega dropdown
  function closeMegaDropdown() {
    if (floatingNavPill) {
      floatingNavPill.classList.remove('dropdown-open');
      if (servicesDropdownBtn) {
        servicesDropdownBtn.setAttribute('aria-expanded', 'false');
      }
    }
  }

  function openMegaDropdown() {
    if (floatingNavPill) {
      floatingNavPill.classList.add('dropdown-open');
      if (servicesDropdownBtn) {
        servicesDropdownBtn.setAttribute('aria-expanded', 'true');
      }
    }
  }

  // Scroll listener: handles header styling AND collapses dropdown on scroll (Image 2)
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Compact header style when scrolled
    if (currentScrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // Scroll Collapse: when user scrolls down or moves scroll position, immediately collapse dropdown!
    if (Math.abs(currentScrollY - lastScrollY) > 4) {
      closeMegaDropdown();
      lastScrollY = currentScrollY;
    }
  }, { passive: true });

  // -------------------------------------------------------------------------
  // 03. Mobile Menu Toggle & Drawer
  // -------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta-btn');

  function openMobileMenu() {
    mobileToggle.classList.add('is-active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileToggle.classList.remove('is-active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  // -------------------------------------------------------------------------
  // 03b. Interactive Floating Capsule & Mega Dropdown (Matching Image 1 & 2)
  // -------------------------------------------------------------------------
  const floatingNavPill = document.getElementById('floatingNavPill');
  const servicesDropdownBtn = document.getElementById('servicesDropdownBtn');
  const servicesDropdownContainer = document.getElementById('servicesDropdownContainer');
  const megaDropdownPanel = document.getElementById('megaDropdownPanel');
  const megaOptCards = document.querySelectorAll('.mega-opt-card');
  const megaHeroImg = document.getElementById('megaHeroImg');
  const megaCaptionTitle = document.getElementById('megaCaptionTitle');
  const megaCaptionDesc = document.getElementById('megaCaptionDesc');

  let hoverTimer = null;

  if (floatingNavPill && megaDropdownPanel) {
    // Toggle on Services dropdown button click
    if (servicesDropdownBtn) {
      servicesDropdownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = floatingNavPill.classList.contains('dropdown-open');
        if (isOpen) {
          closeMegaDropdown();
        } else {
          openMegaDropdown();
        }
      });
    }

    // Smooth hover behavior for desktop
    if (servicesDropdownContainer) {
      servicesDropdownContainer.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimer);
        openMegaDropdown();
      });
    }

    floatingNavPill.addEventListener('mouseleave', () => {
      hoverTimer = setTimeout(() => {
        closeMegaDropdown();
      }, 220);
    });

    floatingNavPill.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimer);
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!floatingNavPill.contains(e.target)) {
        closeMegaDropdown();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMegaDropdown();
      }
    });

    // Interactive Option Hover & Dynamic Image Crossfade (Image 1)
    megaOptCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        megaOptCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const imgSrc = card.getAttribute('data-preview-img');
        const title = card.getAttribute('data-preview-title');
        const sub = card.getAttribute('data-preview-sub');

        if (megaHeroImg && imgSrc && megaHeroImg.getAttribute('src') !== imgSrc) {
          megaHeroImg.style.opacity = '0.35';
          setTimeout(() => {
            megaHeroImg.src = imgSrc;
            megaHeroImg.style.opacity = '1';
          }, 110);
        }

        if (megaCaptionTitle && title) {
          megaCaptionTitle.textContent = title;
        }
        if (megaCaptionDesc && sub) {
          megaCaptionDesc.textContent = sub;
        }
      });

      // Clicking an item closes dropdown, syncs with the main Services tabs and scrolls smoothly
      card.addEventListener('click', () => {
        const serviceKey = card.getAttribute('data-service-key');
        closeMegaDropdown();

        if (serviceKey) {
          const targetTabBtn = document.querySelector(`.service-tab-btn[data-service="${serviceKey}"]`);
          if (targetTabBtn) {
            targetTabBtn.click();
          }
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 04. Smooth Scroll with Sticky Header Offset & Scrollspy
  // -------------------------------------------------------------------------
  const navPillLinks = document.querySelectorAll('.capsule-nav-link, .capsule-contact-btn, .nav-pill-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  // Smooth scroll handler for all internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // IntersectionObserver for active navigation pill highlighting
  const sectionObserverOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update desktop pill links
        navPillLinks.forEach(link => {
          if (link.getAttribute('data-nav') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Update mobile links
        document.querySelectorAll('.mobile-link').forEach(link => {
          if (link.getAttribute('data-nav') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, sectionObserverOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  // -------------------------------------------------------------------------
  // 05. Hero Showreel Preview Card Carousel & Interaction
  // -------------------------------------------------------------------------
  const previewThumb = document.getElementById('previewThumb');
  if (previewThumb) {
    const previewPlayBtn = document.getElementById('previewPlayBtn');
    const pagLines = document.querySelectorAll('.pag-line');
    const reelNameBadge = document.querySelector('.preview-reel-name');

    const showreelSlides = [
      {
        img: 'assets/images/preview_card.jpg',
        title: "REEL '26 // ACT I: COBALT SYMPHONY"
      },
      {
        img: 'assets/images/case_automotive.jpg',
        title: "REEL '26 // ACT II: VOLT HIGHWAY"
      },
      {
        img: 'assets/images/case_spatial.jpg',
        title: "REEL '26 // ACT III: LUMINAL CANOPY"
      },
      {
        img: 'assets/images/hero.jpg',
        title: "REEL '26 // ACT IV: KINETIC ECHO"
      }
    ];

    let currentSlideIndex = 0;
    let slideInterval = null;

    function setPreviewSlide(index) {
      if (!previewThumb) return;
      currentSlideIndex = index;
      
      previewThumb.style.opacity = '0.4';
      setTimeout(() => {
        previewThumb.src = showreelSlides[index].img;
        if (reelNameBadge) {
          reelNameBadge.textContent = showreelSlides[index].title;
        }
        previewThumb.style.opacity = '1';
      }, 150);

      pagLines.forEach((line, i) => {
        if (i === index) {
          line.classList.add('active');
        } else {
          line.classList.remove('active');
        }
      });
    }

    function startSlideAutoAdvance() {
      stopSlideAutoAdvance();
      slideInterval = setInterval(() => {
        const nextIndex = (currentSlideIndex + 1) % showreelSlides.length;
        setPreviewSlide(nextIndex);
      }, 4500);
    }

    function stopSlideAutoAdvance() {
      if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
      }
    }

    pagLines.forEach(line => {
      line.addEventListener('click', (e) => {
        const slide = parseInt(e.target.getAttribute('data-slide'), 10);
        setPreviewSlide(slide);
        startSlideAutoAdvance();
      });
    });

    if (previewPlayBtn) {
      previewPlayBtn.addEventListener('click', () => {
        const nextIndex = (currentSlideIndex + 1) % showreelSlides.length;
        setPreviewSlide(nextIndex);
        
        previewPlayBtn.style.transform = 'scale(1.25)';
        setTimeout(() => {
          previewPlayBtn.style.transform = '';
        }, 250);
      });
    }

    startSlideAutoAdvance();
  }

  // -------------------------------------------------------------------------
  // 06. Number Counter Animation for Stats
  // -------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const statsSection = document.querySelector('.stats-counter-grid');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsCounted) {
          statsCounted = true;
          statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            let current = 0;
            const duration = 1800;
            const stepTime = 30;
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;

            const counter = setInterval(() => {
              current += increment;
              if (current >= target) {
                stat.textContent = target;
                clearInterval(counter);
              } else {
                stat.textContent = Math.floor(current);
              }
            }, stepTime);
          });
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  }

  // -------------------------------------------------------------------------
  // 07. Interactive Services Tabs
  // -------------------------------------------------------------------------
  const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
  const servicePanels = document.querySelectorAll('.service-panel');

  serviceTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceKey = btn.getAttribute('data-service');

      // Update button state
      serviceTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Show corresponding panel
      servicePanels.forEach(panel => {
        if (panel.id === `service-${serviceKey}`) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 08. Apple-Style FAQ Accordion
  // -------------------------------------------------------------------------
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close other accordion items (Apple clean single-open style)
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // -------------------------------------------------------------------------
  // 09. Interactive Contact Inquiry Form
  // -------------------------------------------------------------------------
  const inquiryForm = document.getElementById('studioInquiryForm');
  const pillSelects = document.querySelectorAll('.pill-select');
  const servicesInput = document.getElementById('selectedServicesInput');
  const formToast = document.getElementById('formToast');
  const submitBtn = document.getElementById('submitInquiryBtn');

  // Pill multi/single selection
  pillSelects.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('active');
      
      const activeValues = Array.from(pillSelects)
        .filter(p => p.classList.contains('active'))
        .map(p => p.getAttribute('data-value'));
      
      if (servicesInput) {
        servicesInput.value = activeValues.join(', ') || 'general';
      }
    });
  });

  // Form Submission
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('clientName');
      const emailInput = document.getElementById('clientEmail');
      const messageInput = document.getElementById('projectMessage');

      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');

      let isValid = true;

      // Reset errors
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';

      // Validation
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please provide your full name.';
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid work email address.';
        isValid = false;
      }

      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        messageError.textContent = 'Please provide a brief description (at least 10 characters).';
        isValid = false;
      }

      if (!isValid) return;

      // Simulated Submission State
      inquiryForm.classList.add('is-submitting');
      submitBtn.disabled = true;

      setTimeout(() => {
        inquiryForm.classList.remove('is-submitting');
        submitBtn.disabled = false;

        // Show Toast
        if (formToast) {
          formToast.classList.add('is-visible');
          inquiryForm.reset();

          // Reset pills to first default
          pillSelects.forEach((p, idx) => {
            if (idx === 0) p.classList.add('active');
            else p.classList.remove('active');
          });

          setTimeout(() => {
            formToast.classList.remove('is-visible');
          }, 6000);
        }
      }, 1200);
    });
  }

  // -------------------------------------------------------------------------
  // 10. Custom Smooth Mouse Follower & Cursor Glow (Desktop Only)
  // -------------------------------------------------------------------------
  const cursor = document.getElementById('customCursor');
  const glow = document.getElementById('cursorGlow');

  if (cursor && glow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glow.style.transform = `translate(${mouseX - 160}px, ${mouseY - 160}px)`;
    }, { passive: true });

    function renderCursor() {
      cursorX += (mouseX - cursorX) * 0.25;
      cursorY += (mouseY - cursorY) * 0.25;
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover effect on links and buttons
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .glass-panel, .process-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }
});
