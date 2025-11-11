import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  calculateDynamicScoring,
  isOpenAIConfigured,
  type ScoringCategory
} from '../services/openaiService'
import { mockSuppliers } from '../utils/mockData'
import './DynamicScoring.css'

interface SimilarProduct {
  productName: string
  supplierName: string
  sustainabilityScore: number
  gtin: string
  batchId: string
}

interface BatchData {
  productName: string
  gtin: string
  batchId: string
  grade: string
  gradeClass: string
  score: number
  lastUpdated: string
  trend: 'up' | 'down' | 'stable'
  trendText: string
  categories: ScoringCategory[]
}

const DynamicScoring = () => {
  const location = useLocation()
  const passedData = location.state as {
    productName?: string
    gtin?: string
    batchId?: string
    supplierName?: string
    sustainabilityScore?: number
    compareMode?: boolean
    products?: Array<{
      productName: string
      gtin: string
      batchId: string
      supplierName: string
      sustainabilityScore: number
      productId: string
    }>
  } | null

  const [isCalculating, setIsCalculating] = useState(false)
  const [productName, setProductName] = useState(passedData?.productName || 'Organic Cotton T-Shirts')
  const [gtin, setGtin] = useState(passedData?.gtin || '8901030123456')
  const [batchId, setBatchId] = useState(passedData?.batchId || 'LOT2024A127')

  // Auto-calculate if data was passed from supplier page
  useEffect(() => {
    if (passedData?.compareMode && passedData?.products) {
      // Handle multi-product comparison from supplier page
      handleCompareMultipleProducts(passedData.products)
    } else if (passedData) {
      handleCalculateScore()
    }
  }, [])

  // Handle multiple products comparison from supplier page
  const handleCompareMultipleProducts = async (products: Array<{
    productName: string
    gtin: string
    batchId: string
    supplierName: string
    sustainabilityScore: number
    productId: string
  }>) => {
    setIsCalculating(true)

    try {
      const batchResults: BatchData[] = []

      for (const product of products) {
        const result = await calculateDynamicScoring({
          productName: product.productName,
          gtin: product.gtin,
          batchId: product.batchId,
          supplierName: product.supplierName,
          baseSustainabilityScore: product.sustainabilityScore
        })

        batchResults.push({
          productName: product.productName,
          gtin: product.gtin,
          batchId: product.batchId,
          grade: result.grade,
          gradeClass: result.gradeClass,
          score: result.score,
          lastUpdated: 'Just now',
          trend: result.trend,
          trendText: result.trendText,
          categories: result.categories
        })
      }

      setComparedBatches(batchResults)
      setShowComparison(true)

      // Set the first product as the main display
      if (batchResults.length > 0) {
        setBatchData(batchResults[0])
        setProductName(batchResults[0].productName)
        setGtin(batchResults[0].gtin)
        setBatchId(batchResults[0].batchId)
      }
    } catch (error) {
      console.error('Error comparing products:', error)
      alert('Failed to compare products. Please try again.')
    } finally {
      setIsCalculating(false)
    }
  }

  const [comparedBatches, setComparedBatches] = useState<BatchData[]>([])
  const [showComparison, setShowComparison] = useState(false)
  const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([])
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

  const [batchData, setBatchData] = useState<BatchData>({
    productName: 'Organic Cotton T-Shirts',
    gtin: '8901030123456',
    batchId: 'LOT2024A127',
    grade: 'A',
    gradeClass: 'grade-A',
    score: 87,
    lastUpdated: '2 minutes ago',
    trend: 'up',
    trendText: '+3 points from logistics optimization',
    categories: [
      {
        title: '🧪 Materials',
        score: 92,
        details: [
          { label: 'Organic Cotton', value: '100% Certified' },
          { label: 'Source Distance', value: '247km (Local)' },
          { label: 'Water Usage', value: '2.3L/kg (Excellent)' },
          { label: 'Pesticides', value: 'Zero Synthetic' }
        ]
      },
      {
        title: '🏭 Manufacturing',
        score: 85,
        details: [
          { label: 'Energy Source', value: '87% Renewable' },
          { label: 'CO₂ Emissions', value: '1.4kg/unit' },
          { label: 'Water Recycling', value: '94% Recovered' },
          { label: 'Worker Standards', value: 'SA8000 Certified' }
        ]
      },
      {
        title: '📦 Packaging',
        score: 89,
        details: [
          { label: 'Material', value: '100% Recycled Cardboard' },
          { label: 'Recyclability', value: '95%' },
          { label: 'Weight', value: '0.12kg/unit (Minimal)' },
          { label: 'FSC Certified', value: 'Yes (FSC-C123456)' }
        ]
      },
      {
        title: '🚚 Logistics',
        score: 81,
        details: [
          { label: 'Transport Mode', value: 'Electric Truck' },
          { label: 'Distance', value: '847km' },
          { label: 'Route Optimization', value: '23% Improvement' },
          { label: 'Carbon Offset', value: '150% Purchased' }
        ]
      },
      {
        title: '✅ Verification',
        score: 95,
        details: [
          { label: 'Data Completeness', value: '28/28 Points' },
          { label: 'Blockchain Verified', value: '100% Steps' },
          { label: 'Third-party Audits', value: 'Quarterly' },
          { label: 'Cert Status', value: 'All Current' }
        ]
      }
    ]
  })

  const handleCalculateScore = async () => {
    // Check if API key is configured
    if (!isOpenAIConfigured()) {
      alert('OpenAI API key is not configured. Please add your API key to the .env file.')
      return
    }

    setIsCalculating(true)

    try {
      // Call OpenAI to calculate dynamic scoring
      const result = await calculateDynamicScoring({
        productName,
        gtin,
        batchId,
        supplierName: passedData?.supplierName,
        baseSustainabilityScore: passedData?.sustainabilityScore
      })

      // Update batch data with AI results
      setBatchData({
        productName,
        gtin,
        batchId,
        grade: result.grade,
        gradeClass: result.gradeClass,
        score: result.score,
        lastUpdated: 'Just now',
        trend: result.trend,
        trendText: result.trendText,
        categories: result.categories
      })

      // Find similar products and generate AI suggestions
      const similar = findSimilarProducts(productName)
      setSimilarProducts(similar)

      const suggestions = generateAISuggestions(result.score, productName)
      setAiSuggestions(suggestions)
    } catch (error) {
      console.error('Error calculating score:', error)
      alert(error instanceof Error ? error.message : 'Failed to calculate sustainability score')
    } finally {
      setIsCalculating(false)
    }
  }

  const handleAddToComparison = () => {
    // Check if this batch is already in comparison
    const isDuplicate = comparedBatches.some(
      batch => batch.gtin === batchData.gtin && batch.batchId === batchData.batchId
    )

    if (isDuplicate) {
      alert('This batch is already added to comparison.')
      return
    }

    // Add current batch to comparison list
    setComparedBatches(prev => [...prev, batchData])
    setShowComparison(true)
  }

  const handleRemoveFromComparison = (index: number) => {
    setComparedBatches(prev => prev.filter((_, i) => i !== index))
    if (comparedBatches.length === 1) {
      setShowComparison(false)
    }
  }

  const handleClearComparison = () => {
    setComparedBatches([])
    setShowComparison(false)
  }

  const findSimilarProducts = (currentProductName: string) => {
    const similar: SimilarProduct[] = []
    const normalizedCurrent = currentProductName.toLowerCase()

    mockSuppliers.forEach(supplier => {
      supplier.products.forEach(product => {
        const normalizedProduct = product.name.toLowerCase()

        // Check if product names are similar (contain similar keywords)
        const isSimilar =
          normalizedProduct !== normalizedCurrent &&
          (normalizedProduct.includes('cotton') && normalizedCurrent.includes('cotton') ||
           normalizedProduct.includes('textile') && normalizedCurrent.includes('textile') ||
           normalizedProduct.includes('packaging') && normalizedCurrent.includes('packaging') ||
           normalizedProduct.includes('plastic') && normalizedCurrent.includes('plastic') ||
           normalizedProduct.includes('food') && normalizedCurrent.includes('food') ||
           normalizedProduct.includes('battery') && normalizedCurrent.includes('battery') ||
           normalizedProduct.includes('component') && normalizedCurrent.includes('component'))

        if (isSimilar) {
          similar.push({
            productName: product.name,
            supplierName: supplier.name,
            sustainabilityScore: product.sustainabilityScore,
            gtin: `890103${Math.floor(Math.random() * 900000 + 100000)}`,
            batchId: `LOT2024${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 900 + 100)}`
          })
        }
      })
    })

    return similar.slice(0, 3) // Return top 3 similar products
  }

  const generateAISuggestions = (score: number, productName: string) => {
    const suggestions: string[] = []

    if (score >= 90) {
      suggestions.push(`Excellent score! Compare with other top-rated ${productName} to maintain leadership.`)
      suggestions.push('Share this high score with your customers to build trust.')
    } else if (score >= 75) {
      suggestions.push(`Good score. Compare with higher-rated alternatives to identify improvement areas.`)
      suggestions.push(`Review the lowest-scoring category to boost overall performance.`)
    } else {
      suggestions.push(`Compare with industry leaders to understand best practices.`)
      suggestions.push(`Focus on improving your lowest-scoring categories for maximum impact.`)
    }

    suggestions.push(`Benchmark against similar products from different suppliers.`)

    return suggestions
  }

  const handleAddSimilarProduct = async (similar: SimilarProduct) => {
    setIsCalculating(true)

    try {
      const result = await calculateDynamicScoring({
        productName: similar.productName,
        gtin: similar.gtin,
        batchId: similar.batchId,
        supplierName: similar.supplierName,
        baseSustainabilityScore: similar.sustainabilityScore
      })

      const newBatch: BatchData = {
        productName: similar.productName,
        gtin: similar.gtin,
        batchId: similar.batchId,
        grade: result.grade,
        gradeClass: result.gradeClass,
        score: result.score,
        lastUpdated: 'Just now',
        trend: result.trend,
        trendText: result.trendText,
        categories: result.categories
      }

      setComparedBatches(prev => [...prev, newBatch])
      setShowComparison(true)
    } catch (error) {
      console.error('Error adding similar product:', error)
      alert('Failed to add product for comparison')
    } finally {
      setIsCalculating(false)
    }
  }

  return (
    <div className="dynamic-scoring-page">
      <div className="container">
        <Link to="/" className="back-link">← Back to Marketplace</Link>

        <div className="header">
          <h1>📊 Dynamic Batch-Specific Sustainability Scoring</h1>
          <p>Real-time A-E grades and 0-100 scores using GS1 Digital Link extensions to track specific batches</p>
        </div>

        {/* Input Form */}
        <div className="input-section">
          <h3>Enter Product Details</h3>
          <div className="input-grid">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g., Organic Cotton T-Shirts"
              />
            </div>
            <div className="form-group">
              <label>GTIN</label>
              <input
                type="text"
                value={gtin}
                onChange={(e) => setGtin(e.target.value)}
                placeholder="e.g., 8901030123456"
              />
            </div>
            <div className="form-group">
              <label>Batch ID</label>
              <input
                type="text"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                placeholder="e.g., LOT2024A127"
              />
            </div>
          </div>
          <button
            className="calculate-btn"
            onClick={handleCalculateScore}
            disabled={isCalculating}
          >
            {isCalculating ? '🔮 Calculating Score...' : '🔮 Calculate AI Sustainability Score'}
          </button>

          {batchData.score > 0 && (
            <button
              className="add-comparison-btn"
              onClick={handleAddToComparison}
              disabled={isCalculating}
            >
              ➕ Add to Comparison
            </button>
          )}
        </div>

        {/* Score Display */}
        <div className="scoring-overview">
          <div className="score-display">
            <div className="batch-info">
              <div className="product-name">{batchData.productName}</div>
              <div className="gtin-info">GTIN: {batchData.gtin}</div>
              <div className="batch-id">+ Batch AI(10): {batchData.batchId}</div>
              <div className="gs1-note">GS1 Digital Link with Application Identifiers</div>
            </div>

            <div className={`grade-circle ${batchData.gradeClass}`}>{batchData.grade}</div>
            <div className="score-numerical">{batchData.score}/100</div>
            <div className="last-updated">Last updated: {batchData.lastUpdated}</div>
            <div className="live-indicator">
              <div className="pulse-dot"></div>
              LIVE BATCH SCORING
            </div>

            <div className="score-trend">
              <span className={`trend-arrow trend-${batchData.trend}`}>
                {batchData.trend === 'up' ? '↑' : batchData.trend === 'down' ? '↓' : '→'}
              </span>
              <span className="trend-text">{batchData.trendText}</span>
            </div>
          </div>
        </div>

        {/* GS1 Digital Link Structure */}
        <div className="gs1-structure">
          <h4>🔗 GS1 Digital Link Structure:</h4>
          <div className="digital-link-details">
            <div><strong>Base GTIN:</strong> {batchData.gtin} (identifies the product SKU)</div>
            <div><strong>+ AI(10):</strong> {batchData.batchId} (batch/lot number)</div>
            <div><strong>+ AI(17):</strong> 241215 (expiry date)</div>
            <div><strong>+ AI(21):</strong> 987654321 (serial number)</div>
            <div className="digital-link-url">
              <strong>Digital Link URL:</strong> https://id.gs1.org/01/{batchData.gtin}/10/{batchData.batchId}/17/241215/21/987654321
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="inputs-breakdown">
          <div className="breakdown-title">
            📋 Scoring Inputs (GTIN: {batchData.gtin} + Batch {batchData.batchId})
          </div>

          <div className="inputs-grid">
            {batchData.categories.map((category, index) => (
              <div key={index} className="input-category">
                <div className="category-header">
                  <div className="category-title">{category.title}</div>
                  <div className="category-score">{category.score}/100</div>
                </div>
                <div className="input-details">
                  {category.details.map((detail, idx) => (
                    <div key={idx} className="input-item">
                      <span className="input-label">{detail.label}:</span>
                      <span className="input-value">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestions (Option 4) */}
        {aiSuggestions.length > 0 && (
          <div className="ai-suggestions-section">
            <h3>🤖 AI-Powered Insights & Recommendations</h3>
            <div className="suggestions-grid">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="suggestion-card">
                  <div className="suggestion-icon">💡</div>
                  <p>{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Products (Option 2) */}
        {similarProducts.length > 0 && (
          <div className="similar-products-section">
            <h3>🔍 Similar Products - Quick Compare</h3>
            <p className="section-subtitle">Found similar products from other suppliers. Add them to comparison with one click!</p>
            <div className="similar-products-grid">
              {similarProducts.map((similar, index) => (
                <div key={index} className="similar-product-card">
                  <div className="similar-product-header">
                    <div className="similar-product-name">{similar.productName}</div>
                    <div className="similar-supplier-name">{similar.supplierName}</div>
                  </div>
                  <div className="similar-product-score">
                    🌱 Sustainability: {similar.sustainabilityScore}/10
                  </div>
                  <button
                    className="btn-add-similar"
                    onClick={() => handleAddSimilarProduct(similar)}
                    disabled={isCalculating}
                  >
                    ➕ Add to Comparison
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Batch Comparison */}
        {showComparison && comparedBatches.length > 0 && (
          <div className="batch-comparison-section">
            <div className="comparison-header">
              <h3>🔍 Batch Comparison ({comparedBatches.length} batches)</h3>
              <button
                className="clear-comparison-btn"
                onClick={handleClearComparison}
              >
                🗑️ Clear All
              </button>
            </div>

            <div className="comparison-grid">
              {comparedBatches.map((batch, index) => (
                <div key={index} className="comparison-card">
                  <button
                    className="remove-batch-btn"
                    onClick={() => handleRemoveFromComparison(index)}
                  >
                    ✕
                  </button>

                  <div className="batch-header">
                    <div className="product-name">{batch.productName}</div>
                    <div className="gtin-info">GTIN: {batch.gtin}</div>
                    <div className="batch-id">Batch: {batch.batchId}</div>
                  </div>

                  <div className={`grade-circle-small ${batch.gradeClass}`}>{batch.grade}</div>
                  <div className="score-numerical-small">{batch.score}/100</div>

                  <div className="categories-summary">
                    {batch.categories.map((category, idx) => (
                      <div key={idx} className="category-row">
                        <span className="category-name">{category.title}</span>
                        <span className="category-score">{category.score}/100</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Comparison Table */}
            <div className="comparison-table-section">
              <h4>📊 Detailed Category Comparison</h4>
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    {comparedBatches.map((batch, index) => (
                      <th key={index}>
                        {batch.productName}
                        <br />
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          {batch.batchId}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {['Materials', 'Manufacturing', 'Packaging', 'Logistics', 'Verification'].map((categoryName, catIdx) => (
                    <tr key={catIdx}>
                      <td className="category-label">
                        {['🧪', '🏭', '📦', '🚚', '✅'][catIdx]} {categoryName}
                      </td>
                      {comparedBatches.map((batch, batchIdx) => {
                        const category = batch.categories.find(c => c.title.includes(categoryName))
                        return (
                          <td key={batchIdx} className="score-cell">
                            <div className="score-value">{category?.score || 0}/100</div>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td className="category-label">Overall Score</td>
                    {comparedBatches.map((batch, index) => (
                      <td key={index} className="score-cell">
                        <div className={`grade-badge ${batch.gradeClass}`}>
                          {batch.grade} - {batch.score}/100
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DynamicScoring
