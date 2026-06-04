import React, { useState, useEffect } from 'react';
import { events, type EventFestival } from '../data/mockData';
import { Bell, Check } from 'lucide-react';

interface EventsCalendarProps {
  activeDestination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
}

export const EventsCalendar: React.FC<EventsCalendarProps> = ({ activeDestination }) => {
  const destinationEvents = events.filter(e => e.destination === activeDestination);
  const [selectedEvent, setSelectedEvent] = useState<EventFestival | null>(() => {
    const initial = events.filter(e => e.destination === activeDestination);
    return initial.length > 0 ? initial[0] : null;
  });
  const [notificationEmail, setNotificationEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const currentList = events.filter(e => e.destination === activeDestination);
    if (currentList.length > 0) {
      setSelectedEvent(currentList[0]);
    } else {
      setSelectedEvent(null);
    }
  }, [activeDestination]);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notificationEmail) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setNotificationEmail('');
      alert(`Successfully registered! We will send you weather and itinerary updates for ${selectedEvent?.title}.`);
    }, 1500);
  };

  return (
    <section id="events" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-saffron">Vedic Astrological Seasons</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal dark:text-cream mt-2 text-capitalize">
          Cultural Events &amp; Festivals
        </h2>
        <p className="text-xs md:text-sm text-charcoal/60 dark:text-cream/60 leading-relaxed mt-4 capitalize">
          Plan your journey around our most auspicious local celebrations. Our timeline tracks dates, crowds, and local festival details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Timeline Track (Lg: Col-7) */}
        <div className="lg:col-span-7 flex flex-col gap-6 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-charcoal/10 before:dark:bg-cream/10">
          {destinationEvents.map((event) => {
            const isSelected = selectedEvent?.id === event.id;
            return (
              <div 
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className={`flex gap-6 pl-12 relative cursor-pointer group transition-all`}
              >
                {/* Timeline Node Ring */}
                <div className={`absolute left-3.5 top-2 w-5 h-5 rounded-full border-2 bg-cream dark:bg-charcoal flex items-center justify-center transition-all ${
                  isSelected ? 'border-sunrise ring-4 ring-sunrise/20 bg-sunrise' : 'border-charcoal/30 dark:border-cream/30 group-hover:border-sunrise'
                }`}>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>

                {/* Event Card */}
                <div className={`glass-premium p-6 rounded-2xl border transition-all grow ${
                  isSelected 
                    ? 'border-sunrise/60 shadow-lg' 
                    : 'border-gold/15 hover:border-sunrise/30 shadow-sm'
                }`}>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[9px] uppercase font-extrabold tracking-widest text-saffron">{event.date}</span>
                      <h3 className="font-serif text-base font-bold text-charcoal dark:text-cream mt-0.5 group-hover:text-sunrise transition-colors">
                        {event.title}
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-charcoal/35 dark:text-cream/35">{event.month}</span>
                  </div>
                  <p className="text-xs text-charcoal/65 dark:text-cream/65 mt-2 line-clamp-2 font-light">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Featured Detail (Lg: Col-5) */}
        <div className="lg:col-span-5">
          {selectedEvent && (
            <div className="glass-premium p-8 rounded-3xl border border-gold/25 shadow-xl flex flex-col gap-6 sticky top-28">
              
              {/* Event Image */}
              <div className="h-44 rounded-2xl overflow-hidden relative border border-charcoal/10">
                <img 
                  src={selectedEvent.imageUrl} 
                  alt={selectedEvent.title} 
                  className="w-full h-full object-cover filter brightness-[0.9]" 
                />
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-cream/95 dark:bg-charcoal/95 text-[9px] font-bold uppercase tracking-wider rounded text-sunrise shadow-sm">
                  Featured Celebration
                </span>
              </div>

              {/* Event Summary */}
              <div>
                <h3 className="font-serif text-lg font-bold text-charcoal dark:text-cream">{selectedEvent.title}</h3>
                <span className="text-[10px] uppercase font-bold text-saffron block mt-0.5">{selectedEvent.date}</span>
                <p className="text-xs text-charcoal/70 dark:text-cream/70 leading-relaxed font-light mt-3">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="border-t border-charcoal/10 dark:border-cream/10 pt-4">
                <h4 className="text-[10px] uppercase font-bold text-charcoal/40 dark:text-cream/40 tracking-wider mb-2.5">Key Highlights</h4>
                <ul className="flex flex-col gap-2">
                  {selectedEvent.highlights.map((high, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-charcoal/60 dark:text-cream/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-sunrise shrink-0 mt-2" />
                      <span>{high}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reminder Form */}
              <div className="border-t border-charcoal/10 dark:border-cream/10 pt-5">
                <h4 className="text-[10px] uppercase font-bold text-charcoal/40 dark:text-cream/40 tracking-wider mb-2">Get Festival Itinerary Updates</h4>
                <form onSubmit={handleNotifySubmit} className="relative mt-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={notificationEmail}
                    onChange={(e) => setNotificationEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-cream/50 dark:bg-charcoal-light/50 border border-charcoal/10 dark:border-cream/10 rounded-full text-xs text-charcoal dark:text-cream focus:outline-none focus:border-sunrise"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-4 rounded-full bg-charcoal dark:bg-cream text-white dark:text-charcoal text-[9px] font-bold uppercase tracking-wider hover:opacity-90 flex items-center gap-1.5"
                  >
                    {isSubscribed ? (
                      <>
                        <Check className="w-3 h-3 text-forest" />
                        <span>Registered</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-3 h-3" />
                        <span>Notify Me</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>
          )}
        </div>
      </div>

    </section>
  );
};
