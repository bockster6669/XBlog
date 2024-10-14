'use client';

import { useToast } from '@/components/ui/use-toast';
import { createContext, useContext } from 'react';

export type Toast = ReturnType<typeof useToast>['toast'];

export const ToastContext = createContext<Toast|null>(null);

export function ToastContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { toast } = useToast();

  return (
    <ToastContext.Provider value={toast}>
      {children}
    </ToastContext.Provider>
  );
}
export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('ToastContext must be within toastContextProvider');
  }
  return context;
}
