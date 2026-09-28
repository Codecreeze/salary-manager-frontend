import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { MuiButton as Button } from '@/components/MUI/MuiButton';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { LoadingState } from '@/components/LoadingState';
import { MuiConfirmDialog as ConfirmDialog } from '@/components/MUI/MuiConfirmDialog';
import { MuiDetailDrawer as DetailDrawer } from '@/components/MUI/MuiDetailDrawer';
import { useDispatch, useSelector } from '@/store/hooks';
import {
  useGetEmployeeByIdQuery,
  useGetEmployeesQuery,
  useUpdateEmployeeMutation,
  setPage,
  setPageSize,
  setSort,
} from '@/services';
import type { EmployeeListItem } from '@/services';
import { getStatusToggleConfig, notifyError, notifySuccess } from '@/utils/utilityFunctions';
import { EmployeeFilters } from '@/app/Employees/SubComponents/EmployeeFilters';
import { SalaryTable } from '@/app/Employees/SubComponents/SalaryTable';
import { EmployeeProfileCard } from '@/app/Employees/SubComponents/EmployeeProfileCard';
import { SalaryHistoryTable } from '@/app/Employees/SubComponents/SalaryHistoryTable';
import { employeesSx } from './employees.style';

/** Employee directory: search, filter, and paginated table. Composition only. */
export default function EmployeeListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filters = useSelector((state) => state.employeeFilters);
  const { data, isLoading, isError } = useGetEmployeesQuery({
    search: filters.search || undefined,
    departmentId: filters.departmentId ?? undefined,
    countryId: filters.countryId ?? undefined,
    jobLevel: filters.jobLevel ?? undefined,
    status: filters.status ?? undefined,
    page: filters.page,
    pageSize: filters.pageSize,
    sortBy: filters.sortBy ?? undefined,
    sortOrder: filters.sortBy ? filters.sortOrder : undefined,
  });

  const [viewedEmployeeId, setViewedEmployeeId] = useState<string | null>(null);
  const [employeeToToggleStatus, setEmployeeToToggleStatus] = useState<EmployeeListItem | null>(
    null,
  );
  // Retains the last non-null toggle target so the ConfirmDialog's title/label/
  // color stay stable while it plays its closing transition (open=false but
  // still mounted) instead of snapping to generic fallback content mid-fade.
  // Adjusting state during render, per React's documented pattern, rather than
  // an effect, since this is purely derived from the incoming prop.
  const [lastToggleTarget, setLastToggleTarget] = useState<EmployeeListItem | null>(null);
  if (employeeToToggleStatus && employeeToToggleStatus !== lastToggleTarget) {
    setLastToggleTarget(employeeToToggleStatus);
  }
  const toggleDialogTarget = employeeToToggleStatus ?? lastToggleTarget;

  if (isError) {
    throw new Error('Could not load the employee directory. Check that the API is running.');
  }

  const { data: viewedEmployee, isLoading: isViewedLoading } = useGetEmployeeByIdQuery(
    viewedEmployeeId ?? '',
    {
      skip: !viewedEmployeeId,
    },
  );
  const [updateEmployee, { isLoading: isTogglingStatus }] = useUpdateEmployeeMutation();

  const statusToggle = toggleDialogTarget
    ? getStatusToggleConfig(toggleDialogTarget.employmentStatus)
    : null;

  const handleConfirmToggleStatus = async () => {
    if (!employeeToToggleStatus || !statusToggle) return;
    try {
      await updateEmployee({
        id: employeeToToggleStatus.id,
        body: { employmentStatus: statusToggle.nextStatus },
      }).unwrap();
      notifySuccess(`Marked as ${statusToggle.nextStatus === 'ACTIVE' ? 'active' : 'inactive'}`);
      setEmployeeToToggleStatus(null);
    } catch {
      notifyError('Could not save changes — please try again.');
    }
  };

  return (
    <>
      <BreadCrumbs
        title="Employees"
        subtitle="Search, filter, and manage the employee directory"
        actions={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/employees/new')}
          >
            Add employee
          </Button>
        }
      />
      <EmployeeFilters />
      <SalaryTable
        employees={data?.items ?? []}
        total={data?.total ?? 0}
        page={data?.page ?? filters.page}
        pageSize={data?.pageSize ?? filters.pageSize}
        loading={isLoading}
        onPageChange={(page) => dispatch(setPage(page))}
        onPageSizeChange={(pageSize) => dispatch(setPageSize(pageSize))}
        sortBy={filters.sortBy}
        sortOrder={filters.sortOrder}
        onSortChange={(sortBy, sortOrder) => dispatch(setSort({ sortBy, sortOrder }))}
        onView={(employee) => setViewedEmployeeId(employee.id)}
        onToggleStatus={(employee) => setEmployeeToToggleStatus(employee)}
      />

      <DetailDrawer
        open={!!viewedEmployeeId}
        onClose={() => setViewedEmployeeId(null)}
        title={
          viewedEmployee ? (
            <>
              {viewedEmployee.firstName} {viewedEmployee.lastName}{' '}
              <Typography component="span" variant="body2" color="text.secondary" fontWeight={400}>
                {viewedEmployee.employeeCode}
              </Typography>
            </>
          ) : (
            'Employee details'
          )
        }
        onEdit={viewedEmployee ? () => navigate(`/employees/${viewedEmployee.id}/edit`) : undefined}
      >
        {isViewedLoading || !viewedEmployee ? (
          <LoadingState variant="drawer" />
        ) : (
          <>
            <EmployeeProfileCard employee={viewedEmployee} variant="plain" showEditButton={false} />
            <Typography variant="h6" sx={employeesSx.salaryHistoryTitle}>
              Salary history
            </Typography>
            <SalaryHistoryTable records={viewedEmployee.salaryHistory} />
          </>
        )}
      </DetailDrawer>

      <ConfirmDialog
        open={!!employeeToToggleStatus}
        title={`Mark employee as ${statusToggle?.actionLabel}?`}
        description={
          toggleDialogTarget && statusToggle ? (
            <>
              {toggleDialogTarget.firstName} {toggleDialogTarget.lastName} will be marked{' '}
              <Box component="span" sx={employeesSx.statusEmphasis}>
                {statusToggle.nextStatus}
              </Box>
              . Their salary history is preserved.
            </>
          ) : (
            ''
          )
        }
        confirmLabel={statusToggle?.actionLabel}
        confirmColor={statusToggle?.color}
        loading={isTogglingStatus}
        onConfirm={handleConfirmToggleStatus}
        onCancel={() => setEmployeeToToggleStatus(null)}
      />
    </>
  );
}
