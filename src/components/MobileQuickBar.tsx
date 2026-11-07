import React from 'react';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const MobileQuickBar: React.FC = () => {
  const { siteData, setIsAiChatOpen } = useSite();
  const primaryPhone = siteData.phones[0];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 p-2 shadow-2xl">
      <div className="grid grid-cols-3 gap-1.5 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href={`tel:${primaryPhone.number}`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-semibold text-xs active:bg-neutral-800 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-amber-400" />
          <span>Call Kayz</span>
        </a>

        {/* Instant WhatsApp Button */}
        <a
          href={`https://wa.me/${primaryPhone.cleanNumber}?text=${encodeURIComponent(
            'Hi Darlingtech Tilers! Inquiring from your website about a tiling quotation.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-600 text-white font-bold text-xs active:bg-emerald-500 shadow-md shadow-emerald-950/40 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-white" />
          <span>WhatsApp</span>
        </a>

        {/* Gemini AI Advisor Trigger */}
        <button
          onClick={() => setIsAiChatOpen(true)}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs active:bg-amber-400 shadow-md shadow-amber-950/40 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 fill-neutral-950" />
          <span>AI Tiler 💠</span>
        </button>
      </div>
    </div>
  );
};
