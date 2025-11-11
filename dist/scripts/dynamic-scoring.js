// Dynamic Sustainability Scoring - Interactive JavaScript

// Simulate score updates with visual feedback
function simulateScoreUpdate() {
    const scores = document.querySelectorAll('.score-numerical');
    scores.forEach(scoreEl => {
        const currentScore = parseInt(scoreEl.textContent);
        const variation = Math.floor((Math.random() - 0.5) * 4);
        const newScore = Math.max(0, Math.min(100, currentScore + variation));

        // Animate the change
        scoreEl.style.transform = 'scale(1.2)';
        scoreEl.style.transition = 'all 0.3s ease';

        setTimeout(() => {
            scoreEl.textContent = newScore + '/100';
            scoreEl.style.transform = 'scale(1)';
        }, 300);
    });

    // Show update notification
    showNotification('Scores Updated', 'Sustainability scores recalculated based on latest data');
}

// Update timestamps realistically
function updateTimestamps() {
    const timestamps = document.querySelectorAll('.last-updated');
    timestamps.forEach(ts => {
        const minutes = Math.floor(Math.random() * 5) + 1;
        ts.textContent = `Last updated: ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    });
}

// Add new update to timeline
function addNewUpdate() {
    const updateTypes = [
        { type: 'score-increase', icon: '📈', text: 'Score improved', details: 'New certification uploaded and verified' },
        { type: 'data-update', icon: '🔗', text: 'Supply chain data updated', details: 'GS1 scan recorded at distribution center' },
        { type: 'cert-expiry', icon: '⚠️', text: 'Certificate renewal reminder', details: 'Organic certification expires in 60 days' }
    ];

    const update = updateTypes[Math.floor(Math.random() * updateTypes.length)];
    const timeline = document.querySelector('.update-timeline');

    const updateEl = document.createElement('div');
    updateEl.className = `update-item ${update.type}`;
    updateEl.style.animation = 'slideInUp 0.5s ease-out';
    updateEl.innerHTML = `
        <div class="update-icon">${update.icon}</div>
        <div class="update-content">
            <div class="update-text">${update.text}</div>
            <div class="update-details">${update.details}</div>
        </div>
        <div class="update-time">Just now</div>
    `;

    timeline.insertBefore(updateEl, timeline.firstChild);

    // Keep only 5 most recent updates
    const updates = timeline.querySelectorAll('.update-item');
    if (updates.length > 5) {
        updates[updates.length - 1].style.animation = 'slideOutDown 0.5s ease-out';
        setTimeout(() => updates[updates.length - 1].remove(), 500);
    }
}

// Show notification helper
function showNotification(title, message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #0ea5e9, #0369a1);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(14, 165, 233, 0.4);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 350px;
    `;
    notification.innerHTML = `
        <strong>${title}</strong><br>
        <span style="font-size: 0.9rem; opacity: 0.9;">${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Batch card click handler
function showBatchDetails(batchId, score, status) {
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
            background: white;
            color: #1e293b;
            padding: 40px;
            border-radius: 20px;
            max-width: 600px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        ">
            <h2 style="margin-bottom: 20px; color: #0369a1;">📦 Batch Details</h2>
            <div style="background: #f1f5f9; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <strong>Batch ID:</strong> ${batchId}<br>
                <strong>Score:</strong> ${score}<br>
                <strong>Status:</strong> ${status}<br>
                <strong>Last Updated:</strong> ${new Date().toLocaleString()}
            </div>
            <div style="margin-bottom: 20px;">
                <h3 style="color: #0369a1; margin-bottom: 10px;">Supply Chain Steps:</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">✅ Raw Materials - Verified</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">✅ Manufacturing - Verified</li>
                    <li style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">✅ Packaging - Verified</li>
                    <li style="padding: 8px 0;">🚚 Logistics - In Transit</li>
                </ul>
            </div>
            <button onclick="this.closest('div').parentElement.remove()" style="
                background: linear-gradient(135deg, #0ea5e9, #0369a1);
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

// Category card click handler
function showCategoryBreakdown(categoryName, score) {
    const details = {
        'Materials': ['Organic Certification: 100%', 'Source Distance: Local', 'Water Usage: Excellent', 'Pesticides: Zero'],
        'Manufacturing': ['Energy: 87% Renewable', 'CO₂: 1.4kg/unit', 'Water Recycling: 94%', 'Worker Standards: SA8000'],
        'Packaging': ['Material: 100% Recycled', 'Recyclability: 95%', 'Weight: Minimal', 'FSC Certified: Yes'],
        'Logistics': ['Transport: Electric', 'Distance: 847km', 'Optimization: 23%', 'Carbon Offset: 150%'],
        'Verification': ['Data: 28/28 Points', 'Blockchain: 100%', 'Audits: Quarterly', 'Certs: Current']
    };

    const categoryDetails = details[categoryName] || ['No details available'];

    showNotification(
        `${categoryName} Score: ${score}`,
        categoryDetails.join(' • ')
    );
}

// Initialize all interactions
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dynamic Sustainability Scoring System initialized');

    // Periodic updates
    setInterval(simulateScoreUpdate, 60000); // Update scores every minute
    setInterval(updateTimestamps, 30000); // Update timestamps every 30 seconds
    setInterval(addNewUpdate, 25000); // Add new update every 25 seconds

    // Make batch cards interactive
    document.querySelectorAll('.batch-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const batchId = this.querySelector('.batch-id-small').textContent;
            const score = this.querySelector('.batch-score-small').textContent;
            const status = this.querySelector('.batch-status').textContent;
            showBatchDetails(batchId, score, status);
        });

        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Make input category cards interactive
    document.querySelectorAll('.input-category').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('.category-title').textContent.replace(/[^\w\s]/g, '').trim();
            const score = this.querySelector('.category-score').textContent;
            showCategoryBreakdown(categoryName, score);
        });
    });

    // Make score displays interactive
    document.querySelectorAll('.score-display').forEach(display => {
        const grade = display.querySelector('.grade-circle');
        if (grade) {
            grade.style.cursor = 'pointer';
            grade.addEventListener('click', function() {
                const batchInfo = display.querySelector('.batch-id').textContent;
                showNotification('Grade Details', `${batchInfo} - Click batch cards below for full details`);
            });
        }
    });

    // Make update items clickable
    document.querySelectorAll('.update-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const text = this.querySelector('.update-text').textContent;
            const details = this.querySelector('.update-details').textContent;
            showNotification(text, details);
        });
    });
});

// Add custom animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(20px);
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

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);
