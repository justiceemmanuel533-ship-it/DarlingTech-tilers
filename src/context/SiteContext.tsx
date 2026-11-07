import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData, initialSiteData, Testimonial, ReferenceProject, PhoneContact } from '../types/siteData';

interface SiteContextType {
  siteData: SiteData;
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  updateSiteData: (newData: Partial<SiteData>) => void;
  updatePhone: (id: string, updated: Partial<PhoneContact>) => void;
  updateTestimonial: (id: string, updated: Partial<Testimonial>) => void;
  addTestimonial: (t: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;
  updateReference: (id: string, updated: Partial<ReferenceProject>) => void;
  addReference: (r: Omit<ReferenceProject, 'id'>) => void;
  deleteReference: (id: string) => void;
  resetToDefaults: () => void;
  isAiChatOpen: boolean;
  setIsAiChatOpen: (val: boolean) => void;
  activeAiPrompt: string;
  setActiveAiPrompt: (prompt: string) => void;
}

const STORAGE_KEY = 'darlingtech_tilers_site_v1';

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure merged with initialSiteData in case new keys exist
        return { ...initialSiteData, ...parsed };
      }
    } catch (e) {
      console.warn('Could not read siteData from localStorage:', e);
    }
    return initialSiteData;
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const [activeAiPrompt, setActiveAiPrompt] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
    } catch (e) {
      console.error('Failed to save siteData to localStorage:', e);
    }
  }, [siteData]);

  const updateSiteData = (newData: Partial<SiteData>) => {
    setSiteData((prev) => ({ ...prev, ...newData }));
  };

  const updatePhone = (id: string, updated: Partial<PhoneContact>) => {
    setSiteData((prev) => ({
      ...prev,
      phones: prev.phones.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };

  const updateTestimonial = (id: string, updated: Partial<Testimonial>) => {
    setSiteData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    }));
  };

  const addTestimonial = (t: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = {
      ...t,
      id: `t-${Date.now()}`,
    };
    setSiteData((prev) => ({
      ...prev,
      testimonials: [newTestimonial, ...prev.testimonials],
    }));
  };

  const deleteTestimonial = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id),
    }));
  };

  const updateReference = (id: string, updated: Partial<ReferenceProject>) => {
    setSiteData((prev) => ({
      ...prev,
      references: prev.references.map((r) => (r.id === id ? { ...r, ...updated } : r)),
    }));
  };

  const addReference = (r: Omit<ReferenceProject, 'id'>) => {
    const newRef: ReferenceProject = {
      ...r,
      id: `ref-${Date.now()}`,
    };
    setSiteData((prev) => ({
      ...prev,
      references: [newRef, ...prev.references],
    }));
  };

  const deleteReference = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      references: prev.references.filter((r) => r.id !== id),
    }));
  };

  const resetToDefaults = () => {
    setSiteData(initialSiteData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <SiteContext.Provider
      value={{
        siteData,
        isEditMode,
        setIsEditMode,
        updateSiteData,
        updatePhone,
        updateTestimonial,
        addTestimonial,
        deleteTestimonial,
        updateReference,
        addReference,
        deleteReference,
        resetToDefaults,
        isAiChatOpen,
        setIsAiChatOpen,
        activeAiPrompt,
        setActiveAiPrompt,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
