/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, Streamer } from './types';
import { STREAMERS_DATA } from './data/streamers';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickFeatures } from './components/QuickFeatures';
import { LiveStreamersShowcase } from './components/LiveStreamersShowcase';
import { ReferralGenerator } from './components/ReferralGenerator';
import { DownloadSection } from './components/DownloadSection';
import { InstallTutorial } from './components/InstallTutorial';
import { InstallGuideModal } from './components/InstallGuideModal';
import { LiveRoomModal } from './components/LiveRoomModal';
import { Testimonials } from './components/Testimonials';
import { SeoKeywordsArticle } from './components/SeoKeywordsArticle';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { Download, Sparkles, Gift } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('id');
  const [activeStreamer, setActiveStreamer] = useState<Streamer | null>(null);
  const [iosModalOpen, setIosModalOpen] = useState(false);
  const [referrerCode, setReferrerCode] = useState<string | null>(null);

  // Check URL parameters for lang or referral code
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'en' || urlLang === 'id') {
        setLanguage(urlLang);
      }
      const refParam = params.get('ref');
      if (refParam) {
        setReferrerCode(refParam);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleOpenDownload = () => {
    const downloadSec = document.getElementById('download');
    if (downloadSec) {
      downloadSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLiveDemo = () => {
    // Open the featured Korean streamer Min-ji by default
    setActiveStreamer(STREAMERS_DATA[1] || STREAMERS_DATA[0]);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col selection:bg-pink-500 selection:text-white">
      
      {/* Referral Welcome Banner (Shown when arriving via referral link) */}
      {referrerCode && (
        <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-violet-600 px-4 py-2 text-center text-xs font-bold text-white flex items-center justify-center gap-2 shadow-md">
          <Gift className="w-4 h-4 animate-bounce" />
          <span>
            {language === 'id'
              ? `Selamat Datang! Anda diundang oleh VIP [${referrerCode}]. Dapatkan bonus 10.000 Koin Emas gratis saat memasang APK!`
              : `Welcome! You've been invited by VIP [${referrerCode}]. Claim your 10,000 Free Gold Coins bonus upon APK install!`}
          </span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        language={language}
        onToggleLanguage={setLanguage}
        onOpenDownload={handleOpenDownload}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          language={language}
          onOpenDownload={handleOpenDownload}
          onOpenIosModal={() => setIosModalOpen(true)}
          onOpenLiveDemo={handleOpenLiveDemo}
        />

        {/* Quick Value Props */}
        <QuickFeatures language={language} />

        {/* Streamers Live Showcase */}
        <LiveStreamersShowcase
          language={language}
          onSelectStreamer={(streamer) => setActiveStreamer(streamer)}
        />

        {/* Free Referral Link Generator */}
        <ReferralGenerator language={language} />

        {/* Download APK & iOS Section */}
        <DownloadSection
          language={language}
          onOpenIosModal={() => setIosModalOpen(true)}
        />

        {/* Step by Step Install Tutorial */}
        <InstallTutorial language={language} />

        {/* User Reviews & Social Proof */}
        <Testimonials language={language} />

        {/* SEO Keywords Cloud & Ranking Article */}
        <SeoKeywordsArticle language={language} />

        {/* Frequently Asked Questions */}
        <FaqSection language={language} />
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onToggleLanguage={setLanguage}
        onOpenDownload={handleOpenDownload}
      />

      {/* Interactive Live Stream Modal */}
      <LiveRoomModal
        streamer={activeStreamer}
        language={language}
        onClose={() => setActiveStreamer(null)}
        onOpenDownload={() => {
          setActiveStreamer(null);
          handleOpenDownload();
        }}
      />

      {/* iOS Installation Instructions Modal */}
      <InstallGuideModal
        isOpen={iosModalOpen}
        language={language}
        onClose={() => setIosModalOpen(false)}
      />

      {/* Sticky Mobile Floating Download Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-slate-950/90 backdrop-blur-lg border-t border-white/10 flex items-center gap-3">
        <div className="flex-1 text-left">
          <div className="text-xs font-bold text-white flex items-center gap-1 font-['Outfit']">
            <span>HOT51 APK v5.8.2</span>
            <span className="text-emerald-400 font-normal text-[10px]">● Gratis</span>
          </div>
          <div className="text-[10px] text-pink-300">
            {language === 'id' ? 'Host Cantik 24 Jam • 48.6 MB' : '24/7 Global Hosts • 48.6 MB'}
          </div>
        </div>

        <button
          onClick={handleOpenDownload}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 text-white text-xs font-bold shadow-lg shadow-pink-500/30 flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{language === 'id' ? 'Download APK' : 'Download APK'}</span>
        </button>
      </div>

    </div>
  );
}
