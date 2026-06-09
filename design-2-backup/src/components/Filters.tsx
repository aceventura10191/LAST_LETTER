import React, { useState, useEffect } from 'react';
import type { FilterState, LengthFilter, OrderFilter } from '../hooks/useLexicon';
import { Search, Hash, AlignLeft, AlignRight, WholeWord } from 'lucide-react';

interface FiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export function Filters({ filters, setFilters }: FiltersProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(localFilters);
    }, 200);
    return () => clearTimeout(timer);
  }, [localFilters, setFilters]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-4 md:gap-8 bg-[#09090b]/80 p-4 md:p-6 rounded-2xl border border-zinc-800/80 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.5)] shrink-0">
      
      <div className="hidden md:flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2 font-display">
          <Search size={22} className="text-cyan-400" />
          Filters
        </h2>
        <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">Combine for precision</p>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-3 md:gap-6">
        {/* Starts With */}
        <div className="flex flex-col gap-1 md:gap-2">
          <label className="text-[9px] md:text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Starts</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 md:pl-3 pointer-events-none text-zinc-500 group-focus-within:text-cyan-400 transition-colors">
              <AlignLeft size={14} strokeWidth={2} />
            </div>
            <input
              type="text"
              value={localFilters.startsWith}
              onChange={(e) => updateFilter('startsWith', e.target.value)}
              className="bg-black/40 border border-zinc-800/80 text-zinc-100 text-xs md:text-sm rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-7 md:pl-9 p-2 md:p-2.5 transition-all outline-none"
              placeholder="e.g. anti"
            />
          </div>
        </div>

        {/* Ends With */}
        <div className="flex flex-col gap-1 md:gap-2">
          <label className="text-[9px] md:text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Ends</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 md:pl-3 pointer-events-none text-zinc-500 group-focus-within:text-cyan-400 transition-colors">
              <AlignRight size={14} strokeWidth={2} />
            </div>
            <input
              type="text"
              value={localFilters.endsWith}
              onChange={(e) => updateFilter('endsWith', e.target.value)}
              className="bg-black/40 border border-zinc-800/80 text-zinc-100 text-xs md:text-sm rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-7 md:pl-9 p-2 md:p-2.5 transition-all outline-none"
              placeholder="e.g. ism"
            />
          </div>
        </div>

        {/* Contains */}
        <div className="flex flex-col gap-1 md:gap-2">
          <label className="text-[9px] md:text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Contains</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 md:pl-3 pointer-events-none text-zinc-500 group-focus-within:text-cyan-400 transition-colors">
              <WholeWord size={14} strokeWidth={2} />
            </div>
            <input
              type="text"
              value={localFilters.contains}
              onChange={(e) => updateFilter('contains', e.target.value)}
              className="bg-black/40 border border-zinc-800/80 text-zinc-100 text-xs md:text-sm rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full pl-7 md:pl-9 p-2 md:p-2.5 transition-all outline-none"
              placeholder="e.g. frag"
            />
          </div>
        </div>

        {/* Contains Letters */}
        <div className="flex flex-col gap-1 md:gap-2">
          <label className="text-[9px] md:text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Letters</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 md:pl-3 pointer-events-none text-zinc-500 group-focus-within:text-fuchsia-400 transition-colors">
              <Hash size={14} strokeWidth={2} />
            </div>
            <input
              type="text"
              value={localFilters.containsLetters}
              onChange={(e) => updateFilter('containsLetters', e.target.value)}
              className="bg-black/40 border border-zinc-800/80 text-zinc-100 text-xs md:text-sm rounded-lg focus:ring-1 focus:ring-fuchsia-500 focus:border-fuchsia-500 block w-full pl-7 md:pl-9 p-2 md:p-2.5 transition-all outline-none"
              placeholder="e.g. xqz"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row md:flex-row gap-3 md:gap-6">
        <div className="flex flex-col gap-1 md:gap-2 flex-1">
          <label className="text-[9px] md:text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Length</label>
          <div className="flex bg-black/40 rounded-lg p-0.5 md:p-1 border border-zinc-800/80">
            {(['Off', 'Short', 'Long'] as LengthFilter[]).map((lf) => (
              <button
                key={lf}
                onClick={() => updateFilter('lengthFilter', lf)}
                className={`flex-1 text-[10px] md:text-xs font-semibold px-1 py-1.5 md:px-4 md:py-2 rounded-md transition-all ${
                  localFilters.lengthFilter === lf 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)]' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 border border-transparent'
                }`}
              >
                {lf}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 md:gap-2 flex-1">
          <label className="text-[9px] md:text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Sort</label>
          <div className="flex bg-black/40 rounded-lg p-0.5 md:p-1 border border-zinc-800/80">
            {(['A-Z', 'Z-A'] as OrderFilter[]).map((ord) => (
              <button
                key={ord}
                onClick={() => updateFilter('order', ord)}
                className={`flex-1 text-[10px] md:text-xs font-semibold px-1 py-1.5 md:px-4 md:py-2 rounded-md transition-all ${
                  localFilters.order === ord 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)]' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 border border-transparent'
                }`}
              >
                {ord}
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
