import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from '../index';

describe('EmptyState', () => {
  it('renders the illustration image with the expected alt text', () => {
    render(<EmptyState />);

    const image = screen.getByAltText('No data');
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
  });
});
