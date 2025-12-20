import React from 'react';
import './SearchResults.css';

const SearchResults = ({ results, text, pattern, algorithm }) => {
  if (!results) return null;

  const { matches, comparisons, timeElapsed } = results;

  // Function to highlight matches in the text
  const highlightMatches = () => {
    if (matches.length === 0) {
      return <div className="text-content">{text}</div>;
    }

    const segments = [];
    let lastIndex = 0;

    matches.forEach((matchIndex, i) => {
      // Add text before the match
      if (matchIndex > lastIndex) {
        segments.push(
          <span key={`text-${i}`} className="normal-text">
            {text.substring(lastIndex, matchIndex)}
          </span>
        );
      }

      // Add the highlighted match
      segments.push(
        <mark key={`match-${i}`} className="highlight" data-match-number={i + 1}>
          {text.substring(matchIndex, matchIndex + pattern.length)}
        </mark>
      );

      lastIndex = matchIndex + pattern.length;
    });

    // Add remaining text after the last match
    if (lastIndex < text.length) {
      segments.push(
        <span key="text-end" className="normal-text">
          {text.substring(lastIndex)}
        </span>
      );
    }

    return <div className="text-content">{segments}</div>;
  };

  // Get context around each match (showing some characters before and after)
  const getMatchContexts = () => {
    const contextLength = 50;
    return matches.map((matchIndex, i) => {
      const start = Math.max(0, matchIndex - contextLength);
      const end = Math.min(text.length, matchIndex + pattern.length + contextLength);
      const prefix = start > 0 ? '...' : '';
      const suffix = end < text.length ? '...' : '';
      
      return (
        <div key={i} className="match-context">
          <span className="match-number">Match {i + 1} (Position {matchIndex}):</span>
          <div className="context-text">
            {prefix}
            {text.substring(start, matchIndex)}
            <mark className="highlight">{text.substring(matchIndex, matchIndex + pattern.length)}</mark>
            {text.substring(matchIndex + pattern.length, end)}
            {suffix}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>Search Results</h2>
        <button className="new-search-btn" onClick={() => window.location.reload()}>
          New Search
        </button>
      </div>

      {/* Statistics Panel */}
      <div className="stats-panel">
        <div className="stat-card">
          <div className="stat-label">Algorithm</div>
          <div className="stat-value">{algorithm}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Matches Found</div>
          <div className="stat-value">{matches.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Comparisons</div>
          <div className="stat-value">{comparisons.toLocaleString()}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Time Elapsed</div>
          <div className="stat-value">{timeElapsed.toFixed(4)} ms</div>
        </div>
      </div>

      {/* Search Pattern Display */}
      <div className="search-info">
        <strong>Searching for:</strong> <code>"{pattern}"</code>
      </div>

      {/* Results Message */}
      <div className={`results-message ${matches.length === 0 ? 'no-matches' : 'has-matches'}`}>
        {matches.length === 0 ? (
          <p>No matches found for "{pattern}" in the document.</p>
        ) : (
          <p>Found {matches.length} occurrence{matches.length !== 1 ? 's' : ''} of "{pattern}"</p>
        )}
      </div>

      {/* Match Contexts (quick view of each match) */}
      {matches.length > 0 && (
        <div className="matches-section">
          <h3>Match Locations</h3>
          <div className="match-contexts">
            {getMatchContexts()}
          </div>
        </div>
      )}

      {/* Full Text with Highlights */}
      <div className="full-text-section">
        <h3>Full Document with Highlights</h3>
        <div className="text-display">
          {highlightMatches()}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
