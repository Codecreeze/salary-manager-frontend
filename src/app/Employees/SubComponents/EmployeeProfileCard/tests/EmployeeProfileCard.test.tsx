import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/test/renderWithProviders';
import { EmployeeProfileCard } from '../index';
import type { EmployeeDetail } from '@/services';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return { ...actual, useNavigate: () => mockNavigate };
});

const employee: EmployeeDetail = {
  id: 'emp-1',
  employeeCode: 'EMP-00001',
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@acme.com',
  department: { id: 'dept-1', name: 'Engineering' },
  country: { id: 'country-1', name: 'United States', code: 'US' },
  jobLevel: 'L4',
  employmentStatus: 'ACTIVE',
  hireDate: '2020-01-15',
  currentSalary: { amount: 120000, currency: 'USD' },
  managerId: null,
  manager: null,
  createdAt: '2020-01-15T00:00:00.000Z',
  updatedAt: '2020-01-15T00:00:00.000Z',
  salaryHistory: [],
};

describe('EmployeeProfileCard', () => {
  it('renders the employee core fields', () => {
    renderWithProviders(<EmployeeProfileCard employee={employee} />);

    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('EMP-00001')).toBeInTheDocument();
    expect(screen.getByText('ada@acme.com')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('$120,000')).toBeInTheDocument();
  });

  it('shows the Edit button by default and navigates to the edit page on click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EmployeeProfileCard employee={employee} />);

    const editButton = screen.getByRole('button', { name: 'Edit' });
    await user.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith('/employees/emp-1/edit');
  });

  it('hides the Edit button when showEditButton is false', () => {
    renderWithProviders(<EmployeeProfileCard employee={employee} showEditButton={false} />);

    expect(screen.queryByRole('button', { name: 'Edit' })).not.toBeInTheDocument();
  });

  it('renders without a Card wrapper in the plain variant', () => {
    const { container } = renderWithProviders(
      <EmployeeProfileCard employee={employee} variant="plain" />,
    );

    expect(container.querySelector('.MuiCard-root')).not.toBeInTheDocument();
  });
});
