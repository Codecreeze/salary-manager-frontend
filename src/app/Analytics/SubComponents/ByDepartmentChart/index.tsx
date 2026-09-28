import { useGetAnalyticsByDepartmentQuery } from '@/services';
import { ChartCardSkeleton } from '../ChartCardSkeleton';
import { GroupedStatBarChart } from '../GroupedStatBarChart';

export interface ByDepartmentChartProps {
  currency: string;
}

/** Average/median salary + headcount per department, for one currency. */
export function ByDepartmentChart({ currency }: ByDepartmentChartProps) {
  const { data, isLoading, isError } = useGetAnalyticsByDepartmentQuery();

  if (isLoading) return <ChartCardSkeleton />;
  if (isError || !data) {
    throw new Error('Could not load department analytics.');
  }

  return (
    <GroupedStatBarChart
      title="Salary by department"
      data={data.filter((row) => row.currency === currency)}
    />
  );
}
