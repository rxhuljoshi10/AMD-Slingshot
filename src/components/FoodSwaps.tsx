import { useState } from 'react';
import './FoodSwaps.css';

const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);

export default function FoodSwaps() {
  const [craving, setCraving] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!craving.trim()) return;
    setIsSearching(true);
    
    // Simulate AI lookup
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  };

  return (
    <div className="swaps-container">
      <div className="swaps-header">
        <h2>Craving Coach & Food Swaps</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Identify what you're craving and we'll find a practical, healthy alternative that hits the spot.</p>
      </div>

      <div className="craving-input-wrapper">
        <label htmlFor="craving-input" style={{ fontWeight: 600 }}>What are you craving?</label>
        <div className="search-bar">
          <input 
            id="craving-input"
            type="text" 
            className="search-input" 
            placeholder="e.g., Greasy potato chips..."
            value={craving}
            onChange={(e) => setCraving(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            disabled={isSearching}
          />
          <button 
            className="action-btn" 
            onClick={handleSearch}
            disabled={isSearching || !craving.trim()}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {isSearching ? 'Thinking...' : <><SparklesIcon /> Find Swaps</>}
          </button>
        </div>
      </div>

      {hasSearched && (
        <div className="swap-results">
          <div className="swap-card">
            <div className="swap-card-header">
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Air-Popped Popcorn</h3>
              <span className="match-score">98% Match</span>
            </div>
            <div className="swap-card-body">
              <div className="swap-reason">
                <strong>Why it works:</strong> Perfectly replicates the "crunch" and salty factor of chips, but at a fraction of the caloric density.
              </div>
              <div className="macro-badges">
                <span className="macro-badge good">-70% Calories</span>
                <span className="macro-badge good">-85% Fat</span>
                <span className="macro-badge">+ High Volume</span>
              </div>
            </div>
          </div>

          <div className="swap-card">
            <div className="swap-card-header">
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Roasted Chickpeas</h3>
              <span className="match-score">85% Match</span>
            </div>
            <div className="swap-card-body">
              <div className="swap-reason">
                <strong>Why it works:</strong> Crunchy, highly savory, and packed with fiber and protein to keep you full longer than chips ever could.
              </div>
              <div className="macro-badges">
                <span className="macro-badge good">+15g Protein</span>
                <span className="macro-badge good">+High Fiber</span>
                <span className="macro-badge good">-50% Calories</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
