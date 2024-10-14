import { server } from '@/mocks/server';
import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

server.events.on('request:match', ({request}) => {
  console.log('Request matched:', request.method, request.url);
});

server.events.on('request:unhandled', ({request}) => {
  console.warn('Unhandled request:', request.method, request.url);
});

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
