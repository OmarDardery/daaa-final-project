/**
 * Search Algorithm Interface
 * 
 * This file contains placeholder functions for the three string search algorithms.
 * Your teammates should implement these functions with their respective algorithms.
 * 
 * Each function should return an object with:
 * - matches: array of indices where pattern is found
 * - comparisons: number of character comparisons made
 * - timeElapsed: execution time in milliseconds
 */

/**
 * Brute Force String Search Algorithm
 * @param {string} text - Full document content as a string (no mutation allowed)
 * @param {string} pattern - Pattern to search for (non-empty string)
 * @returns {Object} { matches: number[], comparisons: number, timeElapsed: number }
 * Implementation notes for teammates:
 * - Iterate over every possible start position in `text`.
 * - Count every character comparison in `comparisons`.
 * - Push each start index where a full match is found into `matches`.
 * - Measure execution time with performance.now() before/after your logic.
 */
// eslint-disable-next-line no-unused-vars
export function bruteForceSearch(text, pattern) {
  // implement brute force search; return all match start indices
  return { matches: [], comparisons: 0, timeElapsed: 0 };
}

/**
 * Boyer-Moore String Search Algorithm
 * @param {string} text - Full document content as a string
 * @param {string} pattern - Pattern to search for
 * @returns {Object} { matches: number[], comparisons: number, timeElapsed: number }
 * Implementation notes for teammates:
 * - Build the bad-character and good-suffix tables before searching.
 * - Scan from right to left and use jump heuristics to skip indices.
 * - Track every character comparison in `comparisons`.
 * - Record each match start index in `matches`.
 * - Measure execution time with performance.now().
 */
export function boyerMooreSearch(text, pattern) {
  const startTime = performance.now();

  const matches = [];
  let comparisons = 0;

  const n = text.length;
  const m = pattern.length;

  // Edge cases
  if (m === 0 || n === 0 || m > n) {
    const timeElapsed = performance.now() - startTime;
    return { matches, comparisons, timeElapsed };
  }

  // Bad character table
  const badChar = new Map();
  for (let i = 0; i < m; i += 1) {
    badChar.set(pattern[i], i);
  }

  // Good suffix preprocessing
  const suffix = new Array(m).fill(-1);
  const prefix = new Array(m).fill(false);

  const buildGoodSuffix = () => {
    for (let i = 0; i < m - 1; i += 1) {
      let j = i;
      let k = 0; // length of the matching suffix
      while (j >= 0 && pattern[j] === pattern[m - 1 - k]) {
        comparisons += 1;
        j -= 1;
        k += 1;
        suffix[k] = j + 1;
      }
      if (j >= 0) comparisons += 1; // for the mismatching comparison
      if (j === -1) prefix[k] = true;
    }
  };

  const moveByGoodSuffix = (badIndex) => {
    const k = m - 1 - badIndex; // length of good suffix
    if (k <= 0) return 0;
    if (suffix[k] !== -1) return badIndex + 1 - suffix[k];
    
    for (let r = badIndex + 2; r <= m - 1; r += 1) {
      if (prefix[m - r]) return r;
    }
    return m;
  };

  buildGoodSuffix();

  // ---------- Main search loop ----------
  let i = 0; // alignment start in text
  while (i <= n - m) {
    let j = m - 1; // index in pattern

    while (j >= 0) {
      comparisons += 1;
      if (text[i + j] === pattern[j]) j -= 1;
      else break;
    }

    if (j < 0) {
      // Match found
      matches.push(i);
      // Shift by 1 to find overlapping patterns
      i += 1;
    } else {
      // Bad character rule
      const bcIndex = badChar.has(text[i + j]) ? badChar.get(text[i + j]) : -1;
      const badCharShift = j - bcIndex;

      // Good suffix rule
      const goodSuffixShift = moveByGoodSuffix(j);

      const shift = Math.max(1, Math.max(badCharShift, goodSuffixShift));
      i += shift;
    }
  }

  const timeElapsed = performance.now() - startTime;
  return { matches, comparisons, timeElapsed };
}

/**
 * Knuth-Morris-Pratt (KMP) String Search Algorithm
 * @param {string} text - Full document content as a string
 * @param {string} pattern - Pattern to search for
 * @returns {Object} { matches: number[], comparisons: number, timeElapsed: number }
 * Implementation notes for teammates:
 * - Build the prefix/failure function for the pattern.
 * - Use the prefix table to avoid re-checking matched characters.
 * - Increment `comparisons` on every character check.
 * - Push each starting index of a full match into `matches`.
 * - Use performance.now() to capture elapsed time.
 */
// eslint-disable-next-line no-unused-vars
export function kmpSearch(text, pattern) {
  // TODO: implement KMP search using prefix table
  return { matches: [], comparisons: 0, timeElapsed: 0 };
}

/**
 * Algorithm metadata for display
 */
export const algorithms = {
  bruteforce: {
    name: 'Brute Force',
    description: 'Check every position in the text',
    function: bruteForceSearch,
  },
  boyermoore: {
    name: 'Boyer-Moore',
    description: 'Skip ahead using bad-char and good-suffix rules',
    function: boyerMooreSearch,
  },
  kmp: {
    name: 'Knuth-Morris-Pratt',
    description: 'Use prefix table to avoid re-checking characters',
    function: kmpSearch,
  },
};
