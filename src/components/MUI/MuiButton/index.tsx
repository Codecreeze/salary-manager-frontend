import { Button as BaseMuiButton, type ButtonProps as MuiButtonProps } from '@mui/material';

export type ButtonProps = MuiButtonProps;

/**
 * App-wide default `Button`: general-purpose actions (page/dialog/form
 * actions) render in a theme-aware ink tone — near-black in light mode,
 * near-white in dark mode — instead of the app's teal `primary.main`, per
 * variant (`contained`/`outlined`/`text`).
 *
 * Call sites carrying deliberate semantic meaning (destructive/success
 * confirms, etc.) should pass an explicit `color` prop (e.g. `color="error"`)
 * to opt out and get standard MUI palette behavior instead.
 */
export function MuiButton({ sx, ...props }: ButtonProps) {
  // An explicit `color` prop always wins — this component only supplies a
  // default when the caller hasn't opted into a specific palette color.
  if (props.color) {
    return <BaseMuiButton {...props} sx={sx} />;
  }

  return (
    <BaseMuiButton
      {...props}
      sx={[
        (theme) => {
          const ink =
            theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black;
          const inkContrast =
            theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.common.white;
          const variant = props.variant ?? 'text';

          if (variant === 'contained') {
            return {
              backgroundColor: ink,
              color: inkContrast,
              '&:hover': {
                backgroundColor:
                  theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[800],
              },
            };
          }

          if (variant === 'outlined') {
            return {
              color: ink,
              borderColor: ink,
              '&:hover': {
                borderColor: ink,
                backgroundColor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.04)',
              },
            };
          }

          return {
            color: ink,
            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
            },
          };
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
