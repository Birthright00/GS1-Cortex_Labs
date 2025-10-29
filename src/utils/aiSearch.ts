import { Supplier } from '../types'

/**
 * AI-powered search utility that provides intelligent supplier matching
 * This is a basic implementation that can be enhanced with actual ML models
 */

interface SearchIntent {
  keywords: string[]
  focus: 'cost' | 'sustainability' | 'reputation' | 'proximity' | 'balanced'
  priorityWeights: {
    cost: number
    sustainability: number
    reputation: number
    proximity: number
  }
}

/**
 * Analyzes search query to determine user intent
 */
export function analyzeSearchIntent(query: string): SearchIntent {
  const lowerQuery = query.toLowerCase()
  const keywords = lowerQuery.split(' ').filter(word => word.length > 2)

  // Cost-focused keywords
  const costKeywords = ['cheap', 'affordable', 'budget', 'cost', 'price', 'economical', 'inexpensive']
  const hasCostFocus = costKeywords.some(kw => lowerQuery.includes(kw))

  // Sustainability-focused keywords
  const sustainabilityKeywords = ['sustainable', 'eco', 'green', 'organic', 'carbon', 'environmental', 'renewable', 'recycled']
  const hasSustainabilityFocus = sustainabilityKeywords.some(kw => lowerQuery.includes(kw))

  // Reputation-focused keywords
  const reputationKeywords = ['trusted', 'reliable', 'quality', 'best', 'top', 'premium', 'verified']
  const hasReputationFocus = reputationKeywords.some(kw => lowerQuery.includes(kw))

  // Proximity-focused keywords
  const proximityKeywords = ['local', 'nearby', 'close', 'regional', 'domestic']
  const hasProximityFocus = proximityKeywords.some(kw => lowerQuery.includes(kw))

  // Determine focus and weights
  let focus: SearchIntent['focus'] = 'balanced'
  let priorityWeights = {
    cost: 0.25,
    sustainability: 0.25,
    reputation: 0.25,
    proximity: 0.25
  }

  if (hasSustainabilityFocus) {
    focus = 'sustainability'
    priorityWeights = { cost: 0.15, sustainability: 0.55, reputation: 0.20, proximity: 0.10 }
  } else if (hasCostFocus) {
    focus = 'cost'
    priorityWeights = { cost: 0.50, sustainability: 0.15, reputation: 0.20, proximity: 0.15 }
  } else if (hasReputationFocus) {
    focus = 'reputation'
    priorityWeights = { cost: 0.15, sustainability: 0.20, reputation: 0.50, proximity: 0.15 }
  } else if (hasProximityFocus) {
    focus = 'proximity'
    priorityWeights = { cost: 0.20, sustainability: 0.15, reputation: 0.20, proximity: 0.45 }
  }

  return {
    keywords,
    focus,
    priorityWeights
  }
}

/**
 * Calculates a smart match score for each supplier based on search intent
 */
export function calculateSmartScore(supplier: Supplier, intent: SearchIntent): number {
  // Normalize values to 0-1 scale
  const normalizedCost = 1 - (supplier.avgCost / 2.0) // Assuming max cost around $2
  const normalizedSustainability = supplier.sustainabilityScore / 10
  const normalizedReputation = supplier.rating / 5
  const normalizedProximity = 1 - (supplier.distance / 2000) // Assuming max distance 2000km

  // Calculate weighted score
  const score =
    (normalizedCost * intent.priorityWeights.cost) +
    (normalizedSustainability * intent.priorityWeights.sustainability) +
    (normalizedReputation * intent.priorityWeights.reputation) +
    (normalizedProximity * intent.priorityWeights.proximity)

  return Math.max(0, Math.min(1, score)) // Clamp between 0 and 1
}

/**
 * Ranks suppliers based on AI-analyzed search intent
 */
export function rankSuppliersByIntent(suppliers: Supplier[], query: string): Supplier[] {
  if (!query.trim()) {
    return suppliers
  }

  const intent = analyzeSearchIntent(query)

  // Calculate scores and sort
  const scoredSuppliers = suppliers.map(supplier => ({
    supplier,
    score: calculateSmartScore(supplier, intent)
  }))

  scoredSuppliers.sort((a, b) => b.score - a.score)

  return scoredSuppliers.map(item => item.supplier)
}

/**
 * Generates smart search suggestions based on user input
 */
export function generateSearchSuggestions(input: string, suppliers: Supplier[]): string[] {
  const suggestions: string[] = []
  const lowerInput = input.toLowerCase()

  if (lowerInput.length < 2) {
    return [
      'sustainable packaging suppliers',
      'local organic textile manufacturers',
      'affordable eco-friendly materials',
      'top-rated green suppliers'
    ]
  }

  // Product-based suggestions
  const allProducts = new Set<string>()
  suppliers.forEach(supplier => {
    supplier.products.forEach(product => {
      if (product.name.toLowerCase().includes(lowerInput)) {
        allProducts.add(product.name.toLowerCase())
      }
    })
  })

  allProducts.forEach(product => {
    suggestions.push(`suppliers with ${product}`)
  })

  // Location-based suggestions
  const locations = [...new Set(suppliers.map(s => s.location))]
  locations.forEach(location => {
    if (location.toLowerCase().includes(lowerInput)) {
      suggestions.push(`suppliers in ${location}`)
    }
  })

  // Intent-based suggestions
  if (lowerInput.includes('sustain') || lowerInput.includes('eco') || lowerInput.includes('green')) {
    suggestions.push('sustainable suppliers with high ratings')
    suggestions.push('eco-friendly materials with low carbon footprint')
  }

  if (lowerInput.includes('cheap') || lowerInput.includes('afford') || lowerInput.includes('budget')) {
    suggestions.push('affordable suppliers with good sustainability')
    suggestions.push('budget-friendly eco options')
  }

  return suggestions.slice(0, 5)
}

/**
 * Provides AI-powered insights about search results
 */
export function generateResultInsight(suppliers: Supplier[], query: string): string {
  if (suppliers.length === 0) {
    return "No suppliers match your criteria. Try broadening your search filters."
  }

  const intent = analyzeSearchIntent(query)
  const avgSustainability = suppliers.reduce((sum, s) => sum + s.sustainabilityScore, 0) / suppliers.length
  const avgCost = suppliers.reduce((sum, s) => sum + s.avgCost, 0) / suppliers.length
  const avgRating = suppliers.reduce((sum, s) => sum + s.rating, 0) / suppliers.length

  let insight = `Found ${suppliers.length} suppliers`

  if (intent.focus === 'sustainability') {
    insight += ` with an average sustainability score of ${avgSustainability.toFixed(1)}/10. `
    insight += avgSustainability > 8.5 ? '🌟 Excellent eco-friendly options!' : 'Consider filtering for 8.5+ scores for best sustainability.'
  } else if (intent.focus === 'cost') {
    insight += ` with an average cost of $${avgCost.toFixed(2)}/unit. `
    insight += avgCost < 1.0 ? '💰 Great value options available!' : 'Check local suppliers for potential cost savings.'
  } else if (intent.focus === 'reputation') {
    insight += ` with an average rating of ${avgRating.toFixed(1)}/5. `
    insight += avgRating > 4.7 ? '⭐ Highly trusted suppliers!' : 'Consider filtering for 4.5+ ratings for reliability.'
  } else {
    insight += ` matching your criteria. Average: ${avgSustainability.toFixed(1)}/10 sustainability, $${avgCost.toFixed(2)}/unit cost, ${avgRating.toFixed(1)}/5 rating.`
  }

  return insight
}
