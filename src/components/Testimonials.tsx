import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS, REVIEWS_DATA } from '../data/translations';
import { Star, ThumbsUp, CheckCircle, ShieldCheck } from 'lucide-react';

interface TestimonialsProps {
  language: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ language }) => {
  const t = TRANSLATIONS[language].reviewsSection;

  return (
    <section id="reviews" className="py-20 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {t.subtitle}
          </p>

          {/* Rating Summary Bar */}
          <div className="inline-flex items-center gap-4 bg-slate-900/90 border border-white/10 px-6 py-3 rounded-2xl shadow-xl mt-4">
            <div className="text-3xl font-black text-amber-400 font-['Outfit']">
              {t.totalScore}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {t.basedOn}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-slate-900/80 border border-white/10 hover:border-pink-500/40 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all hover:-translate-y-1 shadow-lg"
            >
              <div className="space-y-3">
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        <span>{rev.name}</span>
                        <span>{rev.flag}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {rev.country} • {rev.device}
                      </span>
                    </div>
                  </div>
                  <CheckCircle className="w-4 h-4 text-emerald-400" title="Verified User" />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  &ldquo;{language === 'id' ? rev.textId : rev.textEn}&rdquo;
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-white/5">
                <span>{rev.date}</span>
                <div className="flex items-center gap-1 text-slate-400">
                  <ThumbsUp className="w-3 h-3 text-pink-400" />
                  <span>{rev.likesCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
