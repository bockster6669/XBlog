import { SessionWrapper } from '@/contexts/auth.context';
import { makeStore } from '@/lib/store';
import { render as renderComponent } from '@testing-library/react';
import { Session } from 'next-auth';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

export const render = (
  ui: ReactNode,
  session: Session | null = null,
  options?: Parameters<typeof renderComponent>[1]
) => {
  return renderComponent(ui, {
    ...options,
    wrapper: ({ children }) => (
      <Provider store={makeStore()}>
        <SessionWrapper session={session}>{children}</SessionWrapper>
      </Provider>
    ),
  });
};
