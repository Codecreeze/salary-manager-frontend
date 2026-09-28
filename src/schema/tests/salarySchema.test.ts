import { describe, expect, it } from 'vitest';
import { salaryFormSchema } from '../salarySchema';

const validSalary = {
  amount: 5000,
  currency: 'USD',
  effectiveDate: '2024-01-15',
  reason: 'MERIT',
};

describe('salaryFormSchema', () => {
  it('parses a fully valid salary payload', () => {
    expect(salaryFormSchema.safeParse(validSalary).success).toBe(true);
  });

  it('fails when amount is zero', () => {
    const result = salaryFormSchema.safeParse({ ...validSalary, amount: 0 });
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.includes('amount'))).toBe(true);
  });

  it('fails when amount is negative', () => {
    expect(salaryFormSchema.safeParse({ ...validSalary, amount: -100 }).success).toBe(false);
  });

  it('fails when amount is not a whole number', () => {
    expect(salaryFormSchema.safeParse({ ...validSalary, amount: 100.25 }).success).toBe(false);
  });

  it('fails on an unsupported currency', () => {
    expect(salaryFormSchema.safeParse({ ...validSalary, currency: 'ZZZ' }).success).toBe(false);
  });

  it('fails when effectiveDate is missing', () => {
    const result = salaryFormSchema.safeParse({
      ...validSalary,
      effectiveDate: '',
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.includes('effectiveDate'))).toBe(true);
  });

  it('fails on a reason outside the allowed enum', () => {
    const result = salaryFormSchema.safeParse({
      ...validSalary,
      reason: 'NOT_A_REASON',
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.includes('reason'))).toBe(true);
  });
});
