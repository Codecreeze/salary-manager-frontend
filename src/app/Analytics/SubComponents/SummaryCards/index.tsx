import { Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { useSettings } from '@/hooks/useSettings';
import type { AnalyticsSummary } from '@/services';
import { formatCurrency, formatNumber } from '@/utils/utilityFunctions';
import { summaryCardsSx } from './summaryCards.style';

export interface SummaryCardsProps {
  summary: AnalyticsSummary;
}

/** Headcount + total/average payroll cost cards, one card per currency. */
export function SummaryCards({ summary }: SummaryCardsProps) {
  const { numberFormatLocale } = useSettings();

  return (
    <Grid container spacing={2} sx={summaryCardsSx.grid}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <SummaryCard
          label="Headcount"
          value={formatNumber(summary.headcount, numberFormatLocale)}
          chipLabel="Active"
        />
      </Grid>
      {summary.payrollByCurrency.map((entry) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={entry.currency}>
          <SummaryCard
            label={`Total payroll (${entry.currency})`}
            value={formatCurrency(entry.total, entry.currency, numberFormatLocale)}
            subvalue={`avg ${formatCurrency(entry.average, entry.currency, numberFormatLocale)}`}
            chipLabel={entry.currency}
          />
        </Grid>
      ))}
    </Grid>
  );
}

function SummaryCard({
  label,
  value,
  subvalue,
  chipLabel,
}: {
  label: string;
  value: string;
  subvalue?: string;
  chipLabel: string;
}) {
  return (
    <Card sx={summaryCardsSx.card}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            {label.toUpperCase()}
          </Typography>
          <Chip
            size="small"
            icon={<TrendingUpRoundedIcon fontSize="small" />}
            label={chipLabel}
            color="success"
            variant="outlined"
          />
        </Stack>
        <Typography variant="h5" fontWeight={700} sx={summaryCardsSx.value}>
          {value}
        </Typography>
        {subvalue ? (
          <Typography variant="body2" color="text.secondary" sx={summaryCardsSx.subvalue}>
            {subvalue}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
}
