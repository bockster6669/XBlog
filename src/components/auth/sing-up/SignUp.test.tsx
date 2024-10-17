import { render } from '@/components/profile/test/utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect } from 'vitest';
import SignUpForm from './SignUp';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('SignUp', () => {
  it("doesn't call handleSubmit on invalid submition ( not all input fields are populated )", async () => {
    const mockOnSubmit = vi.fn();
    render(<SignUpForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    const rememberInput = screen.getByLabelText('Remember me');
    const signInButton = screen.getByRole('button', {
      name: 'Sign up',
    });

    await userEvent.type(emailInput, 'test@gmail.com');
    await userEvent.click(rememberInput);
    await userEvent.click(signInButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('calls handleSubmit with correct arguments', async () => {
    const mockHandleSubmit = vi.fn();
    render(<SignUpForm onSubmit={mockHandleSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const rememberInput = screen.getByLabelText('Remember me');
    const signInButton = screen.getByRole('button', {
      name: 'Sign up',
    });

    await userEvent.type(emailInput, 'test@gmail.com');
    await userEvent.type(usernameInput, 'test-username');
    await userEvent.type(passwordInput, 'testPass');
    await userEvent.click(rememberInput);
    await userEvent.click(signInButton);

    expect(mockHandleSubmit).toHaveBeenCalledOnce();

    expect(mockHandleSubmit).toHaveBeenCalledWith(
        {
          email: 'test@gmail.com',
          username: 'test-username',
          password: 'testPass',
        },
        expect.any(Function),  // Its for `setError`
        expect.any(Function)   // Its for `setSuccess`
      );
  });

  it('shows success message on valid submit', async () => {
    vi.spyOn(require('next-auth/react'), 'signIn').mockImplementationOnce(
      () => ({
        ok: true,
      })
    );
    vi.spyOn(
      await import('@/lib/actions/register.actions'),
      'registerUser'
    ).mockImplementationOnce(async () => ({
      success: 'Successfully created user',
    }));

    render(<SignUpForm />);

    const emailInput = screen.getByLabelText('Email');
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const rememberInput = screen.getByLabelText('Remember me');
    const signInButton = screen.getByRole('button', {
      name: 'Sign up',
    });

    await userEvent.type(emailInput, 'test@gmail.com');
    await userEvent.type(usernameInput, 'test-username');
    await userEvent.type(passwordInput, 'testPass');
    await userEvent.click(rememberInput);
    await userEvent.click(signInButton);

    await waitFor(() => {
      const successMessage = screen.getByText(/success created user/i);
      expect(successMessage).toBeInTheDocument();
    });
  });

  it('shows error message on valid submit, but no user is found', async () => {
    vi.spyOn(
      await import('@/lib/actions/register.actions'),
      'registerUser'
    ).mockImplementationOnce(async () => ({
      error: 'Test error message',
    }));

    render(<SignUpForm />);

    const emailInput = screen.getByLabelText('Email');
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const rememberInput = screen.getByLabelText('Remember me');
    const signInButton = screen.getByRole('button', {
      name: 'Sign up',
    });

    await userEvent.type(emailInput, 'test@gmail.com');
    await userEvent.type(usernameInput, 'test-username');
    await userEvent.type(passwordInput, 'testPass');
    await userEvent.click(rememberInput);
    await userEvent.click(signInButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(/Test error message/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
