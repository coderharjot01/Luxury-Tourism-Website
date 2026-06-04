// Rich mock datasets for the MystictrailJourney Luxury Tourism Platform (Multi-Destination Edition)

export interface Experience {
  id: string;
  destination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
  category: 'yoga' | 'meditation' | 'ayurveda' | 'adventure' | 'culture' | 'heritage' | 'food';
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  difficulty?: 'Gentle' | 'Moderate' | 'Challenging';
  highlights: string[];
  imageUrl: string;
  price: string;
}

export interface Retreat {
  id: string;
  destination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
  name: string;
  rating: number;
  reviewsCount: number;
  focus: string;
  duration: string;
  accommodation: string;
  priceRange: string;
  imageUrl: string;
  description: string;
  features: string[];
}

export interface Article {
  id: string;
  destination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
  title: string;
  category: 'Yoga' | 'Ayurveda' | 'Mindfulness' | 'Travel Guide' | 'History' | 'Architecture' | 'Gastronomy';
  readTime: string;
  date: string;
  imageUrl: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface EventFestival {
  id: string;
  destination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
  title: string;
  date: string;
  month: string;
  description: string;
  highlights: string[];
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  destination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
  name: string;
  country: string;
  flag: string;
  quote: string;
  rating: number;
  retreatTaken: string;
  avatarUrl: string;
}

export interface MapMarker {
  id: string;
  destination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
  title: string;
  category: 'schools' | 'ashrams' | 'cafes' | 'adventure' | 'gems' | 'retreats' | 'heritage' | 'monuments';
  lat: number; // custom map grid percent X
  lng: number; // custom map grid percent Y
  description: string;
  highlight: string;
  rating?: number;
  imageUrl?: string;
}

export interface TourHotspot {
  id: string;
  destination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
  name: string;
  x: number; // percentage X
  y: number; // percentage Y
  title: string;
  description: string;
  audioDuration?: string;
  imageUrl: string;
}

export const experiences: Experience[] = [
  // --- RISHIKESH ---
  {
    id: 'exp-yoga-beg',
    destination: 'rishikesh',
    category: 'yoga',
    title: 'Hatha & Vinyasa Foundations',
    subtitle: 'Beginner Programs',
    description: 'A gentle entry into sacred alignment and breathing techniques. Guided by traditional masters who explain the philosophy behind every posture.',
    duration: '7 Days',
    difficulty: 'Gentle',
    highlights: ['Traditional pranayama techniques', 'Sunset alignment clinics', 'Individualized adjustments'],
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80',
    price: '€650'
  },
  {
    id: 'exp-yoga-teach',
    destination: 'rishikesh',
    category: 'yoga',
    title: '200-Hour RYS Teacher Training',
    subtitle: 'Teacher Training',
    description: 'Yoga Alliance certified program focusing on yogic philosophy, anatomy, alignment, and modern teaching methodologies along the Ganges.',
    duration: '21 Days',
    difficulty: 'Challenging',
    highlights: ['Yoga Alliance certification', 'Anatomy & physiology modules', 'Teaching practicums'],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    price: '€1,850'
  },
  {
    id: 'exp-yoga-well',
    destination: 'rishikesh',
    category: 'yoga',
    title: 'Prana & Shakti Awakening',
    subtitle: 'Wellness Packages',
    description: 'Immersive lifestyle resetting including Sattvic diet plans, active asana practice, and cleansing rituals to clear blockages and restore stamina.',
    duration: '10 Days',
    difficulty: 'Moderate',
    highlights: ['Sattvic organic nutrition', 'Daily Shatkarma detox', 'Sanskrit chanting lessons'],
    imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1200&q=80',
    price: '€1,100'
  },
  {
    id: 'exp-med-silent',
    destination: 'rishikesh',
    category: 'meditation',
    title: 'The Silent Sanctuary',
    subtitle: 'Silent Retreats',
    description: 'Step into complete noble silence (Mauna). Unplug from the digital world and listen to the whisper of the wind and the river Ganga.',
    duration: '5 Days',
    difficulty: 'Challenging',
    highlights: ['Noble silence guidelines', 'Digital detox safe-box', 'One-on-one guide support'],
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80',
    price: '€550'
  },
  {
    id: 'exp-med-vipassana',
    destination: 'rishikesh',
    category: 'meditation',
    title: 'Vipassana Mindfulness Insight',
    subtitle: 'Vipassana Retreats',
    description: 'Traditional mindfulness practice observing sensations as they arise, cultivating profound mental balance, clarity, and unconditional peace.',
    duration: '10 Days',
    difficulty: 'Challenging',
    highlights: ['10 hours of daily sitting', 'Mindful walking trails', 'Discourses by monastic monks'],
    imageUrl: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&w=1200&q=80',
    price: '€890'
  },
  {
    id: 'exp-ayur-detox',
    destination: 'rishikesh',
    category: 'ayurveda',
    title: 'Panchakarma Detoxification',
    subtitle: 'Detox Programs',
    description: 'Five sacred actions to fully cleanse toxins from body tissues. Combines Abhyanga oil massage, herbal steam baths, and specialized diets.',
    duration: '14 Days',
    difficulty: 'Moderate',
    highlights: ['Doctor-led initial assessment', 'Customized organic herbal tonics', 'Daily warm oil Shirodhara'],
    imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=80',
    price: '€1,450'
  },
  {
    id: 'exp-adv-rafting',
    destination: 'rishikesh',
    category: 'adventure',
    title: 'Sacred Currents Rafting',
    subtitle: 'River Rafting',
    description: 'Navigate thrilling Grade III & IV rapids on the crystal blue waters of the high Ganges. Surrounded by dense Himalayan forests and river beaches.',
    duration: '1 Day',
    difficulty: 'Moderate',
    highlights: ['Expert certified river guides', 'Premium safety gear', 'Riverside camp buffet lunch'],
    imageUrl: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=1200&q=80',
    price: '€95'
  },
  {
    id: 'exp-adv-trek',
    destination: 'rishikesh',
    category: 'adventure',
    title: 'Kunjapuri Sunrise Trek',
    subtitle: 'Trekking & Hiking',
    description: 'A pre-dawn trek leading up to Kunjapuri Temple at 1,645m. Watch the sun emerge over the snow-capped Himalayan peaks and the valley below.',
    duration: '1 Day',
    difficulty: 'Moderate',
    highlights: ['Mountain sunrise views', 'Ancient temple visit', 'Downhill village walking trek'],
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    price: '€60'
  },
  {
    id: 'exp-cult-aarti',
    destination: 'rishikesh',
    category: 'culture',
    title: 'Triveni Ghat Evening Aarti',
    subtitle: 'Ganga Aarti',
    description: 'Stand witness to the awe-inspiring light offering, where lamps are spun to the rhythm of chants, bells, and trumpets on the river banks.',
    duration: '3 Hours',
    difficulty: 'Gentle',
    highlights: ['Reserved front-row seats', 'Spiritual significance briefing', 'Personal diya floating offering'],
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=1200&q=80',
    price: '€40'
  },

  // --- AGRA ---
  {
    id: 'exp-agra-sunrise',
    destination: 'agra',
    category: 'heritage',
    title: 'Taj Mahal Sunrise Photography',
    subtitle: 'Mughal Splendors',
    description: 'Enter the Taj Mahal gates at first light before the crowds arrive. Accompanied by a historian who explains the symmetry, geometry, and romance behind the marble.',
    duration: '4 Hours',
    difficulty: 'Gentle',
    highlights: ['VIP skip-the-line entrance', 'Best photography viewpoints', 'Historian guide commentary'],
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    price: '€120'
  },
  {
    id: 'exp-agra-artisan',
    destination: 'agra',
    category: 'culture',
    title: 'Pietra Dura Inlay Workshop',
    subtitle: 'Ancient Crafts',
    description: 'Learn the ancient Mughal art of marble inlay from direct descendants of the artisans who built the Taj Mahal. Carve and set semi-precious stones.',
    duration: '3 Hours',
    difficulty: 'Gentle',
    highlights: ['Hands-on marble setting', 'Direct interaction with master craftsmen', 'Create your own marble coaster souvenir'],
    imageUrl: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=1200&q=80',
    price: '€75'
  },
  {
    id: 'exp-agra-fort',
    destination: 'agra',
    category: 'heritage',
    title: 'Agra Fort Private Palace Tour',
    subtitle: 'Imperial Fortresses',
    description: 'Walk through the red sandstone pavilions of Agra Fort, exploring the private royal chambers of Jahangir Mahal and the octagonal tower looking at the Taj.',
    duration: '3 Hours',
    difficulty: 'Moderate',
    highlights: ['Explore secret Mughal passages', 'Spectacular Taj Mahal river view spots', 'Access to exclusive palace chambers'],
    imageUrl: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=1200&q=80',
    price: '€90'
  },

  // --- GOA ---
  {
    id: 'exp-goa-spice',
    destination: 'goa',
    category: 'food',
    title: 'Spice Plantation Heritage Feast',
    subtitle: 'Eco-Gastronomy',
    description: 'Trek through a 100-acre organic spice garden sniffing green cardamom, nutmeg, and black pepper. Conclude with a traditional buffet served on banana leaves.',
    duration: '5 Hours',
    difficulty: 'Gentle',
    highlights: ['Guided herbal plant tour', 'Freshly brewed local Feni tasting', 'Traditional Goan buffet lunch'],
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80',
    price: '€80'
  },
  {
    id: 'exp-goa-yacht',
    destination: 'goa',
    category: 'adventure',
    title: 'Private Yacht Mandovi River Cruise',
    subtitle: 'Coastal Luxury',
    description: 'Charter a luxury catamaran along the Mandovi River leading to the Arabian Sea. Sip champagne as the sun sets over historic Portuguese fort ruins.',
    duration: '4 Hours',
    difficulty: 'Gentle',
    highlights: ['Private luxury boat charter', 'Sundeck dolphin watching', 'Gourmet seafood hors d’oeuvres'],
    imageUrl: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80',
    price: '€450'
  },
  {
    id: 'exp-goa-yoga',
    destination: 'goa',
    category: 'yoga',
    title: 'Beachfront Chakra Balance',
    subtitle: 'Ocean Wellness',
    description: 'Greet the morning on the soft sands of Mandrem Beach. Focuses on breathing alignment combined with the healing sound of ocean waves.',
    duration: '2 Hours',
    difficulty: 'Gentle',
    highlights: ['Sunset/Sunrise options', 'Organic coconut water hydration', 'Guided ocean sound meditation'],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    price: '€50'
  },

  // --- DELHI ---
  {
    id: 'exp-delhi-food',
    destination: 'delhi',
    category: 'food',
    title: 'Old Delhi Rickshaw Culinary Trail',
    subtitle: 'Gastronomy Safaris',
    description: 'Navigate the historic narrow lanes of Chandni Chowk in a private rickshaw. Sample century-old street foods, parathas, and Mughal spice desserts.',
    duration: '4 Hours',
    difficulty: 'Moderate',
    highlights: ['Private rickshaw driver', 'Taste-tested safe hygienic stalls', 'Visit the Asia\'s largest wholesale spice market'],
    imageUrl: 'https://images.unsplash.com/photo-1601058268499-e52658bdf57f?auto=format&fit=crop&w=1200&q=80',
    price: '€85'
  },
  {
    id: 'exp-delhi-sufi',
    destination: 'delhi',
    category: 'culture',
    title: 'Nizamuddin Sufi Musical Night',
    subtitle: 'Spiritual Devotion',
    description: 'Sit inside the 700-year-old courtyard of Hazrat Nizamuddin Dargah. Watch traditional Qawwali singers perform hypnotic devotional poetry.',
    duration: '3 Hours',
    difficulty: 'Moderate',
    highlights: ['Reserved guide seating', 'Historical Sufism briefing', 'Rose petal offering custom'],
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=1200&q=80',
    price: '€60'
  },
  {
    id: 'exp-delhi-tombs',
    destination: 'delhi',
    category: 'heritage',
    title: 'Imperial Tomb & Garden Walks',
    subtitle: 'Mughal Architecture',
    description: 'Explore the predecessor of the Taj Mahal: Humayun\'s Tomb. Learn how Persian garden design merged with Hindu temple motifs in red sandstone.',
    duration: '3 Hours',
    difficulty: 'Gentle',
    highlights: ['VIP skip-the-line entries', 'Humayun & Lodi Gardens exploration', 'Architectural geometry presentation'],
    imageUrl: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=1200&q=80',
    price: '€70'
  }
];

export const retreats: Retreat[] = [
  // --- RISHIKESH ---
  {
    id: 'ret-ananda',
    destination: 'rishikesh',
    name: 'Ananda In The Himalayas',
    rating: 4.9,
    reviewsCount: 184,
    focus: 'Ayurveda, Yoga & Holistic Healing',
    duration: '7 - 21 Nights',
    accommodation: 'Palace Estate & Luxury Villas',
    priceRange: '€4,500 - €9,000',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    description: 'Set in a 100-acre Maharaja palace estate overlooking Rishikesh, Ananda blends traditional Ayurveda, yoga, and Vedanta with global wellness experiences.',
    features: ['Private infinity pool access', 'Consultations with Ayurvedic physicians', '1-on-1 meditation by the palace pond', 'Sattvic gourmet meals']
  },
  {
    id: 'ret-vanya',
    destination: 'rishikesh',
    name: 'Vanya River Retreat & Sanctuary',
    rating: 4.8,
    reviewsCount: 96,
    focus: 'Silent Meditation & Forest Therapy',
    duration: '5 - 14 Nights',
    accommodation: 'Eco-Luxury Glass Cottages',
    priceRange: '€2,100 - €4,200',
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    description: 'A secluded sanctuary nestled where the rainforest meets the Ganges. Fall asleep to the river\'s lullaby and wake up to mountain mist in customized glass walls.',
    features: ['Panoramic glass wall cabins', 'Organic forest-to-table dining', 'Riverside yoga platforms', 'Daily sound healing sessions']
  },
  {
    id: 'ret-tattva',
    destination: 'rishikesh',
    name: 'Tattva Yoga Shala & Wellness',
    rating: 4.7,
    reviewsCount: 142,
    focus: 'Traditional Hatha & Spiritual Immersion',
    duration: '7 - 14 Nights',
    accommodation: 'Premium Ashramesque Suites',
    priceRange: '€1,200 - €2,800',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    description: 'A traditional and highly rated center near Laxman Jhula. Focuses on classical scriptures, deep anatomy adjustment, and spiritual detox practices.',
    features: ['Experienced ashram yogis', 'Sanskrit chanting & philosophy', 'Traditional fire ceremonies', 'Thermal spring mineral baths']
  },

  // --- AGRA ---
  {
    id: 'ret-amarvilas',
    destination: 'agra',
    name: 'The Oberoi Amarvilas Palace',
    rating: 4.9,
    reviewsCount: 228,
    focus: 'Imperial Luxury & Royal Spa',
    duration: '2 - 7 Nights',
    accommodation: 'Taj-Facing Luxury Suites',
    priceRange: '€3,800 - €7,500',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    description: 'Located just 600 meters from the Taj Mahal, every single suite offers an uninterrupted view of the monument. Blends Mughal architecture, terraced lawns, and pool courts.',
    features: ['Private balcony view of the Taj', 'Mughal-style body scrub treatments', '24-hour butler assistance', 'Fine dining Mughal restaurant']
  },
  {
    id: 'ret-itcmughal',
    destination: 'agra',
    name: 'ITC Mughal Kaya Kalp Resort',
    rating: 4.7,
    reviewsCount: 156,
    focus: 'Kaya Kalp Spa & Mughal Garden Wellness',
    duration: '3 - 7 Nights',
    accommodation: 'Premium Royal Chambers',
    priceRange: '€1,600 - €3,200',
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    description: 'Set amidst 23 acres of lush gardens, this resort recreates the grandeur of the Mughal court and features India’s largest luxury wellness spa, Kaya Kalp.',
    features: ['Kaya Kalp Royal Hammam access', 'Gardens of Paradise walks', 'Mughal Emperor wellness therapy', 'Ancient copper-utensil food diet']
  },

  // --- GOA ---
  {
    id: 'ret-tajexotica',
    destination: 'goa',
    name: 'Taj Exotica Resort & Jiva Spa',
    rating: 4.9,
    reviewsCount: 312,
    focus: 'Mediterranean Shoreline & Jiva Ayurveda',
    duration: '5 - 14 Nights',
    accommodation: 'Oceanfront Eco-Luxury Villas',
    priceRange: '€2,800 - €5,900',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    description: 'Embraced by 56 acres of lush gardens along Benaulim beach. Offers traditional Indian Jiva spa therapies, custom ocean yoga, and beach-shack detox dining.',
    features: ['Jiva Spa traditional oil consultation', 'Private beach yoga pavilions', 'Organic coconut grove trails', 'Fresh ocean-to-plate Ayurvedic chef']
  },
  {
    id: 'ret-ashiyana',
    destination: 'goa',
    name: 'Ashiyana Mandrem Retreat Village',
    rating: 4.8,
    reviewsCount: 118,
    focus: 'Holistic Yoga & Natural Detox',
    duration: '7 - 21 Nights',
    accommodation: 'Eco-Lodge River Beach Cabanas',
    priceRange: '€1,100 - €2,400',
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    description: 'A dedicated holistic eco-village situated near the quiet dunes of North Goa. Focuses on natural purification, silence, and classical yoga lineages.',
    features: ['Natural swimming pond access', 'Daily group holistic therapy workshops', 'Organic farm-to-table meals', 'Beach silence walks']
  },

  // --- DELHI ---
  {
    id: 'ret-lodhi',
    destination: 'delhi',
    name: 'The Lodhi Luxury Urban Oasis',
    rating: 4.8,
    reviewsCount: 165,
    focus: 'Modern City Reset & Hammam Spa',
    duration: '3 - 10 Nights',
    accommodation: 'Private Plunge Pool Suites',
    priceRange: '€3,200 - €6,800',
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    description: 'A striking modern stone sanctuary in the heart of Delhi. Features private suite plunge pools, custom athletic club facilities, and an authentic Turkish Hammam spa.',
    features: ['Private in-room heated plunge pool', 'Traditional Turkish marble Hammam', 'Lodi Gardens history running trails', 'Ayurvedic urban detox therapies']
  }
];

export const articles: Article[] = [
  // --- RISHIKESH ---
  {
    id: 'art-yoga-benefits',
    destination: 'rishikesh',
    title: 'The Neuroscience of Yogic Breathing (Pranayama)',
    category: 'Yoga',
    readTime: '6 min read',
    date: 'May 28, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    excerpt: 'How altering your breathing patterns stimulates the vagus nerve, immediately lowering cortisol levels and resetting your nervous system.',
    author: {
      name: 'Dr. Evelyn Sommer',
      role: 'Neuroscientist & Yoga practitioner',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    }
  },
  {
    id: 'art-meditation-guide',
    destination: 'rishikesh',
    title: 'A European\'s Guide to Noble Silence (Mauna) in India',
    category: 'Mindfulness',
    readTime: '8 min read',
    date: 'May 15, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Practical advice on preparing your mind and social habits for five or ten days without speech in a Himalayan sanctuary.',
    author: {
      name: 'Jean-Pierre Laurent',
      role: 'Mindfulness Coach',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    }
  },

  // --- AGRA ---
  {
    id: 'art-agra-symmetry',
    destination: 'agra',
    title: 'The Symmetry of Love: Geometry of the Taj Mahal',
    category: 'Architecture',
    readTime: '9 min read',
    date: 'May 10, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Explore how Mughal architects utilized optical illusions, mathematical symmetry, and Persian design to build the Taj Mahal.',
    author: {
      name: 'Dr. Marc Dubois',
      role: 'Professor of Architecture',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    }
  },

  // --- GOA ---
  {
    id: 'art-goa-ayurveda',
    destination: 'goa',
    title: 'Coastal Ayurveda: Healing Power of Salt and Coconut',
    category: 'Ayurveda',
    readTime: '7 min read',
    date: 'April 22, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80',
    excerpt: 'How coastal retreats harness salt air, pure cold-pressed coconut oil, and beach clay to detoxify tissues.',
    author: {
      name: 'Acharya Anil K. Prasad',
      role: 'Ayurvedic Physician',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    }
  },

  // --- DELHI ---
  {
    id: 'art-delhi-history',
    destination: 'delhi',
    title: 'Nizamuddin Sufi Music: 700 Years of Chants',
    category: 'History',
    readTime: '10 min read',
    date: 'March 18, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=600&q=80',
    excerpt: 'Tracing the origins of Qawwali music and the mystical poetry that echoes through Delhi\'s historic sandstone courtyards.',
    author: {
      name: 'Sarah Jenkins',
      role: 'Ethnomusicologist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    }
  }
];

export const events: EventFestival[] = [
  // --- RISHIKESH ---
  {
    id: 'evt-iyf',
    destination: 'rishikesh',
    title: 'International Yoga Festival',
    date: 'March 1 - March 7',
    month: 'MARCH',
    description: 'The world\'s most famous yoga gathering, uniting thousands of practitioners and hundreds of spiritual teachers from every corner of the planet.',
    highlights: ['70+ global yoga presenters', 'Ecstatic kirtan concert nights', 'Ganga cleansing bathing ceremonies'],
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'evt-dus',
    destination: 'rishikesh',
    title: 'Ganga Dussehra Festival',
    date: 'Late May or Early June',
    month: 'JUNE',
    description: 'A colorful ten-day celebration marking the day the holy river Ganga descended from heaven to earth. Ghats light up with millions of lamps.',
    highlights: ['Clay oil lamp floating ceremonies', 'Traditional Vedic fire rituals', 'Devotional music festivals'],
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=800&q=80'
  },

  // --- AGRA ---
  {
    id: 'evt-tajmahotsav',
    destination: 'agra',
    title: 'Taj Mahotsav Arts Festival',
    date: 'February 18 - February 27',
    month: 'FEB',
    description: 'A 10-day celebration of Indian art, crafts, music, dance, and culinary heritage. Showcases artisans from every state in India right next to the Taj East Gate.',
    highlights: ['500+ master craftsmen booths', 'Classical Kathak dance evenings', 'Royal elephant processions'],
    imageUrl: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=800&q=80'
  },

  // --- GOA ---
  {
    id: 'evt-goacarnival',
    destination: 'goa',
    title: 'The Royal Goan Carnival',
    date: 'Late February',
    month: 'FEB',
    description: 'A vibrant legacy of Portuguese heritage. Features colorful parades, street guitar music, floats, and grand beachside masquerade banquets.',
    highlights: ['King Momo street decree', 'Traditional Red and White Dances', 'Goan heritage food stalls'],
    imageUrl: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=800&q=80'
  },

  // --- DELHI ---
  {
    id: 'evt-qutubfest',
    destination: 'delhi',
    title: 'Qutub Festival of Music & Dance',
    date: 'Mid November',
    month: 'NOV',
    description: 'A grand cultural festival set against the illuminated backdrop of the Qutub Minar. Showcases Indian classical music, Sufi rhythms, and contemporary fusion.',
    highlights: ['Illuminated monument views', 'Sufi music performances', 'National dance troupe recitals'],
    imageUrl: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80'
  }
];

export const testimonials: Testimonial[] = [
  // --- RISHIKESH ---
  {
    id: 'test-1',
    destination: 'rishikesh',
    name: 'Charlotte Dubois',
    country: 'France',
    flag: '🇫🇷',
    quote: 'Spending two weeks at Vanya Sanctuary completely re-aligned my life priorities. Sleeping near the Ganges in eco-luxury was a dream. The booking was flawless, and the visa guide made it stress-free.',
    rating: 5,
    retreatTaken: 'Vanya River Retreat',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'test-2',
    destination: 'rishikesh',
    name: 'Maximilian Weber',
    country: 'Germany',
    flag: '🇩🇪',
    quote: 'As a skeptic of wellness retreats, I was blown away by the scientific basis of the Ayurveda programs at Ananda. The yoga masters here have a depth of knowledge I have never encountered in Europe.',
    rating: 5,
    retreatTaken: 'Ananda In The Himalayas',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },

  // --- AGRA ---
  {
    id: 'test-agra-1',
    destination: 'agra',
    name: 'Emma van der Berg',
    country: 'Netherlands',
    flag: '🇳🇱',
    quote: 'Watching the Taj Mahal turn from deep blue to bright orange at sunrise from my suite at Amarvilas was a defining moment. A masterclass in luxury and historical conservation.',
    rating: 5,
    retreatTaken: 'Oberoi Amarvilas Stay',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },

  // --- GOA ---
  {
    id: 'test-goa-1',
    destination: 'goa',
    name: 'Sven Lindqvist',
    country: 'Sweden',
    flag: '🇸🇪',
    quote: 'Taj Exotica Goan Ayurveda reset my digestion completely. Eating fresh spices in the organic farm and meditating on the quiet dunes of Mandrem beach felt like absolute heaven.',
    rating: 5,
    retreatTaken: 'Taj Jiva Spa Wellness',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  },

  // --- DELHI ---
  {
    id: 'test-delhi-1',
    destination: 'delhi',
    name: 'Alistair Montgomery',
    country: 'United Kingdom',
    flag: '🇬🇧',
    quote: 'The Sufi music at Nizamuddin Dargah was a spiritual awakening. Combining it with a private rickshaw food tour made Old Delhi feel safe, fascinating, and incredibly delicious.',
    rating: 5,
    retreatTaken: 'Old Delhi Luxury Tour',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  }
];

export const mapMarkers: MapMarker[] = [
  // --- RISHIKESH ---
  {
    id: 'm-ananda',
    destination: 'rishikesh',
    title: 'Ananda Wellness Estate',
    category: 'retreats',
    lat: 35,
    lng: 25,
    description: 'Palace luxury wellness retreat overlooking the entire river valley.',
    highlight: 'Award-winning Ayurvedic SPA',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'm-laxman',
    destination: 'rishikesh',
    title: 'Laxman Jhula Bridge',
    category: 'gems',
    lat: 48,
    lng: 42,
    description: 'Historic suspension bridge offering incredible valley photo spots.',
    highlight: 'Must-visit architectural icon',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'm-beatles',
    destination: 'rishikesh',
    title: 'The Beatles Ashram',
    category: 'ashrams',
    lat: 68,
    lng: 60,
    description: 'Ruins of Maharishi Mahesh Yogi ashram where the band composed the White Album.',
    highlight: 'Psychedelic graffiti & stone meditation domes',
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'm-triveni',
    destination: 'rishikesh',
    title: 'Triveni Ghat Aarti',
    category: 'gems',
    lat: 82,
    lng: 78,
    description: 'Confluence of Ganges, Yamuna and Saraswati. Host to the daily evening fire prayers.',
    highlight: 'Spiritual epicentre of chanting & lamps',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'm-ganga-cafe',
    destination: 'rishikesh',
    title: 'The Ganges View Cafe',
    category: 'cafes',
    lat: 52,
    lng: 50,
    description: 'Organic cafe offering artisan French press coffee, vegan cakes, and swings looking over the river.',
    highlight: 'Gluten-free & Ayurvedic menu options',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=200&q=80'
  },

  // --- AGRA ---
  {
    id: 'm-tajmahal',
    destination: 'agra',
    title: 'Taj Mahal',
    category: 'monuments',
    lat: 50,
    lng: 60,
    description: 'The world\'s ultimate white marble monument of love, built by Shah Jahan.',
    highlight: 'UNESCO World Heritage Site',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'm-agrafort',
    destination: 'agra',
    title: 'Agra Fort Palace',
    category: 'monuments',
    lat: 30,
    lng: 45,
    description: 'Imperial red sandstone walled fortress of the Mughal dynasty emperors.',
    highlight: 'Stunning palaces & river overlook towers',
    imageUrl: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'm-mehtab',
    destination: 'agra',
    title: 'Mehtab Bagh Gardens',
    category: 'gems',
    lat: 52,
    lng: 25,
    description: 'Moonlight pleasure gardens directly across the Yamuna river looking at the back of the Taj.',
    highlight: 'Best sunset reflections & silhouettes',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=200&q=80'
  },

  // --- GOA ---
  {
    id: 'm-mandrem',
    destination: 'goa',
    title: 'Mandrem Beach Sanctuary',
    category: 'gems',
    lat: 25,
    lng: 35,
    description: 'Quiet, pristine white sand beaches in North Goa. Home to crabs, dunes, and yoga shalas.',
    highlight: 'Ideal beachfront silence meditating',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'm-bomjesus',
    destination: 'goa',
    title: 'Basilica of Bom Jesus',
    category: 'heritage',
    lat: 60,
    lng: 55,
    description: 'Famous 16th-century Portuguese Jesuit church holding the tomb of St. Francis Xavier.',
    highlight: 'Baroque architecture & wood carvings',
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'm-spicefarm',
    destination: 'goa',
    title: 'Sahakari Spice Plantation',
    category: 'adventure',
    lat: 75,
    lng: 70,
    description: 'Organic farming reserve dedicated to cultivating high-grade spices, fruits, and betel nuts.',
    highlight: 'Traditional Goan spice lunch buffet',
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=200&q=80'
  },

  // --- DELHI ---
  {
    id: 'm-humayun',
    destination: 'delhi',
    title: 'Humayun\'s Tomb',
    category: 'monuments',
    lat: 65,
    lng: 55,
    description: 'Garden mausoleum built in 1570, initiating the grand red stone Mughal architecture phase.',
    highlight: 'Persian-style Charbagh four-fold layout',
    imageUrl: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'm-qutub',
    destination: 'delhi',
    title: 'Qutub Minar Tower',
    category: 'monuments',
    lat: 25,
    lng: 75,
    description: 'The world\'s tallest sandstone minaret tower (73m), carved with calligraphy and lattice.',
    highlight: 'UNESCO historic mosque site',
    imageUrl: 'https://images.unsplash.com/photo-1601058268499-e52658bdf57f?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'm-nizamuddin',
    destination: 'delhi',
    title: 'Nizamuddin Sufi Courtyard',
    category: 'ashrams',
    lat: 52,
    lng: 48,
    description: 'Vibrant narrow medieval settlement host to ancient Sufism, music chimes, and charity kitchen.',
    highlight: 'Live evening Qawwali devotion singing',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=200&q=80'
  }
];

export const tourHotspots: TourHotspot[] = [
  // --- RISHIKESH ---
  {
    id: 'hot-beatles',
    destination: 'rishikesh',
    name: 'The Beatles Ashram Domes',
    x: 30,
    y: 40,
    title: 'Meditation Domes (Beatles Ashram)',
    description: 'Built from local stones, these egg-shaped domes offer perfect acoustic resonance. The Beatles sat inside these to meditate with Maharishi Mahesh Yogi in 1968, writing over 40 songs.',
    audioDuration: '2:15',
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'hot-triveni',
    destination: 'rishikesh',
    name: 'Triveni Ghat Evening Devotion',
    x: 65,
    y: 70,
    title: 'Triveni Ganga Aarti Offering',
    description: 'Every evening at twilight, priest disciples recite Vedic hymns while rotating heavy brass oil lamps in unison. The light glows on the water as hundreds of bio-degradable leaf lamps drift downriver.',
    audioDuration: '4:40',
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=500&q=80'
  },

  // --- AGRA ---
  {
    id: 'hot-tajdome',
    destination: 'agra',
    name: 'Taj Mahal Marble Dome',
    x: 50,
    y: 45,
    title: 'The Great Cenotaph Chamber',
    description: 'The double dome of the Taj Mahal is an architectural marvel. It stands at 73m high. The acoustic reverb inside the white marble chamber is tuned to multiply devotional vocal humming by 15 seconds.',
    audioDuration: '3:45',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=500&q=80'
  },

  // --- GOA ---
  {
    id: 'hot-fontainhas',
    destination: 'goa',
    name: 'Fontainhas Latin Quarter',
    x: 40,
    y: 55,
    title: 'Fontainhas Portuguese Houses',
    description: 'A charming historic residential ward in Panaji. Houses are painted in bright pastel yellow, blue, and red with Portuguese tiled roofs, wooden balconies, and vintage street lamps.',
    audioDuration: '2:50',
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=500&q=80'
  },

  // --- DELHI ---
  {
    id: 'hot-delhipillar',
    destination: 'delhi',
    name: 'Qutub Iron Pillar',
    x: 48,
    y: 65,
    title: 'Gupta Dynasty Iron Pillar (400 AD)',
    description: 'Located inside the Qutub complex, this 7-meter high iron pillar has stood for 1600 years without rusting. A testimonial to ancient Indian metallurgy and blacksmith casting techniques.',
    audioDuration: '3:10',
    imageUrl: 'https://images.unsplash.com/photo-1601058268499-e52658bdf57f?auto=format&fit=crop&w=500&q=80'
  }
];
