import React, { useState, useEffect } from 'react';
import type { FilterState, LengthFilter, OrderFilter } from '../hooks/useLexicon';
import { Search, Hash, AlignLeft, AlignRight, WholeWord } from 'lucide-react';

interface FiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export function Filters({ filters, setFilters }: FiltersProps) {
  // Local state for instant typing without lag
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  // Debounce the update to the parent state to keep the input responsive
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(localFilters);
    }, 200); // 200ms delay after typing stops
    return () => clearTimeout(timer);
  }, [localFilters, setFilters]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-8 bg-zinc-900/20 p-6 rounded-2xl border border-zinc-800/50 backdrop-blur-sm shadow-lg shadow-black/20">
      
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
          <Search size={20} className="text-emerald-400" />
          Filters
        </h2>
        <p className="text-sm text-zinc-400">Combine attributes for better precision</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Starts With */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Starts with</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
              <AlignLeft size={16} strokeWidth={2} />
            </div>
            <input
              type="text"
              value={localFilters.startsWith}
              onChange={(e) => updateFilter('startsWith', e.target.value)}
              className="bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-9 p-2.5 transition-all outline-none"
              placeholder="e.g. anti"
            />
          </div>
        </div>

        {/* Ends With */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Ends with</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
              <AlignRight size={16} strokeWidth={2} />
            </div>
            <input
              type="text"
              value={localFilters.endsWith}
              onChange={(e) => updateFilter('endsWith', e.target.value)}
              className="bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-9 p-2.5 transition-all outline-none"
              placeholder="e.g. ism"
            />
          </div>
        </div>

        {/* Contains */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Contains</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
              <WholeWord size={16} strokeWidth={2} />
            </div>
            <input
              type="text"
              value={localFilters.contains}
              onChange={(e) => updateFilter('contains', e.target.value)}
              className="bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-9 p-2.5 transition-all outline-none"
              placeholder="e.g. frag"
            />
          </div>
        </div>

        {/* Contains Letters */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Contains letters</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
              <Hash size={16} strokeWidth={2} />
            </div>
            <input
              type="text"
              value={localFilters.containsLetters}
              onChange={(e) => updateFilter('containsLetters', e.target.value)}
              className="bg-zinc-900/50 border border-zinc-800 text-zinc-100 text-sm rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-9 p-2.5 transition-all outline-none"
              placeholder="e.g. xqz"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex flex-col gap-2 flex-1">
          <label className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Word Length</label>
          <div className="flex bg-zinc-900/50 rounded-lg p-1 border border-zinc-800">
            {(['Off', 'Short', 'Long'] as LengthFilter[]).map((lf) => (
              <button
                key={lf}
                onClick={() => updateFilter('lengthFilter', lf)}
                className={`flex-1 text-sm px-4 py-1.5 rounded-md transition-all ${
                  localFilters.lengthFilter === lf 
                    ? 'bg-zinc-800 text-white shadow-sm' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                {lf}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <label className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">Alphabetical</label>
          <div className="flex bg-zinc-900/50 rounded-lg p-1 border border-zinc-800">
            {(['A-Z', 'Z-A'] as OrderFilter[]).map((ord) => (
              <button
                key={ord}
                onClick={() => updateFilter('order', ord)}
                className={`flex-1 text-sm px-4 py-1.5 rounded-md transition-all ${
                  localFilters.order === ord 
                    ? 'bg-zinc-800 text-white shadow-sm' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
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
