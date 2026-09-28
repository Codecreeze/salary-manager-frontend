import { useState, type MouseEvent, type ReactNode } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { muiRowActionsMenuSx } from './muiRowActionsMenu.style';

export interface RowAction {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  color?: 'error' | 'inherit' | 'primary' | 'secondary' | 'warning' | 'success';
}

export interface MuiRowActionsMenuProps {
  actions: RowAction[];
  ariaLabel?: string;
}

/**
 * Generic 3-dot icon-button + Menu for per-row actions in any table. Not
 * table-specific: takes a plain list of actions.
 */
export function MuiRowActionsMenu({ actions, ariaLabel = 'Row actions' }: MuiRowActionsMenuProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton size="small" aria-label={ariaLabel} onClick={handleOpen}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={(event) => event.stopPropagation()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: muiRowActionsMenuSx.paper } }}
      >
        {actions.map((action) => (
          <MenuItem
            key={action.label}
            onClick={() => {
              handleClose();
              action.onClick();
            }}
            sx={action.color ? muiRowActionsMenuSx.itemColor(action.color) : undefined}
          >
            {action.icon ? (
              <ListItemIcon sx={muiRowActionsMenuSx.itemIcon}>{action.icon}</ListItemIcon>
            ) : null}
            <ListItemText primary={action.label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
