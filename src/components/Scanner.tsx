import { useState } from 'react';
import './Scanner.css';

const UploadIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
);
const CameraIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
);
const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
);

export default function Scanner() {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'results'>('idle');

  const handleUpload = () => {
    setScanState('scanning');
    // Simulate AI processing time
    setTimeout(() => {
      setScanState('results');
    }, 2500);
  };

  return (
    <div className="scanner-container">
      <div className="scanner-header">
        <h2>AI Food Scanner</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Upload or snap a photo of your meal for instant analysis.</p>
      </div>

      {scanState === 'idle' && (
        <div className="upload-area" onClick={handleUpload}>
          <div className="upload-icon">
            <UploadIcon />
          </div>
          <h3>Click or Drag to Scan</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Supports JPG, PNG (Max 5MB)
          </p>
        </div>
      )}

      {scanState === 'scanning' && (
        <div className="upload-area" style={{ pointerEvents: 'none' }}>
          <div className="scanning-overlay">
            <div className="laser-line"></div>
            <CameraIcon />
            <div className="scanning-text">Analyzing Macros & Context...</div>
          </div>
        </div>
      )}

      {scanState === 'results' && (
        <div className="results-grid">
          <div className="score-card">
            <h3>Health Score</h3>
            <div className="score-circle health">
              42
            </div>
            <p><strong>Item detected:</strong> Double Cheeseburger</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>High in saturated fats and sodium.</p>
          </div>

          <div className="score-card regret">
            <h3>Regret Score</h3>
            <div className="score-circle regret">
              88
            </div>
            <p><strong>Impact on Goal:</strong> Severe</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Will break your current 12-day streak for 'Weight Loss'.</p>
          </div>

          <div className="alternatives-section">
            <h3>Smart Swaps</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Craving something savory and heavy? Try these instead:
            </p>
            
            <div className="alt-card">
              <div>
                <strong>Turkey Burger on Whole Wheat</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0' }}>
                  Hits the savory notes with 60% less saturated fat.
                </p>
              </div>
              <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                Health: 85
              </div>
            </div>

            <div className="alt-card">
              <div>
                <strong>Grilled Portobello Mushroom Burger</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0' }}>
                  Excellent umami flavor, extremely low calorie.
                </p>
              </div>
              <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                Health: 95
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
              <button className="custom-button reset-button" onClick={() => setScanState('idle')}>
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
