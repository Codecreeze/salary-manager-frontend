import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import { EmployeeNameCell } from '../index';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return { ...actual, useNavigate: () => mockNavigate };
});

describe('EmployeeNameCell', () => {
  it('renders the employee name', () => {
    renderWithProviders(<EmployeeNameCell employeeId="emp-1" name="Ada Lovelace" />);

    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
  });

  it('navigates to the employee detail page when clicked', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EmployeeNameCell employeeId="emp-1" name="Ada Lovelace" />);

    await user.click(screen.getByText('Ada Lovelace'));

    expect(mockNavigate).toHaveBeenCalledWith('/employees/emp-1');
  });
});
