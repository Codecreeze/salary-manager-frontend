import { useMemo, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { useGetAnalyticsSummaryQuery } from '@/services';
import { SummaryCardsSection } from '@/app/Analytics/SubComponents/SummaryCardsSection';
import { SummaryCardsSkeleton } from '@/app/Analytics/SubComponents/SummaryCardsSkeleton';
import { ChartCardSkeleton } from '@/app/Analytics/SubComponents/ChartCardSkeleton';
import { CurrencySelect } from '@/app/Analytics/SubComponents/CurrencySelect';
import { ByDepartmentChart } from '@/app/Analytics/SubComponents/ByDepartmentChart';
import { ByCountryChart } from '@/app/Analytics/SubComponents/ByCountryChart';
import { ByLevelChart } from '@/app/Analytics/SubComponents/ByLevelChart';
import { SalaryDistributionChart } from '@/app/Analytics/SubComponents/SalaryDistributionChart';
import { analyticsSx } from './analytics.style';

/**
 * Pay analytics dashboard. Salary figures are never blended across
 * currencies (see PRD "scope out" — no FX conversion), so one currency is
 * selected here and threaded down to every per-group chart.
 */
function DashboardPage() {
  const { data: summary, isLoading, isError } = useGetAnalyticsSummaryQuery();
  const [currency, setCurrency] = useState<string | null>(null);

  const currencies = useMemo(
    () => summary?.payrollByCurrency.map((entry) => entry.currency).sort() ?? [],
    [summary],
  );
  const defaultCurrency = useMemo(() => {
    if (!summary) return null;
    return [...summary.payrollByCurrency].sort((a, b) => b.total - a.total)[0]?.currency ?? null;
  }, [summary]);
  const selectedCurrency = currency ?? defaultCurrency;

  if (!isLoading && (isError || !summary || !selectedCurrency)) {
    throw new Error('Could not load analytics summary.');
  }
  const currencyForCharts = selectedCurrency as string;

  return (
    <>
      <BreadCrumbs title="Analytics" subtitle="How ACME pays its people, at a glance" />
      {isLoading ? (
        <>
          <SummaryCardsSkeleton />
          <Grid container spacing={2}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <ChartCardSkeleton />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <>
          <SummaryCardsSection />
          <Box sx={analyticsSx.currencySelectRow}>
            <CurrencySelect
              currencies={currencies}
              value={currencyForCharts}
              onChange={setCurrency}
            />
          </Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ByDepartmentChart currency={currencyForCharts} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ByCountryChart currency={currencyForCharts} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ByLevelChart currency={currencyForCharts} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <SalaryDistributionChart currency={currencyForCharts} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default DashboardPage;
