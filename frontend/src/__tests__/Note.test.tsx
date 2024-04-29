import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Note from '../components/Note';
import SudokuCell from '../components/SudokuCell';

// Mocking the SudokuCell component to simplify testing
jest.mock('../components/SudokuCell', () => (props) => (
  <div
    data-testid={`sudoku-cell-${props.row}-${props.col}`}
    onClick={() => props.sudokuCellSelected(props.row, props.col)}
  >
    {props.initValue} | Notes: {props.note.join(', ')}
  </div>
));

describe('Note Component', () => {
  const sudokuBoardMock = Array.from({ length: 81 }, (_, index) => ({
    value: index % 9,
    provided: false,
    shaded: false,
    selected: false,
    row: Math.floor(index / 9) + 1,
    col: (index % 9) + 1,
    note: [1, 2, 3],
  }));

  const sudokuCellSelectedMock = jest.fn();
  const makeSectorSudokuBoxMock = jest.fn().mockImplementation((row, col) => sudokuBoardMock.slice(0, 9)); // Simplifies to returning first 9 elements

  beforeEach(() => {
    render(
      <Note 
        sudokuBoard={sudokuBoardMock}
        sudokuCellSelected={sudokuCellSelectedMock}
        makeSectorSudokuBox={makeSectorSudokuBoxMock}
      />
    );
  });

  it('renders the correct number of SudokuCell components', () => {
    // Checking for 9 cells because the mock implementation returns only first 9 elements per sector
    const cells = screen.getAllByTestId(/sudoku-cell-/);
    expect(cells.length).toBe(9);
    expect(makeSectorSudokuBoxMock).toHaveBeenCalled();
  });

  it('calls sudokuCellSelected on cell click', () => {
    const firstCell = screen.getByTestId('sudoku-cell-1-1');
    fireEvent.click(firstCell);
    expect(sudokuCellSelectedMock).toHaveBeenCalledWith(1, 1);
  });

  it('displays initial values and notes correctly', () => {
    expect(screen.getByText('0 | Notes: 1, 2, 3')).toBeInTheDocument();
  });
});
