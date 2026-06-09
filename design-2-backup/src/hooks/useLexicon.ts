import { useState, useEffect, useMemo } from 'react';

export type LengthFilter = 'Off' | 'Short' | 'Long';
export type OrderFilter = 'A-Z' | 'Z-A';

export interface FilterState {
  startsWith: string;
  endsWith: string;
  contains: string;
  containsLetters: string;
  lengthFilter: LengthFilter;
  order: OrderFilter;
}

const checkSubset = (word: string, letters: string) => {
  if (!letters) return true;
  const wordLower = word.toLowerCase();
  const letLower = letters.toLowerCase();
  
  const map: Record<string, number> = {};
  for (const char of letLower) {
    if (char === ' ') continue;
    map[char] = (map[char] || 0) + 1;
  }
  
  for (const char of wordLower) {
    if (map[char]) {
      map[char]--;
    }
  }
  
  return Object.values(map).every(count => count <= 0);
};

export function useLexicon() {
  const [words, setWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [filters, setFilters] = useState<FilterState>({
    startsWith: '',
    endsWith: '',
    contains: '',
    containsLetters: '',
    lengthFilter: 'Off',
    order: 'A-Z'
  });

  useEffect(() => {
    fetch('/words.txt')
      .then(res => res.text())
      .then(text => {
        const parsed = text.split('\n').map(w => w.trim()).filter(Boolean);
        // Sort the dictionary A-Z ONCE during startup. 
        // Default .sort() is extremely fast compared to localeCompare.
        parsed.sort();
        setWords(parsed);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load words.txt', err);
        setIsLoading(false);
      });
  }, []);

  const filteredWords = useMemo(() => {
    if (!words.length) return { result: [], isCapped: false };

    let result = words;

    const { startsWith, endsWith, contains, containsLetters, lengthFilter, order } = filters;

    // Apply text filters
    if (startsWith) {
      const swLower = startsWith.toLowerCase();
      result = result.filter(w => w.toLowerCase().startsWith(swLower));
    }
    
    if (endsWith) {
      const ewLower = endsWith.toLowerCase();
      result = result.filter(w => w.toLowerCase().endsWith(ewLower));
    }

    if (contains) {
      const cLower = contains.toLowerCase();
      result = result.filter(w => w.toLowerCase().includes(cLower));
    }

    if (containsLetters) {
      result = result.filter(w => checkSubset(w, containsLetters));
    }

    // Apply length filters
    if (lengthFilter === 'Short') {
      result = result.filter(w => w.length <= 10);
    } else if (lengthFilter === 'Long') {
      result = result.filter(w => w.length > 10);
    }

    // Apply sorting
    // Since 'words' is already A-Z, and .filter() preserves order,
    // A-Z requires zero work. For Z-A, we just reverse the array (O(N) vs O(N log N)).
    if (order === 'Z-A') {
      result = [...result].reverse();
    }

    const isCapped = result.length > 1000;
    return {
      result: result.slice(0, 1000),
      isCapped
    };
  }, [words, filters]);

  return {
    wordsCount: words.length,
    filteredWords: filteredWords.result,
    isCapped: filteredWords.isCapped,
    isLoading,
    filters,
    setFilters
  };
}
