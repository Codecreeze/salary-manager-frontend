import { Card, CardContent, Skeleton } from '@mui/material';
import { chartCardSkeletonSx } from './chartCardSkeleton.style';

/**
 * Loading placeholder for a chart card (`GroupedStatBarChart`/
 * `SalaryDistributionChart`), sized to match the real card: a title-sized
 * line followed by a rounded block matching the chart's fixed 300px height.
 */
export function ChartCardSkeleton() {
  return (
    <Card sx={chartCardSkeletonSx.card}>
      <CardContent>
        <Skeleton variant="text" width="40%" height={32} sx={chartCardSkeletonSx.titleLine} />
        <Skeleton variant="rounded" height={300} />
      </CardContent>
    </Card>
  );
}
