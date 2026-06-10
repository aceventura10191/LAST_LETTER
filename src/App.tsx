import { useRef } from 'react';
import { useLexicon } from './hooks/useLexicon';
import { Filters } from './components/Filters';
import { Lexicon } from './components/Lexicon';
import { HeroSection } from './components/HeroSection';
import { AnalyticsGraph } from './components/AnalyticsGraph';

export default function App() {
  const { filteredWords, isLoading, isCapped, filters, setFilters } = useLexicon();
  const toolRef = useRef<HTMLElement>(null);

  const scrollToTool = () => {
    toolRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#0c0704]">
      {/* Background glowing orbs for fire vibe */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vh] rounded-full bg-orange-700/20 blur-[140px]" />
        <div className="absolute top-[20%] right-[-20%] w-[50vw] h-[60vh] rounded-full bg-red-800/20 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[10%] w-[60vw] h-[60vh] rounded-full bg-amber-800/15 blur-[140px]" />
      </div>

      <div className="container mx-auto px-4 py-8 md:px-8 max-w-7xl flex flex-col gap-16 relative z-10">
        <HeroSection onScrollToTool={scrollToTool} />
        
        <div className="w-full max-w-5xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '600ms' }}>
          <AnalyticsGraph />
        </div>

        {/* Word Finder Tool Section */}
        <main ref={toolRef} className="flex flex-col md:flex-row gap-4 md:gap-8 w-full pt-12 pb-24 scroll-mt-8">
          {/* Filters section */}
          <div className="w-full md:w-80 lg:w-96 shrink-0 flex flex-col gap-4 md:gap-6">
            <div className="p-4 rounded-xl border border-orange-500/20 bg-[#0c0704]/60 relative overflow-hidden shadow-[0_0_20px_rgba(234,88,12,0.05)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-orange-700"></div>
              <p className="italic text-orange-200/80 text-sm font-light leading-relaxed">
                "The only true wisdom is in knowing you know nothing."
              </p>
              <p className="text-[10px] text-orange-500/60 uppercase tracking-widest mt-2 font-bold">— Socrates</p>
            </div>

            <Filters filters={filters} setFilters={setFilters} />
          </div>
          
          {/* Lexicon section */}
          <div className="flex-1 h-[70vh] md:h-[80vh] bg-[#090402]/80 p-3 md:p-6 rounded-2xl border border-orange-900/50 backdrop-blur-md flex flex-col shadow-[0_0_40px_rgba(234,88,12,0.15)]">
            <Lexicon words={filteredWords} isLoading={isLoading} isCapped={isCapped} />
          </div>
        </main>
      </div>
    </div>
  );
}
