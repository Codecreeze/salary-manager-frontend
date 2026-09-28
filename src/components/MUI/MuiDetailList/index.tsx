import type { ReactNode } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { muiDetailListSx } from './muiDetailList.style';

export interface DetailListItem {
  label: string;
  value: ReactNode;
}

export interface MuiDetailListProps {
  items: DetailListItem[];
}

/**
 * Bordered label/value list, visually consistent with the app's bordered-table
 * look (see `SalaryHistoryTable`'s `Paper variant="outlined"`). Reusable for
 * any "read-only field list" need, e.g. inside a `DetailDrawer`.
 */
export function MuiDetailList({ items }: MuiDetailListProps) {
  return (
    <Paper variant="outlined">
      <Stack divider={<Box sx={muiDetailListSx.divider} />}>
        {items.map((item) => (
          <Stack
            key={item.label}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={muiDetailListSx.row}
          >
            <Typography variant="body2" color="text.secondary">
              {item.label}
            </Typography>
            <Typography variant="body2" sx={muiDetailListSx.value}>
              {item.value}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}
