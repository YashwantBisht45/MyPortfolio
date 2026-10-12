 import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowUpRight, X, CheckCircle, ShieldCheck, Cpu, Code2, AlertCircle } from 'lucide-react';
import { GithubIcon } from './Icons';

export function ProjectShowcase({ projects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null);

  // Close modal on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    if (selectedProject) { 
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <h3 className="text-xl font-medium tracking-tight text-zinc-100 flex items-center gap-2">
            <span>Featured Project</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
              Full-Stack Flagship
            </span>
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Production-grade accommodation booking web platform architected with Node.js, Express, MongoDB Atlas, and Cloudinary.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-5">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between"
          >
            <div>
              {/* Badge & Year */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                    project.statusType === 'research'
                      ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                      : project.statusType === 'active'
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500">{project.year}</span>
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-mono text-zinc-400 hover:text-zinc-100 flex items-center gap-1 transition-colors"
                  aria-label={`Open technical quick specs for ${project.title}`}
                >
                  Quick Specs <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              {/* Title */}
              <h4 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors flex items-center gap-2 mb-2">
                <span>{project.title}</span>
              </h4>

              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Verified Metrics Callout (e.g. 97.42% accuracy) */}
              {project.verifiedMetrics && (
                <div className="mb-4 p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{project.verifiedMetrics}</span>
                </div>
              )}
            </div>

            {/* Bottom: Tech Stack & Action Links */}
            <div className="pt-4 border-t border-zinc-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-mono bg-zinc-800/80 text-zinc-300 rounded border border-zinc-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2.5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium border border-emerald-500/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    aria-label={`Open Live Demo for ${project.title} (opens in new tab)`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-medium border border-zinc-700/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    aria-label={`View Source for ${project.title} on GitHub (opens in new tab)`}
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Source</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recruiter-Ready Quick Specs Modal Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-800 bg-[#121215] p-4 sm:p-7 shadow-2xl space-y-6 scrollbar-thin"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 rounded-lg text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                aria-label="Close project specifications modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header Badges */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-zinc-800 text-emerald-400 border border-zinc-700">
                    {selectedProject.badge}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">{selectedProject.year}</span>
                </div>
                <h3 id="modal-project-title" className="text-xl sm:text-2xl font-bold text-white">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Problem Statement */}
              {selectedProject.problemStatement && (
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                    Problem Statement
                  </h5>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {selectedProject.problemStatement}
                  </p>
                </div>
              )}

              {/* Architecture & Pipeline */}
              {selectedProject.architecture && (
                <div>
                  <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                    System Architecture & Pipeline
                  </h5>
                  <p className="text-xs font-mono text-zinc-300 leading-relaxed p-3 rounded-lg bg-zinc-950/70 border border-zinc-800/60">
                    {selectedProject.architecture}
                  </p>
                </div>
              )}

              {/* Key Features */}
              {selectedProject.features && selectedProject.features.length > 0 && (
                <div>
                  <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Key Technical Features
                  </h5>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                    {selectedProject.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Verified Metrics / Validation Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedProject.verifiedMetrics && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                      Verified Metrics
                    </span>
                    <span className="text-xs text-zinc-200 font-medium block">
                      {selectedProject.verifiedMetrics}
                    </span>
                  </div>
                )}

                {selectedProject.validationStatus && (
                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                      Validation Status
                    </span>
                    <span className="text-xs text-zinc-300 block">
                      {selectedProject.validationStatus}
                    </span>
                  </div>
                )}
              </div>

              {/* Technology Stack */}
              <div>
                <h5 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                  Technologies Used
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 text-xs font-mono bg-zinc-800 text-zinc-200 rounded-md border border-zinc-700/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-800">
                <div className="flex flex-wrap items-center gap-3">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium border border-emerald-500/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                      aria-label="Open Live Demo in a new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo ↗</span>
                    </a>
                  )}

                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white border border-zinc-700/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                      aria-label="View Source on GitHub in a new tab"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>View Source ↗</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
