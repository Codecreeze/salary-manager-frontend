import { describe, expect, it } from 'vitest';
import {
  formatCurrency,
  formatDate,
  formatNumber,
  parseIsoDateString,
  toIsoDateString,
} from '../utilityFunctions';

describe('formatCurrency', () => {
  it('formats a USD amount with en-US grouping and no decimals', () => {
    expect(formatCurrency(125000, 'USD')).toBe('$125,000');
  });

  it('formats using the en-IN locale digit grouping when requested', () => {
    expect(formatCurrency(1250000, 'INR', 'en-IN')).toBe('₹12,50,000');
  });

  it('falls back to a plain "amount currency" string for an invalid currency code', () => {
    expect(formatCurrency(100, 'NOT_A_CURRENCY')).toBe('100 NOT_A_CURRENCY');
  });
});

describe('formatNumber', () => {
  it('formats a plain number with locale grouping', () => {
    expect(formatNumber(12345)).toBe('12,345');
  });
});

describe('formatDate', () => {
  it('formats a valid ISO date string as a short human-readable date', () => {
    expect(formatDate('2024-03-15')).toBe('Mar 15, 2024');
  });

  it('returns the original string unchanged when the date is invalid', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date');
  });
});

describe('parseIsoDateString', () => {
  it('parses a YYYY-MM-DD string into a Date at local midnight', () => {
    const date = parseIsoDateString('2024-03-15');
    expect(date).not.toBeNull();
    expect(date?.getFullYear()).toBe(2024);
    expect(date?.getMonth()).toBe(2);
    expect(date?.getDate()).toBe(15);
  });

  it('returns null for an empty string', () => {
    expect(parseIsoDateString('')).toBeNull();
  });

  it('returns null when a date component is missing or zero', () => {
    expect(parseIsoDateString('2024-00-15')).toBeNull();
  });
});

describe('toIsoDateString', () => {
  it('formats a Date back into YYYY-MM-DD', () => {
    expect(toIsoDateString(new Date(2024, 2, 5))).toBe('2024-03-05');
  });

  it('returns an empty string for a null date', () => {
    expect(toIsoDateString(null)).toBe('');
  });

  it('returns an empty string for an invalid Date', () => {
    expect(toIsoDateString(new Date('invalid'))).toBe('');
  });
});
