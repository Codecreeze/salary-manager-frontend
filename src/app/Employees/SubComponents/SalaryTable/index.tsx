import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Chip } from '@mui/material';
import { useNavigate } from 'react-router';
import type {
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
} from '@mui/x-data-grid';
import { MuiDataTable as DataGridTable } from '@/components/MUI/MuiDataTable';
import { EmployeeNameCell } from '../EmployeeNameCell';
import { MuiRowActionsMenu as RowActionsMenu } from '@/components/MUI/MuiRowActionsMenu';
import { useSettings } from '@/hooks/useSettings';
import type { EmployeeListItem, EmployeeSortField } from '@/services';
import { formatCurrency, getStatusToggleConfig } from '@/utils/utilityFunctions';

export interface SalaryTableProps {
  employees: EmployeeListItem[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  sortBy: EmployeeSortField | null;
  sortOrder: 'asc' | 'desc';
  onSortChange: (sortBy: EmployeeSortField | null, sortOrder: 'asc' | 'desc') => void;
  onView: (employee: EmployeeListItem) => void;
  /** Toggles the employee's employment status in whichever direction currently applies (Active/Inactive). */
  onToggleStatus: (employee: EmployeeListItem) => void;
  loading?: boolean;
}

// DataGrid's sortable `field` for the combined "Name" column maps to the
// backend's `lastName` sort key — the same convention the API already
// defaults to (see employeeFiltersSlice's initial state / backend default).
const GRID_FIELD_TO_SORT_FIELD: Record<string, EmployeeSortField> = {
  name: 'lastName',
  email: 'email',
  department: 'department',
  country: 'country',
};

const SORT_FIELD_TO_GRID_FIELD: Partial<Record<EmployeeSortField, string>> = {
  lastName: 'name',
  email: 'email',
  department: 'department',
  country: 'country',
};

/** Employee directory table (MUI X DataGrid): renders rows, drives server-side pagination and sorting. */
export function SalaryTable({
  employees,
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  sortBy,
  sortOrder,
  onSortChange,
  onView,
  onToggleStatus,
  loading,
}: SalaryTableProps) {
  const navigate = useNavigate();
  const { numberFormatLocale } = useSettings();

  const columns: GridColDef<EmployeeListItem>[] = [
    {
      field: 'employeeCode',
      headerName: 'Employee ID',
      sortable: false,
      minWidth: 120,
      maxWidth: 140,
    },
    {
      field: 'name',
      headerName: 'Name',
      sortable: true,
      minWidth: 160,
      maxWidth: 240,
      valueGetter: (_value, row) => `${row.firstName} ${row.lastName}`,
      renderCell: (params: GridRenderCellParams<EmployeeListItem>) => (
        <EmployeeNameCell
          employeeId={params.row.id}
          name={`${params.row.firstName} ${params.row.lastName}`}
        />
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: true,
      minWidth: 220,
      maxWidth: 420,
    },
    {
      field: 'department',
      headerName: 'Department',
      sortable: true,
      minWidth: 140,
      maxWidth: 200,
      valueGetter: (_value, row) => row.department.name,
    },
    {
      field: 'country',
      headerName: 'Country',
      sortable: true,
      minWidth: 140,
      resizable: false,
      valueGetter: (_value, row) => row.country.name,
    },
    {
      field: 'jobLevel',
      headerName: 'Job level',
      sortable: false,
      minWidth: 100,
      resizable: false,
    },
    {
      field: 'employmentStatus',
      headerName: 'Status',
      sortable: false,
      minWidth: 110,
      resizable: false,
      renderCell: (params: GridRenderCellParams<EmployeeListItem>) => (
        <Chip
          size="small"
          label={params.row.employmentStatus}
          color={params.row.employmentStatus === 'ACTIVE' ? 'success' : 'default'}
          variant="outlined"
        />
      ),
    },
    {
      field: 'currentSalary',
      headerName: 'Current salary',
      sortable: false,
      minWidth: 150,
      resizable: false,
      valueGetter: (_value, row) =>
        row.currentSalary
          ? formatCurrency(row.currentSalary.amount, row.currentSalary.currency, numberFormatLocale)
          : '—',
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      width: 70,
      resizable: false,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params: GridRenderCellParams<EmployeeListItem>) => {
        const employee = params.row;
        const statusToggle = getStatusToggleConfig(employee.employmentStatus);
        return (
          <RowActionsMenu
            ariaLabel={`Actions for ${employee.firstName} ${employee.lastName}`}
            actions={[
              {
                label: 'Edit',
                icon: <EditOutlinedIcon fontSize="small" />,
                onClick: () => navigate(`/employees/${employee.id}/edit`),
              },
              {
                label: 'View',
                icon: <PersonOutlineOutlinedIcon fontSize="small" />,
                onClick: () => onView(employee),
              },
              {
                label: statusToggle.actionLabel,
                icon:
                  statusToggle.actionLabel === 'Inactive' ? (
                    <BlockOutlinedIcon fontSize="small" />
                  ) : (
                    <CheckCircleOutlineIcon fontSize="small" />
                  ),
                onClick: () => onToggleStatus(employee),
                color: statusToggle.color,
              },
            ]}
          />
        );
      },
    },
  ];

  const paginationModel: GridPaginationModel = { page: page - 1, pageSize };

  const sortModel: GridSortModel = sortBy
    ? [{ field: SORT_FIELD_TO_GRID_FIELD[sortBy] ?? sortBy, sort: sortOrder }]
    : [];

  const handleSortModelChange = (model: GridSortModel) => {
    if (model.length === 0) {
      onSortChange(null, 'asc');
      return;
    }
    const { field, sort } = model[0];
    const nextSortBy = GRID_FIELD_TO_SORT_FIELD[field] ?? (field as EmployeeSortField);
    onSortChange(nextSortBy, sort ?? 'asc');
  };

  return (
    <DataGridTable
      ariaLabel="Employee directory"
      rows={employees}
      columns={columns}
      rowCount={total}
      loading={loading}
      paginationModel={paginationModel}
      onPaginationModelChange={(model) => {
        if (model.pageSize !== pageSize) {
          onPageSizeChange(model.pageSize);
          return;
        }
        onPageChange(model.page + 1);
      }}
      sortModel={sortModel}
      onSortModelChange={handleSortModelChange}
    />
  );
}
