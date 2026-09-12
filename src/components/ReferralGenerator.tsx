import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { REFERRAL_TIERS } from '../data/streamers';
import { APP_CONFIG } from '../config/appConfig';
import { Gift, Copy, Check, Share2, Sparkles, QrCode, Award, ArrowRight, Shuffle, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReferralGeneratorProps {
  language: Language;
}

export const ReferralGenerator: React.FC<ReferralGeneratorProps> = ({ language }) => {
  const t = TRANSLATIONS[language].referralSection;
  const [customId, setCustomId] = useState('NUPPRQ');
  const [copied, setCopied] = useState(false);
  const [friendsCount, setFriendsCount] = useState(5);
  const [showQr, setShowQr] = useState(false);

  // Generate Referral URL with user request destination: https://hot51.fund/?code=NUPPRQ
  const cleanId = customId.trim() || 'NUPPRQ';
  const referralUrl = cleanId === 'NUPPRQ' 
    ? APP_CONFIG.targetUrl 
    : `${APP_CONFIG.targetUrl}&ref=${encodeURIComponent(cleanId)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF2E93', '#00F0FF', '#FFD700'],
      });
    } catch (e) {}

    setTimeout(() => setCopied(false), 3000);
  };

  const handleRandomId = () => {
    const prefixes = ['SULTAN', 'STAR', 'VIP', 'BOS', 'KING', 'LUCKY', 'LIVE'];
    const randomNum = Math.floor(100 + Math.random() * 900);
    const randomPick = `${prefixes[Math.floor(Math.random() * prefixes.length)]}${randomNum}`;
    setCustomId(randomPick);
  };

  // WhatsApp Viral Share
  const shareToWhatsApp = () => {
    const text = `${t.shareTemplate} ${referralUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  // Telegram Share
  const shareToTelegram = () => {
    const text = `${t.shareTemplate}`;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  // Facebook Share
  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralUrl)}`, '_blank');
  };

  // Dynamic calculation for calculator
  const calculatedCoins = friendsCount * 1200;
  const vipRank =
    friendsCount >= 25
      ? 'VIP Sultan Diamond 👑'
      : friendsCount >= 10
      ? 'VIP Gold Elite ⭐'
      : friendsCount >= 5
      ? 'VIP Silver Star 🥈'
      : 'VIP Bronze Member 🥉';

  return (
    <section id="referral" className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-900/60 border-y border-white/10">
      
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-pink-600/10 blur-[150px] -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/15 to-pink-500/15 border border-amber-500/30 text-xs font-bold text-amber-300">
            <Gift className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Referral Link Generator (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
            
            {/* Input Row */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                {t.inputLabel}
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    id="referral-custom-id"
                    value={customId}
                    onChange={(e) => setCustomId(e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, ''))}
                    placeholder={t.placeholder}
                    maxLength={15}
                    className="w-full bg-slate-950 border border-white/20 focus:border-pink-500 rounded-2xl px-4 py-3.5 text-base font-bold text-white uppercase placeholder:text-slate-600 focus:outline-none tracking-wider"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">
                    ID
                  </div>
                </div>

                <button
                  onClick={handleRandomId}
                  className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold border border-white/10 flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Generate Acak"
                >
                  <Shuffle className="w-4 h-4 text-pink-400" />
                  <span className="hidden sm:inline">{t.randomBtn}</span>
                </button>
              </div>
            </div>

            {/* Generated Link Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>{t.yourLink}</span>
                <span className="text-pink-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Bonus +1.000 Koin Aktif
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 bg-slate-950 p-2 rounded-2xl border border-pink-500/30">
                <div className="flex-1 px-3 py-2 text-xs sm:text-sm font-mono text-pink-300 truncate select-all flex items-center">
                  {referralUrl}
                </div>
                <button
                  id="btn-copy-referral"
                  onClick={handleCopy}
                  className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                    copied
                      ? 'bg-emerald-600 text-white shadow-emerald-500/25'
                      : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white shadow-pink-500/30'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{t.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{t.copyBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Instant Social Share Buttons */}
            <div className="space-y-2.5 pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {language === 'id' ? 'Bagikan Langsung Ke:' : 'Direct Share to Social:'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  onClick={shareToWhatsApp}
                  className="py-3 px-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={shareToTelegram}
                  className="py-3 px-3 rounded-xl bg-sky-600/90 hover:bg-sky-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>✈️</span>
                  <span>Telegram</span>
                </button>
                <button
                  onClick={shareToFacebook}
                  className="py-3 px-3 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>📘</span>
                  <span>Facebook</span>
                </button>
                <button
                  onClick={() => setShowQr(!showQr)}
                  className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-white/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-pink-400" />
                  <span>QR Code</span>
                </button>
              </div>
            </div>

            {/* QR Code Visualizer Dropdown */}
            {showQr && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in duration-200">
                <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
                  {/* Styled simulated QR vector */}
                  <div className="w-full h-full border-4 border-black p-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-6 h-6 bg-black" />
                      <div className="w-6 h-6 bg-black" />
                    </div>
                    <div className="text-[8px] font-black text-center text-black">HOT51</div>
                    <div className="flex justify-between">
                      <div className="w-6 h-6 bg-black" />
                      <div className="w-3 h-3 bg-pink-600" />
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-300 space-y-1 text-center sm:text-left">
                  <div className="font-bold text-white">Scan dengan Kamera HP untuk Unduh</div>
                  <p className="text-slate-400">
                    Arahkan kamera smartphone ke QR Code untuk langsung membuka link download dengan bonus ID referral <strong>{cleanId}</strong>.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Live Referral Rewards Calculator (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white font-['Outfit']">
                {t.calculatorTitle}
              </h3>
            </div>

            {/* Interactive Friends Slider */}
            <div className="space-y-3 bg-slate-950/80 p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                <span>{language === 'id' ? 'Jumlah Teman yang Diundang:' : 'Friends Invited:'}</span>
                <span className="text-base text-pink-400 font-extrabold">{friendsCount} Teman</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={friendsCount}
                onChange={(e) => setFriendsCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                <span>1 Teman</span>
                <span>10 Teman</span>
                <span>25 Teman</span>
                <span>50 Teman</span>
              </div>
            </div>

            {/* Potential Rewards Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-violet-500/10 border border-amber-500/30 space-y-3">
              <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                {language === 'id' ? 'Estimasi Bonus Diperoleh:' : 'Estimated Rewards Earned:'}
              </div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-['Outfit'] flex items-baseline gap-2">
                <span>+{calculatedCoins.toLocaleString()}</span>
                <span className="text-xs font-bold text-slate-300 uppercase">Koin Emas</span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Award className="w-4 h-4 text-pink-400" />
                <span className="text-xs font-bold text-white">{vipRank}</span>
              </div>
            </div>

            {/* Referral Tier Progression List */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {t.tiersTitle}
              </div>
              <div className="space-y-2 text-xs">
                {REFERRAL_TIERS.map((tier, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                      friendsCount >= tier.friendsRequired
                        ? 'bg-pink-500/15 border-pink-500/40 text-white'
                        : 'bg-white/5 border-white/5 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-pink-400">{tier.friendsRequired}x</span>
                      <span>{tier.vipStatus}</span>
                    </div>
                    <span className="font-bold text-amber-400">
                      +{tier.coinsReward.toLocaleString()} Koin
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
