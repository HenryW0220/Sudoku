import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthForm } from './components/AuthForm';

describe('AuthForm', () => {
  it('calls onLogin on form submission', () => {
    const mockOnLogin = jest.fn();
    render(<AuthForm onLogin={mockOnLogin} />);
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    expect(mockOnLogin).toHaveBeenCalled();
  });
});
