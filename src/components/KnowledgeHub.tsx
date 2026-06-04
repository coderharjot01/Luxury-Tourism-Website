import React, { useState, useEffect } from 'react';
import { articles } from '../data/mockData';
import { BookOpen, Search, Clock, Calendar } from 'lucide-react';

interface KnowledgeHubProps {
  activeDestination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
}

export const KnowledgeHub: React.FC<KnowledgeHubProps> = ({ activeDestination }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const destinationArticles = articles.filter(art => art.destination === activeDestination);
  const categories = ['all', ...Array.from(new Set(destinationArticles.map(art => art.category)))];

  useEffect(() => {
    setActiveCategory('all');
  }, [activeDestination]);

  const filteredArticles = destinationArticles.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || art.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const hubTitles = {
    rishikesh: 'Yoga & Meditation Hub',
    agra: 'Taj & Mughal Heritage Hub',
    goa: 'Ocean Spas & Eco-Beach Hub',
    delhi: 'Imperial Sights & Gastronomy Hub'
  };

  const hubDescriptions = {
    rishikesh: 'Expand your mind. Browse scientific reports and spiritual travel guides written by our advisory board doctors and meditation experts.',
    agra: 'Explore the visual stories. Discover architectural deep-dives, heritage trails, and conservation histories by leading local curators.',
    goa: 'Coastal lifestyle insights. Learn about marine conservation, spice culinary arts, and natural Ayurveda secrets.',
    delhi: 'Vibrant historical journals. Read about Sufi poetry origins, old spice markets, and architectural evolution through the empires.'
  };

  return (
    <section id="hub" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-saffron">Knowledge Hub</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal dark:text-cream mt-2">
            {hubTitles[activeDestination]}
          </h2>
          <p className="text-xs md:text-sm text-charcoal/60 dark:text-cream/60 max-w-lg mt-3 leading-relaxed">
            {hubDescriptions[activeDestination]}
          </p>
        </div>

        {/* Search and Category filters */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative grow sm:w-64">
            <input
              type="text"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-cream-dark/50 dark:bg-charcoal-light/50 border border-charcoal/10 dark:border-cream/10 rounded-full text-xs text-charcoal dark:text-cream focus:outline-none focus:border-sunrise"
            />
            <Search className="w-3.5 h-3.5 text-charcoal/40 dark:text-cream/40 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeCategory === cat
                ? 'bg-sunrise text-white shadow-sm'
                : 'bg-cream-dark/30 dark:bg-charcoal-light/30 border border-charcoal/5 dark:border-cream/5 text-charcoal/60 dark:text-cream/60 hover:bg-cream-dark dark:hover:bg-charcoal-light'
            }`}
          >
            {cat === 'all' ? 'Show All' : cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((art) => (
          <article 
            key={art.id}
            className="glass-premium rounded-2xl overflow-hidden border border-gold/15 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              {/* Cover Photo */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={art.imageUrl} 
                  alt={art.title} 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-cream/95 dark:bg-charcoal/95 text-[9px] font-bold uppercase tracking-wider rounded text-sunrise shadow-sm">
                  {art.category}
                </span>
              </div>

              {/* Title & Info */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-wider text-charcoal/40 dark:text-cream/40 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {art.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {art.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-base font-semibold text-charcoal dark:text-cream group-hover:text-sunrise transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-charcoal/65 dark:text-cream/65 mt-2 line-clamp-3 leading-relaxed font-light">
                  {art.excerpt}
                </p>
              </div>
            </div>

            {/* Author bar */}
            <div className="p-6 pt-0 border-t border-charcoal/5 dark:border-cream/5 mt-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={art.author.avatar} 
                  alt={art.author.name} 
                  className="w-8 h-8 rounded-full object-cover border border-gold/30" 
                />
                <div>
                  <h4 className="text-[10px] font-bold text-charcoal dark:text-cream leading-none">{art.author.name}</h4>
                  <span className="text-[8px] text-charcoal/40 dark:text-cream/40 mt-0.5 block">{art.author.role}</span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full border border-charcoal/10 dark:border-cream/10 flex items-center justify-center text-charcoal/40 dark:text-cream/40 group-hover:bg-sunrise group-hover:text-white group-hover:border-transparent transition-all">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>

          </article>
        ))}

        {filteredArticles.length === 0 && (
          <div className="col-span-full py-12 text-center text-charcoal/50 dark:text-cream/50 text-xs">
            No articles found matching your criteria. Try another keyword.
          </div>
        )}
      </div>

    </section>
  );
};
