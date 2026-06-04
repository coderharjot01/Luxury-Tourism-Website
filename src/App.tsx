import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { JourneyPlanner } from './components/JourneyPlanner';
import { WhyRishikesh } from './components/WhyRishikesh';
import { Experiences } from './components/Experiences';
import { InteractiveMap } from './components/InteractiveMap';
import { VirtualTour } from './components/VirtualTour';
import { RetreatShowcase } from './components/RetreatShowcase';
import { TravelerGuide } from './components/TravelerGuide';
import { Testimonials } from './components/Testimonials';
import { KnowledgeHub } from './components/KnowledgeHub';
import { EventsCalendar } from './components/EventsCalendar';
import { CommunitySection } from './components/CommunitySection';
import { GDPRBanner } from './components/GDPRBanner';
import { BookingSystem } from './components/BookingSystem';
import { Footer } from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeDestination, setActiveDestination] = useState<'rishikesh' | 'agra' | 'goa' | 'delhi'>('rishikesh');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState<any | null>(null);

  // Sync dark class on document html tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Smooth scroll helper
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const openBookingWizard = (initialData: any = null) => {
    setBookingInitialData(initialData);
    setIsBookingOpen(true);
  };

  const destinationsList = [
    { id: 'rishikesh', name: 'Rishikesh', focus: 'Yoga & Wellness', bg: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=500&q=80' },
    { id: 'agra', name: 'Agra', focus: 'Heritage & Wonders', bg: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=500&q=80' },
    { id: 'goa', name: 'Goa', focus: 'Eco-Beach & Spas', bg: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80' },
    { id: 'delhi', name: 'Delhi', focus: 'Imperial & Gastronomy', bg: 'https://images.unsplash.com/photo-1601058268499-e52658bdf57f?auto=format&fit=crop&w=500&q=80' }
  ] as const;

  return (
    <div className="min-h-screen bg-cream dark:bg-charcoal text-charcoal dark:text-cream selection:bg-sunrise selection:text-white transition-colors duration-300">
      {/* Floating navigation header */}
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        onNavigate={handleNavigate}
        openBooking={() => openBookingWizard(null)}
      />

      <main className="w-full">
        {/* Full-screen cinematic Hero section */}
        <Hero 
          activeDestination={activeDestination}
          onNavigate={handleNavigate} 
          openBooking={() => openBookingWizard(null)} 
        />

        {/* Dynamic Destinations Selector Section */}
        <section className="py-12 bg-cream-dark/50 dark:bg-charcoal-dark/50 border-y border-charcoal/5 dark:border-cream/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-saffron">Multi-Destination Sanctuary</span>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-charcoal dark:text-cream mt-1">Select Your Spiritual Portal</h3>
              </div>
              <p className="text-xs text-charcoal/50 dark:text-cream/50 max-w-sm">Switch the portal active destination to explore different yoga retreats, local maps, historical monuments, and itineraries.</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {destinationsList.map((dest) => {
                const isActive = activeDestination === dest.id;
                return (
                  <button
                    key={dest.id}
                    onClick={() => {
                      setActiveDestination(dest.id);
                      handleNavigate('planner');
                    }}
                    className={`relative h-24 rounded-2xl overflow-hidden text-left border-2 transition-all flex flex-col justify-end p-4 group cursor-pointer ${
                      isActive 
                        ? 'border-sunrise ring-4 ring-sunrise/20 scale-[1.02] shadow-md' 
                        : 'border-transparent hover:border-gold/30 hover:scale-[1.01]'
                    }`}
                  >
                    <img src={dest.bg} alt={dest.name} className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="relative z-10">
                      <span className="text-[9px] uppercase font-extrabold tracking-widest text-saffron">{dest.focus}</span>
                      <h4 className="font-serif text-sm font-bold text-white mt-0.5">{dest.name}</h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI-style interactive travel blueprint planner */}
        <JourneyPlanner activeDestination={activeDestination} openBooking={openBookingWizard} />

        {/* Storytelling & dynamics statistics */}
        <WhyRishikesh activeDestination={activeDestination} />

        {/* Category-filtered experience cards & side drawer */}
        <Experiences activeDestination={activeDestination} openBooking={openBookingWizard} />

        {/* 3D-inspired vector coordinates map & routing calculator */}
        <InteractiveMap activeDestination={activeDestination} />

        {/* Immersive 360 tour simulation & visual audio guides */}
        <VirtualTour activeDestination={activeDestination} />

        {/* Glassmorphic luxury retreat comparison cards */}
        <RetreatShowcase activeDestination={activeDestination} openBooking={openBookingWizard} />

        {/* Accordion index for European travelers logistics */}
        <TravelerGuide activeDestination={activeDestination} />

        {/* European countries guest testimonials carousel */}
        <Testimonials activeDestination={activeDestination} />

        {/* Yoga & Ayurveda editorial blog grid */}
        <KnowledgeHub activeDestination={activeDestination} />

        {/* Vedic celebrations timeline calendar & updates signup */}
        <EventsCalendar activeDestination={activeDestination} />

        {/* Community social wall & drag-drop snapshot uploader */}
        <CommunitySection activeDestination={activeDestination} />
      </main>

      {/* Wave canvas animated footer */}
      <Footer darkMode={darkMode} onNavigate={handleNavigate} />

      {/* European compliance cookie notification */}
      <GDPRBanner />

      {/* Premium multi-step checkout booking checkout wizard */}
      <BookingSystem 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        initialData={bookingInitialData}
        activeDestination={activeDestination}
      />
    </div>
  );
}

export default App;
