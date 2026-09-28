import { useGetAnalyticsByCountryQuery } from '@/services';
import { ChartCardSkeleton } from '../ChartCardSkeleton';
import { GroupedStatBarChart } from '../GroupedStatBarChart';

export interface ByCountryChartProps {
  currency: string;
}

/** Average/median salary + headcount per country, for one currency. */
export function ByCountryChart({ currency }: ByCountryChartProps) {
  const { data, isLoading, isError } = useGetAnalyticsByCountryQuery();

  if (isLoading) return <ChartCardSkeleton />;
  if (isError || !data) {
    throw new Error('Could not load country analytics.');
  }

  return (
    <GroupedStatBarChart
      title="Salary by country"
      data={data.filter((row) => row.currency === currency)}
    />
  );
}
