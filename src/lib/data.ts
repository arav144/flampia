export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  modelNumber: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: string;
  collection: string;
  finish: string;
  power: string;
  lumens: string;
  colorTemp: string;
  dimensions: string;
  ipRating: string;
  material: string;
  featured: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isLuxury?: boolean;
  rating: number;
  reviewsCount: number;
  stock: number;
  description: string;
  features: string[];
  images: string[];
  specs: { [key: string]: string };
  reviews: Review[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  itemCount: number;
  image: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "wall-lights",
    name: "Wall Lights",
    slug: "wall-lights",
    description: "Architectural sconces & ambient wall silhouettes",
    iconName: "Maximize2",
    itemCount: 14,
    image: "/img4.png",
  },
  {
    id: "spot-lights",
    name: "Spot Lights",
    slug: "spot-lights",
    description: "Precision micro-directional accent spotlights",
    iconName: "Target",
    itemCount: 10,
    image: "/img3.png",
  },
  {
    id: "reading-lights",
    name: "Reading Lights",
    slug: "reading-lights",
    description: "Focused glare-free personal optical lights",
    iconName: "BookOpen",
    itemCount: 8,
    image: "/img2.png",
  },
  {
    id: "outdoor-lights",
    name: "Outdoor Lights",
    slug: "outdoor-lights",
    description: "IP67 weather-resistant landscape sculptures",
    iconName: "Sun",
    itemCount: 12,
    image: "/img2_.png",
  },
  {
    id: "ceiling-lights",
    name: "Ceiling Lights",
    slug: "ceiling-lights",
    description: "Suspended statement pendants & flush mounts",
    iconName: "Compass",
    itemCount: 18,
    image: "/img1.png",
  },
  {
    id: "decorative-lights",
    name: "Decorative Lights",
    slug: "decorative-lights",
    description: "Artisan kinetic lamps & light sculptures",
    iconName: "Sparkles",
    itemCount: 15,
    image: "/img2.png",
  },
  {
    id: "luxury-collection",
    name: "Luxury Collection",
    slug: "luxury-collection",
    description: "Limited production masterworks in crimson brass & obsidian crystal",
    iconName: "Crown",
    itemCount: 6,
    image: "/img1.png",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "flampia-aura-pendant",
    name: "Aura Crimson Halo Pendant",
    slug: "aura-crimson-halo-pendant",
    modelNumber: "FLP-AUR-01",
    tagline: "Suspended ring of soft crimson radiance and alabaster warmth",
    price: 48500,
    originalPrice: 56000,
    category: "Ceiling Lights",
    collection: "Luxury Collection",
    finish: "Brushed Crimson Brass",
    power: "36W",
    lumens: "3200 lm",
    colorTemp: "2700K Warm Glow",
    dimensions: "650mm x 650mm x 1200mm",
    ipRating: "IP20",
    material: "Solid Aircraft Brass & Diffused Alabaster",
    featured: true,
    isBestSeller: true,
    isLuxury: true,
    rating: 4.9,
    reviewsCount: 28,
    stock: 12,
    description:
      "The Aura Crimson Halo Pendant redefines modern living space aesthetics. Cast in brushed aircraft-grade brass with subtle crimson light highlights, its continuous ring casts shadowless illumination through hand-carved alabaster.",
    features: [
      "Custom precision-milled aluminum heat dissipation core",
      "Wireless touch dimmer integration & smartphone app support",
      "Continuously adjustable color temperature (2200K - 4000K)",
      "Designed in-house by FLAMPIA Atelier Milano",
      "5-Year International Warranty",
    ],
    images: [
      "/img1.png",
      "/img2.png",
      "/img3.png",
      "/img4.png",
    ],
    specs: {
      Voltage: "220-240V AC 50Hz",
      Dimmable: "0-10V & Phase Cut",
      CRI: ">97 Ra",
      Lifespan: "50,000 Hours",
      Weight: "4.8 kg",
    },
    reviews: [
      {
        id: "r1",
        userName: "Vikramaditya S.",
        rating: 5,
        date: "2026-07-15",
        comment:
          "The crimson aura glow adds an unbelievable sense of luxury to our living room. Truly Apple-level fit and finish.",
        verified: true,
      },
      {
        id: "r2",
        userName: "Elena R.",
        rating: 5,
        date: "2026-06-28",
        comment: "Packaging was pristine, light quality is soft and rich. Everyone asks where we got it.",
        verified: true,
      },
    ],
  },
  {
    id: "flampia-obsidian-sculpt",
    name: "Obsidian Core Floor Sculpture",
    slug: "obsidian-core-floor-sculpture",
    modelNumber: "FLP-OBS-02",
    tagline: "Architectural monolithic column emitting indirect red velvet ambiance",
    price: 74000,
    originalPrice: 82000,
    category: "Decorative Lights",
    collection: "Luxury Collection",
    finish: "Matte Obsidian Black",
    power: "48W",
    lumens: "4100 lm",
    colorTemp: "2400K Sunset Red Warmth",
    dimensions: "320mm x 320mm x 1850mm",
    ipRating: "IP20",
    material: "Anodized Black Aluminum & Smoked Quartz Glass",
    featured: true,
    isLuxury: true,
    rating: 5.0,
    reviewsCount: 19,
    stock: 7,
    description:
      "A statement piece standing at nearly two meters tall. The Obsidian Core casts a vertical blade of light against surrounding architecture while housing a hidden crimson ambient accent channel.",
    features: [
      "Monolith structural frame machined from solid aluminum block",
      "Custom optical lightguide for zero glare emission",
      "Proximity gesture control sensor built into apex cap",
      "Dual channel mood light engine (Warm White + Crimson Velvet)",
    ],
    images: [
      "/img2.png",
      "/img2_.png",
      "/img4.png",
    ],
    specs: {
      Voltage: "100-240V Universal",
      Controls: "Gesture Touch & Mobile App",
      CRI: ">98 Ra",
      Lifespan: "60,000 Hours",
      Weight: "12.4 kg",
    },
    reviews: [
      {
        id: "r3",
        userName: "Sameer Mehta",
        rating: 5,
        date: "2026-07-20",
        comment: "This light is pure art. The gesture control feels like science fiction.",
        verified: true,
      },
    ],
  },
  {
    id: "flampia-hyperion-spot",
    name: "Hyperion Laser Precision Spot",
    slug: "hyperion-laser-precision-spot",
    modelNumber: "FLP-HYP-03",
    tagline: "Ultra-sharp beam focus for art pieces and architectural features",
    price: 24500,
    category: "Spot Lights",
    collection: "Modern Lights",
    finish: "Matte Obsidian Black",
    power: "18W",
    lumens: "1900 lm",
    colorTemp: "3000K Crisp Warmth",
    dimensions: "120mm x 120mm x 220mm",
    ipRating: "IP40",
    material: "Thermal Composite & Smoked Optical Lens",
    featured: true,
    isBestSeller: true,
    rating: 4.8,
    reviewsCount: 34,
    stock: 25,
    description:
      "Engineered for gallery owners and discerning home art collectors. Hyperion utilizes custom magnetic optics allowing adjustable beam angles from 10° tight spot to 60° wide flood.",
    features: [
      "Magnetic quick-change optical lens filters",
      "360° pan and 90° tilt friction movement lock",
      "Zero UV light emission protecting fine canvas paintings",
    ],
    images: [
      "/img3.png",
      "/img4.png",
      "/img1.png",
    ],
    specs: {
      Voltage: "220V",
      BeamAngle: "10° - 60° Zoomable",
      CRI: ">96 Ra",
      Lifespan: "45,000 Hours",
      Weight: "1.2 kg",
    },
    reviews: [
      {
        id: "r4",
        userName: "Karan D.",
        rating: 5,
        date: "2026-07-02",
        comment: "Focused perfectly on our main gallery wall painting. Zero spill light.",
        verified: true,
      },
    ],
  },
  {
    id: "flampia-lumiere-wall-blade",
    name: "Lumière Crimson Wall Blade",
    slug: "lumiere-crimson-wall-blade",
    modelNumber: "FLP-LUM-04",
    tagline: "Ultra-slim perimeter sconce delivering soft wash red and warm illumination",
    price: 31000,
    originalPrice: 35000,
    category: "Wall Lights",
    collection: "New Arrivals",
    finish: "Brushed Crimson Brass",
    power: "24W",
    lumens: "2200 lm",
    colorTemp: "2700K Warm Glow",
    dimensions: "80mm x 45mm x 900mm",
    ipRating: "IP44",
    material: "Solid Brass & Frosted Acrylic Diffuser",
    featured: true,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 16,
    stock: 18,
    description:
      "Mounted horizontally or vertically, the Lumière Wall Blade floats 40mm off the wall surface, bathing vertical surfaces in rich indirect warm-red light wash without visible bulbs.",
    features: [
      "Dual directional light distribution (up and down wall wash)",
      "Ultra-thin profile of only 45mm thickness",
      "Suitable for luxury hallways, bed headboards, and master suites",
    ],
    images: [
      "/img4.png",
      "/img1.png",
      "/img2_.png",
    ],
    specs: {
      Voltage: "220-240V",
      Mounting: "Vertical or Horizontal Flush Bracket",
      CRI: ">95 Ra",
      Lifespan: "50,000 Hours",
      Weight: "2.1 kg",
    },
    reviews: [
      {
        id: "r5",
        userName: "Ananya Roy",
        rating: 5,
        date: "2026-07-29",
        comment: "Looks stunning alongside our dark marble hallway walls!",
        verified: true,
      },
    ],
  },
  {
    id: "flampia-solaris-outdoor",
    name: "Solaris Crimson IP67 Outdoor Torch",
    slug: "solaris-crimson-outdoor-torch",
    modelNumber: "FLP-SOL-05",
    tagline: "Weatherproof architectural outdoor fixture built for villa landscapes",
    price: 38000,
    category: "Outdoor Lights",
    collection: "Modern Lights",
    finish: "Matte Obsidian Black",
    power: "30W",
    lumens: "2800 lm",
    colorTemp: "2700K Ambient Glow",
    dimensions: "160mm x 160mm x 600mm",
    ipRating: "IP67",
    material: "Marine-Grade 316 Stainless Steel",
    featured: true,
    rating: 4.7,
    reviewsCount: 11,
    stock: 15,
    description:
      "Crafted from marine-grade 316 stainless steel with a black powder finish, Solaris withstands coastal salt spray, heavy rain, and extreme thermal conditions while bathing pathways in elegant red-warm glow.",
    features: [
      "IP67 immersion-proof & dust-sealed casing",
      "Impact resistant IK10 tempered optical glass shield",
      "Integrated dusk-to-dawn intelligent ambient sensor",
    ],
    images: [
      "/img2_.png",
      "/img3.png",
      "/img2.png",
    ],
    specs: {
      Voltage: "24V Low Voltage DC / 220V AC",
      IPRating: "IP67 Waterproof",
      CRI: ">92 Ra",
      Lifespan: "70,000 Hours",
      Weight: "3.9 kg",
    },
    reviews: [
      {
        id: "r6",
        userName: "Devendra P.",
        rating: 5,
        date: "2026-06-12",
        comment: "Installed 8 of these along our pool garden pathway. Absolute head turner.",
        verified: true,
      },
    ],
  },
  {
    id: "flampia-orbit-reading-lamp",
    name: "Orbit Magnetic Desk & Reading Lamp",
    slug: "orbit-magnetic-reading-lamp",
    modelNumber: "FLP-ORB-06",
    tagline: "Focused non-flicker optical lamp with magnetic floating ball-joint",
    price: 18900,
    category: "Reading Lights",
    collection: "New Arrivals",
    finish: "Velvet Ruby & Obsidian",
    power: "12W",
    lumens: "1200 lm",
    colorTemp: "2700K - 5000K Multi-Spec",
    dimensions: "200mm x 150mm x 450mm",
    ipRating: "IP20",
    material: "Anodized Aluminum & Neodymium Magnets",
    featured: false,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 42,
    stock: 30,
    description:
      "Orbit features a patented magnetic sphere joint allowing fluid 360-degree rotation of the lamp head. Built-in blue-light filter ensures zero eyestrain during long late-night reading or design sessions.",
    features: [
      "Flicker-free IEEE 1789 compliant LED driver",
      "Stepless capacitive touch brightness control strip",
      "Integrated Qi Wireless charging base (15W fast charge)",
    ],
    images: [
      "/img1.png",
      "/img4.png",
      "/img2.png",
    ],
    specs: {
      Voltage: "USB-C Power Delivery 30W",
      WirelessCharge: "15W Fast Charge",
      CRI: ">98 Ra",
      Weight: "1.4 kg",
    },
    reviews: [
      {
        id: "r7",
        userName: "Rohan Kapoor",
        rating: 5,
        date: "2026-07-11",
        comment: "The magnetic head adjustment is addictive to touch. Very high end.",
        verified: true,
      },
    ],
  },
];

export const COUPONS: { [code: string]: number } = {
  FLAMPIA10: 10,
  LUXURY20: 20,
  WELCOME500: 15,
};

export const MOCK_ORDERS = [
  {
    id: "FLP-892401",
    date: "2026-07-28",
    items: [
      {
        product: PRODUCTS[0],
        quantity: 1,
        selectedFinish: "Brushed Crimson Brass",
      },
    ],
    totalAmount: 43650,
    discountAmount: 4850,
    couponCode: "FLAMPIA10",
    status: "Delivered",
    shippingAddress: {
      fullName: "Arav Sharma",
      street: "702 Grand Imperial Towers, Worli",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400018",
      phone: "+91 98200 12345",
    },
    trackingNumber: "FL-EXPRESS-998241",
    invoiceUrl: "#",
  },
  {
    id: "FLP-891054",
    date: "2026-07-02",
    items: [
      {
        product: PRODUCTS[2],
        quantity: 2,
        selectedFinish: "Matte Obsidian Black",
      },
    ],
    totalAmount: 49000,
    discountAmount: 0,
    status: "Crafting & Assembly",
    shippingAddress: {
      fullName: "Arav Sharma",
      street: "702 Grand Imperial Towers, Worli",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400018",
      phone: "+91 98200 12345",
    },
    trackingNumber: "FL-EXPRESS-771029",
    invoiceUrl: "#",
  },
];
