import React, { useRef } from 'react';
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
    estimateSize: () => 48, // slightly taller for breathing room
    overscan: 10,
  });

  return (
    <div className="flex flex-col gap-6 h-full min-h-0 relative pb-2">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/50 shrink-0">
        <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
          <BookOpen size={20} className="text-emerald-400" />
          The Lexicon
        </h2>
        <span className="text-xs font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded">
          {isLoading ? 'LOADING...' : `${words.length.toLocaleString()}${isCapped ? '+' : ''} WORDS`}
        </span>
      </div>
      
      <div 
        ref={parentRef} 
        className="flex-1 overflow-y-auto pr-2 min-h-0 relative"
      >
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-zinc-500 font-mono text-sm">
            Indexing dictionary...
          </div>
        ) : words.length === 0 ? (
          <div className="flex h-full items-center justify-center text-zinc-500 font-mono text-sm">
            No words match the current filters.
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
                  className="flex px-1"
                >
                  {rowWords.map((word, i) => (
                    <div 
                      key={`${virtualRow.index}-${i}`} 
                      className="flex-1 flex items-center py-2 px-4 m-1 rounded-md bg-zinc-900/60 hover:bg-zinc-800 transition-colors border border-zinc-800/50 hover:border-zinc-700 font-mono text-sm text-zinc-300"
                    >
                      {word}
                    </div>
                  ))}
                  {/* Empty flex-1 placeholder if odd item on last row */}
                  {rowWords.length < itemsPerRow && (
                    <div className="flex-1 m-1" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isCapped && (
        <div className="shrink-0 pt-4 text-center">
          <p className="text-xs text-zinc-400 bg-zinc-900/80 px-4 py-2 rounded-md border border-zinc-800 inline-block">
            Showing the first 1000. Narrow your search for a precise result.
          </p>
        </div>
      )}
    </div>
  );
}
