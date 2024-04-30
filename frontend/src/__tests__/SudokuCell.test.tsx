import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SudokuCell from '../components/SudokuCell';

describe('SudokuCell Component', () => {
    const mockSudokuCellSelected = jest.fn();

    it('renders with initial value', () => {
        render(<SudokuCell initValue={5} row={1} col={1} sudokuCellSelected={mockSudokuCellSelected} shaded={false} isNote={false} provided={true} />);
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders notes when isNote is true', () => {
        render(<SudokuCell initValue={0} note={[1, 3, 5]} row={1} col={1} sudokuCellSelected={mockSudokuCellSelected} shaded={false} isNote={true} provided={false} />);
        expect(screen.getByText('1')).toHaveOpacity('1');
        expect(screen.getByText('3')).toHaveOpacity('1');
        expect(screen.getByText('5')).toHaveOpacity('1');
        expect(screen.queryByText('2')).toBeNull();
    });

    it('calls sudokuCellSelected when cell is clicked', () => {
        render(<SudokuCell initValue={5} row={1} col={1} sudokuCellSelected={mockSudokuCellSelected} shaded={false} isNote={false} provided={true} />);
        fireEvent.click(screen.getByText('5'));
        expect(mockSudokuCellSelected).toHaveBeenCalledWith(1, 1);
    });

    it('changes background color when shaded is true', () => {
        render(<SudokuCell initValue={5} row={1} col={1} sudokuCellSelected={mockSudokuCellSelected} shaded={true} isNote={false} provided={true} />);
        const cell = screen.getByText('5').parentElement;
        expect(cell).toHaveClass('bg-purple-100');
    });

    it('displays provided number in bold when provided is true', () => {
        render(<SudokuCell initValue={5} row={1} col={1} sudokuCellSelected={mockSudokuCellSelected} shaded={false} isNote={false} provided={true} />);
        const number = screen.getByText('5');
        expect(number).toHaveStyle('font-weight: bold');
    });

    it('changes background color based on correctness when showing answers', () => {
        const { rerender } = render(<SudokuCell initValue={5} row={1} col={1} sudokuCellSelected={mockSudokuCellSelected} shaded={false} isNote={false} provided={false} correct={true} showingAnswer={true} />);
        const cell = screen.getByText('5').parentElement;
        expect(cell).toHaveClass('bg-green-100'); // Correct non-provided

        rerender(<SudokuCell initValue={5} row={1} col={1} sudokuCellSelected={mockSudokuCellSelected} shaded={false} isNote={false} provided={false} correct={false} showingAnswer={true} />);
        expect(cell).toHaveClass('bg-red-100'); // Incorrect non-provided
    });
});
