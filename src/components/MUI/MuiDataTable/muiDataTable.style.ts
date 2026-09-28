import type { SxProps, Theme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { SUBTLE_BORDER_ALPHA } from '@/utils/constants';

export const muiDataTableSx = {
  container: (height: number) =>
    ({
      height,
      border: '1px solid',
      borderColor: (theme: Theme) => alpha(theme.palette.text.primary, SUBTLE_BORDER_ALPHA),
      borderRadius: 1,
    }) as SxProps<Theme>,

  grid: {
    border: 'none',
    borderRadius: 1,
    '--DataGrid-containerBackground': 'transparent',
    '& .MuiDataGrid-columnHeaders': {
      fontWeight: 600,
      backgroundColor: (theme) => theme.palette.background.paper,
      borderBottom: (theme) =>
        `1px solid ${alpha(theme.palette.text.primary, SUBTLE_BORDER_ALPHA)}`,
    },
    // Column separators live on the header only, using DataGrid's own
    // native short-line separator icon (forced visible — MUI hides it
    // until hover/resize by default) rather than a full-height border
    // spanning the whole header cell.
    '& .MuiDataGrid-columnSeparator': {
      visibility: 'visible',
      color: (theme) => alpha(theme.palette.text.primary, SUBTLE_BORDER_ALPHA * 2),
    },
    // `.MuiDataGrid-columnHeader--last` (a class DataGrid itself
    // assigns to the true last visible header) is used here instead of
    // a `:last-of-type` CSS selector — column virtualization means the
    // last-rendered `.MuiDataGrid-columnHeader` in the DOM changes with
    // scroll position, and `:last-of-type` also silently fails to
    // match past a same-tag filler/spacer sibling MUI renders after
    // the real last column.
    '& .MuiDataGrid-columnHeader--last .MuiDataGrid-columnSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-cell': {
      borderRight: 'none',
    },
    // MUI X's default `.MuiDataGrid-cell` styles set `overflow: hidden`
    // for text-truncation/ellipsis, which also clips any content a
    // cell renders outside its own box (e.g. `EmployeeNameCell`'s
    // hover-underline, drawn just below the text baseline). Scoped to
    // the `name` column only, via DataGrid's own `data-field` attribute,
    // so every other column keeps its ellipsis truncation behavior.
    '& .MuiDataGrid-cell[data-field="name"]': {
      overflow: 'visible',
    },
    '& .MuiDataGrid-row': {
      borderBottom: (theme) =>
        `1px dashed ${alpha(theme.palette.text.primary, SUBTLE_BORDER_ALPHA)}`,
    },
    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
      outline: 'none',
    },
    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
      outline: 'none',
    },
  } as SxProps<Theme>,
};
