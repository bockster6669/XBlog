import axios from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { formatDistance } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function formatSearchQuery(query: string | null | undefined) {
  if (!query) return undefined;
  return query.split(' ').join(' &');
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getErrorMessage = (error: unknown): string => {
  let message: string;
  console.log('error=', error);
  if (axios.isAxiosError(error)) {
    message =
      error.response?.data.error || 'Something went wrong with the request.';
  } else if (
    // Check for RTKQ errors
    error &&
    typeof error === 'object' &&
    'data' in error &&
    error.data !== null &&
    typeof error.data === 'object' &&
    'error' in error.data
  ) {
    message = String((error.data as { error: string }).error);
  } else if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String((error as any).message);
  } else {
    message = 'Unknown error occurred.';
  }

  return message;
};

export const setCursorToEnd = (element: HTMLTextAreaElement) => {
  const textarea = element;
  if (textarea) {
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  }
};

export const isAsyncThunkConditionError = (error: unknown) => {
  if (
    error &&
    typeof error === 'object' &&
    'name' in error &&
    error.name === 'ConditionError'
  ) {
    return true;
  }
  return false;
};

export const parseDate = (dateString: string) => new Date(dateString);

export const calcDateToNow = (createdAt: Date) =>
  formatDistance(createdAt, new Date(), {
    addSuffix: true,
  });
