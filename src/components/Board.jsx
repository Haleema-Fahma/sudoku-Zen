import React from 'react';
import Cell from './Cell';

const Board = ({ board, initialBoard, selectedCell, onCellClick, onCellChange, invalidCells, sameNumberValue }) => {
    return (
        <div className="sudoku-board">
            {board.map((row, rIndex) => (
                row.map((val, cIndex) => {
                    const isPrefilled = initialBoard[rIndex][cIndex] !== 0;
                    const isSelected = selectedCell && selectedCell.row === rIndex && selectedCell.col === cIndex;
                    const isInvalid = invalidCells.some(c => c.row === rIndex && c.col === cIndex);
                    const isSameNumber = sameNumberValue !== 0 && val === sameNumberValue;

                    return (
                        <Cell
                            key={`${rIndex}-${cIndex}`}
                            value={val}
                            isPrefilled={isPrefilled}
                            isSelected={isSelected}
                            isInvalid={isInvalid}
                            isSameNumber={isSameNumber}
                            onClick={() => onCellClick(rIndex, cIndex)}
                            onChange={(newValue) => onCellChange(rIndex, cIndex, newValue)}
                        />
                    );
                })
            ))}
        </div>
    );
};

export default Board;
