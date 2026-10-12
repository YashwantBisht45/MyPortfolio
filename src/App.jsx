import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from './data/portfolioData';
import { useTactileSound } from './utils/useSound';
import { Navbar } from './components/Navbar';
import { InteractiveMonogram } from './components/InteractiveMonogram';
import { ProjectShowcase } from './components/ProjectShowcase';
import { CodingActivity } from './components/CodingActivity';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { GithubIcon, LinkedinIcon } from './components/Icons';
import { ArrowDown, Sparkles, Terminal, FileText, ExternalLink } from 'lucide-react';

export default function App() {
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('tactile_sound_enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const { playClick } = useTactileSound(isSoundEnabled);
  const { developerInfo, focusAreas, projects, skillCategories, education } = portfolioData;

  const toggleSound = () => {
    setIsSoundEnabled(prev => {
      const next = !prev;
      try {
        localStorage.setItem('tactile_sound_enabled', JSON.stringify(next));
      } catch {}
      if (next) {
        setTimeout(() => playClick(1.2), 50);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-emerald-500 selection:text-black">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none radial-spotlight z-0"></div>

      {/* Floating Header */}
      <Navbar
        isSoundEnabled={isSoundEnabled}
        onToggleSound={toggleSound}
        resumeUrl={developerInfo.socialLinks.resumeUrl}
        linkedinUrl={developerInfo.socialLinks.linkedin}
      />

      {/* Main Single-Column Editorial Layout */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-40 pb-32 border-x-0 sm:border-x border-zinc-800/60 w-full overflow-x-clip">
        {/* HERO SECTION */}
        <section id="hero" className="mb-24 md:mb-32 scroll-mt-28">
          <div className="flex flex-col items-start space-y-6">
            
            {/* Signature Interactive Switch / Monogram */}
            <div className="w-full flex justify-center py-4 mb-2">
              <InteractiveMonogram
                initials={developerInfo.initials}
                onTriggerSound={() => playClick(1.0)}
                isSoundEnabled={isSoundEnabled}
              />
            </div>

            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{developerInfo.academicStatus}</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white font-instrument leading-[1.1]">
                Hi, I'm <span className="text-zinc-100 font-normal">{developerInfo.name}</span>.
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
                {developerInfo.headline}
              </p>
            </div>

            {/* Bio Description */}
            <p className="text-sm md:text-base text-zinc-400/90 leading-relaxed max-w-2xl">
              {developerInfo.heroBio}
            </p>

            {/* Focus Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-2">
              {focusAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 text-xs space-y-1"
                >
                  <span className="font-semibold text-zinc-200 block">{area.title}</span>
                  <span className="text-zinc-400 leading-normal block">{area.description}</span>
                </div>
              ))}
            </div>

            {/* Hero Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href="#projects"
                onClick={() => playClick(1.1)}
                className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <span>View Project</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href="#activity"
                onClick={() => playClick(1.1)}
                className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Coding Heatmaps</span>
              </a>

              {developerInfo.socialLinks.linkedin && (
                <a
                  href={developerInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playClick(1.1)}
                  aria-label="LinkedIn Profile (opens in new tab)"
                  className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}

              <a
                href={developerInfo.socialLinks.resumeUrl || "/Yashwant_Bisht_Resume.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick(1.1)}
                className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 text-xs font-medium flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                title="View & Download Resume (PDF)"
                aria-label="Open Yashwant Bisht's Resume in a new tab"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resume</span>
              </a>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-28 scroll-mt-28">
          <ProjectShowcase projects={projects} />
        </section>

        {/* CODING ACTIVITY SECTION (Separate GitHub, LeetCode, CodeChef) */}
        <section id="activity" className="mb-28 scroll-mt-28">
          <CodingActivity
            developerInfo={developerInfo}
            platformSnapshots={portfolioData.platformSnapshots}
          />
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="mb-28 scroll-mt-28">
          <SkillsSection skillCategories={skillCategories} />
        </section>

        {/* EDUCATION & ACADEMICS SECTION */}
        <section id="academics" className="mb-28 scroll-mt-28">
          <EducationSection education={education} />
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="mb-20 scroll-mt-28">
          <ContactSection developerInfo={developerInfo} />
        </section>

        {/* FOOTER */}
        <footer className="pt-12 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} {developerInfo.name}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={developerInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile of Yashwant Bisht"
              className="text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
            >
              LinkedIn ↗
            </a>
            <a
              href={developerInfo.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile of Yashwant Bisht"
              className="text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
            >
              GitHub ↗
            </a>
            <a
              href={developerInfo.socialLinks.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode profile of Yashwant Bisht"
              className="text-zinc-400 hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:underline"
            >
              LeetCode ↗
            </a>
            <a
              href={developerInfo.socialLinks.codechef}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CodeChef profile of Yashwant Bisht"
              className="text-zinc-400 hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:underline"
            >
              CodeChef ↗
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
