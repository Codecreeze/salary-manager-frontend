import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { renderWithProviders } from '@/test/renderWithProviders';
import { server } from '@/test/server';
import ErrorBoundary from '@/hoc/ErrorBoundary';
import { ByCountryChart } from '../index';

const API_BASE_URL = 'http://localhost:3000';
const ENDPOINT = `${API_BASE_URL}/analytics/by-country`;

describe('ByCountryChart', () => {
  it('shows a loading skeleton while fetching', () => {
    server.use(
      http.get(ENDPOINT, async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        return HttpResponse.json([]);
      }),
    );

    const { container } = renderWithProviders(<ByCountryChart currency="USD" />);

    expect(container.querySelectorAll('.MuiSkeleton-root').length).toBeGreaterThan(0);
  });

  it('throws when the fetch fails, caught by an ErrorBoundary', async () => {
    server.use(http.get(ENDPOINT, () => HttpResponse.error()));

    renderWithProviders(
      <ErrorBoundary>
        <ByCountryChart currency="USD" />
      </ErrorBoundary>,
    );

    expect(await screen.findByText('Whoops! Something went wrong.')).toBeInTheDocument();
  });

  it('renders the chart filtered to the selected currency', async () => {
    server.use(
      http.get(ENDPOINT, () =>
        HttpResponse.json([
          {
            id: 'us',
            name: 'United States',
            currency: 'USD',
            headcount: 5,
            averageSalary: 1,
            medianSalary: 1,
          },
          {
            id: 'fr',
            name: 'France',
            currency: 'EUR',
            headcount: 2,
            averageSalary: 1,
            medianSalary: 1,
          },
        ]),
      ),
    );

    renderWithProviders(<ByCountryChart currency="USD" />);

    expect(await screen.findByText('Salary by country')).toBeInTheDocument();
  });
});
