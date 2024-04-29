import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { AuthForm } from '../components/AuthForm';  // Correct import path for AuthForm component

// Global fetch mocking to handle HTTP requests within the tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: "12345" }),
  })
) as jest.Mock;

describe('AuthForm', () => {
  // Clear all mocks after each test to ensure clean test state
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test to check if the component renders without any issues
  it('renders correctly', () => {
    render(<AuthForm onLogin={() => {}} />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  // Test to ensure that username and password inputs can be filled
  it('allows entering username and password', () => {
    render(<AuthForm onLogin={() => {}} />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/i), { target: { value: 'password123' } });
    expect(screen.getByDisplayValue(/testuser/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/password123/i)).toBeInTheDocument();
  });

  // Test for handling form submission for login and triggering the onLogin callback
  it('handles form submission for login and triggers onLogin', async () => {
    const onLoginMock = jest.fn();
    render(<AuthForm onLogin={onLoginMock} />);
    
    // Simulate user entering credentials
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/i), { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(screen.getByText(/login/i));

    // Wait for async fetch call to resolve and check if onLogin was called
    await waitFor(() => expect(onLoginMock).toHaveBeenCalled());
    expect(onLoginMock).toHaveBeenCalledWith({ token: "12345" });
  });

  // Test to check if the form toggles between login and register views
  it('toggles between login and register views', () => {
    render(<AuthForm onLogin={() => {}} />);
    // Initial view is login
    expect(screen.getByText(/login/i)).toBeInTheDocument();

    // Toggle to register view
    fireEvent.click(screen.getByText(/register/i));
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  // Test to check for error display on failed login attempt
  it('displays error on failed login', async () => {
    // Mock a failing fetch request for demonstration
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid credentials" }),
      })
    );

    render(<AuthForm onLogin={() => {}} />);

    // Simulate user entering credentials
    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*/i), { target: { value: 'wrongpassword' } });

    // Simulate form submission
    fireEvent.click(screen.getByText(/login/i));

    // Expect an error message to be displayed as a result of the mocked failing fetch
    await waitFor(() => expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument());
  });
});
