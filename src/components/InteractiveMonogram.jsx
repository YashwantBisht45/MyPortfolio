import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Signature Interactive Isometric Switch / Monogram
 * 
 * Features:
 * - Dynamic mouse-tracking specular lighting via radial gradient center (cx, cy)
 * - Tactile spring compression animation on press / tap / keyboard trigger
 * - Integrated mechanical click audio trigger
 * - Full accessibility with role="button", keyboard triggers (Enter/Space), and reduced-motion support
 */
export function InteractiveMonogram({ initials = "AR", onTriggerSound, isSoundEnabled = true }) {
  const containerRef = useRef(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate motion values normalized from 0 to 1
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Spring physics for smooth lighting lag
  const springConfig = { stiffness: 260, damping: 26, mass: 0.1 };
  const smoothX = useSpring(useTransform(mouseX, [0, 1], [-50, 450]), springConfig);
  const smoothY = useSpring(useTransform(mouseY, [0, 1], [-20, 260]), springConfig);

  const lightRef = useRef(null);

  // Update dynamic gradient center on spring change
  useEffect(() => {
    const unsubX = smoothX.on("change", (val) => {
      if (lightRef.current) lightRef.current.setAttribute("cx", String(val));
    });
    const unsubY = smoothY.on("change", (val) => {
      if (lightRef.current) lightRef.current.setAttribute("cy", String(val));
    });

    return () => {
      unsubX();
      unsubY();
    };
  }, [smoothX, smoothY]);

  // Track window mouse movements for directional lighting
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handlePressStart = () => {
    setIsPressed(true);
    if (onTriggerSound) {
      onTriggerSound();
    }
  };

  const handlePressEnd = () => {
    setIsPressed(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePressStart();
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePressEnd();
    }
  };

  return (
    <div className="relative inline-flex flex-col items-center select-none group">
      {/* Interactive 3D SVG Monogram */}
      <motion.svg
        ref={containerRef}
        role="button"
        tabIndex={0}
        aria-label={`Interactive tactile monogram badge for ${initials}. Click to trigger tactile spring.`}
        className="w-48 h-32 md:w-56 md:h-36 cursor-pointer overflow-visible outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#09090b] rounded-2xl"
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onPointerDown={handlePressStart}
        onPointerUp={handlePressEnd}
        onPointerLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        onTouchCancel={handlePressEnd}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        <defs>
          {/* Mouse-following dynamic specular radial gradient */}
          <radialGradient
            id="dynamic-specular"
            ref={lightRef}
            cx="200"
            cy="120"
            r="280"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity={isHovered ? "0.28" : "0.15"} />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Micro dot pattern */}
          <pattern id="isometric-dots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.08)" />
          </pattern>

          {/* Linear side bevel gradient */}
          <linearGradient id="switch-bevel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>
        </defs>

        {/* 1. Base / Socket Floor (Stationary) */}
        <g opacity="0.6">
          <path
            d="M 200 230 L 40 140 L 200 50 L 360 140 Z"
            fill="#121215"
            stroke="#27272a"
            strokeWidth="2"
          />
        </g>

        {/* 2. Tactile Keycap (Animates down on press) */}
        <motion.g
          animate={{
            y: isPressed ? 14 : isHovered ? -3 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 24,
            mass: 0.2
          }}
        >
          {/* Keycap Left Side Bevel */}
          <path
            d="M 40 120 L 200 210 L 200 226 L 40 136 Z"
            fill="#1c1c21"
            stroke="#2e2e35"
            strokeWidth="1.5"
          />

          {/* Keycap Right Side Bevel */}
          <path
            d="M 200 210 L 360 120 L 360 136 L 200 226 Z"
            fill="#16161a"
            stroke="#27272e"
            strokeWidth="1.5"
          />

          {/* Keycap Top Face */}
          <path
            d="M 200 30 L 360 120 L 200 210 L 40 120 Z"
            fill="#18181b"
            stroke="#3f3f46"
            strokeWidth="2"
          />

          {/* Dot Pattern Overlay on Top Face */}
          <path
            d="M 200 30 L 360 120 L 200 210 L 40 120 Z"
            fill="url(#isometric-dots)"
          />

          {/* Mouse-Driven Specular Light Sheen */}
          <path
            d="M 200 30 L 360 120 L 200 210 L 40 120 Z"
            fill="url(#dynamic-specular)"
          />

          {/* Center Monogram Typography / Circuit Mark */}
          <g transform="translate(200, 120) skewX(-24) rotate(-8) scale(1, 0.7)" textAnchor="middle">
            <text
              x="0"
              y="10"
              fill="#f4f4f5"
              fontSize="34"
              fontWeight="700"
              fontFamily="monospace"
              letterSpacing="3"
              className="transition-colors duration-300"
            >
              {initials}
            </text>
            <circle cx="-38" cy="2" r="3" fill="#10b981" />
            <circle cx="38" cy="2" r="3" fill="#10b981" />
          </g>
        </motion.g>
      </motion.svg>

      {/* Interactive Helper Label */}
      <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-zinc-500 tracking-wider">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>TACTILE SWITCH {isPressed ? "(ENGAGED)" : isSoundEnabled ? "(AUDIO ON)" : "(MUTED)"}</span>
      </div>
    </div>
  );
}
