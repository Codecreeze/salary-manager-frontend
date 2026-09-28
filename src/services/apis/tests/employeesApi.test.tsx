import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { renderWithProviders } from '@/test/renderWithProviders';
import { server } from '@/test/server';
import { useGetEmployeesQuery } from '../employeesApi';

const API_BASE_URL = 'http://localhost:3000';

/** Minimal harness rendering loading/error/success states of the RTK Query hook. */
function EmployeeListProbe() {
  const { data, isLoading, isError } = useGetEmployeesQuery({});

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  return <div>loaded {data?.items.length ?? 0} employees</div>;
}

describe('useGetEmployeesQuery', () => {
  it('shows the loading state, then the success state', async () => {
    renderWithProviders(<EmployeeListProbe />);

    expect(screen.getByText('loading')).toBeInTheDocument();
    expect(await screen.findByText('loaded 1 employees')).toBeInTheDocument();
  });

  it('shows the error state when the request fails', async () => {
    server.use(
      http.get(`${API_BASE_URL}/employees`, () =>
        HttpResponse.json({ message: 'boom' }, { status: 500 }),
      ),
    );

    renderWithProviders(<EmployeeListProbe />);

    expect(await screen.findByText('error')).toBeInTheDocument();
  });
});
