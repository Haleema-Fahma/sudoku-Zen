import React from 'react';

const Controls = ({ onNewGame, onCheck, onReset }) => {
    return (
        <div style={{ width: '100%', maxWidth: '500px' }}>


            {/* Game Actions */}
            <div className="controls">
                <button className="btn secondary" onClick={onReset} title="Reset Board">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12" />
                        <path d="M3 3v9h9" />
                    </svg>
                    Reset
                </button>
                <button className="btn primary" onClick={onCheck} title="Check Solution">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    Check
                </button>
                <button className="btn secondary" onClick={onNewGame} title="Start New Game">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    New Game
                </button>
            </div>
        </div>
    );
};

export default Controls;
