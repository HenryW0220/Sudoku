import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MainMenu from '../components/MainMenu';  // Adjust the import path as needed
import FullSudokuGrid from '../components/FullSudokuGrid';

// Mock for fetch to control responses for board retrieval
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  })
) as jest.Mock;

jest.mock('../components/FullSudokuGrid', () => (props) => <div data-testid="full-sudoku-grid" boardId={props.boardId}></div>);

describe('MainMenu Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches board IDs on component mount and displays buttons for each board', async () => {
    render(<MainMenu />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith('http://localhost:5002/boards/retrieve_all_board_ids');
    expect(screen.getAllByText(/Board \d+/i).length).toBeGreaterThan(0); // Checks for buttons for boards
  });

  it('changes displayed boards on next and back button clicks', async () => {
    render(<MainMenu />);
    await waitFor(() => screen.getByText('Board 1')); // Wait for initial boards to be displayed

    fireEvent.click(screen.getByText('>')); // Click next button
    expect(screen.queryByText('Board 1')).not.toBeInTheDocument();
    expect(screen.getByText('Board 6')).toBeInTheDocument(); // This depends on how many boards you display per "page"

    fireEvent.click(screen.getByText('<')); // Click back button
    expect(screen.getByText('Board 1')).toBeInTheDocument();
    expect(screen.queryByText('Board 6')).not.toBeInTheDocument();
  });

  it('displays FullSudokuGrid when a board is selected', async () => {
    render(<MainMenu />);
    await waitFor(() => screen.getByText('Board 1'));
    fireEvent.click(screen.getByText('Board 1'));
    expect(screen.getByTestId('full-sudoku-grid')).toBeInTheDocument();
    expect(screen.getByTestId('full-sudoku-grid')).toHaveAttribute('boardId', '1');
  });

  it('should show different levels for different board IDs', async () => {
    render(<MainMenu />);
    await waitFor(() => screen.getByText('Board 1'));
    expect(screen.getByText('Level: Hard')).toBeInTheDocument(); // Assuming board ID 1 corresponds to "Hard"
    expect(screen.getByText('Level: Easy')).toBeInTheDocument(); // Assuming there's an "Easy" level shown initially
  });
});
