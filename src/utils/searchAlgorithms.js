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
  // TODO: implement brute force search; return all match start indices
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
