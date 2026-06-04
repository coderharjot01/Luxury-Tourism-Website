import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mapMarkers, type MapMarker } from '../data/mockData';
import { Filter, Navigation, Compass, ZoomIn, ZoomOut, RotateCcw, Award, Star, X } from 'lucide-react';

interface InteractiveMapProps {
  activeDestination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ activeDestination }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  
  // Route planning state
  const [routeStart, setRouteStart] = useState<string>('');
  const [routeEnd, setRouteEnd] = useState<string>('');
  const [calculatedRoute, setCalculatedRoute] = useState<any | null>(null);

  const categoryLabels: Record<string, string> = {
    all: 'All Locations',
    schools: 'Yoga Schools',
    ashrams: 'Spiritual Centers',
    cafes: 'Cafes & Gastronomy',
    adventure: 'Adventure Spots',
    gems: 'Hidden Gems',
    retreats: 'Luxury Retreats',
    monuments: 'Monuments',
    heritage: 'Heritage Sites'
  };

  const destinationMarkers = mapMarkers.filter(m => m.destination === activeDestination);
  const availableCategories = ['all', ...Array.from(new Set(destinationMarkers.map(m => m.category)))];

  const categories = availableCategories.map(cat => ({
    id: cat,
    label: categoryLabels[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)
  }));

  const filteredMarkers = activeCategory === 'all'
    ? destinationMarkers
    : destinationMarkers.filter(m => m.category === activeCategory);

  useEffect(() => {
    setActiveCategory('all');
    setSelectedMarker(null);
    clearRoute();
  }, [activeDestination]);

  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (direction === 'in') setZoomLevel(prev => Math.min(prev + 0.25, 2));
    else if (direction === 'out') setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
    else setZoomLevel(1);
  };

  const handleCalculateRoute = () => {
    if (!routeStart || !routeEnd) return;
    
    const startLoc = destinationMarkers.find(m => m.id === routeStart);
    const endLoc = destinationMarkers.find(m => m.id === routeEnd);
    
    if (!startLoc || !endLoc) return;

    // Simulate distance & duration calculation
    const dx = Math.abs(startLoc.lat - endLoc.lat);
    const dy = Math.abs(startLoc.lng - endLoc.lng);
    const distanceVal = (Math.sqrt(dx * dx + dy * dy) * 0.15).toFixed(1); // simulated km
    const timeMins = Math.round(Number(distanceVal) * 12); // simulated walk time (12 mins per km)

    setCalculatedRoute({
      start: startLoc.title,
      end: endLoc.title,
      distance: `${distanceVal} km`,
      duration: `${timeMins} mins walking`,
      trailTips: startLoc.category === 'adventure' || endLoc.category === 'adventure'
        ? 'Steep mountain/rough paths. Carry trekking poles and ample water.'
        : 'Flat sand banks or paved walkways. Safe for evening strolls.'
    });
  };

  const clearRoute = () => {
    setRouteStart('');
    setRouteEnd('');
    setCalculatedRoute(null);
  };

  return (
    <section id="map" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-saffron">Virtual Explorer Map</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal dark:text-cream mt-2">
          Interactive Explorer Map
        </h2>
        <p className="text-xs md:text-sm text-charcoal/60 dark:text-cream/60 leading-relaxed mt-4">
          Navigate our hand-picked selection of certified wellness retreats, historic sites, dining, and scenic routes. Toggle filters and plan walking trails.
        </p>
      </div>

      {/* Main Map Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar & Route Planner (Left Panel) */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* Filters Sidebar */}
          <div className="glass-premium p-6 rounded-2xl border border-gold/15 shadow-sm">
            <h3 className="font-serif text-sm font-semibold text-charcoal dark:text-cream flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-sunrise" />
              <span>Filter Categories</span>
            </h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedMarker(null);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeCategory === cat.id
                      ? 'bg-sunrise text-white shadow-sm'
                      : 'hover:bg-cream-dark dark:hover:bg-charcoal-light text-charcoal/70 dark:text-cream/70'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Route Planner Card */}
          <div className="glass-premium p-6 rounded-2xl border border-gold/15 shadow-sm">
            <h3 className="font-serif text-sm font-semibold text-charcoal dark:text-cream flex items-center gap-2 mb-4">
              <Navigation className="w-4 h-4 text-sunrise" />
              <span>Local Trail Router</span>
            </h3>
            
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-[9px] uppercase font-bold text-charcoal/50 dark:text-cream/50">Start Location</label>
                <select
                  value={routeStart}
                  onChange={(e) => setRouteStart(e.target.value)}
                  className="w-full mt-1 p-2 bg-cream/50 dark:bg-charcoal-light/50 border border-charcoal/10 dark:border-cream/10 rounded-lg text-xs text-charcoal dark:text-cream focus:outline-none focus:border-sunrise"
                >
                  <option value="">Choose start location...</option>
                  {destinationMarkers.map(m => (
                    <option key={m.id} value={m.id}>{m.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[9px] uppercase font-bold text-charcoal/50 dark:text-cream/50">End Location</label>
                <select
                  value={routeEnd}
                  onChange={(e) => setRouteEnd(e.target.value)}
                  className="w-full mt-1 p-2 bg-cream/50 dark:bg-charcoal-light/50 border border-charcoal/10 dark:border-cream/10 rounded-lg text-xs text-charcoal dark:text-cream focus:outline-none focus:border-sunrise"
                >
                  <option value="">Choose end location...</option>
                  {destinationMarkers.map(m => (
                    <option key={m.id} value={m.id}>{m.title}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleCalculateRoute}
                  disabled={!routeStart || !routeEnd}
                  className="flex-1 py-2 bg-gradient-to-r from-sunrise to-saffron text-white text-[10px] font-bold uppercase tracking-wider rounded-lg disabled:opacity-40"
                >
                  Calculate Trail
                </button>
                {(routeStart || routeEnd) && (
                  <button
                    onClick={clearRoute}
                    className="p-2 border border-charcoal/15 dark:border-cream/15 text-charcoal dark:text-cream rounded-lg hover:bg-cream-dark dark:hover:bg-charcoal-light"
                    aria-label="Clear route selection"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Calculated Route Panel */}
              <AnimatePresence>
                {calculatedRoute && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-sunrise/5 dark:bg-sunrise/10 border border-sunrise/20 rounded-xl"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] uppercase font-bold text-sunrise tracking-wider">Suggested Route</span>
                      <button onClick={clearRoute} className="text-charcoal/40 dark:text-cream/40 hover:text-charcoal dark:hover:text-cream">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs font-bold text-charcoal dark:text-cream mt-1.5">{calculatedRoute.start} &rarr; {calculatedRoute.end}</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 border-t border-charcoal/10 dark:border-cream/10 pt-2 text-[10px] text-charcoal/65 dark:text-cream/65">
                      <div>
                        <strong>Distance:</strong> {calculatedRoute.distance}
                      </div>
                      <div>
                        <strong>Est. Journey:</strong> {calculatedRoute.duration}
                      </div>
                    </div>
                    <div className="mt-2 text-[9px] text-charcoal/50 dark:text-cream/50 bg-cream/70 dark:bg-charcoal/70 p-2 rounded border border-charcoal/5 dark:border-cream/5">
                      <strong>Local Guide Tip:</strong> {calculatedRoute.trailTips}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 3D perspective Canvas/Vector map container (Right Panel) */}
        <div className="lg:col-span-2 relative glass-premium rounded-3xl overflow-hidden border border-gold/15 min-h-[480px] select-none bg-[#E2EAFC]/30 dark:bg-[#1D2D44]/20">
          
          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
            <button
              onClick={() => handleZoom('in')}
              className="w-8 h-8 rounded-full bg-cream dark:bg-charcoal shadow-md border border-charcoal/10 dark:border-cream/10 flex items-center justify-center text-charcoal dark:text-cream hover:bg-cream-dark transition-all"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom('out')}
              className="w-8 h-8 rounded-full bg-cream dark:bg-charcoal shadow-md border border-charcoal/10 dark:border-cream/10 flex items-center justify-center text-charcoal dark:text-cream hover:bg-cream-dark transition-all"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleZoom('reset')}
              className="w-8 h-8 rounded-full bg-cream dark:bg-charcoal shadow-md border border-charcoal/10 dark:border-cream/10 flex items-center justify-center text-charcoal dark:text-cream hover:bg-cream-dark transition-all"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Map canvas view wrapper with drag mock */}
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
            <motion.div
              style={{ scale: zoomLevel }}
              className="relative w-[800px] h-[500px] transition-all duration-300 origin-center"
            >
              {/* SVG 3D-perspective river landscape background */}
              <svg viewBox="0 0 800 500" className="absolute inset-0 w-full h-full text-charcoal/10 dark:text-cream/5">
                {activeDestination === 'rishikesh' && (
                  <>
                    {/* Himalayan Mountains grid in background */}
                    <path d="M50 150 L150 50 L250 150 L350 20 L500 200 L600 50 L750 200" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
                    <path d="M0 250 L100 120 L200 220 L300 80 L450 240 L550 90 L800 250" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                    
                    {/* Flowing Ganges River (center curve) */}
                    <path 
                      d="M 50,420 Q 200,320 400,380 T 750,220" 
                      fill="none" 
                      stroke={zoomLevel > 1.2 ? '#4A90E2' : '#98C1D9'} 
                      strokeWidth="32" 
                      strokeLinecap="round"
                      className="opacity-40" 
                    />
                    <path 
                      d="M 50,420 Q 200,320 400,380 T 750,220" 
                      fill="none" 
                      stroke="#3D5A80" 
                      strokeWidth="8" 
                      strokeLinecap="round" 
                      className="opacity-70 animate-pulse" 
                    />

                    {/* Suspension bridge lines */}
                    <line x1="390" y1="360" x2="410" y2="400" stroke="#C5A880" strokeWidth="4" strokeLinecap="round" />
                    <path d="M390,360 Q400,370 410,400" fill="none" stroke="#C5A880" strokeWidth="1" />
                    <text x="330" y="340" className="text-[10px] font-sans font-bold fill-charcoal/50 dark:fill-cream/50">Laxman Jhula Bridge</text>

                    <line x1="590" y1="260" x2="610" y2="300" stroke="#C5A880" strokeWidth="4" strokeLinecap="round" />
                    <text x="540" y="240" className="text-[10px] font-sans font-bold fill-charcoal/50 dark:fill-cream/50">Ram Jhula Bridge</text>
                  </>
                )}

                {activeDestination === 'agra' && (
                  <>
                    {/* Agra Taj zone layout */}
                    <path d="M 0,100 L 800,100 M 0,200 L 800,200 M 0,300 L 800,300 M 0,400 L 800,400" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                    {/* Yamuna River running horizontally at the back of the Taj */}
                    <path 
                      d="M 50,200 Q 300,180 500,220 T 750,180" 
                      fill="none" 
                      stroke="#3D5A80" 
                      strokeWidth="24" 
                      strokeLinecap="round"
                      className="opacity-30" 
                    />
                    {/* Taj Mahal outline shape */}
                    <path d="M 470,280 L 490,240 L 510,240 L 530,280 Z" fill="none" stroke="#D4AF37" strokeWidth="2" />
                    <circle cx="500" cy="235" r="8" fill="none" stroke="#D4AF37" strokeWidth="2" />
                    <text x="440" y="310" className="text-[10px] font-sans font-bold fill-charcoal/50 dark:fill-cream/50">Taj Mahal Sanctuary Zone</text>
                    <text x="120" y="160" className="text-[10px] font-sans font-bold fill-charcoal/50 dark:fill-cream/50">Yamuna River</text>
                  </>
                )}

                {activeDestination === 'goa' && (
                  <>
                    {/* Arabian sea coastline and Mandovi river */}
                    <path d="M 0,0 C 120,150 180,300 80,500" fill="none" stroke="#3D5A80" strokeWidth="2" className="opacity-30" />
                    <path d="M 0,0 L 100,0 C 150,150 200,300 100,500 L 0,500 Z" fill="#98C1D9" className="opacity-20" />
                    
                    {/* Mandovi River */}
                    <path 
                      d="M 120,250 Q 400,230 800,200" 
                      fill="none" 
                      stroke="#3D5A80" 
                      strokeWidth="20" 
                      strokeLinecap="round"
                      className="opacity-30" 
                    />
                    <text x="30" y="100" className="text-[10px] font-sans font-bold fill-charcoal/50 dark:fill-cream/50 rotate-90">Arabian Sea Coast</text>
                    <text x="420" y="180" className="text-[10px] font-sans font-bold fill-charcoal/50 dark:fill-cream/50">Mandovi River</text>
                  </>
                )}

                {activeDestination === 'delhi' && (
                  <>
                    {/* Lutyens Delhi circle grids and walled city */}
                    <circle cx="400" cy="250" r="180" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                    <circle cx="400" cy="250" r="90" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
                    <line x1="400" y1="70" x2="400" y2="430" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="220" y1="250" x2="580" y2="250" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                    
                    <text x="410" y="240" className="text-[10px] font-sans font-bold fill-charcoal/50 dark:fill-cream/50">Lutyens Imperial Zone</text>
                    <text x="300" y="90" className="text-[10px] font-sans font-bold fill-charcoal/50 dark:fill-cream/50">Shahjahanabad Walled City</text>
                  </>
                )}
              </svg>

              {/* Render Markers */}
              {filteredMarkers.map((marker) => {
                const isSelected = selectedMarker?.id === marker.id;
                return (
                  <motion.div
                    key={marker.id}
                    style={{
                      position: 'absolute',
                      left: `${marker.lat}%`,
                      top: `${marker.lng}%`,
                    }}
                    className="z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setSelectedMarker(marker)}
                  >
                    <div className="relative group">
                      {/* Outer pulse if selected */}
                      {isSelected && (
                        <div className="absolute inset-0 w-8 h-8 -left-1.5 -top-1.5 rounded-full bg-sunrise/30 animate-ping pointer-events-none" />
                      )}

                      {/* Pin Circle */}
                      <div className={`w-5 h-5 rounded-full border-2 border-white shadow-md flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-sunrise scale-110' 
                          : marker.category === 'retreats' 
                            ? 'bg-forest' 
                            : marker.category === 'ashrams' 
                              ? 'bg-saffron' 
                              : marker.category === 'adventure' 
                                ? 'bg-sunrise' 
                                : marker.category === 'cafes'
                                  ? 'bg-ganga-teal'
                                  : 'bg-gold'
                      }`}>
                        <Compass className="w-2.5 h-2.5 text-white" />
                      </div>

                      {/* Brief text label */}
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 bg-cream/90 dark:bg-charcoal/90 border border-charcoal/5 px-2 py-0.5 rounded shadow text-[9px] font-bold text-charcoal dark:text-cream opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {marker.title}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Quick detail overlay card */}
          <AnimatePresence>
            {selectedMarker && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="absolute bottom-6 left-6 right-6 lg:right-auto lg:max-w-sm z-30 glass p-5 rounded-2xl border border-gold/30 shadow-2xl flex gap-4"
              >
                {selectedMarker.imageUrl && (
                  <img 
                    src={selectedMarker.imageUrl} 
                    alt={selectedMarker.title} 
                    className="w-20 h-20 rounded-xl object-cover border border-charcoal/10 dark:border-cream/10 shrink-0" 
                  />
                )}
                <div className="grow">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[8px] uppercase font-bold text-saffron tracking-wider">{selectedMarker.category}</span>
                      <h4 className="font-serif text-sm font-semibold text-charcoal dark:text-cream leading-tight">{selectedMarker.title}</h4>
                    </div>
                    <button 
                      onClick={() => setSelectedMarker(null)} 
                      className="text-charcoal/40 dark:text-cream/40 hover:text-charcoal dark:hover:text-cream"
                      aria-label="Close detail overlay"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  
                  {selectedMarker.rating && (
                    <div className="flex items-center gap-1 mt-1 text-gold text-xs">
                      <Star className="w-3 h-3 fill-gold" />
                      <span className="text-[10px] font-bold text-charcoal/70 dark:text-cream/70">{selectedMarker.rating}</span>
                    </div>
                  )}
                  
                  <p className="text-[10px] text-charcoal/75 dark:text-cream/75 mt-1.5 leading-relaxed font-light">{selectedMarker.description}</p>
                  
                  <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-sunrise mt-2">
                    <Award className="w-3 h-3 shrink-0" />
                    <span>{selectedMarker.highlight}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Compass Rose graphics */}
          <div className="absolute bottom-4 right-4 z-10 opacity-30 w-16 h-16 border border-charcoal/20 dark:border-cream/20 rounded-full flex items-center justify-center">
            <Compass className="w-8 h-8 text-charcoal dark:text-cream animate-spin-slow" />
          </div>

        </div>

      </div>

    </section>
  );
};
