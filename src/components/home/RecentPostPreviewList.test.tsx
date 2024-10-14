import { screen, waitFor } from '@testing-library/react';
import RecentPostPreviewList from './RecentPostPreviewList';
import { useGetPostsQuery } from '@/lib/features/posts/posts.slice';
import { describe, expect, test, vi } from 'vitest';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { render } from '../profile/test/utils';

// Мокваме useGetPostsQuery
const post = {};
describe('RecentPostPreviewList', () => {
  test('displays a spinner when loading', () => {
    server.use(
      http.get('http://localhost:3000/api/posts', () => {
        return HttpResponse.json([{}]);
      })
    );
    render(<RecentPostPreviewList />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument(); // Проверете дали Spinner е показан
  });

  test('renders posts when data is available', async () => {
    const mockPosts = [
      {
        id: '1',
        title: 'First Post',
        createdAt: new Date().toISOString(),
        excerpt: 'This is the first post excerpt.',
      },
      {
        id: '2',
        title: 'Second Post',
        createdAt: new Date().toISOString(),
        excerpt: 'This is the second post excerpt.',
      },
    ];
    server.use(
      http.get('http://localhost:3000/api/posts', () => {
        return HttpResponse.json(mockPosts);
      })
    );

    render(<RecentPostPreviewList />);

    await waitFor(() => {
      expect(screen.getByText('First Post')).toBeInTheDocument();
      expect(screen.getByText('Second Post')).toBeInTheDocument();

      expect(
        screen.getByText(/This is the first post excerpt/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/This is the second post excerpt/i)
      ).toBeInTheDocument();

      const readMoreLinks = screen.getAllByRole('link', { name: /Read More/i });

      expect(readMoreLinks.length).toBe(2);

      readMoreLinks.forEach((link) => {
        expect(link).toBeInTheDocument();
      });
    });
  });

  test('handles no posts case', async () => {
    server.use(
      http.get('http://localhost:3000/api/posts', () => {
        return HttpResponse.json([]); 
      })
    );

    render(<RecentPostPreviewList />);

    await waitFor(() => {
      expect(screen.getByText(/There are no posts/i)).toBeInTheDocument();
    });
  });
});
