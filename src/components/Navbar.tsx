import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Menu, X, Sun, Moon, Globe, ArrowRight } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  onNavigate: (sectionId: string) => void;
  openBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, onNavigate, openBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentLang, setCurrentLang] = useState('EN');
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Background morphing
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll progress calculating
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experiences', href: 'experiences' },
    { name: 'Planner', href: 'planner' },
    { name: 'Sanctuary Story', href: 'sanctuary-story' },
    { name: 'Interactive Map', href: 'map' },
    { name: 'Virtual Tour', href: 'virtual-tour' },
    { name: 'Retreats', href: 'retreats' },
    { name: 'Guide', href: 'guide' },
    { name: 'Events', href: 'events' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-cream/80 dark:bg-charcoal/80 backdrop-blur-md shadow-lg border-b border-cream-dark/30 dark:border-charcoal-light/30'
          : 'py-6 bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Scroll Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-sunrise to-saffron transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('hero')}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sunrise to-saffron flex items-center justify-center text-white shadow-md transform group-hover:rotate-12 transition-transform duration-300">
            <Compass className="w-5.5 h-5.5" />
          </div>
          <div>
            <h1 className="font-serif text-lg md:text-xl font-bold tracking-widest text-charcoal dark:text-cream leading-tight">
              MYSTICTRAILJOURNEY
            </h1>
            <p className="text-[9px] tracking-[0.2em] text-saffron uppercase font-semibold">
              Luxury Indian Sanctuaries
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => onNavigate(link.href)}
              className="text-xs font-semibold uppercase tracking-wider text-charcoal/80 dark:text-cream/80 hover:text-sunrise dark:hover:text-saffron transition-colors relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-sunrise group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Desktop Icons + CTA */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 text-xs font-medium text-charcoal/70 dark:text-cream/70 hover:text-charcoal dark:hover:text-cream"
            >
              <Globe className="w-4 h-4" />
              <span>{currentLang}</span>
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 py-1 w-20 bg-cream dark:bg-charcoal border border-cream-dark/50 dark:border-charcoal-light/50 rounded shadow-xl z-20"
                  >
                    {['EN', 'DE', 'FR'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setCurrentLang(lang);
                          setIsLangOpen(false);
                        }}
                        className={`block w-full text-center px-4 py-1.5 text-xs hover:bg-cream-dark dark:hover:bg-charcoal-light ${
                          currentLang === lang ? 'text-sunrise font-bold' : 'text-charcoal/70 dark:text-cream/70'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggler */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-cream-dark dark:hover:bg-charcoal-light transition-colors text-charcoal/80 dark:text-cream/80"
            aria-label="Toggle Dark/Light Mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-saffron" /> : <Moon className="w-4 h-4 text-ganga" />}
          </button>

          {/* Luxury CTA */}
          <button
            onClick={openBooking}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-sunrise to-saffron text-white rounded-full text-xs font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-sunrise/20 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>Plan Journey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Control Buttons (Hamburger + Theme) */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full text-charcoal dark:text-cream"
            aria-label="Toggle DarkMode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-saffron" /> : <Moon className="w-4 h-4 text-ganga" />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full text-charcoal dark:text-cream hover:bg-cream-dark dark:hover:bg-charcoal-light transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden w-full bg-cream dark:bg-charcoal border-b border-cream-dark dark:border-charcoal-light overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigate(link.href);
                  }}
                  className="text-left text-sm font-semibold uppercase tracking-wider py-1.5 text-charcoal/80 dark:text-cream/80 hover:text-sunrise dark:hover:text-saffron transition-colors"
                >
                  {link.name}
                </button>
              ))}
              
              <div className="h-[1px] bg-cream-dark dark:bg-charcoal-light my-2" />

              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-charcoal/50 dark:text-cream/50">Language:</span>
                <div className="flex gap-4">
                  {['EN', 'DE', 'FR'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setCurrentLang(lang)}
                      className={`text-xs font-bold ${
                        currentLang === lang ? 'text-sunrise border-b-2 border-sunrise' : 'text-charcoal/60 dark:text-cream/60'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openBooking();
                }}
                className="w-full text-center py-3 bg-gradient-to-r from-sunrise to-saffron text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-md mt-4"
              >
                Plan Journey Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
