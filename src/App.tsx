import { useState } from 'react'
import Header from './components/Header'
import PlatformOverview from './components/PlatformOverview'
import SearchFilters from './components/SearchFilters'
import SuppliersGrid from './components/SuppliersGrid'
import ProductPassportModal from './components/ProductPassportModal'
import { Supplier, FilterOptions } from './types'
import { mockSuppliers } from './utils/mockData'
import { rankSuppliersByIntent, generateResultInsight } from './utils/aiSearch'
import './styles/App.css'

function App() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers)
  const [filters, setFilters] = useState<FilterOptions>({
    location: 'all',
    minSustainability: 'any',
    minRating: 'any',
    certification: 'any'
  })
  const [sortBy, setSortBy] = useState<string>('best-match')
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [aiInsight, setAiInsight] = useState<string>('')

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
    // Apply filters to suppliers
    filterSuppliers(newFilters, searchQuery, sortBy)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterSuppliers(filters, query, sortBy)
  }

  const handleSort = (sortOption: string) => {
    setSortBy(sortOption)
    filterSuppliers(filters, searchQuery, sortOption)
  }

  const filterSuppliers = (currentFilters: FilterOptions, query: string, sort: string) => {
    let filtered = [...mockSuppliers]

    // Apply search query
    if (query) {
      filtered = filtered.filter(supplier =>
        supplier.name.toLowerCase().includes(query.toLowerCase()) ||
        supplier.location.toLowerCase().includes(query.toLowerCase()) ||
        supplier.products.some(p => p.name.toLowerCase().includes(query.toLowerCase()))
      )
    }

    // Apply filters
    if (currentFilters.minSustainability !== 'any') {
      const minScore = parseFloat(currentFilters.minSustainability)
      filtered = filtered.filter(s => s.sustainabilityScore >= minScore)
    }

    if (currentFilters.minRating !== 'any') {
      const minRating = parseFloat(currentFilters.minRating)
      filtered = filtered.filter(s => s.rating >= minRating)
    }

    // Apply sorting - with AI-powered ranking for best match
    switch (sort) {
      case 'best-match':
        // Use AI to rank suppliers based on search intent
        if (query) {
          filtered = rankSuppliersByIntent(filtered, query)
        }
        break
      case 'sustainability':
        filtered.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore)
        break
      case 'cost':
        filtered.sort((a, b) => a.avgCost - b.avgCost)
        break
      case 'reputation':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'local':
        filtered.sort((a, b) => a.distance - b.distance)
        break
    }

    // Generate AI insight
    const insight = generateResultInsight(filtered, query)
    setAiInsight(insight)

    setSuppliers(filtered)
  }

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <div className="main-container">
        <PlatformOverview />
        <SearchFilters filters={filters} onFilterChange={handleFilterChange} />

        {aiInsight && (
          <div className="ai-insight">
            <span className="ai-badge">🤖 AI Insight</span>
            <p>{aiInsight}</p>
          </div>
        )}

        <div className="results-header">
          <div className="results-count">
            <strong>{suppliers.length} verified suppliers</strong> match your criteria
          </div>
          <div className="sort-controls">
            <span>Sort by:</span>
            <select className="sort-select" value={sortBy} onChange={(e) => handleSort(e.target.value)}>
              <option value="best-match">🤖 AI Best Match</option>
              <option value="sustainability">Sustainability Score</option>
              <option value="cost">Lowest Cost</option>
              <option value="reputation">Highest Reputation</option>
              <option value="local">Local First</option>
            </select>
          </div>
        </div>

        <SuppliersGrid
          suppliers={suppliers}
          onProductClick={setSelectedProduct}
        />
      </div>

      {selectedProduct && (
        <ProductPassportModal
          productId={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}

export default App
