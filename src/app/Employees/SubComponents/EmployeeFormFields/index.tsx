import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Divider, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MuiButton as Button } from '@/components/MUI/MuiButton';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useGetCountriesQuery, useGetDepartmentsQuery } from '@/services';
import { useCreateEmployeeMutation, useUpdateEmployeeMutation } from '@/services';
import type { EmployeeDetail } from '@/services';
import { MENU_PROPS } from '@/themes/menuProps';
import {
  notifyError,
  notifySuccess,
  parseIsoDateString,
  toIsoDateString,
} from '@/utils/utilityFunctions';
import { CURRENCIES, EMPLOYMENT_STATUSES, JOB_LEVELS } from '@/utils/constants';
import { employeeFormSchema } from '@/schema/employeeSchema';
import type { EmployeeFormValues } from '@/schema/employeeSchema';

export interface EmployeeFormFieldsProps {
  /** When provided, the form edits this employee instead of creating a new one. */
  existingEmployee?: EmployeeDetail;
}

function toDefaultValues(employee?: EmployeeDetail): EmployeeFormValues {
  return {
    firstName: employee?.firstName ?? '',
    lastName: employee?.lastName ?? '',
    email: employee?.email ?? '',
    departmentId: employee?.department.id ?? '',
    countryId: employee?.country.id ?? '',
    jobLevel: employee?.jobLevel ?? 'L1',
    employmentStatus: employee?.employmentStatus ?? 'ACTIVE',
    hireDate: employee?.hireDate.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
    initialSalaryAmount: employee?.currentSalary?.amount ?? 0,
    initialSalaryCurrency: employee?.currentSalary?.currency ?? 'USD',
  };
}

/** Create/edit form for an employee's core record (and initial salary on create). */
export function EmployeeFormFields({ existingEmployee }: EmployeeFormFieldsProps) {
  const navigate = useNavigate();
  const { data: departments = [] } = useGetDepartmentsQuery();
  const { data: countries = [] } = useGetCountriesQuery();
  const [createEmployee, { isLoading: isCreating, isError: isCreateError }] =
    useCreateEmployeeMutation();
  const [updateEmployee, { isLoading: isUpdating, isError: isUpdateError }] =
    useUpdateEmployeeMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: toDefaultValues(existingEmployee),
  });

  const isEditing = !!existingEmployee;
  const isSaving = isCreating || isUpdating;
  const isError = isCreateError || isUpdateError;

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (isEditing) {
        const employee = await updateEmployee({
          id: existingEmployee.id,
          body: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            departmentId: values.departmentId,
            countryId: values.countryId,
            jobLevel: values.jobLevel,
            employmentStatus: values.employmentStatus,
            hireDate: values.hireDate,
          },
        }).unwrap();
        notifySuccess('Employee updated');
        navigate(`/employees/${employee.id}`);
        return;
      }

      const employee = await createEmployee({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        departmentId: values.departmentId,
        countryId: values.countryId,
        jobLevel: values.jobLevel,
        employmentStatus: values.employmentStatus,
        hireDate: values.hireDate,
        salaryAmount: values.initialSalaryAmount,
        currency: values.initialSalaryCurrency,
        salaryEffectiveDate: values.hireDate,
        salaryReason: 'HIRE',
      }).unwrap();
      notifySuccess('Employee created');
      navigate(`/employees/${employee.id}`);
    } catch {
      notifyError('Could not save changes — please try again.');
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <Stack spacing={3}>
        {isError ? (
          <Alert severity="error">
            Could not save this employee. Please check the fields and try again.
          </Alert>
        ) : null}

        <Stack spacing={2}>
          <Typography variant="subtitle1" fontWeight={600}>
            Personal details
          </Typography>
          <Divider />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First name"
                    fullWidth
                    size="medium"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last name"
                    fullWidth
                    size="medium"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    size="medium"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Stack>

        <Stack spacing={2}>
          <Typography variant="subtitle1" fontWeight={600}>
            Employment details
          </Typography>
          <Divider />
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="hireDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Hire date"
                    value={parseIsoDateString(field.value)}
                    onChange={(date) => field.onChange(toIsoDateString(date))}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: 'medium',
                        onBlur: field.onBlur,
                        error: !!errors.hireDate,
                        helperText: errors.hireDate?.message,
                      },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="departmentId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Department"
                    slotProps={{ select: { MenuProps: MENU_PROPS } }}
                    fullWidth
                    size="medium"
                    error={!!errors.departmentId}
                    helperText={errors.departmentId?.message}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="countryId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Country"
                    slotProps={{ select: { MenuProps: MENU_PROPS } }}
                    fullWidth
                    size="medium"
                    error={!!errors.countryId}
                    helperText={errors.countryId?.message}
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.id} value={country.id}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="jobLevel"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Job level"
                    slotProps={{ select: { MenuProps: MENU_PROPS } }}
                    fullWidth
                    size="medium"
                    error={!!errors.jobLevel}
                    helperText={errors.jobLevel?.message}
                  >
                    {JOB_LEVELS.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: isEditing ? 12 : 6 }}>
              <Controller
                name="employmentStatus"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Employment status"
                    slotProps={{ select: { MenuProps: MENU_PROPS } }}
                    fullWidth
                    size="medium"
                    error={!!errors.employmentStatus}
                    helperText={errors.employmentStatus?.message}
                  >
                    {EMPLOYMENT_STATUSES.map((status) => (
                      <MenuItem key={status} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            {!isEditing ? (
              <>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="initialSalaryAmount"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        onChange={(e) => {
                          const raw = e.target.value;
                          // react-hook-form's internal `get()` falls back to
                          // the registered default value whenever a field is
                          // set to `undefined` — passing `undefined` here to
                          // represent "cleared" would silently reset it to 0
                          // instead of emptying the input. An empty string
                          // isn't special-cased that way, so it's the value
                          // that actually sticks; zod's `z.number()` then
                          // rejects it with the "required" message on
                          // submit, same as any other invalid type.
                          (field.onChange as (value: number | string) => void)(
                            raw === '' ? '' : Number(raw),
                          );
                        }}
                        type="number"
                        label="Starting salary"
                        fullWidth
                        size="medium"
                        error={!!errors.initialSalaryAmount}
                        helperText={errors.initialSalaryAmount?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12 }}>
                  <Controller
                    name="initialSalaryCurrency"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        label="Currency"
                        slotProps={{ select: { MenuProps: MENU_PROPS } }}
                        fullWidth
                        size="medium"
                        error={!!errors.initialSalaryCurrency}
                        helperText={errors.initialSalaryCurrency?.message}
                      >
                        {CURRENCIES.map((currency) => (
                          <MenuItem key={currency} value={currency}>
                            {currency}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </>
            ) : null}
          </Grid>
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSaving}>
            {isSaving ? 'Saving…' : isEditing ? 'Save changes' : 'Create employee'}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
