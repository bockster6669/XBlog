import { ToastContextProvider } from '@/contexts/toast.context';
import { makeStore } from '@/lib/store';
import { render as renderComponent } from '@testing-library/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

export const render = (
  ui: ReactNode,
  options?: Parameters<typeof renderComponent>[1]
) => {
  return renderComponent(ui, {
    ...options,
    wrapper: ({ children }) => (
      <Provider store={makeStore()}>
        <ToastContextProvider>{children}</ToastContextProvider>
      </Provider>
    ),
  });
};
