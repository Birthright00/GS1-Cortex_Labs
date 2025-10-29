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
  },
  {
    id: '5',
    name: 'BioPacific Manufacturing Co.',
    location: 'Ho Chi Minh City, Vietnam',
    distance: 1089,
    rating: 4.9,
    reviews: 3421,
    avgCost: 0.78,
    sustainabilityScore: 9.3,
    co2PerUnit: 1.4,
    logo: '🌊',
    verified: true,
    products: [
      { id: 'bioplastic-granules', name: 'Bioplastic Granules', sustainabilityScore: 9.4, icon: '🧪' },
      { id: 'seaweed-packaging', name: 'Seaweed Packaging', sustainabilityScore: 9.6, icon: '🌊' },
      { id: 'plant-based-polymers', name: 'Plant-Based Polymers', sustainabilityScore: 9.2, icon: '🔬' }
    ]
  },
  {
    id: '6',
    name: 'RenewEnergy Systems Ltd',
    location: 'Manila, Philippines',
    distance: 2438,
    rating: 4.5,
    reviews: 1567,
    avgCost: 1.45,
    sustainabilityScore: 8.9,
    co2PerUnit: 0.9,
    logo: '⚡',
    verified: true,
    products: [
      { id: 'wind-turbine-parts', name: 'Wind Turbine Components', sustainabilityScore: 9.3, icon: '💨' },
      { id: 'battery-storage', name: 'Battery Storage Systems', sustainabilityScore: 8.7, icon: '🔋' },
      { id: 'solar-inverters', name: 'Solar Inverters', sustainabilityScore: 9.0, icon: '⚡' }
    ]
  },
  {
    id: '7',
    name: 'EarthFirst Textiles',
    location: 'Dhaka, Bangladesh',
    distance: 2156,
    rating: 4.7,
    reviews: 2198,
    avgCost: 0.65,
    sustainabilityScore: 8.4,
    co2PerUnit: 2.5,
    logo: '👔',
    verified: true,
    products: [
      { id: 'hemp-fabric', name: 'Hemp Fabric', sustainabilityScore: 9.1, icon: '🧵' },
      { id: 'recycled-polyester', name: 'Recycled Polyester', sustainabilityScore: 8.5, icon: '♻️' },
      { id: 'organic-wool', name: 'Organic Wool', sustainabilityScore: 8.8, icon: '🐑' }
    ]
  },
  {
    id: '8',
    name: 'GreenPackaging Innovations',
    location: 'Taipei, Taiwan',
    distance: 3234,
    rating: 4.8,
    reviews: 1876,
    avgCost: 1.12,
    sustainabilityScore: 8.8,
    co2PerUnit: 1.6,
    logo: '📦',
    verified: true,
    products: [
      { id: 'mushroom-packaging', name: 'Mushroom Packaging', sustainabilityScore: 9.5, icon: '🍄' },
      { id: 'paper-foam', name: 'Paper Foam Alternatives', sustainabilityScore: 8.9, icon: '📄' },
      { id: 'cornstarch-packing', name: 'Cornstarch Packing Peanuts', sustainabilityScore: 9.0, icon: '🌽' }
    ]
  },
  {
    id: '9',
    name: 'CleanWater Technologies',
    location: 'Seoul, South Korea',
    distance: 4521,
    rating: 4.9,
    reviews: 2634,
    avgCost: 1.58,
    sustainabilityScore: 9.2,
    co2PerUnit: 1.2,
    logo: '💧',
    verified: true,
    products: [
      { id: 'water-filters', name: 'Advanced Water Filters', sustainabilityScore: 9.3, icon: '💧' },
      { id: 'purification-systems', name: 'Purification Systems', sustainabilityScore: 9.1, icon: '🔬' },
      { id: 'eco-membranes', name: 'Eco-Friendly Membranes', sustainabilityScore: 9.0, icon: '🧫' }
    ]
  },
  {
    id: '10',
    name: 'NatureHarvest Organics',
    location: 'Chiang Mai, Thailand',
    distance: 1456,
    rating: 4.6,
    reviews: 1345,
    avgCost: 0.88,
    sustainabilityScore: 8.6,
    co2PerUnit: 1.9,
    logo: '🌾',
    verified: true,
    products: [
      { id: 'organic-fertilizers', name: 'Organic Fertilizers', sustainabilityScore: 8.9, icon: '🌱' },
      { id: 'natural-pesticides', name: 'Natural Pesticides', sustainabilityScore: 8.7, icon: '🐛' },
      { id: 'compost-solutions', name: 'Compost Solutions', sustainabilityScore: 9.2, icon: '♻️' }
    ]
  },
  {
    id: '11',
    name: 'SmartMaterials Inc.',
    location: 'Shenzhen, China',
    distance: 3876,
    rating: 4.7,
    reviews: 2987,
    avgCost: 1.34,
    sustainabilityScore: 8.3,
    co2PerUnit: 2.2,
    logo: '🔧',
    verified: true,
    products: [
      { id: 'self-healing-materials', name: 'Self-Healing Materials', sustainabilityScore: 8.8, icon: '🔬' },
      { id: 'nano-coatings', name: 'Nano-Coatings', sustainabilityScore: 8.5, icon: '✨' },
      { id: 'smart-textiles', name: 'Smart Textiles', sustainabilityScore: 8.6, icon: '🧵' }
    ]
  },
  {
    id: '12',
    name: 'OceanPlastic Recyclers',
    location: 'Perth, Australia',
    distance: 4832,
    rating: 4.8,
    reviews: 1789,
    avgCost: 1.19,
    sustainabilityScore: 9.4,
    co2PerUnit: 1.3,
    logo: '🌊',
    verified: true,
    products: [
      { id: 'ocean-plastic-pellets', name: 'Ocean Plastic Pellets', sustainabilityScore: 9.6, icon: '♻️' },
      { id: 'recycled-fishing-nets', name: 'Recycled Fishing Nets', sustainabilityScore: 9.5, icon: '🎣' },
      { id: 'marine-waste-products', name: 'Marine Waste Products', sustainabilityScore: 9.3, icon: '🌊' }
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
  },
  'solar-components': {
    productId: 'solar-components',
    productName: 'Solar Components',
    gtin: '01234567891235',
    batchNumber: 'SOLAR-2024-042',
    manufacturingDate: '2024-09-20',
    expiryDate: '2034-09-20',
    origin: 'GreenTech Industries, Singapore',
    certifications: ['ISO 14001', 'RoHS Compliant', 'Energy Star'],
    carbonFootprint: '1.1 kg CO₂ per unit',
    waterUsage: '8L per unit',
    recycledContent: '25% recycled silicon',
    supplyChainSteps: [
      { step: 'Silicon Extraction', location: 'Norway', date: '2024-07-15', verified: true },
      { step: 'Wafer Production', location: 'Taiwan', date: '2024-08-10', verified: true },
      { step: 'Cell Assembly', location: 'Singapore', date: '2024-09-20', verified: true },
      { step: 'Quality Testing', location: 'Singapore', date: '2024-09-25', verified: true }
    ]
  },
  'bamboo-products': {
    productId: 'bamboo-products',
    productName: 'Bamboo Products',
    gtin: '01234567891236',
    batchNumber: 'BAMB-2024-018',
    manufacturingDate: '2024-10-05',
    expiryDate: '2029-10-05',
    origin: 'Sustainable Bamboo Plantation, Thailand',
    certifications: ['FSC Certified', 'Biodegradable', 'Chemical-Free'],
    carbonFootprint: '0.8 kg CO₂ per unit',
    waterUsage: '12L per unit (90% less than wood)',
    recycledContent: '0% (100% renewable bamboo)',
    supplyChainSteps: [
      { step: 'Bamboo Harvesting', location: 'Chiang Mai, Thailand', date: '2024-09-01', verified: true },
      { step: 'Processing & Treatment', location: 'Bangkok, Thailand', date: '2024-09-15', verified: true },
      { step: 'Product Manufacturing', location: 'Bangkok, Thailand', date: '2024-10-05', verified: true },
      { step: 'Quality Inspection', location: 'Bangkok, Thailand', date: '2024-10-08', verified: true }
    ]
  },
  'bioplastic-granules': {
    productId: 'bioplastic-granules',
    productName: 'Bioplastic Granules',
    gtin: '01234567891237',
    batchNumber: 'BIO-2024-089',
    manufacturingDate: '2024-10-12',
    expiryDate: '2026-10-12',
    origin: 'BioPacific Manufacturing, Vietnam',
    certifications: ['EN 13432 Compostable', 'TUV OK Biobased', 'ASTM D6400'],
    carbonFootprint: '1.4 kg CO₂ per unit',
    waterUsage: '22L per unit (60% less than traditional plastic)',
    recycledContent: '0% (100% plant-based materials)',
    supplyChainSteps: [
      { step: 'Corn Starch Sourcing', location: 'Mekong Delta, Vietnam', date: '2024-09-05', verified: true },
      { step: 'Fermentation Process', location: 'Ho Chi Minh City, Vietnam', date: '2024-09-20', verified: true },
      { step: 'Polymerization', location: 'Ho Chi Minh City, Vietnam', date: '2024-10-05', verified: true },
      { step: 'Granule Production', location: 'Ho Chi Minh City, Vietnam', date: '2024-10-12', verified: true }
    ]
  },
  'wind-turbine-parts': {
    productId: 'wind-turbine-parts',
    productName: 'Wind Turbine Components',
    gtin: '01234567891238',
    batchNumber: 'WIND-2024-023',
    manufacturingDate: '2024-09-28',
    expiryDate: '2044-09-28',
    origin: 'RenewEnergy Systems, Philippines',
    certifications: ['ISO 9001', 'IEC 61400', 'Carbon Negative Production'],
    carbonFootprint: '0.9 kg CO₂ per unit (offset by renewable energy)',
    waterUsage: '15L per unit',
    recycledContent: '40% recycled aluminum and steel',
    supplyChainSteps: [
      { step: 'Metal Recycling', location: 'South Korea', date: '2024-08-10', verified: true },
      { step: 'Blade Manufacturing', location: 'Manila, Philippines', date: '2024-09-15', verified: true },
      { step: 'Component Assembly', location: 'Manila, Philippines', date: '2024-09-28', verified: true },
      { step: 'Performance Testing', location: 'Manila, Philippines', date: '2024-10-02', verified: true }
    ]
  },
  'hemp-fabric': {
    productId: 'hemp-fabric',
    productName: 'Hemp Fabric',
    gtin: '01234567891239',
    batchNumber: 'HEMP-2024-056',
    manufacturingDate: '2024-10-18',
    expiryDate: '2027-10-18',
    origin: 'Organic Hemp Farm, Bangladesh',
    certifications: ['OEKO-TEX Standard 100', 'USDA Organic', 'Vegan'],
    carbonFootprint: '1.2 kg CO₂ per unit',
    waterUsage: '18L per unit (95% less than cotton)',
    recycledContent: '10% recycled hemp fiber',
    supplyChainSteps: [
      { step: 'Hemp Cultivation', location: 'Rajshahi, Bangladesh', date: '2024-07-20', verified: true },
      { step: 'Fiber Extraction', location: 'Dhaka, Bangladesh', date: '2024-08-25', verified: true },
      { step: 'Spinning & Weaving', location: 'Dhaka, Bangladesh', date: '2024-09-30', verified: true },
      { step: 'Fabric Finishing', location: 'Dhaka, Bangladesh', date: '2024-10-18', verified: true }
    ]
  },
  'mushroom-packaging': {
    productId: 'mushroom-packaging',
    productName: 'Mushroom Packaging',
    gtin: '01234567891240',
    batchNumber: 'MUSH-2024-071',
    manufacturingDate: '2024-10-22',
    expiryDate: '2025-10-22',
    origin: 'GreenPackaging Innovations, Taiwan',
    certifications: ['Cradle to Cradle', '100% Compostable', 'USDA BioPreferred'],
    carbonFootprint: '0.3 kg CO₂ per unit (carbon negative)',
    waterUsage: '5L per unit',
    recycledContent: '0% (grown from agricultural waste)',
    supplyChainSteps: [
      { step: 'Agricultural Waste Collection', location: 'Central Taiwan', date: '2024-10-01', verified: true },
      { step: 'Mycelium Inoculation', location: 'Taipei, Taiwan', date: '2024-10-08', verified: true },
      { step: 'Growth & Molding', location: 'Taipei, Taiwan', date: '2024-10-15', verified: true },
      { step: 'Drying & Packaging', location: 'Taipei, Taiwan', date: '2024-10-22', verified: true }
    ]
  },
  'water-filters': {
    productId: 'water-filters',
    productName: 'Advanced Water Filters',
    gtin: '01234567891241',
    batchNumber: 'FILT-2024-034',
    manufacturingDate: '2024-10-10',
    expiryDate: '2027-10-10',
    origin: 'CleanWater Technologies, South Korea',
    certifications: ['NSF/ANSI 42 & 53', 'WQA Gold Seal', 'Lead-Free'],
    carbonFootprint: '1.2 kg CO₂ per unit',
    waterUsage: '10L per unit',
    recycledContent: '35% recycled plastic housing',
    supplyChainSteps: [
      { step: 'Carbon Block Production', location: 'Busan, South Korea', date: '2024-09-15', verified: true },
      { step: 'Membrane Manufacturing', location: 'Seoul, South Korea', date: '2024-09-25', verified: true },
      { step: 'Filter Assembly', location: 'Seoul, South Korea', date: '2024-10-10', verified: true },
      { step: 'Quality & Safety Testing', location: 'Seoul, South Korea', date: '2024-10-12', verified: true }
    ]
  },
  'ocean-plastic-pellets': {
    productId: 'ocean-plastic-pellets',
    productName: 'Ocean Plastic Pellets',
    gtin: '01234567891242',
    batchNumber: 'OCEAN-2024-015',
    manufacturingDate: '2024-10-08',
    expiryDate: '2029-10-08',
    origin: 'OceanPlastic Recyclers, Australia',
    certifications: ['Ocean Bound Plastic', 'GRS Certified', 'Carbon Neutral'],
    carbonFootprint: '1.3 kg CO₂ per unit (saves 4.5 kg from virgin plastic)',
    waterUsage: '30L per unit (cleaning process)',
    recycledContent: '100% ocean-recovered plastic',
    supplyChainSteps: [
      { step: 'Ocean Plastic Collection', location: 'Pacific Ocean Coastal Areas', date: '2024-08-20', verified: true },
      { step: 'Sorting & Cleaning', location: 'Perth, Australia', date: '2024-09-10', verified: true },
      { step: 'Pelletization', location: 'Perth, Australia', date: '2024-10-08', verified: true },
      { step: 'Quality Verification', location: 'Perth, Australia', date: '2024-10-10', verified: true }
    ]
  },
  'recycled-polyester': {
    productId: 'recycled-polyester',
    productName: 'Recycled Polyester',
    gtin: '01234567891243',
    batchNumber: 'RPET-2024-092',
    manufacturingDate: '2024-10-16',
    expiryDate: '2029-10-16',
    origin: 'EarthFirst Textiles, Bangladesh',
    certifications: ['GRS', 'OEKO-TEX', 'Recycled Content Standard'],
    carbonFootprint: '2.5 kg CO₂ per unit (75% less than virgin polyester)',
    waterUsage: '28L per unit',
    recycledContent: '100% post-consumer PET bottles',
    supplyChainSteps: [
      { step: 'PET Bottle Collection', location: 'Various Collection Centers', date: '2024-08-30', verified: true },
      { step: 'Bottle Processing & Flaking', location: 'Chittagong, Bangladesh', date: '2024-09-20', verified: true },
      { step: 'Fiber Extrusion', location: 'Dhaka, Bangladesh', date: '2024-10-05', verified: true },
      { step: 'Textile Production', location: 'Dhaka, Bangladesh', date: '2024-10-16', verified: true }
    ]
  },
  'compost-solutions': {
    productId: 'compost-solutions',
    productName: 'Compost Solutions',
    gtin: '01234567891244',
    batchNumber: 'COMP-2024-067',
    manufacturingDate: '2024-10-20',
    expiryDate: '2026-04-20',
    origin: 'NatureHarvest Organics, Thailand',
    certifications: ['OMRI Listed', 'EU Organic', 'Regenerative Organic Certified'],
    carbonFootprint: '0.5 kg CO₂ per unit (carbon sequestering)',
    waterUsage: '40L per unit',
    recycledContent: '100% organic waste materials',
    supplyChainSteps: [
      { step: 'Organic Waste Collection', location: 'Chiang Mai Region, Thailand', date: '2024-09-01', verified: true },
      { step: 'Composting Process', location: 'Chiang Mai, Thailand', date: '2024-09-15', verified: true },
      { step: 'Maturation & Testing', location: 'Chiang Mai, Thailand', date: '2024-10-10', verified: true },
      { step: 'Final Processing & Packaging', location: 'Chiang Mai, Thailand', date: '2024-10-20', verified: true }
    ]
  },
  'self-healing-materials': {
    productId: 'self-healing-materials',
    productName: 'Self-Healing Materials',
    gtin: '01234567891245',
    batchNumber: 'SMART-2024-041',
    manufacturingDate: '2024-10-14',
    expiryDate: '2034-10-14',
    origin: 'SmartMaterials Inc., China',
    certifications: ['ISO 14001', 'RoHS', 'Innovation Award 2024'],
    carbonFootprint: '2.2 kg CO₂ per unit',
    waterUsage: '20L per unit',
    recycledContent: '20% recycled polymers',
    supplyChainSteps: [
      { step: 'Polymer Synthesis', location: 'Shenzhen, China', date: '2024-09-10', verified: true },
      { step: 'Microcapsule Integration', location: 'Shenzhen, China', date: '2024-09-25', verified: true },
      { step: 'Material Formation', location: 'Shenzhen, China', date: '2024-10-08', verified: true },
      { step: 'Performance Testing', location: 'Shenzhen, China', date: '2024-10-14', verified: true }
    ]
  }
}
