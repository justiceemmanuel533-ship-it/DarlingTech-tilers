import React from 'react';
import { useSite } from '../context/SiteContext';
import { Layers, Bath, Utensils, Home, Construction, Building2, Check, ArrowUpRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { siteData } = useSite();
  const { services } = siteData;
  const primaryPhone = siteData.phones[0];

  const getServiceIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Layers className="w-5 h-5 text-amber-400" />;
      case 1:
        return <Bath className="w-5 h-5 text-sky-400" />;
      case 2:
        return <Utensils className="w-5 h-5 text-emerald-400" />;
      case 3:
        return <Home className="w-5 h-5 text-amber-400" />;
      case 4:
        return <Construction className="w-5 h-5 text-purple-400" />;
      case 5:
        return <Building2 className="w-5 h-5 text-blue-400" />;
      default:
        return <Layers className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Specialized Craftsmanship Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance">
              Precision Tiling Engineered to Endure Zimbabwe’s Climate & Settling
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              From mirror-gloss 1200x600mm floor slabs to intricate herringbone kitchen splashbacks, every square meter is backed by full polymer adhesive contact and laser-aligned lines.
            </p>
          </div>

          <div className="text-xs text-neutral-400 flex items-center gap-2">
            <span>Current Labor Guide:</span>
            <span className="font-semibold text-white font-mono-numbers px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800">
              {siteData.laborRateRangeUsdPerM2}
            </span>
          </div>
        </div>

        {/* 6 Services Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="p-6 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900/90 border border-neutral-800/80 hover:border-neutral-700 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header with Number & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                      {getServiceIcon(idx)}
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-500">
                      {service.number}.
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-neutral-400 tracking-wide">
                    {service.recommendedTile.split(',')[0]}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-amber-400/90 font-medium mt-1 mb-3">
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Features bullet checklist */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-neutral-400">
                      <Check className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Inquiry on WhatsApp for this Service */}
              <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <span className="text-[11px] text-neutral-400">
                  Ready to book in Harare / Zim?
                </span>
                <a
                  href={`https://wa.me/${primaryPhone.cleanNumber}?text=${encodeURIComponent(
                    `Hi Darlingtech Tilers! I would like to get a quote for "${service.title}".`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  <span>Inquire</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
