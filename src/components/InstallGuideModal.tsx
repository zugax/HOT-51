import React from 'react';
import { X, Apple, Share, PlusSquare, Smartphone, CheckCircle, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { APP_CONFIG } from '../config/appConfig';

interface InstallGuideModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  isOpen,
  language,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center">
              <Apple className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">
                {language === 'id' ? 'Panduan Instalasi Apple iOS - HOT51' : 'Apple iOS Installation Guide - HOT51'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'id' ? 'Untuk iPhone & iPad (Tanpa Jailbreak)' : 'For iPhone & iPad (No Jailbreak Needed)'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="flex gap-3 items-start bg-slate-950/60 p-3.5 rounded-2xl border border-white/5">
            <div className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-400 font-bold flex items-center justify-center shrink-0">
              1
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white">
                {language === 'id' ? 'Buka Website di Safari' : 'Open in Safari Browser'}
              </div>
              <p className="text-slate-400 text-xs">
                {language === 'id'
                  ? `Buka link resmi HOT51 (${APP_CONFIG.targetUrl}) menggunakan browser bawaan Apple Safari di iPhone.`
                  : `Ensure you open HOT51 (${APP_CONFIG.targetUrl}) using Apple\'s native Safari browser on your iPhone or iPad.`}
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start bg-slate-950/60 p-3.5 rounded-2xl border border-white/5">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">
              2
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Share className="w-4 h-4 text-cyan-400" />
                <span>{language === 'id' ? 'Tekan Tombol Bagikan (Share)' : 'Tap the Share Button'}</span>
              </div>
              <p className="text-slate-400 text-xs">
                {language === 'id'
                  ? 'Sentuh ikon Bagikan di panel menu bawah Safari (ikon kotak dengan panah mengarah ke atas).'
                  : 'Tap the Share button located at the bottom navigation bar of Safari.'}
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start bg-slate-950/60 p-3.5 rounded-2xl border border-white/5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">
              3
            </div>
            <div className="space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <PlusSquare className="w-4 h-4 text-amber-400" />
                <span>{language === 'id' ? 'Pilih Tambah ke Layar Utama' : 'Choose Add to Home Screen'}</span>
              </div>
              <p className="text-slate-400 text-xs">
                {language === 'id'
                  ? 'Pilih opsi "Tambahkan ke Layar Utama" (Add to Home Screen) lalu tekan Tambah (Add). Aplikasi HOT51 siap dibuka layaknya aplikasi App Store!'
                  : 'Select "Add to Home Screen" and tap "Add". HOT51 will be pinned to your home screen immediately!'}
              </p>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="space-y-2">
          <a
            href={APP_CONFIG.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-bold text-sm shadow-lg shadow-pink-500/25 hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>{language === 'id' ? 'Buka HOT51 Sekarang' : 'Launch HOT51 Now'}</span>
          </a>
        </div>

      </div>
    </div>
  );
};
