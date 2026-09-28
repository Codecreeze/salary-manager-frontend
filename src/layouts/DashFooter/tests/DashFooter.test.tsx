import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashFooter } from '../index';

describe('DashFooter', () => {
  it('renders the copyright text with the current year', () => {
    render(<DashFooter />);

    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} Pradeep Kumar. All rights reserved.`)).toBeInTheDocument();
  });
});
