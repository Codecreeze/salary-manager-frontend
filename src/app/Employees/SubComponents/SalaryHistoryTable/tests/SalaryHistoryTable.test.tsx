import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import { SalaryHistoryTable } from '../index';

describe('SalaryHistoryTable', () => {
  it('renders a row per salary record, formatted', () => {
    renderWithProviders(
      <SalaryHistoryTable
        records={[
          {
            id: 'sal-1',
            employeeId: 'emp-1',
            amount: 100000,
            currency: 'USD',
            effectiveDate: '2023-01-01',
            reason: 'HIRE',
            createdAt: '2023-01-01T00:00:00.000Z',
          },
        ]}
      />,
    );

    expect(screen.getByText('$100,000')).toBeInTheDocument();
    expect(screen.getByText('HIRE')).toBeInTheDocument();
  });

  it('sorts records newest-effective-date first', () => {
    renderWithProviders(
      <SalaryHistoryTable
        records={[
          {
            id: 'sal-1',
            employeeId: 'emp-1',
            amount: 100000,
            currency: 'USD',
            effectiveDate: '2022-01-01',
            reason: 'HIRE',
            createdAt: '2022-01-01T00:00:00.000Z',
          },
          {
            id: 'sal-2',
            employeeId: 'emp-1',
            amount: 120000,
            currency: 'USD',
            effectiveDate: '2023-01-01',
            reason: 'MERIT',
            createdAt: '2023-01-01T00:00:00.000Z',
          },
        ]}
      />,
    );

    const rows = screen.getAllByRole('row');
    // rows[0] is the header row
    expect(rows[1]).toHaveTextContent('MERIT');
    expect(rows[2]).toHaveTextContent('HIRE');
  });

  it('renders EmptyState when there are no records', () => {
    renderWithProviders(<SalaryHistoryTable records={[]} />);

    expect(screen.getByAltText('No data')).toBeInTheDocument();
  });
});
