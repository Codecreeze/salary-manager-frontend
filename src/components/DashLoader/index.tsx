import { Box, LinearProgress } from '@mui/material';
import { dashLoaderSx } from './dashLoader.style';

/** Full-area loading indicator shown while a lazy-loaded route chunk fetches. */
export default function DashLoader() {
  return (
    <Box sx={dashLoaderSx.container}>
      <LinearProgress aria-label="Loading…" sx={dashLoaderSx.bar} />
    </Box>
  );
}
