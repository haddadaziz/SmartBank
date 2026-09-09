document.addEventListener('DOMContentLoaded', () => {
  if (window.SmartBank && window.SmartBank.handleRouting) {
    window.SmartBank.handleRouting();
    window.addEventListener('hashchange', window.SmartBank.handleRouting);
  }
});
