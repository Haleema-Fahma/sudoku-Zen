import React, { useState, useEffect, useCallback } from 'react';
import Board from './Board';
import Controls from './Controls';
import { generateSudoku, isMoveValid, checkSolution } from '../utils/sudoku';
import confetti from 'canvas-confetti';

const Game = ({ onBack, onGameWin, difficulty = 'easy', soundEnabled = true }) => {
    const [board, setBoard] = useState(Array(9).fill().map(() => Array(9).fill(0)));
    const [initialBoard, setInitialBoard] = useState(Array(9).fill().map(() => Array(9).fill(0)));
    const [solution, setSolution] = useState(Array(9).fill().map(() => Array(9).fill(0)));
    const [selectedCell, setSelectedCell] = useState(null);
    const [timer, setTimer] = useState(0);
    const [isGameActive, setIsGameActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [invalidCells, setInvalidCells] = useState([]);
    const [gameWon, setGameWon] = useState(false);

    // Initialize Game
    const startNewGame = useCallback(() => {
        const { initialBoard, solution } = generateSudoku(difficulty);
        // Deep copy for board state
        const boardCopy = initialBoard.map(row => [...row]);

        setBoard(boardCopy);
        setInitialBoard(initialBoard.map(row => [...row]));
        setSolution(solution);
        setTimer(0);
        setIsGameActive(true);
        setIsPaused(false);
        setGameWon(false);
        setInvalidCells([]);
        setSelectedCell(null);
    }, [difficulty]);

    useEffect(() => {
        startNewGame();
    }, [startNewGame]);

    // Timer Logic
    useEffect(() => {
        let interval = null;
        if (isGameActive && !gameWon && !isPaused) {
            interval = setInterval(() => {
                setTimer(t => t + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isGameActive, gameWon, isPaused]);

    // Format Timer
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Interaction
    const handleCellClick = (row, col) => {
        if (!isPaused) setSelectedCell({ row, col });
    };

    const handleCellChange = (row, col, val) => {
        if (!isGameActive || gameWon || isPaused) return;

        // Check if prefilled
        if (initialBoard[row][col] !== 0) return;

        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = val;
        setBoard(newBoard);

        // Check conflicts
        const faults = [];
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const cellVal = newBoard[r][c];
                if (cellVal === 0) continue;
                if (!isMoveValid(newBoard, r, c, cellVal)) {
                    faults.push({ row: r, col: c });
                }
            }
        }
        setInvalidCells(faults);

        // Check Win Condition
        const isFull = newBoard.every(r => r.every(c => c !== 0));
        if (isFull && faults.length === 0) {
            handleGameWinLocal();
        }
    };

    // Keyboard Nav
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isGameActive || !selectedCell || isPaused) return;

            let { row, col } = selectedCell;

            if (e.key === 'ArrowUp') row = Math.max(0, row - 1);
            if (e.key === 'ArrowDown') row = Math.min(8, row + 1);
            if (e.key === 'ArrowLeft') col = Math.max(0, col - 1);
            if (e.key === 'ArrowRight') col = Math.min(8, col + 1);

            if (row !== selectedCell.row || col !== selectedCell.col) {
                setSelectedCell({ row, col });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedCell, isGameActive, isPaused]);

    const handleGameWinLocal = () => {
        setGameWon(true);
        setIsGameActive(false);
        if (soundEnabled) {
            // Placeholder for sound effect
        }
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
        setTimeout(() => {
            onGameWin(timer);
        }, 1500);
    };

    const handleCheckSolution = () => {
        const isCorrect = checkSolution(board, solution);
        if (isCorrect) {
            handleGameWinLocal();
        } else {
            const faults = [];
            for (let r = 0; r < 9; r++) {
                for (let c = 0; c < 9; c++) {
                    if (board[r][c] !== 0 && board[r][c] !== solution[r][c]) {
                        faults.push({ row: r, col: c });
                    }
                }
            }
            setInvalidCells(faults);
        }
    };

    const handleReset = () => {
        setBoard(initialBoard.map(row => [...row]));
        setInvalidCells([]);
        setIsPaused(false);
    };

    const togglePause = () => {
        setIsPaused(prev => !prev);
    };

    return (
        <div className="page fade-in game-container">
            <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>

                {/* Header */}
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <button className="icon-btn" onClick={onBack} title="Back">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
                    </button>

                    <div className="timer-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        {formatTime(timer)}
                    </div>

                    <button className="icon-btn" onClick={togglePause} title="Pause">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                    </button>
                </div>

                {/* Board Container */}
                <div style={{ position: 'relative', width: '100%' }}>
                    <Board
                        board={board}
                        initialBoard={initialBoard}
                        selectedCell={selectedCell}
                        onCellClick={handleCellClick}
                        onCellChange={handleCellChange}
                        invalidCells={invalidCells}
                        sameNumberValue={selectedCell ? board[selectedCell.row][selectedCell.col] : 0}
                    />

                    {/* Pause Overlay */}
                    {isPaused && (
                        <div className="pause-overlay">
                            <h3>Paused</h3>
                            <button className="btn primary" onClick={togglePause}>Resume</button>
                            <button className="btn secondary" onClick={() => { setIsPaused(false); startNewGame(); }}>Restart</button>
                            <button className="btn secondary" onClick={onBack}>Quit</button>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div style={{
                    opacity: isPaused ? 0.3 : 1,
                    pointerEvents: isPaused ? 'none' : 'auto',
                    transition: '0.3s',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Controls
                        onNewGame={() => startNewGame()}
                        onCheck={handleCheckSolution}
                        onReset={handleReset}
                    />
                </div>

            </div>
        </div>
    );
};

export default Game;
