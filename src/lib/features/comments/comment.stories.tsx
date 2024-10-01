import type { Meta, StoryObj } from '@storybook/react';
import CommentItem from './comment/CommentItem';
import { CommentWithRepiesAndAuthor } from './comment/types';
import { ToastContextProvider } from '@/contexts/toast.context';
import { makeStore } from '@/lib/store';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';

const mockCommentData: CommentWithRepiesAndAuthor = {
  id: 'c1a2b3c4-d5e6-7f8g-9h0i-1j2k3l4m5n6o',
  content: 'This is a great post! I learned a lot from it.',
  postId: 'f1a2b3c4-d5e6-7f8g-9h0i-1j2k3l4m5n6o',
  authorId: 'u1234567',
  author: {
    id: 'u1234567',
    username: 'john_doe',
    email: 'john@example.com',
    password: 'hashed_password', // Тук добави хеширана парола
    firstName: 'John',
    lastName: 'Doe',
    bio: 'Web developer and TypeScript enthusiast.',
    createdAt: new Date('2024-09-29T08:30:00.000Z'),
    image: 'https://example.com/profile/john_doe.jpg', // URL на изображение на потребителя
  },
  likes: 5,
  disLikes: 0,
  createdAt: new Date('2024-09-30T09:15:00.000Z'),
  parentId: null,
  replies: [],
};

const meta: Meta<typeof CommentItem> = {
  component: CommentItem,
  decorators: [
    (Story) => (
      <Provider store={makeStore()}>
        <ToastContextProvider>
          <SessionProvider>
            <Story />
          </SessionProvider>
        </ToastContextProvider>
      </Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    comment: mockCommentData,
  },
};
