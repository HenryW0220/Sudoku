import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { useAuth } from './hooks/useAuth';

jest.mock('./hooks/useAuth', () => ({
  useAuth: jest.fn()
}));

// Mock components
jest.mock('./components/FullSudokuGrid', () => () => <div>FullSudokuGrid</div>);
jest.mock('./components/AuthForm', () => () => <button>Login Form Button</button>);
jest.mock('./components/HeaderBar', () => () => <div>HeaderBar</div>);

describe('App', () => {
  it('renders AuthForm when user is not logged in', () => {
    useAuth.mockImplementation(() => ({
      isLoggedIn: false,
      user: null,
      onLogin: jest.fn(),
      onLogout: jest.fn(),
      loadMe: jest.fn(),
    }));

    render(<App />);
    expect(screen.getByText('Login Form Button')).toBeInTheDocument();
    expect(screen.queryByText('FullSudokuGrid')).not.toBeInTheDocument();
  });

  it('renders HeaderBar and FullSudokuGrid when user is logged in', () => {
    useAuth.mockImplementation(() => ({
      isLoggedIn: true,
      user: { username: 'testuser' },
      onLogin: jest.fn(),
      onLogout: jest.fn(),
      loadMe: jest.fn(),
    }));

    render(<App />);
    expect(screen.getByText('HeaderBar')).toBeInTheDocument();
    expect(screen.getByText('FullSudokuGrid')).toBeInTheDocument();
  });
});
