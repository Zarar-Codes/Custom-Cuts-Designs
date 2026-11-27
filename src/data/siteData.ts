export const BUSINESS_INFO = {
  name: 'Custom Cuts & Designs',
  legalName: 'Custom Cuts & Designs Pty Ltd',
  abn: '61 641 703 979',
  founder: 'Jarrod Aronis',
  founderRole: 'Founder & Director',
  tagline: 'From Concept to Creation.',
  location: 'Melbourne, Victoria, Australia',
  serviceArea: 'Melbourne & Regional Victoria',
  phoneDisplay: '0435 045 272',
  phoneHref: 'tel:+61435045272',
  email: 'custom.cuts.designs@gmail.com',
  emailHref: 'mailto:custom.cuts.designs@gmail.com',
  website: 'https://www.customcutsdesigns.com.au/',
  instagram: 'https://www.instagram.com/custom.cuts.designs/',
  facebook: 'https://www.facebook.com/custom.cuts.designs',
  experience: 'Over a decade of industry experience',
} as const;

export const ASSETS = {
  hero: '/src/assets/images/hero_corten_architecture_1795692539553.jpg',
  cortenProducts: '/src/assets/images/pathway_corten_products_1795692553785.jpg',
  customFabrication: '/src/assets/images/pathway_custom_fabrication_1795692541046.jpg',
  landscapingOutdoor: '/src/assets/images/pathway_landscaping_outdoor_1795692540754.jpg',
  firePitFeature: '/src/assets/images/collection_firepit_feature_1795692541185.jpg',
  macroCraftsmanship: '/src/assets/images/detail_corten_craftsmanship_1795692543324.jpg',
  workshop: '/src/assets/images/workshop_fabrication_steel_1795692543388.jpg',
  fencingGates: '/src/assets/images/portfolio_fencing_gates_1795692544645.jpg',
} as const;

export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'services', label: 'Services' },
  { id: 'corten-collection', label: 'Corten' },
  { id: 'custom-fabrication', label: 'Fabrication' },
  { id: 'portfolio', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const INTRO_STAGES = [
  {
    number: '01',
    title: 'Design',
    description:
      'Understanding your idea, site conditions and intended space to shape a practical, well-proportioned steel or landscape solution.',
  },
  {
    number: '02',
    title: 'Fabrication',
    description:
      'Completing custom cutting, folding and metalwork in-house so every edge, panel and structure is fabricated to suit the brief.',
  },
  {
    number: '03',
    title: 'Installation',
    description:
      'Delivering and completing professional onsite installation where installation is part of the agreed residential or commercial project.',
  },
] as const;

export type ProjectTypeOption =
  | 'Corten steel edging'
  | 'Planter boxes'
  | 'Retaining walls'
  | 'Custom fabrication'
  | 'Fencing and screens'
  | 'Landscaping'
  | 'Other';

export const PROJECT_TYPE_OPTIONS: ProjectTypeOption[] = [
  'Corten steel edging',
  'Planter boxes',
  'Retaining walls',
  'Custom fabrication',
  'Fencing and screens',
  'Landscaping',
  'Other',
];

export interface ServicePathway {
  code: string;
  label: string;
  title: string;
  audience: string;
  description: string;
  categories: string[];
  ctaLabel: string;
  targetSection: string;
  presetProjectType?: ProjectTypeOption;
  image: string;
  imageAlt: string;
}

export const SERVICE_PATHWAYS: ServicePathway[] = [
  {
    code: 'Pathway A',
    label: 'Individual Products & Features',
    title: 'Corten Steel Products',
    audience: 'For homeowners, designers and builders seeking tailored Corten steel elements for existing or new gardens.',
    description:
      'Order made-to-measure garden edging, planter boxes, retaining wall panels, fire pits and custom garden features fabricated in-house.',
    categories: [
      'Corten steel garden edging',
      'Corten steel planter boxes',
      'Corten steel retaining walls',
      'Fire pits & custom garden features',
    ],
    ctaLabel: 'Explore Corten products',
    targetSection: 'corten-collection',
    image: ASSETS.cortenProducts,
    imageAlt:
      'Weathered Corten steel planter boxes and crisp Corten garden edging framing gravel pathways and native foliage',
  },
  {
    code: 'Pathway B',
    label: 'Bespoke Metalwork',
    title: 'Custom Steel Fabrication',
    audience: 'For clients with a specific architectural drawing, site requirement or one-off custom metalwork concept.',
    description:
      'Working across Corten, mild and stainless steel to fabricate decorative screens, custom gates, letterboxes and made-to-measure steel features.',
    categories: [
      'Bespoke steel fabrication',
      'Custom decorative privacy screens',
      'Custom steel gates and fencing',
      'Made-to-measure architectural features',
    ],
    ctaLabel: 'Discuss a custom project',
    targetSection: 'contact',
    presetProjectType: 'Custom fabrication',
    image: ASSETS.customFabrication,
    imageAlt:
      'Laser-cut weathered Corten steel decorative privacy screen and matching pedestrian gate casting crisp shadows on stone paving',
  },
  {
    code: 'Pathway C',
    label: 'Integrated Outdoor Builds',
    title: 'Landscaping & Outdoor Projects',
    audience: 'For residential and commercial projects requiring coordinated fabrication, hardscaping and onsite installation.',
    description:
      'End-to-end outdoor construction uniting retaining walls, edging, fencing, paving, drainage and integrated steel features under one team.',
    categories: [
      'Landscape construction & outdoor builds',
      'Retaining wall projects',
      'Fencing & sliding gate installations',
      'Integrated steel garden installations',
    ],
    ctaLabel: 'Plan an outdoor project',
    targetSection: 'contact',
    presetProjectType: 'Landscaping',
    image: ASSETS.landscapingOutdoor,
    imageAlt:
      'Terraced contemporary Australian garden featuring stepped weathered Corten steel retaining walls, concrete steps and native plantings',
  },
];

export interface CortenProduct {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  pricingStatus: 'made-to-measure' | 'enquire';
  pricingLabel: string;
  pricingGuidance: string;
  configurationOptions: string[];
  presetProjectType: ProjectTypeOption;
  image: string;
  imageAlt: string;
}

export const CORTEN_COLLECTION: CortenProduct[] = [
  {
    id: 'garden-edging',
    name: 'Corten Steel Garden Edging',
    category: 'Garden Borders & Pathways',
    shortDescription:
      'Clean, durable steel borders tailored for straight runs, curved garden beds, gravel walkways and lawn transitions.',
    pricingStatus: 'made-to-measure',
    pricingLabel: 'Made to measure — Request a custom quote',
    pricingGuidance:
      'Pricing depends on total linear length, height profile, straight or curved layout, and whether onsite installation is required.',
    configurationOptions: ['Straight runs', 'Curved profiles', 'Supply only', 'Supply & install'],
    presetProjectType: 'Corten steel edging',
    image: ASSETS.hero,
    imageAlt: 'Curved weathered Corten steel garden edging defining stone paving and native garden beds',
  },
  {
    id: 'planter-boxes',
    name: 'Corten Steel Planter Boxes',
    category: 'Architectural Vessels',
    shortDescription:
      'Custom-fabricated rectangular, square and modular planter boxes built to fit courtyards, entries and commercial spaces.',
    pricingStatus: 'made-to-measure',
    pricingLabel: 'Made to measure — Request a custom quote',
    pricingGuidance:
      'Pricing depends on custom dimensions, base and drainage configuration, quantity and delivery or site placement requirements.',
    configurationOptions: ['Custom dimensions', 'Open or sealed base', 'Residential', 'Commercial'],
    presetProjectType: 'Planter boxes',
    image: ASSETS.cortenProducts,
    imageAlt: 'Rectangular weathered Corten steel planter boxes planted with ornamental grasses beside pale concrete',
  },
  {
    id: 'retaining-walls',
    name: 'Corten Steel Retaining Walls',
    category: 'Structural Terracing',
    shortDescription:
      'Architectural Corten retaining solutions engineered and fabricated to manage sloping sites, split levels and raised garden beds.',
    pricingStatus: 'enquire',
    pricingLabel: 'Enquire for pricing',
    pricingGuidance:
      'Because retaining structures respond to site slope, soil conditions and access, we provide quotes following a free onsite measure.',
    configurationOptions: ['Stepped tiers', 'Curved walls', 'Integrated steps', 'Onsite measure'],
    presetProjectType: 'Retaining walls',
    image: ASSETS.landscapingOutdoor,
    imageAlt: 'Stepped Corten steel retaining walls creating landscaped garden tiers around concrete steps',
  },
  {
    id: 'custom-garden-features',
    name: 'Fire Pits & Custom Garden Features',
    category: 'Bespoke Outdoor Pieces',
    shortDescription:
      'Heavy-duty laser-cut fire pits, decorative privacy screens, garden rings, freestanding letterboxes and sculptural metalwork.',
    pricingStatus: 'made-to-measure',
    pricingLabel: 'Made to measure — Request a custom quote',
    pricingGuidance:
      'Pricing varies by artwork cut-out complexity, custom sizing, material selection and finish requirements.',
    configurationOptions: ['Custom laser-cut motifs', 'Fire pits & rings', 'Decorative screens', 'Letterboxes'],
    presetProjectType: 'Custom fabrication',
    image: ASSETS.firePitFeature,
    imageAlt: 'Weathered Corten steel fire pit with laser-cut Australian botanical motifs on dark bluestone gravel',
  },
];

export type PortfolioCategory =
  | 'All Projects'
  | 'Corten Steel'
  | 'Fabrication'
  | 'Planters'
  | 'Edging'
  | 'Retaining Walls'
  | 'Fencing';

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  'All Projects',
  'Corten Steel',
  'Fabrication',
  'Planters',
  'Edging',
  'Retaining Walls',
  'Fencing',
];

export interface PortfolioItem {
  id: string;
  title: string;
  projectType: string;
  categories: Exclude<PortfolioCategory, 'All Projects'>[];
  requirement: string;
  solution: string;
  finish: string;
  caption: string;
  image: string;
  imageAlt: string;
  layoutRole: 'featured' | 'supporting' | 'strip' | 'detail';
  presetProjectType: ProjectTypeOption;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'sloping-retaining-edging',
    title: 'Curved Retaining Wall & Pathway Edging',
    projectType: 'Corten Retaining Walls & Garden Edging',
    categories: ['Corten Steel', 'Retaining Walls', 'Edging'],
    requirement:
      'Stabilising a sloping residential garden while creating a continuous visual line along an organic bluestone walkway.',
    solution:
      'Long-span weathered Corten steel retaining panels paired with matching low-profile curved steel garden edging on both sides of the path.',
    finish:
      'Naturally oxidised Corten patina contrasting with pale architectural concrete, dark stone paving and Australian native grasses.',
    caption: 'Illustrative architectural showcase: sweeping Corten steel retaining wall and curved pathway edging.',
    image: ASSETS.hero,
    imageAlt: 'Sweeping weathered Corten steel retaining wall and curved garden edging flanking a stone garden path',
    layoutRole: 'featured',
    presetProjectType: 'Retaining walls',
  },
  {
    id: 'laser-cut-screen-gate',
    title: 'Laser-Cut Botanical Screen & Courtyard Gate',
    projectType: 'Custom Steel Fabrication',
    categories: ['Corten Steel', 'Fabrication', 'Fencing'],
    requirement:
      'Establishing courtyard privacy and controlled pedestrian access without blocking natural afternoon daylight.',
    solution:
      'Custom laser-cut Corten steel privacy panels and a matching full-height hinged gate mounted between architectural concrete piers.',
    finish:
      'Clean-cut botanical apertures in weathered Corten steel, casting patterned light across pale stone paving.',
    caption: 'Illustrative architectural showcase: custom laser-cut Corten privacy screens and matching courtyard gate.',
    image: ASSETS.customFabrication,
    imageAlt: 'Custom laser-cut weathered Corten steel privacy screen and courtyard gate between concrete columns',
    layoutRole: 'supporting',
    presetProjectType: 'Fencing and screens',
  },
  {
    id: 'modular-planters-edging',
    title: 'Architectural Planter Boxes & Gravel Borders',
    projectType: 'Corten Planters & Garden Edging',
    categories: ['Corten Steel', 'Planters', 'Edging'],
    requirement:
      'Framing structured plantings and defining clean gravel walkways against a minimalist concrete boundary wall.',
    solution:
      'Made-to-measure rectangular Corten steel planter boxes paired with straight steel garden bed edging to separate gravel and planting zones.',
    finish:
      'Crisp 90-degree folded steel corners with uniform weathered rust tone complementing olive foliage and pale crushed gravel.',
    caption: 'Illustrative architectural showcase: bespoke Corten steel planter boxes and straight steel bed edging.',
    image: ASSETS.cortenProducts,
    imageAlt: 'Rectangular Corten steel planter boxes and crisp garden bed edging bordering a pale gravel path',
    layoutRole: 'supporting',
    presetProjectType: 'Planter boxes',
  },
  {
    id: 'terraced-retaining-landscape',
    title: 'Stepped Corten Terracing & Outdoor Living',
    projectType: 'Landscaping & Retaining Walls',
    categories: ['Corten Steel', 'Retaining Walls'],
    requirement:
      'Transforming a steep residential block into usable terraced planting levels with safe step transitions and a sheltered seating zone.',
    solution:
      'Multi-tier Corten steel retaining walls flanking wide concrete steps, integrated lower courtyard seating and structured native planting.',
    finish:
      'Rich oxidised steel walls framing illuminated concrete treads and dark basalt gravel pathways.',
    caption: 'Illustrative architectural showcase: multi-tier Corten steel retaining walls with concrete steps and sunken courtyard.',
    image: ASSETS.landscapingOutdoor,
    imageAlt: 'Multi-level weathered Corten steel retaining walls flanking architectural concrete steps at dusk',
    layoutRole: 'strip',
    presetProjectType: 'Landscaping',
  },
  {
    id: 'slat-fencing-sliding-gate',
    title: 'Horizontal Slat Fence, Sliding Gate & Corten Letterbox',
    projectType: 'Fencing, Gates & Custom Metalwork',
    categories: ['Fencing', 'Fabrication', 'Corten Steel'],
    requirement:
      'Securing a contemporary residential frontage with cohesive boundary fencing, driveway access and a custom architectural street marker.',
    solution:
      'Dark charcoal horizontal slat fencing and a wide sliding driveway gate paired with a freestanding weathered Corten steel letterbox column.',
    finish:
      'Matte dark powder-coated horizontal slats contrasting against warm weathered Corten steel and dark bluestone paving.',
    caption: 'Illustrative architectural showcase: matte charcoal slat fencing, sliding driveway gate and Corten letterbox pillar.',
    image: ASSETS.fencingGates,
    imageAlt: 'Contemporary charcoal aluminium horizontal slat fence, sliding gate and freestanding Corten steel letterbox',
    layoutRole: 'strip',
    presetProjectType: 'Fencing and screens',
  },
  {
    id: 'botanical-corten-fire-pit',
    title: 'Custom Laser-Cut Corten Fire Pit',
    projectType: 'Custom Garden Features',
    categories: ['Corten Steel', 'Fabrication'],
    requirement:
      'Creating a focal outdoor gathering feature with custom Australian botanical metalwork for an entertaining courtyard.',
    solution:
      'Square heavy-profile Corten steel fire pit fabricated with precision-cut native foliage silhouettes along all four faces.',
    finish:
      'Deep weathered iron patina resting over dark bluestone screenings, highlighting the crisp cut-out pattern when lit.',
    caption: 'Illustrative architectural showcase: laser-cut Corten steel fire pit with native Australian leaf detailing.',
    image: ASSETS.firePitFeature,
    imageAlt: 'Weathered Corten steel square fire pit with laser-cut native leaf pattern on bluestone gravel',
    layoutRole: 'detail',
    presetProjectType: 'Custom fabrication',
  },
];

export const CRAFTSMANSHIP_POINTS = [
  {
    title: 'Clean-cut geometry',
    detail:
      'Precision cutting keeps botanical motifs, architectural apertures and straight edges sharp from close range as well as across the garden.',
  },
  {
    title: 'Considered folds & joins',
    detail:
      'Corners, returns and structural junctions are fabricated in-house so planters, walls and screens sit square and finish neatly on site.',
  },
  {
    title: 'Material character',
    detail:
      'Working with Corten, mild and stainless steel lets each piece respond naturally to surrounding concrete, stone, timber and native planting.',
  },
] as const;

export const DIFFERENTIATORS = [
  {
    index: '01',
    title: 'Australian owned & operated',
    detail: 'A Melbourne-based family-run business serving residential and commercial clients across Melbourne and regional Victoria.',
  },
  {
    index: '02',
    title: 'In-house custom fabrication',
    detail: 'Steel features are cut, formed and fabricated in-house rather than pieced together from generic off-the-shelf imports.',
  },
  {
    index: '03',
    title: 'Professional onsite installation',
    detail: 'The same craft that goes into fabricating your metalwork carries through to accurate site alignment and installation.',
  },
  {
    index: '04',
    title: 'Residential & commercial capability',
    detail: 'Experienced across private homes, architectural landscapes, streetscapes and commercial outdoor environments.',
  },
  {
    index: '05',
    title: 'One point of contact',
    detail: 'Direct communication from your initial concept and onsite measure right through fabrication and final handover.',
  },
  {
    index: '06',
    title: 'Over a decade of experience',
    detail: 'Practical fabrication and landscape construction knowledge refined across more than ten years of real-world projects.',
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Share your idea',
    description:
      'Tell us about the product, custom metalwork or outdoor project you have in mind, along with any sketches, measurements or reference photos.',
  },
  {
    step: '02',
    title: 'Discuss & measure',
    description:
      'We review your requirements and arrange a free onsite measure and quote across Melbourne where site assessment is needed.',
  },
  {
    step: '03',
    title: 'Design & fabricate',
    description:
      'Your concept is refined into a tailored fabrication plan and crafted in-house to suit your exact layout and finishes.',
  },
  {
    step: '04',
    title: 'Install & complete',
    description:
      'Where installation forms part of your project, our team delivers and installs the finished metalwork cleanly on site.',
  },
] as const;

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context: string;
  verifiedRatingNote?: string;
}

/* Genuine verbatim customer testimonials sourced from https://www.customcutsdesigns.com.au/testimonials */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'michael-s',
    quote:
      "Thanks to Jarrod & the team @ Custom cuts and designs! The end result is fantastic and exactly as planned - testament to the detail and service provided during the design and installation. I'd certainly recommend them!!",
    author: 'Michael S.',
    context: 'Design & installation project',
  },
  {
    id: 'amenita-h',
    quote:
      'Jarrod designed and installed a beautiful fence for me. He is absolutely amazing at what he does. So precise and professional. I would highly recommend custom cuts & designs to everyone. 10/10!',
    author: 'Amenita H.',
    context: 'Custom fence design & installation',
    verifiedRatingNote: '10/10 client rating',
  },
  {
    id: 'cam-christie-b',
    quote:
      'Jarrod did a fantastic job installing the corten garden edging. It finishes off our huge outdoor project perfectly and we could not be happier. Reliable, quality workmanship! Highly recommend Custom Cuts..',
    author: 'Cam & Christie B.',
    context: 'Corten steel garden edging installation',
  },
  {
    id: 'iain-f',
    quote:
      "Jarrod did an amazing job on our project. He was extremely patient in listening to our ideas and did a fantastic job in making it a reality. Couldn't be happier with the results...",
    author: 'Iain F.',
    context: 'Custom residential project',
  },
  {
    id: 'michael-annabelle-r',
    quote:
      'Jarrod and Dina are running a fantastic and professional operation... They were recommended by our landscape designer to install metal edging to our new garden. Jarrod was great at explaining what the process would be... This was definitely a 5-star experience, and we could not be happier.',
    author: 'Michael & Annabelle R.',
    context: 'Metal garden edging installation',
    verifiedRatingNote: '5-star experience',
  },
];
