"use client";

import React from "react";

export default function ProductIllustration({ sku, className = "w-full h-full" }) {
  // Common stroke color represents polished brass / navy accents
  const strokeColor = "currentColor";
  const goldColor = "#D4AF37";

  switch (sku) {
    case "AJ-BR-001": // Kerala Nilavilakku
      return (
        <svg viewBox="0 0 100 100" className={`${className} text-primary-navy`} fill="none">
          {/* Base pedestal */}
          <ellipse cx="50" cy="85" rx="22" ry="5" stroke={strokeColor} strokeWidth="2" />
          <ellipse cx="50" cy="81" rx="17" ry="4" stroke={strokeColor} strokeWidth="1.5" />
          <path d="M46 81 L48 76 L52 76 L54 81 Z" stroke={strokeColor} strokeWidth="2" />
          
          {/* Stem */}
          <path d="M48 76 C48 60 47 50 48 42 C48 40 52 40 52 42 C53 50 52 60 52 76" stroke={strokeColor} strokeWidth="2" />
          {/* Stem decorative rings */}
          <ellipse cx="50" cy="65" rx="3.5" ry="1.5" stroke={strokeColor} strokeWidth="2" fill="white" />
          <ellipse cx="50" cy="52" rx="3.5" ry="1.5" stroke={strokeColor} strokeWidth="2" fill="white" />

          {/* Oil bowl */}
          <path d="M28 42 C28 42 34 50 50 50 C66 50 72 42 72 42" stroke={strokeColor} strokeWidth="2" />
          <ellipse cx="50" cy="42" rx="22" ry="4" stroke={strokeColor} strokeWidth="1.5" fill="#F7F5F0" />
          <ellipse cx="50" cy="42" rx="14" ry="2.5" stroke={strokeColor} strokeWidth="1" />

          {/* Top finial / crown */}
          <path d="M48 38 C47 34 47 28 50 25 C53 28 53 34 52 38 Z" stroke={strokeColor} strokeWidth="1.5" fill="white" />
          
          {/* Glowing Flame */}
          <path d="M50 23 C48 18 50 10 50 10 C50 10 52 18 50 23 Z" fill={goldColor} stroke={goldColor} strokeWidth="1" />
          <circle cx="50" cy="18" r="6" fill={goldColor} className="opacity-25 blur-xs" />
        </svg>
      );

    case "AJ-BR-002": // Ashtamangalya Pooja Set
      return (
        <svg viewBox="0 0 100 100" className={`${className} text-primary-navy`} fill="none">
          {/* Circular brass plate */}
          <ellipse cx="50" cy="65" rx="36" ry="15" stroke={strokeColor} strokeWidth="2" fill="#F7F5F0" />
          <ellipse cx="50" cy="65" rx="32" ry="13" stroke={strokeColor} strokeWidth="1" />
          <ellipse cx="50" cy="65" rx="28" ry="11" stroke={strokeColor} strokeWidth="1" />

          {/* Valkannadi (Handheld metal mirror) in center */}
          <g transform="translate(0, -6)">
            {/* Mirror handle */}
            <line x1="50" y1="52" x2="50" y2="70" stroke={strokeColor} strokeWidth="2.5" />
            <circle cx="50" cy="72" r="2.5" fill={goldColor} />
            {/* Mirror frame */}
            <circle cx="50" cy="40" r="12" stroke={strokeColor} strokeWidth="2" fill="white" />
            <circle cx="50" cy="40" r="9" stroke={goldColor} strokeWidth="1.5" />
            {/* Decorative crown on mirror */}
            <path d="M46 29 L50 24 L54 29 Z" fill={strokeColor} />
          </g>

          {/* Small Para (measuring cup) on left */}
          <path d="M26 62 L28 72 L34 72 L36 62 Z" stroke={strokeColor} strokeWidth="1.5" fill="white" />
          <ellipse cx="31" cy="62" rx="5" ry="2" stroke={strokeColor} strokeWidth="1.5" />

          {/* Small Uruli bowl on right */}
          <path d="M62 65 C62 70 76 70 76 65" stroke={strokeColor} strokeWidth="1.5" fill="white" />
          <ellipse cx="69" cy="65" rx="7" ry="2.5" stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );

    case "AJ-ID-001": // Divine Brass Ganesha Idol
      return (
        <svg viewBox="0 0 100 100" className={`${className} text-primary-navy`} fill="none">
          {/* Base seat */}
          <path d="M25 80 C25 76 75 76 75 80 L70 85 L30 85 Z" stroke={strokeColor} strokeWidth="2" fill="#F7F5F0" />
          <line x1="28" y1="80" x2="72" y2="80" stroke={strokeColor} strokeWidth="1.5" />

          {/* Ganesha Crown (Kireedam) */}
          <path d="M43 32 L50 15 L57 32 L53 35 L47 35 Z" stroke={strokeColor} strokeWidth="1.5" fill="white" />
          <circle cx="50" cy="24" r="2" fill={goldColor} />

          {/* Head & Ears */}
          <path d="M40 38 C34 38 34 46 38 48 C42 50 42 38 42 38" stroke={strokeColor} strokeWidth="1.5" fill="white" />
          <path d="M60 38 C66 38 66 46 62 48 C58 50 58 38 58 38" stroke={strokeColor} strokeWidth="1.5" fill="white" />
          <circle cx="50" cy="40" r="8" stroke={strokeColor} strokeWidth="2" />
          
          {/* Trunk (S-shape curve) */}
          <path d="M49 44 C49 44 47 52 44 56 C41 60 46 64 50 64 C53 64 53 60 51 58" stroke={strokeColor} strokeWidth="2" />

          {/* Torso & Big Belly */}
          <circle cx="50" cy="62" r="14" stroke={strokeColor} strokeWidth="2" fill="white" />
          <path d="M43 65 C43 72 57 72 57 65" stroke={goldColor} strokeWidth="1.5" />

          {/* Arms (Blessing hand and sweet modak hand) */}
          <path d="M36 55 C33 53 26 53 28 62" stroke={strokeColor} strokeWidth="1.5" />
          <path d="M64 55 C67 53 74 53 72 62" stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );

    case "AJ-ID-002": // Designer Brass Uruli
      return (
        <svg viewBox="0 0 100 100" className={`${className} text-primary-navy`} fill="none">
          {/* Wide Uruli Bowl body */}
          <path d="M14 46 C14 68 86 68 86 46" stroke={strokeColor} strokeWidth="2.5" fill="#F7F5F0" />
          <ellipse cx="50" cy="46" rx="36" ry="7" stroke={strokeColor} strokeWidth="2" fill="white" />
          <ellipse cx="50" cy="46" rx="32" ry="5.5" stroke={strokeColor} strokeWidth="1" />

          {/* Left Handle */}
          <path d="M14 46 C6 44 6 52 14 50" stroke={strokeColor} strokeWidth="2" fill="none" />
          {/* Right Handle */}
          <path d="M86 46 C94 44 94 52 86 50" stroke={strokeColor} strokeWidth="2" fill="none" />

          {/* Pedestal small base */}
          <path d="M38 62 L42 68 L58 68 L62 62 Z" stroke={strokeColor} strokeWidth="2" />

          {/* Floating Flowers inside */}
          <circle cx="34" cy="46" r="3.5" fill={goldColor} stroke={strokeColor} strokeWidth="0.5" />
          <circle cx="50" cy="47" r="4.5" fill={goldColor} stroke={strokeColor} strokeWidth="0.5" />
          <circle cx="66" cy="46" r="3.5" fill={goldColor} stroke={strokeColor} strokeWidth="0.5" />
          
          <circle cx="42" cy="46.5" r="2" fill="orange" />
          <circle cx="58" cy="46.5" r="2" fill="orange" />
        </svg>
      );

    case "AJ-CW-001": // Heavy-Duty Bronze Uruli Cookware
      return (
        <svg viewBox="0 0 100 100" className={`${className} text-navy-light`} fill="none">
          {/* Heavy cookware body - deep and thick rim */}
          <path d="M16 42 C16 70 84 70 84 42" stroke={strokeColor} strokeWidth="3" fill="#EAE6DF" />
          {/* Thick Rim */}
          <ellipse cx="50" cy="42" rx="34" ry="7" stroke={strokeColor} strokeWidth="3.5" fill="#D2C7B7" />
          <ellipse cx="50" cy="42" rx="30" ry="5.5" stroke={strokeColor} strokeWidth="1.5" />
          
          {/* Thick cast side handles */}
          <path d="M16 42 C10 40 10 48 16 46" stroke={strokeColor} strokeWidth="3" />
          <path d="M84 42 C90 40 90 48 84 46" stroke={strokeColor} strokeWidth="3" />

          {/* Heavy Base ring */}
          <path d="M36 63 C36 67 64 67 64 63" stroke={strokeColor} strokeWidth="2" />
        </svg>
      );

    case "AJ-CW-002": // Traditional Brass Vattu Chembu
      return (
        <svg viewBox="0 0 100 100" className={`${className} text-primary-navy`} fill="none">
          {/* Copper-Brass color styling */}
          {/* Main pot body: broad flat bottom, tapered neck */}
          <path d="M22 75 C22 84 78 84 78 75 L70 46 C70 42 66 38 60 38 L40 38 C34 38 30 42 30 46 Z" stroke={strokeColor} strokeWidth="2.5" fill="#F1ECE4" />
          
          {/* Neck collar */}
          <ellipse cx="50" cy="38" rx="15" ry="3.5" stroke={strokeColor} strokeWidth="2" fill="white" />
          
          {/* Flared Rim mouth */}
          <path d="M35 38 C35 34 65 34 65 38" stroke={strokeColor} strokeWidth="2.5" />
          <ellipse cx="50" cy="35" rx="16" ry="4" stroke={strokeColor} strokeWidth="2" fill="#E8DCD0" />

          {/* Horizontal texture lines typical of Chembu */}
          <path d="M26 62 C34 65 66 65 74 62" stroke={strokeColor} strokeWidth="1.2" />
          <path d="M23 70 C31 73 69 73 77 70" stroke={strokeColor} strokeWidth="1.2" />
          <path d="M29 52 C35 55 65 55 71 52" stroke={goldColor} strokeWidth="1.5" />
        </svg>
      );

    case "AJ-KE-001": // Stainless Steel Kada / Cheena Chatti
      return (
        <svg viewBox="0 0 100 100" className={`${className} text-gray-500`} fill="none">
          {/* Deep frying pan body */}
          <path d="M16 46 C16 72 84 72 84 46 Z" stroke={strokeColor} strokeWidth="2" fill="#F5F5F7" />
          <ellipse cx="50" cy="46" rx="34" ry="8" stroke={strokeColor} strokeWidth="2" fill="white" />
          
          {/* Left loop handle */}
          <circle cx="12" cy="46" r="6" stroke={strokeColor} strokeWidth="2.5" />
          {/* Right loop handle */}
          <circle cx="88" cy="46" r="6" stroke={strokeColor} strokeWidth="2.5" />

          {/* Induction Base plate ring */}
          <ellipse cx="50" cy="66" rx="20" ry="4" stroke={strokeColor} strokeWidth="1.5" />
        </svg>
      );

    case "AJ-KE-002": // Premium Brass Puttu Maker
      return (
        <svg viewBox="0 0 100 100" className={`${className} text-primary-navy`} fill="none">
          {/* Tall cylindrical tube */}
          <path d="M42 50 L42 20 L58 20 L58 50 Z" stroke={strokeColor} strokeWidth="2" fill="white" />
          <ellipse cx="50" cy="20" rx="8" ry="2" stroke={strokeColor} strokeWidth="2" fill="#F7F5F0" />
          <ellipse cx="50" cy="50" rx="8" ry="2" stroke={strokeColor} strokeWidth="1.5" />
          
          {/* Brass steamer pot base (Kudam style) */}
          <path d="M34 76 C34 82 66 82 66 76 L62 58 C62 54 38 54 38 58 Z" stroke={strokeColor} strokeWidth="2.5" fill="#F7F5F0" />
          <ellipse cx="50" cy="58" rx="12" ry="3" stroke={strokeColor} strokeWidth="2" />
          <ellipse cx="50" cy="76" rx="16" ry="3.5" stroke={strokeColor} strokeWidth="1.5" />

          {/* Wooden handle on side */}
          <path d="M58 35 L74 35 L74 39 L58 39" stroke={strokeColor} strokeWidth="1.5" fill="#C5A880" />
          <line x1="74" y1="33" x2="74" y2="41" stroke={strokeColor} strokeWidth="2" />
        </svg>
      );

    case "AJ-KE-003": // Handcrafted Copper Water Carafe & Glass
      return (
        <svg viewBox="0 0 100 100" className={`${className} text-primary-navy`} fill="none">
          {/* Copper Carafe Bottle (taller, on left) */}
          <g transform="translate(-6, 0)">
            <path d="M38 78 C38 82 58 82 58 78 L56 46 C56 42 52 38 48 38 L48 30 L46 30 L46 38 C42 38 38 42 38 46 Z" stroke={strokeColor} strokeWidth="2" fill="#FAF7F2" />
            <ellipse cx="48" cy="78" rx="10" ry="3" stroke={strokeColor} strokeWidth="1.5" />
            
            {/* Cap */}
            <path d="M45 30 L45 26 L51 26 L51 30 Z" stroke={strokeColor} strokeWidth="2" fill={goldColor} />
            
            {/* Design rings */}
            <path d="M38 54 C42 56 54 56 58 54" stroke={goldColor} strokeWidth="1.5" />
            <path d="M38 66 C42 68 54 68 58 66" stroke={goldColor} strokeWidth="1.5" />
          </g>

          {/* Matching Copper Tumbler / Glass (shorter, on right) */}
          <g transform="translate(14, 12)">
            <path d="M48 66 L50 78 C50 80 62 80 62 78 L64 66 Z" stroke={strokeColor} strokeWidth="2" fill="#FAF7F2" />
            <ellipse cx="56" cy="66" rx="8" ry="2.5" stroke={strokeColor} strokeWidth="2" fill="white" />
            <ellipse cx="56" cy="78" rx="6" ry="2" stroke={strokeColor} strokeWidth="1" />
          </g>
        </svg>
      );

    default: // Generic elegant plate
      return (
        <svg viewBox="0 0 100 100" className={`${className} text-primary-navy`} fill="none">
          <circle cx="50" cy="50" r="35" stroke={strokeColor} strokeWidth="2.5" fill="#F7F5F0" />
          <circle cx="50" cy="50" r="28" stroke={goldColor} strokeWidth="1.5" />
          <circle cx="50" cy="50" r="20" stroke={strokeColor} strokeWidth="1" />
          <circle cx="50" cy="50" r="4" fill={strokeColor} />
        </svg>
      );
  }
}
