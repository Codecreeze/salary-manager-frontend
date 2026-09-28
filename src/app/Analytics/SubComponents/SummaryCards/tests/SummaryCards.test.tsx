import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import { SummaryCards } from '../index';

describe('SummaryCards', () => {
  it('renders headcount and per-currency payroll figures', () => {
    renderWithProviders(
      <SummaryCards
        summary={{
          headcount: 42,
          payrollByCurrency: [{ currency: 'USD', total: 500000, average: 90000 }],
        }}
      />,
    );

    expect(screen.getByText('HEADCOUNT')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('TOTAL PAYROLL (USD)')).toBeInTheDocument();
    expect(screen.getAllByText('USD').length).toBeGreaterThan(0);
  });

  it('renders one card per currency in the payroll breakdown', () => {
    renderWithProviders(
      <SummaryCards
        summary={{
          headcount: 10,
          payrollByCurrency: [
            { currency: 'USD', total: 100, average: 10 },
            { currency: 'EUR', total: 200, average: 20 },
          ],
        }}
      />,
    );

    expect(screen.getByText('TOTAL PAYROLL (USD)')).toBeInTheDocument();
    expect(screen.getByText('TOTAL PAYROLL (EUR)')).toBeInTheDocument();
  });
});
