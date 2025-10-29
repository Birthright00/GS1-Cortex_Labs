// Demo Hub JavaScript

// Feature data
const features = {
    sustainability: {
        title: 'Dynamic Sustainability Scoring',
        description: 'Real-time A-E grades and 0-100 scores that update with each supply chain event',
        features: [
            'Batch-level GS1 Digital Link tracking',
            'Live score recalculation',
            'Multi-factor weighted scoring',
            'Historical comparison'
        ]
    },
    passport: {
        title: 'Live Product Passport',
        description: 'Click any product in the marketplace to see this feature!',
        features: [
            'GS1 Digital Link integration',
            'Complete supply chain journey',
            'Real-time data updates',
            'Certification verification'
        ]
    },
    predictive: {
        title: 'Predictive Analytics',
        description: 'AI-powered CO₂ and cost prediction for different delivery methods and routes',
        features: [
            'Route optimization AI',
            'Emission predictions',
            'Cost estimation',
            'Real-time condition factors'
        ]
    },
    fraud: {
        title: 'AI Fraud Detection',
        description: 'Advanced ML algorithms detect certification fraud and supply chain anomalies',
        features: [
            '99.7% detection accuracy',
            'Real-time certificate verification',
            'Pattern recognition',
            'Automated blocking'
        ]
    },
    api: {
        title: 'API & Integration',
        description: 'Comprehensive APIs and SDKs to integrate sustainability tracking into your systems',
        features: [
            'RESTful API endpoints',
            'Real-time webhooks',
            'GS1 Digital Link integration',
            'SDK libraries'
        ]
    }
};

// Show feature details
function showFeatureDetails(featureKey) {
    const feature = features[featureKey];
    if (!feature) {
        alert('Feature details coming soon!');
        return;
    }

    const message = `${feature.title}\n\n${feature.description}\n\nFeatures:\n${feature.features.map(f => `• ${f}`).join('\n')}`;
    alert(message);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        window.location.href = '/';
    }
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Track demo card clicks
document.querySelectorAll('.demo-card').forEach(card => {
    card.addEventListener('click', function() {
        console.log('Demo card clicked:', this.querySelector('.demo-title')?.textContent);
    });
});

// Initialize
console.log('GS1 Demo Hub loaded successfully');
