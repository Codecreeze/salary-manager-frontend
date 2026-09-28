import { Box } from '@mui/material';
import {
  DataGrid,
  type DataGridProps,
  type GridColDef,
  type GridPaginationModel,
  type GridSortModel,
  type GridValidRowModel,
} from '@mui/x-data-grid';
import { EmptyState } from '@/components/EmptyState';
import { muiDataTableSx } from './muiDataTable.style';

const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];
const DEFAULT_HEIGHT = 632;

export interface MuiDataTableProps<T extends GridValidRowModel> extends Pick<
  DataGridProps<T>,
  | 'rows'
  | 'columns'
  | 'loading'
  | 'getRowId'
  | 'slots'
  | 'slotProps'
  | 'disableColumnMenu'
  | 'disableColumnResize'
  | 'onRowClick'
> {
  rowCount: number;
  paginationModel: GridPaginationModel;
  onPaginationModelChange: (model: GridPaginationModel) => void;
  sortModel: GridSortModel;
  onSortModelChange: (model: GridSortModel) => void;
  rowsPerPageOptions?: number[];
  height?: number;
  ariaLabel?: string;
}

/**
 * Generic, reusable wrapper around MUI X `DataGrid`, styled to match this
 * app's visual language (subtle border/radius, sticky header, fixed-height
 * internal scrolling). Intended for
 * server-side pagination/sorting. Entity-specific column defs and row
 * shaping belong in the caller, not here.
 */
export function MuiDataTable<T extends GridValidRowModel>({
  rows,
  columns,
  rowCount,
  loading,
  paginationModel,
  onPaginationModelChange,
  sortModel,
  onSortModelChange,
  rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS,
  height = DEFAULT_HEIGHT,
  ariaLabel,
  getRowId,
  slots,
  slotProps,
  disableColumnMenu = true,
  disableColumnResize,
  onRowClick,
}: MuiDataTableProps<T>) {
  return (
    <Box role="region" aria-label={ariaLabel} sx={muiDataTableSx.container(height)}>
      <DataGrid
        rows={rows}
        columns={columns as GridColDef<T>[]}
        rowCount={rowCount}
        loading={loading}
        getRowId={getRowId}
        paginationMode="server"
        sortingMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        pageSizeOptions={rowsPerPageOptions}
        disableColumnMenu={disableColumnMenu}
        disableColumnResize={disableColumnResize}
        disableRowSelectionOnClick
        onRowClick={onRowClick}
        slots={{ noRowsOverlay: EmptyState, ...slots }}
        slotProps={{
          // Renders column-shaped skeleton rows while `loading` is true,
          // instead of MUI X's default plain overlay (a `CircularProgress`),
          // per this app's "no spinners" convention.
          loadingOverlay: { variant: 'skeleton', noRowsVariant: 'skeleton' },
          ...slotProps,
        }}
        sx={muiDataTableSx.grid}
      />
    </Box>
  );
}
