import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

export const GDPRBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('mtj-cookie-consent');
    if (!consent) {
      // Show banner after 2 seconds delay
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('mtj-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('mtj-cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[60]"
        >
          <div className="glass-premium p-6 rounded-2xl shadow-2xl flex flex-col gap-4 border border-gold/30">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="p-2 bg-saffron/10 text-saffron rounded-lg shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-charcoal dark:text-cream leading-tight">
                    European Privacy Compliance
                  </h4>
                  <p className="text-[11px] text-charcoal/70 dark:text-cream/70 leading-relaxed mt-1.5">
                    We use secure cookies to enhance your journey-planning experience and compile anonymous analytics. In accordance with EU GDPR rules, please select your cookie preference.
                  </p>
                </div>
              </div>
              <button 
                onClick={handleDecline} 
                className="text-charcoal/40 dark:text-cream/40 hover:text-charcoal dark:hover:text-cream transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center justify-end gap-3 mt-1">
              <button
                onClick={handleDecline}
                className="px-3.5 py-1.5 border border-charcoal/15 dark:border-cream/15 text-[10px] font-bold uppercase tracking-wider text-charcoal/70 dark:text-cream/70 rounded-full hover:bg-cream-dark dark:hover:bg-charcoal-light transition-all"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-4.5 py-2 bg-gradient-to-r from-sunrise to-saffron text-white text-[10px] font-bold uppercase tracking-wider rounded-full hover:shadow-lg transition-all"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
