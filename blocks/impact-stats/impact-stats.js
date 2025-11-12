/**
 * Impact Stats Block Script
 */
(function() {
  /**
   * Initialize the impact stats block
   */
  function initImpactStats() {
    // Get elements
    const contentSection = document.querySelector('.impact-stats-content');
    const statItems = document.querySelectorAll('.impact-stat');
    const button = document.querySelector('.impact-stats-button');
    
    // Add animation for impact stats items
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      });
      
      // Set initial state for content section
      if (contentSection) {
        contentSection.style.opacity = '0';
        contentSection.style.transform = 'translateY(30px)';
        contentSection.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(contentSection);
      }
      
      // Animate stat items with staggered delay
      statItems.forEach((item, index) => {
        // Set initial state
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Add delay for staggered animation
        const delay = index * 150;
        item.style.transitionDelay = `${delay}ms`;
        
        // Observe the item
        observer.observe(item);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      if (contentSection) {
        contentSection.style.opacity = '1';
        contentSection.style.transform = 'translateY(0)';
      }
      
      statItems.forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      });
    }
    
    // Add hover effect to button
    if (button) {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translate(2px, -2px)';
        button.style.boxShadow = '-8px 11px 0 0 rgba(0, 0, 0, 0.2)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
        button.style.boxShadow = '';
      });
    }
    
    // Add counter animation to stat numbers
    statItems.forEach((item) => {
      const numberElement = item.querySelector('.impact-stat-number');
      if (numberElement && numberElement.textContent !== 'XX') {
        const targetNumber = parseInt(numberElement.textContent, 10);
        if (!isNaN(targetNumber)) {
          animateCounter(numberElement, targetNumber);
        }
      }
    });
  }
  
  /**
   * Animate a counter from 0 to target number
   * @param {HTMLElement} element - The element to update
   * @param {number} target - The target number
   */
  function animateCounter(element, target) {
    let start = 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Use easeOutQuad easing function for smoother animation
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(easeProgress * target);
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }
    
    requestAnimationFrame(updateCounter);
  }
  
  // Add event listener for when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    initImpactStats();
  });
  
  // Add a class to animate items when they come into view
  document.addEventListener('scroll', function() {
    const contentSection = document.querySelector('.impact-stats-content:not(.animate-in)');
    const statItems = document.querySelectorAll('.impact-stat:not(.animate-in)');
    
    if (contentSection) {
      const rect = contentSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      
      if (isVisible) {
        contentSection.classList.add('animate-in');
        contentSection.style.opacity = '1';
        contentSection.style.transform = 'translateY(0)';
      }
    }
    
    statItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      
      if (isVisible) {
        item.classList.add('animate-in');
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }
    });
  });
  
  // Ensure impact stats items are visible if they're already in the viewport on page load
  window.addEventListener('load', function() {
    // Force all impact stats items to be visible after a short delay
    // This ensures they don't stay invisible if IntersectionObserver fails
    setTimeout(function() {
      const contentSection = document.querySelector('.impact-stats-content');
      const statItems = document.querySelectorAll('.impact-stat');
      
      if (contentSection && contentSection.style.opacity === '0') {
        contentSection.classList.add('animate-in');
        contentSection.style.opacity = '1';
        contentSection.style.transform = 'translateY(0)';
      }
      
      statItems.forEach((item) => {
        if (item.style.opacity === '0') {
          item.classList.add('animate-in');
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }
      });
    }, 1500); // 1.5 second delay to ensure everything is loaded (slightly after featured solutions)
  });
})();
