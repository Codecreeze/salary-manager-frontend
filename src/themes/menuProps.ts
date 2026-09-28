import type { MenuProps } from '@mui/material';

/**
 * Shared dropdown-menu configuration for every Select / TextField(select) in
 * the app, so max-height and radius are consistent instead of re-declared
 * per component (see docs/RULES.md — DRY).
 */
/** Shared dropdown max-height (px) reused by every Select/Menu popover — see MENU_PROPS below. */
export const MENU_MAX_HEIGHT = 260;

export const MENU_PROPS: Partial<MenuProps> = {
  slotProps: {
    paper: {
      sx: { maxHeight: MENU_MAX_HEIGHT, borderRadius: '10px' },
    },
  },
};
