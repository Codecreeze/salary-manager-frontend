import { useGetAnalyticsSummaryQuery } from '@/services';
import { SummaryCards } from '../SummaryCards';
import { SummaryCardsSkeleton } from '../SummaryCardsSkeleton';

/** Fetches the analytics summary and renders the headcount/payroll cards. */
export function SummaryCardsSection() {
  const { data, isLoading, isError } = useGetAnalyticsSummaryQuery();

  if (isLoading) return <SummaryCardsSkeleton />;
  if (isError || !data) {
    throw new Error('Could not load the analytics summary.');
  }

  return <SummaryCards summary={data} />;
}
