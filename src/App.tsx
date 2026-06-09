import React from 'react';
import { useLexicon } from './hooks/useLexicon';
import { Filters } from './components/Filters';
import { Lexicon } from './components/Lexicon';

export default function App() {
  const { filteredWords, isLoading, isCapped, filters, setFilters } = useLexicon();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#0b0f19]">
      {/* Background glowing orbs for cyberpunk vibe */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vh] rounded-full bg-cyan-800/20 blur-[140px]" />
        <div className="absolute top-[20%] right-[-20%] w-[50vw] h-[60vh] rounded-full bg-fuchsia-800/20 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[10%] w-[60vw] h-[60vh] rounded-full bg-blue-900/20 blur-[140px]" />
      </div>

      <div className="container mx-auto px-3 py-4 md:px-4 md:py-12 max-w-6xl flex flex-col gap-4 md:gap-8 flex-1 relative z-10 h-[100dvh]">
        <header className="flex flex-col gap-0 md:gap-1 items-center md:items-start text-center md:text-left shrink-0">
          <h1 className="text-3xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-500 drop-shadow-sm font-display">
            Word Finder
          </h1>
          <p className="text-zinc-300 font-medium tracking-wide text-xs md:text-sm">
            Not so precise search engine <span className="text-fuchsia-400 font-semibold">by Kay</span>
          </p>
        </header>

        <main className="flex flex-col md:flex-row gap-4 md:gap-8 flex-1 min-h-0 pb-2 md:pb-8">
          {/* Filters section */}
          <div className="w-full md:w-80 lg:w-96 shrink-0 flex flex-col min-h-0 overflow-y-auto">
            <Filters filters={filters} setFilters={setFilters} />
          </div>
          
          {/* Lexicon section */}
          <div className="flex-1 min-w-0 bg-[#09090b]/80 p-3 md:p-6 rounded-2xl border border-zinc-800/80 backdrop-blur-md flex flex-col min-h-0 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <Lexicon words={filteredWords} isLoading={isLoading} isCapped={isCapped} />
          </div>
        </main>
      </div>
    </div>
  );
}
