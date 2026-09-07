import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollProgressBar } from './components/animations/ScrollProgressBar';
import { ScrollytellingExperience } from './components/animations/ScrollytellingExperience';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('kindy_portfolio_lang');
    return saved === 'en' || saved === 'id' ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('kindy_portfolio_lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'id' : 'en'));
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black font-sans relative">
      {/* Real-time Scroll Progress Bar & HUD Telemetry */}
      <ScrollProgressBar />

      {/* Top Navigation Bar */}
      <Navbar lang={lang} onToggleLang={toggleLanguage} />

      {/* Full-Page Anime.js Style 3D Scrollytelling Experience */}
      <main className="flex-grow">
        <ScrollytellingExperience lang={lang} />
      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default App;
