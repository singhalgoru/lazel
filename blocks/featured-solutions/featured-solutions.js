/**
 * Featured Solutions Block Script
 */
(function() {
  /**
   * Initialize the featured solutions block
   */
  function initFeaturedSolutions() {
    // Add animation for featured solutions items
    const featuredItems = document.querySelectorAll('.featured-solution-item');
    const seeAllButton = document.querySelector('.see-all-button');
    const illustration = document.querySelector('.featured-solutions-illustration');
    
    // Add intersection observer to animate items when they come into view
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
      
      // Animate solution items with staggered delay
      featuredItems.forEach((item, index) => {
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
      
      // Animate the See All button
      if (seeAllButton) {
        seeAllButton.style.opacity = '0';
        seeAllButton.style.transform = 'translateY(20px)';
        seeAllButton.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        seeAllButton.style.transitionDelay = `${featuredItems.length * 150 + 100}ms`;
        observer.observe(seeAllButton);
      }
      
      // Animate the illustration
      if (illustration) {
        illustration.style.opacity = '0';
        illustration.style.transform = 'translateX(50px)';
        illustration.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        illustration.style.transitionDelay = '200ms';
        observer.observe(illustration);
      }
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      featuredItems.forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      });
      
      if (seeAllButton) {
        seeAllButton.style.opacity = '1';
        seeAllButton.style.transform = 'translateY(0)';
      }
      
      if (illustration) {
        illustration.style.opacity = '1';
        illustration.style.transform = 'translateX(0)';
      }
    }
    
    // Add hover effects to solution items and assign category classes
    featuredItems.forEach((item, index) => {
      const link = item.querySelector('.featured-solution-link');
      const icon = item.querySelector('.solution-icon');
      
      // Assign category class based on the icon class
      if (icon) {
        if (icon.classList.contains('frax')) {
          item.classList.add('frax');
        } else if (icon.classList.contains('reflex')) {
          item.classList.add('reflex');
        } else if (icon.classList.contains('prekids')) {
          item.classList.add('prekids');
        } else if (icon.classList.contains('gizmos')) {
          item.classList.add('gizmos');
        }
      } else {
        // Fallback if no icon class is found, assign based on index
        const categories = ['frax', 'reflex', 'prekids', 'gizmos'];
        item.classList.add(categories[index % categories.length]);
      }
      
      // Remove the old hover event listeners as we're now using CSS for hover effects
    });
  }
  
  // Add event listener for when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    initFeaturedSolutions();
  });
  
  // Add a class to animate items when they come into view
  document.addEventListener('scroll', function() {
    const featuredItems = document.querySelectorAll('.featured-solution-item:not(.animate-in), .see-all-button:not(.animate-in), .featured-solutions-illustration:not(.animate-in)');
    
    featuredItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      
      if (isVisible) {
        item.classList.add('animate-in');
        item.style.opacity = '1';
        item.style.transform = item.classList.contains('featured-solutions-illustration') ? 'translateX(0)' : 'translateY(0)';
      }
    });
  });
  
  // Ensure featured solution items are visible if they're already in the viewport on page load
  window.addEventListener('load', function() {
    // Force all featured solution items to be visible after a short delay
    // This ensures they don't stay invisible if IntersectionObserver fails
    setTimeout(function() {
      const allFeaturedItems = document.querySelectorAll('.featured-solution-item');
      const seeAllButton = document.querySelector('.see-all-button');
      const illustration = document.querySelector('.featured-solutions-illustration');
      
      allFeaturedItems.forEach((item) => {
        if (item.style.opacity === '0') {
          item.classList.add('animate-in');
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }
      });
      
      if (seeAllButton && seeAllButton.style.opacity === '0') {
        seeAllButton.classList.add('animate-in');
        seeAllButton.style.opacity = '1';
        seeAllButton.style.transform = 'translateY(0)';
      }
      
      if (illustration && illustration.style.opacity === '0') {
        illustration.classList.add('animate-in');
        illustration.style.opacity = '1';
        illustration.style.transform = 'translateX(0)';
      }
    }, 1000); // 1 second delay to ensure everything is loaded
  });
})();
