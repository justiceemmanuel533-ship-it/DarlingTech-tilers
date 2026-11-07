import React from 'react';
import { useSite } from '../context/SiteContext';
import { MessageCircle, ThumbsUp, Instagram, Users, ArrowUpRight, Bell, Video, ShieldCheck } from 'lucide-react';

export const WhatsAppChannelBanner: React.FC = () => {
  const { siteData } = useSite();
  const { socials } = siteData;

  return (
    <section className="relative z-20 py-8 bg-neutral-900/60 border-y border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-emerald-950/40 via-neutral-900/90 to-amber-950/30 border border-emerald-500/30 shadow-xl overflow-hidden">
          {/* Subtle decorative grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Left Column: Follower Value Proposition */}
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                <span className="uppercase tracking-wider">Official Follower Hub</span>
                <span className="text-neutral-500">·</span>
                <span className="text-neutral-400">{socials.whatsappChannel.memberCount}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Follow Darlingtech Tilers for Daily Live Site Videos & Handover Reveals
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed">
                Join our official WhatsApp Channel and Facebook page to watch daily video walkthroughs of newly finished Harare & Zimbabwe homes, see 45° mitred edge craftsmanship up close, and get first access to open project calendar dates.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-emerald-400" />
                  Daily Reel Walkthroughs
                </span>
                <span className="flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  Early Booking Notifications
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                  Verified Workmanship Proof
                </span>
              </div>
            </div>

            {/* Right Column: High-Converting Follower Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 w-full lg:w-auto shrink-0">
              {/* WhatsApp Channel Follow Button */}
              <a
                href={socials.whatsappChannel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-emerald-950/50 hover:shadow-emerald-600/30 transition-all group"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Join WhatsApp Channel</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Company Facebook Page Follow Button */}
              <a
                href={socials.facebookCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-950/50 hover:shadow-blue-600/30 transition-all group"
              >
                <ThumbsUp className="w-4 h-4 fill-white" />
                <span>Follow on Facebook</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Instagram Profile */}
              <a
                href={socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white font-semibold text-xs border border-neutral-700 transition-all group"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>{socials.instagram.handle}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
