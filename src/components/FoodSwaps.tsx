import { useState } from 'react';
import { getFoodSwaps } from '../lib/gemini';
import './FoodSwaps.css';

const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);

interface SwapResult {
  name: string;
  matchScore: number;
  reason: string;
  macros: string[];
}

export default function FoodSwaps() {
  const [craving, setCraving] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [swaps, setSwaps] = useState<SwapResult[] | null>(null);

  const handleSearch = async () => {
    if (!craving.trim()) return;
    setIsSearching(true);
    setSwaps(null);
    
    try {
      const results = await getFoodSwaps(craving);
      setSwaps(results);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
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

      {swaps && (
        <div className="swap-results">
          {swaps.map((swap, idx) => (
            <div key={idx} className="swap-card">
              <div className="swap-card-header">
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{swap.name}</h3>
                <span className="match-score">{swap.matchScore}% Match</span>
              </div>
              <div className="swap-card-body">
                <div className="swap-reason">
                  <strong>Why it works:</strong> {swap.reason}
                </div>
                <div className="macro-badges">
                  {swap.macros.map((macro, i) => (
                    <span 
                      key={i} 
                      className={`macro-badge ${macro.startsWith('+') || macro.startsWith('-') ? 'good' : ''}`}
                    >
                      {macro}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {swaps.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', gridColumn: '1/-1' }}>
              No swaps found. Please try a different craving!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
