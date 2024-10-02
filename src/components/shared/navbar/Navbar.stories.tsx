import { Meta, StoryContext, StoryObj } from '@storybook/react';
import Navbar from './Navbar';
import { Button } from '@/components/ui/button';
import UserDropdownMenu from './UserDropdownMenu';

const meta = {
  component: Navbar,
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof Navbar>;

export const WithLogInUser: Story = {
  args: {
    actions: <UserDropdownMenu />,
  },
};

export const WithLogOutUser: Story = {
  args: {
    actions: (
      <>
        <Button variant="outline">Sign up</Button>
        <Button>Sign in</Button>
      </>
    ),
  },
};
