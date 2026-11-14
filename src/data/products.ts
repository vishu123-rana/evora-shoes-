import { Product, Coupon, Review } from '../types';
import heroShoeImage from '../assets/images/regenerated_image_1791177634545.png';
import sneakersCategoryImg from '../assets/images/evora_premium_sneakers_advertisement.png';
import sandalsCategoryImg from '../assets/images/evora_mens_sandals_comfort_in_every_step.png';
import walkingCategoryImg from '../assets/images/gemini_generated_image_r5rvafr5rvafr5rv.png';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'evo-01',
    name: 'EVORA Urban Runner',
    slug: 'evora-urban-runner',
    subtitle: 'Ultra-lightweight responsive city running shoe',
    category: 'Running Shoes',
    gender: 'men',
    ageGroup: 'adults',
    collection: 'Active Performance',
    originalPrice: 5499,
    discountedPrice: 3849,
    discountPercent: 30,
    rating: 4.8,
    reviewsCount: 246,
    inStock: true,
    stockCount: 42,
    isBestSeller: true,
    isTrending: true,
    colors: [
      { name: 'Pure White & Slate', hex: '#E2E8F0' },
      { name: 'Stealth Onyx', hex: '#18181B' },
      { name: 'Cobalt Pulse', hex: '#1E3A8A' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    image: heroShoeImage,
    gallery: [
      heroShoeImage,
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The EVORA Urban Runner redefines daily propulsion. Constructed with our proprietary Aeroknit breathable mesh and high-rebound CloudFoam midsole, it offers explosive energy return whether you are conquering your morning 10K or navigating high-traffic transit corridors.',
    features: [
      'Aeroknit breathable engineered mesh upper with targeted flex zones',
      'CloudFoam dual-density midsole absorbs 94% of heel strike impact',
      'Continental-grade rubber outsole traction for dry & wet asphalt',
      'Reflective 3M heel accents for evening road safety'
    ],
    materials: {
      upper: '100% Recycled Polyester engineered mesh',
      lining: 'Breathable moisture-wicking micro-mesh',
      insole: 'Anatomical OrthoLite® Eco foam with arch support',
      outsole: 'EVORA High-Traction Carbon Rubber'
    },
    careGuide: 'Remove loose dirt with a soft brush. Hand clean with mild soapy water and let air dry away from direct heat.'
  },
  {
    id: 'evo-02',
    name: 'EVORA StreetFlex',
    slug: 'evora-streetflex',
    subtitle: 'Low-profile minimalist retro skate and street sneaker',
    category: 'Sneakers',
    gender: 'unisex',
    ageGroup: 'teens',
    collection: 'Urban Street',
    originalPrice: 4299,
    discountedPrice: 2999,
    discountPercent: 30,
    rating: 4.7,
    reviewsCount: 182,
    inStock: true,
    stockCount: 35,
    isNewArrival: true,
    isTrending: true,
    colors: [
      { name: 'Chalk White & Raw Gum', hex: '#F4F4F5' },
      { name: 'Vintage Olive', hex: '#3F4E4F' },
      { name: 'Triple Black', hex: '#111827' }
    ],
    sizes: [5, 6, 7, 8, 9, 10, 11],
    image: sneakersCategoryImg,
    gallery: [
      sneakersCategoryImg,
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Effortlessly cool and built for street agility. The EVORA StreetFlex pairs premium suede overlays with durable canvas and a vulcanized natural gum cupsole that hugs the ground for optimal boardfeel and walking stability.',
    features: [
      'Genuine split-suede toe and heel guards',
      'Vulcanized honeycomb gum outsole for ultra-grip',
      'Reinforced double-stitched stress points',
      'Padded collar and tongue for friction-free all-day wear'
    ],
    materials: {
      upper: 'Top-grain suede & heavy-duty organic canvas',
      lining: 'Soft cotton drill',
      insole: 'Cushioned EVA removable sockliner',
      outsole: '100% Natural vulcanized rubber'
    },
    careGuide: 'Treat suede with protector spray before first wear. Use a specialized suede eraser for scuffs.'
  },
  {
    id: 'evo-03',
    name: 'EVORA Classic Court',
    slug: 'evora-classic-court',
    subtitle: 'Heritage minimalist leather tennis sneaker',
    category: 'Sneakers',
    gender: 'unisex',
    ageGroup: 'adults',
    collection: 'Core',
    originalPrice: 5999,
    discountedPrice: 4199,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 310,
    inStock: true,
    stockCount: 50,
    isBestSeller: true,
    colors: [
      { name: 'Pristine White / Forest Green', hex: '#FFFFFF' },
      { name: 'Off-White / Tan Suede', hex: '#E7E5E4' },
      { name: 'Monochrome Black', hex: '#18181B' }
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An enduring testament to understated elegance. The Classic Court is tailored from buttery-soft Napa calfskin leather with hand-finished edges and a clean, unadorned silhouette that transitions from weekend brunch to tailored trousers.',
    features: [
      'Hand-selected full-grain Napa leather that develops a rich patina',
      'Stitched cupsole construction for longevity that resists de-lamination',
      'Subtle debossed gold-foil EVORA insignia at the heel',
      'Waxed cotton flat laces with brushed metal aglets'
    ],
    materials: {
      upper: 'Supple Italian-tanned calfskin leather',
      lining: 'Ultra-soft calf leather interior',
      insole: 'Ergonomic dual-density memory foam insole',
      outsole: 'Non-marking Italian Margom-grade rubber'
    },
    careGuide: 'Wipe with damp cloth and apply neutral leather cream every 3 months to preserve softness.'
  },
  {
    id: 'evo-04',
    name: 'EVORA AirWalk',
    slug: 'evora-airwalk',
    subtitle: 'Featherlight lifestyle walking sneaker with cloud cushioning',
    category: 'Walking Shoes',
    gender: 'women',
    ageGroup: 'adults',
    collection: 'Cloud Walk',
    originalPrice: 4799,
    discountedPrice: 3299,
    discountPercent: 31,
    rating: 4.8,
    reviewsCount: 164,
    inStock: true,
    stockCount: 28,
    isTrending: true,
    colors: [
      { name: 'Rose Dust & Cashmere', hex: '#E7CBCB' },
      { name: 'Mist Grey', hex: '#D1D5DB' },
      { name: 'Midnight Navy', hex: '#1E293B' }
    ],
    sizes: [5, 6, 7, 8, 9, 10],
    image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Weighing just 195 grams, the EVORA AirWalk is engineered for those who spend hours on their feet. The featherlight stretch weave upper accommodates natural foot expansion while the air-cushioned heel cradle relieves pressure on joints.',
    features: [
      'Seamless 3D knit upper prevents friction and blisters',
      'Visible Air-Pod heel chamber absorbs continuous repetitive shocks',
      'Slip-on sock collar with supportive integrated lace harness',
      'Machine washable on delicate cycle'
    ],
    materials: {
      upper: 'Engineered stretch filament knit',
      lining: 'Soft anti-microbial textile',
      insole: 'High-rebound cloud foam cushion',
      outsole: 'Ultra-light blown EVA with rubber pods'
    },
    careGuide: 'Machine wash in a mesh bag on delicate cycle with cold water. Dry flat away from direct sunlight.'
  },
  {
    id: 'evo-05',
    name: 'EVORA Motion Pro',
    slug: 'evora-motion-pro',
    subtitle: 'High-performance multi-sport and cross-training shoe',
    category: 'Training Shoes',
    gender: 'men',
    ageGroup: 'adults',
    collection: 'Active Performance',
    originalPrice: 6299,
    discountedPrice: 4399,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 195,
    inStock: true,
    stockCount: 30,
    isNewArrival: false,
    colors: [
      { name: 'Acid Volt & Charcoal', hex: '#334155' },
      { name: 'Glacier Silver', hex: '#CBD5E1' },
      { name: 'Solar Crimson', hex: '#991B1B' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Engineered for lateral cuts, box jumps, sprints, and HIIT workouts. The Motion Pro features a wide stable heel base, TPU sidewall stabilizers to prevent rollover, and a grippy omnidirectional tread.',
    features: [
      'Lateral TPU cage locks the midfoot securely during aggressive cuts',
      'Reinforced toe bumper for burpee and rope climb durability',
      'Flat wide heel platform generates maximum power from the ground',
      'Dual-zone cushioning: firm in the heel, springy in the forefoot'
    ],
    materials: {
      upper: 'Ripstop ballistic mesh with molded TPU overlays',
      lining: 'Padded synthetic sport mesh',
      insole: 'Performance response polyurethane',
      outsole: 'Multi-directional non-slip grip rubber'
    },
    careGuide: 'Wipe down after workouts. Air out in a ventilated area.'
  },
  {
    id: 'evo-06',
    name: 'EVORA Daily Comfort',
    slug: 'evora-daily-comfort',
    subtitle: 'Ergonomic slip-on shoe for easy daily movement',
    category: 'Slip-ons',
    gender: 'unisex',
    ageGroup: 'seniors',
    collection: 'Cloud Walk',
    originalPrice: 3999,
    discountedPrice: 2799,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 342,
    inStock: true,
    stockCount: 65,
    isBestSeller: true,
    colors: [
      { name: 'Warm Taupe', hex: '#A8A29E' },
      { name: 'Charcoal Heather', hex: '#4B5563' },
      { name: 'Navy Dusk', hex: '#1E293B' }
    ],
    sizes: [5, 6, 7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Designed in consultation with orthopedic specialists, the EVORA Daily Comfort offers hands-free step-in design, generous toe box width to eliminate pinching, and gentle arch elevation tailored for mature feet.',
    features: [
      'Step-in rebound heel counter allows hands-free slip on without bending',
      'Extra-wide toe box accommodates bunions and sensitive joints',
      'Shock-absorbing sole reduces strain on knees and lower back',
      'Textured anti-skid rubber sole prevents slips on wet tile'
    ],
    materials: {
      upper: 'Elastic breathable woven knit with flexible collar',
      lining: 'Seamless bamboo-blend ultra-soft fabric',
      insole: 'Podiatrist-designed memory foam arch cushion',
      outsole: 'Anti-slip grooved lightweight EVA sole'
    },
    careGuide: 'Gentle hand wash. Keep dry and store in a cool dry area.'
  },
  {
    id: 'evo-07',
    name: 'EVORA Prime Leather',
    slug: 'evora-prime-leather',
    subtitle: 'Handcrafted full-grain Oxford formal dress shoe',
    category: 'Formal Shoes',
    gender: 'men',
    ageGroup: 'adults',
    collection: 'Tailored Heritage',
    originalPrice: 7999,
    discountedPrice: 5599,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 124,
    inStock: true,
    stockCount: 18,
    isLimitedEdition: true,
    colors: [
      { name: 'Rich Cognac Brown', hex: '#78350F' },
      { name: 'Classic Black Derby', hex: '#0F172A' },
      { name: 'Oxblood Mahogany', hex: '#4C0519' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The pinnacle of sartorial footwear. Hand-burnished by master artisans from full-grain vegetable-tanned leather, the Prime Leather Oxford combines Blake-stitched flexibility with timeless boardroom poise.',
    features: [
      'Hand-patinated vegetable-tanned European calf leather',
      'Traditional closed-lacing Oxford silhouette with chisel toe',
      'Hand-carved stacked leather heel with rubber quarter tap',
      'Concealed elastic tongue gussets for unexpected modern comfort'
    ],
    materials: {
      upper: '100% Full-Grain Burnished Calfskin',
      lining: 'Supple natural glove leather',
      insole: 'Cork filler layer that molds to your unique footbed',
      outsole: 'Blake-stitched channeled leather sole with rubber insert'
    },
    careGuide: 'Buff regularly with natural beeswax shoe polish. Always use cedar shoe trees after wearing.'
  },
  {
    id: 'evo-08',
    name: 'EVORA Trail X',
    slug: 'evora-trail-x',
    subtitle: 'All-terrain rugged outdoor trail runner with rock protection',
    category: 'Sports Shoes',
    gender: 'men',
    ageGroup: 'adults',
    collection: 'Active Performance',
    originalPrice: 6999,
    discountedPrice: 4899,
    discountPercent: 30,
    rating: 4.8,
    reviewsCount: 153,
    inStock: true,
    stockCount: 22,
    isTrending: true,
    colors: [
      { name: 'Desert Moss & Black', hex: '#4A5D4E' },
      { name: 'Granite & Bright Orange', hex: '#52525B' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Built to tame loose gravel, steep inclines, and mud trails. The Trail X features 5mm deep multi-angle chevron lugs, an integrated rock plate under the ball of the foot, and water-repellent mudguards.',
    features: [
      'Vibram-inspired deep 5mm multi-directional claw lugs',
      'Flexible ESS rock plate shields against sharp stones',
      'Gusseted tongue keeps debris, dirt, and water out',
      'Quick-pull toggle lacing system with lace pocket'
    ],
    materials: {
      upper: 'Abrasion-resistant ballistic nylon with TPU mudguard',
      lining: 'Water-resistant HydroShield breathable membrane',
      insole: 'Dual-density high resilience EVA',
      outsole: 'Ultra-durable StickyGrip rubber compound'
    },
    careGuide: 'Rinse off mud under cold tap immediately after heavy trail runs. Let air dry completely.'
  },
  {
    id: 'evo-09',
    name: 'EVORA CloudStep',
    slug: 'evora-cloudstep',
    subtitle: 'Zero-gravity everyday cushioned sneaker',
    category: 'Casual Shoes',
    gender: 'women',
    ageGroup: 'adults',
    collection: 'Cloud Walk',
    originalPrice: 4999,
    discountedPrice: 3499,
    discountPercent: 30,
    rating: 4.8,
    reviewsCount: 278,
    inStock: true,
    stockCount: 40,
    isBestSeller: true,
    colors: [
      { name: 'Oatmeal & Cream', hex: '#E6E2DD' },
      { name: 'Soft Sage', hex: '#9CA3AF' },
      { name: 'Shadow Black', hex: '#1F2937' }
    ],
    sizes: [5, 6, 7, 8, 9, 10],
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Feels like walking on clouds. The CloudStep combines a sculpted soft midsole with an unlined suede-and-mesh upper for barefoot softness. Perfect for long weekend city strolls and airport travel.',
    features: [
      'Zero-gravity foam midsole with deep horizontal flex grooves',
      'Padded anatomical heel cup prevents slipping',
      'Featherweight construction (under 210g)',
      'Breathable perforations along side quarters'
    ],
    materials: {
      upper: 'Silky microfiber suede and open-cell mesh',
      lining: 'Soft French terry cloth',
      insole: 'CloudWalk high-density memory foam',
      outsole: 'Lightweight blown EVA'
    },
    careGuide: 'Spot clean with foaming cleaner and a clean microfiber towel.'
  },
  {
    id: 'evo-10',
    name: 'EVORA Active One',
    slug: 'evora-active-one',
    subtitle: 'Versatile gym, studio and active lifestyle shoe',
    category: 'Training Shoes',
    gender: 'unisex',
    ageGroup: 'teens',
    collection: 'Active Performance',
    originalPrice: 4599,
    discountedPrice: 3199,
    discountPercent: 30,
    rating: 4.7,
    reviewsCount: 142,
    inStock: true,
    stockCount: 36,
    isSale: true,
    colors: [
      { name: 'Sonic Blue & White', hex: '#2563EB' },
      { name: 'Space Grey', hex: '#64748B' },
      { name: 'Cyber Neon Lime', hex: '#84CC16' }
    ],
    sizes: [5, 6, 7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The everyday workout powerhouse. From cardio machines to bodyweight circuits, the Active One delivers springy bounce and dependable balance in a vibrant athletic package.',
    features: [
      'Dynamic bounce rebound foam core',
      'Breathable engineered jacquard knit',
      'Molded heel counter for locked-in support',
      'Non-marking indoor gym safe rubber sole'
    ],
    materials: {
      upper: 'Performance engineered jacquard textile',
      lining: 'Breathable jersey',
      insole: 'Molded EVA athletic footbed',
      outsole: 'Abrasion-resistant compound rubber'
    },
    careGuide: 'Air dry in shade. Avoid machine drying.'
  },
  {
    id: 'evo-11',
    name: 'EVORA Classic Loafer',
    slug: 'evora-classic-loafer',
    subtitle: 'Hand-sewn penny loafer with flexible dress comfort',
    category: 'Formal Shoes',
    gender: 'men',
    ageGroup: 'adults',
    collection: 'Tailored Heritage',
    originalPrice: 6499,
    discountedPrice: 4549,
    discountPercent: 30,
    rating: 4.8,
    reviewsCount: 112,
    inStock: true,
    stockCount: 16,
    isLimitedEdition: false,
    colors: [
      { name: 'Espresso Brown Suede', hex: '#451A03' },
      { name: 'Polished Black Boxcalf', hex: '#171717' }
    ],
    sizes: [7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Classic Ivy-League heritage meeting contemporary sole technology. The EVORA Classic Loafer features traditional hand-stitched beefroll moccasin styling mounted atop a cushioned flex sole.',
    features: [
      'Traditional hand-stitched apron and penny saddle',
      'Unlined forefoot for glove-like mold around your foot',
      'Concealed arch support cushion for 12-hour wear',
      'Leather outsole with injected rubber traction islands'
    ],
    materials: {
      upper: 'Fine Italian calfskin or water-repellent suede',
      lining: 'Soft leather heel lining',
      insole: 'Full-length cushioned leather insole',
      outsole: 'Hand-finished leather & rubber composite'
    },
    careGuide: 'Store with wooden shoe trees. Condition suede with dedicated suede reviver.'
  },
  {
    id: 'evo-12',
    name: 'EVORA Retro High 85',
    slug: 'evora-retro-high-85',
    subtitle: 'Iconic retro basketball high-top sneaker in Chicago leather colorway',
    category: 'Sneakers',
    gender: 'unisex',
    ageGroup: 'adults',
    collection: 'Urban Street',
    originalPrice: 5299,
    discountedPrice: 3699,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 342,
    inStock: true,
    stockCount: 45,
    isBestSeller: true,
    isTrending: true,
    isNewArrival: true,
    colors: [
      { name: 'Chicago Varsity Red & Black', hex: '#DC2626' },
      { name: 'Royal Court Blue & Black', hex: '#1D4ED8' },
      { name: 'Pine Forest Green & Black', hex: '#15803D' },
      { name: 'Shadow Onyx Grey & Black', hex: '#374151' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Inspiradas en la leyenda del asfalto y las canchas. Las EVORA Retro High 85 revolucionaron el estilo urbano combinando cuero flor de primera calidad, cuello acolchado de alta sujeción para el tobillo, puntera perforada transpirable y suela cosida con punto de pivote.',
    features: [
      'High-cut padded collar for maximum ankle lock & impact stability',
      'Laser-punched toe perforations for all-day ventilation',
      'Dual-compound stitched rubber cupsole with pivot circle traction',
      'Includes 2 sets of premium flat laces (Varsity Red & Stealth Black)'
    ],
    materials: {
      upper: 'Full-grain action leather & textured collar mesh',
      lining: 'Breathable cushioned foam micro-mesh',
      insole: 'Orthopedic dynamic rebound latex bed',
      outsole: 'EVORA High-Traction Carbon Rubber with pivot point'
    },
    careGuide: 'Clean with damp cloth and leather cleaning solution.'
  },
  {
    id: 'evo-13',
    name: 'EVORA Kids Sprint',
    slug: 'evora-kids-sprint',
    subtitle: 'Lightweight playground running shoe with hook-and-loop strap',
    category: 'Kids Shoes',
    gender: 'kids',
    ageGroup: 'kids',
    collection: 'Active Performance',
    originalPrice: 2899,
    discountedPrice: 1999,
    discountPercent: 31,
    rating: 4.9,
    reviewsCount: 220,
    inStock: true,
    stockCount: 55,
    isBestSeller: true,
    colors: [
      { name: 'Electric Royal & Neon', hex: '#1D4ED8' },
      { name: 'Bubblegum Pink & Mint', hex: '#F472B6' },
      { name: 'Storm Grey & Orange', hex: '#64748B' }
    ],
    sizes: [1, 2, 3, 4, 5, 12, 13],
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Engineered specifically for active developing feet. The Kids Sprint features our FlexGroove natural sole that bends with every hop, skip, and jump, plus an easy-close Velcro strap so kids can dress independently.',
    features: [
      'Dual hook-and-loop Velcro strap for quick on and off',
      'Reinforced rubber toe cap shields against scuffs and kicks',
      'Ultra-flexible natural movement sole promotes foot health',
      'Removable insole with "Fit Check" indicator for growing feet'
    ],
    materials: {
      upper: 'Durable breathable mesh with synthetic scuff guards',
      lining: 'Soft anti-irritation cotton mesh',
      insole: 'Cushioned antibacterial EVA footbed',
      outsole: 'Non-marking slip-resistant flexible rubber'
    },
    careGuide: 'Machine washable on cold. Air dry completely.'
  },
  {
    id: 'evo-14',
    name: 'EVORA Junior Flex',
    slug: 'evora-junior-flex',
    subtitle: 'Flexible school & everyday sneaker for boys and girls',
    category: 'Kids Shoes',
    gender: 'kids',
    ageGroup: 'kids',
    collection: 'Core',
    originalPrice: 2699,
    discountedPrice: 1899,
    discountPercent: 30,
    rating: 4.8,
    reviewsCount: 168,
    inStock: true,
    stockCount: 48,
    isTrending: false,
    colors: [
      { name: 'All-Day Clean White', hex: '#FFFFFF' },
      { name: 'School Black', hex: '#18181B' },
      { name: 'Navy & Sky Blue', hex: '#1E3A8A' }
    ],
    sizes: [1, 2, 3, 4, 5, 11, 12, 13],
    image: 'https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The ultimate versatile shoe for school, sports day, and weekend adventures. Built with water-resistant easy-wipe synthetic leather and elastic laces with a secure top strap.',
    features: [
      'Easy-wipe clean upper survives muddy playgrounds',
      'Elastic faux laces with single quick-strap closure',
      'Padded collar prevents chafing on active ankles',
      'Conforms to school dress codes in Black and White editions'
    ],
    materials: {
      upper: 'Scuff-resistant synthetic leather',
      lining: 'Breathable foam mesh',
      insole: 'High-cushion EVA sockliner',
      outsole: 'Flexible grooved non-marking rubber'
    },
    careGuide: 'Wipe clean with a damp soapy cloth. Takes only 30 seconds.'
  },
  {
    id: 'evo-15',
    name: 'EVORA Mini Runner',
    slug: 'evora-mini-runner',
    subtitle: 'Toddler first-steps trainer with ultra-soft sole',
    category: 'Kids Shoes',
    gender: 'kids',
    ageGroup: 'kids',
    collection: 'Cloud Walk',
    originalPrice: 2299,
    discountedPrice: 1599,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 198,
    inStock: true,
    stockCount: 38,
    isNewArrival: false,
    colors: [
      { name: 'Pastel Sunshine Yellow', hex: '#FBBF24' },
      { name: 'Soft Sky & Cloud', hex: '#93C5FD' },
      { name: 'Lilac Mist', hex: '#C084FC' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Created for earliest steps and playful milestones. The Mini Runner features an extra-wide rounded toe box allowing tiny toes to spread naturally for balance.',
    features: [
      'Zero-drop flat sole supports natural balance development',
      'Extra-wide opening with dual stretch gussets',
      'Non-slip grip dots on ultra-soft flexible rubber sole',
      'Breathable organic cotton lining keeps tiny feet fresh'
    ],
    materials: {
      upper: 'Soft breathable cotton canvas & micro-suede',
      lining: '100% Organic certified cotton',
      insole: 'Gentle flat cushioned insole',
      outsole: 'Natural flexible baby-safe rubber'
    },
    careGuide: 'Hand wash with mild baby soap. Air dry.'
  },
  {
    id: 'evo-16',
    name: 'EVORA Comfort Walk',
    slug: 'evora-comfort-walk',
    subtitle: 'Supportive walking shoe with heel-impact shock absorption',
    category: 'Walking Shoes',
    gender: 'unisex',
    ageGroup: 'seniors',
    collection: 'Cloud Walk',
    originalPrice: 4299,
    discountedPrice: 2999,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 318,
    inStock: true,
    stockCount: 52,
    isBestSeller: true,
    colors: [
      { name: 'Slate Grey & Silver', hex: '#6B7280' },
      { name: 'Deep Espresso', hex: '#3E2723' },
      { name: 'Pure Black', hex: '#171717' }
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1588117260148-b47818741c74?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Engineered specifically for active walkers and seniors who demand joint protection. Our multi-density sole reduces knee vibration by 40% while the textured tread provides sure-footed traction on any surface.',
    features: [
      'Gel-infused heel cushion diffuses walking shock',
      'Padded tongue and memory-foam ankle collar',
      'Roomy instep design for effortless slip-on experience',
      'High-traction rubber tread tested on slick marble and ceramic tiles'
    ],
    materials: {
      upper: 'Water-resistant breathable nubuck & technical mesh',
      lining: 'Soft brushed anti-friction textile',
      insole: 'Podiatric orthotic insole with metatarsal pad',
      outsole: 'Shock-absorbing dual EVA with anti-slip rubber pods'
    },
    careGuide: 'Brush off dirt with a soft shoe brush. Keep in a dry place.'
  },
  {
    id: 'evo-17',
    name: 'EVORA Glide Breeze',
    slug: 'evora-glide-breeze',
    subtitle: 'Breathable knit summer slip-on walking loafer',
    category: 'Casual Shoes',
    gender: 'women',
    ageGroup: 'adults',
    collection: 'Cloud Walk',
    originalPrice: 3799,
    discountedPrice: 2599,
    discountPercent: 32,
    rating: 4.7,
    reviewsCount: 145,
    inStock: true,
    stockCount: 30,
    isSale: true,
    colors: [
      { name: 'Sand Dune Beige', hex: '#D7CCC8' },
      { name: 'Blush Coral', hex: '#FFCCBC' },
      { name: 'Ivory White', hex: '#FAFAFA' }
    ],
    sizes: [5, 6, 7, 8, 9],
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Light as air and cool as a sea breeze. The Glide Breeze combines open-weave breathable stitching with a soft collapsible heel counter, letting you wear it as a traditional slip-on or casual mule slide.',
    features: [
      'Convertible collapsible heel counter for mule-slide wear',
      'Ultra-breathable micro-perforated knit upper',
      'Anatomical arch support inside a featherlight silhouette',
      'Washable removable insole'
    ],
    materials: {
      upper: 'Breathable elastic engineered weave',
      lining: 'Bamboo cooling fiber',
      insole: 'Memory foam with odor-control treatment',
      outsole: 'Featherlight molded phylon sole'
    },
    careGuide: 'Hand rinse with cold water. Air dry in the shade.'
  },
  {
    id: 'evo-18',
    name: 'EVORA Chelsea Luxe',
    slug: 'evora-chelsea-luxe',
    subtitle: 'Timeless pull-on leather ankle boot with Goodyear welt look',
    category: 'Boots',
    gender: 'men',
    ageGroup: 'adults',
    collection: 'Tailored Heritage',
    originalPrice: 8499,
    discountedPrice: 5999,
    discountPercent: 29,
    rating: 4.9,
    reviewsCount: 96,
    inStock: true,
    stockCount: 15,
    isLimitedEdition: true,
    colors: [
      { name: 'Dark Chestnut Brown', hex: '#3E2723' },
      { name: 'Midnight Onyx Leather', hex: '#121212' },
      { name: 'Desert Suede Tan', hex: '#BCAAA4' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A sartorial staple built to last a decade. Handcrafted from top-grade oiled pull-up leather that showcases rich natural character, featuring heavy-duty elastic side gussets and reinforced nylon pull tabs.',
    features: [
      'Full-grain oiled leather that resists weather and scratches',
      'Twin elastic side gores for effortless pull-on entrance',
      'Cushioned leather footbed absorbs pavement impact',
      'Durable Commando lug rubber sole provides weather-proof grip'
    ],
    materials: {
      upper: '100% Top-Grain Oiled Pull-Up Cowhide',
      lining: 'Soft drum-dyed pigskin leather',
      insole: 'Full-length leather footbed with poron shock pad',
      outsole: 'Lugged storm-welded rubber outsole'
    },
    careGuide: 'Apply mink oil or leather wax before winter. Brush away dry mud promptly.'
  },
  {
    id: 'evo-19',
    name: 'EVORA Zenith Derby',
    slug: 'evora-zenith-derby',
    subtitle: 'Contemporary hybrid dress shoe with athletic sneaker sole',
    category: 'Formal Shoes',
    gender: 'men',
    ageGroup: 'adults',
    collection: 'Tailored Heritage',
    originalPrice: 6999,
    discountedPrice: 4899,
    discountPercent: 30,
    rating: 4.8,
    reviewsCount: 132,
    inStock: true,
    stockCount: 20,
    isTrending: true,
    colors: [
      { name: 'Black Box Calf & White Sole', hex: '#18181B' },
      { name: 'Burnished Tan & Cream Sole', hex: '#854D0E' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1617606002779-51d866bdd1d1?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617606002779-51d866bdd1d1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The modern professional work shoe. The Zenith Derby marries an exquisite derby leather upper with a responsive high-density athletic sneaker sole, enabling all-day business travel without fatigue.',
    features: [
      'Refined 4-eyelet open-lacing derby pattern',
      'Sneaker-comfort EVA midsole disguised as a formal welt',
      'Padded tongue eliminates lace pressure across the instep',
      'Laser-etched non-slip tread for polished airport floors'
    ],
    materials: {
      upper: 'Full-grain polished calfskin',
      lining: 'Breathable calf leather lining',
      insole: 'Anatomical dual-density cushion',
      outsole: 'High-density athletic EVA and rubber compound'
    },
    careGuide: 'Condition leather with neutral wax. Clean white sole with damp eraser.'
  },
  {
    id: 'evo-20',
    name: 'EVORA Pace Marathon',
    slug: 'evora-pace-marathon',
    subtitle: 'Elite carbon-infused distance racing shoe for speed',
    category: 'Running Shoes',
    gender: 'unisex',
    ageGroup: 'adults',
    collection: 'Active Performance',
    originalPrice: 7999,
    discountedPrice: 5599,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    stockCount: 14,
    isLimitedEdition: true,
    colors: [
      { name: 'Fluorescent Solar Red', hex: '#EF4444' },
      { name: 'Hyper Teal & Black', hex: '#0D9488' }
    ],
    sizes: [7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Engineered for personal bests. A full-length curved composite carbon plate is sandwiched inside super-critical PEBA foam, propelling you forward with unmatched energy return at high speeds.',
    features: [
      'Embedded spoon-shaped carbon-infusion propulsion plate',
      'Super-critical PEBA nitrogen-infused foam provides 85% energy return',
      'Mono-mesh featherlight racing upper (weighs just 178g)',
      'Race-optimized micro-lug rubber outsole'
    ],
    materials: {
      upper: 'Ultra-thin translucent mono-mesh',
      lining: 'Minimalist friction-free collar pods',
      insole: 'Integrated perforated race footbed',
      outsole: 'Aerodynamic carbon rubber'
    },
    careGuide: 'Race day and speed work specialist shoe. Hand wipe only.'
  },
  {
    id: 'evo-21',
    name: 'EVORA Senior Ease Slip-on',
    slug: 'evora-senior-ease-slip-on',
    subtitle: 'Orthopedic comfort shoe with easy adjustable strap',
    category: 'Slip-ons',
    gender: 'unisex',
    ageGroup: 'seniors',
    collection: 'Cloud Walk',
    originalPrice: 3499,
    discountedPrice: 2449,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 290,
    inStock: true,
    stockCount: 44,
    isBestSeller: true,
    colors: [
      { name: 'Heather Charcoal', hex: '#4B5563' },
      { name: 'Desert Sand', hex: '#D1C7BD' },
      { name: 'Classic Black', hex: '#18181B' }
    ],
    sizes: [5, 6, 7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Trusted by seniors across the country. Featuring an easy touch-fasten strap that accommodates foot swelling through the day, a wide stable platform, and an extra-deep toe box.',
    features: [
      'Wide-opening adjustable touch-close fastener strap',
      'Medical-grade orthotic arch support with memory cushion',
      'Seamless interior prevents pressure sores and friction',
      'Ultra-stable slip-resistant rocker bottom outsole promotes natural gait'
    ],
    materials: {
      upper: 'Soft breathable stretch textile with microfiber trims',
      lining: 'Antimicrobial bamboo-fleece lining',
      insole: 'Multi-layer memory foam orthotic insole',
      outsole: 'Lightweight slip-resistant polyurethane'
    },
    careGuide: 'Wipe with warm damp cloth. Insole can be removed and hand-washed.'
  },
  {
    id: 'evo-22',
    name: 'EVORA Solstice Sandal',
    slug: 'evora-solstice-sandal',
    subtitle: 'Ergonomic cork-cushion leather slide for warm days',
    category: 'Sandals',
    gender: 'unisex',
    ageGroup: 'adults',
    collection: 'Core',
    originalPrice: 3299,
    discountedPrice: 2299,
    discountPercent: 30,
    rating: 4.8,
    reviewsCount: 167,
    inStock: true,
    stockCount: 32,
    isSale: false,
    colors: [
      { name: 'Oiled Nubuck Tan', hex: '#8D6E63' },
      { name: 'Onyx Black', hex: '#212121' }
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Effortless warm-weather freedom. The Solstice Sandal pairs an authentic anatomical cork-latex footbed lined in suede with double adjustable straps and antique brass buckles.',
    features: [
      'Natural cork and latex footbed molds to the exact contours of your foot',
      'Deep heel cup keeps natural padding directly under the heel bone',
      'Dual adjustable straps with corrosion-resistant brass hardware',
      'Lightweight EVA outsole cushions each step'
    ],
    materials: {
      upper: 'Genuine thick oiled nubuck leather',
      lining: 'Natural suede footbed cover',
      insole: 'Renewable natural cork & latex core',
      outsole: 'Shock-absorbing flexible EVA'
    },
    careGuide: 'Keep away from extreme heat. Treat cork edges with cork sealant once a year.'
  },
  {
    id: 'evo-23',
    name: 'EVORA Aero Court Pro',
    slug: 'evora-aero-court-pro',
    subtitle: 'High-traction indoor badminton, pickleball and court shoe',
    category: 'Sports Shoes',
    gender: 'unisex',
    ageGroup: 'teens',
    collection: 'Active Performance',
    originalPrice: 5199,
    discountedPrice: 3599,
    discountPercent: 31,
    rating: 4.8,
    reviewsCount: 139,
    inStock: true,
    stockCount: 24,
    isTrending: true,
    colors: [
      { name: 'White & Electric Blue', hex: '#3B82F6' },
      { name: 'Solar Lime & Black', hex: '#65A30D' }
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Designed specifically for wood and synthetic court surfaces. Non-marking gum rubber sole provides stop-and-go traction for rapid lateral shifts, rallies, and jump smashes.',
    features: [
      'Pure gum non-marking court outsole with herringbone pattern',
      'Lateral anti-torsion TPU bridge prevents ankle twists',
      'Padded heel counter absorbs rapid descent shock',
      'Ventilated side mesh keeps feet dry under intense matches'
    ],
    materials: {
      upper: 'Reinforced synthetic leather & breathable mesh',
      lining: 'Padded sport jersey',
      insole: 'Dual-density high impact insole',
      outsole: '100% Non-marking natural gum rubber'
    },
    careGuide: 'Use strictly for indoor court play to preserve the gum grip.'
  },
  {
    id: 'evo-24',
    name: 'EVORA Nomad Expedition Boot',
    slug: 'evora-nomad-expedition-boot',
    subtitle: 'Waterproof insulated outdoor hiking boot for cold climates',
    category: 'Boots',
    gender: 'men',
    ageGroup: 'adults',
    collection: 'Core',
    originalPrice: 8999,
    discountedPrice: 6299,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 110,
    inStock: true,
    stockCount: 19,
    isLimitedEdition: false,
    colors: [
      { name: 'Timberland Ochre Tan', hex: '#B45309' },
      { name: 'Alpine Charcoal & Red', hex: '#374151' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Constructed to withstand harsh mountainous terrain and monsoon downpours. The Nomad Expedition features a sealed seam waterproof bootie, rust-proof speed hooks, and heavy-duty ankle support.',
    features: [
      'EVORA DryShield 100% waterproof membrane keeps feet dry in water crossings',
      '200g Thinsulate-grade micro-insulation for cold weather comfort',
      'Durable rust-proof brass speed lacing hardware',
      'Self-cleaning lug outsole sheds mud and snow effortlessly'
    ],
    materials: {
      upper: 'Waterproof oiled full-grain leather & Cordura nylon',
      lining: 'DryShield waterproof breathable membrane',
      insole: 'Dual-density high impact polyurethane footbed',
      outsole: 'High-traction Vibram-grade carbon rubber compound'
    },
    careGuide: 'Scrub dried mud with stiff brush. Treat leather with waterproofing conditioner annually.'
  },
  {
    id: 'evo-25',
    name: 'EVORA PaceGlide Mesh Walker',
    slug: 'evora-paceglide-mesh-walker',
    subtitle: 'Lightweight breathable walking shoe with anatomical arch cradle',
    category: 'Walking Shoes',
    gender: 'men',
    ageGroup: 'adults',
    collection: 'Cloud Walk',
    originalPrice: 3999,
    discountedPrice: 2799,
    discountPercent: 30,
    rating: 4.8,
    reviewsCount: 142,
    inStock: true,
    stockCount: 38,
    isNewArrival: true,
    colors: [
      { name: 'Storm Grey & Sage', hex: '#4B5563' },
      { name: 'Deep Forest', hex: '#1E3A2F' },
      { name: 'Chalk White', hex: '#F8FAFC' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The EVORA PaceGlide Mesh Walker combines hyper-breathable engineered knit with a targeted arch-support bridge. Built to keep feet energized and cool during morning brisk walks and daily commutes.',
    features: [
      'High-permeability knitted vamp for continuous airflow',
      'Dynamic ArchBridge stabilizes natural pronation',
      'Beveled heel design absorbs ground strike impact',
      'Molded collar pillow prevents Achilles tendon chafing'
    ],
    materials: {
      upper: 'Engineered cooling mesh with TPU overlay accents',
      lining: 'Moisture-wicking athletic mesh',
      insole: 'Ergonomic EVA footbed with high-rebound heel pod',
      outsole: 'Non-marking high-abrasion rubber traction pads'
    },
    careGuide: 'Spot clean with mild soapy water. Remove insoles before air drying.'
  },
  {
    id: 'evo-26',
    name: 'EVORA Strider All-Day Cushion',
    slug: 'evora-strider-all-day-cushion',
    subtitle: 'Everyday cushioned walking shoe with anti-fatigue rebound',
    category: 'Walking Shoes',
    gender: 'unisex',
    ageGroup: 'adults',
    collection: 'Cloud Walk',
    originalPrice: 4599,
    discountedPrice: 3199,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 195,
    inStock: true,
    stockCount: 45,
    isTrending: true,
    colors: [
      { name: 'Charcoal Heather', hex: '#374151' },
      { name: 'Midnight Blue', hex: '#1E293B' },
      { name: 'Oatmeal Natural', hex: '#D6D3D1' }
    ],
    sizes: [5, 6, 7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Designed for effortless strides from sunrise to dusk. Features high-resilience EVORA CloudFoam midsole and reinforced padded heel collar to eliminate slippage and friction during 10,000+ daily steps.',
    features: [
      'Dual-layer CloudFoam midsole absorbs 45% more road vibration',
      'Padded tongue with gusseted stays prevents shifting',
      'Roomy anatomical toe box prevents bunion friction',
      'Reflective 3M heel tab for low-light morning walks'
    ],
    materials: {
      upper: 'Water-resistant micro-twill and suede overlays',
      lining: 'Ultra-soft brushed microfiber',
      insole: 'High-density memory foam orthotic bed',
      outsole: 'Lugged flex-groove anti-slip rubber'
    },
    careGuide: 'Wipe down with damp cloth. Use suede brush on trim accents.'
  },
  {
    id: 'evo-27',
    name: 'EVORA UltraWalk Ortho Step',
    slug: 'evora-ultrawalk-ortho-step',
    subtitle: 'Doctor-recommended orthopedic walking shoe for foot and back comfort',
    category: 'Walking Shoes',
    gender: 'women',
    ageGroup: 'adults',
    collection: 'Cloud Walk',
    originalPrice: 4999,
    discountedPrice: 3499,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 228,
    inStock: true,
    stockCount: 30,
    isBestSeller: true,
    colors: [
      { name: 'Blush Sand', hex: '#E2C2B9' },
      { name: 'Pure White & Silver', hex: '#F3F4F6' },
      { name: 'Matte Charcoal', hex: '#374151' }
    ],
    sizes: [5, 6, 7, 8, 9, 10],
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Engineered in consultation with physical therapists, the UltraWalk Ortho Step aligns the ankle, knee, and spine while walking. Built for nurses, teachers, and anyone on their feet 8+ hours a day.',
    features: [
      'Rigid heel counter holds the heel bone in neutral alignment',
      'Deep heel cup diffuses ground forces across the calcaneus',
      'Padded seamless interior gentle on diabetes-prone skin',
      'Rocker bottom sole gently guides foot roll and toe-off'
    ],
    materials: {
      upper: 'Breathable full stretch mesh and soft synthetic nubuck',
      lining: 'Antimicrobial silver-ion moisture control lining',
      insole: 'Podiatrist orthotic insole with metatarsal dome',
      outsole: 'Dual-density slip-resistant traction outsole'
    },
    careGuide: 'Hand wash with mild detergent, air dry in shade.'
  },
  {
    id: 'evo-28',
    name: 'EVORA Neo Court Streetwear',
    slug: 'evora-neo-court-streetwear',
    subtitle: 'Retro minimalist court silhouette with modern street aesthetics',
    category: 'Sneakers',
    gender: 'unisex',
    ageGroup: 'adults',
    collection: 'Urban Street',
    originalPrice: 5499,
    discountedPrice: 3799,
    discountPercent: 31,
    rating: 4.8,
    reviewsCount: 204,
    inStock: true,
    stockCount: 40,
    isNewArrival: true,
    colors: [
      { name: 'Off-White & Gum', hex: '#FAF5EE' },
      { name: 'Vintage Spruce', hex: '#2A4736' },
      { name: 'Onyx Monochrome', hex: '#18181B' }
    ],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Clean geometry meets low-profile court heritage. Premium nappa leather quarter panels accented by buttery suede toe caps and a honey gum outsole.',
    features: [
      'Hand-stitched 360-degree cupsole construction',
      'Perforated toe box for thermal ventilation',
      'Flat waxed cotton laces with brass aglets'
    ],
    materials: {
      upper: 'Full-grain calf leather and suede trims',
      lining: 'Breathable calfskin leather lining',
      insole: 'Cushioned leather-topped OrthoLite insole',
      outsole: '100% natural gum rubber cupsole'
    },
    careGuide: 'Clean with soft cloth and leather balm.'
  },
  {
    id: 'evo-29',
    name: 'EVORA Velocity Zoom Carbon',
    slug: 'evora-velocity-zoom-carbon',
    subtitle: 'Carbon-plate marathon racing shoe for explosive energy return',
    category: 'Running Shoes',
    gender: 'men',
    ageGroup: 'adults',
    collection: 'Active Performance',
    originalPrice: 9499,
    discountedPrice: 6999,
    discountPercent: 26,
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    stockCount: 22,
    isLimitedEdition: true,
    colors: [
      { name: 'Flame Red & Black', hex: '#EF4444' },
      { name: 'Volt Yellow', hex: '#EAB308' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Engineered for race day PRs. Features an ultra-stiff full-length curved carbon fiber propulsion plate suspended in supercritical PEBA foam.',
    features: [
      'Curved carbon fiber plate propels transition into every stride',
      'Supercritical PEBA foam delivers 87% energy return',
      'Translucent featherweight monomesh upper'
    ],
    materials: {
      upper: 'Ultra-thin translucent mono-filament weave',
      lining: 'Minimalist microfiber heel clutch',
      insole: 'Integrated perforated race insole',
      outsole: 'Laser-cut targeted blown rubber pods'
    },
    careGuide: 'Air dry only. Store away from moisture and direct sunlight.'
  },
  {
    id: 'evo-30',
    name: 'EVORA Riviera Slip Loafer',
    slug: 'evora-riviera-slip-loafer',
    subtitle: 'Relaxed Italian-style driving loafer for effortless leisure',
    category: 'Casual Shoes',
    gender: 'men',
    ageGroup: 'adults',
    collection: 'Core',
    originalPrice: 4699,
    discountedPrice: 3299,
    discountPercent: 30,
    rating: 4.8,
    reviewsCount: 162,
    inStock: true,
    stockCount: 35,
    colors: [
      { name: 'Camel Tan Suede', hex: '#C29B72' },
      { name: 'Navy Suede', hex: '#1E293B' }
    ],
    sizes: [7, 8, 9, 10, 11],
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Crafted for sunny weekend drives and coastal getaways. Tubolar moccasin construction with flexible split rubber pebble driving soles.',
    features: [
      'Hand-stitched moc-toe front seam',
      'Split pebble rubber driver sole extends up the heel',
      'Unlined suede construction for instant foot-contouring flexibility'
    ],
    materials: {
      upper: 'Water-repellent European split suede',
      lining: 'Genuine soft calfskin footbed',
      insole: 'Cushioned leather arch-support insole',
      outsole: 'Individual rubber driving nubs'
    },
    careGuide: 'Brush gently with brass suede brush. Protect with waterproofing spray.'
  },
  {
    id: 'evo-31',
    name: 'EVORA Heritage Brogue Derby',
    slug: 'evora-heritage-brogue-derby',
    subtitle: 'Classic wingtip brogue with Goodyear welted leather sole',
    category: 'Formal Shoes',
    gender: 'men',
    ageGroup: 'adults',
    collection: 'Tailored Heritage',
    originalPrice: 7999,
    discountedPrice: 5499,
    discountPercent: 31,
    rating: 4.9,
    reviewsCount: 94,
    inStock: true,
    stockCount: 26,
    colors: [
      { name: 'Burnished Walnut', hex: '#5D3A1A' },
      { name: 'Polished Onyx', hex: '#111827' }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The pinnacle of board-room authority. Precision brogue perforations, medallion toe cap, and vegetable-tanned leather sole edged with solid brass nails.',
    features: [
      'Intricate traditional wingtip broguing and medallion detailing',
      'Cork-filled footbed molds to user footprint over time',
      'Stacked leather heel with rubber quarter tap'
    ],
    materials: {
      upper: 'Full-grain French box calfskin',
      lining: 'Supple vegetable-tanned cowhide lining',
      insole: 'Natural compressed cork and veg-tan insole',
      outsole: 'Hand-burnished vegetable-tanned leather sole'
    },
    careGuide: 'Buff with high-carnauba beeswax polish every 4 weeks.'
  },
  {
    id: 'evo-32',
    name: 'EVORA Splash Light Speed',
    slug: 'evora-splash-light-speed',
    subtitle: 'Ultra-cushioned school and playground runner for boys & girls',
    category: 'Kids Shoes',
    gender: 'kids',
    ageGroup: 'kids',
    collection: 'Active Performance',
    originalPrice: 2899,
    discountedPrice: 1999,
    discountPercent: 31,
    rating: 4.8,
    reviewsCount: 156,
    inStock: true,
    stockCount: 48,
    isNewArrival: true,
    colors: [
      { name: 'Cosmic Blue & Orange', hex: '#2563EB' },
      { name: 'Berry Splash', hex: '#DB2777' },
      { name: 'School Uniform Black', hex: '#1F2937' }
    ],
    sizes: [1, 2, 3, 4, 5],
    image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Engineered for high-energy playtime, sports day, and school runs. Reinforced scuff-proof rubber bumper toe and hook-and-loop closure for fast independence.',
    features: [
      'Reinforced toe cap stands up to rough playground kicks',
      'Easy hook-and-loop strap with elastic bungee laces',
      'Non-marking indoor gym rubber sole',
      'Breathable anti-stink mesh lining'
    ],
    materials: {
      upper: 'Abrasion-resistant breathable mesh with synthetic guards',
      lining: 'Antimicrobial breathable fabric',
      insole: 'Cushioned EVA memory foam',
      outsole: 'Non-marking high-traction rubber'
    },
    careGuide: 'Machine washable on gentle cycle in laundry bag. Air dry.'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    discountPercent: 10,
    minOrder: 999,
    description: '10% OFF on your first EVORA order',
    expiresAt: '2026-12-31',
    isActive: true
  },
  {
    code: 'EVORA20',
    discountPercent: 20,
    minOrder: 3999,
    maxDiscount: 1200,
    description: '20% OFF on premium footwear orders over ₹3,999',
    expiresAt: '2026-12-31',
    isActive: true
  },
  {
    code: 'STEPINTO15',
    discountPercent: 15,
    minOrder: 2499,
    description: '15% OFF across all sneakers and casual collections',
    expiresAt: '2026-12-31',
    isActive: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productId: 'evo-01',
    customerName: 'Aarav Mehta',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    title: 'Extremely comfortable and looks even better in person.',
    comment: 'I run about 25 kilometers every week. The EVORA Urban Runner gave me zero break-in blisters. Cushioning is bouncy yet firm enough for sprints. The build quality beats many mainstream brands costing double.',
    date: '24 Sep 2026',
    verifiedPurchase: true,
    ageGroup: 'Adult',
    helpfulCount: 42
  },
  {
    id: 'rev-02',
    productId: 'evo-06',
    customerName: 'Kavita Sundaram',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    title: 'Life-changing for my daily morning walks',
    comment: 'At 64, I was struggling with heel pain after 15 minutes of walking. These Daily Comfort slip-ons are a blessing. The wide toe box gives my feet plenty of space, and I can slip them on without having to bend down.',
    date: '18 Sep 2026',
    verifiedPurchase: true,
    ageGroup: 'Senior',
    helpfulCount: 68
  },
  {
    id: 'rev-03',
    productId: 'evo-03',
    customerName: 'Rohan Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    title: 'Masterpiece leather sneakers',
    comment: 'The leather on the Classic Court is unbelievably supple. Wore it to an office conference and received 4 compliments in a single afternoon. Cleans up effortlessly with a damp cloth.',
    date: '12 Sep 2026',
    verifiedPurchase: true,
    ageGroup: 'Adult',
    helpfulCount: 29
  },
  {
    id: 'rev-04',
    productId: 'evo-13',
    customerName: 'Pooja Sharma',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    title: 'My 7-year-old refuses to wear any other shoes!',
    comment: 'Kids Sprint is genuinely durable. My son normally tears the toes of his school and play shoes within a month. These have lasted 4 months of rough cricket and football without a scratch on the rubber bumper.',
    date: '05 Sep 2026',
    verifiedPurchase: true,
    ageGroup: 'Kids Parent',
    helpfulCount: 54
  },
  {
    id: 'rev-05',
    productId: 'evo-02',
    customerName: 'Devansh Roy',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    title: 'Cleanest silhouette in streetwear right now',
    comment: 'The StreetFlex chalk white and gum combo is perfection. Pairs with baggy cargo pants, denim or shorts. Super solid grip on skateboard grip-tape as well.',
    date: '28 Aug 2026',
    verifiedPurchase: true,
    ageGroup: 'Teen',
    helpfulCount: 31
  }
];

export const CATEGORIES_DATA = [
  {
    id: 'sneakers',
    name: 'Sneakers',
    slug: 'Sneakers',
    tagline: 'Modern street lifestyle icons',
    image: sneakersCategoryImg,
    itemCount: 4
  },
  {
    id: 'running',
    name: 'Running Shoes',
    slug: 'Running Shoes',
    tagline: 'Engineered speed & shock absorption',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    itemCount: 3
  },
  {
    id: 'casual',
    name: 'Casual Shoes',
    slug: 'Casual Shoes',
    tagline: 'Effortless everyday versatility',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    itemCount: 3
  },
  {
    id: 'formal',
    name: 'Formal Shoes',
    slug: 'Formal Shoes',
    tagline: 'Hand-burnished leather elegance',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    itemCount: 4
  },
  {
    id: 'walking',
    name: 'Walking Shoes',
    slug: 'Walking Shoes',
    tagline: 'All-day joint protection and ease',
    image: walkingCategoryImg,
    itemCount: 5
  },
  {
    id: 'boots',
    name: 'Boots',
    slug: 'Boots',
    tagline: 'Rugged weather-proof craftsmanship',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
    itemCount: 2
  },
  {
    id: 'sandals',
    name: 'Sandals',
    slug: 'Sandals',
    tagline: 'Anatomical cork-bed breathability',
    image: sandalsCategoryImg,
    itemCount: 1
  },
  {
    id: 'kids',
    name: 'Kids Shoes',
    slug: 'Kids Shoes',
    tagline: 'Flexible, fun & scuff-proof',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80',
    itemCount: 4
  },
  {
    id: 'sports',
    name: 'Sports Shoes',
    slug: 'Sports Shoes',
    tagline: 'Court sports & trail outdoor grip',
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80',
    itemCount: 2
  },
  {
    id: 'training',
    name: 'Training Shoes',
    slug: 'Training Shoes',
    tagline: 'Cross-training, HIIT, gym & power stability',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    itemCount: 2
  },
  {
    id: 'slipons',
    name: 'Slip-ons',
    slug: 'Slip-ons',
    tagline: 'Hands-free effortless comfort',
    image: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=800&q=80',
    itemCount: 2
  }
];

export const DEMO_USER: {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
} = {
  id: 'usr-901',
  fullName: 'Vinay Partap',
  email: 'partapvinay269@gmail.com',
  phone: '+91 98765 43210',
  role: 'customer'
};
