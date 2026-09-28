import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { ChartCardSkeleton } from '../index';

describe('ChartCardSkeleton', () => {
  it('renders skeleton placeholders', () => {
    const { container } = render(<ChartCardSkeleton />);

    expect(container.querySelectorAll('.MuiSkeleton-root').length).toBeGreaterThanOrEqual(2);
  });
});
