import React from 'react';
import { Globe2, Video, Lock, Gift, Zap, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface QuickFeaturesProps {
  language: Language;
}

export const QuickFeatures: React.FC<QuickFeaturesProps> = ({ language }) => {
  const t = TRANSLATIONS[language].quickFeatures;

  const features = [
    {
      icon: <Globe2 className="w-6 h-6 text-cyan-400" />,
      title: t.noVpn,
      desc: t.noVpnDesc,
      badge: '100% Direct',
      bgGlow: 'from-cyan-500/10 to-blue-500/5',
      borderColor: 'group-hover:border-cyan-500/40',
    },
    {
      icon: <Video className="w-6 h-6 text-pink-400" />,
      title: t.hdStream,
      desc: t.hdStreamDesc,
      badge: 'H.265 Ultra HD',
      bgGlow: 'from-pink-500/10 to-rose-500/5',
      borderColor: 'group-hover:border-pink-500/40',
    },
    {
      icon: <Lock className="w-6 h-6 text-violet-400" />,
      title: t.privateCall,
      desc: t.privateCallDesc,
      badge: 'Encrypted 1-on-1',
      bgGlow: 'from-violet-500/10 to-purple-500/5',
      borderColor: 'group-hover:border-violet-500/40',
    },
    {
      icon: <Gift className="w-6 h-6 text-amber-400" />,
      title: t.freeCoins,
      desc: t.freeCoinsDesc,
      badge: 'Free Referral',
      bgGlow: 'from-amber-500/10 to-orange-500/5',
      borderColor: 'group-hover:border-amber-500/40',
    },
  ];

  return (
    <section id="features" className="py-14 border-y border-white/10 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl p-6 bg-gradient-to-b ${item.bgGlow} bg-slate-900/80 border border-white/10 ${item.borderColor} transition-all duration-300 hover:-translate-y-1 shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-slate-300 border border-white/10">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-['Outfit'] group-hover:text-pink-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
