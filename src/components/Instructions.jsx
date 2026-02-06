import React from 'react';

const Instructions = ({ onBack }) => {
    return (
        <div className="page fade-in">
            <div className="glass-panel instructions-panel">
                <h2>How to Play</h2>

                <div className="instructions-content">
                    <div className="rule-item">
                        <span className="rule-icon">1</span>
                        <p>Fill the grid so that every row, column, and 3x3 box contains the numbers 1 through 9.</p>
                    </div>
                    <div className="rule-item">
                        <span className="rule-icon">2</span>
                        <p>Don't repeat any numbers in the same row, column, or 3x3 box.</p>
                    </div>
                    <div className="rule-item">
                        <span className="rule-icon">3</span>
                        <p>Use logic to solve the puzzle. No guessing needed!</p>
                    </div>
                </div>

                <button className="btn secondary" onClick={onBack} style={{ marginTop: '20px' }}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Instructions;
