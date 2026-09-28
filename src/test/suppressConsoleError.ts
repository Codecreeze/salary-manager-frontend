import { vi } from 'vitest';

/**
 * React logs errors caught by an ErrorBoundary to `console.error` in dev
 * mode, even though the boundary handled them correctly — that's expected
 * noise for tests that intentionally trigger a boundary, not a real failure.
 * Call this at the top of such a test to silence it for that test only.
 */
export function suppressConsoleError() {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
  return () => spy.mockRestore();
}
