// _layout.js - Shared navigation and utilities for Aaradhya SFS

(function() {
  // Configuration
  const CONFIG = {
    whatsappNumber: '919876543210', // Update with your actual WhatsApp number
    companyName: 'Aaradhya Sales Force Solutions'
  };

  // Make config globally available
  window.AaradhyaConfig = CONFIG;

  // Update all WhatsApp links with proper number
  function updateWhatsAppLinks() {
    const waLinks = document.querySelectorAll('a[href*="wa.me/91XXXXXXXXXX"], a[href*="https://wa.me/91"]');
    waLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href.includes('XXXXXXXXXX') || href === 'https://wa.me/91XXXXXXXXXX')) {
        link.setAttribute('href', `https://wa.me/${CONFIG.whatsappNumber}`);
      }
    });
  }

  // Mobile menu toggle
  function initMobileMenu() {
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!hamburger || !mobileMenu) return;
    
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (mobileMenu.classList.contains('open') && 
          !mobileMenu.contains(e.target) && 
          !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Set active navigation link based on current page
  function setActiveNavLink() {
    const currentPage = window.ACTIVE_PAGE;
    if (!currentPage) return;
    
    // Desktop navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    
    // Mobile navigation
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navHeight = document.querySelector('.nav')?.offsetHeight || 68;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
          
          // Close mobile menu if open
          const mobileMenu = document.querySelector('.mobile-menu');
          if (mobileMenu?.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
          }
        }
      });
    });
  }

  // Add scroll effect to navigation
  function initNavScrollEffect() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.style.background = 'rgba(17, 28, 26, 0.98)';
        nav.style.backdropFilter = 'blur(14px)';
      } else {
        nav.style.background = 'rgba(17, 28, 26, 0.97)';
        nav.style.backdropFilter = 'blur(14px)';
      }
    });
  }

  // Fix table responsiveness
  function fixTableResponsiveness() {
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
      if (!table.parentElement.classList.contains('tcard-body')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive';
        wrapper.style.overflowX = 'auto';
        wrapper.style.width = '100%';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    });
  }

  // Initialize all components
  function init() {
    updateWhatsAppLinks();
    initMobileMenu();
    setActiveNavLink();
    initSmoothScroll();
    initNavScrollEffect();
    fixTableResponsiveness();
  }
  
  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
