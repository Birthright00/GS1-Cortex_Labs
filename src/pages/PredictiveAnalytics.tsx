import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PredictiveAnalytics.css'

interface DeliveryOption {
  id: string
  name: string
  icon: string
  time: string
  co2: string
  cost: string
  efficiency: string
  days: string
  grade: string
  gradeClass: string
  impact: string
  recommended?: boolean
}

const PredictiveAnalytics = () => {
  const [isCalculating, setIsCalculating] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const deliveryOptions: DeliveryOption[] = [
    {
      id: '1',
      name: 'Electric Truck + Sea Freight',
      icon: '🚛',
      time: '5-7 days',
      co2: '1.8kg',
      cost: '$12.40',
      efficiency: '94%',
      days: '6.2',
      grade: 'A',
      gradeClass: 'score-a',
      impact: '23% lower CO₂ than standard truck delivery',
      recommended: true
    },
    {
      id: '2',
      name: 'Standard Truck Direct',
      icon: '🚚',
      time: '3-4 days',
      co2: '2.7kg',
      cost: '$18.90',
      efficiency: '78%',
      days: '3.5',
      grade: 'B',
      gradeClass: 'score-b',
      impact: 'Faster delivery but 50% higher emissions'
    },
    {
      id: '3',
      name: 'Air Freight Express',
      icon: '✈️',
      time: '1-2 days',
      co2: '8.4kg',
      cost: '$45.60',
      efficiency: '92%',
      days: '1.3',
      grade: 'D',
      gradeClass: 'score-d',
      impact: 'Fastest delivery but 367% higher CO₂ emissions'
    },
    {
      id: '4',
      name: 'Rail + Electric Last Mile',
      icon: '🚆',
      time: '7-9 days',
      co2: '1.2kg',
      cost: '$9.80',
      efficiency: '89%',
      days: '8.1',
      grade: 'A+',
      gradeClass: 'score-a',
      impact: 'Lowest emissions option - 55% below standard'
    }
  ]

  const handlePredictionUpdate = () => {
    setIsCalculating(true)

    setTimeout(() => {
      setIsCalculating(false)
      setShowNotification(true)

      setTimeout(() => {
        setShowNotification(false)
      }, 3000)
    }, 1500)
  }

  const handleOptionClick = (optionId: string) => {
    setSelectedOption(optionId)
  }

  return (
    <div className="predictive-analytics-page">
      <div className="container">
        <Link to="/" className="back-link">← Back to Marketplace</Link>

        <div className="header">
          <h1>🔮 Predictive Sustainability Analytics</h1>
          <p>AI-powered CO₂ and cost estimation based on delivery methods, routes, and real-time conditions</p>
        </div>

        <div className="prediction-dashboard">
          <div className="order-input">
            <div className="input-title">📦 Order Details</div>

            <div className="form-group">
              <label className="form-label">Product & Quantity</label>
              <select className="form-select">
                <option>Organic Cotton T-Shirts - 500 units</option>
                <option>Biodegradable Packaging - 2,000 units</option>
                <option>Solar Power Banks - 100 units</option>
                <option>LED Light Bulbs - 1,000 units</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">From (Supplier Location)</label>
              <div className="location-display">
                📍 Jakarta, Indonesia
                <div className="distance-badge">1,247 km</div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">To (Delivery Destination)</label>
              <input type="text" className="form-input" defaultValue="Singapore" readOnly />
            </div>

            <div className="form-group">
              <label className="form-label">Required Delivery Date</label>
              <input type="date" className="form-input" defaultValue="2024-05-15" />
            </div>

            <div className="form-group">
              <label className="form-label">Priority Level</label>
              <select className="form-select">
                <option>Standard</option>
                <option>Urgent</option>
                <option>Economy</option>
                <option>Express</option>
              </select>
            </div>

            <button
              className="predict-btn"
              onClick={handlePredictionUpdate}
              disabled={isCalculating}
            >
              {isCalculating ? '🔮 Calculating Predictions...' : '🔮 Generate AI Predictions'}
            </button>
          </div>

          <div className="predictions-panel">
            <div className="panel-title">🚀 Delivery Method Predictions</div>

            <div className="delivery-options">
              {deliveryOptions.map((option) => (
                <div
                  key={option.id}
                  className={`delivery-option ${selectedOption === option.id ? 'selected' : ''} ${option.recommended ? 'recommended' : ''}`}
                  onClick={() => handleOptionClick(option.id)}
                >
                  {option.recommended && (
                    <div className="recommended-badge">AI RECOMMENDED</div>
                  )}
                  <div className="delivery-header">
                    <div className="delivery-method">
                      <span className="method-icon">{option.icon}</span>
                      {option.name}
                    </div>
                    <div className="delivery-time">{option.time}</div>
                  </div>

                  <div className="metrics-grid">
                    <div className="metric-card">
                      <div className="metric-value co2">{option.co2}</div>
                      <div className="metric-label">CO₂ per unit</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-value cost">{option.cost}</div>
                      <div className="metric-label">Shipping cost</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-value efficiency">{option.efficiency}</div>
                      <div className="metric-label">Route efficiency</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-value time">{option.days}</div>
                      <div className="metric-label">Days avg</div>
                    </div>
                  </div>

                  <div className="sustainability-impact">
                    <div className={`impact-score ${option.gradeClass}`}>Grade {option.grade}</div>
                    <span>{option.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="route-optimization">
          <div className="optimization-title">🗺️ AI Route Optimization Analysis</div>

          <div className="route-comparison">
            <div className="route-option standard">
              <div className="route-title">📍 Standard Route</div>
              <div style={{ marginBottom: '15px' }}>
                <div style={{ margin: '8px 0' }}>🛣️ Distance: 1,347 km</div>
                <div style={{ margin: '8px 0' }}>⏱️ Transit Time: 18.5 hours</div>
                <div style={{ margin: '8px 0' }}>⛽ Fuel Consumption: 89.2L</div>
                <div style={{ margin: '8px 0' }}>🌍 CO₂ Emissions: 2.7kg/unit</div>
                <div style={{ margin: '8px 0' }}>💰 Total Cost: $18.90/unit</div>
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                Jakarta → Surabaya → Banyuwangi → Ferry → Denpasar → Surabaya → Singapore
              </div>
            </div>

            <div className="route-option optimized">
              <div className="route-title">🎯 AI-Optimized Route</div>
              <div style={{ marginBottom: '15px' }}>
                <div style={{ margin: '8px 0' }}>🛣️ Distance: 1,247 km (-7.4%)</div>
                <div style={{ margin: '8px 0' }}>⏱️ Transit Time: 16.2 hours (-12.4%)</div>
                <div style={{ margin: '8px 0' }}>⛽ Fuel Consumption: 73.8L (-17.3%)</div>
                <div style={{ margin: '8px 0' }}>🌍 CO₂ Emissions: 1.8kg/unit (-33.3%)</div>
                <div style={{ margin: '8px 0' }}>💰 Total Cost: $12.40/unit (-34.4%)</div>
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                Jakarta → Direct Sea Freight → Singapore (Electric last-mile delivery)
              </div>
            </div>
          </div>

          <div className="route-savings">
            <div className="savings-value">$3,250</div>
            <div>Total savings for 500-unit order with optimized routing</div>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="notification">
          <strong>✓ Predictions Updated!</strong>
          <br />
          AI analysis complete
        </div>
      )}
    </div>
  )
}

export default PredictiveAnalytics
