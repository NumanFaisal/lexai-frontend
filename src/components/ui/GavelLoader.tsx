'use client';

import { useId } from "react";

interface GavelLoaderProps {
  isThinking?: boolean;
}

export default function GavelLoader({ isThinking = true }: GavelLoaderProps) {
  const uniqueId = useId().replace(/:/g, "");

  return (
    <div className="gl-wrapper">
      {/* 3D WOOD/METAL GAVEL STRIKE — high-quality vector rendering */}
      <svg
        className="gl-svg"
        viewBox="-3 -3 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          .gl-arm {
            transform-origin: 34px 34px;
            animation: gl-strike 0.9s cubic-bezier(0.36,0.07,0.19,0.97) infinite;
          }
          @keyframes gl-strike {
            0%   { transform: rotate(-42deg); }
            38%  { transform: rotate(10deg); }
            50%  { transform: rotate(12deg); }
            55%  { transform: rotate(8deg); }
            65%  { transform: rotate(10deg); }
            100% { transform: rotate(-60deg); }
          }

          .gl-block-top {
            transform-origin: 9px 37px;
            animation: gl-bump 0.9s cubic-bezier(0.36,0.07,0.19,0.97) infinite;
          }
          @keyframes gl-bump {
            0%,36%,58%,100% { transform: translateY(0) scaleY(1); }
            41%             { transform: translateY(1.4px) scaleY(0.94); }
            47%             { transform: translateY(0.3px) scaleY(0.98); }
          }

          .gl-ground {
            transform-origin: 9px 42.5px;
            animation: gl-ground 0.9s cubic-bezier(0.36,0.07,0.19,0.97) infinite;
          }
          @keyframes gl-ground {
            0%,36%,58%,100% { opacity: 0.32; transform: scaleX(1); }
            41%             { opacity: 0.46; transform: scaleX(1.08); }
          }

          .gl-flash {
            transform-origin: 19.5px 34.5px;
            opacity: 0;
            animation: gl-flash 0.9s cubic-bezier(0.36,0.07,0.19,0.97) infinite;
          }
          @keyframes gl-flash {
            0%,35%  { opacity: 0;    transform: scale(0.3); }
            40%     { opacity: 0.95; transform: scale(1); }
            48%     { opacity: 0.5; transform: scale(1.25); }
            60%,100%{ opacity: 0;    transform: scale(1.5); }
          }

          .gl-ring {
            transform-origin: 4px 33px;
            animation: gl-ripple 0.9s ease-out infinite;
          }
          .gl-ring2 { animation-delay: 0.1s; }
          @keyframes gl-ripple {
            0%,35% { opacity: 0;    transform: scale(0.4) scaleY(0.3); }
            42%    { opacity: 0.85; }
            100%   { opacity: 0;    transform: scale(1.6) scaleY(0.3); }
          }
        `}</style>

        <defs>
          {/* handle: 3D wood gradient */}
          <linearGradient id={`handleGrad-${uniqueId}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1b0f08" />
            <stop offset="25%" stopColor="#3d2314" />
            <stop offset="50%" stopColor="#8c4b2b" />
            <stop offset="70%" stopColor="#dca875" />
            <stop offset="85%" stopColor="#522b18" />
            <stop offset="100%" stopColor="#120a05" />
          </linearGradient>

          {/* mallet head body wood gradient */}
          <linearGradient id={`headGrad-${uniqueId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a0f08" />
            <stop offset="25%" stopColor="#3d2314" />
            <stop offset="50%" stopColor="#8c4b2b" />
            <stop offset="70%" stopColor="#dca875" />
            <stop offset="85%" stopColor="#522b18" />
            <stop offset="100%" stopColor="#120a05" />
          </linearGradient>

          {/* gold metallic reflection gradient */}
          <linearGradient id={`goldGrad-${uniqueId}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3d2c0b" />
            <stop offset="20%" stopColor="#a67c32" />
            <stop offset="40%" stopColor="#fae5a5" />
            <stop offset="60%" stopColor="#f0cb67" />
            <stop offset="80%" stopColor="#9c7328" />
            <stop offset="100%" stopColor="#2e2005" />
          </linearGradient>

          {/* round end-cap face of the cylinder */}
          <radialGradient id={`capGrad-${uniqueId}`} cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ffe9ad" />
            <stop offset="50%" stopColor="#b58d3d" />
            <stop offset="100%" stopColor="#3a2707" />
          </radialGradient>

          {/* sound block side wall */}
          <linearGradient id={`blockSide-${uniqueId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a250e" />
            <stop offset="50%" stopColor="#2b1405" />
            <stop offset="100%" stopColor="#0f0500" />
          </linearGradient>

          {/* sound block top face */}
          <radialGradient id={`blockTop-${uniqueId}`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#a3693c" />
            <stop offset="60%" stopColor="#593117" />
            <stop offset="95%" stopColor="#2b1405" />
            <stop offset="100%" stopColor="#120701" />
          </radialGradient>

          {/* impact flash */}
          <radialGradient id={`flashGrad-${uniqueId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="30%" stopColor="#ffe89e" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#ffaa00" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffaa00" stopOpacity="0" />
          </radialGradient>

          <filter id={`liftShadow-${uniqueId}`} x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="1.3" stdDeviation="0.9" floodColor="#000000" floodOpacity="0.55" />
          </filter>
          <filter id={`groundBlur-${uniqueId}`} x="-80%" y="-200%" width="260%" height="500%">
            <feGaussianBlur stdDeviation="1" />
          </filter>
        </defs>

        {/* ambient ground shadow */}
        <ellipse className="gl-ground" cx="9" cy="42.5" rx="9.5" ry="1.6" fill="#000000" opacity="0.32" filter={`url(#groundBlur-${uniqueId})`} />

        {/* impact flash */}
        <circle className="gl-flash" cx="19.5" cy="34.5" r="5.5" fill={`url(#flashGrad-${uniqueId})`} />

        {/* sound ripple rings */}
        <ellipse className="gl-ring" cx="4" cy="33" rx="9" ry="1.8" fill="none" stroke="#f0cb67" strokeWidth="0.9" opacity="0" />
        <ellipse className="gl-ring gl-ring2" cx="4" cy="33" rx="14" ry="2.6" fill="none" stroke="#f0cb67" strokeWidth="0.6" opacity="0" />

        {/* sound block — double-beveled wood and gold disc */}
        <g className="gl-block-top">
          {/* Gold Base Rim */}
          <ellipse cx="9" cy="39" rx="8" ry="2.8" fill={`url(#goldGrad-${uniqueId})`} />
          <path d="M 1,39 A 8,2.8 0 0,0 17,39 L 17,40 A 8,2.8 0 0,1 1,40 Z" fill={`url(#goldGrad-${uniqueId})`} />

          {/* Sound Block Wood Side */}
          <rect x="1" y="34" width="16" height="5" rx="1" fill={`url(#blockSide-${uniqueId})`} />

          {/* Sound Block Wood Top */}
          <ellipse cx="9" cy="34" rx="8" ry="2.8" fill={`url(#blockTop-${uniqueId})`} />

          {/* Wear rings */}
          <ellipse cx="9" cy="34" rx="5" ry="1.7" fill="none" stroke="#1d1006" strokeWidth="0.35" opacity="0.45" />
          <ellipse cx="9" cy="34" rx="3.5" ry="1.2" fill="none" stroke="#ffe89e" strokeWidth="0.25" opacity="0.2" />
        </g>
        <rect x="2.5" y="40" width="12" height="3" rx="1" fill="#160d05" />

        {/* gavel: head + collar + handle, pivoting around (34, 34) */}
        <g className="gl-arm" filter={`url(#liftShadow-${uniqueId})`}>
          {/* handle - contoured wood */}
          <path d="M 31.5,15
                   C 31,18 31.5,21 32,24
                   C 32.5,27 32,30 32,33
                   C 32,36 31.2,38 31.2,39
                   L 35.8,39
                   C 35.8,38 35,36 35,33
                   C 35,30 34.5,27 35,24
                   C 35.5,21 36,18 35.5,15
                   Z" fill={`url(#handleGrad-${uniqueId})`} />

          {/* handle specular gloss strip */}
          <path d="M 33.5,15 L 33.5,39" stroke="#ffffff" strokeWidth="0.3" opacity="0.15" />

          {/* Gold rings on handle */}
          <rect x="31.8" y="20" width="3.4" height="1" rx="0.3" fill={`url(#goldGrad-${uniqueId})`} />
          <rect x="32" y="32" width="3" height="1" rx="0.3" fill={`url(#goldGrad-${uniqueId})`} />

          {/* gold collar */}
          <rect x="29.3" y="13.2" width="8.4" height="3.2" rx="1" fill={`url(#goldGrad-${uniqueId})`} />

          {/* mallet head wood body */}
          <rect x="24.5" y="6.5" width="19" height="10" rx="1.2" fill={`url(#headGrad-${uniqueId})`} />

          {/* gold head bands */}
          <rect x="26.2" y="6.5" width="1.8" height="10" fill={`url(#goldGrad-${uniqueId})`} />
          <rect x="39" y="6.5" width="1.8" height="10" fill={`url(#goldGrad-${uniqueId})`} />

          {/* ridge lines */}
          <line x1="25.5" y1="6.5" x2="25.5" y2="16.5" stroke="#120701" strokeWidth="0.3" opacity="0.6" />
          <line x1="41.5" y1="6.5" x2="41.5" y2="16.5" stroke="#120701" strokeWidth="0.3" opacity="0.6" />

          {/* specular highlight */}
          <rect x="25.5" y="7.5" width="16" height="1" rx="0.5" fill="#ffffff" opacity="0.35" />

          {/* cylinder end caps */}
          <ellipse cx="24.5" cy="11.5" rx="1.2" ry="5" fill={`url(#capGrad-${uniqueId})`} />
          <ellipse cx="43.5" cy="11.5" rx="1.2" ry="5" fill={`url(#capGrad-${uniqueId})`} />
        </g>
      </svg>

      <style>{`
        .gl-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .gl-svg {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          display: block;
          transform: scaleX(-1);
        }
      `}</style>
    </div>
  );
}
