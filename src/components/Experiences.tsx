import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences, type Experience } from '../data/mockData';
import { Compass, Clock, Check, X, ShieldAlert, Activity } from 'lucide-react';

interface ExperiencesProps {
  openBooking: (initialData?: any) => void;
  activeDestination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
}

export const Experiences: React.FC<ExperiencesProps> = ({ openBooking, activeDestination }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  const categoryLabels: Record<string, string> = {
    all: 'All Experiences',
    yoga: 'Yoga & Wellness',
    meditation: 'Meditation',
    ayurveda: 'Ayurveda',
    adventure: 'Adventure',
    culture: 'Cultural & Sufi',
    heritage: 'Heritage Tours',
    food: 'Gastronomy'
  };

  const destinationExps = experiences.filter(exp => exp.destination === activeDestination);

  const categories = [
    { id: 'all', label: 'All Experiences' },
    ...Array.from(new Set(destinationExps.map(exp => exp.category))).map(cat => ({
      id: cat,
      label: categoryLabels[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)
    }))
  ];

  useEffect(() => {
    setActiveCategory('all');
  }, [activeDestination]);

  const filteredExps = activeCategory === 'all' 
    ? destinationExps 
    : destinationExps.filter(exp => exp.category === activeCategory);

  return (
    <section id="experiences" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-saffron">Immersive Pathways</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal dark:text-cream mt-2">
            Curated Immersive Experiences
          </h2>
          <p className="text-xs md:text-sm text-charcoal/60 dark:text-cream/60 max-w-lg mt-3 leading-relaxed">
            Choose your gateway. From silent Vipassana stays to rapid-river navigating, each package is custom crafted with professional logistics.
          </p>
        </div>

        {/* Categories Selector */}
        <div className="flex flex-wrap gap-2 shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4.5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-charcoal dark:bg-cream text-white dark:text-charcoal shadow-md scale-[1.03]'
                  : 'bg-cream-dark/50 dark:bg-charcoal-light/50 border border-charcoal/5 dark:border-cream/5 text-charcoal/70 dark:text-cream/70 hover:bg-cream-dark dark:hover:bg-charcoal-light'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Experiences */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredExps.map((exp) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              key={exp.id}
              className="glass-premium rounded-2xl overflow-hidden shadow-md flex flex-col justify-between border border-gold/15 group cursor-pointer hover:shadow-xl transition-all"
              onClick={() => setSelectedExp(exp)}
            >
              <div>
                {/* Card Image */}
                <div className="relative overflow-hidden h-[240px]">
                  <img 
                    src={exp.imageUrl} 
                    alt={exp.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.95]" 
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-charcoal/80 text-white text-[9px] font-bold uppercase tracking-wider rounded-md backdrop-blur-sm">
                      {exp.subtitle}
                    </span>
                    {exp.difficulty && (
                      <span className={`px-3 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md text-white ${
                        exp.difficulty === 'Gentle' ? 'bg-forest/80' : exp.difficulty === 'Moderate' ? 'bg-saffron/80' : 'bg-sunrise/80'
                      }`}>
                        {exp.difficulty}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-cream/95 dark:bg-charcoal/95 px-3 py-1 rounded-md shadow-sm">
                    <span className="text-[10px] font-bold text-sunrise tracking-wider">{exp.duration}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-serif text-lg font-semibold text-charcoal dark:text-cream group-hover:text-sunrise transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-charcoal/65 dark:text-cream/65 mt-2 line-clamp-3 leading-relaxed font-light">
                    {exp.description}
                  </p>
                  
                  {/* Bullet previews */}
                  <div className="flex flex-col gap-1.5 mt-4">
                    {exp.highlights.slice(0, 2).map((high, idx) => (
                      <span key={idx} className="flex items-center gap-2 text-[10px] text-charcoal/50 dark:text-cream/50">
                        <Check className="w-3.5 h-3.5 text-forest" />
                        <span className="truncate">{high}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-6 pt-0 border-t border-charcoal/5 dark:border-cream/5 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold text-charcoal/40 dark:text-cream/40">Starting From</span>
                  <p className="text-base font-bold text-charcoal dark:text-cream">{exp.price}</p>
                </div>
                <button
                  className="px-4 py-2 border border-sunrise/30 text-sunrise text-[10px] font-bold uppercase tracking-wider rounded-full hover:bg-sunrise hover:text-white transition-all group-hover:bg-sunrise group-hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedExp(exp);
                  }}
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Details Slide-out Drawer Modal */}
      <AnimatePresence>
        {selectedExp && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExp(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] cursor-pointer"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full md:max-w-xl bg-cream dark:bg-charcoal shadow-2xl z-[80] overflow-y-auto border-l border-gold/20"
            >
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedExp(null)}
                  className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Banner Image */}
                <div className="h-[280px] relative">
                  <img 
                    src={selectedExp.imageUrl} 
                    alt={selectedExp.title} 
                    className="w-full h-full object-cover filter brightness-[0.85]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cream dark:from-charcoal to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="px-3 py-1 bg-sunrise text-white text-[9px] font-bold uppercase tracking-wider rounded-md">
                      {selectedExp.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-charcoal dark:text-cream mt-2.5 leading-tight">
                      {selectedExp.title}
                    </h3>
                  </div>
                </div>

                {/* Information grid */}
                <div className="p-8 flex flex-col gap-6">
                  {/* Quick specs */}
                  <div className="grid grid-cols-3 gap-4 border-b border-charcoal/10 dark:border-cream/10 pb-6">
                    <div className="text-center">
                      <Clock className="w-4 h-4 mx-auto text-sunrise mb-1" />
                      <span className="text-[9px] uppercase font-bold text-charcoal/50 dark:text-cream/50">Duration</span>
                      <p className="text-xs font-bold text-charcoal dark:text-cream mt-0.5">{selectedExp.duration}</p>
                    </div>
                    <div className="text-center">
                      <Activity className="w-4 h-4 mx-auto text-sunrise mb-1" />
                      <span className="text-[9px] uppercase font-bold text-charcoal/50 dark:text-cream/50">Intensity</span>
                      <p className="text-xs font-bold text-charcoal dark:text-cream mt-0.5">{selectedExp.difficulty || 'All Levels'}</p>
                    </div>
                    <div className="text-center">
                      <Compass className="w-4 h-4 mx-auto text-sunrise mb-1" />
                      <span className="text-[9px] uppercase font-bold text-charcoal/50 dark:text-cream/50">Location</span>
                      <p className="text-xs font-bold text-charcoal dark:text-cream mt-0.5">Sanctuary Grounds</p>
                    </div>
                  </div>

                  {/* Narrative */}
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-charcoal dark:text-cream mb-2">Experience Narrative</h4>
                    <p className="text-xs text-charcoal/70 dark:text-cream/70 leading-relaxed font-light">
                      {selectedExp.description} Let our traditional instructors take you through an authentic cycle designed for absolute connection. Our programs accommodate European travelers with tailored meals, english speaking guides, and high-safety standards.
                    </p>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-charcoal dark:text-cream mb-3">Key Highlights Included</h4>
                    <ul className="flex flex-col gap-2.5">
                      {selectedExp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs text-charcoal/60 dark:text-cream/60">
                          <div className="w-4.5 h-4.5 rounded-full bg-forest/10 text-forest flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* European Travelers FAQ helper */}
                  <div className="p-4 bg-sunrise/5 dark:bg-sunrise/10 border border-sunrise/20 rounded-xl flex gap-3">
                    <ShieldAlert className="w-5 h-5 text-sunrise shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-[11px] font-bold text-sunrise uppercase tracking-wider">European Logistics Guarantee</h5>
                      <p className="text-[10px] text-charcoal/60 dark:text-cream/60 leading-relaxed mt-1">
                        English, French & German speaking hosts, standard 220V plug adapters in suites, safe bottled water filtration systems, and direct airport coordinates.
                      </p>
                    </div>
                  </div>

                  {/* Price & Book Call */}
                  <div className="border-t border-charcoal/10 dark:border-cream/10 pt-6 mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-charcoal/40 dark:text-cream/40">Total Program Price</span>
                      <p className="text-xl font-bold text-charcoal dark:text-cream leading-tight">{selectedExp.price}</p>
                      <span className="text-[9px] text-charcoal/40 dark:text-cream/40">Includes accommodation & tax</span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedExp(null);
                        openBooking({
                          selectedProgram: selectedExp.title,
                          duration: selectedExp.duration,
                          category: selectedExp.category
                        });
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-sunrise to-saffron text-white text-xs font-bold uppercase tracking-wider rounded-full hover:shadow-lg transition-all"
                    >
                      Plan this Journey
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
};
