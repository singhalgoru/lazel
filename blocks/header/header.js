export default function decorate(block) {
  // Create header content
  const headerContent = document.createElement('div');
  headerContent.className = 'header-content';

  // Create logo
  const logo = document.createElement('div');
  logo.className = 'header-logo';
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.innerHTML = '<img src="https://via.placeholder.com/150x50/f0f0f0/cccccc?text=NewCo+Logo" alt="NewCo Logo">';
  logo.appendChild(logoLink);

  // Create navigation
  const nav = document.createElement('nav');
  nav.className = 'header-nav';
  
  // Create navigation items
  const navItems = [
    { text: 'Solutions', url: '#' },
    { text: 'Company', url: '#' },
    { text: 'Careers', url: '#' },
    { text: 'News', url: '#' },
    { text: 'Contact', url: '#' }
  ];

  navItems.forEach(item => {
    const navItem = document.createElement('a');
    navItem.href = item.url;
    navItem.textContent = item.text;
    navItem.className = 'nav-item';
    nav.appendChild(navItem);
  });

  // Create utility navigation
  const utilNav = document.createElement('div');
  utilNav.className = 'header-util-nav';
  
  // Create search button
  const searchBtn = document.createElement('button');
  searchBtn.className = 'search-button';
  searchBtn.innerHTML = '<span>Search</span>';
  utilNav.appendChild(searchBtn);

  // Assemble header
  headerContent.appendChild(logo);
  headerContent.appendChild(nav);
  headerContent.appendChild(utilNav);
  
  // Clear the block and add new structure
  block.innerHTML = '';
  block.appendChild(headerContent);

  // Add mobile menu toggle
  const mobileMenuToggle = document.createElement('button');
  mobileMenuToggle.className = 'mobile-menu-toggle';
  mobileMenuToggle.innerHTML = '<span></span><span></span><span></span>';
  mobileMenuToggle.setAttribute('aria-label', 'Toggle mobile menu');
  
  mobileMenuToggle.addEventListener('click', () => {
    block.classList.toggle('mobile-menu-open');
  });
  
  headerContent.insertBefore(mobileMenuToggle, nav);
}
