import { Card, CardContent, Grid, Skeleton, Stack } from '@mui/material';
import { summaryCardsSkeletonSx } from './summaryCardsSkeleton.style';

/**
 * Loading placeholder for `SummaryCards`, sized to match its real KPI card
 * shape (label + chip row, then a large value line, then an optional
 * sub-value line) so there's no layout jump once real data arrives.
 */
export function SummaryCardsSkeleton() {
  return (
    <Grid container spacing={2} sx={summaryCardsSkeletonSx.grid}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
          <Card sx={summaryCardsSkeletonSx.card}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Skeleton variant="text" width="55%" height={20} />
                <Skeleton variant="rounded" width={64} height={24} />
              </Stack>
              <Skeleton
                variant="text"
                width="70%"
                height={40}
                sx={summaryCardsSkeletonSx.valueLine}
              />
              <Skeleton
                variant="text"
                width="50%"
                height={20}
                sx={summaryCardsSkeletonSx.subvalueLine}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
