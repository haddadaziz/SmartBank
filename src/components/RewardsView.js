window.SmartBank = window.SmartBank || {};

window.SmartBank.renderRewardsView = function () {
  return `
    <main class="container" style="text-align: center; max-width: 650px;">
      <div style="margin-bottom: 25px;">
        <h2>Roue des Récompenses</h2>
        <p>Tournez la roue et tentez de gagner un bonus chaque jour ! (1 chance sur 2 de gagner)</p>
      </div>

      <div class="rewards-card" style="background: white; padding: 35px 20px; border-radius: 16px; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
        
        <div style="position: relative; width: 280px; height: 280px; margin: 0 auto 25px auto;">
          <!-- Aiguille Rouge -->
          <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-top: 22px solid #ef4444; z-index: 20;"></div>

<div id="wheel" style="width: 100%; height: 100%; border-radius: 50%; border: 6px solid var(--primary-color); transition: transform 3.5s cubic-bezier(0.15, 0.9, 0.2, 1); background: conic-gradient(#3b82f6 0deg 60deg, #64748b 60deg 120deg, #10b981 120deg 180deg, #ef4444 180deg 240deg, #f59e0b 240deg 300deg, #8b5cf6 300deg 360deg); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;">
  
  <div style="position: absolute; width: 100%; height: 100%; pointer-events: none; font-weight: 700; color: white; font-size: 14px;">
    <div style="position: absolute; width: 100%; height: 100%; text-align: center; padding-top: 15px; transform: rotate(30deg); transform-origin: center;">5 €</div>
    
    <div style="position: absolute; width: 100%; height: 100%; text-align: center; padding-top: 15px; transform: rotate(90deg); transform-origin: center;">Perdu</div>
    
    <div style="position: absolute; width: 100%; height: 100%; text-align: center; padding-top: 15px; transform: rotate(150deg); transform-origin: center;">15 €</div>
    
    <div style="position: absolute; width: 100%; height: 100%; text-align: center; padding-top: 15px; transform: rotate(210deg); transform-origin: center;">Perdu</div>
    
    <div style="position: absolute; width: 100%; height: 100%; text-align: center; padding-top: 15px; transform: rotate(270deg); transform-origin: center;">50 €</div>
    
    <div style="position: absolute; width: 100%; height: 100%; text-align: center; padding-top: 15px; transform: rotate(330deg); transform-origin: center;">Perdu</div>
  </div>

  <div style="width: 45px; height: 45px; background: white; border-radius: 50%; z-index: 15; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>
</div>
        </div>

        <button id="spin-btn" class="btn btn-primary" style="padding: 12px 30px; font-size: 16px;">Lancer la roue</button>

        <div id="reward-message" style="margin-top: 15px; font-size: 18px; font-weight: bold; min-height: 25px;"></div>

        <div id="cooldown-container" style="margin-top: 20px; display: none;">
          <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 10px;">Prochain lancer disponible dans :</p>
          
          <div class="flash-timer" style="justify-content: center; background: #0f172a; padding: 15px; border-radius: 12px; display: inline-flex;">
            <div class="timer-box">
              <div id="timer-hours" class="timer-num" style="color: var(--warning-color);">00</div>
              <div class="timer-label">Heures</div>
            </div>
            <div class="timer-num" style="color: white; margin: 0 5px;">:</div>
            <div class="timer-box">
              <div id="timer-minutes" class="timer-num" style="color: var(--warning-color);">00</div>
              <div class="timer-label">Minutes</div>
            </div>
            <div class="timer-num" style="color: white; margin: 0 5px;">:</div>
            <div class="timer-box">
              <div id="timer-seconds" class="timer-num" style="color: var(--warning-color);">00</div>
              <div class="timer-label">Secondes</div>
            </div>
          </div>
        </div>

      </div>
    </main>
  `;
};

window.SmartBank.initRewardsEvents = function () {
  const btn = document.getElementById('spin-btn');
  const msg = document.getElementById('reward-message');
  const wheel = document.getElementById('wheel');
  const cooldownContainer = document.getElementById('cooldown-container');
  const hElem = document.getElementById('timer-hours');
  const mElem = document.getElementById('timer-minutes');
  const sElem = document.getElementById('timer-seconds');

  if (!btn) return;

  const SB_STORAGE = window.SmartBank.storage;
  const SB_SECURITY = window.SmartBank.security;
  const user = SB_SECURITY ? SB_SECURITY.getCurrentUser() : null;

  if (!user) return;

  const COOLDOWN_MS = 24 * 60 * 60 * 1000;
  let timerInterval = null;

  checkCooldown();

  function checkCooldown() {
    const lastSpin = user.lastSpinTime || 0;
    const elapsed = Date.now() - lastSpin;
    const remaining = COOLDOWN_MS - elapsed;

    if (remaining > 0) {
      btn.disabled = true;
      btn.style.opacity = '0.5';
      btn.style.cursor = 'not-allowed';
      cooldownContainer.style.display = 'block';
      startTimer(remaining);
    } else {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
      cooldownContainer.style.display = 'none';
    }
  }

  function startTimer(initialRemainingMs) {
    if (timerInterval) clearInterval(timerInterval);

    function update() {
      const remainingMs = COOLDOWN_MS - (Date.now() - (user.lastSpinTime || 0));

      if (remainingMs <= 0) {
        clearInterval(timerInterval);
        checkCooldown();
        return;
      }

      const totalSeconds = Math.floor(remainingMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      if (hElem) hElem.textContent = String(hours).padStart(2, '0');
      if (mElem) mElem.textContent = String(minutes).padStart(2, '0');
      if (sElem) sElem.textContent = String(seconds).padStart(2, '0');
    }

    update();
    timerInterval = setInterval(update, 1000);
  }

  btn.addEventListener('click', function () {
    btn.disabled = true;
    btn.style.opacity = '0.5';
    msg.textContent = 'La roue tourne...';

    const sectors = [
      { label: '5 €', amount: 5 },
      { label: 'Perdu', amount: 0 },
      { label: '15 €', amount: 15 },
      { label: 'Perdu', amount: 0 },
      { label: '50 €', amount: 50 },
      { label: 'Perdu', amount: 0 }
    ];

    const selectedIndex = Math.floor(Math.random() * sectors.length);
    const result = sectors[selectedIndex];

    const targetAngle = 360 * 5 + (360 - (selectedIndex * 60 + 30));
    wheel.style.transform = `rotate(${targetAngle}deg)`;

    setTimeout(() => {
      if (result.amount > 0) {
        msg.style.color = '#10b981';
        msg.textContent = `Bravo ! Vous avez gagné ${result.label} !`;
        user.balance = (user.balance || 0) + result.amount;
      } else {
        msg.style.color = '#ef4444';
        msg.textContent = `Dommage, c'est perdu pour aujourd'hui !`;
      }

      user.lastSpinTime = Date.now();

      SB_SECURITY.setCurrentUser(user);
      const users = SB_STORAGE.get('smartbank_users') || [];
      const index = users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        users[index] = user;
        SB_STORAGE.set('smartbank_users', users);
      }

      checkCooldown();
    }, 3500);
  });
};