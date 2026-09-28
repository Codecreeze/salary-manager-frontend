import { Box } from '@mui/material';
import noDataImage from '@/assets/images/illustrations/no_data.png';
import { emptyStateSx } from './emptyState.style';

/** Shared empty-result indicator: just the illustration, nothing else. */
export function EmptyState() {
  return (
    <Box sx={emptyStateSx.container}>
      <Box component="img" src={noDataImage} alt="No data" sx={emptyStateSx.image} />
    </Box>
  );
}
