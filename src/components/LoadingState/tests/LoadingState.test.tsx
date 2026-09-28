import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { LoadingState } from '../index';

describe('LoadingState', () => {
  it('renders the default "page" variant skeleton layout', () => {
    const { container } = render(<LoadingState />);

    const skeletons = container.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBe(3);
  });

  it('renders the "drawer" variant skeleton layout', () => {
    const { container } = render(<LoadingState variant="drawer" />);

    const skeletons = container.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBe(3);
  });
});
