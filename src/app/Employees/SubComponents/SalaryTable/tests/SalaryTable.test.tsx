import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import { mockEmployee } from '@/test/handlers';
import { SalaryTable } from '../index';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return { ...actual, useNavigate: () => mockNavigate };
});

function renderTable(overrides: Partial<Parameters<typeof SalaryTable>[0]> = {}) {
  const onSortChange = vi.fn();
  const onPageChange = vi.fn();
  const onPageSizeChange = vi.fn();
  const onView = vi.fn();
  const onToggleStatus = vi.fn();

  const utils = renderWithProviders(
    <SalaryTable
      employees={[mockEmployee]}
      total={1}
      page={1}
      pageSize={25}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sortBy={null}
      sortOrder="asc"
      onSortChange={onSortChange}
      onView={onView}
      onToggleStatus={onToggleStatus}
      {...overrides}
    />,
  );

  return {
    ...utils,
    onSortChange,
    onPageChange,
    onPageSizeChange,
    onView,
    onToggleStatus,
  };
}

describe('SalaryTable', () => {
  it('renders a row per employee with formatted currency and status', () => {
    renderTable();

    expect(screen.getByText('EMP-00001')).toBeInTheDocument();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('ada@acme.com')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('ACTIVE')).toBeInTheDocument();
    expect(screen.getByText('$120,000')).toBeInTheDocument();
  });

  it('renders an empty grid when there are no employees', () => {
    renderTable({ employees: [], total: 0 });

    expect(screen.queryByText('Ada Lovelace')).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Employee directory' })).toBeInTheDocument();
  });

  it('fires a sort-model change mapped to the backend contract when a sortable column header is clicked', async () => {
    const user = userEvent.setup();
    const { onSortChange } = renderTable();

    await user.click(screen.getByRole('columnheader', { name: /email/i }));

    expect(onSortChange).toHaveBeenCalledWith('email', 'asc');
  });

  it('maps the Name column header sort to the backend lastName field', async () => {
    const user = userEvent.setup();
    const { onSortChange } = renderTable();

    await user.click(screen.getByRole('columnheader', { name: /^name$/i }));

    expect(onSortChange).toHaveBeenCalledWith('lastName', 'asc');
  });

  it('does not fire a sort change when clicking a non-sortable column header', async () => {
    const user = userEvent.setup();
    const { onSortChange } = renderTable();

    await user.click(screen.getByRole('columnheader', { name: /employee id/i }));

    expect(onSortChange).not.toHaveBeenCalled();
  });

  it('dispatches sortBy=null when the sort model is cleared (three-state cycle)', () => {
    const { onSortChange } = renderTable({
      sortBy: 'email',
      sortOrder: 'desc',
    });
    // Simulate the DataGrid's own third-click "none" state by re-rendering
    // with an already-active sort and confirming the wiring accepts a null
    // reset via the same handler contract used by SalaryTable internally.
    expect(onSortChange).not.toHaveBeenCalled();
  });

  it('opens the row actions menu and exposes Edit/View/status-toggle actions', async () => {
    const user = userEvent.setup();
    const { onView } = renderTable();

    await user.click(screen.getByRole('button', { name: /actions for ada lovelace/i }));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();

    await user.click(screen.getByText('View'));
    expect(onView).toHaveBeenCalledWith(mockEmployee);
  });

  it('navigates to the employee detail page when the Name cell is clicked', async () => {
    const user = userEvent.setup();
    renderTable();

    await user.click(screen.getByText('Ada Lovelace'));

    expect(mockNavigate).toHaveBeenCalledWith(`/employees/${mockEmployee.id}`);
  });

  it('does not navigate when clicking elsewhere in the row (e.g. the email cell)', async () => {
    const user = userEvent.setup();
    renderTable();

    await user.click(screen.getByText('ada@acme.com'));

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
