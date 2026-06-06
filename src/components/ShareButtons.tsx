/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Share2, Copy, Check, Twitter, Linkedin } from 'lucide-react';

interface ShareButtonsProps {
  theme: 'modern' | 'ie6' | 'terminal';
  title: string;
  text: string;
  url?: string;
  variant?: 'compact' | 'expanded';
}

export default function ShareButtons({ theme, title, text, url = window.location.href, variant = 'expanded' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `${title} \n\n${text}\n\n`;
  const plainShareUrl = url;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}${plainShareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Échec de la copie au presse-papier", err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: plainShareUrl,
        });
      } catch (err) {
        console.log("Partage système annulé", err);
      }
    } else {
      handleCopy();
    }
  };

  // Theme-specific styles
  const btnClasses = () => {
    switch (theme) {
      case 'ie6':
        return {
          container: "bg-[#d4d0c8] border-2 border-inset border-white p-2.5 flex flex-wrap items-center gap-2 font-sans rounded-none text-black",
          btn: "bg-[#d4d0c8] hover:bg-[#c0c0c0] border-2 border-outset border-white px-2 py-1 text-[10px] font-bold active:border-inset flex items-center gap-1.5 cursor-pointer rounded-none text-black",
          badge: "text-[9px] text-[#000080]"
        };
      case 'terminal':
        return {
          container: "border border-[#ffb000]/30/20 bg-black/60 p-2.5 flex flex-wrap items-center gap-2 font-mono rounded-none text-[#ffb000]",
          btn: "border border-[#ffb000]/50 hover:bg-[#ffb000]/10 px-2 py-1 text-[10px] uppercase font-bold flex items-center gap-1.5 cursor-pointer rounded-none text-[#ffb000]",
          badge: "text-[9px] text-[#ffb000]/70"
        };
      default: // Modern - Slate 2026
        return {
          container: "bg-[#111114]/50 border border-[#2a2a2e] p-3 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs w-full",
          btn: "bg-[#1d1d23] hover:bg-[#25252d] border border-[#2d2d35] hover:border-[#3b82f6]/40 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 transition duration-200 cursor-pointer",
          badge: "text-[11px] text-slate-400 font-medium"
        };
    }
  };

  const css = btnClasses();

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(plainShareUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(plainShareUrl)}`;

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleCopy}
          title="Copier les détails"
          className="p-1.5 rounded bg-slate-750 hover:bg-slate-700 text-slate-350 hover:text-slate-150 transition cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
        {navigator.share && (
          <button
            onClick={handleNativeShare}
            title="Partage système"
            className="p-1.5 rounded bg-slate-750 hover:bg-slate-700 text-slate-350 hover:text-slate-150 transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={css.container}>
      <span className={css.badge}>
        📢 Partager cette découverte :
      </span>

      <div className="flex flex-wrap items-center gap-1.5">
        {/* Twitter Share */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={css.btn}
        >
          <Twitter className="w-3.5 h-3.5 text-sky-400" />
          <span>Sur Twitter / X</span>
        </a>

        {/* LinkedIn Share */}
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={css.btn}
        >
          <Linkedin className="w-3.5 h-3.5 text-blue-500" />
          <span>Sur LinkedIn</span>
        </a>

        {/* Copy To Clipboard */}
        <button
          onClick={handleCopy}
          className={css.btn}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Anecdote copiée !</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copier le texte</span>
            </>
          )}
        </button>

        {/* Native Mobile Share API Fallback */}
        {navigator.share && (
          <button
            onClick={handleNativeShare}
            className={css.btn}
          >
            <Share2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Partage système</span>
          </button>
        )}
      </div>
    </div>
  );
}
