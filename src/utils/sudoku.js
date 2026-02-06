// src/utils/sudoku.js

const BLANK = 0;

// Check if placing num at board[row][col] is valid
const isValid = (board, row, col, num) => {
  // Check row and column
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num && i !== col) return false;
    if (board[i][col] === num && i !== row) return false;
  }

  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num &&
        ((startRow + i) !== row || (startCol + j) !== col)) {
        return false;
      }
    }
  }
  return true;
};

// Solving function using backtracking
// Returns true if solvable
const solve = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === BLANK) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) return true;
            board[row][col] = BLANK;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const isSafeInBox = (board, row, col, num) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[row + i][col + j] === num) return false;
    }
  }
  return true;
}

const fillBox = (board, row, col) => {
  let num;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      do {
        num = Math.floor(Math.random() * 9) + 1;
      } while (!isSafeInBox(board, row, col, num));
      board[row + i][col + j] = num;
    }
  }
}

const removeData = (board, count) => {
  let i = 0;
  while (i < count) {
    let cellId = Math.floor(Math.random() * 81);
    let row = Math.floor(cellId / 9);
    let col = cellId % 9;
    if (board[row][col] !== BLANK) {
      board[row][col] = BLANK;
      i++;
    }
  }
}

// Generate a new Sudoku puzzle
// logic:
// 1. Fill diagonal 3x3 matrices (independent)
// 2. Solve the rest to get a complete board
// 3. Remove random elements
export const generateSudoku = (difficulty = 'easy') => {
  // difficulty: number of vacancies
  const vacancies = {
    'easy': 30,
    'medium': 40,
    'hard': 50,
    'expert': 60
  }[difficulty] || 30;

  let board = Array.from({ length: 9 }, () => Array(9).fill(BLANK));

  // Fill diagonal 3x3 matrices
  for (let i = 0; i < 9; i = i + 3) {
    fillBox(board, i, i);
  }

  // Solve completely to fill the rest
  solve(board);

  // Deep copy for solution
  const solution = board.map(row => [...row]);

  // Remove elements to create puzzle
  // We create a deep copy for the puzzle board before removing
  let puzzleBoard = board.map(row => [...row]);
  removeData(puzzleBoard, vacancies);

  return { initialBoard: puzzleBoard, solution };
};

export const checkSolution = (board, solution) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== solution[i][j]) return false;
    }
  }
  return true;
}

// Helper to check if a specific move is valid against current board
export const isMoveValid = (board, row, col, num) => {
  // We pass num but logic should ignore the position (row, col) itself 
  // The isValid function handles checking self.
  return isValid(board, row, col, num);
}
