import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { renderWithProviders } from '@/test/renderWithProviders';
import { server } from '@/test/server';
import { useGetAnalyticsDistributionQuery, useGetAnalyticsSummaryQuery } from '../analyticsApi';

const API_BASE_URL = 'http://localhost:3000';

function SummaryProbe() {
  const { data, isLoading } = useGetAnalyticsSummaryQuery();
  if (isLoading) return <div>loading</div>;
  return (
    <div>
      headcount: {data?.headcount} | {data?.payrollByCurrency[0]?.currency} total:
      {data?.payrollByCurrency[0]?.total} avg:
      {data?.payrollByCurrency[0]?.average}
    </div>
  );
}

function DistributionProbe() {
  const { data, isLoading } = useGetAnalyticsDistributionQuery();
  if (isLoading) return <div>loading</div>;
  return <div>buckets: {data?.length}</div>;
}

describe('analyticsApi', () => {
  it('transforms the raw summary response into the flattened frontend shape', async () => {
    server.use(
      http.get(`${API_BASE_URL}/analytics/summary`, () =>
        HttpResponse.json({
          headcount: 42,
          payrollByCurrency: [{ currency: 'USD', totalPayroll: 500000, averagePayroll: 90000 }],
        }),
      ),
    );

    renderWithProviders(<SummaryProbe />);

    expect(
      await screen.findByText('headcount: 42 | USD total:500000 avg:90000'),
    ).toBeInTheDocument();
  });

  it('flattens per-currency distribution buckets into a single tagged array', async () => {
    server.use(
      http.get(`${API_BASE_URL}/analytics/distribution`, () =>
        HttpResponse.json([
          {
            currency: 'USD',
            buckets: [
              { rangeStart: 0, rangeEnd: 50000, count: 3 },
              { rangeStart: 50000, rangeEnd: 100000, count: 5 },
            ],
          },
          {
            currency: 'EUR',
            buckets: [{ rangeStart: 0, rangeEnd: 50000, count: 2 }],
          },
        ]),
      ),
    );

    renderWithProviders(<DistributionProbe />);

    expect(await screen.findByText('buckets: 3')).toBeInTheDocument();
  });
});
