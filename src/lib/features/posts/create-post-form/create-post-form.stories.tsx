import type { Meta, StoryObj } from '@storybook/react';
import CreatePostForm from './create-post-form';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib/store';
import { ToastContextProvider } from '@/contexts/toast.context';
import { userEvent, within } from '@storybook/testing-library';



const meta = {
  // title: 'Features/Posts/CreatePostForm',
  component: CreatePostForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={makeStore()}>
        <ToastContextProvider>
          <Story />
        </ToastContextProvider>
      </Provider>
    ),
  ],
} satisfies Meta<typeof CreatePostForm>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithFieldError = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const titleField = canvas.getByPlaceholderText('title...');

    await userEvent.type(titleField, 'Test');
    await userEvent.click(canvasElement);
  },
} satisfies Story;

export const WithFormError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const titleField = canvas.getByLabelText('Title');
    await userEvent.type(titleField, 'Test Title');

    const contentField = canvas.getByLabelText('Content');
    await userEvent.type(
      contentField,
      'This is a test content for the blog post.'
    );

    const excerptField = canvas.getByLabelText('Excerpt');
    await userEvent.type(excerptField, 'A short summary of the test content.');

    const tagField = canvas.getByLabelText('tag');
    await userEvent.type(tagField, 'TestTag');
    const addTagButton = canvas.getByText('Add tag');
    await userEvent.click(addTagButton);

    const submitButton = canvas.getByText('Submit');
    await userEvent.click(submitButton);
  },
};

export const WithManyTags: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    await new Promise(resolve => setTimeout(resolve, 500));

    const tagField = canvas.getByLabelText('tag');
    const addTagButton = canvas.getByText('Add tag');

    const tags = [
     'React', 'Ts', 'Storybook', 'Redux', 'UI', 
      'Form', 'Component', 'Testing'
    ];

    for (const tag of tags) {
      await userEvent.type(tagField, tag);
      await userEvent.click(addTagButton);
    }
    await userEvent.click(canvasElement);
  },
};

// maybe you have to mock the api call
// export const SuccessForm: Story = {
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);

//     const titleField = canvas.getByLabelText('Title');
//     await userEvent.type(titleField, 'Test Title');
    
//   },
// };
export default meta;
