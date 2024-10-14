import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';
import { useRouter } from 'next/navigation';
import { vi, describe, test, expect } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('SearchBar', () => {
  test('updates url with search query when user types', async () => {
    const pushMock = vi.fn();

    vi.mocked(useRouter).mockReturnValue({
      push: pushMock,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    } as unknown as ReturnType<typeof useRouter>);

    render(<SearchBar />);
    const searchInput = screen.getByLabelText(/search blog posts/i);

    await userEvent.type(searchInput, 'News');

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/posts?search=News');
    });
  });
});
