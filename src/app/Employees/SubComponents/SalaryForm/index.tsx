import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Grid, MenuItem, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MuiButton as Button } from '@/components/MUI/MuiButton';
import { Controller, useForm } from 'react-hook-form';
import { useAddSalaryRecordMutation } from '@/services';
import { MENU_PROPS } from '@/themes/menuProps';
import {
  notifyError,
  notifySuccess,
  parseIsoDateString,
  toIsoDateString,
} from '@/utils/utilityFunctions';
import { CURRENCIES, SALARY_REASONS } from '@/utils/constants';
import { salaryFormSchema } from '@/schema/salarySchema';
import type { SalaryFormValues } from '@/schema/salarySchema';
import { salaryFormSx } from './salaryForm.style';

export interface SalaryFormProps {
  employeeId: string;
  onSuccess?: () => void;
}

const DEFAULT_VALUES: SalaryFormValues = {
  amount: 0,
  currency: 'USD',
  effectiveDate: new Date().toISOString().slice(0, 10),
  reason: 'MERIT',
};

/** Form to record a new SalaryRecord (raise/adjustment) for an employee. */
export function SalaryForm({ employeeId, onSuccess }: SalaryFormProps) {
  const [addSalaryRecord, { isLoading, isError }] = useAddSalaryRecordMutation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SalaryFormValues>({
    resolver: zodResolver(salaryFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await addSalaryRecord({ employeeId, body: values }).unwrap();
      notifySuccess('Salary record added');
      reset(DEFAULT_VALUES);
      onSuccess?.();
    } catch {
      notifyError('Could not save changes — please try again.');
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate>
      <Stack spacing={2}>
        {isError ? (
          <Alert severity="error">Could not save this salary record. Please try again.</Alert>
        ) : null}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => {
                    const raw = e.target.value;
                    // react-hook-form's internal `get()` falls back to the
                    // registered default value whenever a field is set to
                    // `undefined` — passing `undefined` here to represent
                    // "cleared" would silently reset it to 0 instead of
                    // emptying the input. An empty string isn't special-cased
                    // that way, so it's the value that actually sticks; zod's
                    // `z.number()` then rejects it with the "required"
                    // message on submit, same as any other invalid type.
                    (field.onChange as (value: number | string) => void)(
                      raw === '' ? '' : Number(raw),
                    );
                  }}
                  type="number"
                  label="Amount"
                  fullWidth
                  size="medium"
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Currency"
                  slotProps={{ select: { MenuProps: MENU_PROPS } }}
                  fullWidth
                  size="medium"
                  error={!!errors.currency}
                  helperText={errors.currency?.message}
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
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name="effectiveDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Effective date"
                  value={parseIsoDateString(field.value)}
                  onChange={(date) => field.onChange(toIsoDateString(date))}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: 'medium',
                      onBlur: field.onBlur,
                      error: !!errors.effectiveDate,
                      helperText: errors.effectiveDate?.message,
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Reason"
                  slotProps={{ select: { MenuProps: MENU_PROPS } }}
                  fullWidth
                  size="medium"
                  error={!!errors.reason}
                  helperText={errors.reason?.message}
                >
                  {SALARY_REASONS.map((reason) => (
                    <MenuItem key={reason} value={reason}>
                      {reason.replace('_', ' ')}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          sx={salaryFormSx.submitButton}
        >
          {isLoading ? 'Saving…' : 'Add salary record'}
        </Button>
      </Stack>
    </form>
  );
}
