import React, { useState } from 'react';
import { Streamer, Language } from '../types';
import { STREAMERS_DATA } from '../data/streamers';
import { TRANSLATIONS } from '../data/translations';
import { Play, Eye, Flame, Sparkles, Heart, Award } from 'lucide-react';

interface LiveStreamersShowcaseProps {
  language: Language;
  onSelectStreamer: (streamer: Streamer) => void;
}

export const LiveStreamersShowcase: React.FC<LiveStreamersShowcaseProps> = ({
  language,
  onSelectStreamer,
}) => {
  const t = TRANSLATIONS[language].streamersSection;
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const countries = [
    { code: 'all', labelId: 'Semua Negara', labelEn: 'All Countries', flag: '🌍' },
    { code: 'ID', labelId: 'Indonesia', labelEn: 'Indonesia', flag: '🇮🇩' },
    { code: 'KR', labelId: 'Korea Selatan', labelEn: 'South Korea', flag: '🇰🇷' },
    { code: 'JP', labelId: 'Jepang', labelEn: 'Japan', flag: '🇯🇵' },
    { code: 'TH', labelId: 'Thailand', labelEn: 'Thailand', flag: '🇹🇭' },
    { code: 'US', labelId: 'Amerika Serikat', labelEn: 'United States', flag: '🇺🇸' },
    { code: 'BR', labelId: 'Brasil', labelEn: 'Brazil', flag: '🇧🇷' },
    { code: 'VN', labelId: 'Vietnam', labelEn: 'Vietnam', flag: '🇻🇳' },
    { code: 'CO', labelId: 'Kolombia', labelEn: 'Colombia', flag: '🇨🇴' },
  ];

  const categories = [
    { key: 'all', labelId: 'Semua Kategori', labelEn: 'All Categories' },
    { key: 'pk', labelId: '🔥 PK Battle', labelEn: '🔥 PK Battle' },
    { key: 'dance', labelId: '💃 Dance & Goyang', labelEn: '💃 Dance & Rhythm' },
    { key: 'music', labelId: '🎤 Musik & Vokal', labelEn: '🎤 Music & Vocals' },
    { key: 'chat', labelId: '💬 Ngobrol Santai', labelEn: '💬 Just Chatting' },
    { key: 'cosplay', labelId: '✨ Anime & Cosplay', labelEn: '✨ Anime & Cosplay' },
  ];

  const filteredStreamers = STREAMERS_DATA.filter((s) => {
    const matchCountry = selectedCountry === 'all' || s.countryCode === selectedCountry;
    const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
    return matchCountry && matchCat;
  });

  return (
    <section id="streamers" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-xs font-bold text-pink-400">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {t.subtitle}
          </p>
        </div>

        {/* Country Filter Pills (Horizontal Scroll on Mobile) */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {countries.map((c) => {
              const isActive = selectedCountry === c.code;
              return (
                <button
                  key={c.code}
                  id={`filter-country-${c.code}`}
                  onClick={() => setSelectedCountry(c.code)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/25 border border-pink-400/50'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-white/10'
                  }`}
                >
                  <span className="text-base">{c.flag}</span>
                  <span>{language === 'id' ? c.labelId : c.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  id={`filter-cat-${cat.key}`}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-violet-600 text-white shadow-sm border border-violet-400/40'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-white/5'
                  }`}
                >
                  {language === 'id' ? cat.labelId : cat.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Streamers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStreamers.map((streamer) => (
            <div
              key={streamer.id}
              id={`streamer-card-${streamer.id}`}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
            >
              {/* Media Card Aspect */}
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
                <img
                  src={streamer.coverImage}
                  alt={`${streamer.name} - ${streamer.country}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Gradient Shadows */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/60 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                  {/* Live Status */}
                  <div className="flex items-center gap-1.5 bg-red-600/90 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>LIVE</span>
                  </div>

                  {/* Viewer Count */}
                  <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-white/10">
                    <Eye className="w-3 h-3 text-pink-400" />
                    <span>{(streamer.viewers / 1000).toFixed(1)}k</span>
                  </div>
                </div>

                {/* Level & Location Badge (Middle Left) */}
                <div className="absolute bottom-16 left-3 z-10 flex items-center gap-2">
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow">
                    Lv.{streamer.level}
                  </span>
                  <span className="bg-black/60 backdrop-blur-sm text-slate-200 text-[11px] font-medium px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                    <span>{streamer.flag}</span>
                    <span>{streamer.city}</span>
                  </span>
                </div>

                {/* Streamer Name & Age (Bottom Inside Image) */}
                <div className="absolute bottom-3 inset-x-3 z-10">
                  <div className="flex items-center gap-1 text-white font-bold text-base leading-tight font-['Outfit']">
                    <span>{streamer.name}</span>
                    <span className="text-slate-400 font-normal text-xs">({streamer.age})</span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                    {language === 'id' ? streamer.bioId : streamer.bioEn}
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer: Tags & Action Button */}
              <div className="p-3.5 bg-slate-900/95 border-t border-white/5 space-y-2.5">
                {/* Tag Pills */}
                <div className="flex flex-wrap gap-1">
                  {streamer.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-white/5 text-slate-300 px-1.5 py-0.5 rounded border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Interactive Watch Button */}
                <button
                  id={`btn-watch-${streamer.id}`}
                  onClick={() => onSelectStreamer(streamer)}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-400 hover:to-violet-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-pink-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{t.watchLive}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
