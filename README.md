# ThinkLab Studio — Creative Studio Landing Page

A mobile-first, SEO-searchable single-page landing page for **ThinkLab Studio** — an elite creative production, design, and digital marketing studio headquartered at **Lunà Building, Gorordo Ave., Cebu City, Philippines**. Built to **Apple standards** with obsidian dark themes, glassmorphism, refined typography, and silky smooth micro-interactions.

---

## ✦ Key Features

- **Apple Standard Aesthetics**:
  - Obsidian dark palette (`#08080a`) with atmospheric warm amber/red lighting.
  - **Centered Floating Capsule Navbar (Matching User Reference Image 2)**:
    - Sleek dark obsidian glass capsule centered at the top of the screen (`border-radius: 9999px`, `backdrop-filter: blur(28px)`).
    - Features official studio logo mark on the left, clean navigation links with dropdown caret in the center, and solid white pill `Contact` button on the right.
  - **Interactive 2-Column Mega Dropdown (Matching User Reference Image 1)**:
    - Attached rounded glass card (`border-radius: 28px`, `backdrop-filter: blur(40px)`) directly below `Services ▾`.
    - Dropdown chevron rotates 180° (`^`) when open.
    - Left column: Vertical service items with high-contrast titles and descriptive subtitles; active/hovered item has rounded translucent card highlight (`rgba(255, 255, 255, 0.12)`) matching the "Mountains" reference.
    - Right column: Large rounded photographic showcase (`border-radius: 20px`) with real-time crossfade transitions matching the hovered service.
    - **Automatic Scroll Collapse**: The moment the user scrolls down, any open dropdown immediately collapses smoothly back into the compact capsule navbar (Image 2).
  - Cinematic grain texture overlay and custom smooth follower cursor on desktop devices.
  - Fluid typography featuring **Space Grotesk** and **Plus Jakarta Sans** (San Francisco / Apple Pro typography scale).
  - Clean responsive hero headline: `THINKLABS` with full viewability across mobile, tablet, and ultra-wide screens.

- **Real Business Information Scraped from [thinklabstudio.com](https://thinklabstudio.com/)**:
  - **Headquarters**: Lunà Building, Gorordo Ave., 6000 Cebu City, Philippines.
  - **Direct Landline**: (032) 254 9375
  - **Mobile Hotline**: +63 976 412 6752 / 0976 412 6752
  - **Official Inquiries**: `info@thinklabstudio.com`
  - **Tagline**: *"We build fearless, future-ready brands through tailored strategy, captivating content, and standout creative."*
  - **Official Channels**: Facebook (`thinklabstudio`), Instagram (`@thinklabstudio`), TikTok (`@thinklabstudio`), YouTube (`@thinklabstudio`).

- **6 Core Service Divisions**:
  1. **Media Production**: Commercial filmmaking, video production, photo studio shoots, live stream broadcasting, and FPV drone cinematography.
  2. **Creative & Design**: Logo identity, art tone, brand voice & communication strategy, packaging & label collateral, and 3D mockups.
  3. **Digital Marketing**: Social media growth, community management, targeted advertising campaigns (Meta, Google, TikTok), and conversion funnels.
  4. **Web & Software Services**: Mobile-first responsive web design, full-stack application development, sales funnels, and technical SEO.
  5. **Design Signages & Fabrication**: Precision metal fabrication, illuminated 3D letters, premium acrylic signs, pylon structures, and Sintra boards.
  6. **Events Planning & Production**: Corporate conferences, product launches, bespoke luxury weddings, and end-to-end event coordination.

- **Single-Page Navigation (Anchor Routing)**:
  - **Home Section (`#home`)**: Moody hero portrait background, split mission statement and discipline tags, and bold monumental `THINKLABS` typography spanning the bottom stage.
  - **About Us Section (`#about`)**: Real brand ethos ("Why Partner With Us"), animated KPI counters, and an Apple-inspired Bento Grid.
  - **Work Process Section (`#process`)**: Staggered glassmorphic cards (`01 Research & Define`, `02 Ideate & Design`, `03 Test & Implement`, `04 Produce & Scale`) faithful to the reference layout.
  - **Services Section (`#services`)**: 6-tab interactive switcher with production stills and deliverable checklists.
  - **Team Section (`#team`)**: Real ThinkLab Studio collective squad feature card (`assets/images/live/team-photo.jpg`) and executive director profiles.
  - **FAQ Section (`#faq`)**: Apple-style accordion featuring the exact 6 questions and answers scraped from the official website.
  - **Contact & Commissions Section (`#contact`)**: Interactive project inquiry form with 6 service selection pills, budget scope selector, validation, and submission feedback.
  - **Footer (`#siteFooter`)**: Live studio clocks (Cebu HQ PHT GMT+8, New York EST, London GMT), direct phone and email links, and official social channels.

- **SEO & Performance Optimization**:
  - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
  - Strict heading hierarchy with a single `<h1>`.
  - Open Graph (`og:*`) and Twitter Card metadata.
  - Schema.org JSON-LD Structured Data:
    - `Organization` / `LocalBusiness` schema with Cebu headquarters and direct hotlines.
    - `FAQPage` schema enabling Google Rich Snippets in search results.
  - Zero bloated external dependencies; pure vanilla HTML5, CSS3, and ES6 JavaScript.

---

## ✦ Project Structure

```text
Thinklabs/
├── index.html              # Semantic single-page HTML with SEO & schema markup
├── css/
│   └── style.css           # Vanilla CSS design system (Apple standards & mobile-first)
├── js/
│   └── main.js             # Nav tracking, clocks, tabs, accordion, carousel, form
├── assets/
│   └── images/
│       ├── hero.jpg            # Atmospheric hero motion portrait
│       ├── logo-badge.png      # Official textured logo badge with flask icon
│       ├── logo.svg            # Scalable vector logo
│       ├── preview_card.jpg    # Showreel preview still
│       ├── case_automotive.jpg # Film commercial case study
│       ├── case_spatial.jpg    # Architectural fabrication case study
│       ├── home-page-website.png # Web development case study
│       ├── team_elena.jpg      # Creative Director portrait
│       ├── team_marcus.jpg     # Head of Film portrait
│       ├── team_sophia.jpg     # Lead Art Director portrait
│       ├── team_kenji.jpg      # Technical Director portrait
│       └── live/
│           ├── team-photo.jpg  # Official ThinkLab Studio collective squad photo
│           └── logo-textured.png # Brand texture
└── README.md
```

---

## ✦ Running Locally

To launch the local dev server, run:

```bash
python3 -m http.server 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.