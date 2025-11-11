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
 * Calls OpenAI API to calculate predictive sustainability analytics
 */
export async function calculatePredictiveAnalytics(
  input: DeliveryCalculationInput
): Promise<PredictiveAnalysisResult> {
  try {
    const prompt = `You are an AI sustainability and logistics expert. Analyze the following delivery scenario and provide detailed predictions:

**Order Details:**
- Product: ${input.product}
- Quantity: ${input.quantity} units
- From: ${input.fromLocation}
- To: ${input.toLocation}
- Distance: ${input.distance} km
- Required Delivery Date: ${input.deliveryDate}
- Priority: ${input.priority}

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

Also provide:
- A standard route with distance, transit time, fuel consumption, CO2 emissions, and total cost
- An AI-optimized route with the same metrics showing improvements
- Total savings calculation for the entire order

**IMPORTANT:** Return ONLY valid JSON in this exact format, no additional text:

{
  "deliveryOptions": [
    {
      "id": "1",
      "name": "Electric Truck + Sea Freight",
      "icon": "🚛",
      "time": "5-7 days",
      "co2": "1.8kg",
      "cost": "$12.40",
      "efficiency": "94%",
      "days": "6.2",
      "grade": "A",
      "gradeClass": "score-a",
      "impact": "23% lower CO₂ than standard truck delivery",
      "recommended": true
    }
  ],
  "routeComparison": {
    "standard": {
      "distance": "1,347 km",
      "transitTime": "18.5 hours",
      "fuelConsumption": "89.2L",
      "co2Emissions": "2.7kg/unit",
      "totalCost": "$18.90/unit",
      "route": "Route description"
    },
    "optimized": {
      "distance": "1,247 km (-7.4%)",
      "transitTime": "16.2 hours (-12.4%)",
      "fuelConsumption": "73.8L (-17.3%)",
      "co2Emissions": "1.8kg/unit (-33.3%)",
      "totalCost": "$12.40/unit (-34.4%)",
      "route": "Route description"
    },
    "savings": "$3,250"
  }
}

Generate realistic, scientifically accurate data based on actual logistics and sustainability metrics.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in logistics, supply chain optimization, and environmental sustainability. You provide accurate, data-driven predictions for delivery routes and environmental impact. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
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
