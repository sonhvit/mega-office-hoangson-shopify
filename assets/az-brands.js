class AZBrands {
  constructor() {
    this.init();
    this.bindEvents();
  }

  init() {
    this.isMobile = window.innerWidth < 990;
    
    // Auto-open first group on mobile
    if (this.isMobile) {
      const firstGroup = document.querySelector('.az-brands__letter-group');
      if (firstGroup) {
        this.openGroup(firstGroup);
      }
    }
  }

  bindEvents() {
    // Toggle click events
    document.querySelectorAll('.az-brands__letter-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth < 990) {
          const group = e.currentTarget.closest('.az-brands__letter-group');
          this.toggleGroup(group);
        }
      });
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth < 990;
        
        // Reset if switching between mobile/desktop
        if (wasMobile !== this.isMobile) {
          this.resetGroups();
          if (this.isMobile) {
            const firstGroup = document.querySelector('.az-brands__letter-group');
            if (firstGroup) {
              this.openGroup(firstGroup);
            }
          }
        }
      }, 250);
    });
  }

  toggleGroup(group) {
    const isActive = group.classList.contains('active');
    const toggle = group.querySelector('.az-brands__letter-toggle');
    const list = group.querySelector('.az-brands__list');
    
    if (isActive) {
      this.closeGroup(group);
    } else {
      this.openGroup(group);
    }
  }

  openGroup(group) {
    const toggle = group.querySelector('.az-brands__letter-toggle');
    const list = group.querySelector('.az-brands__list');
    
    group.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    
    // Set max-height to scrollHeight for smooth animation
    list.style.maxHeight = list.scrollHeight + 'px';
  }

  closeGroup(group) {
    const toggle = group.querySelector('.az-brands__letter-toggle');
    const list = group.querySelector('.az-brands__list');
    
    group.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    list.style.maxHeight = '0';
  }

  resetGroups() {
    document.querySelectorAll('.az-brands__letter-group').forEach(group => {
      const toggle = group.querySelector('.az-brands__letter-toggle');
      const list = group.querySelector('.az-brands__list');
      
      group.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      
      if (this.isMobile) {
        list.style.maxHeight = '0';
      } else {
        list.style.maxHeight = '';
      }
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new AZBrands();
  });
} else {
  new AZBrands();
}
