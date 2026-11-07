import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { Star, Quote, Plus, Trash2, Edit2, Check, MapPin } from 'lucide-react';
import { Testimonial } from '../types/siteData';

export const TestimonialsSection: React.FC = () => {
  const { siteData, isEditMode, updateTestimonial, addTestimonial, deleteTestimonial } = useSite();
  const { testimonials } = siteData;

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Testimonial>>({});
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newForm, setNewForm] = useState({
    clientName: '',
    initials: '',
    location: 'Harare, Zimbabwe',
    rating: 5,
    projectType: '',
    quote: '',
    date: 'Recent Handover',
  });

  const handleStartEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setEditForm(t);
  };

  const handleSaveEdit = (id: string) => {
    updateTestimonial(id, editForm);
    setEditingId(null);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.clientName || !newForm.quote) return;
    addTestimonial({
      clientName: newForm.clientName,
      initials: newForm.initials || newForm.clientName.substring(0, 2).toUpperCase(),
      location: newForm.location,
      rating: newForm.rating,
      projectType: newForm.projectType || 'Residential Tiling',
      quote: newForm.quote,
      date: newForm.date,
    });
    setShowAddModal(false);
    setNewForm({
      clientName: '',
      initials: '',
      location: 'Harare, Zimbabwe',
      rating: 5,
      projectType: '',
      quote: '',
      date: 'Recent Handover',
    });
  };

  return (
    <section id="testimonials" className="py-20 bg-neutral-950 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Verified Client Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              What Homeowners & Engineers Say About Darlingtech Tilers
            </h2>
            <p className="text-sm text-neutral-400">
              Unfiltered reviews from property owners and site managers across Borrowdale Brooke, Glen Lorne, and Mt Pleasant.
            </p>
          </div>

          {/* Add Testimonial in Edit Mode */}
          {isEditMode && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Customer Testimonial</span>
            </button>
          )}
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => {
            const isEditing = editingId === t.id;

            return (
              <div
                key={t.id}
                className="relative rounded-2xl p-7 bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Quote Icon & Stars */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-700'
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-neutral-700" />
                  </div>

                  {/* Quote Body */}
                  {isEditing ? (
                    <div className="space-y-3 mb-4">
                      <textarea
                        value={editForm.quote || ''}
                        onChange={(e) => setEditForm({ ...editForm, quote: e.target.value })}
                        className="w-full p-3 rounded-lg bg-neutral-950 border border-neutral-700 text-xs text-white resize-none"
                        rows={5}
                      />
                      <input
                        type="text"
                        value={editForm.projectType || ''}
                        onChange={(e) => setEditForm({ ...editForm, projectType: e.target.value })}
                        placeholder="Project Type"
                        className="w-full p-2 rounded-lg bg-neutral-950 border border-neutral-700 text-xs text-white"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-neutral-200 leading-relaxed italic mb-4">
                        "{t.quote}"
                      </p>
                      <div className="text-xs text-amber-400/90 font-medium mb-6">
                        Project: {t.projectType}
                      </div>
                    </>
                  )}
                </div>

                {/* Footer / Author Identity */}
                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  {isEditing ? (
                    <div className="w-full space-y-2">
                      <input
                        type="text"
                        value={editForm.clientName || ''}
                        onChange={(e) => setEditForm({ ...editForm, clientName: e.target.value })}
                        placeholder="Client Name or Initials"
                        className="w-full p-1.5 rounded bg-neutral-950 border border-neutral-700 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={editForm.location || ''}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        placeholder="Location"
                        className="w-full p-1.5 rounded bg-neutral-950 border border-neutral-700 text-xs text-white"
                      />
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveEdit(t.id)}
                          className="px-3 py-1 bg-amber-500 text-neutral-950 font-bold text-xs rounded"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      {/* Avatar with Initials */}
                      <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-xs text-amber-400 shrink-0">
                        {t.initials || t.clientName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          {t.clientName}
                        </div>
                        <div className="text-xs text-neutral-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-neutral-500" />
                          <span>{t.location}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Edit / Delete Buttons in Edit Mode */}
                  {isEditMode && !isEditing && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleStartEdit(t)}
                        className="p-1.5 text-neutral-400 hover:text-amber-400 rounded-lg hover:bg-neutral-800 transition-colors"
                        title="Edit Testimonial"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteTestimonial(t.id)}
                        className="p-1.5 text-neutral-400 hover:text-rose-400 rounded-lg hover:bg-neutral-800 transition-colors"
                        title="Delete Testimonial"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Testimonial Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-neutral-900 rounded-2xl border border-neutral-700 p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Add Customer Testimonial</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Customer Name or Initials
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mr. T. Chigumba or T.C."
                  value={newForm.clientName}
                  onChange={(e) => setNewForm({ ...newForm, clientName: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Initials (Avatar)
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    placeholder="e.g. TC"
                    value={newForm.initials}
                    onChange={(e) => setNewForm({ ...newForm, initials: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Location in Zimbabwe
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Borrowdale Brooke, Harare"
                    value={newForm.location}
                    onChange={(e) => setNewForm({ ...newForm, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Project Type
                </label>
                <input
                  type="text"
                  placeholder="e.g. 300m² Porcelain & En-Suite Bathrooms"
                  value={newForm.projectType}
                  onChange={(e) => setNewForm({ ...newForm, projectType: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Client Quote
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write the customer's feedback on Darlingtech Tilers..."
                  value={newForm.quote}
                  onChange={(e) => setNewForm({ ...newForm, quote: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
