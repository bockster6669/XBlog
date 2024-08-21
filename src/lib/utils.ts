import axios from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (axios.isAxiosError(error)) {
    message = error.response?.data.error || 'Something went wrong';
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = JSON.stringify(error);
  }

  return message
};