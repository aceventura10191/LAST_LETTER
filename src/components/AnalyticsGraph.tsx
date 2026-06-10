import { useEffect, useState } from 'react';

export function AnalyticsGraph() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full bg-[#0c0704]/40 border border-orange-900/30 rounded-2xl p-3 md:p-8 backdrop-blur-md relative overflow-hidden shadow-[0_0_40px_rgba(234,88,12,0.05)]">
      {/* Title */}
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <h3 className="text-[10px] md:text-xs font-bold tracking-widest text-orange-400 uppercase">
          Average Players
        </h3>
        <p className="text-[9px] md:text-[10px] font-bold tracking-widest text-zinc-500 uppercase hidden md:block">
          Last 7 Days • Rolimons Data
        </p>
      </div>

      <div className="relative h-48 md:h-80 w-full mt-2 md:mt-4">
        {/* Y Axis Labels */}
        <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[8px] md:text-[10px] text-zinc-600 font-bold font-mono">
          <span>1.5K</span>
          <span>1.0K</span>
          <span>500</span>
          <span>0</span>
        </div>

        {/* Graph Container */}
        <div className="absolute left-8 right-2 md:right-4 top-2 bottom-6">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-px bg-orange-900/10 md:bg-orange-900/20" />
            ))}
          </div>

          <svg 
            className="w-full h-full overflow-visible" 
            viewBox="0 0 1000 300" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#f97316" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#0c0704" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Main Data Area Fill */}
            <path
              d="M0,80 L166,40 L333,20 L500,60 L666,50 L833,90 L1000,94 L1000,300 L0,300 Z"
              fill="url(#areaGrad)"
              className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Main Data Line - Animated */}
            <path
              d="M0,80 L166,40 L333,20 L500,60 L666,50 L833,90 L1000,94"
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="1200"
              strokeDashoffset={isVisible ? "0" : "1200"}
              className="transition-all duration-[2500ms] ease-out drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]"
            />

            {/* Glowing Dot at End */}
            <g className={`transition-opacity duration-500 delay-[2000ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <circle cx="1000" cy="94" r="16" fill="#ef4444" opacity="0.2" className="animate-pulse" />
              <circle cx="1000" cy="94" r="8" fill="#ef4444" opacity="0.4" className="animate-pulse" />
              <circle cx="1000" cy="94" r="4" fill="#fff" className="drop-shadow-[0_0_10px_rgba(255,255,255,1)]" />
              
              {/* Tooltip */}
              <rect x="880" y="54" width="110" height="26" rx="4" fill="#090402" stroke="#ea580c" strokeWidth="1" />
              <text x="935" y="71" fill="#fff" fontSize="10" fontWeight="bold" textAnchor="middle" className="font-sans">
                PLAYERS: 1,028
              </text>
            </g>
          </svg>
        </div>

        {/* X Axis Labels */}
        <div className="absolute left-8 right-2 md:right-4 bottom-0 flex justify-between text-[8px] md:text-[10px] text-zinc-600 font-bold font-mono">
          <span className="hidden sm:inline">4. Jun</span>
          <span>5. Jun</span>
          <span className="hidden sm:inline">6. Jun</span>
          <span>7. Jun</span>
          <span className="hidden sm:inline">8. Jun</span>
          <span>9. Jun</span>
          <span>10. Jun</span>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="flex flex-wrap justify-between items-center border-t border-orange-900/30 mt-4 md:mt-6 pt-3 md:pt-4 gap-2 md:gap-4">
        <div className="flex flex-col">
          <span className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-widest">7-Day Peak</span>
          <span className="text-orange-400 font-mono text-xs md:text-sm font-bold">~1,400 <span className="text-zinc-600">PLAYERS</span></span>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Dictionary Size</span>
          <span className="text-amber-400 font-mono text-xs md:text-sm font-bold">466,550 <span className="text-zinc-600">WORDS</span></span>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Query Speed</span>
          <span className="text-red-400 font-mono text-xs md:text-sm font-bold">&lt;12ms <span className="text-zinc-600">AVG</span></span>
        </div>
        <div className="flex flex-col hidden sm:flex">
          <span className="text-[8px] md:text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Advantage</span>
          <span className="text-white font-mono text-xs md:text-sm font-bold">Unfair</span>
        </div>
      </div>
    </div>
  );
}
