import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { retreats, experiences } from '../data/mockData';
import { CreditCard, Shield, Check, ChevronRight, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingSystemProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: any | null;
  activeDestination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
}

export const BookingSystem: React.FC<BookingSystemProps> = ({ isOpen, onClose, initialData, activeDestination }) => {
  const [step, setStep] = useState(1);
  const [selectedProductType, setSelectedProductType] = useState<'retreat' | 'activity'>('retreat');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [guestsCount, setGuestsCount] = useState(1);
  
  // Add-ons
  const [airportTransfer, setAirportTransfer] = useState(false);
  const [organicMeals, setOrganicMeals] = useState(false);
  const [translationGuide, setTranslationGuide] = useState(false);

  // Payment
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  // Automatically pre-populate from planner or detail click
  useEffect(() => {
    if (initialData) {
      if (initialData.selectedRetreat) {
        setSelectedProductType('retreat');
        setSelectedProduct(initialData.selectedRetreat);
      } else if (initialData.selectedProgram) {
        setSelectedProductType('activity');
        setSelectedProduct(initialData.selectedProgram);
      } else if (initialData.category) {
        setSelectedProductType('activity');
        const match = experiences.find(e => e.category === initialData.category && e.destination === activeDestination);
        if (match) setSelectedProduct(match.title);
      }
      setStep(2); // Jump to dates immediately
    } else {
      setStep(1);
      setSelectedProduct('');
    }
  }, [initialData, isOpen, activeDestination]);

  // Reset selected product if changing destination and it becomes invalid
  useEffect(() => {
    if (selectedProduct) {
      const isValidRetreat = retreats.some(r => r.name === selectedProduct && r.destination === activeDestination);
      const isValidExperience = experiences.some(e => e.title === selectedProduct && e.destination === activeDestination);
      if (!isValidRetreat && !isValidExperience) {
        setSelectedProduct('');
        setStep(1);
      }
    }
  }, [activeDestination]);

  if (!isOpen) return null;

  // Compute Prices
  const getProductPrice = () => {
    if (selectedProductType === 'retreat') {
      const match = retreats.find(r => r.name === selectedProduct);
      if (match) {
        // extract first number from e.g. "€2,100 - €4,200"
        const firstHalf = match.priceRange.split('-')[0].trim();
        const base = parseInt(firstHalf.replace(/[^\d]/g, '')) || 1200;
        return base;
      }
      return 1500;
    } else {
      const match = experiences.find(e => e.title === selectedProduct);
      if (match) {
        const base = parseInt(match.price.replace(/[^\d]/g, '')) || 400;
        return base;
      }
      return 450;
    }
  };

  const productPrice = getProductPrice();
  const subtotal = productPrice * guestsCount;
  const transferCost = airportTransfer ? 95 * guestsCount : 0;
  const mealsCost = organicMeals ? 120 * guestsCount : 0;
  const guideCost = translationGuide ? 180 : 0;
  const total = subtotal + transferCost + mealsCost + guideCost;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaying(true);
    
    // Simulate luxury credit card authorization
    setTimeout(() => {
      setIsPaying(false);
      setStep(5);
      // Trigger canvas confetti rain!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
      />

      {/* Main Wizard Dialog */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="glass-premium w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden z-10 border border-gold/20 flex flex-col md:flex-row min-h-[520px] max-h-[90vh] md:max-h-none"
      >
        
        {/* Left Side: Invoice Panel (Col-1/3) */}
        <div className="w-full md:w-80 bg-cream-dark/50 dark:bg-charcoal-dark/50 p-6 md:p-8 border-b md:border-b-0 md:border-r border-charcoal/10 dark:border-cream/10 flex flex-col justify-between overflow-y-auto">
          <div>
            <span className="text-[8px] uppercase font-extrabold tracking-widest text-saffron">Premium Booking Checkout</span>
            <h3 className="font-serif text-lg font-bold text-charcoal dark:text-cream mt-1">Journey Invoice</h3>
            
            {selectedProduct ? (
              <div className="mt-6 flex flex-col gap-4 text-xs">
                <div>
                  <span className="text-[9px] uppercase font-bold text-charcoal/40 dark:text-cream/40">Selection</span>
                  <p className="font-bold text-charcoal dark:text-cream mt-0.5">{selectedProduct}</p>
                  <p className="text-[10px] text-charcoal/50 dark:text-cream/50">Base: €{productPrice} / traveler</p>
                </div>
                
                {travelDate && (
                  <div>
                    <span className="text-[9px] uppercase font-bold text-charcoal/40 dark:text-cream/40">Departure Date</span>
                    <p className="font-semibold text-charcoal dark:text-cream mt-0.5">{travelDate}</p>
                  </div>
                )}

                <div>
                  <span className="text-[9px] uppercase font-bold text-charcoal/40 dark:text-cream/40">Travelers</span>
                  <p className="font-semibold text-charcoal dark:text-cream mt-0.5">{guestsCount} person{guestsCount > 1 ? 's' : ''}</p>
                </div>

                {/* Add-ons List */}
                {(airportTransfer || organicMeals || translationGuide) && (
                  <div className="border-t border-charcoal/10 dark:border-cream/10 pt-3">
                    <span className="text-[9px] uppercase font-bold text-charcoal/40 dark:text-cream/40">Selected Add-ons</span>
                    <div className="flex flex-col gap-1 mt-1 text-[10px] text-charcoal/60 dark:text-cream/60">
                      {airportTransfer && <div className="flex justify-between"><span>Private SUV Transfer</span><span>€{transferCost}</span></div>}
                      {organicMeals && <div className="flex justify-between"><span>Organic Meal Plan</span><span>€{mealsCost}</span></div>}
                      {translationGuide && <div className="flex justify-between"><span>Translator Guide</span><span>€{guideCost}</span></div>}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-charcoal/40 dark:text-cream/40 mt-8">Please choose a retreat package to begin calculation.</p>
            )}
          </div>

          {selectedProduct && (
            <div className="border-t border-charcoal/10 dark:border-cream/10 pt-4 mt-6">
              <div className="flex items-end justify-between">
                <span className="text-[9px] uppercase font-extrabold text-charcoal/40 dark:text-cream/40">Total Price</span>
                <p className="text-xl font-serif font-extrabold text-charcoal dark:text-cream leading-none">
                  €{total.toLocaleString()}
                </p>
              </div>
              <span className="text-[8px] text-charcoal/40 dark:text-cream/40 block text-right mt-1">Includes EU VAT & Local Taxes</span>
            </div>
          )}
        </div>

        {/* Right Side: Step-by-Step Forms (Col-2/3) */}
        <div className="grow p-6 md:p-10 flex flex-col justify-between overflow-y-auto">
          {/* Close button */}
          <div className="flex justify-between items-center mb-6">
            {/* Step Progress indicators */}
            <div className="flex gap-1.5 items-center text-[10px] uppercase font-bold text-charcoal/40 dark:text-cream/40">
              <span className={step >= 1 ? 'text-sunrise' : ''}>Select</span>
              <ChevronRight className="w-3 h-3" />
              <span className={step >= 2 ? 'text-sunrise' : ''}>Dates</span>
              <ChevronRight className="w-3 h-3" />
              <span className={step >= 3 ? 'text-sunrise' : ''}>Add-ons</span>
              <ChevronRight className="w-3 h-3" />
              <span className={step >= 4 ? 'text-sunrise' : ''}>Payment</span>
            </div>

            <button 
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-charcoal/5 dark:bg-cream/5 flex items-center justify-center text-charcoal/55 dark:text-cream/55 hover:bg-charcoal/10 transition-colors"
            >
              &times;
            </button>
          </div>

          <div className="grow flex items-center justify-center min-h-[300px]">
            <AnimatePresence mode="wait">
              
              {/* Step 1: Product Selection */}
              {step === 1 && (
                <motion.div 
                  key="book-step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full flex flex-col gap-6"
                >
                  <h3 className="font-serif text-base font-bold text-charcoal dark:text-cream text-center">
                    What would you like to reserve?
                  </h3>
                  
                  {/* Tabs */}
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => { setSelectedProductType('retreat'); setSelectedProduct(''); }}
                      className={`px-4 py-2 rounded-full text-xs font-bold ${
                        selectedProductType === 'retreat' ? 'bg-sunrise text-white' : 'bg-charcoal/5 dark:bg-cream/5 text-charcoal/65 dark:text-cream/65'
                      }`}
                    >
                      Luxury Retreat
                    </button>
                    <button
                      onClick={() => { setSelectedProductType('activity'); setSelectedProduct(''); }}
                      className={`px-4 py-2 rounded-full text-xs font-bold ${
                        selectedProductType === 'activity' ? 'bg-sunrise text-white' : 'bg-charcoal/5 dark:bg-cream/5 text-charcoal/65 dark:text-cream/65'
                      }`}
                    >
                      Immersive Program
                    </button>
                  </div>

                  {/* List Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-2">
                    {selectedProductType === 'retreat' ? (
                      retreats.filter(r => r.destination === activeDestination).map(ret => (
                        <button
                          key={ret.id}
                          onClick={() => setSelectedProduct(ret.name)}
                          className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all flex justify-between items-center ${
                            selectedProduct === ret.name 
                              ? 'border-sunrise bg-sunrise/5 dark:bg-sunrise/10 text-sunrise shadow-sm'
                              : 'border-charcoal/10 dark:border-cream/10 hover:bg-cream-dark/50 dark:hover:bg-charcoal-light/50 text-charcoal dark:text-cream'
                          }`}
                        >
                          <span>{ret.name}</span>
                          <span className="text-[10px] font-bold text-charcoal/40 dark:text-cream/40">{ret.priceRange.split('-')[0]}</span>
                        </button>
                      ))
                    ) : (
                      experiences.filter(e => e.destination === activeDestination).map(exp => (
                        <button
                          key={exp.id}
                          onClick={() => setSelectedProduct(exp.title)}
                          className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all flex justify-between items-center ${
                            selectedProduct === exp.title 
                              ? 'border-sunrise bg-sunrise/5 dark:bg-sunrise/10 text-sunrise shadow-sm'
                              : 'border-charcoal/10 dark:border-cream/10 hover:bg-cream-dark/50 dark:hover:bg-charcoal-light/50 text-charcoal dark:text-cream'
                          }`}
                        >
                          <span>{exp.title}</span>
                          <span className="text-[10px] font-bold text-charcoal/40 dark:text-cream/40">{exp.price}</span>
                        </button>
                      ))
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date & Guest Details */}
              {step === 2 && (
                <motion.div 
                  key="book-step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full flex flex-col gap-6"
                >
                  <h3 className="font-serif text-base font-bold text-charcoal dark:text-cream text-center">
                    Select Dates &amp; Party Size
                  </h3>

                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex-1">
                      <label className="text-[10px] uppercase font-bold text-charcoal/50 dark:text-cream/50">Departure Date</label>
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        required
                        className="w-full mt-2 p-3 bg-cream/50 dark:bg-charcoal-light/50 border border-charcoal/10 dark:border-cream/10 rounded-xl text-xs text-charcoal dark:text-cream focus:outline-none focus:border-sunrise"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="text-[10px] uppercase font-bold text-charcoal/50 dark:text-cream/50">Number of Travelers</label>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          type="button"
                          disabled={guestsCount <= 1}
                          onClick={() => setGuestsCount(guestsCount - 1)}
                          className="w-10 h-10 rounded-full border border-charcoal/15 dark:border-cream/15 flex items-center justify-center text-sm font-bold text-charcoal dark:text-cream disabled:opacity-30"
                        >
                          -
                        </button>
                        <span className="font-bold text-sm text-charcoal dark:text-cream w-8 text-center">{guestsCount}</span>
                        <button
                          type="button"
                          onClick={() => setGuestsCount(guestsCount + 1)}
                          className="w-10 h-10 rounded-full border border-charcoal/15 dark:border-cream/15 flex items-center justify-center text-sm font-bold text-charcoal dark:text-cream"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Add-on services */}
              {step === 3 && (
                <motion.div 
                  key="book-step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full flex flex-col gap-6"
                >
                  <h3 className="font-serif text-base font-bold text-charcoal dark:text-cream text-center">
                    Enhance your Spiritual Journey
                  </h3>

                  <div className="flex flex-col gap-3">
                    {[
                      {
                        state: airportTransfer,
                        setter: setAirportTransfer,
                        title: 'Private Airport Transfer',
                        desc: 'Door-to-door luxury air-conditioned SUV transfer from the nearest international or domestic airport.',
                        price: '€95 / guest'
                      },
                      {
                        state: organicMeals,
                        setter: setOrganicMeals,
                        title: 'Organic Ayurvedic Meal Plan',
                        desc: 'Fully customized organic vegetarian detox meals matching your physical Dosha type.',
                        price: '€120 / guest'
                      },
                      {
                        state: translationGuide,
                        setter: setTranslationGuide,
                        title: 'Dedicated Local Translator Guide',
                        desc: 'Private English, German or French speaker accompanying you on temple walks.',
                        price: '€180 flat'
                      }
                    ].map((addon, idx) => (
                      <button
                        key={idx}
                        onClick={() => addon.setter(!addon.state)}
                        className={`p-4 rounded-xl border text-left flex justify-between items-center transition-all ${
                          addon.state
                            ? 'border-sunrise bg-sunrise/5 dark:bg-sunrise/10 shadow-sm'
                            : 'border-charcoal/10 dark:border-cream/10 hover:bg-cream-dark/50 dark:hover:bg-charcoal-light/50'
                        }`}
                      >
                        <div>
                          <h4 className="text-xs font-bold text-charcoal dark:text-cream">{addon.title}</h4>
                          <p className="text-[10px] text-charcoal/50 dark:text-cream/50 mt-0.5">{addon.desc}</p>
                        </div>
                        <span className="text-[10px] font-extrabold text-sunrise tracking-wider shrink-0 ml-4">{addon.price}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Credit Card Payment Secure checkout */}
              {step === 4 && (
                <motion.div 
                  key="book-step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full"
                >
                  <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-4">
                    <h3 className="font-serif text-base font-bold text-charcoal dark:text-cream text-center">
                      Secure Credit Card Payment
                    </h3>

                    <div className="flex items-center gap-2 px-4 py-2.5 bg-forest/5 dark:bg-forest/10 border border-forest/20 rounded-xl text-forest text-[10px] font-semibold">
                      <Shield className="w-4 h-4 shrink-0" />
                      <span>256-Bit SSL Encrypted checkout. Payments are protected by India Tourism Board compliance.</span>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="text-[9px] uppercase font-bold text-charcoal/50 dark:text-cream/50">Cardholder Name</label>
                        <input
                          type="text"
                          required
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="e.g. Charlotte Dubois"
                          className="w-full mt-1 p-2.5 bg-cream/50 dark:bg-charcoal-light/50 border border-charcoal/10 dark:border-cream/10 rounded-lg text-xs text-charcoal dark:text-cream focus:outline-none focus:border-sunrise"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] uppercase font-bold text-charcoal/50 dark:text-cream/50">Card Number</label>
                        <input
                          type="text"
                          required
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="0000 0000 0000 0000"
                          className="w-full mt-1 p-2.5 bg-cream/50 dark:bg-charcoal-light/50 border border-charcoal/10 dark:border-cream/10 rounded-lg text-xs text-charcoal dark:text-cream focus:outline-none focus:border-sunrise"
                        />
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="text-[9px] uppercase font-bold text-charcoal/50 dark:text-cream/50">Expiry Date</label>
                          <input
                            type="text"
                            required
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full mt-1 p-2.5 bg-cream/50 dark:bg-charcoal-light/50 border border-charcoal/10 dark:border-cream/10 rounded-lg text-xs text-charcoal dark:text-cream focus:outline-none focus:border-sunrise"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="text-[9px] uppercase font-bold text-charcoal/50 dark:text-cream/50">CVV Security Code</label>
                          <input
                            type="password"
                            required
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="***"
                            className="w-full mt-1 p-2.5 bg-cream/50 dark:bg-charcoal-light/50 border border-charcoal/10 dark:border-cream/10 rounded-lg text-xs text-charcoal dark:text-cream focus:outline-none focus:border-sunrise"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isPaying}
                      className="w-full py-3 bg-gradient-to-r from-sunrise to-saffron text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md mt-2 flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                    >
                      {isPaying ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Authorizing Payment...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          <span>Authorize Payment (€{total.toLocaleString()})</span>
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Step 5: Success Confirmation Screen */}
              {step === 5 && (
                <motion.div 
                  key="book-step5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full text-center flex flex-col items-center gap-6"
                >
                  <div className="w-16 h-16 rounded-full bg-forest/10 border-2 border-forest text-forest flex items-center justify-center animate-bounce-slow">
                    <Check className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-extrabold tracking-widest text-forest">Reservation Confirmed</span>
                    <h3 className="font-serif text-2xl font-bold text-charcoal dark:text-cream mt-1.5">
                      Namaste, Your Seat is Reserved!
                    </h3>
                    <p className="text-xs text-charcoal/65 dark:text-cream/65 mt-2 max-w-sm mx-auto leading-relaxed">
                      We have sent your secure travel ticket voucher and our comprehensive European Visa Checklist to your billing address email.
                    </p>
                  </div>

                  <div className="p-4 bg-cream-dark/50 dark:bg-charcoal-light/50 border border-charcoal/10 dark:border-cream/10 rounded-2xl w-full text-left flex flex-col gap-2 text-[10px] text-charcoal/65 dark:text-cream/65">
                    <div><strong>Booking ID:</strong> MTJ-2026-{Math.floor(1000 + Math.random() * 9000)}</div>
                    <div><strong>Package:</strong> {selectedProduct}</div>
                    <div><strong>Date:</strong> {travelDate}</div>
                    <div><strong>Guests:</strong> {guestsCount} Traveler{guestsCount > 1 ? 's' : ''}</div>
                  </div>

                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-gradient-to-r from-sunrise to-saffron text-white text-[10px] font-bold uppercase tracking-wider rounded-full hover:shadow-lg transition-all"
                  >
                    Return to Main Page
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Footer Wizard Nav Controls */}
          {step < 4 && (
            <div className="flex justify-between items-center border-t border-charcoal/5 dark:border-cream/5 pt-6 mt-8">
              <button
                type="button"
                disabled={step === 1}
                onClick={() => setStep(step - 1)}
                className={`text-[10px] font-bold uppercase tracking-wider text-charcoal/50 dark:text-cream/50 hover:text-charcoal ${
                  step === 1 ? 'opacity-20 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                Back
              </button>

              <button
                type="button"
                disabled={!selectedProduct || (step === 2 && !travelDate)}
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 bg-charcoal dark:bg-cream text-white dark:text-charcoal rounded-full text-[10px] font-bold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                Continue
              </button>
            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
};
