import type { ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Drawer, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { muiDetailDrawerSx } from './muiDetailDrawer.style';

export interface MuiDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  subtitle?: string;
  children: ReactNode;
  width?: number;
  /** Renders an edit icon button in the header, next to close, when provided. */
  onEdit?: () => void;
}

/**
 * Generic right-side drawer shell for viewing an entity's details without
 * navigating away from the underlying list. Reusable for any future
 * "view in a side panel" need — content is entirely provided by the caller.
 */
export function MuiDetailDrawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  width = 480,
  onEdit,
}: MuiDetailDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: muiDetailDrawerSx.paper(width) } }}
    >
      <Stack sx={muiDetailDrawerSx.root}>
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          sx={muiDetailDrawerSx.header}
        >
          <Box sx={muiDetailDrawerSx.titleBox}>
            <Typography variant="h6" noWrap>
              {title}
            </Typography>
            {subtitle ? (
              <Typography variant="body2" color="text.secondary" noWrap>
                {subtitle}
              </Typography>
            ) : null}
          </Box>
          <Stack direction="row" spacing={0.5}>
            {onEdit ? (
              <Tooltip title="Edit">
                <IconButton onClick={onEdit} aria-label="Edit">
                  <EditOutlinedIcon />
                </IconButton>
              </Tooltip>
            ) : null}
            <Tooltip title="Close">
              <IconButton onClick={onClose} aria-label="Close details">
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Box sx={muiDetailDrawerSx.content}>{children}</Box>
      </Stack>
    </Drawer>
  );
}
