import { Box, Typography } from '@mui/material';
import { dashFooterSx } from './dashFooter.style';

/** Shared footer rendered at the bottom of every page inside DashboardLayout. */
export function DashFooter() {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" sx={dashFooterSx.root}>
      <Typography variant="caption" color="text.secondary">
        © {year} Pradeep Kumar. All rights reserved.
      </Typography>
    </Box>
  );
}
