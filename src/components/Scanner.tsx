import { useState } from 'react';
import { getScannerResults } from '../lib/gemini';
import './Scanner.css';

const CameraIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);
const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
);

interface ScanResult {
  healthScore: number;
  regretScore: number;
  itemDetected: string;
  healthDesc: string;
  regretDesc: string;
  alternatives: { name: string; reason: string; health: number }[];
}

export default function Scanner() {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'results'>('idle');
  const [foodInput, setFoodInput] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async () => {
    if (!foodInput.trim()) return;
    setScanState('scanning');
    
    try {
      const res = await getScannerResults(foodInput);
      setResult(res);
      setScanState('results');
    } catch (e) {
      console.error(e);
      setScanState('idle');
    }
  };

  return (
    <div className="scanner-container">
      <div className="scanner-header">
        <h2>AI Food Scanner</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Tell us what you're eating for an instant Health & Regret analysis.</p>
      </div>

      {scanState === 'idle' && (
        <div className="craving-input-wrapper" style={{ marginTop: '2rem' }}>
          <label style={{ fontWeight: 600 }}>What are you about to eat?</label>
          <div className="search-bar">
            <input 
              type="text" 
              className="search-input" 
              placeholder="e.g., A large pepperoni pizza..."
              value={foodInput}
              onChange={(e) => setFoodInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScan()}
            />
            <button className="action-btn" onClick={handleScan} disabled={!foodInput.trim()}>
              Scan Item
            </button>
          </div>
        </div>
      )}

      {scanState === 'scanning' && (
        <div className="upload-area" style={{ pointerEvents: 'none', height: '300px' }}>
          <div className="scanning-overlay">
            <div className="laser-line"></div>
            <CameraIcon />
            <div className="scanning-text">Analyzing Macros & Context...</div>
          </div>
        </div>
      )}

      {scanState === 'results' && result && (
        <div className="results-grid">
          <div className="score-card">
            <h3>Health Score</h3>
            <div className="score-circle health">
              {result.healthScore}
            </div>
            <p><strong>Item detected:</strong> {result.itemDetected}</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{result.healthDesc}</p>
          </div>

          <div className="score-card regret">
            <h3>Regret Score</h3>
            <div className="score-circle regret">
              {result.regretScore}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem' }}>{result.regretDesc}</p>
          </div>

          <div className="alternatives-section">
            <h3>Smart Swaps</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Want to improve your score? Try these alternatives:
            </p>
            
            {result.alternatives.map((alt, idx) => (
              <div key={idx} className="alt-card">
                <div>
                  <strong>{alt.name}</strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0' }}>
                    {alt.reason}
                  </p>
                </div>
                <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                  Health: {alt.health}
                </div>
              </div>
            ))}
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
              <button 
                className="custom-button reset-button" 
                onClick={() => {
                  setFoodInput('');
                  setScanState('idle');
                  setResult(null);
                }}
              >
                <RefreshIcon /> Scan Again
              </button>
              <button className="custom-button">
                Log Alternative
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
