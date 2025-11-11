import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: For production, use a backend proxy
})

export interface DeliveryCalculationInput {
  product: string
  quantity: number
  fromLocation: string
  toLocation: string
  distance: number
  deliveryDate: string
  priority: string
}

export interface DeliveryOption {
  id: string
  name: string
  icon: string
  time: string
  co2: string
  cost: string
  efficiency: string
  days: string
  grade: string
  gradeClass: string
  impact: string
  recommended?: boolean
}

export interface RouteComparison {
  standard: {
    distance: string
    transitTime: string
    fuelConsumption: string
    co2Emissions: string
    totalCost: string
    route: string
  }
  optimized: {
    distance: string
    transitTime: string
    fuelConsumption: string
    co2Emissions: string
    totalCost: string
    route: string
  }
  savings: string
}

export interface PredictiveAnalysisResult {
  deliveryOptions: DeliveryOption[]
  routeComparison: RouteComparison
}

/**
 * Get product characteristics for more detailed AI analysis
 */
function getProductCharacteristics(productName: string): string {
  const name = productName.toLowerCase()

  if (name.includes('cotton') || name.includes('textile') || name.includes('t-shirt')) {
    return 'Product Type: TEXTILE - Lightweight (0.15kg/unit), compressible, moderate packaging requirements'
  } else if (name.includes('packaging') || name.includes('biodegradable')) {
    return 'Product Type: PACKAGING MATERIAL - Very light (0.05kg/unit), bulky volume, requires careful stacking'
  } else if (name.includes('solar') || name.includes('power bank')) {
    return 'Product Type: ELECTRONICS - Medium weight (0.3kg/unit), fragile lithium batteries, special handling required'
  } else if (name.includes('led') || name.includes('bulb') || name.includes('light')) {
    return 'Product Type: ELECTRONICS - Light (0.08kg/unit), fragile glass components, careful packaging needed'
  } else {
    return 'Product Type: GENERAL - Medium weight (0.2kg/unit), standard packaging'
  }
}

/**
 * Calls OpenAI API to calculate predictive sustainability analytics
 */
export async function calculatePredictiveAnalytics(
  input: DeliveryCalculationInput
): Promise<PredictiveAnalysisResult> {
  try {
    // Add timestamp to ensure unique responses
    const timestamp = new Date().toISOString()

    const prompt = `You are an AI sustainability and logistics expert. Analyze the following UNIQUE delivery scenario and provide detailed predictions. IMPORTANT: Generate different realistic data for each request - do not use cached or template responses.

**UNIQUE Request ID: ${timestamp}**

**Order Details:**
- Product: ${input.product}
- Quantity: ${input.quantity} units
- From: ${input.fromLocation}
- To: ${input.toLocation}
- Distance: ${input.distance} km
- Required Delivery Date: ${input.deliveryDate}
- Priority: ${input.priority}

**Product-Specific Considerations:**
${getProductCharacteristics(input.product)}

**Instructions:**
- For TEXTILES (cotton t-shirts): Lightweight, moderate bulk, standard packaging, CO2 ~1-3kg per unit
- For PACKAGING (biodegradable): Very lightweight, large volume, fragile, CO2 ~0.5-2kg per unit
- For ELECTRONICS (solar power banks, LED bulbs): Medium weight, fragile, careful handling needed, CO2 ~2-5kg per unit
- Adjust costs based on QUANTITY:
  - Small orders (<500 units): Higher per-unit cost
  - Medium orders (500-1000 units): Standard pricing
  - Large orders (>2000 units): Bulk discounts (20-30% lower per unit)
- Adjust based on PRIORITY:
  - Economy: -30% cost, +50% time
  - Standard: Base pricing
  - Urgent: +40% cost, -30% time
  - Express: +100% cost, -60% time
- Calculate realistic CO2 emissions based on actual product weight and transport method
- Generate DIFFERENT numbers for each product type - use product characteristics to vary calculations

**Task:**
Generate 4 different delivery method options with realistic calculations for:
1. Electric Truck + Sea Freight (eco-friendly, slower)
2. Standard Truck Direct (moderate speed and emissions)
3. Air Freight Express (fastest, highest emissions)
4. Rail + Electric Last Mile (most sustainable, slowest)

For each delivery method, calculate:
- Delivery time range (e.g., "5-7 days")
- CO2 emissions per unit (in kg)
- Shipping cost per unit (in USD)
- Route efficiency percentage (0-100%)
- Average days for delivery (decimal number)
- Sustainability grade (A+, A, B, C, D, or F)
- Environmental impact description
- Set "recommended": true for ONLY ONE option based on the priority level (${input.priority}):
  * For Economy priority: RECOMMEND Rail + Electric Last Mile (cheapest + most sustainable)
  * For Standard priority: RECOMMEND Electric Truck + Sea Freight (balanced)
  * For Urgent priority: RECOMMEND Standard Truck Direct (fast + reasonable cost)
  * For Express priority: RECOMMEND Air Freight Express (fastest delivery)
  * CRITICAL: Mark ALL other options as "recommended": false

Also provide route comparison:
- **Standard Route**: Calculate based on typical routing from ${input.fromLocation} to ${input.toLocation}
  - Use actual distance: ${input.distance} km as baseline
  - Calculate realistic fuel consumption based on product weight and distance
  - Include detailed route description mentioning actual cities/stops
- **AI-Optimized Route**: Show 10-40% improvements over standard
  - Reduced distance through better routing
  - Lower fuel consumption via efficient transport modes
  - Significant CO2 reduction (20-40%)
  - Cost savings from optimization
  - Include optimized route description
- **Total Savings**: Calculate based on quantity (${input.quantity} units) and per-unit cost difference

**CRITICAL:** Make route data DIFFERENT for each product/quantity/priority combination. Heavier products = more fuel consumption. Larger quantities = bigger total savings.

**IMPORTANT:** Return ONLY valid JSON in this exact format, no additional text.

Based on priority "${input.priority}", set the correct recommendation:
- If Economy: Set "recommended": true ONLY for Rail + Electric Last Mile (id: "4")
- If Standard: Set "recommended": true ONLY for Electric Truck + Sea Freight (id: "1")
- If Urgent: Set "recommended": true ONLY for Standard Truck Direct (id: "2")
- If Express: Set "recommended": true ONLY for Air Freight Express (id: "3")

{
  "deliveryOptions": [
    {
      "id": "1",
      "name": "Electric Truck + Sea Freight",
      "icon": "🚛",
      "time": "[Calculate]",
      "co2": "[Calculate]kg",
      "cost": "$[Calculate]",
      "efficiency": "[Calculate]%",
      "days": "[Calculate]",
      "grade": "[A+/A/B/C/D]",
      "gradeClass": "score-[a/b/c/d]",
      "impact": "[Calculate impact description]",
      "recommended": false
    },
    {
      "id": "2",
      "name": "Standard Truck Direct",
      "icon": "🚚",
      "time": "...",
      "co2": "...",
      "cost": "...",
      "efficiency": "...",
      "days": "...",
      "grade": "B",
      "gradeClass": "score-b",
      "impact": "...",
      "recommended": false
    },
    {
      "id": "3",
      "name": "Air Freight Express",
      "icon": "✈️",
      "time": "...",
      "co2": "...",
      "cost": "...",
      "efficiency": "...",
      "days": "...",
      "grade": "D",
      "gradeClass": "score-d",
      "impact": "...",
      "recommended": false
    },
    {
      "id": "4",
      "name": "Rail + Electric Last Mile",
      "icon": "🚆",
      "time": "...",
      "co2": "...",
      "cost": "...",
      "efficiency": "...",
      "days": "...",
      "grade": "A+",
      "gradeClass": "score-a",
      "impact": "...",
      "recommended": false
    }
  ],
  "routeComparison": {
    "standard": {
      "distance": "[CALCULATE: ~${input.distance + 100} km based on standard routing]",
      "transitTime": "[CALCULATE based on distance and product type]",
      "fuelConsumption": "[CALCULATE: varies by product weight - heavier = more fuel]",
      "co2Emissions": "[CALCULATE per unit based on fuel and product]",
      "totalCost": "[CALCULATE per unit: higher for small quantities, urgent priority]",
      "route": "[Describe actual route from ${input.fromLocation} to ${input.toLocation} with city names]"
    },
    "optimized": {
      "distance": "[CALCULATE: 10-30% less than standard]",
      "transitTime": "[CALCULATE: 15-40% faster]",
      "fuelConsumption": "[CALCULATE: 20-40% reduction]",
      "co2Emissions": "[CALCULATE: 25-45% lower per unit]",
      "totalCost": "[CALCULATE: 20-35% cost reduction per unit]",
      "route": "[Describe optimized route with specific improvements]"
    },
    "savings": "[CALCULATE: (standard cost - optimized cost) × ${input.quantity} units]"
  }
}

**REMEMBER:**
- Cotton t-shirts (500 units) should have DIFFERENT numbers than LED bulbs (1,000 units)
- Economy priority should have LOWER costs than Express priority
- Use the product weight to calculate realistic fuel consumption and CO2
- Larger quantities should show bigger total savings amounts

Generate realistic, scientifically accurate data based on actual logistics and sustainability metrics.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in logistics, supply chain optimization, and environmental sustainability. You provide accurate, data-driven predictions for delivery routes and environmental impact. Always respond with valid JSON only. Generate unique, realistic calculations for each request based on the specific product, quantity, and priority level.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.9,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
      seed: Date.now() // Add seed for more variation
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    const result = JSON.parse(content) as PredictiveAnalysisResult

    // Validate the response structure
    if (!result.deliveryOptions || !Array.isArray(result.deliveryOptions)) {
      throw new Error('Invalid response format from OpenAI')
    }

    return result
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    throw new Error(
      error instanceof Error
        ? `Failed to calculate predictions: ${error.message}`
        : 'Failed to calculate predictions'
    )
  }
}

/**
 * Check if OpenAI API key is configured
 */
export function isOpenAIConfigured(): boolean {
  return !!import.meta.env.VITE_OPENAI_API_KEY &&
         import.meta.env.VITE_OPENAI_API_KEY !== 'your_openai_api_key_here'
}

/**
 * Dynamic Sustainability Scoring Types
 */
export interface ScoringInput {
  productName: string
  gtin: string
  batchId: string
  supplierName?: string
  baseSustainabilityScore?: number
}

export interface ScoringCategory {
  title: string
  score: number
  details: {
    label: string
    value: string
  }[]
}

export interface DynamicScoringResult {
  grade: string
  gradeClass: string
  score: number
  trend: 'up' | 'down' | 'stable'
  trendText: string
  categories: ScoringCategory[]
}

/**
 * Calculate dynamic sustainability scoring using OpenAI
 */
export async function calculateDynamicScoring(
  input: ScoringInput
): Promise<DynamicScoringResult> {
  try {
    const timestamp = new Date().toISOString()

    const prompt = `You are a sustainability and supply chain expert. Calculate a comprehensive sustainability score for this product batch.

**Product Information:**
- Product Name: ${input.productName}
- GTIN: ${input.gtin}
- Batch ID: ${input.batchId}
- Supplier: ${input.supplierName || 'Unknown'}
- Base Sustainability Score: ${input.baseSustainabilityScore || 'N/A'}/10
- Request ID: ${timestamp}

**Task:**
Generate a detailed sustainability scoring breakdown across 5 categories:

1. **Materials** (Score 0-100): Analyze raw materials, sourcing distance, water usage, pesticides/chemicals
2. **Manufacturing** (Score 0-100): Energy sources, CO2 emissions, water recycling, worker standards
3. **Packaging** (Score 0-100): Material type, recyclability, weight, certifications
4. **Logistics** (Score 0-100): Transport mode, distance, route optimization, carbon offsetting
5. **Verification** (Score 0-100): Data completeness, blockchain verification, audits, certifications

For each category, provide:
- A score out of 100
- 4 specific metrics with realistic values

Calculate:
- **Overall Score**: Weighted average (0-100)
- **Grade**: A+ (95-100), A (85-94), B (75-84), C (65-74), D (50-64), E (<50)
- **Trend**: Whether score is improving/declining
- **Trend Text**: Brief explanation of recent change

**IMPORTANT:** Base calculations on the product type. For example:
- Organic cotton = High materials score, good manufacturing
- Electronics = Lower materials, higher manufacturing emissions
- Packaging = Depends on recyclability
- Generate UNIQUE realistic data for each product

**Return ONLY valid JSON:**

{
  "grade": "A",
  "gradeClass": "grade-A",
  "score": 87,
  "trend": "up",
  "trendText": "+3 points from logistics optimization",
  "categories": [
    {
      "title": "🧪 Materials",
      "score": 92,
      "details": [
        { "label": "Primary Material", "value": "100% Organic Cotton" },
        { "label": "Source Distance", "value": "247km (Local)" },
        { "label": "Water Usage", "value": "2.3L/kg (Excellent)" },
        { "label": "Pesticides", "value": "Zero Synthetic" }
      ]
    },
    {
      "title": "🏭 Manufacturing",
      "score": 85,
      "details": [
        { "label": "Energy Source", "value": "87% Renewable" },
        { "label": "CO₂ Emissions", "value": "1.4kg/unit" },
        { "label": "Water Recycling", "value": "94% Recovered" },
        { "label": "Worker Standards", "value": "SA8000 Certified" }
      ]
    },
    {
      "title": "📦 Packaging",
      "score": 89,
      "details": [
        { "label": "Material", "value": "100% Recycled Cardboard" },
        { "label": "Recyclability", "value": "95%" },
        { "label": "Weight", "value": "0.12kg/unit (Minimal)" },
        { "label": "FSC Certified", "value": "Yes" }
      ]
    },
    {
      "title": "🚚 Logistics",
      "score": 81,
      "details": [
        { "label": "Transport Mode", "value": "Electric Truck" },
        { "label": "Distance", "value": "847km" },
        { "label": "Route Optimization", "value": "23% Improvement" },
        { "label": "Carbon Offset", "value": "150% Purchased" }
      ]
    },
    {
      "title": "✅ Verification",
      "score": 95,
      "details": [
        { "label": "Data Completeness", "value": "28/28 Points" },
        { "label": "Blockchain Verified", "value": "100% Steps" },
        { "label": "Third-party Audits", "value": "Quarterly" },
        { "label": "Cert Status", "value": "All Current" }
      ]
    }
  ]
}

Generate realistic, scientifically accurate sustainability data based on the product type.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in sustainability scoring, environmental impact assessment, and supply chain transparency. Generate accurate, realistic sustainability metrics. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
      seed: Date.now()
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    const result = JSON.parse(content) as DynamicScoringResult

    // Validate the response structure
    if (!result.categories || !Array.isArray(result.categories)) {
      throw new Error('Invalid response format from OpenAI')
    }

    return result
  } catch (error) {
    console.error('Error calling OpenAI API for scoring:', error)
    throw new Error(
      error instanceof Error
        ? `Failed to calculate sustainability score: ${error.message}`
        : 'Failed to calculate sustainability score'
    )
  }
}
