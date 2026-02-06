import React, { useState } from 'react';
import Home from './components/Home';
import Game from './components/Game';
import Instructions from './components/Instructions';
import DifficultySelect from './components/DifficultySelect';
import Settings from './components/Settings';

const App = () => {
  // Views: 'home', 'difficulty', 'game', 'instructions', 'settings', 'success'
  const [currentView, setCurrentView] = useState('home');
  const [difficulty, setDifficulty] = useState('easy');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [finalTime, setFinalTime] = useState(0);

  // Simple persisted theme effect
  React.useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Navigation Handlers
  const goHome = () => setCurrentView('home');
  const goDifficulty = () => setCurrentView('difficulty');
  const goInstructions = () => setCurrentView('instructions');
  const goSettings = () => setCurrentView('settings');

  const startGame = (diff) => {
    setDifficulty(diff);
    setCurrentView('game');
  };

  const handleGameWin = (time) => {
    setFinalTime(time);
    setCurrentView('success');
  };

  // Settings Handlers
  const toggleSound = () => setSoundEnabled(p => !p);
  const toggleDarkMode = () => setDarkMode(p => !p);
  const resetProgress = () => {
    // Mock reset
    alert("Progress has been reset!");
  };

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>

      {currentView === 'home' && (
        <Home
          onStart={goDifficulty}
          onInstructions={goInstructions}
          onSettings={goSettings}
        />
      )}

      {currentView === 'difficulty' && (
        <DifficultySelect
          onSelectDifficulty={startGame}
          onBack={goHome}
        />
      )}

      {currentView === 'game' && (
        <Game
          difficulty={difficulty}
          onBack={goHome}
          onGameWin={handleGameWin}
          soundEnabled={soundEnabled}
        />
      )}

      {currentView === 'instructions' && (
        <Instructions onBack={goHome} />
      )}

      {currentView === 'settings' && (
        <Settings
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onResetProgress={resetProgress}
          onBack={goHome}
        />
      )}

      {currentView === 'success' && (
        <div className="page fade-in">
          <div className="glass-panel text-center">
            <h2 className="title-large">🎉 Perfect!</h2>
            <p className="subtitle" style={{ margin: '20px 0' }}>
              Checked & Solved in <span style={{ color: '#00d2ff', fontWeight: 'bold' }}>{formatTime(finalTime)}</span>
            </p>
            <div className="menu-buttons">
              <button className="btn primary large-btn" onClick={goDifficulty}>
                Play Again
              </button>
              <button className="btn secondary large-btn" onClick={goHome}>
                Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
