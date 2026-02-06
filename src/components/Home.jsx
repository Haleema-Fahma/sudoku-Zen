import React from 'react';

const Home = ({ onStart, onInstructions, onSettings }) => {
    return (
        <div className="page fade-in home-container">
            <div className="glass-panel home-panel">
                <h1 className="title-large">Sudoku Zen</h1>
                <p className="subtitle">Relax, Solve, Evolve.</p>

                <div className="menu-buttons">
                    <button className="btn primary large-btn" onClick={onStart}>
                        <span>▶</span> Start Game
                    </button>
                    <button className="btn secondary large-btn" onClick={onInstructions}>
                        <span>?</span> How to Play
                    </button>
                    <button className="btn secondary large-btn" onClick={onSettings}>
                        <span>⚙</span> Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
