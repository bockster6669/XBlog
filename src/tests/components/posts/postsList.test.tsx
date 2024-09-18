import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PostsList from '@/components/posts/PostsList';
import { useGetPostsQuery } from '@/lib/features/posts/posts.slice';

// Mock the useGetPostsQuery hook
jest.mock('@/lib/features/posts/posts.slice', () => ({
  useGetPostsQuery: jest.fn(),
}));

const mockStore = configureStore([]);

describe('PostsList', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('renders loading skeleton when fetching', () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isFetching: true,
    });

    render(
      <Provider store={store}>
        <PostsList search="" orderBy={{}} />
      </Provider>
    );

    expect(screen.getByTestId('posts-list-skeleton')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      isError: true,
      error: 'Test error',
    });

    render(
      <Provider store={store}>
        <PostsList search="" orderBy={{}} />
      </Provider>
    );

    expect(screen.getByText('Error while getting posts')).toBeInTheDocument();
  });

  it('renders "No posts were found" when data is empty', () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: [],
    });

    render(
      <Provider store={store}>
        <PostsList search="" orderBy={{}} />
      </Provider>
    );

    expect(screen.getByText('No posts were found')).toBeInTheDocument();
  });

  it('renders PostPreview components when data is available', () => {
    const mockPosts = [
      { id: '1', title: 'Post 1' },
      { id: '2', title: 'Post 2' },
    ];

    (useGetPostsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: mockPosts,
    });

    render(
      <Provider store={store}>
        <PostsList search="" orderBy={{}} />
      </Provider>
    );

    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });
});