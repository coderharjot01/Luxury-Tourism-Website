import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// A simple count-up animator component
const CountUp: React.FC<{ end: number; prefix?: string; suffix?: string; duration?: number }> = ({ 
  end, prefix = '', suffix = '', duration = 2000 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercent = Math.min(progress / duration, 1);
      
      setCount(Math.floor(progressPercent * end));

      if (progressPercent < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

interface WhyRishikeshProps {
  activeDestination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
}

export const WhyRishikesh: React.FC<WhyRishikeshProps> = ({ activeDestination }) => {
  const contentMap = {
    rishikesh: {
      title: 'Why Seek Yoga & Wellness?',
      subtitle: 'A Place of Pilgrimage',
      desc: 'Nestled at the confluence of the mystical Ganga and the towering foothills of the Himalayas, Rishikesh is more than a location—it is a spiritual catalyst for human transformation.',
      stats: [
        { value: 500, suffix: '+', label: 'Yoga Schools Alliance' },
        { value: 1, prefix: '', suffix: 'M+', label: 'Annual Global Visitors' },
        { value: 100, suffix: '+', label: 'Luxury Retreat Centers' },
        { value: 365, suffix: ' Days', label: 'Spiritual Experiences' }
      ],
      topics: [
        {
          id: 'yoga-capital',
          title: 'Yoga Capital of the World',
          description: 'For centuries, Rishikesh has served as a spiritual magnet. Anchored on the sacred banks of the Ganges, it attracts globally acclaimed yogis and novices alike seeking classical lineage alignment.',
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
          badge: 'Classical Tradition'
        },
        {
          id: 'meditation-mindfulness',
          title: 'Meditation & Mindfulness',
          description: 'The surrounding Garhwal Himalayas create an atmospheric sound chamber of absolute peace. Retreat centers offer silent sanctuaries where you can master Vipassana, Vedic chanting, and sound bowl therapies.',
          image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
          badge: 'Noble Silence'
        },
        {
          id: 'spiritual-heritage',
          title: 'Spiritual Heritage & Rituals',
          description: 'From ancient stone ashram arches to the daily rhythmic fire offering (Aarti) at Triveni Ghat, Rishikesh vibrates with an unbroken lineage of devotional music, scriptures, and sacred stories.',
          image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=800&q=80',
          badge: 'Sacred Lineage'
        },
        {
          id: 'adventure-capital',
          title: 'Himalayan Adventure Capital',
          description: 'Beyond introspection, Rishikesh offers a rush of life-affirming activities. Challenge yourself with Grade III-IV rapids on the cold Ganges waters, bungee jump off cliffs, or trek ancient temple ridges.',
          image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80',
          badge: 'Raw Vitality'
        }
      ]
    },
    agra: {
      title: 'Why Seek Heritage & Wonders?',
      subtitle: 'The Zenith of Empire',
      desc: 'Agra represents the poetic visual narrative of the Mughal Empire. A city of marble carvings, majestic sandstone parapets, and standard world wonders.',
      stats: [
        { value: 1, suffix: ' Taj', label: 'World Wonder Monument' },
        { value: 8, prefix: '', suffix: 'M+', label: 'Annual Global Visitors' },
        { value: 50, suffix: '+', label: 'Marble Craft Workshops' },
        { value: 300, suffix: ' Years', label: 'Of Mughal Sovereignty' }
      ],
      topics: [
        {
          id: 'taj-monument',
          title: 'The Great Monument of Love',
          description: 'Constructed under emperor Shah Jahan as a mausoleum for his beloved wife, Mumtaz Mahal, the Taj Mahal represents the absolute height of symmetric marble geometry and design.',
          image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
          badge: 'Taj Mahal Wonder'
        },
        {
          id: 'agra-fort',
          title: 'The Sandstone Palace Citadel',
          description: 'Constructed by Emperor Akbar, Agra Fort stands as a massive crescent-shaped fortress city in deep red sandstone, holding royal private audience chambers looking at the river Yamuna.',
          image: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80',
          badge: 'Agra Fort Palace'
        },
        {
          id: 'marble-inlay',
          title: 'Vedic Marble Pietra Dura',
          description: 'Agra is famous for its intricate marble inlay crafts. Watch master craftsmen manually shape semi-precious lapis, carnelian, and malachite stones, pressing them into pure white marble sheets.',
          image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=800&q=80',
          badge: 'Craft Heritage'
        },
        {
          id: 'ghost-capital',
          title: 'Fatehpur Sikri Excursions',
          description: 'A short drive leads to the magnificent ghost-capital of Fatehpur Sikri. Wander through imperial courts, water pools, and heavy gates representing Mughal-Hindu religious syncretism.',
          image: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80',
          badge: 'Fatehpur Sikri'
        }
      ]
    },
    goa: {
      title: 'Why Seek Sandy Solitude?',
      subtitle: 'The Eco-Coastal Sanctuary',
      desc: 'Goa merges coastal European Portuguese layouts with Indian wellness. Retreat to silent sandy dunes, cardamom farms, and ocean healing baths.',
      stats: [
        { value: 50, suffix: '+', label: 'Eco-Luxury Dunes Beaches' },
        { value: 2, prefix: '', suffix: 'M+', label: 'Annual Beach Visitors' },
        { value: 80, suffix: '+', label: 'Yoga & Spa Shalas' },
        { value: 100, suffix: '+', label: 'Portuguese Mansions' }
      ],
      topics: [
        {
          id: 'beach-yoga',
          title: 'Beach Meditation Shalas',
          description: 'Recharge your prana on the silent sandy beaches of Mandrem and Arambol. Drift off to the rhythm of high tides and coastal wind breeze chimes.',
          image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
          badge: 'Beach Shalas'
        },
        {
          id: 'organic-spice',
          title: 'Organic Spice Plantations',
          description: 'Wander under canopies of green cardamoms, pepper vines, and vanilla orchids. Conclude with a farm-to-table lunch served on broad green banana leaves.',
          image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80',
          badge: 'Spice Farms'
        },
        {
          id: 'latin-quarter',
          title: 'Fontainhas Portuguese Heritage',
          description: 'Walk through the historical Latin Quarter in Panaji, featuring brightly painted pastel villas, red tiled roofs, and narrow alleys reflecting Portuguese heritage.',
          image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
          badge: 'Latin Quarter'
        },
        {
          id: 'waterfalls-jungle',
          title: 'Dudhsagar Rainforest Falls',
          description: 'Challenge your body with a trek through the Western Ghats jungle towards Dudhsagar Falls. A four-tiered white waterfall cascading into a giant freshwater pool.',
          image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80',
          badge: 'Jungle Trails'
        }
      ]
    },
    delhi: {
      title: 'Why Seek Walled Kingdoms?',
      subtitle: 'The Heart of Dynasties',
      desc: 'Delhi represents 3,000 years of imperial history. Walk through architectural mausoleums, rickshaw through wholesale markets, and listen to Sufi music.',
      stats: [
        { value: 3000, suffix: ' Yrs', label: 'Of Continuous History' },
        { value: 5, prefix: '', suffix: 'M+', label: 'Cultural Tourists Annual' },
        { value: 120, suffix: '+', label: 'Protected Monuments' },
        { value: 1000, suffix: '+', label: 'Culinary Safe Trails' }
      ],
      topics: [
        {
          id: 'lodi-gardens',
          title: 'Lodi Gardens Meditation',
          description: 'Sit in absolute peace amongst the 15th-century stone tombs of the Lodi and Sayyid dynasties. A vast park where heritage meet modern urban birdwalks.',
          image: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80',
          badge: 'Lodi Gardens'
        },
        {
          id: 'delhi-monuments',
          title: 'Mughal Architectural Wonders',
          description: 'Visit Humayun’s Tomb and the towering red sandstone Qutub Minar. Analyze the geometric progression from Persian layout styles to Indian stonework.',
          image: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=800&q=80',
          badge: 'Imperial Architecture'
        },
        {
          id: 'sufi-devotion',
          title: 'Nizamuddin Sufi Music Chants',
          description: 'Sit in the stone courtyard of Dargah Nizamuddin Aulia. Watch Sufi disciples sing traditional devotional poetry (Qawwali) accompanied by harmoniums.',
          image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=800&q=80',
          badge: 'Sufi Devotion'
        },
        {
          id: 'chandni-chowk',
          title: 'Old Delhi Rickshaw Culinary',
          description: 'Cycle through the narrow medieval streets of Chandni Chowk. Smell heaps of cardamoms and chilies in Khari Baoli, the biggest spice market in Asia.',
          image: 'https://images.unsplash.com/photo-1601058268499-e52658bdf57f?auto=format&fit=crop&w=800&q=80',
          badge: 'Spice Trails'
        }
      ]
    }
  }[activeDestination];

  return (
    <section id="sanctuary-story" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-saffron">{contentMap.subtitle}</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal dark:text-cream mt-2">
          {contentMap.title}
        </h2>
        <p className="text-xs md:text-sm text-charcoal/60 dark:text-cream/60 leading-relaxed mt-4">
          {contentMap.desc}
        </p>
      </div>

      {/* Animated Stats Dashboard */}
      <div key={`stats-${activeDestination}`} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {contentMap.stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="glass-premium p-6 rounded-2xl text-center border border-gold/15 flex flex-col items-center justify-center gap-1.5"
          >
            <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-charcoal dark:text-cream">
              <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </span>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-charcoal/50 dark:text-cream/50">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Editorial Content Grid (Alternating Columns) */}
      <div key={`topics-${activeDestination}`} className="flex flex-col gap-16 md:gap-24">
        {contentMap.topics.map((topic, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={topic.id}
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}
            >
              {/* Image Frame */}
              <div className="w-full lg:w-1/2">
                <motion.div 
                  className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Decorative corner borders */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-gold z-20 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-gold z-20 pointer-events-none" />
                  
                  {/* Backdrop Zoom */}
                  <img 
                    src={topic.image} 
                    alt={topic.title} 
                    className="w-full h-[320px] md:h-[400px] object-cover filter brightness-[0.9] group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 z-15">
                    <span className="px-3.5 py-1.5 bg-cream/95 text-charcoal text-[9px] font-extrabold uppercase tracking-widest rounded-full shadow-md">
                      {topic.badge}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Text Editorial */}
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-[1px] bg-sunrise" />
                  <span className="text-[10px] font-bold text-sunrise tracking-widest uppercase">Sacred Wisdom</span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal dark:text-cream leading-tight">
                  {topic.title}
                </h3>
                <p className="text-xs md:text-sm text-charcoal/70 dark:text-cream/70 leading-relaxed font-light">
                  {topic.description}
                </p>
                <div className="flex flex-col gap-2 mt-2">
                  {[
                    'Guided by native lineage practitioners with global experience',
                    'Eco-sustainable facilities respecting the Himalayan ecology',
                    'Integrative medical assessments and full organic diet regimens'
                  ].map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[11px] text-charcoal/60 dark:text-cream/60 leading-tight">
                      <div className="p-0.5 bg-saffron/10 text-saffron rounded-full mt-0.5">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
