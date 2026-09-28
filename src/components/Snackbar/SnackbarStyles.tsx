import type { CSSProperties } from 'react';
import { GlobalStyles, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCardShadow } from '@/themes/theme';

export function SnackbarStyles() {
  const theme = useTheme();
  const cardShadow = getCardShadow(theme.palette.mode);

  const iconBadgeStyles = (color: string) => ({
    backgroundColor: `${alpha(color, 0.12)} !important`,
    color: `${color} !important`,
  });

  return (
    <>
      <GlobalStyles
        styles={{
          '.Toastify__toast-container': {
            padding: theme.spacing(1),
          },
          '.Toastify__toast': {
            display: 'flex !important',
            alignItems: 'center',
            minWidth: '320px',
            backgroundColor: `${theme.palette.background.paper} !important`,
            borderRadius: `${Number(theme.shape.borderRadius) * 1.4}px !important`,
            boxShadow: `${cardShadow} !important`,
            padding: theme.spacing(1.5, 1.5, 1.5, 1.25),
            minHeight: 'auto',
            borderLeft: 'none !important',
          },
          '.Toastify__toast-body': {
            fontFamily: theme.typography.fontFamily,
            color: `${theme.palette.text.primary} !important`,
            fontWeight: 600,
            fontSize: '0.9375rem',
            margin: 0,
            padding: theme.spacing(0, 1),
            alignItems: 'center',
            // Grows to fill the row so the close button (margin-left: auto,
            // below) is pushed flush to the toast's right edge instead of
            // sitting immediately after the message text.
            flex: '1 1 auto',
          },
          '.Toastify__toast-icon': {
            width: 34,
            height: 34,
            minWidth: 34,
            borderRadius: '50% !important',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          '.Toastify__toast-icon svg': {
            width: 22,
            height: 22,
          },
          '.Toastify__toast--success .Toastify__toast-icon': iconBadgeStyles(
            theme.palette.success.main,
          ),
          '.Toastify__toast--error .Toastify__toast-icon': iconBadgeStyles(
            theme.palette.error.main,
          ),
          '.Toastify__toast--warning .Toastify__toast-icon': iconBadgeStyles(
            theme.palette.warning.main,
          ),
          '.Toastify__toast--info .Toastify__toast-icon': iconBadgeStyles(
            theme.palette.primary.main,
          ),
          // react-toastify positions the close button with `align-self:
          // flex-start` by default (pins it to the top of the toast). It's a
          // flex item of the outer toast row, so `align-self: center`
          // re-centers it vertically against the icon+message row instead —
          // "right end", not "top right". `position: static` guards against
          // any version of the stylesheet that instead absolutely positions
          // it in the corner.
          '.Toastify__close-button': {
            position: 'static !important',
            alignSelf: 'center !important',
            marginLeft: 'auto !important',
            opacity: '1 !important',
            color: theme.palette.text.secondary,
          },
          '.Toastify__close-button > svg': {
            fill: 'currentColor',
            width: 16,
            height: 16,
          },
        }}
      />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        closeOnClick={false}
        theme={theme.palette.mode}
        style={
          {
            '--toastify-color-light': theme.palette.background.paper,
            '--toastify-color-dark': theme.palette.background.paper,
            '--toastify-text-color-light': theme.palette.text.primary,
            '--toastify-text-color-dark': theme.palette.text.primary,
            '--toastify-color-success': theme.palette.success.main,
            '--toastify-color-error': theme.palette.error.main,
            '--toastify-color-warning': theme.palette.warning.main,
            '--toastify-color-info': theme.palette.primary.main,
            '--toastify-z-index': theme.zIndex.snackbar,
          } as CSSProperties
        }
      />
    </>
  );
}
