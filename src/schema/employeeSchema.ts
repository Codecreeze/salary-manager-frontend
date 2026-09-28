import { z } from 'zod';
import type { EmploymentStatus, JobLevel } from '@/services';
import { CURRENCIES, EMPLOYMENT_STATUSES, JOB_LEVELS } from '@/utils/constants';

// Mirrors the backend CreateEmployee/UpdateEmployee DTO validation (TRD).
export const employeeFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.email('Enter a valid email address'),
  departmentId: z.string().min(1, 'Department is required'),
  countryId: z.string().min(1, 'Country is required'),
  jobLevel: z.enum(JOB_LEVELS as [JobLevel, ...JobLevel[]], {
    error: 'Select a job level',
  }),
  employmentStatus: z.enum(EMPLOYMENT_STATUSES as [EmploymentStatus, ...EmploymentStatus[]], {
    error: 'Select a status',
  }),
  hireDate: z.string().min(1, 'Hire date is required'),
  initialSalaryAmount: z
    .number({ error: 'Starting salary is required' })
    .int('Amount must be a whole number')
    .positive('Amount must be greater than zero'),
  initialSalaryCurrency: z.enum(CURRENCIES as [string, ...string[]], {
    error: 'Select a valid currency',
  }),
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;
