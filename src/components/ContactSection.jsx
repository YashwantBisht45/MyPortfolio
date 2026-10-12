import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink, Code2, Trophy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export function ContactSection({ developerInfo = {} }) {
  const [copied, setCopied] = useState(false);

  const isEmailActive = developerInfo.isEmailConfigured && Boolean(developerInfo.email);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    if (!isEmailActive) return;
    navigator.clipboard.writeText(developerInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-medium tracking-tight text-zinc-100 flex items-center gap-2">
          <span>Get in Touch</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
            Open to Roles
          </span>
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          Feel free to connect for software development engineering opportunities, technical discussions, or collaborations.
        </p>
      </div>

      <div className="p-5 sm:p-6 md:p-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="min-w-0 max-w-full">
          <span className="text-xs font-mono text-zinc-500 block mb-1.5">Direct Communication</span>
          {isEmailActive ? (
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <a
                href={`mailto:${developerInfo.email}`}
                className="text-sm sm:text-base md:text-lg font-mono text-zinc-100 hover:text-emerald-400 transition-colors underline-offset-4 hover:underline flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md break-all"
                title={`Send email to ${developerInfo.email}`}
              >
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="break-all">{developerInfo.email}</span>
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded-lg border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-amber-400/80"></span>
              <span>Email Pending Configuration</span>
            </div>
          )}
          {copied && <span className="text-xs font-mono text-emerald-400 mt-1.5 block">Copied to clipboard!</span>}
        </div>

        {/* Verified Social Profile Icons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {developerInfo.socialLinks?.linkedin && (
            <a
              href={developerInfo.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile of Yashwant Bisht (opens in new tab)"
              className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          )}

          {developerInfo.socialLinks?.github && (
            <a
              href={developerInfo.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile of Yashwant Bisht (opens in new tab)"
              className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}

          {developerInfo.socialLinks?.leetcode && (
            <a
              href={developerInfo.socialLinks.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode profile of Yashwant Bisht (opens in new tab)"
              className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              title="LeetCode Profile"
            >
              <Code2 className="w-4 h-4" />
            </a>
          )}

          {developerInfo.socialLinks?.codechef && (
            <a
              href={developerInfo.socialLinks.codechef}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CodeChef profile of Yashwant Bisht (opens in new tab)"
              className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              title="CodeChef Profile"
            >
              <Trophy className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
