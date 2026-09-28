import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { renderWithProviders } from '@/test/renderWithProviders';
import { server } from '@/test/server';
import ErrorBoundary from '@/hoc/ErrorBoundary';
import { SummaryCardsSection } from '../index';

const API_BASE_URL = 'http://localhost:3000';
const ENDPOINT = `${API_BASE_URL}/analytics/summary`;

describe('SummaryCardsSection', () => {
  it('shows the skeleton while loading', () => {
    server.use(
      http.get(ENDPOINT, async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        return HttpResponse.json({ headcount: 1, payrollByCurrency: [] });
      }),
    );

    const { container } = renderWithProviders(<SummaryCardsSection />);

    expect(container.querySelectorAll('.MuiSkeleton-root').length).toBeGreaterThan(0);
  });

  it('throws on fetch failure, caught by an ErrorBoundary', async () => {
    server.use(http.get(ENDPOINT, () => HttpResponse.error()));

    renderWithProviders(
      <ErrorBoundary>
        <SummaryCardsSection />
      </ErrorBoundary>,
    );

    expect(await screen.findByText('Whoops! Something went wrong.')).toBeInTheDocument();
  });

  it('renders summary cards once data resolves', async () => {
    server.use(
      http.get(ENDPOINT, () =>
        HttpResponse.json({
          headcount: 42,
          payrollByCurrency: [{ currency: 'USD', totalPayroll: 500000, averagePayroll: 90000 }],
        }),
      ),
    );

    renderWithProviders(<SummaryCardsSection />);

    expect(await screen.findByText('HEADCOUNT')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });
});
