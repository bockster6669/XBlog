import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

const meta = {
  component: Spinner,
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
    color: { control: 'color' },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    color: '#2563eb',
  },
} satisfies Story;
