import { Card, CardContent, Typography, useTheme } from '@mui/material';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useGetAnalyticsDistributionQuery } from '@/services';
import { useSettings } from '@/hooks/useSettings';
import { EmptyState } from '@/components/EmptyState';
import { ChartCardSkeleton } from '../ChartCardSkeleton';
import { formatNumber } from '@/utils/utilityFunctions';
import { salaryDistributionChartSx } from './salaryDistributionChart.style';

export interface SalaryDistributionChartProps {
  currency: string;
}

/** Salary histogram: headcount per salary band, for one currency. */
export function SalaryDistributionChart({ currency }: SalaryDistributionChartProps) {
  const theme = useTheme();
  const { numberFormatLocale } = useSettings();
  const { data, isLoading, isError } = useGetAnalyticsDistributionQuery();

  if (isLoading) return <ChartCardSkeleton />;
  if (isError || !data) {
    throw new Error('Could not load salary distribution.');
  }

  const chartData = data
    .filter((bucket) => bucket.currency === currency)
    .map((bucket) => ({
      band: `${formatNumber(bucket.bucketStart, numberFormatLocale)}–${formatNumber(bucket.bucketEnd, numberFormatLocale)}`,
      count: bucket.count,
    }));

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" sx={salaryDistributionChartSx.title}>
          Salary distribution
        </Typography>
        {chartData.length === 0 ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis
                dataKey="band"
                tick={{ fontSize: 11, fill: theme.palette.text.secondary }}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={60}
                stroke={theme.palette.divider}
              />
              <YAxis
                tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                stroke={theme.palette.divider}
              />
              <Tooltip
                formatter={(value) => formatNumber(Number(value), numberFormatLocale)}
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  borderRadius: 8,
                  color: theme.palette.text.primary,
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                name="Employees"
                stroke={theme.palette.primary.main}
                fill={theme.palette.primary.main}
                fillOpacity={theme.palette.mode === 'dark' ? 0.25 : 0.15}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
