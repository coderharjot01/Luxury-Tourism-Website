import React, { useRef, useEffect } from 'react';
import { Compass, Mail, Phone, MapPin, Send } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ darkMode, onNavigate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = 120;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Determine colors based on dark mode
      const primaryColor = darkMode ? 'rgba(61, 90, 128, 0.25)' : 'rgba(152, 193, 217, 0.4)';
      const secondaryColor = darkMode ? 'rgba(42, 157, 143, 0.15)' : 'rgba(61, 90, 128, 0.2)';
      const tertiaryColor = darkMode ? 'rgba(255, 140, 66, 0.08)' : 'rgba(197, 168, 128, 0.15)';

      // Draw Wave 1 (slow, large)
      ctx.beginPath();
      ctx.fillStyle = primaryColor;
      for (let x = 0; x < canvas.width; x++) {
        const y = 50 + Math.sin(x * 0.004 + offset) * 20 + Math.cos(x * 0.002 + offset * 0.5) * 10;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Draw Wave 2 (medium, fast)
      ctx.beginPath();
      ctx.fillStyle = secondaryColor;
      for (let x = 0; x < canvas.width; x++) {
        const y = 60 + Math.sin(x * 0.007 - offset * 1.2) * 15 + Math.cos(x * 0.003 + offset * 0.8) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();

      // Draw Wave 3 (ripples, saffron touch)
      ctx.beginPath();
      ctx.fillStyle = tertiaryColor;
      for (let x = 0; x < canvas.width; x++) {
        const y = 70 + Math.sin(x * 0.012 + offset * 0.7) * 8 + Math.cos(x * 0.006 - offset * 0.4) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fill();

      offset += 0.012; // wave speed
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to MystictrailJourney! Check your email for our exclusive guide.');
  };

  return (
    <footer className="relative bg-cream-dark dark:bg-charcoal border-t border-cream-dark/50 dark:border-charcoal-light/30 overflow-hidden pt-12">
      {/* Wave canvas animation */}
      <div className="absolute top-0 left-0 right-0 h-[120px] pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('hero')}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sunrise to-saffron flex items-center justify-center text-white">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-base font-bold tracking-widest text-charcoal dark:text-cream leading-tight">
                MYSTICTRAILJOURNEY
              </h2>
              <p className="text-[8px] tracking-[0.2em] text-saffron uppercase font-bold">
                Luxury Indian Sanctuaries
              </p>
            </div>
          </div>
          <p className="text-xs text-charcoal/70 dark:text-cream/70 leading-relaxed max-w-xs">
            Connecting global travelers to high-end transformative spiritual experiences, ancient wisdom, and heritage paths across India.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-4 mt-2">
            {[
              {
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                ),
                href: '#'
              },
              {
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                ),
                href: '#'
              },
              {
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path>
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
                  </svg>
                ),
                href: '#'
              },
              {
                icon: (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                ),
                href: '#'
              }
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.href}
                className="w-8 h-8 rounded-full border border-charcoal/10 dark:border-cream/10 flex items-center justify-center hover:bg-sunrise hover:text-white hover:border-transparent transition-all duration-300 text-charcoal/60 dark:text-cream/60"
              >
                {soc.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Experiences Links */}
        <div>
          <h3 className="font-serif text-sm font-semibold tracking-wider text-charcoal dark:text-cream mb-5 border-b border-charcoal/10 dark:border-cream/10 pb-2">
            EXPERIENCES
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              { label: 'Yoga Programs', id: 'experiences' },
              { label: 'Meditation & Silent Retreats', id: 'experiences' },
              { label: 'Ayurvedic Cleanses', id: 'experiences' },
              { label: 'River Rafting & Camping', id: 'experiences' },
              { label: 'Ganga Aarti Ceremonies', id: 'experiences' }
            ].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className="text-xs text-charcoal/60 dark:text-cream/60 hover:text-sunrise dark:hover:text-saffron transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-serif text-sm font-semibold tracking-wider text-charcoal dark:text-cream mb-5 border-b border-charcoal/10 dark:border-cream/10 pb-2">
            RESOURCES
          </h3>
          <ul className="flex flex-col gap-3">
            {[
              { label: 'European Traveler Guide', id: 'guide' },
              { label: 'Events & Festivals Calendar', id: 'events' },
              { label: 'Virtual 3D Interactive Map', id: 'map' },
              { label: 'Yoga Knowledge Hub', id: 'hub' },
              { label: 'GDPR & Privacy Policy', id: 'gdpr' }
            ].map((item, idx) => (
              <li key={idx}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className="text-xs text-charcoal/60 dark:text-cream/60 hover:text-sunrise dark:hover:text-saffron transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-sm font-semibold tracking-wider text-charcoal dark:text-cream border-b border-charcoal/10 dark:border-cream/10 pb-2">
            NEWSLETTER
          </h3>
          <p className="text-xs text-charcoal/60 dark:text-cream/60 leading-relaxed">
            Subscribe to receive local ritual timings, weather forecasts, and exclusive wellness package openings.
          </p>
          <form onSubmit={handleSubscribe} className="relative mt-2">
            <input
              type="email"
              placeholder="Your email address"
              required
              className="w-full px-4 py-2.5 bg-cream/50 dark:bg-charcoal-light/50 border border-charcoal/10 dark:border-cream/10 rounded-full text-xs focus:outline-none focus:border-sunrise dark:focus:border-saffron text-charcoal dark:text-cream"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 w-8 h-8 rounded-full bg-gradient-to-r from-sunrise to-saffron text-white flex items-center justify-center hover:opacity-90 transition-opacity"
              aria-label="Subscribe"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Info bar */}
      <div className="border-t border-charcoal/5 dark:border-cream/5 py-6">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] text-charcoal/55 dark:text-cream/55">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-saffron" /> Himalayan Sanctuary Valley, Uttarakhand, India
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-sunrise" /> +91 (135) 244-0108
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-ganga" /> reservations@mystictrailjourney.com
            </span>
          </div>

          <div className="text-[10px] text-charcoal/40 dark:text-cream/40 text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} MystictrailJourney. Designed to European Accessibility Act Standards.</p>
            <p className="mt-0.5">GDPR Compliant • Secure 256-bit Booking SSL • India Tourism Board Authorized</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
