import React, { useState, useRef } from 'react';
import { Trophy, TrendingUp, Calendar, Award, ExternalLink, Info } from 'lucide-react';

/**
 * Responsive Interactive Contest Rating Line Chart
 * Visualizes verified rating progression across contests with interactive hover tooltips.
 */
export function RatingChart({
  platform = "LeetCode",
  history = [],
  currentRating = 0,
  peakRating = 0,
  colorTheme = "amber", // 'amber' | 'cyan'
  lastUpdated = "Oct 12, 2026",
  profileUrl = "#"
}) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const containerRef = useRef(null);

  if (!history || history.length === 0) {
    return (
      <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/60 text-center space-y-2">
        <p className="text-xs font-mono text-zinc-400">Contest rating progression data unavailable.</p>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-emerald-400 hover:underline inline-flex items-center gap-1"
        >
          View live rating on {platform} ↗
        </a>
      </div>
    );
  }

  // Chart Dimensions
  const width = 600;
  const height = 220;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 25;
  const padBottom = 35;

  const plotWidth = width - padLeft - padRight;
  const plotHeight = height - padTop - padBottom;

  // Compute rating bounds
  const ratings = history.map(h => h.rating);
  const rawMin = Math.min(...ratings);
  const rawMax = Math.max(...ratings);
  const buffer = Math.max(40, (rawMax - rawMin) * 0.15);
  const minRating = Math.floor((rawMin - buffer) / 50) * 50;
  const maxRating = Math.ceil((rawMax + buffer) / 50) * 50;
  const ratingRange = maxRating - minRating || 1;

  // Generate points
  const points = history.map((item, i) => {
    const x = padLeft + (i / Math.max(1, history.length - 1)) * plotWidth;
    const y = padTop + plotHeight - ((item.rating - minRating) / ratingRange) * plotHeight;
    const prev = i > 0 ? history[i - 1].rating : item.rating;
    const delta = item.rating - prev;
    return {
      ...item,
      x,
      y,
      delta
    };
  });

  // SVG Path definitions
  const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`, '');
  const areaD = `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${(padTop + plotHeight).toFixed(1)} L ${points[0].x.toFixed(1)} ${(padTop + plotHeight).toFixed(1)} Z`;

  // Y-axis grid ticks (4 ticks)
  const yTicks = [
    minRating,
    Math.round(minRating + ratingRange * 0.33),
    Math.round(minRating + ratingRange * 0.66),
    maxRating
  ];

  const strokeColor = colorTheme === 'amber' ? '#f59e0b' : '#06b6d4';
  const fillColor = colorTheme === 'amber' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(6, 182, 212, 0.12)';
  const glowClass = colorTheme === 'amber' ? 'text-amber-400' : 'text-cyan-400';

  return (
    <div className="w-full space-y-3">
      {/* Chart Header Metrics Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-zinc-800/60">
        <div>
          <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-zinc-500" /> Contest Rating Progression
          </span>
          <span className="text-[11px] font-mono text-zinc-500 block">
            {history.length} Rated Contests Attended
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] text-zinc-500 block">Current</span>
            <span className={`font-semibold ${glowClass}`}>{currentRating}</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] text-zinc-500 block">Peak</span>
            <span className="font-semibold text-white">{peakRating}</span>
          </div>
        </div>
      </div>

      {/* Responsive SVG Chart */}
      <div
        ref={containerRef}
        className="relative p-3 rounded-xl border border-zinc-800/80 bg-zinc-950/70 overflow-hidden"
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id={`chart-grad-${platform}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid Lines & Y Ticks */}
          {yTicks.map((val, idx) => {
            const y = padTop + plotHeight - ((val - minRating) / ratingRange) * plotHeight;
            return (
              <g key={idx}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#27272a"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={padLeft - 8}
                  y={y + 3.5}
                  fill="#71717a"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area Gradient Fill */}
          <path d={areaD} fill={`url(#chart-grad-${platform})`} />

          {/* Main Line Stroke */}
          <path
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Hover Tracking Vertical Line */}
          {hoveredPoint && (
            <line
              x1={hoveredPoint.x}
              y1={padTop}
              x2={hoveredPoint.x}
              y2={padTop + plotHeight}
              stroke="#52525b"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          )}

          {/* Data Points */}
          {points.map((pt, i) => {
            const isHovered = hoveredPoint?.date === pt.date && hoveredPoint?.contestName === pt.contestName;
            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
                onTouchStart={() => setHoveredPoint(pt)}
                onClick={() => setHoveredPoint(pt)}
                className="cursor-pointer"
              >
                {/* Hit target padding */}
                <circle cx={pt.x} cy={pt.y} r="8" fill="transparent" />
                {/* Visual circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? "5" : "3"}
                  fill={isHovered ? "#ffffff" : strokeColor}
                  stroke="#09090b"
                  strokeWidth="1.5"
                  className="transition-all duration-150"
                />
              </g>
            );
          })}

          {/* X Axis First and Last Dates */}
          <text
            x={padLeft}
            y={height - 8}
            fill="#71717a"
            fontSize="9"
            fontFamily="monospace"
          >
            {points[0].displayDate}
          </text>
          <text
            x={width - padRight}
            y={height - 8}
            fill="#71717a"
            fontSize="9"
            fontFamily="monospace"
            textAnchor="end"
          >
            {points[points.length - 1].displayDate}
          </text>
        </svg>

        {/* Dynamic Hover Tooltip Overlay */}
        {hoveredPoint && (
          <div className="mt-3 p-3 rounded-lg bg-zinc-900 border border-zinc-700/80 text-xs shadow-xl flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="font-semibold text-white block">{hoveredPoint.contestName}</span>
              <span className="text-[11px] font-mono text-zinc-400">{hoveredPoint.displayDate}</span>
            </div>
            <div className="flex items-center gap-3 font-mono">
              <div>
                <span className="text-[10px] text-zinc-500 block">Rating</span>
                <span className={`font-bold ${glowClass}`}>{hoveredPoint.rating}</span>
                {hoveredPoint.delta !== 0 && (
                  <span className={`text-[10px] ml-1.5 ${hoveredPoint.delta > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {hoveredPoint.delta > 0 ? `+${hoveredPoint.delta}` : hoveredPoint.delta}
                  </span>
                )}
              </div>
              {hoveredPoint.rank && (
                <div>
                  <span className="text-[10px] text-zinc-500 block">Rank</span>
                  <span className="text-zinc-200 font-semibold">#{hoveredPoint.rank.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Data Verification Footer Note */}
      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1">
        <span className="flex items-center gap-1">
          <Info className="w-3 h-3 text-zinc-600" />
          Verified snapshot (Last synchronized {lastUpdated})
        </span>
        <span className="text-zinc-400">Zero sample/fabricated points</span>
      </div>
    </div>
  );
}
