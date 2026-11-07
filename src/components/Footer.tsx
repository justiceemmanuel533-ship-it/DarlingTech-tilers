import React from 'react';
import { useSite } from '../context/SiteContext';
import { Phone, Mail, Instagram, ThumbsUp, MessageCircle, Globe, Shield, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { siteData, setIsEditMode } = useSite();
  const { phones, socials, ownerName, email } = siteData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1 & 2: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-neutral-950 font-black text-lg shadow-md">
                DT
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {siteData.companyName.toUpperCase()}
              </span>
            </div>

            <p className="text-neutral-400 leading-relaxed max-w-sm">
              Zimbabwe's premier specialist tiling contractor. Large format porcelain slabs, luxury bathroom en-suites, intricate kitchen splashbacks, and precision 45° mitred edge craftsmanship.
            </p>

            <div className="space-y-1 text-[11px] text-neutral-500">
              <p>Founded & Managed by Master Tiler {ownerName} (Kayz)</p>
              <p>Registered Domain: <span className="text-amber-400/90 font-mono-numbers">www.darlingtechtilers.co.zw</span></p>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  Tiling Services
                </a>
              </li>
              <li>
                <a href="#studio-3d" className="hover:text-amber-400 transition-colors">
                  Interactive 3D Studio
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">
                  Completed Projects
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-amber-400 transition-colors">
                  Material & Cost Estimator
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-amber-400 transition-colors">
                  Client Reviews
                </a>
              </li>
              <li>
                <a href="#references" className="hover:text-amber-400 transition-colors">
                  Verified References
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Phone Numbers */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Direct Phone Lines
            </h4>
            <ul className="space-y-2.5">
              {phones.map((p) => (
                <li key={p.id}>
                  <a
                    href={`tel:${p.number}`}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5 font-mono-numbers font-medium text-white"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{p.number}</span>
                  </a>
                  <span className="text-[11px] text-neutral-500 block pl-5">{p.label.split('(')[0]}</span>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-neutral-300 font-mono-numbers mt-1"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Channels & Follow Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Socials & Channels
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={socials.whatsappChannel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-2 text-neutral-300"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Channel</span>
                </a>
              </li>
              <li>
                <a
                  href={socials.facebookCompany.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2 text-neutral-300"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-blue-400" />
                  <span>Facebook: {socials.facebookCompany.handle}</span>
                </a>
              </li>
              <li>
                <a
                  href={socials.facebookOwner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors flex items-center gap-2 text-neutral-300"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-blue-500" />
                  <span>Owner: {ownerName}</span>
                </a>
              </li>
              <li>
                <a
                  href={socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors flex items-center gap-2 text-neutral-300"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Instagram: {socials.instagram.handle}</span>
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => setIsEditMode(true)}
                className="text-[11px] text-amber-400 hover:text-amber-300 underline font-medium block"
              >
                Owner CMS / Edit Website
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Hairline & Legal Notices */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} {siteData.companyName}. All rights reserved · Harare, Zimbabwe.
          </div>

          <div className="flex items-center gap-4">
            <span>Operating across Harare, Bulawayo & Nationwide Zimbabwe</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
