import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, FileText } from 'lucide-react';
import { LinkedinIcon } from './Icons';

export function Navbar({ isSoundEnabled, onToggleSound, resumeUrl = "#", linkedinUrl = "https://www.linkedin.com/in/yashwant-bisht/" }) {
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: "Overview", href: "#hero", id: "hero" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Coding Activity", href: "#activity", id: "activity" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Academics", href: "#academics", id: "academics" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  // Scrollspy to highlight current section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center p-2 sm:p-4 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-zinc-800/90 bg-[#0c0c0e]/90 backdrop-blur-md shadow-lg shadow-black/50 text-xs max-w-[calc(100vw-1rem)] overflow-hidden"
      >
        {/* Navigation Items */}
        <div className="flex items-center gap-0.5 sm:gap-1.5 overflow-x-auto scrollbar-none min-w-0 flex-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`px-2 sm:px-3 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isActive
                    ? 'text-white bg-zinc-800/90 font-medium shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="h-4 w-px bg-zinc-800 mx-1 flex-shrink-0"></div>

        {/* Tactile Audio Mute Toggle */}
        <button
          onClick={onToggleSound}
          title={isSoundEnabled ? "Mute mechanical switch sounds" : "Enable mechanical switch sounds"}
          className={`p-1.5 rounded-full border transition-all duration-200 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
            isSoundEnabled
              ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20'
              : 'text-zinc-500 border-zinc-800 hover:text-zinc-300 hover:bg-zinc-800/50'
          }`}
          aria-label={isSoundEnabled ? "Disable tactile click sounds" : "Enable tactile click sounds"}
        >
          {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* LinkedIn Link */}
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="View LinkedIn Profile"
            aria-label="LinkedIn Profile (opens in a new tab)"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">LinkedIn</span>
          </a>
        )}

        {/* Resume Link */}
        <a
          href={resumeUrl || "/Yashwant_Bisht_Resume.pdf"}
          target="_blank"
          rel="noopener noreferrer"
          title="Open Yashwant Bisht's Resume (PDF)"
          aria-label="Open Yashwant Bisht's Resume in a new tab"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700/80 text-xs font-medium hover:bg-zinc-700 hover:text-white transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <FileText className="w-3 h-3 text-emerald-400" />
          <span>Resume</span>
        </a>
      </nav>
    </header>
  );
}
