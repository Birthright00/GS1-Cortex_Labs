// Fraud Detection Analytics - Interactive JavaScript

// Simulate real-time updates
function updateAlerts() {
    const alerts = document.querySelectorAll('.alert-item');
    alerts.forEach((alert, index) => {
        setTimeout(() => {
            alert.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                alert.style.animation = '';
            }, 1000);
        }, index * 200);
    });
}

// Update stats periodically with realistic variations
function updateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        if (stat.textContent.includes('%')) {
            // Slight variation for percentage values
            const currentValue = parseFloat(stat.textContent);
            const variation = (Math.random() - 0.5) * 0.2;
            const newValue = Math.max(0, Math.min(100, currentValue + variation));
            stat.textContent = newValue.toFixed(1) + '%';
        } else if (!stat.textContent.includes('$') && !stat.textContent.includes('kg')) {
            // Slight variation for count values
            const currentValue = parseInt(stat.textContent);
            const variation = Math.floor((Math.random() - 0.5) * 3);
            const newValue = Math.max(0, currentValue + variation);
            stat.textContent = newValue;
        }
    });
}

// Add new alert dynamically
function addNewAlert() {
    const alertTypes = [
        { type: 'high', icon: '🚨', title: 'Suspicious Activity Detected', details: 'Unusual pattern in certification data' },
        { type: 'medium', icon: '⚠️', title: 'Data Inconsistency Found', details: 'Cross-reference check flagged anomaly' },
        { type: 'low', icon: '📊', title: 'Routine Check Complete', details: 'All systems operating normally' }
    ];

    const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const feed = document.querySelector('.alerts-feed');

    const alertEl = document.createElement('div');
    alertEl.className = `alert-item ${randomAlert.type}`;
    alertEl.style.animation = 'slideInLeft 0.5s ease-out';
    alertEl.innerHTML = `
        <div class="alert-icon">${randomAlert.icon}</div>
        <div class="alert-content">
            <div class="alert-title">${randomAlert.title}</div>
            <div class="alert-details">${randomAlert.details}</div>
            <div class="alert-meta">
                <span>Batch: LOT2024X${Math.floor(Math.random() * 999)}</span>
                <span>Just now</span>
            </div>
        </div>
    `;

    feed.insertBefore(alertEl, feed.firstChild);

    // Remove oldest alert if more than 5
    const alerts = feed.querySelectorAll('.alert-item');
    if (alerts.length > 5) {
        alerts[alerts.length - 1].style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => alerts[alerts.length - 1].remove(), 500);
    }
}

// Click handler for anomaly cards
function showAnomalyDetails(card) {
    const type = card.querySelector('.anomaly-type').textContent;
    const description = card.querySelector('.anomaly-description').textContent;
    const data = card.querySelector('.anomaly-data').textContent;

    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;

    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #1e293b, #0f172a);
            color: #f1f5f9;
            padding: 40px;
            border-radius: 20px;
            max-width: 600px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        ">
            <h2 style="margin-bottom: 20px; color: #fbbf24;">🔍 ${type}</h2>
            <p style="margin-bottom: 20px; line-height: 1.6;">${description}</p>
            <pre style="
                background: rgba(0,0,0,0.3);
                padding: 20px;
                border-radius: 10px;
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                overflow-x: auto;
                white-space: pre-wrap;
            ">${data}</pre>
            <button onclick="this.closest('div').parentElement.remove()" style="
                margin-top: 20px;
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 10px;
                cursor: pointer;
                font-weight: 600;
                width: 100%;
            ">Close</button>
        </div>
    `;

    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Click handler for action cards
function triggerAction(actionTitle) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    notification.innerHTML = `
        <strong>✓ Action Triggered</strong><br>
        <span style="font-size: 0.9rem; opacity: 0.9;">${actionTitle}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fraud Detection System initialized');

    // Periodic updates
    setInterval(updateAlerts, 30000); // Update alerts every 30 seconds
    setInterval(updateStats, 45000);  // Update stats every 45 seconds
    setInterval(addNewAlert, 20000);  // Add new alert every 20 seconds

    // Add click handlers to anomaly cards
    document.querySelectorAll('.anomaly-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            showAnomalyDetails(this);
        });

        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click handlers to action cards
    document.querySelectorAll('.action-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const title = this.querySelector('.action-title').textContent;
            triggerAction(title);
        });

        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add hover effects to fraud case
    document.querySelectorAll('.fraud-case').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Make stat cards interactive
    document.querySelectorAll('.stat-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const label = this.querySelector('.stat-label').textContent;
            const value = this.querySelector('.stat-value').textContent;
            alert(`${label}\n\nCurrent Value: ${value}\n\nThis metric updates in real-time based on system monitoring.`);
        });
    });
});

// Add custom animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInLeft {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);
