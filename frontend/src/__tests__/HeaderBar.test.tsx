import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HeaderBar from '../components/HeaderBar';  // Adjust the import path as needed

describe('HeaderBar Component', () => {
  const user = { username: 'JohnDoe' };
  const onLogoutMock = jest.fn();

  beforeEach(() => {
    render(<HeaderBar user={user} onLogout={onLogoutMock} />);
  });

  it('renders correctly', () => {
    // Checks if the component renders
    expect(screen.getByText('Psudoku')).toBeInTheDocument();
  });

  it('displays the user\'s username', () => {
    // Checks if the username is displayed
    expect(screen.getByText(user.username)).toBeInTheDocument();
  });

  it('calls onLogout when logout is clicked', () => {
    // Simulate clicking the logout link
    fireEvent.click(screen.getByText('Logout'));
    // Check if onLogout was called
    expect(onLogoutMock).toHaveBeenCalledTimes(1);
  });

  it('renders the logout option', () => {
    // Check if the logout option is visible and can be interacted with
    const logoutSpan = screen.getByText('Logout');
    expect(logoutSpan).toBeInTheDocument();
    expect(logoutSpan).toHaveClass('cursor-pointer');
    // This also implicitly tests the CSS class for the cursor style
  });
});

