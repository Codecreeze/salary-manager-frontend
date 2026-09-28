import { z } from 'zod';
import type { SalaryReason } from '@/services';
import { CURRENCIES, SALARY_REASONS } from '@/utils/constants';

// Client-side mirror of the backend's class-validator DTO rules (TRD ->
// POST /employees/:id/salary). This is a UX convenience, never the only
// validation layer — the server re-validates independently.
export const salaryFormSchema = z.object({
  amount: z
    .number({ error: 'Amount is required' })
    .int('Amount must be a whole number')
    .positive('Amount must be greater than zero'),
  currency: z.enum(CURRENCIES as [string, ...string[]], {
    error: 'Select a valid currency',
  }),
  effectiveDate: z.string().min(1, 'Effective date is required'),
  reason: z.enum(SALARY_REASONS as [SalaryReason, ...SalaryReason[]], {
    error: 'Select a reason',
  }),
});

export type SalaryFormValues = z.infer<typeof salaryFormSchema>;
