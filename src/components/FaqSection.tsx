import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'When should I call Darlingtech Tilers—before or after pouring the floor screed?',
    a: 'Ideally before! Engaging us while your builder prepares the screed allows us to set laser datum levels, verify door clearances, and ensure correct slopes for walk-in shower drains and verandah rainwater run-off. This prevents costly screed hacking later.',
  },
  {
    q: 'What is the real difference between ceramic tiles and porcelain slabs?',
    a: 'Porcelain is vitrified at extreme pressure and heat, absorbing less than 0.5% water. In Zimbabwean homes with hot summers and seasonal soil movement, porcelain resists thermal shock, does not stain, and does not crack under heavy appliances.',
  },
  {
    q: 'Why does Darlingtech recommend 45° hand-mitred corners over plastic trims?',
    a: 'Plastic and aluminum corner beads often look commercial and degrade or yellow over time. Hand-cutting a precision 45-degree bevel return makes two adjoining tiles meet seamlessly, creating an authentic solid-stone or marble pillar finish.',
  },
  {
    q: 'Which tile adhesives do you specify for large-format 1200×600mm tiles?',
    a: 'Large format porcelain requires high-polymer C2TE flexible adhesive (e.g., TAL Goldstar, Weber.set, or certified polymer-modified adhesives). Standard cheap sand-cement glue fails to grip porcelain and results in hollow tiles. We back-butter every slab 100%.',
  },
  {
    q: 'Do you take on projects outside Harare (Bulawayo, Mutare, Gweru)?',
    a: 'Yes! While our primary base is in Harare (Borrowdale, Glen Lorne, Mt Pleasant, Madokero), we regularly mobilize our specialist tiling teams for executive home builds and commercial developments across all Zimbabwe provinces.',
  },
  {
    q: 'How long does a typical 100m² residential floor tiling job take?',
    a: 'For a 100m² open-plan space with 600×600 or 1200×600mm porcelain, our team typically requires 4–6 working days: Day 1 for laser prep, priming, and center layout; Days 2–4 for back-buttering, laying, and clip leveling; Days 5–6 for clip removal, epoxy grouting, expansion joints, and final buffing.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { siteData } = useSite();
  const primaryPhone = siteData.phones[0];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Clear Answers to Important Tiling Decisions
          </h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto">
            Practical advice from master tiler Darlington Kanyandura to help you prepare your project right.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-neutral-900/60 border border-neutral-800/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-amber-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="mt-10 p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-white">Have a unique site condition or question?</h4>
            <p className="text-xs text-neutral-400 mt-0.5">
              Darlington Kanyandura is available directly on WhatsApp for quick technical guidance.
            </p>
          </div>
          <a
            href={`https://wa.me/${primaryPhone.cleanNumber}?text=${encodeURIComponent(
              'Hi Kayz! I have a question about tile installation for my property in Zimbabwe.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-colors shrink-0"
          >
            <MessageSquare className="w-4 h-4 fill-neutral-950" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
