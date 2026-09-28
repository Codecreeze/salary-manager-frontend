import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import { BreadCrumbs } from '../index';

describe('BreadCrumbs', () => {
  it('renders the title and subtitle', () => {
    render(<BreadCrumbs title="Employees" subtitle="Manage your team" />);

    expect(screen.getByRole('heading', { name: 'Employees' })).toBeInTheDocument();
    expect(screen.getByText('Manage your team')).toBeInTheDocument();
  });

  it('does not render a breadcrumb trail when none is provided', () => {
    render(<BreadCrumbs title="Employees" />);

    expect(screen.queryByLabelText('breadcrumb')).not.toBeInTheDocument();
  });

  it('renders earlier crumbs as links and the last crumb as plain text', () => {
    render(
      <MemoryRouter>
        <BreadCrumbs
          title="Ada Lovelace"
          breadcrumbs={[{ label: 'Employees', to: '/employees' }, { label: 'Ada Lovelace' }]}
        />
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: 'Employees' });
    expect(link).toHaveAttribute('href', '/employees');

    expect(screen.queryByRole('link', { name: 'Ada Lovelace' })).not.toBeInTheDocument();
    expect(screen.getAllByText('Ada Lovelace').length).toBeGreaterThan(0);
  });

  it('renders the actions node when provided', () => {
    render(<BreadCrumbs title="Employees" actions={<button type="button">Add employee</button>} />);

    expect(screen.getByRole('button', { name: 'Add employee' })).toBeInTheDocument();
  });
});
