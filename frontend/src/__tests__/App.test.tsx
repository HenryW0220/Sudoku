import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import MainMenu from '../components/MainMenu';
import AuthForm from '../components/AuthForm';
import HeaderBar from '../components/HeaderBar';

// Mock the hooks and components to isolate testing the App component
jest.mock('../components/MainMenu', () => () => <div>MainMenu Mock</div>);
jest.mock('../components/AuthForm', () => () => <div>AuthForm Mock</div>);
jest.mock('../components/HeaderBar', () => () => <div>HeaderBar Mock</div>);
jest.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    isLoggedIn: false,
    onLogin: jest.fn(),
    onLogout: jest.fn(),
    user: null,
    loadMe: jest.fn(),
  }),
}));

describe('App Component', () => {
  it('renders AuthForm when not logged in', () => {
    render(<App />);
    expect(screen.getByText('AuthForm Mock')).toBeInTheDocument();
    expect(screen.queryByText('MainMenu Mock')).not.toBeInTheDocument();
    expect(screen.queryByText('HeaderBar Mock')).not.toBeInTheDocument();
  });

  it('renders MainMenu and HeaderBar when logged in', () => {
    // Update the mock to simulate logged in state
    jest.mock('../hooks/useAuth', () => ({
      useAuth: () => ({
        isLoggedIn: true,
        onLogin: jest.fn(),
        onLogout: jest.fn(),
        user: { name: 'John Doe' },
        loadMe: jest.fn(),
      }),
    }));
    render(<App />);
    expect(screen.getByText('MainMenu Mock')).toBeInTheDocument();
    expect(screen.getByText('HeaderBar Mock')).toBeInTheDocument();
    expect(screen.queryByText('AuthForm Mock')).not.toBeInTheDocument();
  });

  it('calls loadMe on component mount', () => {
    const loadMeMock = jest.fn();
    jest.mock('../hooks/useAuth', () => ({
      useAuth: () => ({
        isLoggedIn: false,
        onLogin: jest.fn(),
        onLogout: jest.fn(),
        user: null,
        loadMe: loadMeMock,
      }),
    }));
    render(<App />);
    expect(loadMeMock).toHaveBeenCalled();
  });
});
