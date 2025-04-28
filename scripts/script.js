// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, 
                behavior: 'smooth'
            });
        }
    });
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
let darkMode = true; // Default is dark mode

const themes = {
    dark: {
        '--primary-blue': '#214257',
        '--light-blue': '#3A6B8A',
        '--dark-text': '#FFFFFF',
        '--light-text': '#F0F0F0',
        '--divider-color': 'rgba(255, 255, 255, 0.2)',
        '--header-bg': 'rgba(33, 66, 87, 0.9)',
        '--logo-color': '#FFFFFF',
        'background': `linear-gradient(rgba(33, 66, 87, 0.85), rgba(33, 66, 87, 0.85)),
                      url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80') center/cover no-repeat fixed`,
        '--title-color': '#F0F0F0'
    },
    light: {
        '--primary-blue': '#3A6B8A',
        '--light-blue': '#5D9EC7',
        '--dark-text': '#2D3748',
        '--light-text': '#4A5568',
        '--divider-color': 'rgba(0, 0, 0, 0.1)',
        '--header-bg': 'rgba(33, 66, 87, 0.9)',
        '--logo-color': '#FFFFFF', 
        'background': '#E6F0FA',
        '--title-color': '#2D3748'
    }
};

// Apply theme function
function applyTheme(theme) {
    const root = document.documentElement;
    Object.keys(theme).forEach(key => {
        root.style.setProperty(key, theme[key]);
    });
    
    document.body.style.background = theme.background;
    document.querySelector('.title').style.color = theme['--title-color'];
    document.querySelector('.logo').style.color = theme['--logo-color'];
    
    // Update button styles
    const buttons = document.querySelectorAll('.hire-btn, .cta-button');
    buttons.forEach(button => {
        if (darkMode) {
            button.style.backgroundColor = 'transparent';
            button.style.color = 'white';
            button.style.border = '2px solid white';
        } else {
            button.style.backgroundColor = '#3A6B8A';
            button.style.color = 'white';
            button.style.border = '2px solid #3A6B8A';
        }
    });
    
    // Update header text colors (except logo)
    const headerTexts = document.querySelectorAll('header a:not(.logo), header .hire-btn');
    headerTexts.forEach(text => {
        text.style.color = 'white'; 
    });
}

// Initialize theme
applyTheme(themes.dark);

themeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    const theme = darkMode ? themes.dark : themes.light;
    applyTheme(theme);
    
    // Update toggle icon
    themeToggle.textContent = darkMode ? '🌙' : '☀️';
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});


// Biography Section Animation
function animateBiography() {
    const biographySection = document.querySelector('.biography-section');
    const biographyContainer = document.querySelector('.biography-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                biographyContainer.classList.add('animate');
                // Add pulse animation to CTA button on hover
                const ctaButton = document.querySelector('.biography-section .cta-button');
                ctaButton.addEventListener('mouseenter', () => {
                    ctaButton.style.animation = 'pulse 1.5s infinite';
                });
                ctaButton.addEventListener('mouseleave', () => {
                    ctaButton.style.animation = '';
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(biographySection);
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateBiography();
    
    // Add click effect to hire button
    const hireButtons = document.querySelectorAll('.hire-btn');
    hireButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('clicked');
            setTimeout(() => {
                button.classList.remove('clicked');
                // Scroll to contact section or open contact modal
                document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
            }, 300);
        });
    });
});

// Services Section Animation and Interactivity
function initServicesSection() {
    // Animate cards on hover
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.service-icon').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('active')) {
                card.querySelector('.service-icon').style.transform = 'scale(1)';
            }
        });
        
        // Click to toggle for mobile
        card.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                this.classList.toggle('active');
                const content = this.querySelector('.service-hover-content');
                if (this.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    this.querySelector('.service-icon').style.transform = 'scale(1.1)';
                } else {
                    content.style.maxHeight = '0';
                    this.querySelector('.service-icon').style.transform = 'scale(1)';
                }
            }
        });
    });
    
    // Smooth scroll for more services button
    document.querySelector('.more-services-btn').addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initServicesSection);

// Intersection Observer for services section
const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card').forEach(card => {
    servicesObserver.observe(card);
});

// Skills Section Animation
function animateSkills() {
    const skillsSection = document.querySelector('.skills-section');
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate circular progress bars
                skillCards.forEach(card => {
                    const percent = card.getAttribute('data-percent');
                    const circleFill = card.querySelector('.circle-fill');
                    const circumference = 2 * Math.PI * 15.9155;
                    const offset = circumference - (percent / 100) * circumference;
                    circleFill.style.strokeDasharray = `${circumference} ${circumference}`;
                    circleFill.style.strokeDashoffset = circumference;
                    setTimeout(() => {
                        circleFill.style.strokeDashoffset = offset;
                    }, 100);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(skillsSection);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', animateSkills);

// Initialize services grid animation
function initServicesGrid() {
    const servicesSection = document.querySelector('.services-component');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const services = document.querySelectorAll('.service-item');
                services.forEach((service, index) => {
                    setTimeout(() => {
                        service.style.opacity = '1';
                        service.style.transform = 'translateY(0)';
                    }, index * 150);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(servicesSection);
}

document.addEventListener('DOMContentLoaded', initServicesGrid);

// Stats Section - Improved for mobile
document.addEventListener('DOMContentLoaded', function() {
  const statCards = document.querySelectorAll('.stat-card');
  let hasAnimated = false; // Track if animation has run

  // Improved viewport check for mobile
  function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      
      // Check if element is visible in viewport (with tolerance for mobile)
      return (
          rect.top <= windowHeight * 0.75 && // 75% down the viewport
          rect.left <= windowWidth &&
          rect.bottom >= 0 &&
          rect.right >= 0
      );
  }

  // Smoother counting animation
  function animateCount(element, target) {
      let current = 0;
      const duration = 2000; // 2 seconds duration
      const increment = target / (duration / 16); // 60fps
      
      const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
              clearInterval(timer);
              current = target;
              element.textContent = target; // Ensure final number is exact
          } else {
              element.textContent = Math.floor(current);
          }
      }, 16); // ~60fps
  }

  // Handle scroll event with debounce
  function handleScroll() {
      if (hasAnimated) return;
      
      statCards.forEach(card => {
          if (isInViewport(card)) {
              const numberElement = card.querySelector('.stat-number');
              const target = parseInt(card.getAttribute('data-target'));
              
              if (numberElement.textContent === '0') {
                  animateCount(numberElement, target);
              }
          }
      });
      
      // Check if all cards have been animated
      const allAnimated = Array.from(statCards).every(card => {
          return card.querySelector('.stat-number').textContent !== '0';
      });
      
      if (allAnimated) {
          hasAnimated = true;
          window.removeEventListener('scroll', handleScroll);
      }
  }

  // Initial check in case elements are already visible
  handleScroll();
  
  // Add scroll event listener with debounce
  window.addEventListener('scroll', function() {
      if (!hasAnimated) {
          window.requestAnimationFrame(handleScroll);
      }
  });
});
    // Initial check in case elements are already visible
    handleScroll();
  
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

  // Add interactivity to the gallery items
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    const overlay = item.querySelector('::before');
    overlay.style.opacity = '1';
  });

  item.addEventListener('mouseleave', () => {
    const overlay = item.querySelector ('::before');
    overlay.style.opacity = '0';
  });

  item.addEventListener('click', () => {
    alert('You clicked on a project!'); 
  });
});

// Add interactivity to badges (e.g., hover effect or redirection)
document.querySelectorAll('.badge').forEach((badge) => {
    badge.addEventListener('mouseenter', () => {
      badge.style.transform = 'scale(1.1)';
    });
  
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = 'scale(1)';
    });
  
    // Example: Redirect to a page when clicked
    badge.addEventListener('click', () => {
      const badgeAlt = badge.querySelector('img').alt;
  
      switch (badgeAlt) {
        case '100% Gluten Free':
          window.location.href = '/gluten-free';
          break;
        case 'Massage & Spa':
          window.location.href = '/massage-spa';
          break;
        case 'Butchery':
          window.location.href = '/butchery';
          break;
        case 'Natural':
          window.location.href = '/natural';
          break;
        default:
          break;
      }
    });
  });
  // Scroll to Top Button
const scrollToTopBtn = document.querySelector('.scroll-to-top');

// Show or hide the button based on scroll position
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

// Scroll to top when the button is clicked
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});