import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tourHotspots, type TourHotspot } from '../data/mockData';
import { Headphones, Play, Pause, X, MapPin } from 'lucide-react';

interface VirtualTourProps {
  activeDestination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
}

export const VirtualTour: React.FC<VirtualTourProps> = ({ activeDestination }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<TourHotspot | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioIntervalRef = useRef<any>(null);

  // Play audio simulation
  useEffect(() => {
    if (isPlayingAudio) {
      audioIntervalRef.current = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            clearInterval(audioIntervalRef.current);
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1.5;
        });
      }, 100);
    } else {
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
    }

    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, [isPlayingAudio]);

  // Reset selected hotspot when changing destination
  useEffect(() => {
    setSelectedHotspot(null);
    setIsPlayingAudio(false);
    setAudioProgress(0);
  }, [activeDestination]);

  const handleHotspotClick = (hotspot: TourHotspot) => {
    setSelectedHotspot(hotspot);
    setIsPlayingAudio(false);
    setAudioProgress(0);
  };

  const handleAudioToggle = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const filteredHotspots = tourHotspots.filter(h => h.destination === activeDestination);

  const destinationPanoramas = {
    rishikesh: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=1920&q=80',
    agra: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1920&q=80',
    goa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80',
    delhi: 'https://images.unsplash.com/photo-1601058268499-e52658bdf57f?auto=format&fit=crop&w=1920&q=80'
  };

  return (
    <section id="virtual-tour" className="py-24 bg-cream-dark/30 dark:bg-charcoal-dark/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-saffron">Virtual Immersion</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal dark:text-cream mt-2">
            Virtual Sight Experience
          </h2>
          <p className="text-xs md:text-sm text-charcoal/60 dark:text-cream/60 leading-relaxed mt-4">
            Step directly into the spiritual energy. Click on hotspots across our panoramic canvas to listen to historical audio accounts and explore cultural background stories.
          </p>
        </div>

        {/* Immersive Panoramic Canvas */}
        <div className="relative w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden border border-gold/20 shadow-2xl bg-charcoal">
          {/* Main Panorama Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-85 scale-[1.05] transition-transform duration-[12s] ease-out"
            style={{
              backgroundImage: `url('${destinationPanoramas[activeDestination]}')`
            }}
          />

          {/* Dark shading gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-black/30" />

          {/* Hotspots overlay */}
          {filteredHotspots.map((hotspot) => {
            const isSelected = selectedHotspot?.id === hotspot.id;
            return (
              <div
                key={hotspot.id}
                style={{
                  position: 'absolute',
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                }}
                className="z-20 -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  onClick={() => handleHotspotClick(hotspot)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center relative cursor-pointer group ${
                    isSelected ? 'bg-sunrise text-white scale-110' : 'bg-cream/90 text-charcoal backdrop-blur-md shadow-lg'
                  }`}
                  aria-label={`Explore ${hotspot.name}`}
                >
                  {/* Glowing pulses */}
                  <span className="absolute inset-0 rounded-full bg-sunrise/30 group-hover:animate-ping pointer-events-none" />
                  <Headphones className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isSelected ? 'text-white' : 'text-sunrise'
                  }`} />
                  
                  {/* Tooltip text */}
                  <span className="absolute bottom-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-charcoal/90 text-white text-[9px] font-bold uppercase tracking-wider rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    {hotspot.name}
                  </span>
                </button>
              </div>
            );
          })}

          {/* Informative Floating banner */}
          <div className="absolute top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-forest animate-ping" />
            <span className="text-[9px] font-bold text-charcoal dark:text-cream uppercase tracking-widest">360° Panoramic View</span>
          </div>

          {/* Details Dialog Card */}
          <AnimatePresence>
            {selectedHotspot && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="absolute left-6 bottom-6 right-6 md:right-auto md:max-w-md z-40 glass-premium p-6 rounded-2xl border border-gold/30 shadow-2xl flex flex-col gap-4"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[8px] uppercase font-bold text-saffron tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Historic Sanctuary Spot
                    </span>
                    <h3 className="font-serif text-base font-semibold text-charcoal dark:text-cream mt-1 leading-tight">
                      {selectedHotspot.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedHotspot(null);
                      setIsPlayingAudio(false);
                    }} 
                    className="text-charcoal/40 dark:text-cream/40 hover:text-charcoal dark:hover:text-cream"
                    aria-label="Close hotspot panel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-4">
                  <img 
                    src={selectedHotspot.imageUrl} 
                    alt={selectedHotspot.title} 
                    className="w-24 h-24 rounded-xl object-cover border border-charcoal/10 shrink-0" 
                  />
                  <p className="text-[11px] text-charcoal/70 dark:text-cream/70 leading-relaxed font-light">
                    {selectedHotspot.description}
                  </p>
                </div>

                {/* Simulated Audio Player Dashboard */}
                <div className="p-3 bg-charcoal/5 dark:bg-cream/5 border border-charcoal/10 dark:border-cream/10 rounded-xl flex items-center gap-4">
                  <button
                    onClick={handleAudioToggle}
                    className="w-10 h-10 rounded-full bg-sunrise text-white flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                    aria-label={isPlayingAudio ? 'Pause audio guide' : 'Play audio guide'}
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  <div className="grow">
                    <div className="flex items-center justify-between text-[8px] font-bold text-charcoal/50 dark:text-cream/50 uppercase">
                      <span>Audio Guide Guide</span>
                      <span>{selectedHotspot.audioDuration || '2:30'}</span>
                    </div>

                    {/* Progress Slider track */}
                    <div className="w-full h-1.5 bg-charcoal/10 dark:bg-cream/10 rounded-full mt-1.5 overflow-hidden relative">
                      <div 
                        className="h-full bg-sunrise rounded-full transition-all duration-100" 
                        style={{ width: `${audioProgress}%` }}
                      />
                    </div>

                    {/* Audio frequencies animated equalizer */}
                    {isPlayingAudio && (
                      <div className="flex gap-0.5 items-end h-3 mt-2 justify-center">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((bar) => {
                          const randomHeight = Math.floor(Math.random() * 12) + 2;
                          return (
                            <motion.div
                              key={bar}
                              className="w-0.5 bg-sunrise"
                              animate={{ height: randomHeight }}
                              transition={{ repeat: Infinity, duration: 0.3 }}
                              style={{ height: '4px' }}
                            />
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
