import { ChevronDown, Plus } from 'lucide-react';

interface HeroSectionProps {
  onScrollToTool: () => void;
}

export function HeroSection({ onScrollToTool }: HeroSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center pt-16 pb-12 md:pt-24 md:pb-20 relative z-10 min-h-[70vh]">
      
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-950/30 mb-8 opacity-0 animate-fade-up shadow-[0_0_20px_rgba(234,88,12,0.1)]">
        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
        <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-orange-400 uppercase">
          Last Letter Analytics • Roblox Dictionary
        </span>
      </div>

      {/* Massive Heading */}
      <h1 className="text-5xl md:text-8xl lg:text-[110px] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-orange-400 to-red-600 drop-shadow-sm font-display uppercase leading-[0.85] mb-6 opacity-0 animate-fade-up" style={{ animationDelay: '150ms' }}>
        Guessing is noise.<br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-amber-500">Strategy is signal.</span>
      </h1>

      {/* Description */}
      <p className="max-w-2xl text-orange-200/70 text-sm md:text-base lg:text-lg font-light leading-relaxed mb-10 opacity-0 animate-fade-up" style={{ animationDelay: '300ms' }}>
        Last Letter demands instant recall. This engine parses over 400,000 words in milliseconds to predict your absolute best move. Eliminate guesswork, memorize winning combinations, and guarantee your victory.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 items-center opacity-0 animate-fade-up" style={{ animationDelay: '450ms' }}>
        <button
          onClick={onScrollToTool}
          className="flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-bold tracking-widest uppercase text-xs transition-all shadow-[0_0_30px_rgba(234,88,12,0.4)] hover:shadow-[0_0_50px_rgba(234,88,12,0.6)] group"
        >
          Start Finding Words
          <ChevronDown size={16} strokeWidth={2.5} className="group-hover:translate-y-1 transition-transform" />
        </button>
        
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfsVMFvaFmTCZt9SklLEZz2_wguwaWAahHItf45GeP6FqyF0A/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-8 py-4 bg-[#090402] text-orange-400 border border-orange-500/30 hover:border-orange-500/80 rounded-full font-bold tracking-widest uppercase text-xs transition-all hover:bg-orange-950/40 group"
        >
          <Plus size={16} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
          Contribute
        </a>
      </div>

    </div>
  );
}
