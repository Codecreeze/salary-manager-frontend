import { Box } from '@mui/material';
import { useParams } from 'react-router';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { LoadingState } from '@/components/LoadingState';
import { useGetEmployeeByIdQuery } from '@/services';
import { EmployeeFormFields } from '@/app/Employees/SubComponents/EmployeeFormFields';
import { employeeFormSx } from './employeeForm.style';

/** Create/edit employee page. Composition only — form logic lives in EmployeeFormFields. */
export default function EmployeeFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const {
    data: employee,
    isLoading,
    isError,
  } = useGetEmployeeByIdQuery(id ?? '', {
    skip: !isEditing,
  });

  if (isEditing && isLoading) {
    return <LoadingState variant="page" />;
  }

  if (isEditing && (isError || !employee)) {
    throw new Error('Could not load this employee.');
  }

  const title = isEditing ? 'Edit employee' : 'Add employee';
  // The heading itself is just the employee's name when editing (or "Add
  // employee" when creating) — "Edit employee" as a label already lives in
  // the breadcrumb trail, so it doesn't need to repeat inside the heading too.
  const pageTitle = isEditing && employee ? `${employee.firstName} ${employee.lastName}` : title;

  return (
    <>
      <BreadCrumbs
        title={pageTitle}
        breadcrumbs={[{ label: 'Employees', to: '/employees' }, { label: title }]}
      />
      <Box sx={employeeFormSx.container}>
        <EmployeeFormFields existingEmployee={employee} />
      </Box>
    </>
  );
}
