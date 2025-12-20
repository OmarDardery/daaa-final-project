# Text Search Engine - Teammate Implementation Guide

Front-end is complete. You only need to fill in the algorithm functions.

## File to Edit
- `src/utils/searchAlgorithms.js`

## Functions to Implement
1) `bruteForceSearch(text, pattern)`
2) `boyerMooreSearch(text, pattern)`
3) `kmpSearch(text, pattern)`

## Input Contract
- `text` (string): full document content (do not mutate)
- `pattern` (string): pattern to find (non-empty)

## Output Contract (same for all three)
Return an object:
```javascript
{
   matches: number[],      // every start index where pattern occurs
   comparisons: number,    // count of character comparisons
   timeElapsed: number     // milliseconds (use performance.now())
}
```

## Implementation Checklist
- Measure time with `performance.now()` before and after your logic
- Increment `comparisons` for every character check
- Push start indices of each full match into `matches`
- Handle edge cases: empty pattern, pattern longer than text, no matches

## How to Test
1. Run `npm install` once
2. Run `npm run dev`
3. Open `http://localhost:5173` (or the port Vite prints)
4. Upload `sample-text.txt`
5. Try patterns like `"fox"`, `"the"`, `"algorithms"`
6. Verify matches list and metrics update

## Notes per Algorithm
- **Brute Force:** check every position; compare character-by-character
- **Boyer-Moore:** build bad-char and good-suffix tables; use jumps
- **KMP:** build prefix/failure table; skip re-checks using it

## Return Shape Example
```javascript
{
   matches: [0, 12],
   comparisons: 150,
   timeElapsed: 0.35
}
```

That’s all you need. Keep changes confined to `src/utils/searchAlgorithms.js`.
