import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, FAQ_DATA } from '../data/translations';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

interface FaqSectionProps {
  language: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ language }) => {
  const t = TRANSLATIONS[language].faqSection;
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 border-t border-white/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-bold text-violet-400">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            {t.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden transition-all shadow-md"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-pink-300 transition-colors cursor-pointer"
                >
                  <span className="font-['Outfit']">
                    {language === 'id' ? faq.questionId : faq.questionEn}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-pink-500/20 text-pink-400' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-150">
                    <p>{language === 'id' ? faq.answerId : faq.answerEn}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
