import React from 'react';

export function SkillsSection({ skillCategories = [] }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-medium tracking-tight text-zinc-100 flex items-center gap-2">
          <span>Technical Competencies</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 font-mono">
            Full-Stack & Systems
          </span>
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          Programming languages, web frameworks, database systems, and core computer science fundamentals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillCategories.map((cat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 space-y-3"
          >
            <h4 className="text-sm font-semibold text-zinc-200 font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              {cat.category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-xs font-mono rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
