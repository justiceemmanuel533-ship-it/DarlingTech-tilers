import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Calculator, Package, Hammer, Clock, DollarSign, MessageSquare, Sparkles, RefreshCw } from 'lucide-react';

export const TileCalculator: React.FC = () => {
  const { siteData, setIsAiChatOpen, setActiveAiPrompt } = useSite();
  const primaryPhone = siteData.phones[0];

  const [calcMode, setCalcMode] = useState<'dimensions' | 'area'>('dimensions');
  const [length, setLength] = useState<number>(6.5);
  const [width, setWidth] = useState<number>(5.0);
  const [directArea, setDirectArea] = useState<number>(45);
  const [roomType, setRoomType] = useState<string>('Living & Dining Room');
  const [tileSize, setTileSize] = useState<string>('1200x600');
  const [layoutPattern, setLayoutPattern] = useState<string>('Straight Stack (10% waste)');

  // Calculations
  const baseArea = calcMode === 'dimensions' ? Number((length * width).toFixed(1)) : directArea;
  const wastageFactor = layoutPattern.includes('Herringbone') || layoutPattern.includes('15%') ? 0.15 : 0.10;
  const totalAreaWithWaste = Number((baseArea * (1 + wastageFactor)).toFixed(1));

  // Box coverage estimate (avg 1.44m2 per box)
  const boxesNeeded = Math.ceil(totalAreaWithWaste / 1.44);

  // Adhesive bags (20kg bag): ~3.5m² for large format (1200x600, 800x800) due to 10-12mm notch + back-buttering; ~4.5m² for standard 600x600
  const m2PerBag = tileSize === '1200x600' || tileSize === '800x800' ? 3.5 : 4.5;
  const adhesiveBags = Math.ceil(totalAreaWithWaste / m2PerBag);

  // Grout kg: approx 0.35kg per m²
  const groutKg = Math.ceil(baseArea * 0.35);

  // Estimated labor days
  const dailyRateM2 = tileSize === '1200x600' ? 18 : 25; // m2 per day for experienced team
  const estimatedDays = Math.max(1, Math.ceil(baseArea / dailyRateM2));

  // Labor rate estimate in USD: $4.00 - $5.50 per m²
  const minLaborRate = 4.0;
  const maxLaborRate = 5.5;
  const minCostUsd = Math.round(baseArea * minLaborRate);
  const maxCostUsd = Math.round(baseArea * maxLaborRate);

  const formattedWhatsAppMessage = `Hi Darlington (Kayz)! I used the Darlingtech tile estimator for my project:
- Space: ${roomType} (${baseArea} m²)
- Tile Size: ${tileSize}mm (${layoutPattern})
- Estimated tiles needed: ${totalAreaWithWaste}m² (${boxesNeeded} boxes)
- Adhesive estimate: ~${adhesiveBags} bags (20kg C2TE)
- Estimated Labor Range: $${minCostUsd} - $${maxCostUsd} USD

Could you please confirm your availability for a free site inspection?`;

  const handleAskAi = () => {
    setActiveAiPrompt(
      `Please review this tiling estimate for my ${roomType} in Harare (${baseArea} m² using ${tileSize}mm tiles in ${layoutPattern}). Recommend the best adhesive type, waterproofing requirements, and how Darlingtech handles expansion joints.`
    );
    setIsAiChatOpen(true);
  };

  return (
    <section id="calculator" className="py-20 bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Interactive Zimbabwe Surface Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            Calculate Tiles, Adhesive Bags & Labor Guide
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Get instant material estimations calibrated for Zimbabwean residential building standards and large-format porcelain back-buttering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inputs (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-6">
            {/* Input Mode Selector */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Room Dimensions Mode:
              </span>
              <div className="flex items-center gap-1 p-1 bg-neutral-950 rounded-lg border border-neutral-800">
                <button
                  onClick={() => setCalcMode('dimensions')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    calcMode === 'dimensions'
                      ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Length × Width (m)
                </button>
                <button
                  onClick={() => setCalcMode('area')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    calcMode === 'area'
                      ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Direct Square Meters (m²)
                </button>
              </div>
            </div>

            {/* Dimension Fields */}
            {calcMode === 'dimensions' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Room Length (Meters):
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="50"
                      value={length}
                      onChange={(e) => setLength(Math.max(0.5, parseFloat(e.target.value) || 0))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700/80 text-white font-mono-numbers text-sm focus:border-amber-500 focus:outline-none"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs text-neutral-500">meters</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Room Width (Meters):
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="50"
                      value={width}
                      onChange={(e) => setWidth(Math.max(0.5, parseFloat(e.target.value) || 0))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700/80 text-white font-mono-numbers text-sm focus:border-amber-500 focus:outline-none"
                    />
                    <span className="absolute right-3.5 top-2.5 text-xs text-neutral-500">meters</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Total Floor / Wall Area (Square Meters):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="1"
                    max="2000"
                    value={directArea}
                    onChange={(e) => setDirectArea(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700/80 text-white font-mono-numbers text-sm focus:border-amber-500 focus:outline-none"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-neutral-500">m²</span>
                </div>
              </div>
            )}

            {/* Room Type & Tile Sizing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Room / Space Type:
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700/80 text-white text-xs focus:border-amber-500 focus:outline-none"
                >
                  <option value="Living & Dining Room">Living & Dining Room</option>
                  <option value="Master Ensuite Wetroom">Master Ensuite Wetroom</option>
                  <option value="Kitchen Floor & Splashback">Kitchen Floor & Splashback</option>
                  <option value="Verandah & Outdoor Patio">Verandah & Outdoor Patio</option>
                  <option value="Full Residence (3+ Bedrooms)">Full Residence (3+ Bedrooms)</option>
                  <option value="Commercial Office / Retail">Commercial Office / Retail</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Target Tile Size:
                </label>
                <select
                  value={tileSize}
                  onChange={(e) => setTileSize(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700/80 text-white text-xs focus:border-amber-500 focus:outline-none"
                >
                  <option value="1200x600">1200×600mm Large Porcelain Slab</option>
                  <option value="800x800">800×800mm Polished Porcelain</option>
                  <option value="600x600">600×600mm Standard Floor Tile</option>
                  <option value="300x300">300×300mm Bathroom Anti-Slip</option>
                  <option value="75x300">75×300mm Subway / Splashback</option>
                </select>
              </div>
            </div>

            {/* Layout Pattern (Affects Wastage) */}
            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                Layout Pattern:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {[
                  'Straight Stack (10% waste)',
                  '1/3 Brick Stagger (12% waste)',
                  'Herringbone / Diagonal (15% waste)',
                ].map((pattern) => (
                  <button
                    key={pattern}
                    type="button"
                    onClick={() => setLayoutPattern(pattern)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      layoutPattern === pattern
                        ? 'border-amber-500 bg-amber-500/10 text-white font-medium'
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {pattern}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Advisor Button Callout */}
            <div className="pt-2 flex items-center justify-between text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Want AI assistance on Harare screed prep?
              </span>
              <button
                onClick={handleAskAi}
                className="text-amber-400 hover:text-amber-300 font-semibold"
              >
                Analyze with Gemini 💠
              </button>
            </div>
          </div>

          {/* Right Column: Calculated Results Card (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-950 border border-amber-500/30 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Estimated Quantities
                </span>
                <div className="text-2xl font-bold text-white font-mono-numbers mt-0.5">
                  {baseArea} m² <span className="text-xs font-normal text-neutral-400">floor area</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-neutral-400 block">With {Math.round(wastageFactor * 100)}% cut waste:</span>
                <span className="text-base font-bold text-amber-300 font-mono-numbers">
                  {totalAreaWithWaste} m²
                </span>
              </div>
            </div>

            {/* Key Itemized Material Cards */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
                  <Package className="w-3.5 h-3.5 text-amber-400" />
                  <span>Tile Boxes Needed</span>
                </div>
                <div className="text-xl font-bold text-white font-mono-numbers">
                  ~{boxesNeeded} <span className="text-xs font-normal text-neutral-400">boxes</span>
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">Based on ~1.44m²/box</div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
                  <Hammer className="w-3.5 h-3.5 text-sky-400" />
                  <span>20kg Adhesive Bags</span>
                </div>
                <div className="text-xl font-bold text-white font-mono-numbers">
                  ~{adhesiveBags} <span className="text-xs font-normal text-neutral-400">bags</span>
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">C2TE High-Polymer Bed</div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Grout Quantity</span>
                </div>
                <div className="text-xl font-bold text-white font-mono-numbers">
                  ~{groutKg} <span className="text-xs font-normal text-neutral-400">kg</span>
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">1.5mm–2mm hairline joints</div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80">
                <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Timeline</span>
                </div>
                <div className="text-xl font-bold text-white font-mono-numbers">
                  ~{estimatedDays} <span className="text-xs font-normal text-neutral-400">days</span>
                </div>
                <div className="text-[11px] text-neutral-500 mt-1">Prep, laying & grouting</div>
              </div>
            </div>

            {/* Estimated Labor Guide */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
              <div className="flex items-center justify-between text-xs text-amber-300 mb-1">
                <span className="font-semibold uppercase tracking-wider">Estimated Workmanship Guide:</span>
                <span className="font-mono-numbers">{siteData.laborRateRangeUsdPerM2}</span>
              </div>
              <div className="text-2xl font-bold text-white font-mono-numbers">
                ${minCostUsd} – ${maxCostUsd} <span className="text-xs font-normal text-neutral-400">USD</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">
                Final quotation confirmed upon free on-site physical measurement in Harare & nationwide Zimbabwe.
              </p>
            </div>

            {/* One-Click Action: Send to WhatsApp */}
            <a
              href={`https://wa.me/${primaryPhone.cleanNumber}?text=${encodeURIComponent(formattedWhatsAppMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs tracking-wide shadow-xl shadow-amber-500/20 transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-neutral-950" />
              <span>Send This Estimate to Kayz on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
