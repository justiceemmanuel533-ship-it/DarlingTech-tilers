import React from 'react';
import { SiteProvider } from './context/SiteContext';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhatsAppChannelBanner } from './components/WhatsAppChannelBanner';
import { ServicesSection } from './components/ServicesSection';
import { ThreeTileStudio } from './components/ThreeTileStudio';
import { CraftsmanshipProcess } from './components/CraftsmanshipProcess';
import { ProjectsGallery } from './components/ProjectsGallery';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { TileCalculator } from './components/TileCalculator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ReferencesSection } from './components/ReferencesSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { GeminiChatbot } from './components/GeminiChatbot';
import { SiteEditorDrawer } from './components/SiteEditorDrawer';

export default function App() {
  return (
    <SiteProvider>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950 pb-16 md:pb-0">
        {/* Subtle Scroll Progress Indicator at Viewport Top */}
        <ScrollProgressBar />

        {/* Top Navigation Bar */}
        <Navbar />

        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* WhatsApp Channel & Facebook Follower Banner */}
          <WhatsAppChannelBanner />

          {/* Common Services Showcase (Floor, Wall, Bathroom, Kitchen, Patio, Screeding) */}
          <ServicesSection />

          {/* Interactive 3D Three.js PBR Studio (Zero Occlusion, Procedural Assets) */}
          <section id="studio-3d" className="py-20 bg-neutral-950 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div className="space-y-2 max-w-2xl">
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Real-Time 3D Surface Inspection
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    Interactive 3D Tiling Studio & Substrate Explorer
                  </h2>
                  <p className="text-sm text-neutral-400">
                    Test luxury porcelain finishes, simulate 45° mitred edge joints, and explode the substrate layers from concrete slab to tile.
                  </p>
                </div>

                <div className="text-xs text-neutral-400">
                  <span className="font-semibold text-white">Three.js PBR Engine</span> · Zero-Occlusion Controls
                </div>
              </div>

              {/* 3D Scene Viewport */}
              <ThreeTileStudio />
            </div>
          </section>

          {/* 5-Stage Precision Protocol & Warranty */}
          <CraftsmanshipProcess />

          {/* High Quality Work Photo Gallery with Captions */}
          <ProjectsGallery />

          {/* Before & After Interactive Comparison */}
          <BeforeAfterSlider />

          {/* Interactive Tile, Adhesive & Cost Estimator */}
          <TileCalculator />

          {/* Client Testimonials Section */}
          <TestimonialsSection />

          {/* Verifiable Project References Section */}
          <ReferencesSection />

          {/* Frequently Asked Questions */}
          <FaqSection />

          {/* Contact Section with Clickable Numbers & Social Hub */}
          <ContactSection />
        </main>

        {/* Quiet Modern Footer */}
        <Footer />

        {/* Mobile-Only Sticky Fast Contact Bar (<15% viewport height) */}
        <MobileQuickBar />

        {/* Gemini AI Tiling Consultant Chatbot (includes Gemini Live Voice API) */}
        <GeminiChatbot />

        {/* Live Website Content Management (CMS) Drawer */}
        <SiteEditorDrawer />
      </div>
    </SiteProvider>
  );
}
