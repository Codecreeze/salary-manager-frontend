import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/test/renderWithProviders';
import { useGetCountriesQuery, useGetDepartmentsQuery } from '../lookupsApi';

function DepartmentsProbe() {
  const { data, isLoading } = useGetDepartmentsQuery();
  if (isLoading) return <div>loading</div>;
  return <div>{data?.map((department) => department.name).join(', ')}</div>;
}

function CountriesProbe() {
  const { data, isLoading } = useGetCountriesQuery();
  if (isLoading) return <div>loading</div>;
  return <div>countries: {data?.length ?? 0}</div>;
}

describe('lookupsApi', () => {
  it('fetches and returns the department list', async () => {
    renderWithProviders(<DepartmentsProbe />);

    expect(await screen.findByText('Engineering, Sales')).toBeInTheDocument();
  });

  it('fetches and returns the country list', async () => {
    renderWithProviders(<CountriesProbe />);

    expect(await screen.findByText('countries: 0')).toBeInTheDocument();
  });
});
