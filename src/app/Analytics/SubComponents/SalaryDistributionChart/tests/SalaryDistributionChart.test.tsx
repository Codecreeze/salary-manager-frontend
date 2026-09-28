import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { renderWithProviders } from '@/test/renderWithProviders';
import { server } from '@/test/server';
import { suppressConsoleError } from '@/test/suppressConsoleError';
import ErrorBoundary from '@/hoc/ErrorBoundary';
import { SalaryDistributionChart } from '../index';

const API_BASE_URL = 'http://localhost:3000';

describe('SalaryDistributionChart', () => {
  it('shows a loading skeleton while fetching', () => {
    server.use(
      http.get(`${API_BASE_URL}/analytics/distribution`, async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        return HttpResponse.json([]);
      }),
    );

    const { container } = renderWithProviders(<SalaryDistributionChart currency="USD" />);

    expect(container.querySelectorAll('.MuiSkeleton-root').length).toBeGreaterThan(0);
  });

  it('throws when the fetch fails, caught by an ErrorBoundary', async () => {
    const restoreConsoleError = suppressConsoleError();
    server.use(http.get(`${API_BASE_URL}/analytics/distribution`, () => HttpResponse.error()));

    renderWithProviders(
      <ErrorBoundary>
        <SalaryDistributionChart currency="USD" />
      </ErrorBoundary>,
    );

    expect(await screen.findByText('Whoops! Something went wrong.')).toBeInTheDocument();
    restoreConsoleError();
  });

  it('renders EmptyState when no buckets match the selected currency', async () => {
    server.use(
      http.get(`${API_BASE_URL}/analytics/distribution`, () =>
        HttpResponse.json([
          {
            currency: 'EUR',
            buckets: [{ rangeStart: 0, rangeEnd: 100, count: 1 }],
          },
        ]),
      ),
    );

    renderWithProviders(<SalaryDistributionChart currency="USD" />);

    expect(await screen.findByAltText('No data')).toBeInTheDocument();
  });

  it('renders chart data for the selected currency', async () => {
    server.use(
      http.get(`${API_BASE_URL}/analytics/distribution`, () =>
        HttpResponse.json([
          {
            currency: 'USD',
            buckets: [{ rangeStart: 0, rangeEnd: 50000, count: 3 }],
          },
        ]),
      ),
    );

    renderWithProviders(<SalaryDistributionChart currency="USD" />);

    expect(await screen.findByText('Salary distribution')).toBeInTheDocument();
    expect(screen.queryByAltText('No data')).not.toBeInTheDocument();
  });
});
