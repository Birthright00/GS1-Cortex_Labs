import { FilterOptions } from '../types'

interface SearchFiltersProps {
  filters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
}

function SearchFilters({ filters, onFilterChange }: SearchFiltersProps) {
  const handleFilterUpdate = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value }
    onFilterChange(newFilters)
  }

  return (
    <div className="search-filters">
      <div className="filter-row">
        <div className="filter-group">
          <label className="filter-label">📍 Supplier Location</label>
          <select
            className="filter-select"
            value={filters.location}
            onChange={(e) => handleFilterUpdate('location', e.target.value)}
          >
            <option value="all">All Locations</option>
            <option value="local">Local (&lt; 500km)</option>
            <option value="regional">Regional (&lt; 2000km)</option>
            <option value="asia-pacific">Asia-Pacific</option>
            <option value="europe">Europe</option>
            <option value="americas">Americas</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">🌱 Min. Sustainability Score</label>
          <select
            className="filter-select"
            value={filters.minSustainability}
            onChange={(e) => handleFilterUpdate('minSustainability', e.target.value)}
          >
            <option value="any">Any Score</option>
            <option value="7.0">7.0+ (Good)</option>
            <option value="8.0">8.0+ (Very Good)</option>
            <option value="9.0">9.0+ (Excellent)</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">⭐ Min. Supplier Rating</label>
          <select
            className="filter-select"
            value={filters.minRating}
            onChange={(e) => handleFilterUpdate('minRating', e.target.value)}
          >
            <option value="any">Any Rating</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.8">4.8+ Stars</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">🏷️ Certifications</label>
          <select
            className="filter-select"
            value={filters.certification}
            onChange={(e) => handleFilterUpdate('certification', e.target.value)}
          >
            <option value="any">Any Certification</option>
            <option value="iso14001">ISO 14001</option>
            <option value="carbon-neutral">Carbon Neutral</option>
            <option value="fair-trade">Fair Trade</option>
            <option value="organic">Organic Certified</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default SearchFilters
