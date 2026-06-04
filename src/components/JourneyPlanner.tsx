import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Wallet, Users, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

interface JourneyPlannerProps {
  activeDestination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
  openBooking: (initialData?: any) => void;
}

export const JourneyPlanner: React.FC<JourneyPlannerProps> = ({ activeDestination, openBooking }) => {
  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState('7-days');
  const [budget, setBudget] = useState('luxury');
  const [style, setStyle] = useState('solo');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [generatedItinerary, setGeneratedItinerary] = useState<any | null>(null);

  const interestsList = [
    { id: 'yoga', label: 'Yoga & Asanas' },
    { id: 'meditation', label: 'Mindful Meditation' },
    { id: 'ayurveda', label: 'Ayurveda & Healing' },
    { id: 'rafting', label: 'River Rafting' },
    { id: 'trekking', label: 'Mountain Hiking' },
    { id: 'spiritual', label: 'Spiritual Temples' },
    { id: 'wellness', label: 'Spa & Wellness' },
    { id: 'culture', label: 'Local Food & Arts' },
    { id: 'photography', label: 'Nature Photography' }
  ];

  const handleInterestToggle = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(i => i !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationLogs([]);
    
    const logs = [
      'Initiating Soul Connection Engine...',
      `Analyzing ${activeDestination.toUpperCase()} local availabilities...`,
      'Balancing Ayurvedic diet suggestions...',
      'Mapping climate conditions...',
      'Synchronizing local cultural guides...',
      'Itinerary fully customized.'
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setGenerationLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setIsGenerating(false);
          generateItineraryData();
        }
      }, (index + 1) * 800);
    });
  };

  const generateItineraryData = () => {
    let title = '';
    let description = '';
    let days: any[] = [];
    let totalPrice = 0;

    const basePrice = budget === 'boutique' ? 1200 : budget === 'luxury' ? 2400 : 4800;
    const durationDays = duration === '5-days' ? 5 : duration === '7-days' ? 7 : 14;
    totalPrice = basePrice * (durationDays / 7);

    if (activeDestination === 'rishikesh') {
      if (selectedInterests.includes('yoga') || selectedInterests.includes('meditation')) {
        title = `Rishikesh Spiritual Awakening: ${durationDays}-Day Retreat`;
        description = `A curated program focused on restoring inner harmony, exploring ancient scriptures, and practicing alignment by the Ganges.`;
        days = [
          { day: 1, title: 'Arrival & Purification', activity: 'Private airport pick-up from Dehradun, check-in, and introductory Ayurvedic doctor pulse consultation.', time: 'Afternoon', icon: '🧘' },
          { day: 2, title: 'Asana Alignment & Ganga Sunset', activity: 'Sunrise Hatha Yoga lesson, customized breakfast, and private boat crossing for Triveni Ghat evening prayer ceremony.', time: 'Morning & Evening', icon: '🌅' },
          { day: 3, title: 'Deep Noble Silence', activity: 'Vipassana silence walk through surrounding mountain forests, followed by a customized warm-oil Shirodhara body treatment.', time: 'Full Day', icon: '🤫' }
        ];
      } else {
        title = `Rishikesh Adventure & Rivers: ${durationDays}-Day Expedition`;
        description = `A high-vitality itinerary combining Ganges white-water rafting with sunrise mountain hikes and forest beach camps.`;
        days = [
          { day: 1, title: 'Himalayan Ridge Greeting', activity: 'Welcome drink in our mountain overlook dome, safety briefing, and light acclimation trek.', time: 'Afternoon', icon: '🏔️' },
          { day: 2, title: 'Rafting the Sacred Current', activity: '16km white water rafting adventure through Grade III-IV rapids. Beachside picnic lunch.', time: 'Morning & Afternoon', icon: '🌊' },
          { day: 3, title: 'Sunrise Kunjapuri Trek', activity: 'Pre-dawn jeep ride and trek to Kunjapuri Temple. Watch sunrise over the snow peaks, descend through rural waterfall trails.', time: 'Sunrise', icon: '☀️' }
        ];
      }
      if (durationDays >= 7) {
        days.push(
          { day: 4, title: 'Local Village & Ashram Life', activity: 'Visit to a rural school and community organic farm, participating in afternoon community lunch.', time: 'Midday', icon: '🏡' },
          { day: 5, title: 'Beats & Domes Exploration', activity: 'Explore the historical Beatles Ashram meditation domes. Sunset yoga on an open-air deck.', time: 'Afternoon', icon: '🎸' }
        );
      }
    } else if (activeDestination === 'agra') {
      title = `Agra Mughal Majesty: ${durationDays}-Day Royal Heritage`;
      description = `Delve into the zenith of Indian marble art, majestic imperial fortresses, and royal private Taj Mahal views.`;
      days = [
        { day: 1, title: 'Taj View Welcome', activity: 'Airport transfer to your luxury suite, check-in, and welcome tea on the private balcony overlooking the Taj dome.', time: 'Afternoon', icon: '🏰' },
        { day: 2, title: 'Sunrise Taj & Imperial Fort', activity: 'VIP early entrance to the Taj Mahal at dawn. Return for brunch, then explore Agra Fort\'s royal sandstone palaces.', time: 'Morning & Afternoon', icon: '🌅' },
        { day: 3, title: 'Craft Inlay & Sunset Garden', activity: 'Private masterclass in Pietra Dura marble setting. Afternoon visit to Mehtab Bagh gardens for Taj silhouettes.', time: 'Full Day', icon: '🎨' }
      ];
      if (durationDays >= 7) {
        days.push(
          { day: 4, title: 'Fatehpur Sikri Outpost', activity: 'Private SUV excursion to Akbar\'s ghost capital Fatehpur Sikri. Visit Buland Darwaza gate.', time: 'Morning', icon: '🐫' },
          { day: 5, title: 'Baby Taj & Local Markets', activity: 'Visit to Tomb of Itmad-ud-Daulah (Baby Taj). Shopping tour for fine embroidered leather and fabrics.', time: 'Afternoon', icon: '🛍️' }
        );
      }
    } else if (activeDestination === 'goa') {
      title = `Goa Sand, Spice & Soul: ${durationDays}-Day Coastal Retreat`;
      description = `Recharge with beachfront chakra yoga, spice plantation safaris, Portuguese history walks, and private sailing.`;
      days = [
        { day: 1, title: 'Beachside Jiva Relax', activity: 'Check-in to your oceanfront cottage. Conclude the day with a 90-minute warm-oil Ayurvedic body massage.', time: 'Afternoon', icon: '🏖️' },
        { day: 2, title: 'Spice Garden Herbal Feast', activity: 'Guided tour of a 100-acre organic spice estate. Traditional Goan lunch served buffet-style on banana leaves.', time: 'Midday', icon: '🍃' },
        { day: 3, title: 'Beachfront Yoga & Yachting', activity: 'Sunrise chakra alignment on Mandrem beach. Afternoon private catamaran charter along the Mandovi river.', time: 'Sunrise & Afternoon', icon: '⛵' }
      ];
      if (durationDays >= 7) {
        days.push(
          { day: 4, title: 'Latin Quarter Heritage Walk', activity: 'Guided walk through Fontainhas, Panaji. Admire pastel colored Portuguese houses and historic churches.', time: 'Morning', icon: '🏡' },
          { day: 5, title: 'Dudhsagar Waterfall Hike', activity: 'Jeep safari into the jungle leading to the Dudhsagar falls. Optional swim in the freshwater pool.', time: 'Full Day', icon: '💦' }
        );
      }
    } else {
      title = `Delhi Imperial Kingdoms: ${durationDays}-Day Urban Sanctuary`;
      description = `A high-end exploration of Delhi's 3,000-year history, Sufi devotional music, and legendary spice food paths.`;
      days = [
        { day: 1, title: 'Lodi Gardens Arrival', activity: 'Private transfer to your plunge pool suite. Evening light walk through ruins of Lodi dynasty.', time: 'Afternoon', icon: '🏨' },
        { day: 2, title: 'Mughal Architectural Gems', activity: 'VIP guided walks through Humayun\'s Tomb and Qutub Minar, analyzing early Persian geometry.', time: 'Morning & Afternoon', icon: '🏛️' },
        { day: 3, title: 'Chandni Chowk & Sufi Songs', activity: 'Rickshaw gastronomy safari in Old Delhi spice markets. At night, sit for Sufi music in Nizamuddin.', time: 'Full Day', icon: '🎵' }
      ];
      if (durationDays >= 7) {
        days.push(
          { day: 4, title: 'National Museum & Crafts', activity: 'Explore Harappan civilization artifacts. Join a local home cooking class specializing in traditional curry spices.', time: 'Midday', icon: '🏺' },
          { day: 5, title: 'Presidential Boulevard', activity: 'Drive down Rajpath, view India Gate, and enjoy high tea at a historic imperial garden lawn.', time: 'Afternoon', icon: '🍵' }
        );
      }
    }

    if (durationDays === 14) {
      days.push(
        { day: 6, title: 'Sound Healing Bath', activity: 'Acoustic sound bowl bath therapy for meditation rest.', time: 'Evening', icon: '🔔' },
        { day: 7, title: 'Ayurvedic Mid-Term Consultation', activity: 'Second health diagnosis with custom dietary adjustments.', time: 'Morning', icon: '🩺' }
      );
    }

    setGeneratedItinerary({
      title,
      description,
      duration: durationDays,
      budget,
      style,
      interests: selectedInterests,
      price: totalPrice,
      days
    });
    setStep(5);
  };

  const resetPlanner = () => {
    setStep(1);
    setGeneratedItinerary(null);
    setSelectedInterests([]);
  };

  return (
    <section id="planner" className="py-24 bg-cream-dark/40 dark:bg-charcoal-dark/40">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-2.5 bg-sunrise/10 dark:bg-sunrise/5 rounded-full text-sunrise">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal dark:text-cream">
            Interactive Journey Planner
          </h2>
          <p className="text-xs md:text-sm text-charcoal/60 dark:text-cream/60 max-w-lg mx-auto mt-3">
            Answer a few simple questions, and our planning engine will formulate a bespoke luxury wellness and heritage itinerary matching your requirements.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="glass-premium p-8 md:p-12 rounded-3xl shadow-xl border border-gold/20 min-h-[480px] flex flex-col justify-between">
          
          {/* Progress Indicators */}
          {step <= 4 && (
            <div className="flex items-center justify-between mb-8 border-b border-charcoal/5 dark:border-cream/5 pb-6">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step === s 
                        ? 'bg-sunrise text-white ring-4 ring-sunrise/20' 
                        : step > s 
                          ? 'bg-ganga text-white' 
                          : 'bg-charcoal/10 dark:bg-cream/10 text-charcoal/60 dark:text-cream/60'
                    }`}
                  >
                    {s}
                  </div>
                  <span className="hidden md:inline text-[10px] uppercase font-bold tracking-wider text-charcoal/50 dark:text-cream/50">
                    {s === 1 ? 'Duration' : s === 2 ? 'Budget' : s === 3 ? 'Style' : 'Interests'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Steps */}
          <div className="grow flex items-center justify-center">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Duration */}
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full flex flex-col gap-6"
                >
                  <h3 className="font-serif text-lg md:text-xl font-semibold text-charcoal dark:text-cream text-center">
                    How long will you remain in the sacred valley?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: '5-days', label: '5-Day Retreat', desc: 'Short spiritual rejuvenation reset' },
                      { id: '7-days', label: '7-Day Sanctuary', desc: 'Our standard transformational cycle' },
                      { id: '14-days', label: '14-Day Immersion', desc: 'Deep Ayurvedic & philosophy cleansing' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setDuration(opt.id)}
                        className={`p-6 rounded-2xl border text-center transition-all ${
                          duration === opt.id 
                            ? 'border-sunrise bg-sunrise/5 dark:bg-sunrise/10 text-sunrise shadow-md' 
                            : 'border-charcoal/10 dark:border-cream/10 hover:border-sunrise/40 hover:bg-cream-dark/50 dark:hover:bg-charcoal-light/50'
                        }`}
                      >
                        <Calendar className="w-6 h-6 mx-auto mb-3 text-sunrise" />
                        <h4 className="font-bold text-sm text-charcoal dark:text-cream">{opt.label}</h4>
                        <p className="text-[10px] text-charcoal/50 dark:text-cream/50 mt-1">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Budget */}
              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full flex flex-col gap-6"
                >
                  <h3 className="font-serif text-lg md:text-xl font-semibold text-charcoal dark:text-cream text-center">
                    Select your preferred accommodation tier:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'boutique', label: 'Eco-Boutique', desc: 'Authentic stone cabins & organic farms' },
                      { id: 'luxury', label: 'Luxury Sanctuary', desc: 'Custom glass suites & private platforms' },
                      { id: 'royal', label: 'Maharaja Royal', desc: 'Maharishi palace estate villas & infinity pools' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setBudget(opt.id)}
                        className={`p-6 rounded-2xl border text-center transition-all ${
                          budget === opt.id 
                            ? 'border-sunrise bg-sunrise/5 dark:bg-sunrise/10 text-sunrise shadow-md' 
                            : 'border-charcoal/10 dark:border-cream/10 hover:border-sunrise/40 hover:bg-cream-dark/50 dark:hover:bg-charcoal-light/50'
                        }`}
                      >
                        <Wallet className="w-6 h-6 mx-auto mb-3 text-sunrise" />
                        <h4 className="font-bold text-sm text-charcoal dark:text-cream">{opt.label}</h4>
                        <p className="text-[10px] text-charcoal/50 dark:text-cream/50 mt-1">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Travel Style */}
              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full flex flex-col gap-6"
                >
                  <h3 className="font-serif text-lg md:text-xl font-semibold text-charcoal dark:text-cream text-center">
                    Who will share this transformational experience?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: 'solo', label: 'Solo Traveler', desc: 'Introspective self-guided discovery' },
                      { id: 'couple', label: 'Mindful Couple', desc: 'Shared spiritual resonance & romance' },
                      { id: 'group', label: 'Group Sanctuary', desc: 'Shared family or community retreat' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setStyle(opt.id)}
                        className={`p-6 rounded-2xl border text-center transition-all ${
                          style === opt.id 
                            ? 'border-sunrise bg-sunrise/5 dark:bg-sunrise/10 text-sunrise shadow-md' 
                            : 'border-charcoal/10 dark:border-cream/10 hover:border-sunrise/40 hover:bg-cream-dark/50 dark:hover:bg-charcoal-light/50'
                        }`}
                      >
                        <Users className="w-6 h-6 mx-auto mb-3 text-sunrise" />
                        <h4 className="font-bold text-sm text-charcoal dark:text-cream">{opt.label}</h4>
                        <p className="text-[10px] text-charcoal/50 dark:text-cream/50 mt-1">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Interests */}
              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full flex flex-col gap-5"
                >
                  <h3 className="font-serif text-lg md:text-xl font-semibold text-charcoal dark:text-cream text-center">
                    Select your core focus areas (Select multiple):
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {interestsList.map((interest) => (
                      <button
                        key={interest.id}
                        onClick={() => handleInterestToggle(interest.id)}
                        className={`px-4 py-3.5 rounded-xl border text-center text-xs font-bold transition-all ${
                          selectedInterests.includes(interest.id)
                            ? 'border-sunrise bg-sunrise/5 dark:bg-sunrise/10 text-sunrise shadow-sm'
                            : 'border-charcoal/15 dark:border-cream/15 hover:border-sunrise/40 hover:bg-cream-dark/50 dark:hover:bg-charcoal-light/50'
                        }`}
                      >
                        {interest.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Loader Simulation */}
              {isGenerating && (
                <motion.div 
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full flex flex-col items-center justify-center gap-6"
                >
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-sunrise/20 animate-pulse" />
                    <div className="absolute inset-0 rounded-full border-4 border-sunrise border-t-transparent animate-spin" />
                  </div>
                  <div className="h-24 flex flex-col items-center justify-center gap-2">
                    {generationLogs.map((log, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-bold text-sunrise tracking-wider uppercase"
                      >
                        {log}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 5: Finished Itinerary Output */}
              {step === 5 && generatedItinerary && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full flex flex-col gap-6"
                >
                  <div className="text-center border-b border-charcoal/10 dark:border-cream/10 pb-5">
                    <span className="text-[10px] font-bold text-sunrise tracking-widest uppercase">Your Customized Spiritual Blueprint</span>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-charcoal dark:text-cream mt-2">
                      {generatedItinerary.title}
                    </h3>
                    <p className="text-xs text-charcoal/60 dark:text-cream/60 mt-2 max-w-xl mx-auto">
                      {generatedItinerary.description}
                    </p>
                  </div>

                  {/* Day Timeline */}
                  <div className="flex flex-col gap-6 max-h-[300px] overflow-y-auto pr-3 scrollbar">
                    {generatedItinerary.days.map((d: any, idx: number) => (
                      <div key={idx} className="flex gap-4 border-l-2 border-sunrise/30 pl-4 relative ml-4">
                        {/* Timeline bubble */}
                        <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-cream dark:bg-charcoal border-2 border-sunrise flex items-center justify-center text-xs shadow-sm">
                          {d.icon}
                        </div>
                        <div>
                          <span className="text-[9px] uppercase font-extrabold tracking-widest text-saffron">Day {d.day} • {d.time}</span>
                          <h4 className="font-serif text-sm font-semibold text-charcoal dark:text-cream mt-0.5">{d.title}</h4>
                          <p className="text-xs text-charcoal/70 dark:text-cream/70 mt-1 leading-relaxed">{d.activity}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price & Action */}
                  <div className="flex flex-col sm:flex-row items-center justify-between border-t border-charcoal/10 dark:border-cream/10 pt-6 gap-4">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-charcoal/50 dark:text-cream/50">Estimated All-Inclusive Cost</span>
                      <p className="text-xl md:text-2xl font-serif font-extrabold text-charcoal dark:text-cream leading-none mt-1">
                        ~{generatedItinerary.price.toLocaleString('en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })} <span className="text-xs font-sans font-light text-charcoal/50 dark:text-cream/50">/ person</span>
                      </p>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={resetPlanner}
                        className="px-5 py-2.5 border border-charcoal/15 dark:border-cream/15 text-[10px] font-bold uppercase tracking-wider text-charcoal dark:text-cream rounded-full hover:bg-cream-dark dark:hover:bg-charcoal-light transition-all"
                      >
                        Reset Planner
                      </button>
                      <button
                        onClick={() => openBooking({
                          duration: generatedItinerary.duration,
                          budget: generatedItinerary.budget,
                          interests: generatedItinerary.interests
                        })}
                        className="px-6 py-2.5 bg-gradient-to-r from-sunrise to-saffron text-white text-[10px] font-bold uppercase tracking-wider rounded-full hover:shadow-lg transition-all"
                      >
                        Proceed to Booking
                      </button>
                    </div>
                  </div>

                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Footer Controls */}
          {step <= 4 && !isGenerating && (
            <div className="flex items-center justify-between border-t border-charcoal/5 dark:border-cream/5 pt-6 mt-8">
              <button
                disabled={step === 1}
                onClick={() => setStep(step - 1)}
                className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-charcoal/60 dark:text-cream/60 hover:text-charcoal dark:hover:text-cream ${
                  step === 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex items-center gap-1.5 px-5 py-2 bg-charcoal dark:bg-cream text-white dark:text-charcoal rounded-full text-[10px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleGenerate}
                  className="flex items-center gap-1.5 px-6 py-2 bg-gradient-to-r from-sunrise to-saffron text-white rounded-full text-[10px] font-bold uppercase tracking-wider hover:shadow-lg transition-all"
                >
                  <span>Generate Blueprint</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
