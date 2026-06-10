import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { BookOpen } from 'lucide-react';

interface LexiconProps {
  words: string[];
  isLoading: boolean;
  isCapped?: boolean;
}

export function Lexicon({ words, isLoading, isCapped }: LexiconProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  
  const itemsPerRow = 2;
  const rowCount = Math.ceil(words.length / itemsPerRow);
  
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 44,
    overscan: 10,
  });

  return (
    <div className="flex flex-col gap-4 md:gap-6 h-full min-h-0 relative pb-2">
      <div className="flex items-center justify-between pb-3 md:pb-4 border-b border-orange-900/50 shrink-0">
        <h2 className="text-lg md:text-2xl font-bold text-zinc-100 flex items-center gap-2 font-display uppercase tracking-wide">
          <BookOpen size={18} className="text-orange-400" />
          The Lexicon
        </h2>
        <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase text-orange-400 bg-orange-400/10 border border-orange-400/20 px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.1)]">
          {isLoading ? 'LOADING...' : `${words.length.toLocaleString()}${isCapped ? '+' : ''} WORDS`}
        </span>
      </div>
      
      <div 
        ref={parentRef} 
        className="flex-1 overflow-y-auto pr-1 md:pr-2 min-h-0 relative"
      >
        {isLoading ? (
          <div className="flex flex-col gap-2 p-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-2 w-full">
                <div className="flex-1 h-10 md:h-12 bg-orange-900/20 rounded-md animate-pulse border border-orange-900/30" />
                <div className="flex-1 h-10 md:h-12 bg-orange-900/20 rounded-md animate-pulse border border-orange-900/30" />
              </div>
            ))}
          </div>
        ) : words.length === 0 ? (
          <div className="flex h-full items-center justify-center text-red-500 font-mono text-xs tracking-widest uppercase text-center">
            No signal matches filters.
          </div>
        ) : (
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const startIndex = virtualRow.index * itemsPerRow;
              const rowWords = words.slice(startIndex, startIndex + itemsPerRow);
              
              return (
                <div
                  key={virtualRow.index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className="flex px-0 md:px-1"
                >
                  {rowWords.map((word, i) => (
                    <div 
                      key={`${virtualRow.index}-${i}`} 
                      className="flex-1 flex items-center py-1.5 px-2 md:py-2 md:px-4 m-0.5 md:m-1 rounded-md bg-black/30 hover:bg-orange-950/40 transition-all duration-200 border border-orange-900/30 hover:border-orange-500/50 font-mono text-xs md:text-sm text-orange-100/70 hover:text-orange-100 cursor-default truncate"
                    >
                      {word}
                    </div>
                  ))}
                  {rowWords.length < itemsPerRow && (
                    <div className="flex-1 m-0.5 md:m-1" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isCapped && (
        <div className="shrink-0 pt-2 md:pt-4 text-center">
          <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-red-400 bg-red-950/30 px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-red-500/30 inline-block shadow-[0_0_10px_rgba(239,68,68,0.1)]">
            Displaying Top 1000 — Refine Search
          </p>
        </div>
      )}
    </div>
  );
}
