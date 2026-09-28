import { Skeleton, Stack } from '@mui/material';
import { loadingStateSx } from './loadingState.style';

export interface LoadingStateProps {
  /**
   * `page` approximates a heading + a block of content (e.g. a whole page or
   * card's worth of content loading). `drawer` approximates a profile
   * card's field rows followed by a short table, matching `DetailDrawer`'s
   * typical content shape.
   */
  variant?: 'page' | 'drawer';
}

/**
 * Shared loading placeholder reused by data-fetching views that load a
 * single block of content (as opposed to a list/grid, which should prefer a
 * purpose-built skeleton shaped like its own real content — see
 * `ChartCardSkeleton`/`SummaryCardsSkeleton` in `features/analytics`).
 * Renders `Skeleton`s sized to roughly match the real content so there's no
 * layout jump once it arrives — never a spinner.
 */
export function LoadingState({ variant = 'page' }: LoadingStateProps) {
  if (variant === 'drawer') {
    return (
      <Stack spacing={2}>
        <Skeleton variant="rounded" height={160} />
        <Skeleton variant="text" width="30%" height={32} />
        <Skeleton variant="rounded" height={180} />
      </Stack>
    );
  }

  return (
    <Stack spacing={2} sx={loadingStateSx.page}>
      <Skeleton variant="text" width="35%" height={40} />
      <Skeleton variant="rounded" height={220} />
      <Skeleton variant="rounded" height={120} />
    </Stack>
  );
}
