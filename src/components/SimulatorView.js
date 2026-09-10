window.SmartBank = window.SmartBank || {};

window.SmartBank.renderSimulatorView = function () {
  return `
    <main class="container">
      <div style="margin-bottom: 25px;">
        <h2>Simulateur de Prêt & Crédit</h2>
        <p>Estimez vos mensualités et le coût total de votre financement en temps réel</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 25px;">
        
        <div class="simulator-card" style="background: white; padding: 25px; border-radius: 16px; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
          <h3>Configuration du Prêt</h3>

          <div class="form-group" style="margin-top: 20px;">
            <label style="display: flex; justify-content: space-between;">
              <span>Montant à emprunter :</span>
              <strong id="amount-val">10 000 €</strong>
            </label>
            <input type="range" id="sim-amount" min="1000" max="50000" step="500" value="10000" style="width: 100%; margin-top: 8px;" />
          </div>

          <div class="form-group" style="margin-top: 20px;">
            <label style="display: flex; justify-content: space-between;">
              <span>Durée de remboursement :</span>
              <strong id="duration-val">24 mois</strong>
            </label>
            <input type="range" id="sim-duration" min="6" max="84" step="6" value="24" style="width: 100%; margin-top: 8px;" />
          </div>

          <div class="form-group" style="margin-top: 20px;">
            <label style="display: flex; justify-content: space-between;">
              <span>Taux d'intérêt annuel (TAEG) :</span>
              <strong id="rate-val">3.5 %</strong>
            </label>
            <input type="range" id="sim-rate" min="0.9" max="10.0" step="0.1" value="3.5" style="width: 100%; margin-top: 8px;" />
          </div>

          <button id="save-sim-btn" class="btn btn-primary" style="width: 100%; margin-top: 20px;">
            Enregistrer cette simulation
          </button>
        </div>

<div class="result-card" style="background: white; border: 2px solid var(--primary-color); padding: 30px; border-radius: 16px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--shadow-sm);">
  <div>
    <h3 style="color: #0f172a; margin-bottom: 20px; font-weight: 700;">Estimation de vos Mensualités</h3>
    
    <div style="margin-bottom: 25px; background: #f8fafc; padding: 15px; border-radius: 12px; border: 1px solid #e2e8f0;">
      <span style="font-size: 14px; color: #475569; font-weight: 600;">Mensualité estimée :</span>
      <div id="monthly-result" style="font-size: 38px; font-weight: 800; color: var(--primary-color); margin-top: 5px;">432,04 € / mois</div>
    </div>
    <div style="border-top: 1px solid #e2e8f0; padding-top: 15px;">
      <p style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 15px; color: #1e293b;">
        <span>Montant total dû :</span>
        <strong id="total-due-val" style="color: #0f172a; font-size: 16px;">10 368,96 €</strong>
      </p>
      <p style="display: flex; justify-content: space-between; font-size: 15px; color: #1e293b;">
        <span>Coût total du crédit :</span>
        <strong id="total-cost-val" style="color: #d97706; font-size: 16px;">368,96 €</strong>
      </p>
    </div>
  </div>
  <p style="font-size: 12px; color: #64748b; margin-top: 20px; line-height: 1.4;">*Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.</p>
</div>

      </div>

      <section style="margin-top: 40px;">
        <h3>Mes Simulations Enregistrées</h3>
        <div id="saved-simulations-list" style="margin-top: 15px;">
        </div>
      </section>

    </main>
  `;
};

window.SmartBank.initSimulatorEvents = function () {
  const amountInput = document.getElementById('sim-amount');
  const durationInput = document.getElementById('sim-duration');
  const rateInput = document.getElementById('sim-rate');

  const amountVal = document.getElementById('amount-val');
  const durationVal = document.getElementById('duration-val');
  const rateVal = document.getElementById('rate-val');

  const monthlyResult = document.getElementById('monthly-result');
  const totalDueVal = document.getElementById('total-due-val');
  const totalCostVal = document.getElementById('total-cost-val');
  const saveBtn = document.getElementById('save-sim-btn');
  const savedList = document.getElementById('saved-simulations-list');

  if (!amountInput) return;

  const SB_STORAGE = window.SmartBank.storage;
  const SB_SECURITY = window.SmartBank.security;
  const currentUser = SB_SECURITY ? SB_SECURITY.getCurrentUser() : null;

  function calculateLoan() {
    const P = parseFloat(amountInput.value);
    const n = parseInt(durationInput.value);
    const annualRate = parseFloat(rateInput.value);
    const r = (annualRate / 100) / 12;

    let monthly = 0;
    if (r > 0) {
      monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      monthly = P / n;
    }

    const totalDue = monthly * n;
    const totalCost = totalDue - P;

    amountVal.textContent = P.toLocaleString('fr-FR') + ' €';
    durationVal.textContent = n + ' mois';
    rateVal.textContent = annualRate.toFixed(1) + ' %';

    monthlyResult.textContent = monthly.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' € / mois';
    totalDueVal.textContent = totalDue.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
    totalCostVal.textContent = totalCost.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

    return { amount: P, duration: n, rate: annualRate, monthly, totalDue, totalCost };
  }
  amountInput.addEventListener('input', calculateLoan);
  durationInput.addEventListener('input', calculateLoan);
  rateInput.addEventListener('input', calculateLoan);

  calculateLoan();

  function renderSavedSimulations() {
    if (!currentUser || !savedList) return;

    const allSimulations = SB_STORAGE.get('smartbank_simulations') || [];
    const userSimulations = allSimulations.filter(s => s.userId === currentUser.id);

    if (userSimulations.length === 0) {
      savedList.innerHTML = `<p style="color: var(--text-muted);">Aucune simulation enregistrée pour le moment.</p>`;
      return;
    }

    savedList.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">
        ${userSimulations.map(sim => `
          <div style="background: white; padding: 18px; border-radius: 12px; border: 1px solid var(--border-color); position: relative;">
            <button class="delete-sim-btn" data-id="${sim.id}" style="position: absolute; top: 12px; right: 12px; background: none; border: none; font-size: 16px; cursor: pointer; color: #ef4444;" title="Supprimer">Supprimer</button>
            <h4 style="margin-bottom: 10px; color: var(--primary-color);">${sim.amount.toLocaleString('fr-FR')} € sur ${sim.duration} mois</h4>
            <p style="font-size: 13px; margin-bottom: 5px;">Taux : <strong>${sim.rate} %</strong></p>
            <p style="font-size: 13px; margin-bottom: 5px;">Mensualité : <strong>${sim.monthly.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} € / mois</strong></p>
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 10px;">Créé le ${new Date(sim.createdAt).toLocaleDateString('fr-FR')}</p>
          </div>
        `).join('')}
      </div>
    `;

    document.querySelectorAll('.delete-sim-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const idToDelete = this.getAttribute('data-id');
        deleteSimulation(idToDelete);
      });
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', function () {
      if (!currentUser) return;

      const currentCalc = calculateLoan();
      const newSimulation = {
        id: Date.now().toString(),
        userId: currentUser.id,
        amount: currentCalc.amount,
        duration: currentCalc.duration,
        rate: currentCalc.rate,
        monthly: currentCalc.monthly,
        createdAt: new Date().toISOString()
      };

      const allSimulations = SB_STORAGE.get('smartbank_simulations') || [];
      allSimulations.push(newSimulation);
      SB_STORAGE.set('smartbank_simulations', allSimulations);

      renderSavedSimulations();
      alert('Simulation enregistrée avec succès !');
    });
  }

  function deleteSimulation(simId) {
    let allSimulations = SB_STORAGE.get('smartbank_simulations') || [];
    allSimulations = allSimulations.filter(s => s.id !== simId);
    SB_STORAGE.set('smartbank_simulations', allSimulations);
    renderSavedSimulations();
  }
  renderSavedSimulations();
};