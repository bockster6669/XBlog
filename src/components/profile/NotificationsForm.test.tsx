import { expect, test, describe, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from './test/utils';
import NotificationsForm from './NotificationsForm';
import { Session } from 'next-auth';
import { afterEach } from 'node:test';

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
    // Мокваме само за този тест
    const mockUseSession = vi.spyOn(require('next-auth/react'), 'useSession');
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
      update: async (data?: any) => data,
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
