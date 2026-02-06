import React from 'react';

const Settings = ({
    soundEnabled,
    toggleSound,
    darkMode,
    toggleDarkMode,
    onResetProgress,
    onBack
}) => {
    return (
        <div className="page fade-in">
            <div className="glass-panel" style={{ maxWidth: '400px', width: '90%' }}>
                <h2 style={{ marginBottom: '2rem' }}>Settings</h2>

                <div className="settings-list">
                    {/* Sound Toggle */}
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="setting-label">Sound Effects</span>
                            <span className="setting-desc">{soundEnabled ? 'On' : 'Off'}</span>
                        </div>
                        <button
                            className={`toggle-btn ${soundEnabled ? 'active' : ''}`}
                            onClick={toggleSound}
                        >
                            <div className="toggle-thumb"></div>
                        </button>
                    </div>

                    {/* Dark Mode Toggle */}
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="setting-label">Dark Mode</span>
                            <span className="setting-desc">{darkMode ? 'On' : 'Off'}</span>
                        </div>
                        <button
                            className={`toggle-btn ${darkMode ? 'active' : ''}`}
                            onClick={toggleDarkMode}
                        >
                            <div className="toggle-thumb"></div>
                        </button>
                    </div>

                    {/* Reset Progress */}
                    <div className="setting-item" style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                        <div className="setting-info">
                            <span className="setting-label">Game Data</span>
                            <span className="setting-desc">Clear all stats</span>
                        </div>
                        <button className="btn secondary small-btn" onClick={onResetProgress}>
                            Reset
                        </button>
                    </div>
                </div>

                <button className="btn secondary" onClick={onBack} style={{ marginTop: '2rem', width: '100%' }}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default Settings;
