import { Supplier } from '../types'
import { useNavigate } from 'react-router-dom'

interface SupplierCardProps {
  supplier: Supplier
  onProductClick: (productId: string) => void
  selectedForComparison: Set<string>
  onToggleComparison: (productId: string) => void
}

function SupplierCard({ supplier, onProductClick, selectedForComparison, onToggleComparison }: SupplierCardProps) {
  const navigate = useNavigate()

  const handleViewScore = (product: typeof supplier.products[0]) => {
    navigate('/dynamic-scoring', {
      state: {
        productName: product.name,
        gtin: `890103${Math.floor(Math.random() * 900000 + 100000)}`, // Generate GTIN
        batchId: `LOT2024${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 900 + 100)}`,
        supplierName: supplier.name,
        sustainabilityScore: product.sustainabilityScore
      }
    })
  }

  return (
    <div className="supplier-card">
      <div className="supplier-header">
        <div className="supplier-info">
          <div className="supplier-logo">{supplier.logo}</div>
          <div className="supplier-details">
            <h3>{supplier.name}</h3>
            <div className="supplier-location">
              📍 {supplier.location} • {supplier.distance} km away
            </div>
            <div className="supplier-rating">
              ⭐⭐⭐⭐⭐ {supplier.rating} ({supplier.reviews.toLocaleString()} reviews)
            </div>
          </div>
        </div>
        {supplier.verified && (
          <div className="gs1-verified">✓ GS1 Verified</div>
        )}
      </div>

      <div className="key-metrics">
        <div className="metric-card">
          <div className="metric-value cost">${supplier.avgCost.toFixed(2)}</div>
          <div className="metric-label">💰 Avg. Cost/Unit</div>
        </div>
        <div className="metric-card">
          <div className="metric-value sustainability">{supplier.sustainabilityScore.toFixed(1)}</div>
          <div className="metric-label">🌱 Sustainability</div>
        </div>
        <div className="metric-card">
          <div className="metric-value reputation">{supplier.rating.toFixed(1)}</div>
          <div className="metric-label">⭐ Reputation</div>
        </div>
        <div className="metric-card">
          <div className="metric-value" style={{ color: '#3b82f6' }}>
            {supplier.co2PerUnit}kg
          </div>
          <div className="metric-label">🌍 CO₂/Unit</div>
        </div>
      </div>

      <div className="product-examples">
        <div className="products-header">
          <h4>🏷️ Featured Products ({supplier.products.length} total)</h4>
          <a href="#" className="view-all-products">View All →</a>
        </div>
        <div className="products-grid">
          {supplier.products.map(product => (
            <div key={product.id} className="product-item">
              <div className="product-comparison-checkbox">
                <input
                  type="checkbox"
                  id={`compare-${product.id}`}
                  checked={selectedForComparison.has(product.id)}
                  onChange={() => onToggleComparison(product.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <label htmlFor={`compare-${product.id}`}>Compare</label>
              </div>
              <div onClick={() => onProductClick(product.id)} style={{ cursor: 'pointer' }}>
                <div className="product-image">{product.icon}</div>
                <div className="product-name">{product.name}</div>
                <div className="product-score">
                  🌱 {product.sustainabilityScore}/10
                </div>
              </div>
              <button
                className="btn-view-score"
                onClick={(e) => {
                  e.stopPropagation()
                  handleViewScore(product)
                }}
              >
                📊 View Score
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="supplier-actions">
        <button className="btn-primary">📧 Contact Supplier</button>
        <button className="btn-secondary">📋 Request Quote</button>
        <button
          className="btn-scan"
          onClick={() => onProductClick(supplier.products[0].id)}
        >
          🔍 Scan Product
        </button>
      </div>
    </div>
  )
}

export default SupplierCard
