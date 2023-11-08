/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */
import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import LoginInput from './LoginInput';

// Add custom jest matchers from jest-dom
expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <LoginInput isLoading={false} login={() => {}} />
      </MemoryRouter>,
    );
    const emailInput = await screen.getByPlaceholderText('your@email.com');

    // Action
    await userEvent.type(emailInput, 'usernametest@wildan.com');

    // Assert
    expect(emailInput).toHaveValue('usernametest@wildan.com');
  });
  it('should handle password typing correctly', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <LoginInput isLoading={false} login={() => {}} />
      </MemoryRouter>,
    );
    const passwordInput = await screen.getByPlaceholderText('password');

    // Action
    await userEvent.type(passwordInput, 'masukhaja');

    // Assert
    expect(passwordInput).toHaveValue('masukhaja');
  });
  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(
      <MemoryRouter>
        <LoginInput isLoading={false} login={mockLogin} />
      </MemoryRouter>,
    );
    const usernameInput = await screen.getByPlaceholderText('your@email.com');
    await userEvent.type(usernameInput, 'usernametest');
    const passwordInput = await screen.getByPlaceholderText('password');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'usernametest',
      password: 'passwordtest',
    });
  });
});
