import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Phone, MessageSquare, Sparkles, Edit3, Check, Menu, X, Radio } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { siteData, isEditMode, setIsEditMode, setIsAiChatOpen } = useSite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const primaryPhone = siteData.phones[0] || {
    number: '+263771624931',
    cleanNumber: '263771624931',
    label: 'Primary Line',
  };

  const whatsappUrl = `https://wa.me/${primaryPhone.cleanNumber}?text=${encodeURIComponent(
    'Hi Darlingtech Tilers! I would like to request a quote / free on-site measurement for a tiling project in Zimbabwe.'
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-neutral-950 font-black text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              DT
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap">
                {siteData.companyName.toUpperCase()}
              </span>
              <span className="text-[11px] text-amber-400 font-medium tracking-wider uppercase">
                Artisan Tiling · Zimbabwe
              </span>
            </div>
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300">
            <a href="#services" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              Services
            </a>
            <a href="#studio-3d" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5">
              <span>3D Studio</span>
            </a>
            <a href="#gallery" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              Gallery
            </a>
            <a href="#calculator" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              Estimator
            </a>
            <a href="#testimonials" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              Testimonials
            </a>
            <a href="#references" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              References
            </a>
            <a href="#contact" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
              Contact
            </a>
          </nav>

          {/* Zone 3: Primary Action & Tools */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Gemini AI Advisor Trigger Button */}
            <button
              onClick={() => setIsAiChatOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl transition-all"
              title="Open Gemini AI Tiling Consultant"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Advisor 💠</span>
            </button>

            {/* In-app Web Editor Toggle */}
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border transition-all ${
                isEditMode
                  ? 'bg-amber-500 text-neutral-950 font-semibold border-amber-400 shadow-md'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white border-neutral-700/80 hover:border-neutral-600'
              }`}
              title="Toggle In-App Website Editor Mode"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isEditMode ? 'Editing Mode Active' : 'Edit Website'}</span>
              <span className="md:hidden">{isEditMode ? 'Editing' : 'Edit'}</span>
            </button>

            {/* Primary Action Button: WhatsApp Quick Quote */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/20 transition-all whitespace-nowrap shrink-0"
            >
              <MessageSquare className="w-4 h-4 fill-neutral-950" />
              <span>WhatsApp Quote</span>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-800 space-y-3 text-sm font-medium">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-neutral-300 hover:text-amber-400 hover:bg-neutral-900"
            >
              Services
            </a>
            <a
              href="#studio-3d"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-neutral-300 hover:text-amber-400 hover:bg-neutral-900"
            >
              3D Interactive Studio
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-neutral-300 hover:text-amber-400 hover:bg-neutral-900"
            >
              Photo Gallery
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-neutral-300 hover:text-amber-400 hover:bg-neutral-900"
            >
              Tile & Cost Estimator
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-neutral-300 hover:text-amber-400 hover:bg-neutral-900"
            >
              Client Testimonials
            </a>
            <a
              href="#references"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-neutral-300 hover:text-amber-400 hover:bg-neutral-900"
            >
              Verified References
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-neutral-300 hover:text-amber-400 hover:bg-neutral-900"
            >
              Contact & Booking
            </a>

            <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsAiChatOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-xl text-xs font-semibold"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Open Gemini AI Consultant 💠</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
