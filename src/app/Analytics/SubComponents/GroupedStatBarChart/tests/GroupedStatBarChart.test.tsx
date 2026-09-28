import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import { GroupedStatBarChart } from '../index';

describe('GroupedStatBarChart', () => {
  it('renders the title and a chart for provided data', () => {
    const { container } = renderWithProviders(
      <GroupedStatBarChart
        title="Salary by department"
        data={[
          {
            key: 'dept-1',
            label: 'Engineering',
            currency: 'USD',
            headcount: 5,
            averageSalary: 100000,
            medianSalary: 95000,
          },
        ]}
      />,
    );

    expect(screen.getByText('Salary by department')).toBeInTheDocument();
    expect(container.querySelector('.recharts-responsive-container')).toBeInTheDocument();
    expect(screen.queryByAltText('No data')).not.toBeInTheDocument();
  });

  it('renders EmptyState when data is empty', () => {
    const { container } = renderWithProviders(
      <GroupedStatBarChart title="Salary by level" data={[]} />,
    );

    expect(screen.getByText('Salary by level')).toBeInTheDocument();
    expect(screen.getByAltText('No data')).toBeInTheDocument();
    expect(container.querySelector('.recharts-wrapper')).not.toBeInTheDocument();
  });
});
