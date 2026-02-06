import React from 'react';

const DifficultySelect = ({ onSelectDifficulty, onBack }) => {
    const difficulties = [
        { id: 'easy', label: 'Easy', color: '#4facfe' },
        { id: 'medium', label: 'Medium', color: '#00f2fe' },
        { id: 'hard', label: 'Hard', color: '#f093fb' },
        { id: 'expert', label: 'Expert', color: '#ff6b6b' },
    ];

    return (
        <div className="page fade-in">
            <div className="glass-panel" style={{ maxWidth: '400px', width: '90%' }}>
                <h2 style={{ marginBottom: '2rem' }}>Select Difficulty</h2>

                <div className="difficulty-grid">
                    {difficulties.map((diff) => (
                        <button
                            key={diff.id}
                            className="difficulty-card"
                            onClick={() => onSelectDifficulty(diff.id)}
                            style={{ '--hover-color': diff.color }}
                        >
                            <div className="diff-icon" style={{ background: diff.color }}></div>
                            <span className="diff-label">{diff.label}</span>
                        </button>
                    ))}
                </div>

                <button className="btn secondary" onClick={onBack} style={{ marginTop: '2rem', width: '100%' }}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default DifficultySelect;
