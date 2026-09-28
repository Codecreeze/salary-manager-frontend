import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { SummaryCardsSkeleton } from '../index';

describe('SummaryCardsSkeleton', () => {
  it('renders four placeholder cards', () => {
    const { container } = render(<SummaryCardsSkeleton />);

    expect(container.querySelectorAll('.MuiCard-root').length).toBe(4);
  });
});
