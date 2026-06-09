
import { useLexicon } from './hooks/useLexicon';
import { Filters } from './components/Filters';
import { Lexicon } from './components/Lexicon';
import { Plus } from 'lucide-react';

export default function App() {
  const { filteredWords, isLoading, isCapped, filters, setFilters } = useLexicon();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#0c0704]">
      {/* Background glowing orbs for fire vibe */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vh] rounded-full bg-orange-700/20 blur-[140px]" />
        <div className="absolute top-[20%] right-[-20%] w-[50vw] h-[60vh] rounded-full bg-red-800/20 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[10%] w-[60vw] h-[60vh] rounded-full bg-amber-800/15 blur-[140px]" />
      </div>

      <div className="container mx-auto px-3 py-4 md:px-4 md:py-12 max-w-6xl flex flex-col gap-4 md:gap-8 flex-1 relative z-10 min-h-[100dvh] md:h-screen">
        <header className="flex flex-col md:flex-row gap-4 md:gap-1 items-center justify-between text-center md:text-left shrink-0">
          <div className="flex flex-col gap-0 md:gap-1 items-center md:items-start">
            <h1 className="text-4xl md:text-7xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-500 to-red-600 drop-shadow-sm font-display uppercase">
              Word Finder
            </h1>
            <p className="text-orange-200/80 font-medium tracking-wide text-xs md:text-sm">
              Not so precise search engine <span className="text-orange-400 font-semibold">by Kay</span>
            </p>
          </div>
          
          <a
            href="https://forms.gle/REPLACE_WITH_YOUR_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-orange-950/40 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:border-orange-500/60 rounded-full font-bold tracking-widest uppercase text-[10px] md:text-xs transition-all shadow-[0_0_15px_rgba(249,115,22,0.1)] hover:shadow-[0_0_25px_rgba(249,115,22,0.25)] shrink-0 group"
          >
            <Plus size={16} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
            Contribute
          </a>
        </header>

        <main className="flex flex-col md:flex-row gap-4 md:gap-8 flex-1 pb-2 md:pb-8">
          {/* Filters section */}
          <div className="w-full md:w-80 lg:w-96 shrink-0 flex flex-col md:min-h-0 md:overflow-y-auto">
            <div className="mb-4 md:mb-6 p-4 rounded-xl border border-orange-500/20 bg-[#0c0704]/60 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-orange-700"></div>
              <p className="italic text-orange-200/80 text-sm font-light leading-relaxed">
                "The only true wisdom is in knowing you know nothing."
              </p>
              <p className="text-[10px] text-orange-500/60 uppercase tracking-widest mt-2 font-bold">— Socrates</p>
            </div>

            <Filters filters={filters} setFilters={setFilters} />
          </div>
          
          {/* Lexicon section */}
          <div className="flex-1 h-[70vh] md:h-auto md:min-h-0 bg-[#090402]/80 p-3 md:p-6 rounded-2xl border border-orange-900/50 backdrop-blur-md flex flex-col shadow-[0_0_40px_rgba(234,88,12,0.15)]">
            <Lexicon words={filteredWords} isLoading={isLoading} isCapped={isCapped} />
          </div>
        </main>
      </div>
    </div>
  );
}
