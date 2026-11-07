import React from 'react';
import { useSite } from '../context/SiteContext';
import { Phone, MessageSquare, ShieldCheck, Ruler, Sparkles, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { siteData, setIsAiChatOpen } = useSite();
  const primaryPhone = siteData.phones[0];

  const primaryWaUrl = `https://wa.me/${primaryPhone.cleanNumber}?text=${encodeURIComponent(
    'Hi Darlington (Kayz)! I saw the Darlingtech Tilers website and would like to request an inspection and quotation for my home in Zimbabwe.'
  )}`;

  return (
    <section className="relative overflow-hidden bg-neutral-950 pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background architectural glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Proof, and CTAs (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Craftsman kicker line */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold tracking-wide">
              <span>Led by Master Tiler Darlington Kanyandura (Kayz)</span>
              <span className="text-amber-500/50">·</span>
              <span className="text-neutral-400">Harare & Nationwide</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-[1.1] text-balance">
              {siteData.heroHeadline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl text-pretty">
              {siteData.heroSubheadline}
            </p>

            {/* Quick Contact Bar for All 3 Numbers */}
            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="font-semibold text-neutral-300 uppercase tracking-wider">
                  Direct Artisan Dialers (Click to Call or WhatsApp):
                </span>
                <span className="text-amber-400">Fast Response</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {siteData.phones.map((phone) => (
                  <div key={phone.id} className="flex items-center justify-between p-2 rounded-xl bg-neutral-950/70 border border-neutral-800/80 hover:border-amber-500/50 transition-colors">
                    <a
                      href={`tel:${phone.number}`}
                      className="flex items-center gap-2 text-xs font-semibold text-white hover:text-amber-400 truncate"
                      title={`Call ${phone.number}`}
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="font-mono-numbers truncate">{phone.number}</span>
                    </a>
                    <a
                      href={`https://wa.me/${phone.cleanNumber}?text=${encodeURIComponent('Hi Darlingtech Tilers! Inquiring about tiling service.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/50 rounded-lg transition-colors ml-1 shrink-0"
                      title="Open WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-emerald-400" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href={primaryWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-neutral-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all group"
              >
                <MessageSquare className="w-4 h-4 fill-neutral-950" />
                <span>Book Free Measurement on WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => setIsAiChatOpen(true)}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-semibold text-sm border border-neutral-700/80 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI Tiling Advisor 💠</span>
              </button>
            </div>

            {/* Quick Guarantees Kicker */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-400 pt-1">
              <span className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Zero Hollow Guarantee
              </span>
              <span className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                45° Mitred Joint Cuts
              </span>
              <span className="flex items-center gap-1.5 text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                Cross-Line Laser Precision
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset (lg:col-span-5) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl group bg-neutral-900">
              <img
                src="/src/assets/images/hero_luxury_tiling_1794068865341.jpg"
                alt="Darlingtech Tilers luxury large-format porcelain floor installation in Harare residence"
                className="w-full h-[440px] lg:h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Subtle gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

              {/* Inset Badge Overlay */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800 text-xs">
                <div className="flex items-center justify-between text-neutral-400 mb-1">
                  <span className="font-semibold text-amber-400 uppercase tracking-wider">Project Showcase</span>
                  <span>Borrowdale Brooke</span>
                </div>
                <p className="font-medium text-white text-sm">
                  1200×600mm High-Gloss Porcelain Slab Flooring with 1.5mm Hairline Joints
                </p>
                <div className="flex items-center gap-4 mt-2 text-[11px] text-neutral-400 pt-2 border-t border-neutral-800">
                  <span>320m² Area Covered</span>
                  <span>·</span>
                  <span>Zero Lippage</span>
                  <span>·</span>
                  <span className="text-emerald-400 font-medium">100% Client Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI / Trust Strip Placed in Full-Width Row Below Hero Split */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
            <div className="text-2xl font-bold text-white font-mono-numbers">100%</div>
            <div className="text-xs font-semibold text-amber-400 mt-0.5">Hollow-Free Adhesion</div>
            <p className="text-xs text-neutral-400 mt-1">Full back-buttering on every porcelain tile</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
            <div className="text-2xl font-bold text-white font-mono-numbers">45°</div>
            <div className="text-xs font-semibold text-amber-400 mt-0.5">Precision Mitred Corners</div>
            <p className="text-xs text-neutral-400 mt-1">Seamless external edges without bulky plastic</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
            <div className="text-2xl font-bold text-white font-mono-numbers">450+</div>
            <div className="text-xs font-semibold text-amber-400 mt-0.5">Projects Handed Over</div>
            <p className="text-xs text-neutral-400 mt-1">Residential villas, en-suites & showrooms</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/60">
            <div className="text-2xl font-bold text-white font-mono-numbers">3 Lines</div>
            <div className="text-xs font-semibold text-amber-400 mt-0.5">Instant WhatsApp Access</div>
            <p className="text-xs text-neutral-400 mt-1">+263771624931 / 0789423434 / 0719418701</p>
          </div>
        </div>
      </div>
    </section>
  );
};
