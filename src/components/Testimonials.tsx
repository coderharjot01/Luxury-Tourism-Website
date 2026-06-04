import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '../data/mockData';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialsProps {
  activeDestination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
}

export const Testimonials: React.FC<TestimonialsProps> = ({ activeDestination }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredTestimonials = testimonials.filter(t => t.destination === activeDestination);

  const handleNext = () => {
    if (filteredTestimonials.length === 0) return;
    setActiveIndex((prev) => (prev === filteredTestimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    if (filteredTestimonials.length === 0) return;
    setActiveIndex((prev) => (prev === 0 ? filteredTestimonials.length - 1 : prev - 1));
  };

  // Reset index when changing destination
  useEffect(() => {
    setActiveIndex(0);
  }, [activeDestination]);

  // Auto scroll every 7 seconds if multiple reviews exist
  useEffect(() => {
    if (filteredTestimonials.length <= 1) return;
    const interval = setInterval(handleNext, 7000);
    return () => clearInterval(interval);
  }, [filteredTestimonials.length]);

  const activeTest = filteredTestimonials[activeIndex] || filteredTestimonials[0];

  if (!activeTest) return null;

  return (
    <section id="testimonials" className="py-24 max-w-4xl mx-auto px-6">
      
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-saffron">Guest Echoes</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal dark:text-cream mt-2 text-capitalize">
          Stories of Transformation
        </h2>
        <p className="text-xs md:text-sm text-charcoal/60 dark:text-cream/60 max-w-lg mx-auto mt-3 capitalize">
          Hear from our European guests who embarked on our wellness pilgrimages and found peace, health, and adventure.
        </p>
      </div>

      {/* Slide Container */}
      <div className="glass-premium p-8 md:p-14 rounded-3xl border border-gold/20 shadow-2xl relative">
        {/* Quote watermark icon */}
        <div className="absolute top-6 left-6 opacity-[0.04] text-charcoal dark:text-cream">
          <Quote className="w-24 h-24" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTest.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center gap-6"
          >
            {/* Guest details */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <img 
                  src={activeTest.avatarUrl} 
                  alt={activeTest.name} 
                  className="w-18 h-18 rounded-full object-cover border-2 border-gold ring-4 ring-cream dark:ring-charcoal" 
                />
                <span className="absolute bottom-0 right-0 text-xl bg-cream dark:bg-charcoal rounded-full p-0.5 shadow-md">
                  {activeTest.flag}
                </span>
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-charcoal dark:text-cream">{activeTest.name}</h4>
                <p className="text-[10px] uppercase font-semibold tracking-wider text-saffron">{activeTest.country} • Taken {activeTest.retreatTaken}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex gap-1 text-gold">
              {Array.from({ length: activeTest.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-gold text-gold" />
              ))}
            </div>

            {/* Quote content */}
            <p className="font-serif text-sm sm:text-base italic leading-relaxed text-charcoal/80 dark:text-cream/80 max-w-2xl">
              &ldquo;{activeTest.quote}&rdquo;
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Carousel controls */}
        {filteredTestimonials.length > 1 && (
          <div className="flex justify-between items-center mt-10">
            {/* Progress indicators dots */}
            <div className="flex gap-2">
              {filteredTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeIndex === idx ? 'bg-sunrise w-6' : 'bg-charcoal/10 dark:bg-cream/10'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-charcoal/10 dark:border-cream/10 hover:bg-cream-dark dark:hover:bg-charcoal-light flex items-center justify-center text-charcoal dark:text-cream transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-charcoal/10 dark:border-cream/10 hover:bg-cream-dark dark:hover:bg-charcoal-light flex items-center justify-center text-charcoal dark:text-cream transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

      </div>

    </section>
  );
};
