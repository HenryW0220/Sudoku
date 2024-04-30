import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import FullSudokuGrid from '../components/FullSudokuGrid';  // Adjust the import path as needed
import '@testing-library/jest-dom';

// Mocking fetch globally to control the API responses for tests
global.fetch = jest.fn((url) =>
  Promise.resolve({
    json: () => Promise.resolve({
      board_contents: new Array(81).fill(0).map((_, index) => (index % 9) + 1),
      board_answer: new Array(81).fill(0).map((_, index) => (index % 9) + 1),
    }),
    ok: true,
  })
) as jest.Mock;

describe('FullSudokuGrid', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays the Sudoku board on component mount', async () => {
    render(<FullSudokuGrid boardId={1} resetBoardId={jest.fn()} />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:5002/boards/retrieve_board/1',
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(screen.getAllByText('1').length).toBeGreaterThan(0); // Check if '1' is rendered multiple times
  });

  it('allows cell selection and highlights the selected cell', async () => {
    render(<FullSudokuGrid boardId={1} resetBoardId={jest.fn()} />);
    await waitFor(() => screen.getByText('1')); // Ensure the board has loaded
    fireEvent.click(screen.getByText('1')); // Simulate clicking a cell with '1'
    // Check for highlighted cells, depending on how you handle shading or selection in CSS
    // This might require you to check class changes or styles
  });

  it('fills a selected Sudoku cell with a number', async () => {
    const { getByText } = render(<FullSudokuGrid boardId={1} resetBoardId={jest.fn()} />);
    await waitFor(() => getByText('1')); // Ensure the board has loaded
    fireEvent.click(getByText('1')); // Select the cell
    fireEvent.click(screen.getByText('1')); // Assuming you have a number pad rendered for input
    // Add your assertion to verify if the cell's value changed
  });

  it('erases a filled Sudoku cell', async () => {
    const { getByText } = render(<FullSudokuGrid boardId={1} resetBoardId={jest.fn()} />);
    await waitFor(() => getByText('1')); // Ensure the board has loaded
    fireEvent.click(getByText('1')); // Select the cell
    fireEvent.click(screen.getByText('1')); // Fill the cell
    fireEvent.click(screen.getByText('Erase')); // Erase the cell
    // Add your assertion to verify if the cell's value is erased
  });

  interface('toggles between showing answers and the player's inputs', async () => {
    render(<FullSudokuGrid boardId={1} resetBoardId={jest.fn()} />);
    fireEvent.click(screen.getByText('ANSWER')); // Simulate clicking the 'ANSWER' button
    await waitFor(() => {
      // Verify that all cells show correct answers
      // This requires knowing how your component changes visually or in state when showing answers
    });
    fireEvent.click(screen.getByText('ANSWER')); // Click 'ANSWER' again to toggle off
    await waitFor(() => {
      // Verify that all cells revert to the player's inputs
    });
  });

  it('handles board resets correctly', async () => {
    const mockReset = jest.fn();
    render(<FullSudokuGrid boardId={1} resetBoardId={mockReset} />);
    fireEvent.click(screen.getByText('QUIT')); // Assuming 'QUIT' triggers a board reset
    expect(mockReset).toHaveBeenCalledWith(0); // Check if resetBoardId was called with the expected argument
  });

});
