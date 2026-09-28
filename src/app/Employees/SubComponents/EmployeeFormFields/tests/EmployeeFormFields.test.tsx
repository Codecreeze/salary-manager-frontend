import { describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { renderWithProviders } from '@/test/renderWithProviders';
import { server } from '@/test/server';
import { EmployeeFormFields } from '../index';
import type { EmployeeDetail } from '@/services';

const API_BASE_URL = 'http://localhost:3000';

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

describe('EmployeeFormFields', () => {
  it('renders empty fields in create mode', () => {
    renderWithProviders(<EmployeeFormFields />);

    expect(screen.getByLabelText('First name')).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Create employee' })).toBeInTheDocument();
    expect(screen.getByLabelText('Starting salary')).toBeInTheDocument();
  });

  it('pre-fills fields and hides initial-salary inputs in edit mode', () => {
    renderWithProviders(<EmployeeFormFields existingEmployee={employee} />);

    expect(screen.getByLabelText('First name')).toHaveValue('Ada');
    expect(screen.getByLabelText('Last name')).toHaveValue('Lovelace');
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
    expect(screen.queryByLabelText('Starting salary')).not.toBeInTheDocument();
  });

  it('shows validation errors and does not submit when required fields are blank', async () => {
    const user = userEvent.setup();
    renderWithProviders(<EmployeeFormFields />);

    await user.click(screen.getByRole('button', { name: 'Create employee' }));

    expect(await screen.findByText('First name is required')).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('submits the create mutation with valid data and navigates to the new employee', async () => {
    server.use(
      http.get(`${API_BASE_URL}/countries`, () =>
        HttpResponse.json([{ id: 'country-1', name: 'United States', code: 'US' }]),
      ),
      http.post(`${API_BASE_URL}/employees`, () => HttpResponse.json(employee)),
    );
    const user = userEvent.setup();
    renderWithProviders(<EmployeeFormFields />);

    await user.type(screen.getByLabelText('First name'), 'Ada');
    await user.type(screen.getByLabelText('Last name'), 'Lovelace');
    await user.type(screen.getByLabelText('Email'), 'ada@acme.com');
    await user.click(screen.getByLabelText('Department'));
    await user.click(await screen.findByRole('option', { name: 'Engineering' }));
    await user.click(screen.getByLabelText('Country'));
    await user.click(await screen.findByRole('option', { name: 'United States' }));
    await user.clear(screen.getByLabelText('Starting salary'));
    await user.type(screen.getByLabelText('Starting salary'), '100000');

    await user.click(screen.getByRole('button', { name: 'Create employee' }));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith(`/employees/${employee.id}`), {
      timeout: 10000,
    });
  }, 15000);
});
