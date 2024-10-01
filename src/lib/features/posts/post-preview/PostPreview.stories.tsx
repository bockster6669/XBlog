import type { Meta, StoryObj } from '@storybook/react';

import PostPreview from './PostPreview';
import PostPreviewSkeleton from './PostPreviewSkeleton';

const mockPostPreviewData = {
  id: 'f1a2b3c4-d5e6-7f8g-9h0i-1j2k3l4m5n6o',
  title: 'Mastering TypeScript for Better JavaScript',
  content:
    'TypeScript is a superset of JavaScript that helps developers write cleaner and more maintainable code...',
  excerpt: 'Learn how TypeScript can help you write better JavaScript.',
  author: {
    username: 'john_doe',
  },
  authorId: 'u1234567',
  tags: [
    {
      id: 't1',
      name: 'TypeScript',
      popularity: 95,
    },
    {
      id: 't2',
      name: 'JavaScript',
      popularity: 90,
    },
    {
      id: 't3',
      name: 'Web Development',
      popularity: 85,
    },
  ],
  createdAt: new Date('2024-09-29T08:30:00.000Z'),
  updatedAt: new Date('2024-10-01T12:00:00.000Z'),
};

const meta: Meta<typeof PostPreview> = {
  title: 'Lib/Features/Posts/PostPreview',
  component: PostPreview,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    post: mockPostPreviewData,
  },
  decorators: (Story) => <div className="w-[350px]">{Story()}</div>,
  render: ({ post }) => <PostPreview post={post} />,
};

export const LoadingSkeleton: Story = {
  render: () => <PostPreviewSkeleton />,
};
