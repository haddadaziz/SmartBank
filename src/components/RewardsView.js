window.SmartBank = window.SmartBank || {};

window.SmartBank.renderRewardsView = function() {
  return `
    <main class="container">
      <div class="rewards-container">
        <h2>Roue des Récompenses Interactives</h2>
        <p style="margin-bottom: 20px;">Tournez la roue chaque jour et tentez de gagner des bons ou du cash directement sur votre compte !</p>

        <div class="wheel-status-banner">
          <div class="wheel-status-text" id="wheel-status-label">
            Vous pouvez tourner la roue !
          </div>
          
          <div class="flash-timer">
            <div class="timer-box">
              <div class="timer-num" id="wheel-timer-hours">00</div>
              <div class="timer-label">Heures</div>
            </div>
            <div class="timer-num" style="color: var(--secondary-color);">:</div>
            <div class="timer-box">
              <div class="timer-num" id="wheel-timer-minutes">00</div>
              <div class="timer-label">Minutes</div>
            </div>
            <div class="timer-num" style="color: var(--secondary-color);">:</div>
            <div class="timer-box">
              <div class="timer-num" id="wheel-timer-seconds">00</div>
              <div class="timer-label">Secondes</div>
            </div>
          </div>
        </div>

        <div class="wheel-wrapper">
          <div class="wheel-pointer"></div>
          
          <div class="wheel-circle-svg-container" id="wheel">
            <svg viewBox="0 0 300 300" class="wheel-svg">
              <g transform="translate(150,150)">
                <path d="M 0 0 L 150 0 A 150 150 0 0 1 106.07 106.07 Z" fill="#3b82f6"/>
                <text x="92" y="38" fill="#ffffff" font-size="15" font-weight="800" text-anchor="middle" dominant-baseline="central">15 €</text>

                <path d="M 0 0 L 106.07 106.07 A 150 150 0 0 1 0 150 Z" fill="#64748b"/>
                <text x="38" y="92" fill="#ffffff" font-size="14" font-weight="700" text-anchor="middle" dominant-baseline="central">Perdu</text>

                <path d="M 0 0 L 0 150 A 150 150 0 0 1 -106.07 106.07 Z" fill="#f59e0b"/>
                <text x="-38" y="92" fill="#ffffff" font-size="15" font-weight="800" text-anchor="middle" dominant-baseline="central">50 €</text>

                <path d="M 0 0 L -106.07 106.07 A 150 150 0 0 1 -150 0 Z" fill="#475569"/>
                <text x="-92" y="38" fill="#ffffff" font-size="14" font-weight="700" text-anchor="middle" dominant-baseline="central">Perdu</text>

                <path d="M 0 0 L -150 0 A 150 150 0 0 1 -106.07 -106.07 Z" fill="#10b981"/>
                <text x="-92" y="-38" fill="#ffffff" font-size="15" font-weight="800" text-anchor="middle" dominant-baseline="central">5 €</text>

                <path d="M 0 0 L -106.07 -106.07 A 150 150 0 0 1 0 -150 Z" fill="#64748b"/>
                <text x="-38" y="-92" fill="#ffffff" font-size="14" font-weight="700" text-anchor="middle" dominant-baseline="central">Perdu</text>

                <path d="M 0 0 L 0 -150 A 150 150 0 0 1 106.07 -106.07 Z" fill="#8b5cf6"/>
                <text x="38" y="-92" fill="#ffffff" font-size="15" font-weight="800" text-anchor="middle" dominant-baseline="central">20 €</text>

                <path d="M 0 0 L 106.07 -106.07 A 150 150 0 0 1 150 0 Z" fill="#475569"/>
                <text x="92" y="-38" fill="#ffffff" font-size="14" font-weight="700" text-anchor="middle" dominant-baseline="central">Perdu</text>
              </g>
            </svg>
          </div>

          <button class="wheel-center-btn" id="spin-btn">SPIN</button>
        </div>

        <div class="modal-backdrop" id="reward-modal" style="display: none;">
          <div class="modal-content">
            <div class="modal-icon">🎉</div>
            <h3>Félicitations !</h3>
            <p style="margin: 15px 0;">Vous avez remporté un crédit de <strong>15,00 €</strong> versé instantanément sur votre Compte Courant SmartBank !</p>
            <button class="btn btn-primary" id="close-modal-btn">Consulter mon solde</button>
          </div>
        </div>
      </div>
    </main>
  `;
};
