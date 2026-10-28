/* ==========================================================================
   LAKSHMAN PRABHU K — PORTFOLIO INTERACTIVITY & CASE STUDY ENGINE
   Handles:
   1. 5-Page SPA Tab Switching (Home, About, Projects, Skills/Experience, Contact)
   2. Project Cards Rendering + Category Filtering
   3. Deep-Dive Case Study Modal Population
   4. FAQ Accordions, Theme Toggle, and Contact Form Mailto Handler
   ========================================================================== */

// Paste the URL you get from Apps Script > Deploy > New deployment > Web app
// (ends in /exec). See apps-script-contact-form.gs for the backend code.
const CONTACT_FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbw37pdwCe7hWZnfhuM6JxOo-kOa8qDHWxkm9CM3BfP9Sorv7wzlqfbwGcoEvUeSWudP/exec";

const PROJECTS_DATA = [
  {
    id: "thozhil",
    title: "Thozhil (Thozil) POS",
    subtitle: "Mobile-First Retail & Restaurant Billing & Inventory SaaS",
    featuredOnHome: true,
    categories: ["Web Applications", "Business Intelligence", "Data Engineering"],
    tags: ["Android (Gradle)", "React Native", "Backend/DB", "GST SaaS"],
    shortSummary:
      "Mobile-first, data-secured POS software for end-to-end point-of-sale operations, now evolving into a GST-compliant billing and inventory SaaS for Indian retail and restaurant shops.",
    svgType: "dashboard",
    caseStudy: {
      role: "Founder & Lead Full-Stack Product Builder (0-to-1)",
      problem:
        "Small and medium retail and restaurant businesses across India struggle with legacy desktop billing software, offline data loss, and manual GST invoice preparation.",
      approach: [
        "Independently architected and shipped a mobile-first, data-secured point-of-sale platform built for rapid counter checkout and reliable data persistence.",
        "Engineered modular inventory tracking, multi-tax GST billing compliance, and SKU-level sales reporting tailored for Indian retail and F&B merchants.",
        "Designed a scalable multi-tenant backend schema capable of evolving from standalone mobile POS operations into a full cloud-synced SaaS."
      ],
      metrics: [
        { val: "0 → 1", label: "End-to-End Product Shipped" },
        { val: "100%", label: "GST-Compliant Billing Flow" },
        { val: "Mobile-First", label: "Android & React Native Stack" }
      ]
    }
  },
  {
    id: "brewiq",
    title: "BrewIQ — Café Management & AI Analytics",
    subtitle: "End-to-End Café OS with POS, BOM, Margin AI & Owner Insights Bot",
    featuredOnHome: true,
    categories: ["AI Applications", "Data Analytics", "Business Intelligence", "Web Applications"],
    tags: ["React", "Python", "AI / LLM", "SQL"],
    shortSummary:
      "End-to-end café management platform built solo: POS module, EOD sales tracking, BOM, inventory, sales AI analytics with margin detection, GST assistant, payroll, and an owner AI insights bot.",
    svgType: "pipeline",
    caseStudy: {
      role: "Solo Product Architect & AI Engineer (0-to-1)",
      problem:
        "Café operators typically rely on disconnected spreadsheets and basic billing machines, leaving them without real-time recipe Bill of Materials (BOM) costing, margin erosion alerts, or conversational analytics.",
      approach: [
        "Built a full-stack café operating system solo—unifying POS billing, End-of-Day (EOD) sales reconciliation, BOM recipe management, and real-time raw material inventory.",
        "Embedded an AI sales analytics layer with automated profit-margin detection, automated owner notifications, payroll integration, and a GST/compliance assistant.",
        "Created a natural-language AI bot that lets café owners ask plain-English questions about daily revenue, high-margin items, and stockouts."
      ],
      metrics: [
        { val: "7+ Modules", label: "Unified in One Solo Platform" },
        { val: "Real-Time", label: "AI Margin & BOM Detection" },
        { val: "LLM Bot", label: "Owner-Level Conversational BI" }
      ]
    }
  },
  {
    id: "uniqr",
    title: "UniQR — Smart QR Commerce & NLP Insights",
    subtitle: "All-in-One QR Hub with Natural-Language Business Intelligence",
    featuredOnHome: true,
    categories: ["AI Applications", "Data Analytics", "Web Applications"],
    tags: ["React", "Python", "AI / NLP Insights"],
    shortSummary:
      "All-in-one QR commerce platform uniting payments, reviews, Instagram, WhatsApp, and websites with natural-language business insights; designed to integrate with Tapigo's loyalty solution.",
    svgType: "linechart",
    caseStudy: {
      role: "Lead Product & NLP Engineer (0-to-1)",
      problem:
        "Physical merchants clutter their storefronts with separate QR stands for payments, Google reviews, WhatsApp, and Instagram while losing visibility into customer conversion funnels.",
      approach: [
        "Developed a single unified QR commerce experience connecting payments, customer reviews, Instagram, WhatsApp, and brand websites.",
        "Engineered an AI/NLP analytics engine that converts scan telemetry and customer engagement into actionable natural-language business insights.",
        "Architected clean webhook and API extensibility to integrate directly with Tapigo's loyalty platform."
      ],
      metrics: [
        { val: "5-in-1", label: "Unified QR Commerce Channels" },
        { val: "NLP Driven", label: "Automated Merchant Insights" },
        { val: "Tapigo Ready", label: "Loyalty Ecosystem Integration" }
      ]
    }
  },
  {
    id: "vitcnn",
    title: "Multi-Scale ViT-CNN Thoracic Disease Detection",
    subtitle: "Hybrid Vision Transformer & CNN Medical Imaging AI",
    featuredOnHome: false,
    categories: ["Machine Learning", "AI Applications"],
    tags: ["Deep Learning", "Computer Vision", "Python", "ViT-CNN"],
    shortSummary:
      "Hybrid CNN-Transformer medical AI model engineered for multi-scale thoracic disease classification on chest radiographs, achieving 91% accuracy.",
    svgType: "xray",
    caseStudy: {
      role: "Machine Learning & Computer Vision Researcher",
      problem:
        "Standard convolutional networks struggle to capture long-range anatomical dependencies on chest X-rays, while pure Vision Transformers can miss fine-grained local lesion textures.",
      approach: [
        "Designed a Multi-Scale ViT-CNN fusion architecture combining localized convolutional feature extraction with multi-head self-attention mechanisms.",
        "Trained and evaluated the hybrid pipeline on large-scale thoracic radiograph datasets with rigorous augmentation and class-imbalance handling.",
        "Optimized inference pipelines and visual attention heatmaps to highlight pathology regions."
      ],
      metrics: [
        { val: "91%", label: "Classification Accuracy" },
        { val: "Hybrid", label: "Multi-Scale ViT + CNN Fusion" },
        { val: "Medical AI", label: "Thoracic Pathology Screening" }
      ]
    }
  },
  {
    id: "tokenflow",
    title: "TokenFlow — Token Dispenser & BI Dashboard",
    subtitle: "Web-Integrated Token Distribution & Live Campaign Analytics",
    featuredOnHome: false,
    categories: ["Web Applications", "Data Analytics", "Business Intelligence"],
    tags: ["Web Application", "React", "Node/Python", "SQL"],
    shortSummary:
      "Web-integrated token/ticket dispenser platform for limited-offer distribution, backed by full backend orchestration and a live business analytics dashboard.",
    svgType: "table",
    caseStudy: {
      role: "Full-Stack & Analytics Engineer (0-to-1)",
      problem:
        "Limited-offer retail drops and high-traffic events face queue congestion, duplicate token claims, and lack real-time visibility into redemption velocity.",
      approach: [
        "Engineered a web-integrated digital token and ticket dispenser with atomic SQL transaction locking to guarantee fair limited-offer distribution.",
        "Built a live executive analytics dashboard monitoring issuance velocity, redemption conversion rates, and peak demand windows."
      ],
      metrics: [
        { val: "Zero", label: "Duplicate Token Collisions" },
        { val: "Live BI", label: "Real-Time Redemption Telemetry" },
        { val: "Full-Stack", label: "React + Node/Python + SQL" }
      ]
    }
  },
  {
    id: "knitworks",
    title: "Enterprise Fabric Lakehouse & GenAI Suite",
    subtitle: "MariaDB → Microsoft Fabric Migration, Automated ETL & In-House SLMs",
    featuredOnHome: false,
    categories: ["Data Engineering", "Business Intelligence", "Data Analytics", "AI Applications"],
    tags: ["Power BI", "Microsoft Fabric", "Data Analytics", "SLMs"],
    shortSummary:
      "Enterprise MariaDB-to-Lakehouse migration via Fabric Gateway API (lifting accuracy from 65% to 95%), automated SharePoint/Power Automate/CRON Python ETL, and in-house SLMs cutting costs by 40%.",
    svgType: "dashboard",
    caseStudy: {
      role: "Power BI Analyst - Data Engineering @ Knit-Works (May 2026 – Present)",
      problem:
        "Legacy MariaDB schemas, manual SharePoint spreadsheets, and expensive third-party SaaS/AI subscriptions resulted in 65% baseline data accuracy and high operational overhead.",
      approach: [
        "Led a full enterprise data migration from MariaDB to Microsoft Fabric Lakehouse via Fabric Gateway API, owning format conversion, table restructuring, unit standardization, ACID compliance, and Row-Level Security (RLS).",
        "Designed and automated an end-to-end ETL pipeline (SharePoint → Power Automate → CRON Python jobs → live dashboard refresh), removing manual data handling.",
        "Built and owned the production React & Power BI dashboard for million-euro-revenue client stakeholders, embedding a fine-tuned AI dashboard generator, farm-management prediction models, SLM trend forecasting, and a natural-language AI assistant."
      ],
      metrics: [
        { val: "65% → 95%", label: "Enterprise Data Accuracy Lift" },
        { val: "40%", label: "Operational Cost Reduction" },
        { val: "100%", label: "Automated Zero-Touch ETL" }
      ]
    }
  }
];

/* Helper: Monochrome SVG Thumbnails matching the UI Mockups */
function getProjectThumbnailSVG(type) {
  switch (type) {
    case "pipeline":
      return `
        <svg viewBox="0 0 280 130" width="100%" height="100%">
          <rect x="16" y="22" width="54" height="32" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.45" stroke-width="1.5"/>
          <rect x="16" y="76" width="54" height="32" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.45" stroke-width="1.5"/>
          <rect x="112" y="48" width="58" height="34" rx="8" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-opacity="0.8" stroke-width="1.5"/>
          <rect x="210" y="22" width="54" height="32" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.45" stroke-width="1.5"/>
          <rect x="210" y="76" width="54" height="32" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.45" stroke-width="1.5"/>
          <path d="M70 38 H92 V65 H112 M70 92 H92 V65 M170 65 H190 V38 H210 M190 65 V92 H210" fill="none" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5"/>
          <circle cx="92" cy="65" r="3.5" fill="currentColor"/>
          <circle cx="190" cy="65" r="3.5" fill="currentColor"/>
        </svg>`;
    case "linechart":
      return `
        <svg viewBox="0 0 280 130" width="100%" height="100%">
          <line x1="24" y1="108" x2="260" y2="108" stroke="currentColor" stroke-opacity="0.25"/>
          <line x1="24" y1="20" x2="24" y2="108" stroke="currentColor" stroke-opacity="0.25"/>
          <polyline fill="none" stroke="currentColor" stroke-width="2.2" points="28,96 68,82 108,86 148,58 188,64 228,34 256,22"/>
          <circle cx="68" cy="82" r="3.5" fill="currentColor"/>
          <circle cx="148" cy="58" r="3.5" fill="currentColor"/>
          <circle cx="228" cy="34" r="3.5" fill="currentColor"/>
          <circle cx="256" cy="22" r="4" fill="currentColor"/>
        </svg>`;
    case "xray":
      return `
        <svg viewBox="0 0 280 130" width="100%" height="100%">
          <rect x="20" y="12" width="145" height="106" rx="8" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.4"/>
          <ellipse cx="70" cy="64" rx="22" ry="34" fill="none" stroke="currentColor" stroke-opacity="0.55" stroke-width="2"/>
          <ellipse cx="115" cy="64" rx="22" ry="34" fill="none" stroke="currentColor" stroke-opacity="0.55" stroke-width="2"/>
          <line x1="92.5" y1="22" x2="92.5" y2="106" stroke="currentColor" stroke-opacity="0.7" stroke-width="2.5"/>
          <rect x="182" y="24" width="76" height="82" rx="8" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-opacity="0.6"/>
          <circle cx="220" cy="65" r="20" fill="currentColor" fill-opacity="0.22" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="220" cy="65" r="7" fill="currentColor"/>
        </svg>`;
    case "table":
      return `
        <svg viewBox="0 0 280 130" width="100%" height="100%">
          <rect x="18" y="14" width="244" height="102" rx="8" fill="none" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.5"/>
          <line x1="18" y1="38" x2="262" y2="38" stroke="currentColor" stroke-opacity="0.35"/>
          <line x1="72" y1="14" x2="72" y2="116" stroke="currentColor" stroke-opacity="0.25"/>
          <rect x="86" y="50" width="150" height="8" rx="4" fill="currentColor" fill-opacity="0.45"/>
          <rect x="86" y="70" width="120" height="8" rx="4" fill="currentColor" fill-opacity="0.3"/>
          <rect x="86" y="90" width="160" height="8" rx="4" fill="currentColor" fill-opacity="0.45"/>
        </svg>`;
    default:
      return `
        <svg viewBox="0 0 280 130" width="100%" height="100%">
          <rect x="16" y="16" width="110" height="98" rx="8" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
          <rect x="28" y="76" width="12" height="26" fill="currentColor" fill-opacity="0.6"/>
          <rect x="48" y="58" width="12" height="44" fill="currentColor" fill-opacity="0.75"/>
          <rect x="68" y="42" width="12" height="60" fill="currentColor" fill-opacity="0.9"/>
          <rect x="88" y="30" width="12" height="72" fill="currentColor"/>
          <rect x="140" y="16" width="124" height="98" rx="8" fill="none" stroke="currentColor" stroke-opacity="0.35"/>
          <circle cx="202" cy="65" r="28" fill="none" stroke="currentColor" stroke-width="7" stroke-opacity="0.75" stroke-dasharray="130 50"/>
        </svg>`;
  }
}

/* Render Project Card HTML */
function createProjectCardHTML(project) {
  const pillsHTML = project.tags
    .map((tag) => `<span class="pill">${tag}</span>`)
    .join("");

  return `
    <article class="project-card reveal" data-categories="${project.categories.join(",")}">
      <div class="project-thumb">
        ${getProjectThumbnailSVG(project.svgType)}
      </div>
      <div class="project-body">
        <h3>${project.title}</h3>
        <p>${project.shortSummary}</p>
        <div class="pill-group">${pillsHTML}</div>
        <div class="project-footer">
          <button class="link-btn open-case-study-btn" data-project-id="${project.id}">
            <span>View Details</span>
            <i data-lucide="arrow-right" class="icon-xs"></i>
          </button>
          <button class="link-btn open-case-study-btn" data-project-id="${project.id}" aria-label="Open Case Study">
            <i data-lucide="external-link" class="icon-xs"></i>
          </button>
        </div>
      </div>
    </article>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Render Home Featured Projects (Top 3) & All 6 Projects on Projects Page
  const homeFeaturedContainer = document.getElementById("homeFeaturedProjects");
  const allProjectsContainer = document.getElementById("allProjectsGrid");

  if (homeFeaturedContainer) {
    homeFeaturedContainer.innerHTML = PROJECTS_DATA.filter((p) => p.featuredOnHome)
      .map(createProjectCardHTML)
      .join("");
  }

  if (allProjectsContainer) {
    allProjectsContainer.innerHTML = PROJECTS_DATA.map(createProjectCardHTML).join("");
  }

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1b. Scroll-reveal animation for .reveal elements (fades/slides in on view)
  (function initScrollReveal() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target;
          target.classList.add("in-view");
          // If this is a stagger group, reveal its direct .reveal children
          // in the same tick so the CSS nth-child transition-delay applies.
          if (target.classList.contains("reveal-group")) {
            Array.from(target.children).forEach((child) => {
              if (child.classList.contains("reveal")) {
                child.classList.add("in-view");
                revealObserver.unobserve(child);
              }
            });
          }
          revealObserver.unobserve(target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    function observeReveals(root = document) {
      root.querySelectorAll(".reveal-group:not(.in-view)").forEach((el) => revealObserver.observe(el));
      root.querySelectorAll(".reveal:not(.in-view)").forEach((el) => {
        if (!el.closest(".reveal-group")) revealObserver.observe(el);
      });
    }

    observeReveals();

    // Dynamically-rendered project cards were injected before this observer
    // existed, so (re-)observe them explicitly.
    if (homeFeaturedContainer) observeReveals(homeFeaturedContainer);
    if (allProjectsContainer) observeReveals(allProjectsContainer);

    // Re-observe whenever the SPA swaps to a new page view, in case that
    // page's .reveal elements haven't been checked yet (e.g. filtered
    // project cards re-rendered later).
    document.querySelectorAll(".nav-link, [data-navigate]").forEach((trigger) => {
      trigger.addEventListener("click", () => {
        setTimeout(() => observeReveals(), 50);
      });
    });
  })();

  // 2. SPA Page Switching Logic
  const navLinks = document.querySelectorAll(".nav-link");
  const pageViews = document.querySelectorAll(".page-view");
  const navMenu = document.getElementById("navLinks");

  function switchPage(targetPage, scrollTargetId = null) {
    pageViews.forEach((view) => {
      view.classList.toggle("active", view.id === `page-${targetPage}`);
    });

    navLinks.forEach((link) => {
      const matchesPage = link.dataset.page === targetPage;
      const hasScroll = Boolean(link.dataset.scroll);
      if (scrollTargetId) {
        link.classList.toggle("active", link.dataset.scroll === scrollTargetId);
      } else {
        link.classList.toggle("active", matchesPage && !hasScroll);
      }
    });

    if (navMenu) {
      navMenu.classList.remove("open");
    }

    if (scrollTargetId) {
      setTimeout(() => {
        const el = document.getElementById(scrollTargetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetPage = link.dataset.page;
      const scrollTarget = link.dataset.scroll || null;
      switchPage(targetPage, scrollTarget);
    });
  });

  document.querySelectorAll("[data-navigate]").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchPage(btn.dataset.navigate);
    });
  });

  const brandLogo = document.querySelector(".brand-logo");
  if (brandLogo) {
    brandLogo.addEventListener("click", (e) => {
      e.preventDefault();
      switchPage("home");
    });
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }

  // 3. Project Category Filtering
  const filterButtons = document.querySelectorAll("#projectFilterBar .filter-pill");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedCategory = btn.dataset.filter;
      const cards = document.querySelectorAll("#allProjectsGrid .project-card");

      cards.forEach((card) => {
        const categories = card.dataset.categories.split(",");
        if (selectedCategory === "all" || categories.includes(selectedCategory)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 4. Deep-Dive Case Study Modal
  const modal = document.getElementById("caseStudyModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalBody = document.getElementById("modalBody");
  const closeModalBtn = document.getElementById("closeModalBtn");

  function openCaseStudyModal(projectId) {
    const project = PROJECTS_DATA.find((p) => p.id === projectId);
    if (!project) return;

    modalCategory.textContent = project.subtitle;
    modalTitle.textContent = project.title;

    const metricsHTML = project.caseStudy.metrics
      .map(
        (m) => `
        <div class="modal-metric-box">
          <strong>${m.val}</strong>
          <span>${m.label}</span>
        </div>`
      )
      .join("");

    const approachHTML = project.caseStudy.approach
      .map((item) => `<li>${item}</li>`)
      .join("");

    const tagsHTML = project.tags.map((t) => `<span class="pill">${t}</span>`).join("");

    modalBody.innerHTML = `
      <div class="modal-metrics-grid">${metricsHTML}</div>
      <div class="modal-section">
        <h4>Role &amp; Ownership</h4>
        <p>${project.caseStudy.role}</p>
      </div>
      <div class="modal-section">
        <h4>Business Problem</h4>
        <p>${project.caseStudy.problem}</p>
      </div>
      <div class="modal-section">
        <h4>Architecture &amp; Technical Approach</h4>
        <ul>${approachHTML}</ul>
      </div>
      <div class="modal-section">
        <h4>Technology Stack</h4>
        <div class="pill-group">${tagsHTML}</div>
      </div>
    `;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  document.body.addEventListener("click", (e) => {
    const trigger = e.target.closest(".open-case-study-btn");
    if (trigger) {
      openCaseStudyModal(trigger.dataset.projectId);
    }
  });

  function closeCaseStudyModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeCaseStudyModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeCaseStudyModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeCaseStudyModal();
    }
  });

  // 5. FAQ Accordion
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".faq-item");
      parent.classList.toggle("open");
    });
  });

  // 6. Dark / Light Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const htmlEl = document.documentElement;
      const nextTheme = htmlEl.getAttribute("data-theme") === "dark" ? "light" : "dark";
      htmlEl.setAttribute("data-theme", nextTheme);
    });
  }

  // 7. Contact Form Submission (posts to a Google Sheet via Apps Script)
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("senderName").value.trim();
      const email = document.getElementById("senderEmail").value.trim();
      const subject = document.getElementById("senderSubject").value.trim();
      const message = document.getElementById("senderMessage").value.trim();
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (!CONTACT_FORM_ENDPOINT || CONTACT_FORM_ENDPOINT.indexOf("PASTE_YOUR") === 0) {
        // Backend not wired up yet — fall back to opening the user's email client.
        const mailtoLink = `mailto:laxmann.2003@gmail.com?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
        window.location.href = mailtoLink;
        formFeedback.textContent =
          "Opening your email client addressed to laxmann.2003@gmail.com...";
        contactForm.reset();
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      formFeedback.textContent = "Sending...";

      const payload = new URLSearchParams({ name, email, subject, message });

      fetch(CONTACT_FORM_ENDPOINT, { method: "POST", body: payload })
        .then(() => {
          formFeedback.textContent =
            "Thanks! Your message has been sent — I'll get back to you soon.";
          contactForm.reset();
        })
        .catch(() => {
          formFeedback.textContent =
            "Something went wrong sending that. Please email me directly at laxmann.2003@gmail.com.";
        })
        .finally(() => {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
});