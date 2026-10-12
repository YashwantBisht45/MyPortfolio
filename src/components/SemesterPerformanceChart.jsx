import React, { useState } from 'react';
import { TrendingUp, Info } from 'lucide-react';

/**
 * Semester Performance Chart (SGPA Progression)
 * Visualizes authentic semester SGPAs on a clearly labeled 0–10 academic scale.
 */
export function SemesterPerformanceChart({
  semesters = [
    { semester: "Sem 1", sgpa: 7.59, label: "Semester 1" },
    { semester: "Sem 2", sgpa: 8.59, label: "Semester 2" },
    { semester: "Sem 3", sgpa: 7.28, label: "Semester 3" },
    { semester: "Sem 4", sgpa: 8.09, label: "Semester 4" },
  ]
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // SVG Geometry
  const width = 560;
  const height = 240;
  const padLeft = 45;
  const padRight = 30;
  const padTop = 30;
  const padBottom = 45;

  const plotWidth = width - padLeft - padRight;
  const plotHeight = height - padTop - padBottom;

  // 0 to 10 Scale
  const minY = 0;
  const maxY = 10;

  const getY = (val) => padTop + plotHeight - ((val - minY) / (maxY - minY)) * plotHeight;
  const getX = (index) => padLeft + (index / (semesters.length - 1)) * plotWidth;

  // Points
  const points = semesters.map((s, idx) => ({
    ...s,
    x: getX(idx),
    y: getY(s.sgpa)
  }));

  const lineD = points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`, '');
  const areaD = `${lineD} L ${points[points.length - 1].x.toFixed(1)} ${(padTop + plotHeight).toFixed(1)} L ${points[0].x.toFixed(1)} ${(padTop + plotHeight).toFixed(1)} Z`;

  // Grid Ticks: 0, 2, 4, 6, 8, 10
  const yTicks = [0, 2, 4, 6, 8, 10];

  return (
    <div className="w-full space-y-3">
      {/* Chart Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-800/60">
        <div>
          <h4 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Semester-wise SGPA Progression</span>
          </h4>
          <p className="text-xs text-zinc-400 mt-0.5">
            Verified academic performance across completed terms (0.00 – 10.00 scale)
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono self-start sm:self-auto">
          <div className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] text-zinc-500 block">Peak SGPA</span>
            <span className="font-semibold text-emerald-400">8.59 (Sem 2)</span>
          </div>
        </div>
      </div>

      {/* Responsive SVG Canvas */}
      <div className="relative p-3 sm:p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/80 overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id="sgpa-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Gridlines & Y-Axis Labels (0 to 10 scale) */}
          {yTicks.map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#27272a"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                />
                <text
                  x={padLeft - 8}
                  y={y + 3.5}
                  fill="#71717a"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {val}.0
                </text>
              </g>
            );
          })}

          {/* Area Gradient Fill */}
          <path d={areaD} fill="url(#sgpa-area-grad)" />

          {/* Primary Trendline Stroke */}
          <path
            d={lineD}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points and Column Highlights */}
          {points.map((pt, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g
                key={pt.semester}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onTouchStart={() => setHoveredIndex(i)}
                onClick={() => setHoveredIndex(i)}
                className="cursor-pointer"
              >
                {/* Vertical hover guide */}
                {isHovered && (
                  <line
                    x1={pt.x}
                    y1={padTop}
                    x2={pt.x}
                    y2={padTop + plotHeight}
                    stroke="#3f3f46"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}

                {/* Touch/mouse hit area */}
                <circle cx={pt.x} cy={pt.y} r="14" fill="transparent" />

                {/* Outer halo */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? "7" : "4.5"}
                  fill="#09090b"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  className="transition-all duration-150"
                />

                {/* Center dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="2"
                  fill="#ffffff"
                />

                {/* Always-visible point value badge */}
                <g transform={`translate(${pt.x}, ${pt.y - 12})`}>
                  <rect
                    x="-18"
                    y="-12"
                    width="36"
                    height="15"
                    rx="4"
                    fill="#18181b"
                    stroke={isHovered ? "#10b981" : "#3f3f46"}
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="-2"
                    fill={isHovered ? "#34d399" : "#f4f4f5"}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    {pt.sgpa.toFixed(2)}
                  </text>
                </g>

                {/* X-Axis Semester Labels */}
                <text
                  x={pt.x}
                  y={height - 12}
                  fill={isHovered ? "#f4f4f5" : "#a1a1aa"}
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight={isHovered ? "600" : "400"}
                  textAnchor="middle"
                >
                  {pt.semester}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Dynamic Detail Overlay when hovering/tapping */}
        {hoveredIndex !== null && (
          <div className="mt-3 p-2.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-xs shadow-lg flex items-center justify-between">
            <span className="font-medium text-white">{points[hoveredIndex].label}</span>
            <div className="flex items-center gap-3 font-mono">
              <span className="text-zinc-400">SGPA: <strong className="text-emerald-400 text-sm">{points[hoveredIndex].sgpa}</strong> / 10.0</span>
              {points[hoveredIndex].sgpa === 8.59 && (
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">Peak Term</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footnote on Scale and Semesters 5–8 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-zinc-500 pt-1">
        <span className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
          Evaluated on standard 0.00 – 10.00 academic grading scale.
        </span>
        <span className="text-zinc-400">Semesters 5–8: In Progress / Upcoming</span>
      </div>
    </div>
  );
}
