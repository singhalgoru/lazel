export default function decorate(block) {
  // Create footer content
  const footerContent = document.createElement('div');
  footerContent.className = 'footer-content';

  // Create logo
  const logo = document.createElement('div');
  logo.className = 'footer-logo';
  logo.innerHTML = '<img src="https://via.placeholder.com/150x50/f0f0f0/cccccc?text=NewCo+Logo" alt="NewCo Logo">';
  
  // Create navigation
  const nav = document.createElement('div');
  nav.className = 'footer-nav';
  
  // Create navigation columns
  const navColumns = [
    {
      title: 'Solutions',
      links: []
    },
    {
      title: 'Company',
      links: [
        { text: 'Team', url: '#' },
        { text: 'Success Stories', url: '#' }
      ]
    },
    {
      title: 'Careers',
      links: []
    },
    {
      title: 'News',
      links: []
    },
    {
      title: 'Contact',
      links: []
    }
  ];

  navColumns.forEach(column => {
    const navColumn = document.createElement('div');
    navColumn.className = 'footer-nav-column';
    
    const title = document.createElement('h4');
    title.textContent = column.title;
    navColumn.appendChild(title);
    
    if (column.links.length > 0) {
      const linksList = document.createElement('ul');
      
      column.links.forEach(link => {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = link.url;
        anchor.textContent = link.text;
        listItem.appendChild(anchor);
        linksList.appendChild(listItem);
      });
      
      navColumn.appendChild(linksList);
    }
    
    nav.appendChild(navColumn);
  });
  
  // Create buttons
  const buttons = document.createElement('div');
  buttons.className = 'footer-buttons';
  
  const exploreBtn = document.createElement('a');
  exploreBtn.href = 'https://www.explorlearning.com';
  exploreBtn.className = 'button secondary';
  exploreBtn.textContent = 'ExploreLearning.com';
  buttons.appendChild(exploreBtn);
  
  const learningBtn = document.createElement('a');
  learningBtn.href = 'https://www.learninga-z.com';
  learningBtn.className = 'button secondary';
  learningBtn.textContent = 'LearningA–Z.com';
  buttons.appendChild(learningBtn);
  
  // Create bottom section
  const bottom = document.createElement('div');
  bottom.className = 'footer-bottom';
  
  // Create links
  const links = document.createElement('div');
  links.className = 'footer-links';
  
  const copyright = document.createElement('span');
  copyright.textContent = '©NewCo. 2026';
  links.appendChild(copyright);
  
  const bottomLinks = [
    { text: 'Privacy Policy', url: '#' },
    { text: 'ExploreLearning Terms of Use', url: '#' },
    { text: 'Learning A-Z Terms of Use', url: '#' },
    { text: 'Accessibility', url: '#' },
    { text: 'Cambium Learning Group', url: '#' },
    { text: 'Sitemap', url: '#' }
  ];
  
  bottomLinks.forEach(link => {
    const anchor = document.createElement('a');
    anchor.href = link.url;
    anchor.textContent = link.text;
    links.appendChild(anchor);
  });
  
  // Create social icons
  const social = document.createElement('div');
  social.className = 'footer-social';
  
  const socialIcons = ['FB', 'TW', 'IG', 'LI', 'YT'];
  
  socialIcons.forEach(icon => {
    const socialLink = document.createElement('a');
    socialLink.href = '#';
    socialLink.className = 'social-icon';
    socialLink.textContent = icon;
    social.appendChild(socialLink);
  });
  
  // Assemble footer
  bottom.appendChild(links);
  bottom.appendChild(social);
  
  footerContent.appendChild(logo);
  footerContent.appendChild(nav);
  footerContent.appendChild(buttons);
  footerContent.appendChild(bottom);
  
  // Clear the block and add new structure
  block.innerHTML = '';
  block.appendChild(footerContent);
}
