import { useEffect } from 'react'
import { mockProductPassportData } from '../utils/mockData'

interface ProductPassportModalProps {
  productId: string
  onClose: () => void
}

function ProductPassportModal({ productId, onClose }: ProductPassportModalProps) {
  const passportData = mockProductPassportData[productId]

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  if (!passportData) {
    return null
  }

  return (
    <div className="modal" style={{ display: 'flex' }} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            🌱 Digital Product Passport
          </div>
          <button className="close-modal" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="passport-info">
            <h2>{passportData.productName}</h2>
            <div className="qr-display">📱</div>
            <p style={{ color: '#6b7280', marginTop: '10px' }}>
              Scan with GS1 Digital Link app for live data
            </p>
          </div>

          <div className="passport-details">
            <div className="detail-section">
              <div className="detail-title">
                📦 Product Information
              </div>
              <ul className="detail-list">
                <li>
                  <span>GTIN</span>
                  <span className="status-badge status-verified">{passportData.gtin}</span>
                </li>
                <li>
                  <span>Batch Number</span>
                  <span>{passportData.batchNumber}</span>
                </li>
                <li>
                  <span>Manufacturing Date</span>
                  <span>{passportData.manufacturingDate}</span>
                </li>
                <li>
                  <span>Expiry Date</span>
                  <span>{passportData.expiryDate}</span>
                </li>
                <li>
                  <span>Origin</span>
                  <span>{passportData.origin}</span>
                </li>
              </ul>
            </div>

            <div className="detail-section">
              <div className="detail-title">
                🌱 Sustainability Metrics
              </div>
              <ul className="detail-list">
                <li>
                  <span>Carbon Footprint</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>{passportData.carbonFootprint}</span>
                </li>
                <li>
                  <span>Water Usage</span>
                  <span style={{ color: '#3b82f6', fontWeight: 600 }}>{passportData.waterUsage}</span>
                </li>
                <li>
                  <span>Recycled Content</span>
                  <span>{passportData.recycledContent}</span>
                </li>
              </ul>
            </div>

            <div className="detail-section">
              <div className="detail-title">
                ✅ Certifications
              </div>
              <ul className="detail-list">
                {passportData.certifications.map((cert, index) => (
                  <li key={index}>
                    <span>{cert}</span>
                    <span className="status-badge status-verified">Verified</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="detail-section" style={{ gridColumn: '1 / -1' }}>
              <div className="detail-title">
                🔗 Supply Chain Traceability
              </div>
              <ul className="detail-list">
                {passportData.supplyChainSteps.map((step, index) => (
                  <li key={index}>
                    <div>
                      <strong>{step.step}</strong>
                      <br />
                      <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                        {step.location} • {step.date}
                      </span>
                    </div>
                    {step.verified && (
                      <span className="status-badge status-verified">✓ Verified</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <button className="btn-primary" style={{ maxWidth: '300px' }}>
              📥 Download Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPassportModal
