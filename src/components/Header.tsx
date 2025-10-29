import { useState } from 'react'

interface HeaderProps {
  onSearch: (query: string) => void
}

function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-top">
          <div className="logo">
            🏭 GS1 B2B Marketplace
          </div>
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search suppliers, products, or sustainability certifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="search-btn" onClick={handleSearch}>
              🔍 Search
            </button>
          </div>
          <div className="header-actions">
            <a href="#" className="header-btn">📊 Dashboard</a>
            <a href="#" className="header-btn">💬 Messages</a>
            <a href="#" className="header-btn">👤 Account</a>
          </div>
        </div>
        <div className="nav-tabs">
          <a href="/" className="nav-tab active">🏠 Suppliers</a>
          <a href="/demo-hub.html" className="nav-tab">🎯 All Features</a>
          <a href="#" className="nav-tab">📦 Products</a>
          <a href="#" className="nav-tab">🔬 Verification</a>
          <a href="#" className="nav-tab">📈 Analytics</a>
        </div>
      </div>
    </div>
  )
}

export default Header
