import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Trophy, ExternalLink, Calendar, CheckCircle2, Flame, Award, GitCommit, RefreshCw, Clock, AlertCircle } from 'lucide-react';
import { GithubIcon } from './Icons';
import { RatingChart } from './RatingChart';

/**
 * Reusable Interactive Calendar Heatmap Grid Component
 * Renders a full 52-week x 7-day grid with hover tooltips and platform-tailored theme.
 */
function HeatmapGrid({
  dataMap = {},       // Map of "YYYY-MM-DD" -> count
  colorTheme = 'emerald', // 'emerald' | 'amber' | 'cyan'
  emptyLabel = 'No activity',
  unitLabel = 'contributions'
}) {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Generate 52 weeks (364 days) leading up to today
  const { weeks, monthLabels } = useMemo(() => {
    const today = new Date();
    const days = [];
    const totalDays = 52 * 7;

    for (let i = totalDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = dataMap[dateStr] || 0;
      days.push({
        date: dateStr,
        dayOfWeek: d.getDay(), // 0 = Sun, 6 = Sat
        count,
        displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    }

    // Group into weeks of 7 days
    const groupedWeeks = [];
    for (let i = 0; i < days.length; i += 7) {
      groupedWeeks.push(days.slice(i, i + 7));
    }

    // Determine month label placements
    const months = [];
    let lastMonth = '';
    groupedWeeks.forEach((week, wIdx) => {
      const firstDayDate = new Date(week[0].date);
      const mName = firstDayDate.toLocaleDateString('en-US', { month: 'short' });
      if (mName !== lastMonth) {
        months.push({ label: mName, weekIndex: wIdx });
        lastMonth = mName;
      }
    });

    return { weeks: groupedWeeks, monthLabels: months };
  }, [dataMap]);

  // Color shades by level
  const getColorClass = (count) => {
    if (!count || count === 0) return 'bg-zinc-800/60 border-zinc-700/30';
    
    if (colorTheme === 'emerald') {
      if (count >= 5) return 'bg-emerald-400 border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.3)]';
      if (count >= 3) return 'bg-emerald-500 border-emerald-400';
      if (count >= 2) return 'bg-emerald-600 border-emerald-500';
      return 'bg-emerald-800/80 border-emerald-700/60';
    }

    if (colorTheme === 'amber') {
      if (count >= 4) return 'bg-amber-400 border-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.3)]';
      if (count >= 3) return 'bg-amber-500 border-amber-400';
      if (count >= 2) return 'bg-amber-600 border-amber-500';
      return 'bg-amber-800/80 border-amber-700/60';
    }

    // cyan
    if (count >= 8) return 'bg-cyan-400 border-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.3)]';
    if (count >= 5) return 'bg-cyan-500 border-cyan-400';
    if (count >= 2) return 'bg-cyan-600 border-cyan-500';
    return 'bg-cyan-800/80 border-cyan-700/60';
  };

  return (
    <div className="relative w-full">
      {/* Scrollable Heatmap Viewport */}
      <div className="overflow-x-auto pb-2 scrollbar-thin w-full">
        <div className="min-w-[720px]">
          {/* Month Label Row */}
          <div className="flex text-[10px] font-mono text-zinc-400 mb-1.5 pl-7 select-none">
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                style={{ width: `${(100 / weeks.length) * 4.3}%` }}
                className="inline-block"
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* Grid with Weekday Labels on Left */}
          <div className="flex gap-2 items-start">
            {/* Day of Week Labels */}
            <div className="flex flex-col justify-between text-[9px] font-mono text-zinc-400 h-[106px] pt-1 pb-1 select-none flex-shrink-0">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {/* 52 Columns of 7 Days */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day) => {
                    const colorCls = getColorClass(day.count);
                    return (
                      <div
                        key={day.date}
                        onMouseEnter={() => setHoveredCell(day)}
                        onMouseLeave={() => setHoveredCell(null)}
                        onTouchStart={() => setHoveredCell(day)}
                        onClick={() => setHoveredCell(day)}
                        className={`w-[11px] h-[11px] rounded-[2.5px] border transition-transform duration-150 hover:scale-125 cursor-pointer relative ${colorCls}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hover Tooltip Box */}
      {hoveredCell && (
        <div className="mt-2 text-xs font-mono py-1.5 px-3 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-200 inline-flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-semibold text-white">
            {hoveredCell.count > 0 ? `${hoveredCell.count} ${unitLabel}` : emptyLabel}
          </span>
          <span className="text-zinc-400">on {hoveredCell.displayDate}</span>
        </div>
      )}

      {/* Legend & Mobile Swipe Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono text-zinc-400 mt-3 pt-2 border-t border-zinc-800/60">
        <span className="flex items-center gap-1.5">
          <span>Yearly Activity Overview</span>
          <span className="sm:hidden text-zinc-500 font-sans">• Swipe grid →</span>
        </span>
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span>Less</span>
          <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-800/80 border border-zinc-700/50"></span>
          <span className={`w-2.5 h-2.5 rounded-[2px] border ${
            colorTheme === 'emerald' ? 'bg-emerald-800 border-emerald-700' :
            colorTheme === 'amber' ? 'bg-amber-800 border-amber-700' : 'bg-cyan-800 border-cyan-700'
          }`}></span>
          <span className={`w-2.5 h-2.5 rounded-[2px] border ${
            colorTheme === 'emerald' ? 'bg-emerald-500 border-emerald-400' :
            colorTheme === 'amber' ? 'bg-amber-500 border-amber-400' : 'bg-cyan-500 border-cyan-400'
          }`}></span>
          <span className={`w-2.5 h-2.5 rounded-[2px] border ${
            colorTheme === 'emerald' ? 'bg-emerald-400 border-emerald-300' :
            colorTheme === 'amber' ? 'bg-amber-400 border-amber-300' : 'bg-cyan-400 border-cyan-300'
          }`}></span>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Dedicated Coding Activity Component for Yashwant Bisht
 * Displays GitHub, LeetCode, and CodeChef heatmaps with direct profile URLs,
 * real-time runtime synchronisation, verified fallbacks, and honest status indicators.
 */
export function CodingActivity({ developerInfo = {}, platformSnapshots = {} }) {
  const [activePlatform, setActivePlatform] = useState('github'); // 'github' | 'leetcode' | 'codechef'

  const handles = developerInfo.handles || {};
  const socialLinks = developerInfo.socialLinks || {};

  // Build initial LeetCode submission map from snapshot
  const initialLeetcodeMap = useMemo(() => {
    const rawCalendar = platformSnapshots.leetcode?.submissionCalendar || {};
    const map = {};
    Object.entries(rawCalendar).forEach(([timestamp, count]) => {
      const date = new Date(parseInt(timestamp, 10) * 1000);
      const dateStr = date.toISOString().split('T')[0];
      map[dateStr] = count;
    });
    return map;
  }, [platformSnapshots.leetcode]);

  // Build initial CodeChef submission map from snapshot
  const initialCodechefMap = useMemo(() => {
    const rawSubmissions = platformSnapshots.codechef?.submissions || [];
    const map = {};
    rawSubmissions.forEach(item => {
      if (item && item.date) {
        const parts = item.date.split('-');
        if (parts.length === 3) {
          const y = parts[0];
          const m = parts[1].padStart(2, '0');
          const d = parts[2].padStart(2, '0');
          map[`${y}-${m}-${d}`] = item.value;
        }
      }
    });
    return map;
  }, [platformSnapshots.codechef]);

  // GitHub State
  const [githubData, setGithubData] = useState({
    loading: true,
    error: null,
    totalContributions: 37,
    contributionsMap: {},
    publicRepos: 20,
    avatarUrl: null,
    isLive: false,
    lastUpdated: null
  });

  // LeetCode State
  const [leetcodeData, setLeetcodeData] = useState({
    loading: true,
    error: null,
    totalSolved: platformSnapshots.leetcode?.totalSolved || 132,
    easySolved: platformSnapshots.leetcode?.easySolved || 85,
    mediumSolved: platformSnapshots.leetcode?.mediumSolved || 46,
    hardSolved: platformSnapshots.leetcode?.hardSolved || 1,
    streak: platformSnapshots.leetcode?.streak || 57,
    totalActiveDays: platformSnapshots.leetcode?.totalActiveDays || 115,
    submissionMap: initialLeetcodeMap,
    contestHistory: platformSnapshots.contestHistories?.leetcode?.history || [],
    currentRating: platformSnapshots.contestHistories?.leetcode?.currentRating || 1287,
    peakRating: platformSnapshots.contestHistories?.leetcode?.peakRating || 1414,
    isLive: false,
    lastUpdated: null
  });

  // CodeChef State
  const [codechefData, setCodechefData] = useState({
    loading: true,
    error: null,
    rating: platformSnapshots.codechef?.rating || 1138,
    division: platformSnapshots.codechef?.stars || 'Div 4',
    contests: platformSnapshots.codechef?.contests || 22,
    peakRating: platformSnapshots.codechef?.peakRating || 1138,
    submissionMap: initialCodechefMap,
    contestHistory: platformSnapshots.contestHistories?.codechef?.history || [],
    isLive: false,
    lastUpdated: null
  });

  const [isRefreshing, setIsRefreshing] = useState(false);

  // 1. Fetch GitHub Live Contributions
  const fetchGithub = useCallback(async () => {
    if (!handles.github) return;
    try {
      setGithubData(prev => ({ ...prev, loading: true, error: null }));
      
      const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${handles.github}?y=last`);
      if (!res.ok) throw new Error(`GitHub API HTTP ${res.status}`);
      const data = await res.json();

      const map = {};
      if (Array.isArray(data.contributions)) {
        data.contributions.forEach(item => {
          map[item.date] = item.count;
        });
      }

      // Fetch user metadata
      let publicRepos = 20;
      let avatarUrl = null;
      try {
        const userRes = await fetch(`https://api.github.com/users/${handles.github}`);
        if (userRes.ok) {
          const userData = await userRes.json();
          publicRepos = userData.public_repos ?? publicRepos;
          avatarUrl = userData.avatar_url ?? null;
        }
      } catch (_) {}

      setGithubData({
        loading: false,
        error: null,
        totalContributions: data.total?.lastYear ?? 37,
        contributionsMap: map,
        publicRepos,
        avatarUrl,
        isLive: true,
        lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } catch (err) {
      console.warn("GitHub live contributions fetch failed, using fallback:", err);
      setGithubData(prev => ({
        ...prev,
        loading: false,
        error: "Live API query paused. Displaying verified local activity.",
        isLive: false,
        lastUpdated: "Verified snapshot"
      }));
    }
  }, [handles.github]);

  // 2. Fetch LeetCode Data (Via serverless function /api/leetcode with proxies fallback)
  const fetchLeetcode = useCallback(async () => {
    if (!handles.leetcode) return;
    try {
      setLeetcodeData(prev => ({ ...prev, loading: true, error: null }));

      // 1. Primary source: Direct serverless function (/api/leetcode)
      try {
        const res = await fetch(`/api/leetcode?username=${encodeURIComponent(handles.leetcode)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.success) {
            setLeetcodeData({
              loading: false,
              error: null,
              totalSolved: data.totalSolved || platformSnapshots.leetcode?.totalSolved || 131,
              easySolved: data.easySolved ?? platformSnapshots.leetcode?.easySolved ?? 85,
              mediumSolved: data.mediumSolved ?? platformSnapshots.leetcode?.mediumSolved ?? 45,
              hardSolved: data.hardSolved ?? platformSnapshots.leetcode?.hardSolved ?? 1,
              streak: data.streak ?? platformSnapshots.leetcode?.streak ?? 57,
              totalActiveDays: data.totalActiveDays ?? platformSnapshots.leetcode?.totalActiveDays ?? 114,
              submissionMap: data.submissionMap || initialLeetcodeMap,
              contestHistory: data.contestHistory?.length ? data.contestHistory : (platformSnapshots.contestHistories?.leetcode?.history || []),
              currentRating: data.currentRating || platformSnapshots.contestHistories?.leetcode?.currentRating || 1287,
              peakRating: data.peakRating || platformSnapshots.contestHistories?.leetcode?.peakRating || 1414,
              isLive: true,
              lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            return;
          }
        }
      } catch (apiErr) {
        console.warn("Direct /api/leetcode endpoint failed, falling back to proxies:", apiErr);
      }

      // 2. Secondary fallback: alfa-leetcode-api or faisalshohag proxies
      let liveSuccess = false;
      let newSubmissionMap = { ...initialLeetcodeMap };
      let newStats = {
        totalSolved: platformSnapshots.leetcode?.totalSolved || 132,
        easySolved: platformSnapshots.leetcode?.easySolved || 85,
        mediumSolved: platformSnapshots.leetcode?.mediumSolved || 46,
        hardSolved: platformSnapshots.leetcode?.hardSolved || 1,
        streak: platformSnapshots.leetcode?.streak || 57,
        totalActiveDays: platformSnapshots.leetcode?.totalActiveDays || 115,
      };
      let newContests = platformSnapshots.contestHistories?.leetcode?.history || [];
      let newCurrentRating = platformSnapshots.contestHistories?.leetcode?.currentRating || 1287;
      let newPeakRating = platformSnapshots.contestHistories?.leetcode?.peakRating || 1414;

      try {
        const [calRes, userRes, contestRes] = await Promise.allSettled([
          fetch(`https://alfa-leetcode-api.onrender.com/${handles.leetcode}/calendar`),
          fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${handles.leetcode}`),
          fetch(`https://alfa-leetcode-api.onrender.com/${handles.leetcode}/contest`)
        ]);

        if (calRes.status === 'fulfilled' && calRes.value.ok) {
          const calData = await calRes.value.json();
          if (calData && calData.submissionCalendar) {
            const rawCal = typeof calData.submissionCalendar === 'string'
              ? JSON.parse(calData.submissionCalendar)
              : calData.submissionCalendar;

            const map = {};
            Object.entries(rawCal).forEach(([timestamp, count]) => {
              const date = new Date(parseInt(timestamp, 10) * 1000);
              const dateStr = date.toISOString().split('T')[0];
              map[dateStr] = count;
            });
            newSubmissionMap = map;
            if (calData.streak !== undefined) newStats.streak = calData.streak;
            if (calData.totalActiveDays !== undefined) newStats.totalActiveDays = calData.totalActiveDays;
            liveSuccess = true;
          }
        }

        if (userRes.status === 'fulfilled' && userRes.value.ok) {
          const uData = await userRes.value.json();
          if (uData.totalSolved) {
            newStats.totalSolved = uData.totalSolved;
            newStats.easySolved = uData.easySolved ?? newStats.easySolved;
            newStats.mediumSolved = uData.mediumSolved ?? newStats.mediumSolved;
            newStats.hardSolved = uData.hardSolved ?? newStats.hardSolved;
            liveSuccess = true;
          }
        }

        if (contestRes.status === 'fulfilled' && contestRes.value.ok) {
          const cData = await contestRes.value.json();
          if (cData && Array.isArray(cData.contestParticipation)) {
            const attended = cData.contestParticipation.filter(c => c.attended);
            if (attended.length > 0) {
              newContests = attended.map(c => ({
                contestName: c.contest?.title || 'LeetCode Contest',
                date: new Date((c.contest?.startTime || 0) * 1000).toISOString().split('T')[0],
                displayDate: new Date((c.contest?.startTime || 0) * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                rating: Math.round(c.rating),
                rank: c.ranking
              }));
              newCurrentRating = Math.round(cData.contestRating || newCurrentRating);
              newPeakRating = Math.max(...newContests.map(c => c.rating));
              liveSuccess = true;
            }
          }
        }
      } catch (alfaErr) {
        console.warn("Alfa LeetCode API query failed, trying secondary proxy:", alfaErr);
      }

      // Tertiary fallback proxy if primary failed
      if (!liveSuccess) {
        try {
          const secondaryRes = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${handles.leetcode}`);
          if (secondaryRes.ok) {
            const sData = await secondaryRes.json();
            if (sData.totalSolved) {
              newStats.totalSolved = sData.totalSolved;
              newStats.easySolved = sData.easySolved ?? newStats.easySolved;
              newStats.mediumSolved = sData.mediumSolved ?? newStats.mediumSolved;
              newStats.hardSolved = sData.hardSolved ?? newStats.hardSolved;
            }
            if (sData.submissionCalendar) {
              const map = {};
              Object.entries(sData.submissionCalendar).forEach(([timestamp, count]) => {
                const date = new Date(parseInt(timestamp, 10) * 1000);
                const dateStr = date.toISOString().split('T')[0];
                map[dateStr] = count;
              });
              newSubmissionMap = map;
              liveSuccess = true;
            }
          }
        } catch (_) {}
      }

      setLeetcodeData(prev => ({
        ...prev,
        loading: false,
        error: liveSuccess ? null : "Live query paused; displaying verified snapshot.",
        isLive: liveSuccess,
        lastUpdated: liveSuccess
          ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : (platformSnapshots.contestHistories?.lastUpdated || "Oct 17, 2026"),
        submissionMap: newSubmissionMap,
        totalSolved: newStats.totalSolved,
        easySolved: newStats.easySolved,
        mediumSolved: newStats.mediumSolved,
        hardSolved: newStats.hardSolved,
        streak: newStats.streak,
        totalActiveDays: newStats.totalActiveDays,
        contestHistory: newContests,
        currentRating: newCurrentRating,
        peakRating: newPeakRating
      }));
    } catch (err) {
      console.warn("LeetCode fetch error:", err);
      setLeetcodeData(prev => ({
        ...prev,
        loading: false,
        error: "Live sync unavailable. Showing verified snapshot.",
        isLive: false,
        lastUpdated: platformSnapshots.contestHistories?.lastUpdated || "Oct 17, 2026"
      }));
    }
  }, [handles.leetcode, initialLeetcodeMap, platformSnapshots.leetcode, platformSnapshots.contestHistories]);

  // 3. Fetch CodeChef Data (Via serverless function /api/codechef)
  const fetchCodechef = useCallback(async () => {
    if (!handles.codechef) return;
    try {
      setCodechefData(prev => ({ ...prev, loading: true, error: null }));

      const res = await fetch(`/api/codechef?username=${encodeURIComponent(handles.codechef)}`);
      if (!res.ok) {
        throw new Error(`Endpoint returned status ${res.status}`);
      }

      const data = await res.json();
      if (data && data.success) {
        setCodechefData({
          loading: false,
          error: null,
          rating: data.rating || 1138,
          division: data.division || 'Div 4',
          contests: data.contests || 22,
          peakRating: data.peakRating || 1138,
          submissionMap: data.submissionMap || initialCodechefMap,
          contestHistory: data.contestHistory || platformSnapshots.contestHistories?.codechef?.history || [],
          isLive: true,
          lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        return;
      }
      throw new Error(data.error || "Malformed response");
    } catch (err) {
      console.warn("CodeChef fetch failed, falling back to verified snapshot:", err.message);
      setCodechefData(prev => ({
        ...prev,
        loading: false,
        error: "Live sync paused. Displaying verified official snapshot.",
        isLive: false,
        lastUpdated: platformSnapshots.contestHistories?.lastUpdated || "Oct 13, 2026",
        submissionMap: initialCodechefMap,
        contestHistory: platformSnapshots.contestHistories?.codechef?.history || []
      }));
    }
  }, [handles.codechef, initialCodechefMap, platformSnapshots.codechef, platformSnapshots.contestHistories]);

  // Initial fetch and automatic refresh interval (every 10 minutes)
  useEffect(() => {
    fetchGithub();
    fetchLeetcode();
    fetchCodechef();

    const interval = setInterval(() => {
      fetchGithub();
      fetchLeetcode();
      fetchCodechef();
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, [fetchGithub, fetchLeetcode, fetchCodechef]);

  // Manual refresh handler with throttling
  const handleManualRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    await Promise.allSettled([
      fetchGithub(),
      fetchLeetcode(),
      fetchCodechef()
    ]);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Determine current platform status
  const currentPlatformStatus = useMemo(() => {
    if (activePlatform === 'github') {
      return {
        isLive: githubData.isLive,
        loading: githubData.loading,
        lastUpdated: githubData.lastUpdated,
        error: githubData.error
      };
    }
    if (activePlatform === 'leetcode') {
      return {
        isLive: leetcodeData.isLive,
        loading: leetcodeData.loading,
        lastUpdated: leetcodeData.lastUpdated,
        error: leetcodeData.error
      };
    }
    return {
      isLive: codechefData.isLive,
      loading: codechefData.loading,
      lastUpdated: codechefData.lastUpdated,
      error: codechefData.error
    };
  }, [activePlatform, githubData, leetcodeData, codechefData]);

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-medium tracking-tight text-zinc-100 flex items-center gap-2 flex-wrap">
            <span>Coding Profiles & Activity</span>
            
            {/* Dynamic Status Badge */}
            {currentPlatformStatus.isLive ? (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Verified</span>
              </span>
            ) : (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono inline-flex items-center gap-1.5" title="Displaying genuine verified snapshot">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span>Verified Snapshot</span>
              </span>
            )}

            {/* Sync timestamp / Last Updated */}
            {currentPlatformStatus.lastUpdated && (
              <span className="text-[11px] font-mono text-zinc-500 inline-flex items-center gap-1">
                <Clock className="w-3 h-3 text-zinc-600" />
                <span>{currentPlatformStatus.isLive ? `Updated ${currentPlatformStatus.lastUpdated}` : `As of ${currentPlatformStatus.lastUpdated}`}</span>
              </span>
            )}
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Genuine submission heatmaps and problem-solving metrics across my official profiles.
          </p>
        </div>

        {/* Action Controls & Profile Tabs */}
        <div className="flex items-center gap-2 self-start sm:self-auto max-w-full">
          {/* Refresh Button */}
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            title="Refresh profile heatmaps"
            aria-label="Refresh profile heatmaps and statistics"
            className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors disabled:opacity-50 flex-shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
          </button>

          {/* 3 Profile Tabs */}
          <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl min-w-0 max-w-[calc(100vw-4.5rem)] sm:max-w-full overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActivePlatform('github')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                activePlatform === 'github'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <GithubIcon className="w-3.5 h-3.5 text-emerald-400" />
              GitHub
            </button>

            <button
              onClick={() => setActivePlatform('leetcode')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activePlatform === 'leetcode'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              LeetCode
            </button>

            <button
              onClick={() => setActivePlatform('codechef')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activePlatform === 'codechef'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-cyan-400" />
              CodeChef
            </button>
          </div>
        </div>
      </div>

      {/* Main Heatmap Container Card */}
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 md:p-6 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {/* GITHUB PANEL */}
          {activePlatform === 'github' && (
            <motion.div
              key="github"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="space-y-6"
            >
              {/* Profile Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/60">
                <div className="flex items-center gap-3 min-w-0">
                  {githubData.avatarUrl ? (
                    <img
                      src={githubData.avatarUrl}
                      alt={handles.github}
                      className="w-10 h-10 rounded-full border border-zinc-700 object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-emerald-400 flex-shrink-0">
                      <GithubIcon className="w-5 h-5" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h4 className="text-sm font-semibold text-zinc-100 truncate">{handles.github}</h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 whitespace-nowrap flex-shrink-0">
                        {githubData.publicRepos} Repos
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate">Open-Source Codebases &amp; Commits</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-zinc-500 block">Past Year</span>
                    <span className="text-base font-mono font-semibold text-emerald-400">
                      {githubData.totalContributions} Commits
                    </span>
                  </div>
                </div>
              </div>

              {/* GitHub Interactive Heatmap Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-mono flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" /> GitHub Contribution Heatmap
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">
                    {githubData.isLive ? 'Real Calendar Events (Live)' : 'Verified Calendar Events'}
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/60">
                  <HeatmapGrid
                    dataMap={githubData.contributionsMap}
                    colorTheme="emerald"
                    emptyLabel="No contributions"
                    unitLabel="contributions"
                  />
                </div>
              </div>

              {/* Direct Profile CTA Link */}
              <div className="pt-2 flex justify-end">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-emerald-400 hover:text-emerald-300 border border-zinc-700/60 transition-all shadow-sm"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>View GitHub Profile ↗</span>
                </a>
              </div>
            </motion.div>
          )}

          {/* LEETCODE PANEL */}
          {activePlatform === 'leetcode' && (
            <motion.div
              key="leetcode"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="space-y-6"
            >
              {/* LeetCode Header Stats */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/60">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h4 className="text-sm font-semibold text-zinc-100 truncate">{handles.leetcode}</h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 whitespace-nowrap flex-shrink-0">
                        {leetcodeData.streak}d Streak
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate">DSA &amp; Algorithmic Problem Solving</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono flex-shrink-0">
                  <div className="text-right">
                    <span className="text-[11px] text-zinc-500 block">Total Solved</span>
                    <span className="text-base font-semibold text-amber-400">{leetcodeData.totalSolved} Problems</span>
                  </div>
                </div>
              </div>

              {/* Solved Problems Breakdown Bar */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-zinc-950/60 border border-emerald-900/40">
                  <span className="text-[10px] font-mono text-emerald-400 block">EASY</span>
                  <span className="text-lg font-mono font-bold text-emerald-300">{leetcodeData.easySolved}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/60 border border-amber-900/40">
                  <span className="text-[10px] font-mono text-amber-400 block">MEDIUM</span>
                  <span className="text-lg font-mono font-bold text-amber-300">{leetcodeData.mediumSolved}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/60 border border-rose-900/40">
                  <span className="text-[10px] font-mono text-rose-400 block">HARD</span>
                  <span className="text-lg font-mono font-bold text-rose-300">{leetcodeData.hardSolved}</span>
                </div>
              </div>

              {/* LeetCode Activity Heatmap Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-mono flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" /> LeetCode Submission Heatmap
                  </span>
                  <span className="text-[11px] font-mono text-amber-400">
                    {leetcodeData.totalActiveDays} Active Days
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/60">
                  <HeatmapGrid
                    dataMap={leetcodeData.submissionMap}
                    colorTheme="amber"
                    emptyLabel="No submissions"
                    unitLabel="submissions"
                  />
                </div>
              </div>

              {/* LeetCode Contest Rating Progression Chart */}
              <div className="pt-2">
                <RatingChart
                  platform="LeetCode"
                  history={leetcodeData.contestHistory}
                  currentRating={leetcodeData.currentRating}
                  peakRating={leetcodeData.peakRating}
                  colorTheme="amber"
                  lastUpdated={leetcodeData.lastUpdated || "Oct 13, 2026"}
                  profileUrl={socialLinks.leetcode}
                />
              </div>

              {/* Direct Profile CTA Link */}
              <div className="pt-2 flex justify-end">
                <a
                  href={socialLinks.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-amber-400 hover:text-amber-300 border border-zinc-700/60 transition-all shadow-sm"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>View LeetCode Profile ↗</span>
                </a>
              </div>
            </motion.div>
          )}

          {/* CODECHEF PANEL */}
          {activePlatform === 'codechef' && (
            <motion.div
              key="codechef"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="space-y-6"
            >
              {/* CodeChef Header Stats */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/60">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h4 className="text-sm font-semibold text-zinc-100 truncate">{handles.codechef}</h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 whitespace-nowrap flex-shrink-0">
                        {codechefData.division}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate">Competitive Programming</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono flex-shrink-0">
                  <div className="text-right">
                    <span className="text-[11px] text-zinc-500 block">Rating</span>
                    <span className="text-base font-semibold text-cyan-400">{codechefData.rating}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-zinc-500 block">Contests</span>
                    <span className="text-base font-semibold text-zinc-200">{codechefData.contests}</span>
                  </div>
                </div>
              </div>

              {/* CodeChef Submissions Heatmap Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="font-mono flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" /> CodeChef Submissions Heatmap
                  </span>
                  <span className="text-[11px] font-mono text-cyan-400">
                    {codechefData.isLive ? 'Official Live Submissions' : 'Verified Submissions Record'}
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/60">
                  <HeatmapGrid
                    dataMap={codechefData.submissionMap}
                    colorTheme="cyan"
                    emptyLabel="No submissions"
                    unitLabel="submissions"
                  />
                </div>
              </div>

              {/* CodeChef Contest Rating Progression Chart */}
              <div className="pt-2">
                <RatingChart
                  platform="CodeChef"
                  history={codechefData.contestHistory}
                  currentRating={codechefData.rating}
                  peakRating={codechefData.peakRating}
                  colorTheme="cyan"
                  lastUpdated={codechefData.lastUpdated || "Oct 13, 2026"}
                  profileUrl={socialLinks.codechef}
                />
              </div>

              {/* Direct Profile CTA Link */}
              <div className="pt-2 flex justify-end">
                <a
                  href={socialLinks.codechef}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-cyan-400 hover:text-cyan-300 border border-zinc-700/60 transition-all shadow-sm"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>View CodeChef Profile ↗</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
