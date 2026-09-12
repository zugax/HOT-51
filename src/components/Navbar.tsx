import React, { useState } from 'react';
import { Download, Globe, Menu, X, Sparkles, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  onOpenDownload,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language].nav;

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0F17]/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          id="navbar-logo"
          className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 flex items-center justify-center shadow-lg shadow-pink-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-2xl tracking-wider text-white font-['Outfit']">
                HOT<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400">51</span>
              </span>
              <span className="bg-pink-500/20 text-pink-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-pink-500/30">
                OFFICIAL
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium tracking-wide flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block"></span>
              HOT51 APK v5.8.2 Live
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            id="nav-link-streamers"
            onClick={() => scrollToSection('streamers')}
            className="hover:text-pink-400 transition-colors focus:outline-none cursor-pointer"
          >
            {t.streamers}
          </button>
          <button
            id="nav-link-features"
            onClick={() => scrollToSection('features')}
            className="hover:text-pink-400 transition-colors focus:outline-none cursor-pointer"
          >
            {t.features}
          </button>
          <button
            id="nav-link-referral"
            onClick={() => scrollToSection('referral')}
            className="hover:text-pink-400 transition-colors focus:outline-none cursor-pointer flex items-center gap-1 text-pink-300 font-semibold"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            {t.referral}
          </button>
          <button
            id="nav-link-tutorial"
            onClick={() => scrollToSection('tutorial')}
            className="hover:text-pink-400 transition-colors focus:outline-none cursor-pointer"
          >
            {t.tutorial}
          </button>
          <button
            id="nav-link-reviews"
            onClick={() => scrollToSection('reviews')}
            className="hover:text-pink-400 transition-colors focus:outline-none cursor-pointer"
          >
            {t.reviews}
          </button>
          <button
            id="nav-link-faq"
            onClick={() => scrollToSection('faq')}
            className="hover:text-pink-400 transition-colors focus:outline-none cursor-pointer"
          >
            {t.faq}
          </button>
        </nav>

        {/* Right Actions: Language Switcher & Download Button */}
        <div className="hidden sm:flex items-center gap-3.5">
          {/* Language Toggle Pill */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-full border border-white/10 text-xs font-semibold shadow-inner">
            <button
              id="lang-toggle-id"
              onClick={() => onToggleLanguage('id')}
              className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                language === 'id'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Bahasa Indonesia"
            >
              <span>🇮🇩</span>
              <span>ID</span>
            </button>
            <button
              id="lang-toggle-en"
              onClick={() => onToggleLanguage('en')}
              className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="English"
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
          </div>

          {/* Quick CTA Download Button */}
          <button
            id="navbar-download-btn"
            onClick={onOpenDownload}
            className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-violet-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            <span>{t.downloadBtn}</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 sm:hidden">
          {/* Mobile Language Switcher Mini */}
          <button
            id="mobile-lang-btn"
            onClick={() => onToggleLanguage(language === 'id' ? 'en' : 'id')}
            className="px-2 py-1 rounded-lg bg-slate-800 border border-white/10 text-xs font-bold text-white flex items-center gap-1"
          >
            <span>{language === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}</span>
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-800/80 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#0B0F17] px-4 py-6 space-y-4 animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-3 font-medium text-slate-300 text-sm">
            <button
              onClick={() => scrollToSection('streamers')}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/5 hover:text-pink-400"
            >
              {t.streamers}
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/5 hover:text-pink-400"
            >
              {t.features}
            </button>
            <button
              onClick={() => scrollToSection('referral')}
              className="text-left py-2 px-3 rounded-lg bg-pink-500/10 text-pink-400 font-semibold"
            >
              🎁 {t.referral}
            </button>
            <button
              onClick={() => scrollToSection('tutorial')}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/5 hover:text-pink-400"
            >
              {t.tutorial}
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/5 hover:text-pink-400"
            >
              {t.reviews}
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/5 hover:text-pink-400"
            >
              {t.faq}
            </button>
          </div>

          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownload();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 font-bold text-white shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>{t.downloadBtn} (48.6 MB)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
