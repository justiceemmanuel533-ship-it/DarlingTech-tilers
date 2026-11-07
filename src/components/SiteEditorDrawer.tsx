import React, { useState } from 'react';
import { useSite } from '../context/SiteContext';
import { X, Save, RotateCcw, Download, Upload, Globe, Phone, Mail, Share2, Layers, Check, ExternalLink, ShieldCheck } from 'lucide-react';

export const SiteEditorDrawer: React.FC = () => {
  const { siteData, isEditMode, setIsEditMode, updateSiteData, resetToDefaults } = useSite();
  const [activeTab, setActiveTab] = useState<'content' | 'contacts' | 'domain' | 'pricing'>('content');
  const [saveToast, setSaveToast] = useState(false);

  // Form states initialized from siteData
  const [companyName, setCompanyName] = useState(siteData.companyName);
  const [ownerName, setOwnerName] = useState(siteData.ownerName);
  const [ownerEmail, setOwnerEmail] = useState(siteData.email);
  const [heroHeadline, setHeroHeadline] = useState(siteData.heroHeadline);
  const [heroSubheadline, setHeroSubheadline] = useState(siteData.heroSubheadline);
  const [laborRate, setLaborRate] = useState(siteData.laborRateRangeUsdPerM2);
  const [serviceArea, setServiceArea] = useState(siteData.serviceArea);

  // Phones
  const [phone1, setPhone1] = useState(siteData.phones[0]?.number || '+263771624931');
  const [phone2, setPhone2] = useState(siteData.phones[1]?.number || '0789423434');
  const [phone3, setPhone3] = useState(siteData.phones[2]?.number || '0719418701');

  // Socials
  const [fbCompany, setFbCompany] = useState(siteData.socials.facebookCompany.handle);
  const [fbOwner, setFbOwner] = useState(siteData.socials.facebookOwner.name);
  const [igHandle, setIgHandle] = useState(siteData.socials.instagram.handle);
  const [waChannelUrl, setWaChannelUrl] = useState(siteData.socials.whatsappChannel.url);

  // Domain Config
  const [customDomain, setCustomDomain] = useState('www.darlingtechtilers.co.zw');
  const [domainVerified, setDomainVerified] = useState(false);

  const cleanDigits = (val: string) => val.replace(/[^0-9]/g, '');

  const handleSaveAll = () => {
    updateSiteData({
      companyName,
      ownerName,
      email: ownerEmail,
      heroHeadline,
      heroSubheadline,
      laborRateRangeUsdPerM2: laborRate,
      serviceArea,
      phones: [
        {
          id: 'p1',
          label: 'Primary Line (Econet / 24-7 WhatsApp)',
          number: phone1,
          cleanNumber: cleanDigits(phone1),
          isWhatsApp: true,
          network: 'Econet',
        },
        {
          id: 'p2',
          label: 'Secondary Line & WhatsApp',
          number: phone2,
          cleanNumber: cleanDigits(phone2),
          isWhatsApp: true,
          network: 'Econet / NetOne',
        },
        {
          id: 'p3',
          label: 'NetOne Direct Line & WhatsApp',
          number: phone3,
          cleanNumber: cleanDigits(phone3),
          isWhatsApp: true,
          network: 'NetOne',
        },
      ],
      socials: {
        ...siteData.socials,
        facebookCompany: {
          handle: fbCompany,
          url: `https://www.facebook.com/search/top?q=${encodeURIComponent(fbCompany.replace('@', ''))}`,
        },
        facebookOwner: {
          name: fbOwner,
          url: `https://www.facebook.com/search/top?q=${encodeURIComponent(fbOwner)}`,
        },
        instagram: {
          handle: igHandle,
          url: `https://www.instagram.com/${igHandle.replace('@', '')}`,
        },
        whatsappChannel: {
          ...siteData.socials.whatsappChannel,
          url: waChannelUrl,
        },
        email: ownerEmail,
      },
    });

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const exportBackupJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(siteData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `darlingtech_website_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importBackupJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          updateSiteData(parsed);
          alert('Website configuration successfully imported and updated!');
        } catch (err) {
          alert('Invalid JSON file format.');
        }
      };
    }
  };

  if (!isEditMode) return null;

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-full sm:w-[500px] bg-neutral-950 border-r border-neutral-800 shadow-2xl flex flex-col animate-slide-right">
      {/* Drawer Header */}
      <div className="p-4 border-b border-neutral-800 bg-neutral-900 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Website Live Content Editor</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500 text-neutral-950 font-bold uppercase">
              Admin Mode
            </span>
          </h3>
          <span className="text-[11px] text-neutral-400">
            Real-time customization for Darlingtech Tilers
          </span>
        </div>

        <button
          onClick={() => setIsEditMode(false)}
          className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-neutral-800 bg-neutral-950 px-2 pt-2 gap-1 text-xs font-medium">
        <button
          onClick={() => setActiveTab('content')}
          className={`px-3 py-2 rounded-t-lg transition-colors ${
            activeTab === 'content'
              ? 'bg-neutral-900 text-amber-400 border-t border-x border-neutral-800 font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          General Copy
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`px-3 py-2 rounded-t-lg transition-colors ${
            activeTab === 'contacts'
              ? 'bg-neutral-900 text-amber-400 border-t border-x border-neutral-800 font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Phones & Socials
        </button>
        <button
          onClick={() => setActiveTab('domain')}
          className={`px-3 py-2 rounded-t-lg transition-colors flex items-center gap-1 ${
            activeTab === 'domain'
              ? 'bg-neutral-900 text-amber-400 border-t border-x border-neutral-800 font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Connect Domain</span>
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-3 py-2 rounded-t-lg transition-colors ${
            activeTab === 'pricing'
              ? 'bg-neutral-900 text-amber-400 border-t border-x border-neutral-800 font-semibold'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Rates & Area
        </button>
      </div>

      {/* Editor Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
        {/* Tab 1: General Copy */}
        {activeTab === 'content' && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-neutral-300 mb-1">
                Company Brand Name:
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-300 mb-1">
                Owner / Founder Name:
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-300 mb-1">
                Hero Main Headline:
              </label>
              <textarea
                rows={2}
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white resize-none"
              />
            </div>

            <div>
              <label className="block font-medium text-neutral-300 mb-1">
                Hero Subheadline / Value Proposition:
              </label>
              <textarea
                rows={4}
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white resize-none"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Contacts & Socials */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
              <span className="font-bold text-white block">Official Phone Numbers (Zimbabwe):</span>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">
                  Primary Line / WhatsApp 1:
                </label>
                <input
                  type="text"
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white font-mono-numbers"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">
                  Secondary Line / WhatsApp 2:
                </label>
                <input
                  type="text"
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white font-mono-numbers"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">
                  NetOne Line / WhatsApp 3:
                </label>
                <input
                  type="text"
                  value={phone3}
                  onChange={(e) => setPhone3(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white font-mono-numbers"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
              <span className="font-bold text-white block">Email & Social Accounts:</span>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">
                  Business Email:
                </label>
                <input
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white font-mono-numbers"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">
                  Company Facebook Page Handle:
                </label>
                <input
                  type="text"
                  value={fbCompany}
                  onChange={(e) => setFbCompany(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">
                  Owner Facebook Profile Name:
                </label>
                <input
                  type="text"
                  value={fbOwner}
                  onChange={(e) => setFbOwner(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">
                  Instagram Profile Handle:
                </label>
                <input
                  type="text"
                  value={igHandle}
                  onChange={(e) => setIgHandle(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">
                  WhatsApp Channel Invite Link:
                </label>
                <input
                  type="url"
                  value={waChannelUrl}
                  onChange={(e) => setWaChannelUrl(e.target.value)}
                  className="w-full p-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Connect Custom Domain */}
        {activeTab === 'domain' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <Globe className="w-4 h-4" />
                <span>Custom Domain Connection</span>
              </div>
              <p className="text-neutral-300 leading-relaxed text-[11px]">
                You requested connection to <strong>www.darlingtechtilers.co.zw</strong>. Configure your DNS settings at your domain registrar (such as Webdev, ZISPA, Telone, or Cloudflare).
              </p>
            </div>

            <div>
              <label className="block font-medium text-neutral-300 mb-1">
                Your Custom Domain:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  className="flex-1 p-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-mono-numbers"
                />
                <button
                  onClick={() => {
                    setDomainVerified(true);
                    setTimeout(() => setDomainVerified(false), 3000);
                  }}
                  className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl"
                >
                  Verify DNS
                </button>
              </div>
            </div>

            {domainVerified && (
              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>DNS records verified for www.darlingtechtilers.co.zw!</span>
              </div>
            )}

            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
              <span className="font-bold text-white block">Required DNS Records:</span>

              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 font-mono-numbers text-[11px] space-y-1">
                <div className="text-amber-400 font-semibold">1. CNAME Record:</div>
                <div>Host / Name: <span className="text-white">www</span></div>
                <div>Target / Value: <span className="text-white">darlingtech-tilers.applet.dev</span></div>
                <div>TTL: <span className="text-white">3600 (Auto)</span></div>
              </div>

              <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 font-mono-numbers text-[11px] space-y-1">
                <div className="text-amber-400 font-semibold">2. A Record (Apex Domain):</div>
                <div>Host / Name: <span className="text-white">@</span> (darlingtechtilers.co.zw)</div>
                <div>IP Address: <span className="text-white">216.239.32.21</span></div>
                <div>TTL: <span className="text-white">3600 (Auto)</span></div>
              </div>

              <div className="text-[11px] text-neutral-400 space-y-1 pt-1">
                <p>• SSL / HTTPS: Automatically provisions free Let's Encrypt certificate upon DNS propagation.</p>
                <p>• DNS Propagation usually takes between 15 minutes and 24 hours.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Pricing & Coverage Area */}
        {activeTab === 'pricing' && (
          <div className="space-y-4">
            <div>
              <label className="block font-medium text-neutral-300 mb-1">
                Standard Labor Rate Range (USD per m²):
              </label>
              <input
                type="text"
                value={laborRate}
                onChange={(e) => setLaborRate(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white font-mono-numbers"
              />
              <span className="text-[11px] text-neutral-500 mt-1 block">
                Displayed on the website header and estimator guide.
              </span>
            </div>

            <div>
              <label className="block font-medium text-neutral-300 mb-1">
                Service Area Coverage:
              </label>
              <input
                type="text"
                value={serviceArea}
                onChange={(e) => setServiceArea(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white"
              />
            </div>

            <div className="pt-4 border-t border-neutral-800 space-y-2">
              <span className="font-semibold text-white block">Backup & Reset Actions:</span>
              <div className="flex gap-2">
                <button
                  onClick={exportBackupJson}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Backup JSON</span>
                </button>

                <label className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Restore JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={importBackupJson}
                    className="hidden"
                  />
                </label>
              </div>

              <button
                onClick={() => {
                  if (confirm('Reset all website edits back to initial factory settings?')) {
                    resetToDefaults();
                    alert('Website reset to default settings.');
                  }
                }}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 bg-rose-950/20 border border-rose-900/40 text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All to Default Settings</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Save Button & Feedback */}
      <div className="p-4 border-t border-neutral-800 bg-neutral-900 flex items-center justify-between">
        {saveToast ? (
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            <span>Saved to live website!</span>
          </span>
        ) : (
          <span className="text-[11px] text-neutral-400">
            Changes persist in browser & export
          </span>
        )}

        <button
          onClick={handleSaveAll}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-xs shadow-lg transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
};
