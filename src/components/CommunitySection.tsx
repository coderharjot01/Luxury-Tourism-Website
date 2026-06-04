import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Upload, Camera } from 'lucide-react';

interface SocialPost {
  id: string;
  destination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
  author: string;
  avatar: string;
  country: string;
  imageUrl: string;
  caption: string;
  likes: number;
  commentsCount: number;
  isLiked?: boolean;
}

interface CommunitySectionProps {
  activeDestination: 'rishikesh' | 'agra' | 'goa' | 'delhi';
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ activeDestination }) => {
  const [posts, setPosts] = useState<SocialPost[]>([
    {
      id: 'post-1',
      destination: 'rishikesh',
      author: 'Sophia Fischer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      country: 'Germany 🇩🇪',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
      caption: 'Sunrise meditation overlooking the misty valley. Simply surreal. Feeling extremely centered. #MystictrailJourney #Pranayama',
      likes: 142,
      commentsCount: 24,
      isLiked: false
    },
    {
      id: 'post-2',
      destination: 'rishikesh',
      author: 'Arthur Dupuis',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      country: 'France 🇫🇷',
      imageUrl: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=600&q=80',
      caption: 'Conquered the Grade IV rapids of the Ganges! Best white-water rafting in my life. The water is cold and pristine. #AdventureIndia',
      likes: 98,
      commentsCount: 12,
      isLiked: false
    },
    {
      id: 'post-3',
      destination: 'rishikesh',
      author: 'Oliver Smith',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      country: 'United Kingdom 🇬🇧',
      imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=600&q=80',
      caption: 'Evening Aarti prayers at Triveni Ghat. The chants, the bells, the thousands of candles drifting on the river... absolute magic.',
      likes: 215,
      commentsCount: 45,
      isLiked: false
    },
    {
      id: 'post-agra-1',
      destination: 'agra',
      author: 'Clara Rossi',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      country: 'Italy 🇮🇹',
      imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80',
      caption: 'Waking up to view the Taj Mahal shrouded in early morning fog is a memory that will stay with me forever. #TajMahal #MystictrailJourney',
      likes: 310,
      commentsCount: 38,
      isLiked: false
    },
    {
      id: 'post-agra-2',
      destination: 'agra',
      author: 'Hans Müller',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      country: 'Austria 🇦🇹',
      imageUrl: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=600&q=80',
      caption: 'Tried my hands at Pietra Dura marble inlay work. The precision of these local artisans is mind-blowing. #MughalCrafts',
      likes: 112,
      commentsCount: 9,
      isLiked: false
    },
    {
      id: 'post-goa-1',
      destination: 'goa',
      author: 'Chloé Petit',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      country: 'Belgium 🇧🇪',
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      caption: 'Eco-beach spa and morning yoga under the palms on Mandrem dunes. Total relaxation, body and soul. #GoaWellness #BeachYoga',
      likes: 189,
      commentsCount: 22,
      isLiked: false
    },
    {
      id: 'post-goa-2',
      destination: 'goa',
      author: 'Niklas Berg',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      country: 'Sweden 🇸🇪',
      imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80',
      caption: 'Walking through a 100-acre organic spice garden and eating a Goan feast on banana leaves. Highly recommended. #EcoTravel',
      likes: 95,
      commentsCount: 11,
      isLiked: false
    },
    {
      id: 'post-delhi-1',
      destination: 'delhi',
      author: 'James Patel',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      country: 'United Kingdom 🇬🇧',
      imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=600&q=80',
      caption: 'Listening to the live Qawwali musical prayers at Nizamuddin Dargah. The energy in that courtyard is hypnotic. #SufiVibes #MystictrailJourney',
      likes: 240,
      commentsCount: 52,
      isLiked: false
    },
    {
      id: 'post-delhi-2',
      destination: 'delhi',
      author: 'Maria Durand',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      country: 'France 🇫🇷',
      imageUrl: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=600&q=80',
      caption: 'Exploring Humayun\'s Tomb and Lodi Gardens under the afternoon sun. The red sandstone architecture is breathtaking. #DelhiHeritage',
      likes: 150,
      commentsCount: 18,
      isLiked: false
    }
  ]);

  // Upload simulation
  const [captionInput, setCaptionInput] = useState('');
  const [uploadMockImage, setUploadMockImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const sectionContent = {
    rishikesh: {
      tagline: 'Pilgrims Community',
      title: 'Ganga Inspiration Gallery',
      desc: 'Connect with international travelers. Read recent stories, view real guest photos, and upload your own Himalayan memories.',
      presets: [
        { label: 'Yoga Shala', url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=80' },
        { label: 'Himalayan Ridge', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80' },
        { label: 'Ayurveda Herb', url: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=500&q=80' }
      ]
    },
    agra: {
      tagline: 'Heritage Explorers',
      title: 'Mughal Splendors Gallery',
      desc: 'Share the grandeur. View guest photography and read about Taj Mahal sunrise walks, red sandstone palace tours, and inlay arts.',
      presets: [
        { label: 'Taj Sunrise', url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=500&q=80' },
        { label: 'Fort Gate', url: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=500&q=80' },
        { label: 'Pietra Dura', url: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=500&q=80' }
      ]
    },
    goa: {
      tagline: 'Eco-Coastal Wellness',
      title: 'Beach & Spice Gallery',
      desc: 'Ocean views and organic trails. Connect with other travelers seeking beachfront yoga, spa therapy, and culinary explorations.',
      presets: [
        { label: 'Ocean Yoga', url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=80' },
        { label: 'Mandrem Beach', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80' },
        { label: 'Spice Garden', url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=500&q=80' }
      ]
    },
    delhi: {
      tagline: 'Gastronomy & History',
      title: 'Imperial Vibe Gallery',
      desc: 'City stories. View photos from Sufi music nights, red sandstone monuments, spice markets, and gourmet food trails.',
      presets: [
        { label: 'Sufi Chants', url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0db?auto=format&fit=crop&w=500&q=80' },
        { label: 'Humayun Garden', url: 'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?auto=format&fit=crop&w=500&q=80' },
        { label: 'Spice Bazaar', url: 'https://images.unsplash.com/photo-1601058268499-e52658bdf57f?auto=format&fit=crop&w=500&q=80' }
      ]
    }
  };

  const currentContent = sectionContent[activeDestination];
  const activePosts = posts.filter(p => p.destination === activeDestination);

  const handleLike = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return {
          ...p,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          isLiked: !p.isLiked
        };
      }
      return p;
    }));
  };

  const handleMockUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captionInput) return;

    setIsUploading(true);

    setTimeout(() => {
      const newPost: SocialPost = {
        id: `post-${Date.now()}`,
        destination: activeDestination,
        author: 'Lukas Lind',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        country: 'Sweden 🇸🇪',
        imageUrl: uploadMockImage || currentContent.presets[0].url,
        caption: captionInput,
        likes: 1,
        commentsCount: 0,
        isLiked: true
      };

      setPosts([newPost, ...posts]);
      setCaptionInput('');
      setUploadMockImage('');
      setIsUploading(false);
      alert('Your travel story has been published to the MystictrailJourney social wall!');
    }, 1200);
  };

  return (
    <section id="community" className="py-24 max-w-7xl mx-auto px-6 md:px-12 bg-cream-dark/20 dark:bg-charcoal-dark/20">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-saffron">{currentContent.tagline}</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal dark:text-cream mt-2">
          {currentContent.title}
        </h2>
        <p className="text-xs md:text-sm text-charcoal/60 dark:text-cream/60 leading-relaxed mt-4">
          {currentContent.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Social Feed Wall */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {activePosts.map((post) => (
              <div 
                key={post.id} 
                className="glass-premium rounded-2xl overflow-hidden border border-gold/15 shadow-sm flex flex-col justify-between"
              >
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-charcoal/5 dark:border-cream/5">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.avatar} 
                      alt={post.author} 
                      className="w-8 h-8 rounded-full object-cover border border-gold/30" 
                    />
                    <div>
                      <h4 className="text-[10px] font-bold text-charcoal dark:text-cream leading-tight">{post.author}</h4>
                      <span className="text-[8px] text-charcoal/45 dark:text-cream/45">{post.country}</span>
                    </div>
                  </div>
                  <Share2 className="w-3.5 h-3.5 text-charcoal/30 dark:text-cream/30 hover:text-sunrise cursor-pointer" />
                </div>

                {/* Main Photo */}
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={post.imageUrl} 
                    alt="Travel Snapshot" 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Caption / Actions */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-charcoal/70 dark:text-cream/70 leading-relaxed font-light line-clamp-3">
                    {post.caption}
                  </p>

                  <div className="flex items-center justify-between border-t border-charcoal/5 dark:border-cream/5 pt-4 mt-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs font-bold ${
                        post.isLiked ? 'text-sunrise' : 'text-charcoal/50 dark:text-cream/50'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-sunrise' : ''}`} />
                      <span>{post.likes}</span>
                    </button>

                    <span className="flex items-center gap-1.5 text-xs font-semibold text-charcoal/50 dark:text-cream/50">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.commentsCount}</span>
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Upload simulated Widget */}
        <div className="lg:col-span-1 glass-premium p-6 md:p-8 rounded-3xl border border-gold/25 shadow-xl flex flex-col gap-6 sticky top-28">
          <div>
            <h3 className="font-serif text-base font-bold text-charcoal dark:text-cream">Share Your Retreat Story</h3>
            <p className="text-[10px] text-charcoal/50 dark:text-cream/50 mt-1">Publish snapshots and let other spiritual travelers find inspiration.</p>
          </div>

          <form onSubmit={handleMockUpload} className="flex flex-col gap-4">
            {/* Choose mock photo */}
            <div>
              <label className="text-[9px] uppercase font-bold text-charcoal/50 dark:text-cream/50">1. Select Travel Photo</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {currentContent.presets.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setUploadMockImage(img.url)}
                    className={`h-16 rounded-lg overflow-hidden border-2 relative ${
                      uploadMockImage === img.url ? 'border-sunrise scale-105' : 'border-transparent'
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover filter brightness-[0.85]" />
                    <span className="absolute bottom-1 left-1 right-1 text-[8px] font-bold text-white bg-black/40 text-center rounded truncate">{img.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Caption */}
            <div>
              <label className="text-[9px] uppercase font-bold text-charcoal/50 dark:text-cream/50">2. Share Caption</label>
              <textarea
                value={captionInput}
                onChange={(e) => setCaptionInput(e.target.value)}
                placeholder="Describe your inner transformation, the local vibes, or your custom travel plans..."
                required
                rows={4}
                className="w-full mt-1.5 p-3 bg-cream/50 dark:bg-charcoal-light/50 border border-charcoal/10 dark:border-cream/10 rounded-xl text-xs text-charcoal dark:text-cream focus:outline-none focus:border-sunrise resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isUploading || !captionInput || !uploadMockImage}
              className="w-full py-3 bg-gradient-to-r from-sunrise to-saffron text-white text-[10px] font-bold uppercase tracking-wider rounded-full hover:shadow-lg transition-all flex items-center justify-center gap-1.5 disabled:opacity-40"
            >
              {isUploading ? (
                <>
                  <Camera className="w-3.5 h-3.5 animate-spin" />
                  <span>Publishing story...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Post Story to Wall</span>
                </>
              )}
            </button>
          </form>

        </div>

      </div>

    </section>
  );
};
