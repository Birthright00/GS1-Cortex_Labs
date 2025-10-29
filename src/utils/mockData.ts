import { Supplier, ProductPassportData } from '../types'

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'EcoManufacturing Solutions Ltd.',
    location: 'Jakarta, Indonesia',
    distance: 1247,
    rating: 4.9,
    reviews: 2847,
    avgCost: 0.89,
    sustainabilityScore: 8.7,
    co2PerUnit: 2.3,
    logo: '🌱',
    verified: true,
    products: [
      { id: 'organic-cotton', name: 'Organic Cotton Textiles', sustainabilityScore: 9.2, icon: '👕' },
      { id: 'biodegradable-packaging', name: 'Biodegradable Packaging', sustainabilityScore: 8.9, icon: '📦' },
      { id: 'natural-cleaning', name: 'Natural Cleaning Supplies', sustainabilityScore: 8.4, icon: '🧴' }
    ]
  },
  {
    id: '2',
    name: 'GreenTech Industries Pte Ltd',
    location: 'Singapore',
    distance: 127,
    rating: 4.8,
    reviews: 1923,
    avgCost: 1.24,
    sustainabilityScore: 9.1,
    co2PerUnit: 1.1,
    logo: '🏭',
    verified: true,
    products: [
      { id: 'solar-components', name: 'Solar Components', sustainabilityScore: 9.5, icon: '☀️' },
      { id: 'led-electronics', name: 'LED Electronics', sustainabilityScore: 9.0, icon: '💡' },
      { id: 'recycled-plastics', name: 'Recycled Plastics', sustainabilityScore: 8.8, icon: '♻️' }
    ]
  },
  {
    id: '3',
    name: 'Sustainable Materials Corp',
    location: 'Bangkok, Thailand',
    distance: 892,
    rating: 4.7,
    reviews: 1456,
    avgCost: 0.95,
    sustainabilityScore: 8.5,
    co2PerUnit: 1.8,
    logo: '🌿',
    verified: true,
    products: [
      { id: 'bamboo-products', name: 'Bamboo Products', sustainabilityScore: 9.3, icon: '🎋' },
      { id: 'eco-paper', name: 'Eco-Friendly Paper', sustainabilityScore: 8.7, icon: '📄' },
      { id: 'natural-fibers', name: 'Natural Fibers', sustainabilityScore: 8.9, icon: '🧵' }
    ]
  },
  {
    id: '4',
    name: 'CircularEconomy Solutions',
    location: 'Kuala Lumpur, Malaysia',
    distance: 315,
    rating: 4.6,
    reviews: 987,
    avgCost: 1.05,
    sustainabilityScore: 8.2,
    co2PerUnit: 2.1,
    logo: '♻️',
    verified: true,
    products: [
      { id: 'upcycled-materials', name: 'Upcycled Materials', sustainabilityScore: 8.8, icon: '🔄' },
      { id: 'compostable-items', name: 'Compostable Items', sustainabilityScore: 8.6, icon: '🌱' },
      { id: 'zero-waste-packaging', name: 'Zero-Waste Packaging', sustainabilityScore: 9.1, icon: '📦' }
    ]
  }
]

export const mockProductPassportData: Record<string, ProductPassportData> = {
  'organic-cotton': {
    productId: 'organic-cotton',
    productName: 'Organic Cotton Textiles',
    gtin: '01234567891234',
    batchNumber: 'BATCH-2024-001',
    manufacturingDate: '2024-10-15',
    expiryDate: '2026-10-15',
    origin: 'Organic Farm, Tamil Nadu, India',
    certifications: ['GOTS Certified', 'Fair Trade', 'Carbon Neutral'],
    carbonFootprint: '2.1 kg CO₂ per unit',
    waterUsage: '45L per unit (70% less than conventional)',
    recycledContent: '15% recycled cotton fiber',
    supplyChainSteps: [
      { step: 'Cotton Harvesting', location: 'Tamil Nadu, India', date: '2024-08-10', verified: true },
      { step: 'Organic Processing', location: 'Coimbatore, India', date: '2024-09-05', verified: true },
      { step: 'Textile Manufacturing', location: 'Jakarta, Indonesia', date: '2024-10-15', verified: true },
      { step: 'Quality Control', location: 'Jakarta, Indonesia', date: '2024-10-20', verified: true },
      { step: 'Distribution Center', location: 'Singapore', date: '2024-10-25', verified: true }
    ]
  }
}
