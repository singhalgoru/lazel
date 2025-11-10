export default function decorate(block) {
  const heroContent = document.createElement('div');
  heroContent.className = 'hero-content';

  // Get all the content from the block
  const rows = [...block.children];
  
  // Create text content container
  const heroText = document.createElement('div');
  heroText.className = 'hero-text';

  // Create media container
  const heroMedia = document.createElement('div');
  heroMedia.className = 'hero-media';

  // Process each row
  rows.forEach((row, index) => {
    const cols = [...row.children];
    
    if (cols.length >= 2) {
      // Two column layout - text and media
      const textCol = cols[0];
      const mediaCol = cols[1];

      // Process text content
      if (textCol) {
        const textElements = [...textCol.children];
        textElements.forEach((element, elementIndex) => {
          if (element.tagName === 'H1' && elementIndex === 0) {
            // First h1 becomes the main title
            element.className = 'hero-title';
          } else if (element.tagName === 'H1' && elementIndex === 1) {
            // Second h1 becomes subtitle
            element.className = 'hero-subtitle';
            element.tagName = 'div';
          } else if (element.tagName === 'H2') {
            // H2 remains as secondary heading
            element.className = 'hero-heading';
          } else if (element.tagName === 'P') {
            // Check if paragraph contains buttons
            const links = element.querySelectorAll('a');
            if (links.length > 0) {
              // Convert to button container
              const buttonContainer = document.createElement('div');
              buttonContainer.className = 'hero-buttons';
              
              links.forEach((link, linkIndex) => {
                const button = document.createElement('a');
                button.href = link.href;
                button.textContent = link.textContent;
                button.className = linkIndex === 0 ? 'button primary' : 'button';
                buttonContainer.appendChild(button);
              });
              
              heroText.appendChild(buttonContainer);
              return;
            }
          }
          
          heroText.appendChild(element.cloneNode(true));
        });
      }

      // Process media content
      if (mediaCol) {
        const mediaElements = [...mediaCol.children];
        mediaElements.forEach((element) => {
          if (element.tagName === 'PICTURE' || element.tagName === 'IMG') {
            heroMedia.innerHTML = '';
            heroMedia.appendChild(element.cloneNode(true));
          } else if (element.tagName === 'VIDEO') {
            heroMedia.innerHTML = '';
            const video = element.cloneNode(true);
            video.setAttribute('controls', '');
            video.setAttribute('autoplay', '');
            video.setAttribute('muted', '');
            video.setAttribute('loop', '');
            heroMedia.appendChild(video);
          }
        });
      }
    } else if (cols.length === 1) {
      // Single column - add to text content
      const textCol = cols[0];
      const textElements = [...textCol.children];
      
      textElements.forEach((element) => {
        if (element.tagName === 'P') {
          const links = element.querySelectorAll('a');
          if (links.length > 0) {
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'hero-buttons';
            
            links.forEach((link, linkIndex) => {
              const button = document.createElement('a');
              button.href = link.href;
              button.textContent = link.textContent;
              button.className = linkIndex === 0 ? 'button primary' : 'button';
              buttonContainer.appendChild(button);
            });
            
            heroText.appendChild(buttonContainer);
            return;
          }
        }
        
        heroText.appendChild(element.cloneNode(true));
      });
    }
  });

  // Clear the block and add new structure
  block.innerHTML = '';
  heroContent.appendChild(heroText);
  heroContent.appendChild(heroMedia);
  block.appendChild(heroContent);

  // Add click handlers for buttons
  const buttons = block.querySelectorAll('.button');
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      // Add any custom button click logic here
      console.log('Hero button clicked:', button.textContent);
    });
  });

  // Add intersection observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('hero-visible');
      }
    });
  }, {
    threshold: 0.1
  });

  observer.observe(block);
}
