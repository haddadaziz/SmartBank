window.SmartBank = window.SmartBank || {};

window.SmartBank.renderSimulatorView = function() {
  return `
    <main class="container">
      <div style="margin-bottom: 25px;">
        <h2>Simulateur de Crédit Interactif</h2>
        <p>Calculez en temps réel vos mensualités et le coût de votre emprunt</p>
      </div>

      <div class="simulator-wrapper">
        <!-- Contrôles par Sliders (Jira KAN-54) -->
        <div class="simulator-controls">
          <div class="slider-group">
            <label>
              <span>Montant du crédit</span>
              <span class="slider-value" id="amount-val">15 000 €</span>
            </label>
            <input type="range" class="slider-input" id="amount-slider" min="1000" max="50000" step="500" value="15000" />
          </div>

          <div class="slider-group">
            <label>
              <span>Durée de remboursement</span>
              <span class="slider-value" id="duration-val">36 mois</span>
            </label>
            <input type="range" class="slider-input" id="duration-slider" min="12" max="84" step="6" value="36" />
          </div>

          <div class="slider-group">
            <label>
              <span>Taux d'intérêt annuel (TAEG)</span>
              <span class="slider-value">4,5 %</span>
            </label>
          </div>
        </div>

        <div class="simulator-results">
          <div>
            <div class="result-card highlight">
              <p>Mensualité estimée</p>
              <div class="value" id="monthly-payment">446,12 € / mois</div>
            </div>

            <div class="result-card">
              <p>Coût total des intérêts</p>
              <div class="value" id="total-interest">1 060,32 €</div>
            </div>

            <div class="result-card">
              <p>Montant total remboursé</p>
              <div class="value" id="total-cost">16 060,32 €</div>
            </div>
          </div>

          <button class="btn btn-primary" style="width: 100%; margin-top: 15px;">Enregistrer cette simulation</button>
        </div>
      </div>

      <section class="saved-simulations">
        <h3>Mes Simulations Enregistrées</h3>
        <div class="simulations-list">
          <div class="simulation-item">
            <div>
              <strong>Prêt Personnel Projets — 15 000 € sur 36 mois</strong>
              <div style="font-size: 13px; color: var(--text-muted);">Mensualité : 446,12 € / mois (Enregistré le 07/09/2026)</div>
            </div>
            <button class="btn btn-danger" style="padding: 6px 12px; font-size: 12px;">Supprimer</button>
          </div>
          <div class="simulation-item">
            <div>
              <strong>Crédit Auto — 8 000 € sur 24 mois</strong>
              <div style="font-size: 13px; color: var(--text-muted);">Mensualité : 349,15 € / mois (Enregistré le 05/09/2026)</div>
            </div>
            <button class="btn btn-danger" style="padding: 6px 12px; font-size: 12px;">Supprimer</button>
          </div>
        </div>
      </section>
    </main>
  `;
};
