import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { ShieldCheck, Building, UserCheck, Calendar, MapPin, CheckCircle, Plus, Edit2, Trash2, ArrowUpRight } from 'lucide-react';
import { ReferenceProject } from '../types/siteData';

export const ReferencesSection: React.FC = () => {
  const { siteData, isEditMode, updateReference, addReference, deleteReference } = useSite();
  const { references } = siteData;
  const primaryPhone = siteData.phones[0];

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ReferenceProject>>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newForm, setNewForm] = useState({
    projectTitle: '',
    clientOrArchitect: '',
    role: 'Property Owner / Project Manager',
    location: 'Harare, Zimbabwe',
    scopeM2: 250,
    tileDetails: '',
    completionYear: '2026',
    highlight: '',
    status: 'Completed' as const,
  });

  const handleStartEdit = (ref: ReferenceProject) => {
    setEditingId(ref.id);
    setEditForm(ref);
  };

  const handleSaveEdit = (id: string) => {
    updateReference(id, editForm);
    setEditingId(null);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.projectTitle || !newForm.clientOrArchitect) return;
    addReference({
      projectTitle: newForm.projectTitle,
      clientOrArchitect: newForm.clientOrArchitect,
      role: newForm.role,
      location: newForm.location,
      scopeM2: Number(newForm.scopeM2) || 200,
      tileDetails: newForm.tileDetails || 'Porcelain Floor & Walls',
      completionYear: newForm.completionYear,
      highlight: newForm.highlight || 'Laser leveled and fully inspected.',
      status: newForm.status,
    });
    setShowAddModal(false);
  };

  return (
    <section id="references" className="py-20 bg-neutral-900/30 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Verifiable Contractor References
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Verified Project References & Architectural Partners
            </h2>
            <p className="text-sm text-neutral-400">
              We stand by our craftsmanship. Homeowners, lead architects, and developers are available for reference checks upon request prior to signing your contract.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isEditMode && (
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-lg transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Reference</span>
              </button>
            )}

            <a
              href={`https://wa.me/${primaryPhone.cleanNumber}?text=${encodeURIComponent(
                'Hi Darlington (Kayz)! I would like to request references and site verification for your previous tiling projects in Harare.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white font-semibold text-xs rounded-xl border border-neutral-700 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verify References on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* References Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {references.map((ref) => {
            const isEditing = editingId === ref.id;

            return (
              <div
                key={ref.id}
                className="rounded-2xl p-6 bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editForm.projectTitle || ''}
                      onChange={(e) => setEditForm({ ...editForm, projectTitle: e.target.value })}
                      className="w-full p-2 rounded bg-neutral-950 border border-neutral-700 text-xs text-white"
                      placeholder="Project Title"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={editForm.clientOrArchitect || ''}
                        onChange={(e) => setEditForm({ ...editForm, clientOrArchitect: e.target.value })}
                        className="w-full p-2 rounded bg-neutral-950 border border-neutral-700 text-xs text-white"
                        placeholder="Client or Architect"
                      />
                      <input
                        type="text"
                        value={editForm.role || ''}
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                        className="w-full p-2 rounded bg-neutral-950 border border-neutral-700 text-xs text-white"
                        placeholder="Role"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={editForm.location || ''}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        className="w-full p-2 rounded bg-neutral-950 border border-neutral-700 text-xs text-white"
                        placeholder="Location"
                      />
                      <input
                        type="number"
                        value={editForm.scopeM2 || 0}
                        onChange={(e) => setEditForm({ ...editForm, scopeM2: Number(e.target.value) })}
                        className="w-full p-2 rounded bg-neutral-950 border border-neutral-700 text-xs text-white"
                        placeholder="Scope (m²)"
                      />
                    </div>
                    <textarea
                      value={editForm.tileDetails || ''}
                      onChange={(e) => setEditForm({ ...editForm, tileDetails: e.target.value })}
                      className="w-full p-2 rounded bg-neutral-950 border border-neutral-700 text-xs text-white resize-none"
                      rows={2}
                      placeholder="Tile Specification Details"
                    />
                    <input
                      type="text"
                      value={editForm.highlight || ''}
                      onChange={(e) => setEditForm({ ...editForm, highlight: e.target.value })}
                      className="w-full p-2 rounded bg-neutral-950 border border-neutral-700 text-xs text-white"
                      placeholder="Technical Highlight"
                    />
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-3 py-1 text-xs text-neutral-400"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(ref.id)}
                        className="px-4 py-1 bg-amber-500 text-neutral-950 font-bold text-xs rounded"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {/* Top Bar: Title & Verification Status */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
                            <MapPin className="w-3.5 h-3.5 text-amber-500" />
                            <span>{ref.location}</span>
                            <span className="text-neutral-600">·</span>
                            <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                            <span>{ref.completionYear}</span>
                          </div>
                          <h3 className="text-base font-bold text-white">
                            {ref.projectTitle}
                          </h3>
                        </div>

                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-[11px] font-semibold text-emerald-400 shrink-0">
                          <CheckCircle className="w-3 h-3" />
                          <span>{ref.status}</span>
                        </span>
                      </div>

                      {/* Client / Architect Attribution */}
                      <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-amber-400 shrink-0" />
                          <div>
                            <span className="font-semibold text-white">{ref.clientOrArchitect}</span>
                            <span className="text-neutral-400 text-[11px] block">{ref.role}</span>
                          </div>
                        </div>
                        <span className="font-mono-numbers font-bold text-amber-400 px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                          {ref.scopeM2} m²
                        </span>
                      </div>

                      {/* Technical Specs */}
                      <div className="space-y-1.5 text-xs text-neutral-300">
                        <div className="font-medium text-white">Tile Specification:</div>
                        <p className="text-neutral-400 leading-relaxed">{ref.tileDetails}</p>
                      </div>

                      {/* Highlight */}
                      <div className="text-xs text-neutral-300 bg-neutral-900/90 p-2.5 rounded-lg border border-neutral-800/80">
                        <span className="text-amber-400 font-medium">Craftsmanship Highlight: </span>
                        {ref.highlight}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-5 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-neutral-400">
                        Reference contact available upon request
                      </span>

                      <div className="flex items-center gap-2">
                        {isEditMode && (
                          <>
                            <button
                              onClick={() => handleStartEdit(ref)}
                              className="p-1.5 text-neutral-400 hover:text-amber-400 rounded-lg hover:bg-neutral-800"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteReference(ref.id)}
                              className="p-1.5 text-neutral-400 hover:text-rose-400 rounded-lg hover:bg-neutral-800"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                        <a
                          href={`https://wa.me/${primaryPhone.cleanNumber}?text=${encodeURIComponent(
                            `Hi Kayz! I would like to request contact verification for reference: "${ref.projectTitle}".`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300"
                        >
                          <span>Request Verification</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Reference Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-neutral-900 rounded-2xl border border-neutral-700 p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Add Verifiable Project Reference</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Borrowdale Brooke Executive Villa"
                  value={newForm.projectTitle}
                  onChange={(e) => setNewForm({ ...newForm, projectTitle: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Client or Architect Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arch. M. Dube"
                    value={newForm.clientOrArchitect}
                    onChange={(e) => setNewForm({ ...newForm, clientOrArchitect: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lead Architect / Homeowner"
                    value={newForm.role}
                    onChange={(e) => setNewForm({ ...newForm, role: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Location in Zimbabwe
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Glen Lorne, Harare"
                    value={newForm.location}
                    onChange={(e) => setNewForm({ ...newForm, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Scope (m²)
                  </label>
                  <input
                    type="number"
                    value={newForm.scopeM2}
                    onChange={(e) => setNewForm({ ...newForm, scopeM2: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Tile Specification Details
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 1200x600mm High-Gloss Porcelain & 3 en-suites with mitred niches"
                  value={newForm.tileDetails}
                  onChange={(e) => setNewForm({ ...newForm, tileDetails: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Craftsmanship Highlight
                </label>
                <input
                  type="text"
                  placeholder="e.g. Zero lippage across 20m open hall, completed 3 days early"
                  value={newForm.highlight}
                  onChange={(e) => setNewForm({ ...newForm, highlight: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-700 text-xs text-white"
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
                  Save Reference
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
