window.SmartBank = window.SmartBank || {};

window.SmartBank.renderNavbar = function(activeHash = '#dashboard') {
  return `
    <header class="navbar">
      <div class="container navbar-container">
        <a href="#dashboard" class="navbar-logo">
          <img src="./src/assets/logo.jpg" alt="SmartBank Logo" class="logo-img" />
        </a>

        <input type="checkbox" id="menu-toggle" class="menu-toggle-checkbox" />
        <label for="menu-toggle" class="hamburger-btn" aria-label="Toggle Navigation">
          <span></span>
          <span></span>
          <span></span>
        </label>

        <nav class="nav-menu">
          <ul class="navbar-links">
            <li><a href="#dashboard" class="${activeHash === '#dashboard' ? 'active' : ''}">Dashboard</a></li>
            <li><a href="#simulator" class="${activeHash === '#simulator' ? 'active' : ''}">Simulateur</a></li>
            <li><a href="#offers" class="${activeHash === '#offers' ? 'active' : ''}">Offres Flash</a></li>
            <li><a href="#rewards" class="${activeHash === '#rewards' ? 'active' : ''}">Récompenses</a></li>
            <li><a href="#profile" class="${activeHash === '#profile' ? 'active' : ''}">Profil</a></li>
            <li class="mobile-logout-li"><a href="#login" class="btn btn-outline mobile-logout-btn">Déconnexion</a></li>
          </ul>
        </nav>

        <div class="navbar-user">
          <a href="#login" class="btn btn-outline" style="padding: 6px 14px; font-size: 13px;">Déconnexion</a>
        </div>
      </div>
    </header>
  `;
};
