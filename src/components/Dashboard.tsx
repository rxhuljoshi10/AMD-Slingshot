import { useState } from 'react';
import './Dashboard.css';

// Simple Icons
const FlameIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
);
const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);

const WeeklyChart = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const heights = [40, 70, 45, 90, 60, 85, 30]; // Mock data

  return (
    <div className="weekly-chart">
      {heights.map((h, i) => (
        <div key={i} className="chart-bar-container">
          <div className="chart-bar" style={{ height: `${h}%` }}></div>
          <div className="chart-day">{days[i]}</div>
        </div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [activeGoal, setActiveGoal] = useState('maintenance');

  const goals = [
    { id: 'weight-loss', label: 'Weight Loss', desc: 'Caloric deficit' },
    { id: 'maintenance', label: 'Maintenance', desc: 'Sustain weight' },
    { id: 'muscle-gain', label: 'Muscle Gain', desc: 'High protein focus' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Your AI Hub</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Track your progress and get smart insights.</p>
      </div>

      <section>
        <h3 style={{ marginBottom: '1rem' }}>Current Goal</h3>
        <div className="goals-section">
          {goals.map((g) => (
            <div 
              key={g.id} 
              className={`goal-card ${activeGoal === g.id ? 'active' : ''}`}
              onClick={() => setActiveGoal(g.id)}
            >
              <div className="goal-icon">
                <TargetIcon />
              </div>
              <div className="goal-info">
                <h4>{g.label}</h4>
                <p>{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Smart Choice Score</h3>
            <div style={{ color: 'var(--accent-primary)' }}><TrendingUpIcon /></div>
          </div>
          <div className="stat-value">84<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/100</span></div>
          <div className="stat-subtext">You're making 15% better choices than last week!</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Current Streak</h3>
            <div style={{ color: '#fb923c' }}><FlameIcon /></div>
          </div>
          <div className="stat-value">12<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}> Days</span></div>
          <div className="stat-subtext">Consistently logging healthy meals. Keep it up!</div>
        </div>

        <div className="stat-card" style={{ gridColumn: '1 / -1' }}>
          <div className="stat-header">
            <h3>Weekly Behavior Pattern (Health Score)</h3>
          </div>
          <WeeklyChart />
        </div>
      </section>
    </div>
  );
}
