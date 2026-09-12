import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Smartphone, Apple, Download, ShieldCheck, Share, PlusSquare, Sparkles, CheckCircle } from 'lucide-react';

interface InstallTutorialProps {
  language: Language;
}

export const InstallTutorial: React.FC<InstallTutorialProps> = ({ language }) => {
  const t = TRANSLATIONS[language].tutorialSection;
  const [activeTab, setActiveTab] = useState<'android' | 'ios'>('android');

  return (
    <section id="tutorial" className="py-20 border-t border-white/10 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-xs font-bold text-pink-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {t.subtitle}
          </p>
        </div>

        {/* Device Switcher Tab */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-800/80 p-1.5 rounded-2xl border border-white/10 flex items-center gap-2 shadow-inner">
            <button
              id="tutorial-tab-android"
              onClick={() => setActiveTab('android')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'android'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>{t.tabAndroid}</span>
            </button>
            <button
              id="tutorial-tab-ios"
              onClick={() => setActiveTab('ios')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'ios'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Apple className="w-4 h-4" />
              <span>{t.tabIos}</span>
            </button>
          </div>
        </div>

        {/* 3 Step Cards */}
        {activeTab === 'android' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 space-y-4 hover:border-pink-500/40 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-black text-lg font-['Outfit']">
                01
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                  <Download className="w-4 h-4 text-pink-400" />
                  <span>{t.androidStep1Title}</span>
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t.androidStep1Desc}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 space-y-4 hover:border-pink-500/40 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center font-black text-lg font-['Outfit']">
                02
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-violet-400" />
                  <span>{t.androidStep2Title}</span>
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t.androidStep2Desc}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 space-y-4 hover:border-pink-500/40 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-lg font-['Outfit']">
                03
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{t.androidStep3Title}</span>
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t.androidStep3Desc}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* iOS Step 1 */}
            <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 space-y-4 hover:border-pink-500/40 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-black text-lg font-['Outfit']">
                01
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                  <Apple className="w-4 h-4 text-pink-400" />
                  <span>{t.iosStep1Title}</span>
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t.iosStep1Desc}
                </p>
              </div>
            </div>

            {/* iOS Step 2 */}
            <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 space-y-4 hover:border-pink-500/40 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black text-lg font-['Outfit']">
                02
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                  <Share className="w-4 h-4 text-cyan-400" />
                  <span>{t.iosStep2Title}</span>
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t.iosStep2Desc}
                </p>
              </div>
            </div>

            {/* iOS Step 3 */}
            <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-6 space-y-4 hover:border-pink-500/40 transition-colors shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-lg font-['Outfit']">
                03
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
                  <PlusSquare className="w-4 h-4 text-amber-400" />
                  <span>{t.iosStep3Title}</span>
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {t.iosStep3Desc}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
