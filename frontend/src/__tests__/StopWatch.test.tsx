import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Stopwatch from '../components/Stopwatch';

jest.useFakeTimers();

describe('Stopwatch Component', () => {
    beforeEach(() => {
        render(<Stopwatch />);
    });

    it('initially displays 00:00 as the time', () => {
        expect(screen.getByText('00:00')).toBeInTheDocument();
    });

    it('starts the timer when start button is clicked', () => {
        fireEvent.click(screen.getByText('Start'));
        act(() => {
            jest.advanceTimersByTime(1000); // Advance the timers by 1 second
        });
        expect(screen.getByText('00:01')).toBeInTheDocument();
    });

    it('stops the timer when stop button is clicked', () => {
        fireEvent.click(screen.getByText('Start'));
        act(() => {
            jest.advanceTimersByTime(3000); // Timer should count 3 seconds
        });
        fireEvent.click(screen.getByText('Stop'));
        act(() => {
            jest.advanceTimersByTime(1000); // Additional second shouldn't count
        });
        expect(screen.getByText('00:03')).toBeInTheDocument();
    });

    it('resets the timer when reset button is clicked', () => {
        fireEvent.click(screen.getByText('Start'));
        act(() => {
            jest.advanceTimersByTime(5000); // Timer should count 5 seconds
        });
        fireEvent.click(screen.getByText('Reset'));
        expect(screen.getByText('00:00')).toBeInTheDocument();
    });

    it('formats time correctly over a minute', () => {
        fireEvent.click(screen.getByText('Start'));
        act(() => {
            jest.advanceTimersByTime(65000); // 1 minute and 5 seconds
        });
        expect(screen.getByText('01:05')).toBeInTheDocument();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });
});
