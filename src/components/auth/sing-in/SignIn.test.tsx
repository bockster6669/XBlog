import { render } from '@/components/profile/test/utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect } from 'vitest';
import SignInForm from './SignIn';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('SignIn', () => {
  it("doesn't call handleSubmit on invalid submition", async () => {
    const mockOnSubmit = vi.fn();
    render(<SignInForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    const rememberInput = screen.getByLabelText('Remember me');
    const signInButton = screen.getByRole('button', {
      name: 'Sign in',
    });

    await userEvent.type(emailInput, 'test@gmail.com');
    await userEvent.click(rememberInput);
    await userEvent.click(signInButton);
    screen.debug();

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('shows success message on valid submit', async () => {
    const mockSignIn = vi
      .spyOn(require('next-auth/react'), 'signIn')
      .mockImplementationOnce(() => ({
        ok: true,
      }));
    render(<SignInForm />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const rememberInput = screen.getByLabelText('Remember me');
    const signInButton = screen.getByRole('button', {
      name: 'Sign in',
    });

    await userEvent.type(emailInput, 'test@gmail.com');
    await userEvent.type(passwordInput, 'testPass');
    await userEvent.click(rememberInput);
    await userEvent.click(signInButton);
    screen.debug();

    await waitFor(() => {
      const successMessage = screen.getByText(/successfully signed in/i);
      expect(successMessage).toBeInTheDocument();
    });
  });

  it('shows error message on valid submit, but no user is found', async () => {
    const mockSignIn = vi
      .spyOn(require('next-auth/react'), 'signIn')
      .mockImplementationOnce(() => null);
    render(<SignInForm />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const rememberInput = screen.getByLabelText('Remember me');
    const signInButton = screen.getByRole('button', {
      name: 'Sign in',
    });

    await userEvent.type(emailInput, 'test@gmail.com');
    await userEvent.type(passwordInput, 'testPass');
    await userEvent.click(rememberInput);
    await userEvent.click(signInButton);
    screen.debug();

    await waitFor(() => {
      const successMessage = screen.getByText(
        /Unexpected error occurred. Please try again later./i
      );
      expect(successMessage).toBeInTheDocument();
    });
  });
});
