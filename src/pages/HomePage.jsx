import React from 'react';
import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import CurriculumSection from '../components/home/CurriculumSection';
import EdTechSection from '../components/home/EdTechSection';
import FeeEstimator from '../components/home/FeeEstimator';
import QuickQuizWidget from '../components/home/QuickQuizWidget';
import ContactSection from '../components/home/ContactSection';

export default function HomePage() {
  return (
    <main className="space-y-0">
      <Hero />
      <AboutSection />
      <CurriculumSection />
      <EdTechSection />
      <FeeEstimator />
      <QuickQuizWidget />
      <ContactSection />
    </main>
  );
}
