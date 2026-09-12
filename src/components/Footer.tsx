import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Sparkles, Shield, Heart, Globe, ArrowUp } from 'lucide-react';

interface FooterProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onOpenDownload: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onToggleLanguage,
  onOpenDownload,
}) => {
  const t = TRANSLATIONS[language].footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-['Outfit']">
                HOT<span className="text-pink-400">51</span> OFFICIAL
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {t.disclaimer}
            </p>

            <div className="flex items-center gap-3">
              <span className="bg-red-500/10 border border-red-500/30 text-red-400 font-extrabold text-xs px-2.5 py-1 rounded-lg">
                🔞 18+ ONLY
              </span>
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold text-xs px-2.5 py-1 rounded-lg">
                🛡️ SSL 256-Bit Encrypted
              </span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {t.quickLinks}
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#streamers" className="hover:text-pink-400 transition-colors">
                  {language === 'id' ? 'Host Cewek Mancanegara' : 'Global Female Broadcasters'}
                </a>
              </li>
              <li>
                <a href="#referral" className="hover:text-pink-400 transition-colors">
                  {language === 'id' ? 'Generator Link Referral Gratis' : 'Free Referral Link Tool'}
                </a>
              </li>
              <li>
                <a href="#download" className="hover:text-pink-400 transition-colors">
                  {language === 'id' ? 'Download APK Android v5.8.2' : 'Download Android APK v5.8.2'}
                </a>
              </li>
              <li>
                <a href="#tutorial" className="hover:text-pink-400 transition-colors">
                  {language === 'id' ? 'Panduan Install di iPhone & Android' : 'Installation Guide'}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-pink-400 transition-colors">
                  {language === 'id' ? 'Tanya Jawab & Keamanan' : 'FAQ & Safety'}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Hosting (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              {t.legal}
            </div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">
                  {t.privacy}
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">
                  {t.terms}
                </a>
              </li>
              <li>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white">
                  {t.dmca}
                </a>
              </li>
              <li>
                <span className="text-slate-500">{t.contact}</span>
              </li>
            </ul>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                <span>{t.netlifyReady}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            {t.copyright}
          </div>

          <div className="flex items-center gap-4">
            {/* Language switch */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleLanguage('id')}
                className={`transition-colors ${language === 'id' ? 'text-pink-400 font-bold' : 'hover:text-slate-300'}`}
              >
                🇮🇩 Bahasa Indonesia
              </button>
              <span>•</span>
              <button
                onClick={() => onToggleLanguage('en')}
                className={`transition-colors ${language === 'en' ? 'text-pink-400 font-bold' : 'hover:text-slate-300'}`}
              >
                🇬🇧 English
              </button>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
