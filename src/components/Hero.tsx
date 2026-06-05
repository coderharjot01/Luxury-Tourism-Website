import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Volume2, VolumeX, Compass, CalendarRange } from 'lucide-react';

interface HeroProps {
  activeDestination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
  onNavigate: (sectionId: string) => void;
  openBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ activeDestination, onNavigate, openBooking }) => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const audioContextRef = useRef<AudioContext | null>(null);
  const soundNodesRef = useRef<any[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 250]);
  const yText = useTransform(scrollY, [0, 800], [0, -100]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);

  // Track mouse for subtle interactive parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientWidth, clientHeight } = document.documentElement;
      const x = (e.clientX / clientWidth - 0.5) * 20; // range: -10 to 10
      const y = (e.clientY / clientHeight - 0.5) * 20; // range: -10 to 10
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Web Audio API Synthesizer for River, Temple Bells, and Om (AUM) Chant
  const startAmbience = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      // --- RIVER WIND (Brown Noise with low-pass filter LFO) ---
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Brown noise filter formula
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // Amplify
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'lowpass';
      noiseFilter.Q.value = 1.0;

      const noiseVolume = ctx.createGain();
      // Gradual 3-second fade-in for river wind
      noiseVolume.gain.setValueAtTime(0, ctx.currentTime);
      noiseVolume.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 3.0);

      // LFO to modulate filter frequency (representing flowing river gusts)
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.15; // slow
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 150; // modulate by 150Hz

      lfo.connect(lfoGain);
      lfoGain.connect(noiseFilter.frequency);
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseVolume);
      noiseVolume.connect(ctx.destination);

      lfo.start();
      noiseSource.start();
      soundNodesRef.current.push(lfo, noiseSource, noiseVolume);

      // --- OM CHANT DRONE (AUM) ---
      const fundamental = 145; // 145Hz fundamental is easily reproducible on laptop/mobile speakers while remaining deep
      const harmonics = [1, 1.5, 2, 2.5, 3]; // Rich chordal structure (octaves and perfect fifths) for a resonant vocal drone
      const harmonicTypes: OscillatorType[] = ['sawtooth', 'sine', 'sine', 'sine', 'sine'];
      
      const omMasterGain = ctx.createGain();
      omMasterGain.gain.setValueAtTime(0, ctx.currentTime);
      // Gradually fade-in over 3 seconds to a highly audible level
      omMasterGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 3.0);

      harmonics.forEach((mult, index) => {
        const osc = ctx.createOscillator();
        osc.type = harmonicTypes[index] || 'sine';
        // Detune each harmonic slightly for chorus texture
        const detuneAmt = (Math.random() - 0.5) * 2.0;
        osc.frequency.setValueAtTime(fundamental * mult + detuneAmt, ctx.currentTime);
        
        const gainNode = ctx.createGain();
        // High volume levels for individual harmonics to ensure clarity
        const baseVol = index === 0 ? 0.22 : index === 1 ? 0.16 : index === 2 ? 0.12 : index === 3 ? 0.08 : 0.05;
        gainNode.gain.setValueAtTime(baseVol, ctx.currentTime);

        // Slow LFO to modulate individual volumes for natural vocal movement
        const lfoOsc = ctx.createOscillator();
        lfoOsc.frequency.value = 0.2 + index * 0.08;
        const lfoGainNode = ctx.createGain();
        lfoGainNode.gain.value = baseVol * 0.3; // 30% volume modulation

        lfoOsc.connect(lfoGainNode);
        lfoGainNode.connect(gainNode.gain);
        lfoOsc.start();

        osc.connect(gainNode);
        gainNode.connect(omMasterGain);

        osc.start();
        soundNodesRef.current.push(osc, lfoOsc, lfoGainNode);
      });

      // Pass through a resonant bandpass or lowpass filter to form the A-U-M vowel sounds
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.value = 6.5; // highly resonant vowel quality
      filter.frequency.setValueAtTime(480, ctx.currentTime);

      // Modulate filter frequency to transition from A -> U -> M vowels slowly (breath cycle)
      const filterLfo = ctx.createOscillator();
      filterLfo.frequency.value = 0.08; // 12.5 seconds per breath cycle
      const filterLfoGain = ctx.createGain();
      filterLfoGain.gain.value = 180; // modulates between 300Hz and 660Hz

      filterLfo.connect(filterLfoGain);
      filterLfoGain.connect(filter.frequency);
      
      filterLfo.start();

      omMasterGain.connect(filter);
      filter.connect(ctx.destination);
      soundNodesRef.current.push(filterLfo, filterLfoGain, filter, omMasterGain);

      // --- TEMPLE CHIME TRIGGER (Tibetan Bowl sound) ---
      const triggerChime = () => {
        if (!audioContextRef.current || audioContextRef.current.state === 'suspended') return;
        const now = ctx.currentTime;
        
        // Multi-harmonic frequencies for a rich bell sound (e.g. 150Hz, 300Hz, 440Hz, 660Hz)
        const fundamentalChime = 130 + Math.random() * 40; // Random pitch
        const chimeHarmonics = [1, 2, 2.76, 3.4, 4.2];
        const gains = [0.15, 0.08, 0.05, 0.03, 0.01];

        chimeHarmonics.forEach((mult, index) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(fundamentalChime * mult, now);

          const gainNode = ctx.createGain();
          gainNode.gain.setValueAtTime(0, now);
          // Exponential decay representing a striking bowl
          gainNode.gain.linearRampToValueAtTime(gains[index], now + 0.05);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 4.5 + index * 0.5);

          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          
          osc.start(now);
          osc.stop(now + 6);
        });
      };

      // Initial ring
      triggerChime();

      // Trigger bell chimes randomly every 6 to 12 seconds
      const chimeInterval = setInterval(() => {
        triggerChime();
      }, 8500);

      // Save interval reference
      const intervalNode = {
        stop: () => clearInterval(chimeInterval)
      };
      soundNodesRef.current.push(intervalNode);

    } catch (e) {
      console.warn("Web Audio API error", e);
    }
  };

  const stopAmbience = () => {
    soundNodesRef.current.forEach(node => {
      try {
        if (node.stop) node.stop();
        else if (node.disconnect) node.disconnect();
      } catch (err) {}
    });
    soundNodesRef.current = [];
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const toggleSound = () => {
    if (isPlayingSound) {
      stopAmbience();
      setIsPlayingSound(false);
    } else {
      startAmbience();
      setIsPlayingSound(true);
    }
  };

  // Autoplay audio gradually after 2 seconds of page load (with user-interaction bypass)
  useEffect(() => {
    let timer: any;
    let allowedToPlay = false;

    const startAudio = () => {
      if (!audioContextRef.current) {
        startAmbience();
        setIsPlayingSound(true);
      } else if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
        setIsPlayingSound(true);
      }
    };

    const handleInteraction = () => {
      if (allowedToPlay) {
        startAudio();
        cleanupListeners();
      }
    };

    const cleanupListeners = () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    timer = setTimeout(() => {
      allowedToPlay = true;
      startAudio();
      
      setTimeout(() => {
        if (audioContextRef.current && audioContextRef.current.state === 'running') {
          cleanupListeners();
        }
      }, 100);
    }, 2000);

    window.addEventListener('click', handleInteraction);
    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      clearTimeout(timer);
      cleanupListeners();
    };
  }, []);

  // Clean up sound on unmount
  useEffect(() => {
    return () => stopAmbience();
  }, []);

  const heroDetails = {
    rishikesh: {
      bg: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1920&q=80',
      title: 'Experience Yoga, Meditation & Wellness Sanctuaries',
      desc: 'Join thousands of international travelers who seek sacred Indian retreats for spiritual transformation, therapeutic healing, and raw Himalayan adventure.'
    },
    agra: {
      bg: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1920&q=80',
      title: 'Experience Mughal Splendor & Architectural Wonders',
      desc: 'Explore the historical zenith of India. Witness the symmetry of the Taj Mahal and delve into imperial red-stone fortresses reflecting legacy romance.'
    },
    goa: {
      bg: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80',
      title: 'Experience Eco-Luxury & Coastal Spa Solitude',
      desc: 'Escape to pristine shorelines. Recharge with beachside Ayurvedic oil massages, organic spice garden tours, and seaside chakra meditation.'
    },
    delhi: {
      bg: 'https://images.unsplash.com/photo-1601058268499-e52658bdf57f?auto=format&fit=crop&w=1920&q=80',
      title: 'Experience Imperial History & Culinary Safaris',
      desc: 'Unravel 3,000 years of dynastic kingdoms. Rickshaw through fragrant spice markets and listen to Sufi chants echoing in medieval stone courtyards.'
    }
  }[activeDestination];

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-charcoal"
    >
      {/* Background Image Panel - Seamless Scrolling Panoramic Travel Scene */}
      <motion.div 
        className="absolute inset-0 select-none overflow-hidden"
        style={{
          y: yBg,
          x: mousePosition.x * 0.4,
          scale: 1.15
        }}
      >
        <div className="absolute inset-0 flex w-[200%] h-full animate-scroll-marquee">
          <img 
            src="/travel_bg.png" 
            alt="Panoramic Travel Background" 
            className="w-1/2 h-full object-cover shrink-0 select-none pointer-events-none brightness-[0.75] contrast-[1.05]" 
          />
          <img 
            src="/travel_bg.png" 
            alt="Panoramic Travel Background" 
            className="w-1/2 h-full object-cover shrink-0 select-none pointer-events-none brightness-[0.75] contrast-[1.05]" 
          />
        </div>
      </motion.div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 hero-gradient z-10" />

      {/* Interactive River Wave Mesh at bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream dark:from-charcoal to-transparent z-20" />

      {/* Ambient Sound Button */}
      <motion.button
        onClick={toggleSound}
        className="absolute bottom-28 right-8 z-30 flex items-center gap-2.5 px-4 py-2.5 rounded-full glass border border-gold/30 hover:border-gold shadow-lg text-xs font-semibold text-charcoal dark:text-cream cursor-pointer transition-all duration-300"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlayingSound ? (
          <>
            <Volume2 className="w-4 h-4 text-sunrise animate-pulse" />
            <span className="text-[10px] tracking-wider uppercase font-bold text-sunrise">Playing Ambience</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-charcoal/60 dark:text-cream/60" />
            <span className="text-[10px] tracking-wider uppercase font-bold">Sound Ambient On</span>
          </>
        )}
      </motion.button>

      {/* Hero Central Content */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-20 text-center max-w-4xl px-6 md:px-12 flex flex-col items-center gap-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2.5 border border-sunrise/30 bg-sunrise/5 px-4.5 py-1.5 rounded-full"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sunrise animate-ping" />
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-sunrise">Discover the Soul of India</span>
        </motion.div>

        <motion.h2
          key={`title-${activeDestination}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]"
        >
          {heroDetails.title}
        </motion.h2>

        <motion.p
          key={`desc-${activeDestination}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs sm:text-base text-cream/80 max-w-2xl leading-relaxed font-light tracking-wide"
        >
          {heroDetails.desc}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full justify-center"
        >
          <button
            onClick={() => onNavigate('experiences')}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-sunrise to-saffron text-white rounded-full text-xs font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-sunrise/30 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Experiences</span>
          </button>

          <button
            onClick={openBooking}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 glass text-white border border-white/35 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-charcoal hover:border-transparent transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <CalendarRange className="w-4 h-4" />
            <span>Plan Your Journey</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => onNavigate('planner')}
      >
        <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-cream/50">Scroll to Explore</span>
        <div className="w-6 h-9 rounded-full border border-cream/30 flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-sunrise rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};
