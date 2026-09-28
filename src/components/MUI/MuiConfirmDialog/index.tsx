import type { ReactNode } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { MuiButton } from '../MuiButton';
import { muiConfirmDialogSx } from './muiConfirmDialog.style';

export interface MuiConfirmDialogProps {
  open: boolean;
  title: string;
  description: ReactNode;
  confirmLabel?: string;
  confirmColor?: 'error' | 'primary' | 'warning' | 'success';
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Generic confirm/cancel dialog for any destructive or important action. */
export function MuiConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  confirmColor = 'primary',
  loading = false,
  onConfirm,
  onCancel,
}: MuiConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      slotProps={{ paper: { sx: muiConfirmDialogSx.paper } }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText component="div">{description}</DialogContentText>
      </DialogContent>
      <DialogActions sx={muiConfirmDialogSx.actions}>
        <MuiButton variant="outlined" onClick={onCancel} disabled={loading}>
          Cancel
        </MuiButton>
        <MuiButton onClick={onConfirm} variant="contained" color={confirmColor} disabled={loading}>
          {loading ? 'Saving…' : confirmLabel}
        </MuiButton>
      </DialogActions>
    </Dialog>
  );
}
