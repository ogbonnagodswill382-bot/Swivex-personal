/* ==========================================================================
   SWIVEX — WEB APP INTERACTIVITY, ANIMATIONS & LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== 0. PRELOADER & TOP SCROLL PROGRESS LOGIC ===== */
  const preloader = document.getElementById('preloader');
  const loaderBarFill = document.getElementById('loaderBarFill');
  const loaderPercent = document.getElementById('loaderPercent');
  const loaderText = document.getElementById('loaderText');
  const scrollProgress = document.getElementById('scrollProgress');

  if (preloader && loaderBarFill && loaderPercent) {
    let progress = 0;
    const statusMessages = [
      "Initializing Swivex Logo...",
      "Configuring Modern UI Framework...",
      "Rendering Projects & Tech Stack...",
      "Preparing Digital Portfolio...",
      "Welcome to Swivex!"
    ];

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 6;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        if (loaderText) loaderText.textContent = statusMessages[4];
        
        setTimeout(() => {
          preloader.classList.add('loaded');
          document.body.classList.add('page-ready');
        }, 500);
      } else {
        const msgIndex = Math.min(Math.floor((progress / 100) * statusMessages.length), 3);
        if (loaderText) loaderText.textContent = statusMessages[msgIndex];
      }
      loaderBarFill.style.width = `${progress}%`;
      loaderPercent.textContent = `${progress}%`;
    }, 55);
  }

  // Top Scroll Progress Bar Updates
  window.addEventListener('scroll', () => {
    if (scrollProgress) {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      scrollProgress.style.width = `${Math.min(scrolled, 100)}%`;
    }
  });

  // Smooth Kinetic Anchor Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  /* ===== 1. CUSTOM INTERACTIVE CURSOR ===== */
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');

  if (cursorDot && cursorOutline && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: "forwards" });
    });

    // Expand cursor ring when hovering over interactive elements
    const interactiveEls = document.querySelectorAll('a, button, .glass-panel, .glass-card, input, textarea');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ===== 2. HERO TYPING ANIMATION ===== */
  const typingText = document.getElementById('typingText');
  if (typingText) {
    const phrases = [
      "Next-Gen Web Applications",
      "High-Converting UI/UX",
      "Scalable React Applications",
      "Modern Digital Brands"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 90;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2200; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
      }

      setTimeout(typeLoop, typeSpeed);
    }

    typeLoop();
  }

  /* ===== 3. TERMINAL CODE EXECUTION ===== */
  const runCodeBtn = document.getElementById('runCodeBtn');
  const termOutput = document.getElementById('termOutput');
  if (runCodeBtn && termOutput) {
    runCodeBtn.addEventListener('click', () => {
      termOutput.classList.add('active');
      termOutput.innerHTML = `
        ⚡ [SUCCESS] Executed developer-profile.js<br>
        ✓ Status: Available for Freelance & Full-time Roles<br>
        ✓ Location: Global / Remote<br>
        ✓ Response Time: &lt; 2 Hours
      `;
      showToast("Code executed successfully in terminal!");
    });
  }

  /* ===== 4. FAQ ACCORDION TOGGLE ===== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* ===== 5. 3D CARD TILT EFFECT ===== */
  const tiltCards = document.querySelectorAll('.tilt-card');
  if (window.innerWidth > 768) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      });
    });
  }

  /* ===== 6. NAVBAR SCROLL & ACTIVE HIGHLIGHTER ===== */
  const navbar = document.getElementById('navbar');
  const navLinksContainer = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSection}`) {
        item.classList.add('active');
      }
    });
  });

  const mobileMenuClose = document.getElementById('mobileMenuClose');

  const closeMobileMenu = () => {
    if (navLinksContainer) navLinksContainer.classList.remove('active');
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinksContainer.classList.toggle('active');
  });

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  document.addEventListener('click', (e) => {
    if (navLinksContainer.classList.contains('active') && !navLinksContainer.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  });

  navItems.forEach(item => {
    item.addEventListener('click', closeMobileMenu);
  });

  /* ===== 7. TECH STACK FILTERING ===== */
  const techTabs = document.querySelectorAll('.tech-tab');
  const skillItems = document.querySelectorAll('.skill-item');

  techTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      techTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ===== 8. PROJECT FILTERING ===== */
  const projectFilters = document.querySelectorAll('.filter-pill');

  projectFilters.forEach(pill => {
    pill.addEventListener('click', () => {
      projectFilters.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      const projectCards = document.querySelectorAll('.project-card');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ===== 9. PROJECT QUICK VIEW MODAL (EVENT DELEGATION FOR FUTURE PROJECTS) ===== */
  const projectModal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTags = document.getElementById('modalTags');
  const modalLaunchBtn = document.getElementById('modalLaunchBtn');
  const projectsGrid = document.getElementById('projectsGrid');

  if (projectsGrid) {
    projectsGrid.addEventListener('click', (e) => {
      const quickBtn = e.target.closest('.quick-view-btn');
      if (quickBtn) {
        const title = quickBtn.getAttribute('data-title') || '';
        const desc = quickBtn.getAttribute('data-desc') || '';
        const tags = (quickBtn.getAttribute('data-tags') || '').split(',');
        const image = quickBtn.getAttribute('data-image') || '';
        const link = quickBtn.getAttribute('data-link') || '#';

        if (modalTitle) modalTitle.textContent = title;
        if (modalDesc) modalDesc.textContent = desc;
        if (modalImg) modalImg.src = image;
        if (modalLaunchBtn) modalLaunchBtn.href = link;

        if (modalTags) {
          modalTags.innerHTML = '';
          tags.forEach(tag => {
            if (tag.trim()) {
              const span = document.createElement('span');
              span.className = 'tag';
              span.textContent = tag.trim();
              modalTags.appendChild(span);
            }
          });
        }

        if (projectModal) projectModal.classList.add('active');
      }
    });
  }

  const closeModal = () => {
    if (projectModal) projectModal.classList.remove('active');
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }

  /* ===== 10. COMMAND PALETTE (Ctrl + K) ===== */
  const cmdBtn = document.getElementById('cmdBtn');
  const cmdModal = document.getElementById('cmdModal');
  const cmdInput = document.getElementById('cmdInput');
  const cmdResults = document.getElementById('cmdResults');

  const openCmd = () => {
    cmdModal.classList.add('active');
    cmdInput.focus();
  };

  const closeCmd = () => {
    cmdModal.classList.remove('active');
    cmdInput.value = '';
  };

  if (cmdBtn) cmdBtn.addEventListener('click', openCmd);

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdModal.classList.contains('active')) {
        closeCmd();
      } else {
        openCmd();
      }
    } else if (e.key === 'Escape') {
      closeCmd();
      closeModal();
    }
  });

  if (cmdModal) {
    cmdModal.addEventListener('click', (e) => {
      if (e.target === cmdModal) closeCmd();
    });
  }

  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const items = cmdResults.querySelectorAll('.cmd-item');
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  const cmdItems = document.querySelectorAll('.cmd-item');
  cmdItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      if (action === 'copy-email') {
        copyToClipboard('ogbonnagodswill382@gmail.com', 'Email address copied to clipboard!');
      } else if (action === 'copy-phone') {
        copyToClipboard('+2348134625302', 'WhatsApp number copied to clipboard!');
      }
      closeCmd();
    });
  });

  /* ===== 11. COPY TO CLIPBOARD & TOAST NOTIFICATIONS ===== */
  const toastContainer = document.getElementById('toastContainer');

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span class="toast-icon">✓</span>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 350);
    }, 3000);
  };

  const copyToClipboard = (text, successMsg) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => {
        showToast(`Copied: ${text}`);
      });
    } else {
      showToast(`Copied: ${text}`);
    }
  };

  const quickCopyEmailBtn = document.getElementById('quickCopyEmailBtn');
  if (quickCopyEmailBtn) {
    quickCopyEmailBtn.addEventListener('click', () => {
      copyToClipboard('ogbonnagodswill382@gmail.com', 'Email copied: ogbonnagodswill382@gmail.com');
    });
  }

  const copyValBtns = document.querySelectorAll('.copy-val-btn');
  copyValBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-copy');
      copyToClipboard(val, `Copied: ${val}`);
    });
  });

  /* ===== 12. CONTACT FORM HANDLING (DIRECT GMAIL SUBMISSION) ===== */
  const contactForm = document.getElementById('contactForm');
  const submitMsgBtn = document.getElementById('submitMsgBtn');
  const submitMsgText = document.getElementById('submitMsgText');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = (subjectInput && subjectInput.value.trim()) ? subjectInput.value.trim() : 'New Portfolio Project Inquiry';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast("Please fill in your name, email, and message.");
        return;
      }

      // UI Loading state
      if (submitMsgBtn) submitMsgBtn.disabled = true;
      if (submitMsgText) submitMsgText.textContent = "Sending to Gmail...";

      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("_subject", `[SWIVEX Portfolio] ${subject}`);
        formData.append("message", message);
        formData.append("_captcha", "false");
        formData.append("_template", "table");

        const response = await fetch("https://formsubmit.co/ajax/ogbonnagodswill382@gmail.com", {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          showToast(`Thank you, ${name}! Your message was sent directly to God'swill's Gmail inbox 📧`);
          contactForm.reset();
        } else {
          throw new Error("Form submission response failed.");
        }
      } catch (err) {
        console.warn("Direct submission API encounter, triggering mailto fallback:", err);
        const mailtoUrl = `mailto:ogbonnagodswill382@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoUrl;
        showToast(`Opening email app to send message to ogbonnagodswill382@gmail.com! 📧`);
        contactForm.reset();
      } finally {
        if (submitMsgBtn) submitMsgBtn.disabled = false;
        if (submitMsgText) submitMsgText.textContent = "Send Message to Gmail";
      }
    });
  }

  /* ===== 13. SCROLL REVEAL OBSERVER ===== */
  const fadeElements = document.querySelectorAll('.fade-in-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  /* ===== 14. THEME CONTROLLER (DARK & LIGHT MODE) ===== */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const htmlElement = document.documentElement;

  // Restore saved theme preference or default to dark
  const savedTheme = localStorage.getItem('swivex-theme');
  if (savedTheme === 'light') {
    htmlElement.classList.remove('dark');
    htmlElement.classList.add('light');
  } else {
    htmlElement.classList.remove('light');
    htmlElement.classList.add('dark');
  }

  const toggleTheme = () => {
    if (htmlElement.classList.contains('light')) {
      htmlElement.classList.remove('light');
      htmlElement.classList.add('dark');
      localStorage.setItem('swivex-theme', 'dark');
      showToast("Switched to Dark Mode 🌙");
    } else {
      htmlElement.classList.remove('dark');
      htmlElement.classList.add('light');
      localStorage.setItem('swivex-theme', 'light');
      showToast("Switched to Light Mode ☀️");
    }
  };

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);
});