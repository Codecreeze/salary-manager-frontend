import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './server';

// Real network calls are never allowed in tests — MSW intercepts all HTTP.
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Vitest doesn't auto-register RTL's cleanup the way Jest does — without
// this, DOM from one test leaks into the next.
afterEach(() => cleanup());

// jsdom has no ResizeObserver, which MUI X DataGrid relies on internally to
// measure its viewport — without a stub, any test rendering a DataGrid
// throws "ResizeObserver is not defined".
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = globalThis.ResizeObserver ?? (ResizeObserverStub as never);
