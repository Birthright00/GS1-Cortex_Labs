import { Supplier } from '../types'

interface SupplierCardProps {
  supplier: Supplier
  onProductClick: (productId: string) => void
}

function SupplierCard({ supplier, onProductClick }: SupplierCardProps) {
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
            <div
              key={product.id}
              className="product-item"
              onClick={() => onProductClick(product.id)}
            >
              <div className="product-image">{product.icon}</div>
              <div className="product-name">{product.name}</div>
              <div className="product-score">
                🌱 {product.sustainabilityScore}/10
              </div>
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
