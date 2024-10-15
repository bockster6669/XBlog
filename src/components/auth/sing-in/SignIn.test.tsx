import { render } from '@/components/profile/test/utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect } from 'vitest';
import SignInForm from './SignIn';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('SignIn', () => {
  it('shows success message when valid form is submitted', () => {
    const mockSubmit = vi.fn(()=>{console.log('izvika se')});
    render(<SignInForm onSubmit={mockSubmit}/>);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const signInButton = screen.getByRole('button', {
      name: 'Sign in',
    });

    userEvent.type(emailInput, 'test@gmail.com');
    userEvent.type(passwordInput, 'testPass');
    userEvent.click(signInButton);
    screen.debug()

    expect(mockSubmit).toHaveBeenCalled();
    const successMessage = screen.getByText(/successfully signed in/i)
    expect(successMessage).toBeInTheDocument();
  });
});
