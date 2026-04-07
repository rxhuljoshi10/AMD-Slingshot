import { useState, useEffect } from 'react';
import './FloatingNudge.css';

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

export default function FloatingNudge() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    // Simulate proactive AI detecting a context/habit loop after app load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsHiding(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsHiding(false);
    }, 400); // match CSS animation duration
  };

  if (!isVisible) return null;

  return (
    <div className={`nudge-container ${isHiding ? 'hiding' : ''}`}>
      <div className="nudge-header">
        <div className="nudge-title">
          <BellIcon />
          <span>Pattern Detected</span>
        </div>
        <button className="close-btn" onClick={handleClose}>
          <XIcon />
        </button>
      </div>
      
      <div className="nudge-content">
        <strong>It's 3:00 PM!</strong> We noticed you often experience a sugar craving right now due to afternoon fatigue. 
        <br/><br/>
        Before you hit the vending machine, how about trying a chilled apple with peanut butter to maintain your 12-day streak?
      </div>

      <div className="nudge-actions">
        <button className="nudge-btn primary" onClick={handleClose}>Log Healthy Snack</button>
        <button className="nudge-btn secondary" onClick={handleClose}>Dismiss</button>
      </div>
    </div>
  );
}
