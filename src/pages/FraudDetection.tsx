import { useState } from 'react'
import { Link } from 'react-router-dom'
import './FraudDetection.css'

interface Alert {
  id: string
  type: 'fraud' | 'anomaly'
  severity: 'high' | 'medium' | 'low'
  icon: string
  title: string
  details: string
  batchId: string
  timestamp: string
}

const FraudDetection = () => {
  const [isScanning, setIsScanning] = useState(false)
  const [supplierName, setSupplierName] = useState('')
  const [batchId, setBatchId] = useState('')
  const [certificationId, setCertificationId] = useState('')

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'fraud',
      severity: 'high',
      icon: '🚨',
      title: 'Fake Organic Certificate Detected',
      details: 'Certificate ID "ORG-2024-FAKE789" flagged as fraudulent',
      batchId: 'LOT2024X999',
      timestamp: '2 min ago'
    },
    {
      id: '2',
      type: 'fraud',
      severity: 'medium',
      icon: '⚠️',
      title: 'Certificate Expiry Anomaly',
      details: 'Fair Trade cert shows impossible future renewal date',
      batchId: 'LOT2024F445',
      timestamp: '15 min ago'
    }
  ])

  const [stats, setStats] = useState({
    detectionRate: 99.7,
    alertsToday: 23,
    highPriority: 7,
    batchesMonitored: 847,
    anomaliesFound: 34,
    requireAction: 12
  })

  const handleScanForFraud = async () => {
    setIsScanning(true)

    // TODO: Integrate with OpenAI for fraud detection
    setTimeout(() => {
      // Simulate new alerts being added
      const newAlert: Alert = {
        id: Date.now().toString(),
        type: Math.random() > 0.5 ? 'fraud' : 'anomaly',
        severity: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
        icon: '🔍',
        title: 'AI Scan Completed',
        details: `Scanned ${supplierName || 'all suppliers'}, ${batchId || 'all batches'}`,
        batchId: batchId || 'LOT2024NEW',
        timestamp: 'Just now'
      }

      setAlerts(prev => [newAlert, ...prev])
      setStats(prev => ({
        ...prev,
        alertsToday: prev.alertsToday + 1
      }))

      setIsScanning(false)
    }, 3000)
  }

  return (
    <div className="fraud-detection-page">
      <div className="container">
        <Link to="/" className="back-link">← Back to Marketplace</Link>

        <div className="header">
          <h1>🛡 AI Fraud Detection & Anomaly Detection</h1>
          <p>Advanced machine learning algorithms detect certification fraud and supply chain anomalies in real-time</p>
        </div>

        {/* Input Section */}
        <div className="scan-section">
          <h3>🔍 Scan for Fraud & Anomalies</h3>
          <div className="scan-grid">
            <div className="form-group">
              <label>Supplier Name (Optional)</label>
              <input
                type="text"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                placeholder="e.g., EcoTextile Co."
              />
            </div>
            <div className="form-group">
              <label>Batch ID (Optional)</label>
              <input
                type="text"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                placeholder="e.g., LOT2024A127"
              />
            </div>
            <div className="form-group">
              <label>Certification ID (Optional)</label>
              <input
                type="text"
                value={certificationId}
                onChange={(e) => setCertificationId(e.target.value)}
                placeholder="e.g., FSC-C123456"
              />
            </div>
          </div>
          <button
            className="scan-btn"
            onClick={handleScanForFraud}
            disabled={isScanning}
          >
            {isScanning ? '🔮 AI Scanning...' : '🛡️ Run AI Fraud Detection Scan'}
          </button>
          <p className="scan-note">Leave fields empty to scan all recent batches in the system</p>
        </div>

        {/* AI Dashboard */}
        <div className="ai-dashboard">
          {/* Fraud Detection Panel */}
          <div className="detection-panel">
            <div className="panel-title">
              🛡️ Certification Fraud Detection
              <div className="status-indicator status-active"></div>
            </div>

            <div className="detection-stats">
              <div className="stat-card">
                <div className="stat-value success">{stats.detectionRate}%</div>
                <div className="stat-label">Detection Rate</div>
              </div>
              <div className="stat-card">
                <div className="stat-value warning">{stats.alertsToday}</div>
                <div className="stat-label">Alerts Today</div>
              </div>
              <div className="stat-card">
                <div className="stat-value danger">{stats.highPriority}</div>
                <div className="stat-label">High Priority</div>
              </div>
            </div>

            <div className="alerts-feed">
              {alerts.filter(a => a.type === 'fraud').map((alert) => (
                <div key={alert.id} className={`alert-item ${alert.severity}`}>
                  <div className="alert-icon">{alert.icon}</div>
                  <div className="alert-content">
                    <div className="alert-title">{alert.title}</div>
                    <div className="alert-details">{alert.details}</div>
                    <div className="alert-meta">
                      <span>Batch: {alert.batchId}</span>
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Anomaly Detection Panel */}
          <div className="detection-panel">
            <div className="panel-title">
              🔬 Supply Chain Anomaly Detection
              <div className="status-indicator status-warning"></div>
            </div>

            <div className="detection-stats">
              <div className="stat-card">
                <div className="stat-value success">{stats.batchesMonitored}</div>
                <div className="stat-label">Batches Monitored</div>
              </div>
              <div className="stat-card">
                <div className="stat-value warning">{stats.anomaliesFound}</div>
                <div className="stat-label">Anomalies Found</div>
              </div>
              <div className="stat-card">
                <div className="stat-value danger">{stats.requireAction}</div>
                <div className="stat-label">Require Action</div>
              </div>
            </div>

            <div className="alerts-feed">
              {alerts.filter(a => a.type === 'anomaly').length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">✅</div>
                  <p>No supply chain anomalies detected</p>
                  <p className="empty-hint">Run a scan to check for anomalies</p>
                </div>
              ) : (
                alerts.filter(a => a.type === 'anomaly').map((alert) => (
                  <div key={alert.id} className={`alert-item ${alert.severity}`}>
                    <div className="alert-icon">{alert.icon}</div>
                    <div className="alert-content">
                      <div className="alert-title">{alert.title}</div>
                      <div className="alert-details">{alert.details}</div>
                      <div className="alert-meta">
                        <span>Batch: {alert.batchId}</span>
                        <span>{alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Detection Methods */}
        <div className="detection-methods">
          <h3>🤖 AI Detection Methods</h3>
          <div className="methods-grid">
            <div className="method-card">
              <div className="method-icon">📜</div>
              <h4>Certificate Validation</h4>
              <p>Verifies authenticity of organic, fair trade, and sustainability certifications against issuing authority databases</p>
            </div>
            <div className="method-card">
              <div className="method-icon">🔗</div>
              <h4>Blockchain Cross-Check</h4>
              <p>Compares supply chain data against immutable blockchain records to detect tampering or falsification</p>
            </div>
            <div className="method-card">
              <div className="method-icon">📊</div>
              <h4>Statistical Analysis</h4>
              <p>Identifies outliers and impossible values using machine learning models trained on industry benchmarks</p>
            </div>
            <div className="method-card">
              <div className="method-icon">🕐</div>
              <h4>Timeline Validation</h4>
              <p>Detects physically impossible logistics timelines and location sequences in supply chain data</p>
            </div>
            <div className="method-card">
              <div className="method-icon">🔄</div>
              <h4>Duplicate Detection</h4>
              <p>Flags same certification IDs, serial numbers, or batch IDs used by multiple suppliers</p>
            </div>
            <div className="method-card">
              <div className="method-icon">⚖️</div>
              <h4>Material Balance</h4>
              <p>Ensures input materials mathematically align with output quantities to prevent fake claims</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FraudDetection
