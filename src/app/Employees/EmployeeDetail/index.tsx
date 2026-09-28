import { Card, CardContent, Divider, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { LoadingState } from '@/components/LoadingState';
import { useGetEmployeeByIdQuery } from '@/services';
import { EmployeeProfileCard } from '@/app/Employees/SubComponents/EmployeeProfileCard';
import { SalaryHistoryTable } from '@/app/Employees/SubComponents/SalaryHistoryTable';
import { SalaryForm } from '@/app/Employees/SubComponents/SalaryForm';
import { employeeDetailSx } from './employeeDetail.style';

/** Employee profile: core record, salary history, and add-salary-record form. */
export default function EmployeeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: employee,
    isLoading,
    isError,
    refetch,
  } = useGetEmployeeByIdQuery(id ?? '', {
    skip: !id,
  });

  if (isLoading) {
    return <LoadingState variant="page" />;
  }

  if (isError || !employee) {
    throw new Error('Could not load this employee. They may not exist, or the API is unreachable.');
  }

  return (
    <>
      <BreadCrumbs
        title={`${employee.firstName} ${employee.lastName}`}
        subtitle={employee.employeeCode}
        breadcrumbs={[
          { label: 'Employees', to: '/employees' },
          { label: `${employee.firstName} ${employee.lastName}` },
        ]}
      />
      <Card>
        <CardContent>
          <EmployeeProfileCard employee={employee} variant="plain" />
          <Divider sx={employeeDetailSx.divider} />
          <Typography variant="h6" sx={employeeDetailSx.sectionTitle}>
            Salary history
          </Typography>
          <SalaryHistoryTable records={employee.salaryHistory} />
          <Divider sx={employeeDetailSx.divider} />
          <Typography variant="subtitle1" sx={employeeDetailSx.sectionTitle}>
            Record a salary change
          </Typography>
          <SalaryForm employeeId={employee.id} onSuccess={refetch} />
        </CardContent>
      </Card>
    </>
  );
}
