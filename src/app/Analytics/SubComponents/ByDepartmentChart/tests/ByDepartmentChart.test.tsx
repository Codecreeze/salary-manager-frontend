import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { renderWithProviders } from '@/test/renderWithProviders';
import { server } from '@/test/server';
import { suppressConsoleError } from '@/test/suppressConsoleError';
import ErrorBoundary from '@/hoc/ErrorBoundary';
import { ByDepartmentChart } from '../index';

const API_BASE_URL = 'http://localhost:3000';
const ENDPOINT = `${API_BASE_URL}/analytics/by-department`;

describe('ByDepartmentChart', () => {
  it('shows a loading skeleton while fetching', () => {
    server.use(
      http.get(ENDPOINT, async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        return HttpResponse.json([]);
      }),
    );

    const { container } = renderWithProviders(<ByDepartmentChart currency="USD" />);

    expect(container.querySelectorAll('.MuiSkeleton-root').length).toBeGreaterThan(0);
  });

  it('throws when the fetch fails, caught by an ErrorBoundary', async () => {
    const restoreConsoleError = suppressConsoleError();
    server.use(http.get(ENDPOINT, () => HttpResponse.error()));

    renderWithProviders(
      <ErrorBoundary>
        <ByDepartmentChart currency="USD" />
      </ErrorBoundary>,
    );

    expect(await screen.findByText('Whoops! Something went wrong.')).toBeInTheDocument();
    restoreConsoleError();
  });

  it('renders the chart filtered to the selected currency', async () => {
    server.use(
      http.get(ENDPOINT, () =>
        HttpResponse.json([
          {
            id: 'eng',
            name: 'Engineering',
            currency: 'USD',
            headcount: 5,
            averageSalary: 1,
            medianSalary: 1,
          },
        ]),
      ),
    );

    renderWithProviders(<ByDepartmentChart currency="USD" />);

    expect(await screen.findByText('Salary by department')).toBeInTheDocument();
  });
});
