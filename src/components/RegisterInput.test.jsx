/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */
import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import RegisterInput from './RegisterInput';

// Add custom jest matchers from jest-dom
expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <RegisterInput isLoading={false} register={() => {}} />
      </MemoryRouter>,
    );
    const nameInput = await screen.getByPlaceholderText('name');

    // Action
    await userEvent.type(nameInput, 'wildan');

    // Assert
    expect(nameInput).toHaveValue('wildan');
  });
  it('should handle email typing correctly', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <RegisterInput isLoading={false} register={() => {}} />
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
        <RegisterInput isLoading={false} register={() => {}} />
      </MemoryRouter>,
    );
    const passwordInput = await screen.getByPlaceholderText('password');

    // Action
    await userEvent.type(passwordInput, 'masukhaja');

    // Assert
    expect(passwordInput).toHaveValue('masukhaja');
  });
  it('should call register function when register button is clicked', async () => {
    // Arrange
    const mockRegister = vi.fn();
    render(
      <MemoryRouter>
        <RegisterInput isLoading={false} register={mockRegister} />
      </MemoryRouter>,
    );
    const nameInput = await screen.getByPlaceholderText('name');
    await userEvent.type(nameInput, 'wildan');
    const usernameInput = await screen.getByPlaceholderText('your@email.com');
    await userEvent.type(usernameInput, 'usernametest');
    const passwordInput = await screen.getByPlaceholderText('password');
    await userEvent.type(passwordInput, 'passwordtest');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toBeCalledWith({
      name: 'wildan',
      email: 'usernametest',
      password: 'passwordtest',
    });
  });
});
