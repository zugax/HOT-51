import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Apple, ShieldCheck, Heart, Sparkles, Play, Flame, Gift, Award } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import confetti from 'canvas-confetti';

interface HeroProps {
  language: Language;
  onOpenDownload: () => void;
  onOpenIosModal: () => void;
  onOpenLiveDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onOpenDownload,
  onOpenIosModal,
  onOpenLiveDemo,
}) => {
  const t = TRANSLATIONS[language].hero;
  const [likeCount, setLikeCount] = useState(148200);
  const [hasLiked, setHasLiked] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; left: number }[]>([]);

  const handleLike = () => {
    setLikeCount((prev) => prev + 1);
    setHasLiked(true);
    const newHeart = {
      id: Date.now(),
      left: Math.floor(Math.random() * 60) + 20,
    };
    setFloatingHearts((prev) => [...prev.slice(-8), newHeart]);

    // Small haptic visual confetti
    try {
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.7, x: 0.8 },
        colors: ['#FF2E93', '#FF69B4', '#FFF'],
      });
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    // Random likes popping occasionally to simulate active live room
    const interval = setInterval(() => {
      setLikeCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-pink-600/20 via-rose-600/15 to-violet-600/20 blur-[130px] -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-purple-600/10 blur-[100px] -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-pink-500/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copywriting & High Conversion CTAs */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* SEO Viral Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500/15 to-violet-500/15 border border-pink-500/30 text-xs sm:text-sm font-bold text-pink-300 shadow-sm backdrop-blur-md">
              <Flame className="w-4 h-4 text-pink-400 animate-bounce" />
              <span>{t.tag}</span>
            </div>

            {/* Main H1 Headline with High-Value SEO Keywords */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] font-['Outfit']">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-violet-400">
                {t.titleHighlight}
              </span>{' '}
              <br className="hidden sm:inline" />
              <span className="text-slate-100">{t.titleSuffix}</span>
            </h1>

            {/* Persuasive Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t.description}
            </p>

            {/* Primary Action Buttons (Android APK & iOS) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-download-android-btn"
                onClick={onOpenDownload}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-violet-600 text-white font-bold text-base sm:text-lg shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group cursor-pointer"
              >
                <div className="p-1.5 rounded-xl bg-white/20">
                  <Smartphone className="w-5 h-5 group-hover:animate-bounce" />
                </div>
                <div className="text-left leading-tight">
                  <span className="text-xs font-normal text-pink-100 block">
                    {language === 'id' ? 'Unduh Gratis Langsung' : 'Free Direct Download'}
                  </span>
                  <span>{t.ctaAndroid}</span>
                </div>
              </button>

              <button
                id="hero-install-ios-btn"
                onClick={onOpenIosModal}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-750 text-white font-bold text-base sm:text-lg border border-white/15 hover:border-pink-500/50 shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <div className="p-1.5 rounded-xl bg-white/10">
                  <Apple className="w-5 h-5 text-slate-100" />
                </div>
                <div className="text-left leading-tight">
                  <span className="text-xs font-normal text-slate-400 block">
                    {language === 'id' ? 'Untuk Pengguna Apple' : 'For Apple Users'}
                  </span>
                  <span>{t.ctaIos}</span>
                </div>
              </button>
            </div>

            {/* Trust and Safety Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>{t.safeBadge}</span>
              </div>
              <span className="hidden sm:inline text-slate-600">•</span>
              <div className="text-slate-400">
                {t.fileSize}
              </div>
            </div>

            {/* Quick Metrics Stats Bar */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10">
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                  15M+
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{t.statsDownloads}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-black text-pink-400 font-['Outfit']">
                  50.000+
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{t.statsHosts}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-black text-amber-400 font-['Outfit']">
                  4.9 ★
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{t.statsRating}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl sm:text-2xl font-black text-violet-400 font-['Outfit']">
                  180+
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{t.statsCountries}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Streamer Device Mockup */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Phone Bezel Container */}
            <div className="relative w-full max-w-[340px] sm:max-w-[370px] rounded-[36px] p-3 bg-gradient-to-b from-slate-700/60 via-slate-800/80 to-slate-900 border-2 border-white/20 shadow-2xl shadow-pink-500/20 backdrop-blur-md">
              
              {/* Screen Content */}
              <div className="relative rounded-[28px] overflow-hidden aspect-[9/16] bg-slate-950 flex flex-col justify-between">
                
                {/* Background Streamer Image */}
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
                  alt="Min-ji Kim - Top Host Live Stream"
                  className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-700 hover:scale-110"
                />

                {/* Dark Vignette Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

                {/* Top Live Bar */}
                <div className="relative z-10 p-3.5 flex items-center justify-between">
                  {/* Host Info Capsule */}
                  <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md p-1 pr-3 rounded-full border border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
                      alt="Host Avatar"
                      className="w-8 h-8 rounded-full object-cover border border-pink-500"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white leading-tight">Min-ji 🇰🇷</span>
                        <Award className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      </div>
                      <span className="text-[10px] text-pink-300 font-medium">Top 1 Seoul Host</span>
                    </div>
                  </div>

                  {/* Red LIVE Pulsing Badge & Viewer Count */}
                  <div className="flex items-center gap-1.5 bg-red-600/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg shadow-red-600/40">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>LIVE</span>
                    <span className="text-white/80 text-[11px] font-normal pl-0.5">38.7k</span>
                  </div>
                </div>

                {/* Floating Heart Animations */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {floatingHearts.map((heart) => (
                    <div
                      key={heart.id}
                      style={{ left: `${heart.left}%` }}
                      className="absolute bottom-20 text-2xl text-pink-500 animate-bounce duration-1000 transition-all opacity-85"
                    >
                      ❤️
                    </div>
                  ))}
                </div>

                {/* Mid Banner: PK Match Winner Preview */}
                <div className="relative z-10 px-4">
                  <div className="bg-gradient-to-r from-violet-600/80 to-pink-600/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 flex items-center justify-between text-xs font-semibold text-white shadow-lg">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                      <span>PK Battle Korea vs Japan</span>
                    </div>
                    <span className="text-[11px] bg-black/40 px-2 py-0.5 rounded-full text-pink-200">
                      24.5k vs 19.8k
                    </span>
                  </div>
                </div>

                {/* Bottom Chat & Interactive Controls */}
                <div className="relative z-10 p-4 space-y-3">
                  
                  {/* Realtime Chat Bubbles */}
                  <div className="space-y-1.5 text-[11px]">
                    <div className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-xl text-white/90 border border-white/10 inline-flex items-center gap-1.5 max-w-[90%]">
                      <span className="text-pink-400 font-bold">Budi_Jkt 🇮🇩:</span>
                      <span className="truncate">Annyeonghaseyo cantik! Suaranya merdu banget 😍</span>
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-xl text-white/90 border border-white/10 inline-flex items-center gap-1.5 max-w-[90%]">
                      <span className="text-amber-400 font-bold">Kenji_Tokyo 🇯🇵:</span>
                      <span className="truncate">Sugoi!! Min-ji chan fighting!! 🚀🏎️</span>
                    </div>
                  </div>

                  {/* Interactive Action Row */}
                  <div className="flex items-center justify-between pt-1 gap-2">
                    
                    {/* Live Preview Button */}
                    <button
                      onClick={onOpenLiveDemo}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-pink-500/30 hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>{language === 'id' ? 'Buka Live Room' : 'Enter Live Room'}</span>
                    </button>

                    {/* Heart Tap to Like Button */}
                    <button
                      onClick={handleLike}
                      className={`p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold backdrop-blur-md transition-all cursor-pointer ${
                        hasLiked
                          ? 'bg-pink-600 border-pink-400 text-white scale-105'
                          : 'bg-black/50 border-white/20 text-white hover:bg-black/70'
                      }`}
                      title="Tap to like live stream"
                    >
                      <Heart className={`w-4 h-4 ${hasLiked ? 'fill-white text-white animate-ping' : 'text-pink-400 fill-pink-400'}`} />
                      <span>{(likeCount / 1000).toFixed(1)}k</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Floating Trust Mini Badge (Top Right) */}
            <div className="absolute -top-4 -right-2 sm:-right-6 bg-slate-900/90 border border-pink-500/40 backdrop-blur-xl p-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold text-slate-100 animate-pulse">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <div>Anti Banned</div>
                <div className="text-[10px] text-slate-400 font-normal">No VPN Required</div>
              </div>
            </div>

            {/* Floating Gift Badge (Bottom Left) */}
            <div className="absolute -bottom-4 -left-2 sm:-left-6 bg-slate-900/90 border border-violet-500/40 backdrop-blur-xl p-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold text-slate-100">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-pink-500 to-violet-600 text-white flex items-center justify-center">
                <Gift className="w-4 h-4" />
              </div>
              <div className="leading-tight">
                <div className="text-amber-300">+10.000 Koin Gratis</div>
                <div className="text-[10px] text-slate-400 font-normal">Klaim via Referral</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
