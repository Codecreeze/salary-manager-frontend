import { useGetAnalyticsByLevelQuery } from '@/services';
import { ChartCardSkeleton } from '../ChartCardSkeleton';
import { GroupedStatBarChart } from '../GroupedStatBarChart';

export interface ByLevelChartProps {
  currency: string;
}

/** Average/median salary + headcount per job level, for one currency. */
export function ByLevelChart({ currency }: ByLevelChartProps) {
  const { data, isLoading, isError } = useGetAnalyticsByLevelQuery();

  if (isLoading) return <ChartCardSkeleton />;
  if (isError || !data) {
    throw new Error('Could not load job-level analytics.');
  }

  return (
    <GroupedStatBarChart
      title="Salary by job level"
      data={data.filter((row) => row.currency === currency)}
    />
  );
}
