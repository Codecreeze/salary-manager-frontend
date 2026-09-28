import { describe, expect, it } from 'vitest';
import { employeeFormSchema } from '../employeeSchema';

const validEmployee = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  departmentId: 'dept-1',
  countryId: 'country-1',
  jobLevel: 'L3',
  employmentStatus: 'ACTIVE',
  hireDate: '2024-01-15',
  initialSalaryAmount: 90000,
  initialSalaryCurrency: 'USD',
};

describe('employeeFormSchema', () => {
  it('parses a fully valid employee payload', () => {
    const result = employeeFormSchema.safeParse(validEmployee);
    expect(result.success).toBe(true);
  });

  it('fails when required string fields are empty', () => {
    const result = employeeFormSchema.safeParse({
      ...validEmployee,
      firstName: '',
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.includes('firstName'))).toBe(true);
  });

  it('fails on an invalid email address', () => {
    const result = employeeFormSchema.safeParse({
      ...validEmployee,
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.includes('email'))).toBe(true);
  });

  it('fails on a job level outside the allowed enum', () => {
    const result = employeeFormSchema.safeParse({
      ...validEmployee,
      jobLevel: 'L99',
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.includes('jobLevel'))).toBe(true);
  });

  it('fails when initialSalaryAmount is zero or negative', () => {
    const result = employeeFormSchema.safeParse({
      ...validEmployee,
      initialSalaryAmount: 0,
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.includes('initialSalaryAmount'))).toBe(
      true,
    );
  });

  it('fails when initialSalaryAmount is not a whole number', () => {
    const result = employeeFormSchema.safeParse({
      ...validEmployee,
      initialSalaryAmount: 100.5,
    });
    expect(result.success).toBe(false);
  });

  it('fails on an unsupported currency code', () => {
    const result = employeeFormSchema.safeParse({
      ...validEmployee,
      initialSalaryCurrency: 'ZZZ',
    });
    expect(result.success).toBe(false);
  });
});
