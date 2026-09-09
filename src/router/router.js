window.SmartBank = window.SmartBank || {};

window.SmartBank.handleRouting = function() {
  const root = document.getElementById('root');
  if (!root) return;

  const currentHash = window.location.hash || '#dashboard';
  const SB = window.SmartBank;

  const routes = {
    '#dashboard': SB.renderDashboardView,
    '#login': () => SB.renderAuthView(false),
    '#register': () => SB.renderAuthView(true),
    '#simulator': SB.renderSimulatorView,
    '#offers': SB.renderOffersView,
    '#rewards': SB.renderRewardsView,
    '#profile': SB.renderProfileView,
    '#transactions': SB.renderTransactionsView
  };

  const renderView = routes[currentHash] || renderNotFoundView;
  const isAuthPage = currentHash === '#login' || currentHash === '#register';
  const navbarHTML = isAuthPage ? '' : SB.renderNavbar(currentHash);

  root.innerHTML = `
    ${navbarHTML}
    ${renderView()}
  `;
};

function renderNotFoundView() {
  return `
    <main class="container" style="text-align: center; padding: 60px 20px;">
      <h1 style="font-size: 72px; color: var(--primary-color); margin-bottom: 10px;">404</h1>
      <h2 style="margin-bottom: 25px;">Page non trouvée</h2>
      <a href="#dashboard" class="btn btn-primary">Retourner au Dashboard</a>
    </main>
  `;
}
