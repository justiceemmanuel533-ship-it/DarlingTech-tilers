import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { ZoomIn, MapPin, CheckCircle2, X, MessageSquare, ArrowRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: 'All' | 'Floor Tiling' | 'Bathroom Tiling' | 'Kitchen Splashbacks' | 'Outdoor & Commercial';
  location: string;
  scope: string;
  caption: string;
  details: string[];
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    image: '/src/assets/images/hero_luxury_tiling_1794068865341.jpg',
    title: 'Borrowdale Brooke High-Gloss Porcelain Floor',
    category: 'Floor Tiling',
    location: 'Borrowdale Brooke, Harare',
    scope: '320m² Large-Format Slab',
    caption: '320m² continuous living and dining installation using 1200×600mm mirror-finish Italian marble porcelain slabs with 1.5mm razor-fine grout joints and mechanical leveling clips.',
    details: ['1200×600mm Italian Porcelain', '1.5mm Hairline Joint', 'Zero Lippage Guarantee'],
  },
  {
    id: 'g-2',
    image: '/src/assets/images/project_bathroom_porcelain_1794068865144.jpg',
    title: 'Luxury Calacatta Marble Master En-Suite',
    category: 'Bathroom Tiling',
    location: 'Glen Lorne, Harare',
    scope: 'Master Bath & Wetroom',
    caption: 'Bookmatched Calacatta porcelain wall and floor installation with curbless walk-in shower, recessed illuminated niche with 45° hand-mitred edge returns.',
    details: ['45° Hand-Mitred Niches', 'Curbless Linear Drain Fall', 'Full Tanking Waterproofing'],
  },
  {
    id: 'g-3',
    image: '/src/assets/images/project_kitchen_splashback_1794068866103.jpg',
    title: 'Artisan Sage Green Herringbone Splashback',
    category: 'Kitchen Splashbacks',
    location: 'Highlands, Harare',
    scope: 'Designer Kitchen Island & Hob Wall',
    caption: 'Symmetrically centered herringbone glazed subway tile splashback installed behind a 5-burner gas hob, finished with stain-proof epoxy grout.',
    details: ['45° Herringbone Alignment', 'Symmetrical Hob Centering', 'Epoxy Anti-Stain Grout'],
  },
  {
    id: 'g-4',
    image: '/src/assets/images/tiler_craftsman_at_work_1794068866647.jpg',
    title: 'Master Craftsman Darlington (Kayz) Laser Alignment',
    category: 'Floor Tiling',
    location: 'Mt Pleasant, Harare',
    scope: 'Site Preparation & Leveling',
    caption: 'Laser-guided floor layout and leveling clip application ensuring 100% full adhesive bed coverage and zero hollow spots on large-format tiles.',
    details: ['Cross-Line Digital Laser', 'Back-Butter Adhesion', 'Zero Hollow Contact'],
  },
  {
    id: 'g-5',
    image: '/src/assets/images/gallery_outdoor_patio_1794069073593.jpg',
    title: 'Textured Non-Slip Verandah & Patio',
    category: 'Outdoor & Commercial',
    location: 'Chisipite, Harare',
    scope: '145m² Covered Outdoor Living',
    caption: 'R11 anti-slip slate porcelain tiles engineered for high sun exposure and torrential rains, equipped with flexible silicone perimeter expansion joints.',
    details: ['R11 Anti-Slip Texture', 'Perimeter Expansion Joints', 'Weatherproof Screed Prep'],
  },
  {
    id: 'g-6',
    image: '/src/assets/images/gallery_commercial_showroom_1794069073338.jpg',
    title: 'Westgate Commercial Showroom Vitrified Slabs',
    category: 'Outdoor & Commercial',
    location: 'Westgate, Harare',
    scope: '280m² Retail Showroom Floor',
    caption: 'High-traffic vitrified porcelain floor with mirror reflection under architectural downlights, delivered 3 days ahead of retail opening.',
    details: ['Heavy Vitrified Porcelain', 'Rapid-Cure C2TE Adhesive', 'Zero Business Downtime'],
  },
];

export const ProjectsGallery: React.FC = () => {
  const { siteData } = useSite();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Floor Tiling', 'Bathroom Tiling', 'Kitchen Splashbacks', 'Outdoor & Commercial'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const primaryPhone = siteData.phones[0];

  return (
    <section id="gallery" className="py-20 bg-neutral-900/40 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Category Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Workmanship Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Examples of Our High-Quality Tiling Work
            </h2>
            <p className="text-sm text-neutral-400">
              Real completed projects across Borrowdale, Glen Lorne, Mt Pleasant, Highlands, and commercial properties in Zimbabwe.
            </p>
          </div>

          {/* Filter Tabs / Segmented Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col"
            >
              {/* Image with zoom affordance */}
              <div
                className="relative h-64 overflow-hidden cursor-pointer"
                onClick={() => setActiveModalItem(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Category Pill Tag Replacement (Clean unboxed metadata) */}
                <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-medium text-amber-400 border border-neutral-800">
                  {item.category}
                </div>

                {/* Zoom Icon Button */}
                <button
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-neutral-950/80 text-white hover:text-amber-400 transition-colors"
                  aria-label="View Project Fullscreen"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Caption & Project Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{item.location}</span>
                    <span className="text-neutral-600">·</span>
                    <span className="font-mono-numbers">{item.scope}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-300 leading-relaxed mt-2">
                    {item.caption}
                  </p>
                </div>

                {/* Details Footer */}
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Finish
                  </span>

                  <a
                    href={`https://wa.me/${primaryPhone.cleanNumber}?text=${encodeURIComponent(
                      `Hi Kayz! I saw project "${item.title}" on the Darlingtech website and would like something similar for my home.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
                  >
                    <span>Request Similar</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal for High Res Inspection */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-neutral-950/80 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="max-h-[60vh] overflow-hidden bg-neutral-950">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="w-full h-full object-contain max-h-[60vh]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Modal Details */}
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeModalItem.location}</span>
                <span className="text-neutral-600">·</span>
                <span>{activeModalItem.scope}</span>
              </div>

              <h3 className="text-xl font-bold text-white">
                {activeModalItem.title}
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed">
                {activeModalItem.caption}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {activeModalItem.details.map((d, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-300 text-xs border border-neutral-700"
                  >
                    {d}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Ready to book Darlingtech Tilers for your space?
                </span>
                <a
                  href={`https://wa.me/${primaryPhone.cleanNumber}?text=${encodeURIComponent(
                    `Hi Darlington! I am viewing "${activeModalItem.title}" on the Darlingtech website and would like to get a quote.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-neutral-950" />
                  <span>Send to Kayz on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
