import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  calculatePredictiveAnalytics,
  isOpenAIConfigured,
  type DeliveryOption,
  type RouteComparison
} from '../services/openaiService'
import './PredictiveAnalytics.css'

const PredictiveAnalytics = () => {
  const [isCalculating, setIsCalculating] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [product, setProduct] = useState('Organic Cotton T-Shirts - 500 units')
  const [fromLocation] = useState('Jakarta, Indonesia')
  const [toLocation, setToLocation] = useState('Singapore')
  const [deliveryDate, setDeliveryDate] = useState('2024-05-15')
  const [priority, setPriority] = useState('Standard')
  const [distance] = useState(1247)

  // Results state
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([])
  const [routeComparison, setRouteComparison] = useState<RouteComparison | null>(null)

  const handlePredictionUpdate = async () => {
    // Check if API key is configured
    if (!isOpenAIConfigured()) {
      setError('OpenAI API key is not configured. Please add your API key to the .env file.')
      return
    }

    setIsCalculating(true)
    setError(null)

    try {
      // Extract product name and quantity
      const [productName, quantityStr] = product.split(' - ')
      const quantity = parseInt(quantityStr) || 500

      // Call OpenAI API
      const result = await calculatePredictiveAnalytics({
        product: productName,
        quantity,
        fromLocation,
        toLocation,
        distance,
        deliveryDate,
        priority
      })

      // Update state with results
      setDeliveryOptions(result.deliveryOptions)
      setRouteComparison(result.routeComparison)

      setNotificationMessage('✓ AI Predictions Generated Successfully!')
      setShowNotification(true)

      setTimeout(() => {
        setShowNotification(false)
      }, 3000)
    } catch (err) {
      console.error('Prediction error:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate predictions')
      setNotificationMessage('✗ Failed to generate predictions')
      setShowNotification(true)

      setTimeout(() => {
        setShowNotification(false)
      }, 5000)
    } finally {
      setIsCalculating(false)
    }
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

        {error && (
          <div className="error-banner">
            <strong>⚠️ Error:</strong> {error}
          </div>
        )}

        <div className="prediction-dashboard">
          <div className="order-input">
            <div className="input-title">📦 Order Details</div>

            <div className="form-group">
              <label className="form-label">Product & Quantity</label>
              <select
                className="form-select"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                <option>Organic Cotton T-Shirts - 500 units</option>
                <option>Biodegradable Packaging - 2,000 units</option>
                <option>Solar Power Banks - 100 units</option>
                <option>LED Light Bulbs - 1,000 units</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">From (Supplier Location)</label>
              <div className="location-display">
                📍 {fromLocation}
                <div className="distance-badge">{distance} km</div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">To (Delivery Destination)</label>
              <input
                type="text"
                className="form-input"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Required Delivery Date</label>
              <input
                type="date"
                className="form-input"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Priority Level</label>
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
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
              {isCalculating ? '🔮 Calculating AI Predictions...' : '🔮 Generate AI Predictions'}
            </button>
          </div>

          <div className="predictions-panel">
            <div className="panel-title">🚀 Delivery Method Predictions</div>

            {deliveryOptions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📊</div>
                <p>Click "Generate AI Predictions" to analyze delivery options</p>
                <p className="empty-hint">AI will calculate CO₂ emissions, costs, and route efficiency</p>
              </div>
            ) : (
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
            )}
          </div>
        </div>

        {routeComparison && (
          <div className="route-optimization">
            <div className="optimization-title">🗺️ AI Route Optimization Analysis</div>

            <div className="route-comparison">
              <div className="route-option standard">
                <div className="route-title">📍 Standard Route</div>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ margin: '8px 0' }}>🛣️ Distance: {routeComparison.standard.distance}</div>
                  <div style={{ margin: '8px 0' }}>⏱️ Transit Time: {routeComparison.standard.transitTime}</div>
                  <div style={{ margin: '8px 0' }}>⛽ Fuel Consumption: {routeComparison.standard.fuelConsumption}</div>
                  <div style={{ margin: '8px 0' }}>🌍 CO₂ Emissions: {routeComparison.standard.co2Emissions}</div>
                  <div style={{ margin: '8px 0' }}>💰 Total Cost: {routeComparison.standard.totalCost}</div>
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  {routeComparison.standard.route}
                </div>
              </div>

              <div className="route-option optimized">
                <div className="route-title">🎯 AI-Optimized Route</div>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ margin: '8px 0' }}>🛣️ Distance: {routeComparison.optimized.distance}</div>
                  <div style={{ margin: '8px 0' }}>⏱️ Transit Time: {routeComparison.optimized.transitTime}</div>
                  <div style={{ margin: '8px 0' }}>⛽ Fuel Consumption: {routeComparison.optimized.fuelConsumption}</div>
                  <div style={{ margin: '8px 0' }}>🌍 CO₂ Emissions: {routeComparison.optimized.co2Emissions}</div>
                  <div style={{ margin: '8px 0' }}>💰 Total Cost: {routeComparison.optimized.totalCost}</div>
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                  {routeComparison.optimized.route}
                </div>
              </div>
            </div>

            <div className="route-savings">
              <div className="savings-value">{routeComparison.savings}</div>
              <div>Total savings with AI-optimized routing</div>
            </div>
          </div>
        )}
      </div>

      {showNotification && (
        <div className={`notification ${error ? 'error' : ''}`}>
          <strong>{notificationMessage}</strong>
          {!error && (
            <>
              <br />
              AI analysis complete
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default PredictiveAnalytics
