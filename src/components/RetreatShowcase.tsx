import React from 'react';
import { retreats } from '../data/mockData';
import { Star, Check, BedDouble, Calendar, ArrowRight } from 'lucide-react';

interface RetreatShowcaseProps {
  openBooking: (initialData?: any) => void;
  activeDestination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
}

export const RetreatShowcase: React.FC<RetreatShowcaseProps> = ({ openBooking, activeDestination }) => {
  const filteredRetreats = retreats.filter(r => r.destination === activeDestination);

  return (
    <section id="retreats" className="py-24 bg-cream-dark/20 dark:bg-charcoal-dark/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-saffron">Premium Sanctuary Sanctuary</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal dark:text-cream mt-2 text-capitalize">
            Wellness Retreat Showcase
          </h2>
          <p className="text-xs md:text-sm text-charcoal/60 dark:text-cream/60 leading-relaxed mt-4">
            Compare and choose from our most prestigious sanctuaries. Blending top-tier European hospitality with authentic health systems.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className={`grid grid-cols-1 ${
          filteredRetreats.length === 1 ? 'max-w-md mx-auto' : 
          filteredRetreats.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 
          'md:grid-cols-2 lg:grid-cols-3'
        } gap-8`}>
          {filteredRetreats.map((ret) => (
            <div 
              key={ret.id} 
              className="glass-premium rounded-3xl overflow-hidden border border-gold/25 shadow-xl flex flex-col justify-between group hover:shadow-2xl transition-all duration-300"
            >
              {/* Header Image */}
              <div className="relative overflow-hidden h-[260px]">
                <img 
                  src={ret.imageUrl} 
                  alt={ret.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.9]" 
                />
                
                {/* Float badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1.5 bg-cream/95 text-charcoal text-[9px] font-extrabold uppercase tracking-widest rounded-md shadow-md">
                    {ret.focus}
                  </span>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-charcoal/80 text-white px-3 py-1 rounded-md shadow-md backdrop-blur-sm flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                  <span className="text-[10px] font-bold">{ret.rating}</span>
                  <span className="text-[9px] opacity-60">({ret.reviewsCount})</span>
                </div>
              </div>

              {/* Content body */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-charcoal dark:text-cream group-hover:text-sunrise transition-colors">
                    {ret.name}
                  </h3>
                  <p className="text-xs text-charcoal/75 dark:text-cream/75 mt-3 leading-relaxed font-light">
                    {ret.description}
                  </p>

                  <div className="h-[1px] bg-charcoal/10 dark:bg-cream/10 my-5" />

                  {/* Accommodation detail info */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-3 text-xs text-charcoal/60 dark:text-cream/60">
                      <BedDouble className="w-4 h-4 text-sunrise shrink-0" />
                      <span><strong>Accommodation:</strong> {ret.accommodation}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-charcoal/60 dark:text-cream/60">
                      <Calendar className="w-4 h-4 text-sunrise shrink-0" />
                      <span><strong>Duration Cycle:</strong> {ret.duration}</span>
                    </div>
                  </div>

                  <div className="h-[1px] bg-charcoal/10 dark:bg-cream/10 my-5" />

                  {/* Features */}
                  <div className="flex flex-col gap-2">
                    <h4 className="text-[10px] uppercase font-bold text-charcoal/40 dark:text-cream/40 tracking-wider">Sanctuary Highlights</h4>
                    {ret.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[11px] text-charcoal/60 dark:text-cream/60 leading-tight">
                        <Check className="w-3.5 h-3.5 text-forest shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and Button */}
                <div className="border-t border-charcoal/5 dark:border-cream/5 pt-6 mt-8 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-charcoal/40 dark:text-cream/40">Weekly Range</span>
                    <p className="text-base md:text-lg font-bold text-charcoal dark:text-cream leading-tight">{ret.priceRange}</p>
                    <span className="text-[8px] text-charcoal/40 dark:text-cream/40">Full Board included</span>
                  </div>
                  
                  <button
                    onClick={() => openBooking({
                      selectedRetreat: ret.name,
                      duration: ret.duration
                    })}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sunrise to-saffron text-white rounded-full text-xs font-bold uppercase tracking-wider hover:shadow-lg transition-all"
                  >
                    <span>Plan Stay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
