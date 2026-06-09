import React from 'react';
import { useLexicon } from './hooks/useLexicon';
import { Filters } from './components/Filters';
import { Lexicon } from './components/Lexicon';

export default function App() {
  const { filteredWords, isLoading, isCapped, filters, setFilters } = useLexicon();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      {/* Background gradients for dark tech vibe */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-900/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl flex flex-col gap-8 flex-1 relative z-10 h-screen">
        <header className="flex flex-col gap-1">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Word Finder
          </h1>
          <p className="text-zinc-400 font-medium">
            Not so precise search engine by Kay
          </p>
        </header>

        <main className="flex flex-col md:flex-row gap-8 flex-1 min-h-0 pb-8">
          <div className="w-full md:w-80 lg:w-96 shrink-0 flex flex-col min-h-0 overflow-y-auto pr-1">
            <Filters filters={filters} setFilters={setFilters} />
          </div>
          
          <div className="flex-1 min-w-0 bg-zinc-900/20 p-6 rounded-2xl border border-zinc-800/50 backdrop-blur-sm flex flex-col min-h-0 shadow-xl shadow-black/50">
            <Lexicon words={filteredWords} isLoading={isLoading} isCapped={isCapped} />
          </div>
        </main>
      </div>
    </div>
  );
}
