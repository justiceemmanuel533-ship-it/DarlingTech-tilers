import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Phone, MessageSquare, Mail, Instagram, ThumbsUp, MapPin, Send, CheckCircle, Clock, Calendar, ArrowUpRight, User } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { siteData } = useSite();
  const { phones, socials, ownerName, email } = siteData;
  const primaryPhone = phones[0];

  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    location: 'Harare (Borrowdale / Glen Lorne / Mt Pleasant)',
    projectType: 'Floor Tiling (Large Format Porcelain)',
    estimatedAreaM2: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const waText = `Hi Darlington Kanyandura (Darlingtech Tilers)!
My Name: ${bookingForm.name}
Phone: ${bookingForm.phone}
Project Location: ${bookingForm.location}
Scope: ${bookingForm.projectType} (~${bookingForm.estimatedAreaM2 || 'To be measured'} m²)
Notes: ${bookingForm.notes || 'Please let me know when you can do a site measurement.'}`;

    const waUrl = `https://wa.me/${primaryPhone.cleanNumber}?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-neutral-950 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Get In Touch Directly
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            Book a Free On-Site Inspection & Measurement
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Speak directly with owner and master tiler Darlington Kanyandura (Kayz) or call any of our 3 dedicated lines across Zimbabwe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Artisan Dialers & Social Hub (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Phone Numbers List with Click-to-Call */}
            <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Direct Telephone & WhatsApp Lines:
                </span>
                <span className="text-xs text-amber-400 font-medium">Click to Call on Mobile</span>
              </div>

              <div className="space-y-3">
                {phones.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 hover:border-amber-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div>
                      <span className="text-[11px] text-amber-400/90 font-medium block">
                        {p.label}
                      </span>
                      <a
                        href={`tel:${p.number}`}
                        className="text-lg font-bold text-white group-hover:text-amber-400 font-mono-numbers transition-colors"
                        title={`Call ${p.number}`}
                      >
                        {p.number}
                      </a>
                      <span className="text-[11px] text-neutral-500 block">
                        Tap number to dial immediately
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`tel:${p.number}`}
                        className="px-3.5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>Call</span>
                      </a>
                      <a
                        href={`https://wa.me/${p.cleanNumber}?text=${encodeURIComponent(
                          'Hi Darlingtech Tilers! Inquiring about tiling service.'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-md"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-white" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email & Owner Direct Information */}
            <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 space-y-4">
              <span className="text-xs font-bold text-white uppercase tracking-wider block border-b border-neutral-800 pb-3">
                Owner Credentials & Written Inquiries:
              </span>

              <div className="space-y-3 text-xs">
                {/* Email (Clickable) */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neutral-900 text-amber-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-neutral-400 block">Official Business Email:</span>
                      <a
                        href={`mailto:${email}`}
                        className="font-bold text-white hover:text-amber-400 font-mono-numbers"
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                  <a
                    href={`mailto:${email}`}
                    className="text-xs text-amber-400 hover:underline font-semibold"
                  >
                    Send Email
                  </a>
                </div>

                {/* Owner Profile */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-neutral-900 text-amber-400">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-neutral-400 block">Founder & Master Craftsman:</span>
                      <span className="font-bold text-white">{ownerName} (Kayz)</span>
                    </div>
                  </div>
                  <a
                    href={socials.facebookOwner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    <span>Owner Facebook</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <a
                  href={socials.facebookCompany.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-blue-400" />
                  <span>Facebook: {socials.facebookCompany.handle}</span>
                </a>

                <a
                  href={socials.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Instagram: {socials.instagram.handle}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Site Inspection Booking Form (lg:col-span-6) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-neutral-900/70 border border-neutral-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Schedule On-Site Measurement
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  We visit your property, verify screed levels, check moisture, and provide a binding written quotation.
                </p>
              </div>
              <Calendar className="w-6 h-6 text-amber-400 shrink-0" />
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">
                  Quotation Request Formatted!
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Your project specifications were generated. We also opened WhatsApp so you can send your details directly to Darlington Kanyandura.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-lg"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-neutral-300 mb-1">
                    Your Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mr. T. Chigumba"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white placeholder:text-neutral-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-neutral-300 mb-1">
                      Phone / WhatsApp Number:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0771624931"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white placeholder:text-neutral-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-300 mb-1">
                      Location in Zimbabwe:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Borrowdale, Harare"
                      value={bookingForm.location}
                      onChange={(e) => setBookingForm({ ...bookingForm, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white placeholder:text-neutral-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-neutral-300 mb-1">
                      Project Type:
                    </label>
                    <select
                      value={bookingForm.projectType}
                      onChange={(e) => setBookingForm({ ...bookingForm, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="Floor Tiling (Large Format Porcelain)">Floor Tiling (Large Format Porcelain)</option>
                      <option value="Luxury Bathroom & Curbless Shower">Luxury Bathroom & Curbless Shower</option>
                      <option value="Kitchen Splashback (Herringbone/Subway)">Kitchen Splashback (Herringbone/Subway)</option>
                      <option value="Verandah / Patio Exterior">Verandah / Patio Exterior</option>
                      <option value="Screeding & Leveling Prep">Screeding & Leveling Prep</option>
                      <option value="Commercial / Showroom">Commercial / Showroom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-300 mb-1">
                      Estimated Area (m²):
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 120"
                      value={bookingForm.estimatedAreaM2}
                      onChange={(e) => setBookingForm({ ...bookingForm, estimatedAreaM2: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white placeholder:text-neutral-500 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-neutral-300 mb-1">
                    Special Requests or Tile Details:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 1200x600 tiles purchased already, need screed leveling and 45-degree mitred cuts around bathtub niche..."
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-white placeholder:text-neutral-500 focus:border-amber-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs tracking-wide shadow-xl shadow-amber-500/20 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Quotation Request to WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
