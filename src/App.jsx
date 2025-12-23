import { useState } from 'react';
import './App.css';
import SearchResults from './components/SearchResults';
import { algorithms } from './utils/searchAlgorithms';

function App() {
  const [documentText, setDocumentText] = useState('');
  const [searchPattern, setSearchPattern] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bruteforce');
  const [searchResults, setSearchResults] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setDocumentText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleSearch = () => {
    if (!documentText || !searchPattern) {
      alert('Please upload a document and enter a search pattern.');
      return;
    }

    const algorithmFunction = algorithms[selectedAlgorithm].function;
    const results = algorithmFunction(documentText, searchPattern);
    
    setSearchResults({
      ...results,
      algorithm: algorithms[selectedAlgorithm].name,
    });
  };

  const handleReset = () => {
    setDocumentText('');
    setSearchPattern('');
    setSelectedAlgorithm('bruteforce');
    setSearchResults(null);
    setFileName('');
  };

  if (searchResults) {
    return (
      <SearchResults
        results={searchResults}
        text={documentText}
        pattern={searchPattern}
        algorithm={searchResults.algorithm}
      />
    );
  }

  return (
    <div className="app-container">
      <div className="landing-page">
        <header className="header">
          <h1 className="title">Text Search Engine</h1>
          <p className="subtitle">
            Compare string search algorithms: Brute Force, Boyer-Moore, and Knuth-Morris-Pratt
          </p>
        </header>
        {/* Action Buttons */}
          <div className="button-group">
            <button
              onClick={handleSearch}
              className="btn btn-primary"
              disabled={!documentText || !searchPattern}
            >
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
            <button onClick={handleReset} className="btn btn-secondary">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>
        <div className="search-form">
          {/* File Upload Section */}
          <div className="form-section">
            <label className="form-label">
              <span className="label-text">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Upload Document
              </span>
            </label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                accept=".txt,.md,.json,.xml,.html,.csv"
                onChange={handleFileUpload}
                className="file-input"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="file-upload-label">
                <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                {fileName || 'Choose a file or drag it here'}
              </label>
            </div>
            {fileName && (
              <div className="file-info">
                <span className="file-name">📄 {fileName}</span>
                <span className="file-size">
                  {(documentText.length / 1024).toFixed(2)} KB ({documentText.length.toLocaleString()} characters)
                </span>
              </div>
            )}
          </div>

          {/* Search Pattern Section */}
          <div className="form-section">
            <label className="form-label" htmlFor="search-pattern">
              <span className="label-text">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Pattern
              </span>
            </label>
            <input
              type="text"
              id="search-pattern"
              value={searchPattern}
              onChange={(e) => setSearchPattern(e.target.value)}
              placeholder="Enter text to search for..."
              className="text-input"
            />
          </div>

          {/* Algorithm Selection Section */}
          <div className="form-section">
            <label className="form-label">
              <span className="label-text">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Select Algorithm
              </span>
            </label>
            <div className="algorithm-cards">
              {Object.entries(algorithms).map(([key, algo]) => (
                <div
                  key={key}
                  className={`algorithm-card ${selectedAlgorithm === key ? 'selected' : ''}`}
                  onClick={() => setSelectedAlgorithm(key)}
                >
                  <div className="radio-wrapper">
                    <input
                      type="radio"
                      id={key}
                      name="algorithm"
                      value={key}
                      checked={selectedAlgorithm === key}
                      onChange={(e) => setSelectedAlgorithm(e.target.value)}
                      className="radio-input"
                    />
                    <div className="radio-custom"></div>
                  </div>
                  <div className="algorithm-info">
                    <h3 className="algorithm-name">{algo.name}</h3>
                    <p className="algorithm-description">{algo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
        </div>

        {/* Info Section */}
        <div className="info-section">
          <h2>How It Works</h2>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-number">1</div>
              <h3>Upload Document</h3>
              <p>Select a text file to search within</p>
            </div>
            <div className="info-card">
              <div className="info-number">2</div>
              <h3>Enter Pattern</h3>
              <p>Type the text you want to find</p>
            </div>
            <div className="info-card">
              <div className="info-number">3</div>
              <h3>Choose Algorithm</h3>
              <p>Select a search algorithm to use</p>
            </div>
            <div className="info-card">
              <div className="info-number">4</div>
              <h3>View Results</h3>
              <p>See highlighted matches and metrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
