// Predictive Sustainability Analytics - JavaScript

function updatePredictions() {
    const btn = document.querySelector('.predict-btn');
    const originalText = btn.textContent;

    // Show loading state
    btn.textContent = '🔮 Calculating Predictions...';
    btn.disabled = true;

    // Simulate AI calculation
    setTimeout(() => {
        btn.textContent = '✓ Predictions Updated!';

        // Show success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        successMsg.innerHTML = '<strong>✓ Predictions Updated!</strong><br>AI analysis complete';
        document.body.appendChild(successMsg);

        // Remove after 3 seconds
        setTimeout(() => {
            successMsg.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => successMsg.remove(), 300);
        }, 3000);

        // Reset button
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);

        // Update metrics with animation
        updateMetricsWithAnimation();
    }, 1500);
}

function updateMetricsWithAnimation() {
    const metricValues = document.querySelectorAll('.metric-value');
    metricValues.forEach(metric => {
        metric.style.transform = 'scale(1.2)';
        metric.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            metric.style.transform = 'scale(1)';
        }, 300);
    });
}

// Add hover effects to delivery options
document.querySelectorAll('.delivery-option').forEach(option => {
    option.addEventListener('click', function() {
        // Remove previous selection
        document.querySelectorAll('.delivery-option').forEach(opt => {
            opt.classList.remove('selected');
        });

        // Add selection to clicked option
        this.classList.add('selected');

        // Show selection feedback
        const method = this.querySelector('.delivery-method').textContent;
        console.log('Selected delivery method:', method);

        // Visual feedback
        this.style.transform = 'translateY(-3px) scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'translateY(-3px)';
        }, 200);
    });
});

// Form input validation and real-time updates
const formInputs = document.querySelectorAll('.form-select, .form-input');
formInputs.forEach(input => {
    input.addEventListener('change', function() {
        console.log('Input changed:', this.name || this.id, '=', this.value);
        // Could trigger automatic prediction update here
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .delivery-option.selected {
        border-color: #3b82f6 !important;
        background: rgba(59, 130, 246, 0.1) !important;
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Predictive Sustainability Analytics loaded');

    // Add tooltips to metrics
    const metrics = document.querySelectorAll('.metric-card');
    metrics.forEach(metric => {
        metric.title = 'Click to see detailed breakdown';
        metric.style.cursor = 'pointer';

        metric.addEventListener('click', function() {
            const label = this.querySelector('.metric-label').textContent;
            const value = this.querySelector('.metric-value').textContent;
            alert(`${label}\nValue: ${value}\n\nThis metric is calculated based on historical data and real-time conditions.`);
        });
    });
});

// Export functions for global access
window.updatePredictions = updatePredictions;
