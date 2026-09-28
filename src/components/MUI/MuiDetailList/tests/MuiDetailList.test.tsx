import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MuiDetailList } from '../index';

describe('MuiDetailList', () => {
  it('renders each provided label/value row', () => {
    render(
      <MuiDetailList
        items={[
          { label: 'Department', value: 'Engineering' },
          { label: 'Country', value: 'United States' },
        ]}
      />,
    );

    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('United States')).toBeInTheDocument();
  });

  it('renders nothing when given an empty items array', () => {
    const { container } = render(<MuiDetailList items={[]} />);
    expect(container.querySelectorAll('.MuiStack-root > .MuiStack-root').length).toBe(0);
  });
});
