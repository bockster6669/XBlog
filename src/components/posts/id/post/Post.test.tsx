import { render, screen } from '@testing-library/react';
import { formatDistance } from 'date-fns';
import { describe, test, expect } from 'vitest';
import Post from './Post';
import { PostWithAuthorAndTags } from './types';

describe('Post component', () => {
  const mockPost: PostWithAuthorAndTags = {
    id: '1',
    title: 'Test Post',
    content: 'This is a test post content.',
    excerpt: 'This is an excerpt of the post content.',
    authorId: '123',
    createdAt: new Date(),
    updatedAt: new Date(),
    author: {
      username: 'testuser',
      email: 'testuser@example.com',
    },
    tags: [
      { id: '1', name: 'JavaScript', popularity: 100 },
      { id: '2', name: 'React', popularity: 200 },
    ],
  };

  const mockPostWithoutAuthor = {
    ...mockPost,
    author: null,
  };

  test('renders post title, content, and tags correctly', () => {
    render(<Post post={mockPost} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Test Post'
    );
    expect(
      screen.getByText('This is a test post content.')
    ).toBeInTheDocument();

    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  test('renders author information correctly', () => {
    render(<Post post={mockPost} />);

    expect(screen.getByText('testuser')).toBeInTheDocument();
    expect(screen.getByText('testuser@example.com')).toBeInTheDocument();

    expect(screen.getByText('TE')).toBeInTheDocument();
  });

  test('renders fallback message when author is missing', () => {
    render(<Post post={mockPostWithoutAuthor} />);

    expect(screen.getByText('Author not found')).toBeInTheDocument();
  });

  test('displays the correct creation date', () => {
    const mockDate = new Date();
    render(<Post post={mockPost} />);

    const creationDate = formatDistance(mockPost.createdAt, mockDate, {
      addSuffix: true,
    });
    expect(screen.getByText(creationDate)).toBeInTheDocument();
  });

  test('displays no tags if no tags are present', () => {
    const postWithoutTags = {
      ...mockPost,
      tags: [],
    };
    render(<Post post={postWithoutTags} />);

    expect(screen.queryByText('JavaScript')).not.toBeInTheDocument();
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });
});
