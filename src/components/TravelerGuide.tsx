import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ShieldAlert, Sun, Coins, HelpCircle, Wifi, Compass, Plane, ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  excerpt: string;
  content: string[];
}

interface TravelerGuideProps {
  activeDestination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
}

export const TravelerGuide: React.FC<TravelerGuideProps> = ({ activeDestination }) => {
  const [openSection, setOpenSection] = useState<string | null>('visa');

  // Dynamic contents based on selected destination
  const transferInfo = {
    rishikesh: {
      excerpt: 'Rishikesh is ~250km from Delhi. We recommend flying to Dehradun (DED) or a private SUV.',
      content: [
        'Option A (Recommended): Book a domestic flight from Indira Gandhi Airport (DEL) in Delhi to Dehradun Airport (DED), which takes 45 minutes. From Dehradun, Rishikesh is a scenic 40-minute drive. We arrange private luxury SUVs for this pick-up.',
        'Option B: Hire a pre-booked air-conditioned private taxi from Delhi directly to Rishikesh (5-6 hours ride via the Delhi-Meerut expressway).',
        'Option C: Take the Shatabdi Express train from New Delhi Railway Station to Haridwar Station, then a taxi (30 mins) to Rishikesh.'
      ]
    },
    agra: {
      excerpt: 'Agra is ~230km from Delhi. Take the Gatimaan Express train or private SUV.',
      content: [
        'Option A (Recommended): Take the Gatimaan Express train from Hazrat Nizamuddin Station in Delhi to Agra Cantt. It is India\'s fastest train, takes only 90 minutes, and offers comfortable executive AC coaches.',
        'Option B: Hire a private luxury SUV transfer from Delhi to Agra via the modern, high-speed Yamuna Expressway (3 to 4 hours depending on city traffic).',
        'Option C: Direct private shuttle transfer arranged by our luxury partner hotels (e.g. Oberoi Amarvilas).'
      ]
    },
    goa: {
      excerpt: 'Goa is in South-West India. Fly directly to Goa International Airport (GOI or MOPA).',
      content: [
        'Option A (Recommended): Book a direct domestic flight from Delhi (DEL), Mumbai (BOM) or Bangalore (BLR) to Goa\'s Manohar International Airport in Mopa (North Goa) or Dabolim Airport (South Goa). Flights from Delhi take ~2.5 hours.',
        'Option B: We arrange private luxury airport transfers from both airports directly to your beachfront spa retreat.',
        'Option C: European flights sometimes transit via Mumbai or Doha directly into Goa, skipping Delhi altogether.'
      ]
    },
    delhi: {
      excerpt: 'Delhi is India\'s capital. Fly directly to Indira Gandhi International Airport (DEL).',
      content: [
        'Option A (Recommended): Fly directly to Indira Gandhi International Airport (DEL) from major European hubs (London, Frankfurt, Paris, Amsterdam).',
        'Option B: We arrange a direct terminal meet-and-greet service to expedite immigration, baggage claim, and escort you to your private chauffeur SUV.',
        'Option C: Utilize licensed radio cabs or pre-arranged hotel shuttles for all urban transits.'
      ]
    }
  };

  const weatherInfo = {
    rishikesh: {
      excerpt: 'October to April offers crisp mountain air, ideal yoga climates, and river rafting.',
      content: [
        'Autumn/Winter (October to February): Cool, sunny days (15°C to 25°C) and crisp nights. Ideal for trekking, sitting by the river, and intensive outdoor yoga.',
        'Spring (March to April): Warm, beautiful weather. The valley is in bloom. The International Yoga Festival takes place in early March.',
        'Monsoon (July to September): Heavy rainfall. River rafting is suspended, but the surrounding hills turn into a lush, misty forest.'
      ]
    },
    agra: {
      excerpt: 'October to March offers pleasant, cool weather for exploring marble monuments.',
      content: [
        'Winter Season (October to March): Very comfortable weather (10°C to 25°C), perfect for outdoor walks around the Taj and Agra Fort. Early mornings can be misty.',
        'Summer Season (April to June): Extreme dry heat (up to 42°C). Monument visits are best done at sunrise.',
        'Monsoon Season (July to September): Humid with moderate rainfall. The gardens around the monuments turn beautiful and green.'
      ]
    },
    goa: {
      excerpt: 'November to February offers sunny skies and perfect sea temperatures.',
      content: [
        'Winter Season (November to February): Clear blue skies, gentle sea breezes, and temperatures around 28°C to 32°C. Ideal for beach wellness retreats.',
        'Shoulder Season (March to May): Hot and humid, leading into the monsoons. Great for quiet, low-crowd spa stays.',
        'Monsoon Season (June to October): Heavy rainfall. Most beach activities shut down, but the inland spice plantations and forest waterfalls are spectacular.'
      ]
    },
    delhi: {
      excerpt: 'October to March is the best time for pleasant heritage walks and dining.',
      content: [
        'Winter Season (October to March): Cool, pleasant days (12°C to 22°C), though December and January can get chilly and foggy. Ideal for sightseeing and walking tours.',
        'Summer Season (April to June): Extremely hot (sometimes exceeding 45°C). Outdoor excursions should be limited to early mornings.',
        'Monsoon Season (July to September): Humid with heavy downpours, offering relief from the summer heat.'
      ]
    }
  };

  const safetyInfo = {
    rishikesh: {
      excerpt: 'Rishikesh is exceptionally safe and is a dry, vegetarian holy town.',
      content: [
        'Water: Drink ONLY sealed bottled mineral water or purified water provided by luxury retreats. Avoid ice in local establishments.',
        'Food & Alcohol: Rishikesh is a strictly vegetarian and alcohol-free holy city. Enjoy delicious, safe Ayurvedic, vegan, and traditional meals.',
        'General Safety: Locals are exceptionally friendly. Dress modestly when visiting active temples and ashrams (knees and shoulders covered).'
      ]
    },
    agra: {
      excerpt: 'Agra is heavily policed in monument zones. Enjoy Mughlai cuisine and fine dining.',
      content: [
        'Water & Street Food: Avoid street vendor foods. Fine dining in established luxury resorts is completely safe. Drink only sealed bottled mineral water.',
        'Attire & Guides: Dress modestly at historical sites. We recommend using only certified guides arranged by your resort to avoid unauthorized touts.',
        'Alcohol & Nightlife: Alcohol is served in licensed hotels and upscale lounges. The monument zone itself is peaceful and highly secure.'
      ]
    },
    goa: {
      excerpt: 'Goa is a relaxed, friendly coastal state. Excellent seafood and diverse dining.',
      content: [
        'Beach Attire: Swimwear is perfectly fine on beaches and resort pools. When walking through villages or visiting temples/churches, please dress modestly.',
        'Food & Drink: Famous for fresh ocean seafood and local cashew feni. Restaurants and beach shacks are highly diverse and cater to European tastes.',
        'Transport Safety: Renting scooters is popular, but always wear a helmet. For night transits, we recommend pre-arranged resort drivers.'
      ]
    },
    delhi: {
      excerpt: 'Delhi has world-class modern facilities. Exercise standard urban travel practices.',
      content: [
        'Culinary Safety: Delhi is India\'s food capital. Enjoy street food only at highly hygienic taste-tested stalls recommended by our guides, or dine in upscale restaurants.',
        'Attire: Dress conservatively when visiting historical mosques or temples (head covering is sometimes required, remove shoes).',
        'Metro & Taxis: The Delhi Metro is clean, fast, and safe. For late-night travel, always use pre-booked private hotel chauffeurs.'
      ]
    }
  };

  const etiquetteInfo = {
    rishikesh: {
      excerpt: 'Respect local customs: remove shoes at temples, avoid public alcohol consumption.',
      content: [
        'Temples: Always remove your shoes before entering any temple or sacred room. Place them in designated areas.',
        'Holy River: The Ganges is treated as a mother goddess. Avoid washing trash or dirty items in the water, and enter with respect.',
        'Greetings: Say "Namaste" with palms joined at the chest. It is a beautiful local greeting acknowledging the divine spark in others.'
      ]
    },
    agra: {
      excerpt: 'Respect sacred architecture. Quiet conduct inside mausoleums.',
      content: [
        'Taj Chamber: Maintain silence inside the main Taj dome cenotaph chamber. Photography is strictly prohibited inside the mausoleum itself.',
        'Footwear: You will be provided shoe covers at the Taj Mahal entrance. Remove shoes or use covers at all active platforms.',
        'Cultural Respect: Respect the history and local vendors. A polite "No, thank you" is sufficient if you do not wish to purchase souvenirs.'
      ]
    },
    goa: {
      excerpt: 'Eco-conscious beach rules. Respect temple and church protocols.',
      content: [
        'Eco-Beach Care: Keep beaches clean. Avoid littering or collecting shells near protected turtle nesting grounds in Mandrem/Morjim.',
        'Churches & Temples: Remove shoes before entering Hindu temples. Dress conservatively (covered shoulders/legs) when entering churches like Basilica of Bom Jesus.',
        'Greetings: Say "Namaste" or utilize friendly English/Portuguese greetings which are widely understood by Goans.'
      ]
    },
    delhi: {
      excerpt: 'Etiquette in historical sites. Mind protocols in active shrines.',
      content: [
        'Sufi Courtyards: When visiting Nizamuddin Dargah, cover your head (scarves are provided) and dress very conservatively. Remove shoes before entering the courtyard.',
        'Photography: Respect signs. Some active historical temples forbid taking pictures of inner sanctum deity statues.',
        'Greetings: Join palms and say "Namaste" or "Namaskar" to greet elders and guides.'
      ]
    }
  };

  const guideItems: AccordionItem[] = [
    {
      id: 'visa',
      icon: <FileText className="w-5 h-5 text-sunrise" />,
      title: 'Visa Information',
      excerpt: 'Most European Union & UK citizens require an e-Tourist Visa. Apply 4-30 days prior.',
      content: [
        'Apply for the e-Tourist Visa (30 Days, 1 Year, or 5 Years) only via the official Indian Government website (indianvisaonline.gov.in).',
        'Requirements: A scanned copy of passport bio page (must have 6 months validity) and a digital passport-size photograph with white background.',
        'Typically processed in 24-72 hours. Print out the ETA (Electronic Travel Authorization) paper to present at immigration.'
      ]
    },
    {
      id: 'transfers',
      icon: <Plane className="w-5 h-5 text-sunrise" />,
      title: 'Sanctuary Transfers',
      excerpt: transferInfo[activeDestination].excerpt,
      content: transferInfo[activeDestination].content
    },
    {
      id: 'best-time',
      icon: <Sun className="w-5 h-5 text-sunrise" />,
      title: 'Best Time to Visit',
      excerpt: weatherInfo[activeDestination].excerpt,
      content: weatherInfo[activeDestination].content
    },
    {
      id: 'currency',
      icon: <Coins className="w-5 h-5 text-sunrise" />,
      title: 'Currency & Banking',
      excerpt: 'Indian Rupee (INR). Cards are widely accepted in retreats, but carry cash for local markets.',
      content: [
        'The currency is the Indian Rupee (INR). Currency exchanges are easily accessible in Tapovan, tourist offices, and airports.',
        'Notify your bank before travel to avoid cards being blocked. Visa and Mastercard are accepted at major resorts, but small organic cafes, bookshops, and local markets require cash.',
        'ATMs are readily available. We recommend using ATMs located inside bank branches for safety.'
      ]
    },
    {
      id: 'safety',
      icon: <ShieldAlert className="w-5 h-5 text-sunrise" />,
      title: 'Health & Safety Guide',
      excerpt: safetyInfo[activeDestination].excerpt,
      content: safetyInfo[activeDestination].content
    },
    {
      id: 'internet',
      icon: <Wifi className="w-5 h-5 text-sunrise" />,
      title: 'Internet & local SIM cards',
      excerpt: 'High-speed fiber WiFi is standard in retreats. eSIMs can be purchased digitally.',
      content: [
        'We recommend purchasing an eSIM (e.g. Airalo, Holafly) before departure for instant data upon landing in India.',
        'Alternatively, you can buy a local physical SIM card (Airtel or Jio) at Delhi airport or in tourist hubs. You will need a copy of your passport, visa, and a passport photograph.',
        'Most hotels and cafes provide complimentary high-speed WiFi, but cellular coverage is useful for navigating.'
      ]
    },
    {
      id: 'etiquette',
      icon: <Compass className="w-5 h-5 text-sunrise" />,
      title: 'Cultural Etiquette',
      excerpt: etiquetteInfo[activeDestination].excerpt,
      content: etiquetteInfo[activeDestination].content
    }
  ];

  const toggleSection = (id: string) => {
    if (openSection === id) {
      setOpenSection(null);
    } else {
      setOpenSection(id);
    }
  };

  return (
    <section id="guide" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Text Graphic Column */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-5">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-saffron">International Travel Kit</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal dark:text-cream leading-tight">
            European Traveler Guide
          </h2>
          <p className="text-xs md:text-sm text-charcoal/70 dark:text-cream/70 leading-relaxed font-light">
            We understand the needs of European travelers seeking comfort, safety, and authenticity. This guide answers your logistical questions so you can travel with complete confidence.
          </p>
          <div className="p-5 border border-gold/20 rounded-2xl bg-sunrise/5 dark:bg-sunrise/10 flex gap-4 mt-2">
            <div className="p-3 bg-sunrise/15 text-sunrise rounded-full shrink-0 h-fit">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-sm font-semibold text-charcoal dark:text-cream">Need Direct Consultation?</h4>
              <p className="text-[11px] text-charcoal/65 dark:text-cream/65 leading-relaxed mt-1">
                Our custom service desk arranges direct door-to-door shuttles, personalized translators, and fast visa assistance for all clients.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Accordion Column */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {guideItems.map((item) => {
            const isOpen = openSection === item.id;
            return (
              <div 
                key={item.id} 
                className="glass-premium rounded-2xl overflow-hidden border border-gold/15 transition-all shadow-sm"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleSection(item.id)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                >
                  <div className="flex gap-4">
                    <div className="p-2 bg-sunrise/5 dark:bg-sunrise/10 rounded-xl shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-serif text-sm md:text-base font-semibold text-charcoal dark:text-cream">{item.title}</h3>
                      <p className="text-[10px] text-charcoal/50 dark:text-cream/50 mt-1">{item.excerpt}</p>
                    </div>
                  </div>
                  <div>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-sunrise" /> : <ChevronDown className="w-4 h-4 text-sunrise" />}
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-charcoal/5 dark:border-cream/5 ml-14">
                        <ul className="flex flex-col gap-3">
                          {item.content.map((point, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs text-charcoal/65 dark:text-cream/65 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0 mt-2" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
