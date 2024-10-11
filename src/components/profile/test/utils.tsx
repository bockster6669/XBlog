import { SessionWrapper } from '@/contexts/auth.context';
import { render as renderComponent } from '@testing-library/react';
import { Session } from 'next-auth';
import { ReactNode } from 'react';

export const render = (
  ui: ReactNode,
  session: Session | null = null,
  options?: Parameters<typeof renderComponent>[1]
) => {
  return renderComponent(
    <SessionWrapper session={session}>{ui}</SessionWrapper>,
    options
  );
};
