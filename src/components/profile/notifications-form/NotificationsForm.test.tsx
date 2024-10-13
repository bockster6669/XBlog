import { expect, test, describe, vi } from 'vitest';
import { screen } from '@testing-library/react';
import NotificationsForm from './NotificationsForm';
import { Session } from 'next-auth';
import { afterEach } from 'node:test';
import { render } from '@/components/profile/test/utils';

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

describe('NotificationsForm', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("shows 'Can not find your session' if session is not found", async () => {
    render(<NotificationsForm />);

    const notificationForm = screen.getByText(/Can not find your session/i);

    expect(notificationForm).toBeInTheDocument();
  });

  test('shows loading spinner while searching for session', () => {
    const mockUseSession = vi.spyOn(require('next-auth/react'), 'useSession');
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
      update: () => {},

    });

    render(<NotificationsForm />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('shows form when user is logged in', () => {
    render(<NotificationsForm />);
    const mockUseSession = vi.spyOn(require('next-auth/react'), 'useSession');
    mockUseSession.mockReturnValue({
      data: session,
      status: 'authenticated',
      update: () => {},
    });

    render(<NotificationsForm />);

    const title = screen.getByRole('heading', { name: /notifications/i });
    expect(title).toBeInTheDocument();
  });
});
