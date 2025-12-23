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
  const startTime = performance.now();
  
  const haystack = text;
  const needle = pattern;
  const matches = [];
  let comparisons = 0;

  // Edge case: empty needle
  if (needle.length === 0) {
    return { matches: [], comparisons: 0, timeElapsed: performance.now() - startTime };
  }

  // Check every possible starting position
  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let j = 0;
    
    // Try to match the needle at position i
    while (j < needle.length) {
      comparisons++;
      if (haystack[i + j] === needle[j]) {
        j++;
      } else {
        break; // Mismatch, try next position
      }
    }

    // If we matched all characters, we found it!
    if (j === needle.length) {
      matches.push(i);
    }
  }

  const timeElapsed = performance.now() - startTime;
  return { matches, comparisons, timeElapsed };
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
// eslint-disable-next-line no-unused-vars
export function boyerMooreSearch(text, pattern) {
  // TODO: implement Boyer-Moore search with preprocessing tables
  return { matches: [], comparisons: 0, timeElapsed: 0 };
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
  const haystack = text;
  const needle = pattern;
  const matches = [];
  let comparisons = 0;

  // Edge case: empty needle
  if (needle.length === 0) {
    return { matches: [], comparisons: 0, timeElapsed: 0 };
  }

  /**
   * Why we run multiple iterations:
   * 
   * According to MDN (https://developer.mozilla.org/en-US/docs/Web/API/Performance/now#security_requirements):
   * "To offer protection against timing attacks and fingerprinting, performance.now() 
   * is coarsened based on whether or not the document is cross-origin isolated."
   * 
   * Resolution limits:
   * - Cross-origin isolated contexts: 5 microseconds (0.005 ms)
   * - Non-isolated contexts: 100 microseconds (0.1 ms)
   * 
   * Since our algorithm runs faster than 0.1ms on small files, we run it multiple
   * times and calculate the average to get a meaningful measurement.
   */
  const ITERATIONS = 100;
  const startTime = performance.now();

  // Run the algorithm ITERATIONS times for accurate timing
  for (let iter = 0; iter < ITERATIONS; iter++) {
    // Build the LPS (Longest Prefix Suffix) table
    const lps = new Array(needle.length).fill(0);
    let prevLPS = 0;
    let i = 1;

    while (i < needle.length) {
      if (iter === 0) comparisons++; // Only count comparisons on first run
      if (needle[i] === needle[prevLPS]) {
        prevLPS++;
        lps[i] = prevLPS;
        i++;
      } else if (prevLPS === 0) {
        lps[i] = 0;
        i++;
      } else {
        prevLPS = lps[prevLPS - 1];
      }
    }

    // Search for needle in haystack using the LPS table
    let haystackIdx = 0;
    let needleIdx = 0;

    while (haystackIdx < haystack.length) {
      if (iter === 0) comparisons++; // Only count comparisons on first run
      if (haystack[haystackIdx] === needle[needleIdx]) {
        haystackIdx++;
        needleIdx++;

        // Found a complete match
        if (needleIdx === needle.length) {
          if (iter === 0) matches.push(haystackIdx - needle.length); // Only record matches on first run
          needleIdx = lps[needleIdx - 1]; // Continue searching for more matches
        }
      } else if (needleIdx === 0) {
        haystackIdx++;
      } else {
        needleIdx = lps[needleIdx - 1]; // Use LPS to skip re-checking
      }
    }
  }

  const timeElapsed = (performance.now() - startTime) / ITERATIONS; // Average time per run
  return { matches, comparisons, timeElapsed };
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
