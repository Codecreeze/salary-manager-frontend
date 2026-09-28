import { setupServer } from 'msw/node';
import { handlers } from './handlers';

/** Shared MSW server for mocking backend HTTP calls in tests — no real network. */
export const server = setupServer(...handlers);
