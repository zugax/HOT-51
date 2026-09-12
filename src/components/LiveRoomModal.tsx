import React, { useState, useEffect, useRef } from 'react';
import { Streamer, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { X, Heart, Send, Gift, Eye, Award, Sparkles, Download, Check, Volume2, VolumeX, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LiveRoomModalProps {
  streamer: Streamer | null;
  language: Language;
  onClose: () => void;
  onOpenDownload: () => void;
}

interface ChatMessage {
  id: number;
  user: string;
  flag: string;
  text: string;
  isGift?: boolean;
  giftName?: string;
  vip?: boolean;
}

export const LiveRoomModal: React.FC<LiveRoomModalProps> = ({
  streamer,
  language,
  onClose,
  onOpenDownload,
}) => {
  if (!streamer) return null;

  const t = TRANSLATIONS[language].liveModal;
  const [coins, setCoins] = useState(2500);
  const [likes, setLikes] = useState(streamer.likes);
  const [isFollowing, setIsFollowing] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [showGiftSelector, setShowGiftSelector] = useState(false);
  const [latestGiftAlert, setLatestGiftAlert] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, user: 'Bima_Sultan', flag: '🇮🇩', text: 'Halo host cantik! Senang banget bisa nonton malam ini 🔥', vip: true },
    { id: 2, user: 'Kenji_JP', flag: '🇯🇵', text: 'Konbanwa! You are so cute today! ✨' },
    { id: 3, user: 'Alex_LA', flag: '🇺🇸', text: 'Greetings from California! Great music vibe 🎵' },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Periodic random chat simulator
  useEffect(() => {
    const randomComments = [
      { user: 'Rahmat_Bandung', flag: '🇮🇩', text: 'Goyangannya asik banget kak! Semangat' },
      { user: 'Sora_Tokyo', flag: '🇯🇵', text: 'Kawaii desu ne! 💖' },
      { user: 'MinHo_Seoul', flag: '🇰🇷', text: '대박! 너무 예뻐요 (Awesome & Pretty!)' },
      { user: 'Somchai_BKK', flag: '🇹🇭', text: 'Hello from Bangkok! Su su na ka~' },
      { user: 'Fajar_Medan', flag: '🇮🇩', text: 'Kirim gift roket dong para sultan!! 🚀' },
    ];

    const interval = setInterval(() => {
      const pick = randomComments[Math.floor(Math.random() * randomComments.length)];
      setChatMessages((prev) => [
        ...prev.slice(-15),
        { id: Date.now(), user: pick.user, flag: pick.flag, text: pick.text },
      ]);
      setLikes((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: language === 'id' ? 'Saya (Pengunjung)' : 'Me (Guest)',
        flag: '🇮🇩',
        text: inputMessage,
        vip: false,
      },
    ]);
    setInputMessage('');

    // Simulated host reply after 1.5s
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          user: streamer.name,
          flag: streamer.flag,
          text: language === 'id' ? 'Makasih chat-nya sayang! Jangan lupa ikuti dan download APK ya 💕' : 'Thank you so much darling! Don\'t forget to follow and download the APK 💕',
          vip: true,
        },
      ]);
    }, 1500);
  };

  const handleLikeStream = () => {
    setLikes((prev) => prev + 1);
    try {
      confetti({
        particleCount: 15,
        spread: 30,
        origin: { x: 0.85, y: 0.75 },
        colors: ['#FF2E93', '#FF0055', '#FFF'],
      });
    } catch (e) {}
  };

  const handleSendGift = (giftName: string, cost: number, icon: string) => {
    if (coins < cost) {
      alert(language === 'id' ? 'Koin Anda tidak cukup! Klik "Ambil +500 Koin" untuk klaim gratis.' : 'Not enough coins! Click "Claim +500 Coins" to get free balance.');
      return;
    }

    setCoins((prev) => prev - cost);
    setLatestGiftAlert(`${streamer.name} menerima ${icon} ${giftName}!`);
    setShowGiftSelector(false);

    // Big confetti celebration
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF2E93', '#00F0FF', '#FFF'],
      });
    } catch (e) {}

    // Add gift alert to chat
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: language === 'id' ? 'Kamu' : 'You',
        flag: '⭐',
        text: `mengirimkan hadiah ${giftName} ${icon} (${cost} Koin)`,
        isGift: true,
        giftName,
        vip: true,
      },
    ]);

    // Clear banner after 3 seconds
    setTimeout(() => setLatestGiftAlert(null), 3500);
  };

  const claimBonusCoins = () => {
    setCoins((prev) => prev + 500);
    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.3 },
        colors: ['#FFD700', '#FFA500'],
      });
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[820px] rounded-3xl overflow-hidden bg-slate-950 border border-white/20 shadow-2xl flex flex-col md:flex-row">
        
        {/* Left / Top: Simulated Video Live Player */}
        <div className="relative flex-1 bg-slate-900 overflow-hidden flex flex-col justify-between">
          
          {/* Backdrop Video Simulation Streamer */}
          <img
            src={streamer.coverImage}
            alt={streamer.name}
            className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/70 pointer-events-none" />

          {/* Top Player Controls Header */}
          <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between">
            {/* Host Profile Capsule */}
            <div className="flex items-center gap-2.5 bg-black/60 backdrop-blur-md p-1.5 pr-3 rounded-full border border-white/10">
              <img
                src={streamer.avatar}
                alt={streamer.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-pink-500"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xs sm:text-sm font-bold text-white leading-tight">
                    {streamer.name}
                  </span>
                  <span>{streamer.flag}</span>
                </div>
                <span className="text-[10px] text-pink-300">
                  {streamer.city} • Lv.{streamer.level}
                </span>
              </div>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`ml-1 text-[11px] font-bold px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  isFollowing
                    ? 'bg-slate-700 text-slate-300'
                    : 'bg-pink-500 hover:bg-pink-400 text-white shadow-md'
                }`}
              >
                {isFollowing ? t.followed : t.follow}
              </button>
            </div>

            {/* Right Header Status: Live & Close */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>{t.liveNow}</span>
                <span className="text-white/80 text-[11px]">{(streamer.viewers / 1000).toFixed(1)}k</span>
              </div>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 border border-white/10"
                title="Toggle Mute"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/60 text-white hover:bg-white/20 transition-colors border border-white/10 cursor-pointer"
                title="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Gift Announcement Alert Banner */}
          {latestGiftAlert && (
            <div className="relative z-20 mx-4 animate-in zoom-in-95 duration-300">
              <div className="bg-gradient-to-r from-amber-500/90 via-pink-600/90 to-violet-600/90 backdrop-blur-md p-3 rounded-2xl border-2 border-amber-300 text-center shadow-2xl">
                <div className="text-xs text-amber-200 font-semibold tracking-wider uppercase">
                  🎉 SULTAN GIFT SHOWER 🎉
                </div>
                <div className="text-sm font-extrabold text-white">
                  {latestGiftAlert}
                </div>
              </div>
            </div>
          )}

          {/* PK Battle Mini Status */}
          <div className="relative z-10 px-4">
            <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center justify-between text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500 animate-bounce" />
                <span className="font-semibold">{t.pkWinRate} 89.4%</span>
              </div>
              <span className="text-[11px] text-amber-400 font-bold">TOP CONTRIBUTOR: VIP_SULTAN_ID</span>
            </div>
          </div>

          {/* Bottom Video Floating Action Quick Bar */}
          <div className="relative z-10 p-4 flex items-center justify-between gap-2">
            <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs text-slate-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Full HD 1080p • 60 FPS</span>
            </div>

            <button
              onClick={handleLikeStream}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold shadow-lg transition-transform active:scale-90 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white animate-pulse" />
              <span>{(likes / 1000).toFixed(1)}k</span>
            </button>
          </div>

        </div>

        {/* Right / Bottom: Live Chat Feed & Virtual Gift Center */}
        <div className="w-full md:w-[360px] bg-slate-900/95 border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between">
          
          {/* Chat Header & Coin Wallet */}
          <div className="p-3.5 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-white tracking-wide">
                Live Chat Room
              </span>
            </div>
            {/* Coins Balance Chip */}
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full">
              <span className="text-amber-400 text-xs">🪙</span>
              <span className="text-amber-300 text-xs font-extrabold">{coins.toLocaleString()}</span>
              <button
                onClick={claimBonusCoins}
                className="text-[10px] bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-1.5 py-0.5 rounded ml-1 transition-colors cursor-pointer"
                title="Klaim Koin Gratis"
              >
                +500
              </button>
            </div>
          </div>

          {/* Chat Messages Scrolling List */}
          <div
            ref={chatContainerRef}
            className="flex-1 p-3.5 overflow-y-auto space-y-2.5 max-h-[300px] md:max-h-none text-xs"
          >
            {/* Official System Notice */}
            <div className="bg-pink-500/10 border border-pink-500/20 p-2.5 rounded-xl text-[11px] text-pink-300 leading-snug">
              ℹ️ {t.chatWelcome}
            </div>

            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-xl transition-all ${
                  msg.isGift
                    ? 'bg-amber-500/15 border border-amber-500/30 text-amber-200'
                    : 'bg-white/5 border border-white/5 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs">{msg.flag}</span>
                  <span
                    className={`font-bold text-[11px] ${
                      msg.vip ? 'text-pink-400' : 'text-slate-300'
                    }`}
                  >
                    {msg.user}
                  </span>
                  {msg.vip && (
                    <span className="bg-pink-500/20 text-pink-300 text-[9px] font-bold px-1 rounded">
                      VIP
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-100 break-words">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Gift Selector Drawer (when opened) */}
          {showGiftSelector && (
            <div className="p-3 bg-slate-950 border-t border-white/10 grid grid-cols-4 gap-2 animate-in slide-in-from-bottom-2">
              <button
                onClick={() => handleSendGift('Mawar Merah', 10, '🌹')}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-white/10 flex flex-col items-center gap-1 cursor-pointer group"
              >
                <span className="text-xl group-hover:scale-125 transition-transform">🌹</span>
                <span className="text-[10px] font-bold text-white">Mawar</span>
                <span className="text-[9px] text-amber-400 font-semibold">10 Koin</span>
              </button>
              <button
                onClick={() => handleSendGift('Cincin Berlian', 200, '💍')}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-white/10 flex flex-col items-center gap-1 cursor-pointer group"
              >
                <span className="text-xl group-hover:scale-125 transition-transform">💍</span>
                <span className="text-[10px] font-bold text-white">Cincin</span>
                <span className="text-[9px] text-amber-400 font-semibold">200 Koin</span>
              </button>
              <button
                onClick={() => handleSendGift('Mobil Sport', 1000, '🏎️')}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-white/10 flex flex-col items-center gap-1 cursor-pointer group"
              >
                <span className="text-xl group-hover:scale-125 transition-transform">🏎️</span>
                <span className="text-[10px] font-bold text-white">Supercar</span>
                <span className="text-[9px] text-amber-400 font-semibold">1.000 Koin</span>
              </button>
              <button
                onClick={() => handleSendGift('Roket Galaksi', 2000, '🚀')}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-white/10 flex flex-col items-center gap-1 cursor-pointer group"
              >
                <span className="text-xl group-hover:scale-125 transition-transform">🚀</span>
                <span className="text-[10px] font-bold text-white">Roket</span>
                <span className="text-[9px] text-amber-400 font-semibold">2.000 Koin</span>
              </button>
            </div>
          )}

          {/* Chat Input & Bottom Controls */}
          <div className="p-3 border-t border-white/10 bg-slate-950 space-y-2">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowGiftSelector(!showGiftSelector)}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  showGiftSelector
                    ? 'bg-amber-500 text-black border-amber-400'
                    : 'bg-white/10 text-amber-400 hover:bg-white/15 border-white/10'
                }`}
                title="Pilih Gift Hadiah"
              >
                <Gift className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t.typeMessage}
                className="flex-1 bg-white/5 border border-white/10 focus:border-pink-500 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none"
              />

              <button
                type="submit"
                className="p-2 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 text-white hover:opacity-90 transition-opacity cursor-pointer"
                title="Kirim Pesan"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* In-Modal Download Hook */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
              <span>Mau video call privat 1-on-1?</span>
              <button
                onClick={() => {
                  onClose();
                  onOpenDownload();
                }}
                className="text-pink-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh HOT51 APK</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
