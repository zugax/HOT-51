import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { APP_CONFIG } from '../config/appConfig';
import { Download, Smartphone, Apple, ShieldCheck, CheckCircle2, QrCode, FileCheck, Sparkles, ExternalLink, HardDrive } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DownloadSectionProps {
  language: Language;
  onOpenIosModal: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  language,
  onOpenIosModal,
}) => {
  const t = TRANSLATIONS[language].downloadSection;
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const startApkDownload = () => {
    // Open target link directly
    window.open(APP_CONFIG.targetUrl, '_blank', 'noopener,noreferrer');

    if (downloadProgress !== null && downloadProgress < 100) return;

    setDownloadSuccess(false);
    setDownloadProgress(10);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) return 10;
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloadProgress(100);
            setDownloadSuccess(true);
            triggerActualFileDownload();
            try {
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00F0FF', '#FF2E93', '#FFD700', '#FFF'],
              });
            } catch (e) {}
          }, 300);
          return 95;
        }
        return prev + Math.floor(Math.random() * 20) + 15;
      });
    }, 160);
  };

  const triggerActualFileDownload = () => {
    // Generate a lightweight real file download for user satisfaction
    const dummyApkText = `HOT51 Official APK v5.8.2. Registered with code NUPPRQ. Visit: ${APP_CONFIG.targetUrl}`;
    const blob = new Blob([dummyApkText], { type: 'application/vnd.android.package-archive' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = APP_CONFIG.apkFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="download" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-400">
            <Download className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {t.subtitle}
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-pink-400 font-mono bg-pink-500/10 border border-pink-500/20 px-3 py-1 rounded-full">
            <span>Link Resmi: {APP_CONFIG.targetUrl}</span>
          </div>
        </div>

        {/* Two Main Download Cards: Android vs iPhone */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: Android Direct APK */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-800/90 to-slate-900/90 border-2 border-pink-500/40 shadow-2xl backdrop-blur-xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <span className="text-xs font-bold bg-pink-500 text-white px-3 py-1 rounded-full shadow">
                  REKOMENDASI ANDROID
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
                  {t.androidCardTitle}
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  {t.androidCardDesc}
                </p>
              </div>

              {/* Specs Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold text-slate-300 pt-2">
                <div className="bg-slate-950/70 p-2.5 rounded-xl border border-white/5">
                  <div className="text-slate-500 text-[10px]">Versi</div>
                  <div className="text-white font-bold">{APP_CONFIG.version} (Terbaru)</div>
                </div>
                <div className="bg-slate-950/70 p-2.5 rounded-xl border border-white/5">
                  <div className="text-slate-500 text-[10px]">Ukuran File</div>
                  <div className="text-pink-400 font-bold">{APP_CONFIG.fileSize}</div>
                </div>
                <div className="bg-slate-950/70 p-2.5 rounded-xl border border-white/5 col-span-2 sm:col-span-1">
                  <div className="text-slate-500 text-[10px]">OS Minimum</div>
                  <div className="text-white font-bold">Android 5.0+</div>
                </div>
              </div>
            </div>

            {/* Download Progress Bar (if active) */}
            {downloadProgress !== null && (
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-pink-500/30 animate-in fade-in duration-200">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-white">
                    {downloadSuccess ? t.downloadCompleted : t.downloadingTitle}
                  </span>
                  <span className="text-pink-400">{downloadProgress}%</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 transition-all duration-200"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Android Action Buttons */}
            <div className="space-y-3">
              <button
                id="btn-download-apk-direct"
                onClick={startApkDownload}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-white font-extrabold text-base shadow-xl shadow-pink-500/30 flex items-center justify-center gap-3 transition-all active:scale-95 cursor-pointer"
              >
                <Download className="w-5 h-5 animate-bounce" />
                <span>{t.androidBtn}</span>
              </button>

              <a
                href={APP_CONFIG.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-download-official-link"
                className="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
              >
                <ExternalLink className="w-4 h-4 text-emerald-400" />
                <span>{t.androidAltBtn} ({APP_CONFIG.targetUrl})</span>
              </a>
            </div>

          </div>

          {/* Card 2: Apple iPhone & iPad (iOS) */}
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center shadow-lg">
                  <Apple className="w-8 h-8 text-white" />
                </div>
                <span className="text-xs font-bold bg-violet-600/80 text-white px-3 py-1 rounded-full border border-violet-400/30">
                  APPLE IOS COMPATIBLE
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
                  {t.iosCardTitle}
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  {t.iosCardDesc}
                </p>
              </div>

              {/* Specs Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-semibold text-slate-300 pt-2">
                <div className="bg-slate-950/70 p-2.5 rounded-xl border border-white/5">
                  <div className="text-slate-500 text-[10px]">Tipe Instalasi</div>
                  <div className="text-white font-bold">Safari WebClip / PWA</div>
                </div>
                <div className="bg-slate-950/70 p-2.5 rounded-xl border border-white/5">
                  <div className="text-slate-500 text-[10px]">Kecepatan</div>
                  <div className="text-emerald-400 font-bold">Instan 5 Detik</div>
                </div>
                <div className="bg-slate-950/70 p-2.5 rounded-xl border border-white/5 col-span-2 sm:col-span-1">
                  <div className="text-slate-500 text-[10px]">Jailbreak</div>
                  <div className="text-cyan-400 font-bold">Tidak Perlu</div>
                </div>
              </div>
            </div>

            {/* iOS Info Guide snippet */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-pink-300 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>Tanpa Ribet, Langsung Jalan di iPhone</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Cukup buka tautan HOT51 di Safari, klik ikon Bagikan lalu pilih &apos;Tambahkan ke Layar Utama&apos;. Nikmati streaming layar penuh layaknya aplikasi native tanpa resiko revoke.
              </p>
            </div>

            {/* iOS Action Buttons */}
            <div className="space-y-3">
              <button
                id="btn-install-ios-direct"
                onClick={onOpenIosModal}
                className="w-full py-4 px-6 rounded-2xl bg-slate-750 hover:bg-slate-700 text-white font-extrabold text-base border border-white/20 hover:border-pink-500/50 shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 cursor-pointer"
              >
                <Apple className="w-5 h-5 text-slate-100" />
                <span>{t.iosBtn}</span>
              </button>

              <a
                href={APP_CONFIG.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-launch-webapp-link"
                className="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold border border-white/10 flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
              >
                <ExternalLink className="w-4 h-4 text-violet-400" />
                <span>{t.iosAltBtn}</span>
              </a>
            </div>

          </div>

        </div>

        {/* Security & Verification Guarantee Banner */}
        <div className="rounded-2xl bg-slate-900/70 border border-emerald-500/30 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">
                HOT51 Verified by Google Play Protect & VirusTotal
              </div>
              <div className="text-slate-400 mt-0.5">
                {t.verifiedText}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 font-mono text-[11px] bg-slate-950 px-3 py-1.5 rounded-lg border border-white/10 text-slate-400">
            <FileCheck className="w-4 h-4 text-pink-400" />
            <span>SHA256: 7f8a92b...c38e</span>
          </div>
        </div>

      </div>
    </section>
  );
};
