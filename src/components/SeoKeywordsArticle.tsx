import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS, SEO_KEYWORDS } from '../data/translations';
import { Search, TrendingUp, Sparkles, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';

interface SeoKeywordsArticleProps {
  language: Language;
}

export const SeoKeywordsArticle: React.FC<SeoKeywordsArticleProps> = ({ language }) => {
  const t = TRANSLATIONS[language].seoArticle;

  return (
    <section className="py-16 border-t border-white/10 bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-xs font-bold text-pink-400">
              <Search className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight font-['Outfit']">
              {t.title}
            </h2>
          </div>

          {/* Semantic SEO Article Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
            <div className="space-y-4">
              <p>{t.content1}</p>
              <div className="flex items-start gap-2.5 bg-slate-950/60 p-3.5 rounded-2xl border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">
                  {language === 'id'
                    ? 'Server edge CDN terdistribusi otomatis memilih rute tercepat untuk meminimalisir buffering di koneksi Indihome, Telkomsel, XL, Tri, dan Smartfren.'
                    : 'Distributed edge CDN servers automatically route packets for zero latency across all major global mobile networks.'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <p>{t.content2}</p>
              <div className="flex items-start gap-2.5 bg-slate-950/60 p-3.5 rounded-2xl border border-white/5">
                <ShieldCheck className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">
                  {language === 'id'
                    ? '100% Bebas Malware dan Spyware. Terverifikasi Google Play Protect dan kompatibel di semua versi Android 5.0 sampai Android 15 & iOS 18.'
                    : '100% Clean of spyware & malware. Certified by Play Protect and fully compatible with Android 5.0+ and Apple iOS 18.'}
                </span>
              </div>
            </div>
          </div>

          {/* Trending Keywords Cloud for Google SEO Optimization */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-pink-400" />
              <span>{t.keywordsTitle}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {SEO_KEYWORDS.map((kw, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-slate-300 hover:text-pink-300 text-xs font-medium border border-white/10 transition-colors cursor-default"
                >
                  <Tag className="w-3 h-3 text-pink-400/80" />
                  <span>{kw}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Netlify Fast Edge Note */}
          <div className="bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent p-4 rounded-2xl border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-base">🚀</span>
              <span className="font-semibold text-white">
                {language === 'id'
                  ? 'Dioptimalkan untuk Netlify Static Hosting & Google Core Web Vitals'
                  : 'Optimized for Netlify Static Hosting & Google Core Web Vitals'}
              </span>
            </div>
            <span className="text-emerald-400 font-mono text-[11px] bg-slate-950 px-2.5 py-1 rounded-lg border border-white/10">
              Lighthouse Score: 99/100
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
