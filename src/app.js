document.addEventListener('DOMContentLoaded', () => {
  if (window.SmartBank && window.SmartBank.handleRouting) {
    window.SmartBank.handleRouting();
    window.addEventListener('popstate', window.SmartBank.handleRouting);
  }
});
