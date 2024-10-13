import { expect, test, describe, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@/components/profile/test/utils';
import PersonalInfoForm from './PersonalInfoForm';
import type { Session } from 'next-auth';

const session = {
  user: {
    sub: 'asd',
    rememberMe: false,
    id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    bio: '',
    createdAt: new Date(),
  },
  expires: '',
} satisfies Session;

describe('PersonalInfoForm', () => {
  test("shows 'Can not find your session' if session is not found", async () => {
    render(<PersonalInfoForm />);

    const personalInfoForm = screen.getByText(/Can not find your session/i);
    expect(personalInfoForm).toBeInTheDocument();
  });

  // test('shows loading spinner while searching for session', () => {
  //   const mockUseSession = vi.spyOn(require('next-auth/react'), 'useSession');
  //   mockUseSession.mockReturnValue({
  //     data: null,
  //     status: 'loading',
  //     update: () => {},

  //   });

  //   render(<PersonalInfoForm />);

  //   expect(screen.getByRole('status')).toBeInTheDocument();
  // });

  // test('shows loading spinner while getting user data', () => {
  //   const mockUseSession = vi.spyOn(require('next-auth/react'), 'useSession');
  //   mockUseSession.mockReturnValue({
  //     data: session,
  //     status: 'authenticated',
  //     update: () => {},
  //   });
  //   render(<PersonalInfoForm />);

  //   expect(screen.getByRole('status')).toBeInTheDocument();
  // });

  test('shows form when user is logged in', () => {
    const mockUseSession = vi.spyOn(require('next-auth/react'), 'useSession');
    mockUseSession.mockReturnValue({
      data: session,
      status: 'authenticated',
      update: () => {},
    });
    

    render(<PersonalInfoForm />);

    const title = screen.getByRole('heading', { name: /Personal Information/i });
    expect(title).toBeInTheDocument();
  });
});
