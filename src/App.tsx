import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Scanner from './components/Scanner';
import ChatCoach from './components/ChatCoach';
import './App.css';

// Simple SVG Icons for the MVP (Phase 1)
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const ScanIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>
);
const ChatIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
);
const SwapsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>
);

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: <HomeIcon /> },
    { id: 'scan', label: 'Scanner', icon: <ScanIcon /> },
    { id: 'chat', label: 'AI Coach', icon: <ChatIcon /> },
    { id: 'swaps', label: 'Food Swaps', icon: <SwapsIcon /> },
  ];

  return (
    <div className="app-layout">
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo-icon">E</div>
          <div className="logo-text">EatWise</div>
        </div>
        
        <nav style={{ width: '100%' }}>
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.id);
              }}
            >
              <div className="nav-icon">{item.icon}</div>
              <div className="nav-text">{item.label}</div>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="main-wrapper">
        <header className="top-header">
          <div className="header-title">
            {navItems.find(i => i.id === activeTab)?.label || 'EatWise'}
          </div>
          <div className="user-profile">
            <div className="avatar">U</div>
          </div>
        </header>
        
        <main className="main-content">
          {activeTab === 'home' && <Dashboard />}
          {activeTab === 'scan' && <Scanner />}
          {activeTab === 'chat' && <ChatCoach />}
          {activeTab === 'swaps' && (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <h2>Coming Soon</h2>
              <p style={{ marginTop: '1rem' }}>
                Food Swaps engine will be available here.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`bottom-nav-link ${activeTab === item.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(item.id);
            }}
          >
            {item.icon}
            <span style={{ marginTop: '2px' }}>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

export default App;
