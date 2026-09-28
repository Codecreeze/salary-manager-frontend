import { Card, CardContent, Typography, useTheme } from '@mui/material';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { GroupedSalaryStat } from '@/services';
import { useSettings } from '@/hooks/useSettings';
import { EmptyState } from '@/components/EmptyState';
import { formatNumber } from '@/utils/utilityFunctions';
import { groupedStatBarChartSx } from './groupedStatBarChart.style';

export interface GroupedStatBarChartProps {
  title: string;
  data: GroupedSalaryStat[];
}

/**
 * Shared presentational bar chart for "average/median salary + headcount per
 * group" — reused by the department/country/level chart cards (DRY) since
 * they share the exact same data shape and visualization.
 */
export function GroupedStatBarChart({ title, data }: GroupedStatBarChartProps) {
  const theme = useTheme();
  const { numberFormatLocale } = useSettings();
  const axisColor = theme.palette.text.secondary;
  const gridColor = theme.palette.divider;

  return (
    <Card sx={groupedStatBarChartSx.card}>
      <CardContent>
        <Typography variant="subtitle1" sx={groupedStatBarChartSx.title}>
          {title}
        </Typography>
        {data.length === 0 ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: axisColor }}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={60}
                stroke={gridColor}
              />
              <YAxis tick={{ fontSize: 12, fill: axisColor }} stroke={gridColor} />
              <Tooltip
                formatter={(value) => formatNumber(Number(value), numberFormatLocale)}
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.divider,
                  borderRadius: 8,
                  color: theme.palette.text.primary,
                }}
              />
              <Legend iconType="circle" wrapperStyle={{ color: theme.palette.text.secondary }} />
              <Bar
                dataKey="averageSalary"
                name="Average salary"
                fill={theme.palette.primary.main}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="medianSalary"
                name="Median salary"
                fill={theme.palette.primary.light}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
