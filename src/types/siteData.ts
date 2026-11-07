export interface PhoneContact {
  id: string;
  label: string;
  number: string;
  cleanNumber: string; // digits only for tel: and wa.me/ links
  isWhatsApp: boolean;
  network?: string;
}

export interface SocialLinks {
  instagram: {
    handle: string;
    url: string;
  };
  facebookCompany: {
    handle: string;
    url: string;
  };
  facebookOwner: {
    name: string;
    url: string;
  };
  whatsappChannel: {
    name: string;
    url: string;
    memberCount: string;
    description: string;
  };
  email: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  initials: string;
  location: string;
  rating: number;
  projectType: string;
  quote: string;
  date: string;
}

export interface ReferenceProject {
  id: string;
  projectTitle: string;
  clientOrArchitect: string;
  role: string;
  location: string;
  scopeM2: number;
  tileDetails: string;
  completionYear: string;
  highlight: string;
  status: 'Completed' | 'Inspected & Approved';
}

export interface TilingService {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  recommendedTile: string;
}

export interface SiteData {
  companyName: string;
  ownerName: string;
  ownerAlias: string;
  email: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  serviceArea: string;
  laborRateRangeUsdPerM2: string;
  phones: PhoneContact[];
  socials: SocialLinks;
  services: TilingService[];
  testimonials: Testimonial[];
  references: ReferenceProject[];
  guarantees: string[];
}

export const initialSiteData: SiteData = {
  companyName: 'Darlingtech Tilers',
  ownerName: 'Darlington Kanyandura',
  ownerAlias: 'Kayz (@Kayz_real_zw)',
  email: 'darlingtonkanyandura@gmail.com',
  tagline: 'Precision Tiling Artisans & Surface Finishers',
  heroHeadline: 'Master Tiling for Zimbabwe’s Finest Homes & Spaces',
  heroSubheadline: 'Specialist installation of large-format porcelain, luxury bathroom wetrooms, and intricate splashbacks. 100% hollow-free adhesion, cross-laser alignment, and razor-sharp 45° mitred corners.',
  serviceArea: 'Harare, Bulawayo, Chitungwiza, Mutare & Nationwide Zimbabwe',
  laborRateRangeUsdPerM2: '$3.50 – $6.00 / m²',
  phones: [
    {
      id: 'p1',
      label: 'Primary Line (Econet / 24-7 WhatsApp)',
      number: '+263771624931',
      cleanNumber: '263771624931',
      isWhatsApp: true,
      network: 'Econet Zimbabwe',
    },
    {
      id: 'p2',
      label: 'Direct Line & WhatsApp',
      number: '0789423434',
      cleanNumber: '263789423434',
      isWhatsApp: true,
      network: 'Econet / NetOne',
    },
    {
      id: 'p3',
      label: 'NetOne Direct Line & WhatsApp',
      number: '0719418701',
      cleanNumber: '263719418701',
      isWhatsApp: true,
      network: 'NetOne Zimbabwe',
    },
  ],
  socials: {
    instagram: {
      handle: '@Kayz_real_zw',
      url: 'https://www.instagram.com/Kayz_real_zw',
    },
    facebookCompany: {
      handle: '@Darlingtech tilers',
      url: 'https://www.facebook.com/search/top?q=Darlingtech%20tilers',
    },
    facebookOwner: {
      name: 'Darlington Kanyandura',
      url: 'https://www.facebook.com/search/top?q=Darlington%20Kanyandura',
    },
    whatsappChannel: {
      name: 'Darlingtech Tilers Official Updates',
      url: 'https://whatsapp.com/channel/0029VaDarlingtechTilersZw',
      memberCount: '1,450+ members',
      description: 'Daily video walkthroughs of finished residences, behind-the-scenes precision cuts, screeding tutorials, and open booking slots.',
    },
    email: 'darlingtonkanyandura@gmail.com',
  },
  guarantees: [
    'Zero Hollow Tiles Guarantee (100% full-bed back-buttering)',
    'Flawless 45° Mitred Corners (no cheap plastic edge trim unless requested)',
    'Cross-Line Laser Precision & Leveling Clip Systems',
    'Curbless Shower Waterproofing & True Slope Tanking',
    'Free On-Site Measurements Across Greater Harare',
  ],
  services: [
    {
      id: 'srv-1',
      number: '01',
      title: 'Large-Format Porcelain & Floor Tiling',
      subtitle: 'Living rooms, lounges, entrance halls & open-plan spaces',
      description: 'Installation of 600×600mm, 800×800mm, 1200×600mm, and jumbo slab porcelain tiles with minimum 1.5mm hairline grout joints and mechanical tile leveling clips for perfectly flat floors.',
      features: ['Laser-assisted square lines', 'Back-buttering technique', 'Heavy-traffic polymer adhesive'],
      recommendedTile: 'Polished or Lappato Porcelain, Carrara / Calacatta look',
    },
    {
      id: 'srv-2',
      number: '02',
      title: 'Luxury Bathrooms & Wetrooms',
      subtitle: 'Waterproof tanking, shower falls, niches & mitred returns',
      description: 'Comprehensive bathroom surface engineering. We create flawless falls towards linear or center drains, recessed shower niche tiling with 45° bevelled miter joints, and full wall-to-ceiling tiling.',
      features: ['Under-tile waterproofing tanking', '45° mitred external edge finishing', 'Curbless walk-in shower slopes'],
      recommendedTile: 'Non-slip porcelain floor + rectified marble ceramic walls',
    },
    {
      id: 'srv-3',
      number: '03',
      title: 'Kitchen Splashbacks & Feature Walls',
      subtitle: 'Herringbone, subway, hex & mosaic statement layouts',
      description: 'Artisanal kitchen splashbacks installed with symmetrical focal alignment behind gas hobs, quartz counter junction sealing, and stain-resistant epoxy or resin grout.',
      features: ['Precision 45° and 90° herringbone layouts', 'Flush electrical socket cutout cuts', 'Stain-resistant epoxy grout'],
      recommendedTile: 'Glazed subway tiles, chevron porcelain, bevelled mosaic',
    },
    {
      id: 'srv-4',
      number: '04',
      title: 'Verandahs, Patios & Pool Surrounds',
      subtitle: 'Outdoor living spaces engineered for Zimbabwean weather',
      description: 'Durable exterior tiling designed to resist heavy sun expansion and torrential summer rains with flexible expansion joints and slip-resistant outdoor-rated finishes.',
      features: ['R11 non-slip textured tiles', 'Flexible exterior perimeter joints', 'Reinforced sand-cement screed'],
      recommendedTile: 'R11 textured porcelain, natural slate, granite pavers',
    },
    {
      id: 'srv-5',
      number: '05',
      title: 'Floor Screeding & Surface Preparation',
      subtitle: 'The secret to flat floors that never crack or sound hollow',
      description: 'Self-leveling compounds, polymer-modified screeds, and crack repair before tiling begins. We correct uneven builders slabs so your tiles lay completely flat.',
      features: ['Laser datum level verification', 'Moisture barrier application', 'Crack debonding underlayment'],
      recommendedTile: 'Bonded or floating polymer-modified sand-cement screed',
    },
    {
      id: 'srv-6',
      number: '06',
      title: 'Commercial & Retail Tiling',
      subtitle: 'Showrooms, offices, medical centers & restaurants',
      description: 'High-speed, high-durability commercial installation with fast-curing adhesives that allow foot traffic in 12–24 hours, keeping commercial downtime to an absolute minimum.',
      features: ['Rapid-set heavy duty adhesive', 'Continuous linear control joints', 'After-hours & weekend schedules'],
      recommendedTile: 'Full-body vitrified porcelain, heavy commercial grade',
    },
  ],
  testimonials: [
    {
      id: 't-1',
      clientName: 'T. Chigumba',
      initials: 'TC',
      location: 'Borrowdale Brooke, Harare',
      rating: 5,
      projectType: '320m² Large-Format Porcelain & 3 Bathrooms',
      quote: 'Darlingtech Tilers completely transformed our new home. Darlington (Kayz) and his team handled the 1200x600 porcelain tiles with incredible precision—not a single lippage or hollow sound across the entire living room and kitchen. The 45-degree mitred corners in the master ensuite look like a 5-star hotel.',
      date: 'October 2026',
    },
    {
      id: 't-2',
      clientName: 'V. Moyo',
      initials: 'VM',
      location: 'Glen Lorne, Harare',
      rating: 5,
      projectType: 'Kitchen Splashback & Verandah Renovation',
      quote: 'I was very nervous about the herringbone splashback because green glazed tiles show every flaw. Darlington measured the center point perfectly behind our cooker hob and executed flawless grout lines. Honest, punctual, and left the site spotless every evening.',
      date: 'September 2026',
    },
    {
      id: 't-3',
      clientName: 'Eng. K. Nyoni',
      initials: 'KN',
      location: 'Mt Pleasant, Harare',
      rating: 5,
      projectType: 'Full House Renovation & Screeding',
      quote: 'As a civil engineer, I inspect tile work with a 2-meter spirit level and tapping hammer. Darlingtech Tilers passed with flying colors. 100% adhesive contact underneath and perfect slope into the shower drain. Truly the premier tilers in Zimbabwe.',
      date: 'August 2026',
    },
  ],
  references: [
    {
      id: 'ref-1',
      projectTitle: 'Borrowdale Brooke Executive Villa',
      clientOrArchitect: 'Mr. & Mrs. Chigumba',
      role: 'Private Homeowner',
      location: 'Borrowdale Brooke, Harare',
      scopeM2: 320,
      tileDetails: '1200×600mm High-Gloss Italian Carrara Porcelain & 3 En-suites',
      completionYear: '2026',
      highlight: 'Zero lippage across 18m continuous open living & dining hall, laser-checked.',
      status: 'Completed',
    },
    {
      id: 'ref-2',
      projectTitle: 'Glen Lorne Hillside Modern Residence',
      clientOrArchitect: 'Arch. M. Dube',
      role: 'Lead Architect & Project Manager',
      location: 'Glen Lorne, Harare',
      scopeM2: 245,
      tileDetails: 'Matte Anthracite Slate Patio & Curbless Master Wetroom',
      completionYear: '2026',
      highlight: 'Full wetroom tanking, linear shower channel fall & 45° mitred niche returns.',
      status: 'Inspected & Approved',
    },
    {
      id: 'ref-3',
      projectTitle: 'Madokero Estate Cluster Home Project',
      clientOrArchitect: 'Property Developer: Apex Living Ltd',
      role: 'Head of Construction',
      location: 'Madokero, Harare West',
      scopeM2: 410,
      tileDetails: '600×600mm Polished Porcelain + Subway Kitchen Splashbacks',
      completionYear: '2026',
      highlight: 'Completed 3 units 4 days ahead of scheduled handover with 100% client satisfaction.',
      status: 'Completed',
    },
    {
      id: 'ref-4',
      projectTitle: 'Westgate Medical Suites & Pharmacy',
      clientOrArchitect: 'Dr. S. Sibanda',
      role: 'Facility Director',
      location: 'Westgate, Harare',
      scopeM2: 185,
      tileDetails: 'Heavy-Duty Vitrified Anti-Bacterial Porcelain Tiles',
      completionYear: '2025',
      highlight: 'Chemical-resistant epoxy grout, hygienic coved skirtings and zero downtime.',
      status: 'Completed',
    },
  ],
};
