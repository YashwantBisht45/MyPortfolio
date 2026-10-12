import React from 'react';
import { GraduationCap, BookOpen, Building, CheckCircle2, Award } from 'lucide-react';
import { SemesterPerformanceChart } from './SemesterPerformanceChart';

export function EducationSection({ education = [] }) {
  const edu = education[0] || {};

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-medium tracking-tight text-zinc-100 flex items-center gap-2">
          <span>Academic Background & Performance</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 font-mono">
            Third-Year B.Tech. CSE (2024–2028)
          </span>
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          Computer Science and Engineering undergraduate curriculum at ABES Engineering College (AKTU), verified cumulative CGPA, and semester SGPAs.
        </p>
      </div>

      <div className="p-6 md:p-7 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 space-y-6">
        {/* Degree, Institution & University Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-zinc-800/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <h4 className="text-lg font-semibold text-zinc-100">
                {edu.degree} in {edu.branch}
              </h4>
            </div>
            <p className="text-sm font-medium text-zinc-300">
              {edu.institution}
            </p>
            <p className="text-xs font-mono text-zinc-400 mt-0.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-zinc-500" />
              Affiliated with {edu.university}
            </p>
          </div>
          <div className="text-left sm:text-right flex-shrink-0">
            <span className="text-xs font-mono text-zinc-300 block">{edu.period || "2024 – 2028"}</span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-1 inline-block">
              {edu.academicStatus || "Third-Year Student"}
            </span>
          </div>
        </div>

        {/* Confirmed Official Cumulative CGPA Card (Rebalanced full-width presentation) */}
        <div className="p-4 sm:p-5 rounded-xl bg-zinc-950/90 border border-emerald-500/30 relative overflow-hidden shadow-lg shadow-emerald-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-semibold">
                <Award className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                Official Cumulative CGPA (Semesters 1–4)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Confirmed
              </span>
            </div>
            <p className="text-xs font-mono text-zinc-400 leading-relaxed max-w-xl">
              {edu.officialCgpaNote || "Official credit-weighted cumulative CGPA evaluated through Semester 4 as per AKTU university grading."}
            </p>
          </div>

          <div className="flex items-baseline gap-2 sm:self-center self-start px-4 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 flex-shrink-0">
            <span className="text-3xl font-mono font-bold text-white tracking-tight">
              {edu.officialCgpa ? edu.officialCgpa.toFixed(2) : "7.86"}
            </span>
            <span className="text-sm font-mono text-zinc-400">/ 10.00</span>
          </div>
        </div>

        {/* Responsive Semester Performance Chart (0–10 Scale) */}
        <div className="pt-2">
          <SemesterPerformanceChart
            semesters={edu.semesters}
          />
        </div>

        {/* Core Undergraduate Coursework */}
        {edu.coursework && (
          <div className="pt-3 border-t border-zinc-800/60">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 mb-2.5">
              <BookOpen className="w-3.5 h-3.5 text-zinc-500" /> Core Undergraduate Coursework:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {edu.coursework.map((course, cIdx) => (
                <span
                  key={cIdx}
                  className="px-2.5 py-1 text-xs font-mono rounded-lg bg-zinc-800/70 text-zinc-300 border border-zinc-700/40"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
