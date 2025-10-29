export interface Product {
  id: string
  name: string
  sustainabilityScore: number
  icon: string
}

export interface Supplier {
  id: string
  name: string
  location: string
  distance: number
  rating: number
  reviews: number
  avgCost: number
  sustainabilityScore: number
  co2PerUnit: number
  products: Product[]
  logo: string
  verified: boolean
}

export interface FilterOptions {
  location: string
  minSustainability: string
  minRating: string
  certification: string
}

export interface ProductPassportData {
  productId: string
  productName: string
  gtin: string
  batchNumber: string
  manufacturingDate: string
  expiryDate: string
  origin: string
  certifications: string[]
  carbonFootprint: string
  waterUsage: string
  recycledContent: string
  supplyChainSteps: {
    step: string
    location: string
    date: string
    verified: boolean
  }[]
}
