import React from 'react';
import { Compass, ShieldCheck, Ruler, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const CraftsmanshipProcess: React.FC = () => {
  const { siteData } = useSite();
  const primaryPhone = siteData.phones[0];

  const steps = [
    {
      num: '01',
      title: 'Cross-Laser Datum & Moisture Survey',
      lead: 'Eliminating uneven substrate foundations before laying',
      desc: 'We map your concrete floor with 360° green cross-line lasers to detect highs and dips. We measure screed moisture content to ensure tile adhesive will chemically bond without debonding.',
      tag: 'Foundation Inspection',
    },
    {
      num: '02',
      title: 'Screed Rectification & Tanking Membrane',
      lead: 'Water-tight preparation for wetrooms and high-traffic zones',
      desc: 'In bathrooms and walk-in showers, we apply polyurethane or cementitious waterproofing membranes with fiberglass mesh along joints and pipe penetrations to ensure 100% leak protection.',
      tag: 'Waterproofing',
    },
    {
      num: '03',
      title: 'Dry Layout & Symmetrical Focal Centering',
      lead: 'No awkward 2cm sliver cuts in noticeable sightlines',
      desc: 'Before mixing a single bag of adhesive, we dry-lay tiles to center the pattern symmetrically around doorways, cooker hobs, kitchen islands, and shower niches, avoiding ugly uneven cuts.',
      tag: 'Aesthetic Geometry',
    },
    {
      num: '04',
      title: '100% Full-Bed Back-Butter Adhesion',
      lead: 'Guaranteed zero hollow tapping sounds or cracked tiles',
      desc: 'Large-format porcelain slabs cannot rely on notched trowel lines alone. We flat-butter the back of every individual tile with C2TE polymer mortar and lock them in place with mechanical leveling clips.',
      tag: 'Zero-Hollow Bond',
    },
    {
      num: '05',
      title: '45° Hand-Mitred Corners & Polymer Grout',
      lead: 'Seamless architectural edges without plastic corner trims',
      desc: 'For external wall corners, bathtub returns, and shower niches, we bevel tile edges to precise 45° angles. Joints are grouted with anti-fungal, stain-resistant flexible grout for a flawless finish.',
      tag: 'Hand-Mitred Finish',
    },
  ];

  return (
    <section className="py-20 bg-neutral-900/50 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              The Darlingtech Standard
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              5-Stage Precision Protocol for Flawless Surfaces
            </h2>
            <p className="text-sm text-neutral-400">
              Why our tiling never cracks, hollows, or fails: rigorous engineering applied from substrate screed to final polish.
            </p>
          </div>

          <a
            href={`https://wa.me/${primaryPhone.cleanNumber}?text=${encodeURIComponent(
              'Hi Darlington! I want to book a laser datum inspection for my property.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold border border-neutral-700 transition-colors whitespace-nowrap self-start md:self-auto"
          >
            <span>Book Site Laser Survey</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </a>
        </div>

        {/* 5-Step Editorial Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              className={`p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 hover:border-amber-500/40 transition-all flex flex-col justify-between group ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xl font-black text-amber-400">
                    {step.num}
                  </span>
                  <span className="text-[11px] font-medium text-neutral-400 px-2.5 py-0.5 rounded-md bg-neutral-950 border border-neutral-800">
                    {step.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors mb-1">
                  {step.title}
                </h3>
                <p className="text-xs font-medium text-amber-400/90 mb-3">
                  {step.lead}
                </p>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center gap-1.5 text-[11px] text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Quality Checkpoint</span>
              </div>
            </div>
          ))}

          {/* Quick Technical Guarantee Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 via-neutral-900 to-neutral-950 border border-amber-500/30 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Our Workmanship Warranty
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                Guaranteed Adhesion & Lippage Protection
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                If any tile laid by Darlingtech Tilers rings hollow or develops lippage due to workmanship within 12 months, we rectify it completely at zero labor cost to you.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800/80">
              <span className="text-xs font-bold text-amber-400 font-mono-numbers">
                100% Client Satisfaction Promise
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
