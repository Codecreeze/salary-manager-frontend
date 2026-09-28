/** General-purpose utility functions with no component-specific (JSX/hooks) concerns. */

import { toast } from 'react-toastify';
import type { EmploymentStatus } from '@/services';

/** Locale used purely for number grouping (International vs Indian digit grouping). */
export type NumberFormatLocale = 'en-US' | 'en-IN';

export function formatCurrency(
  amount: number,
  currency: string,
  locale: NumberFormatLocale = 'en-US',
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}

/** Plain (non-currency) number formatting, e.g. headcounts. */
export function formatNumber(value: number, locale: NumberFormatLocale = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Parses a stored `YYYY-MM-DD` date string into a `Date` for MUI X
 * `DatePicker`'s `value` prop. Returns `null` for empty/invalid input so the
 * picker renders as cleared rather than an "Invalid Date".
 */
export function parseIsoDateString(isoDate: string): Date | null {
  if (!isoDate) return null;
  const [year, month, day] = isoDate.split('-').map(Number);
  if (!year || !month || !day) return null;
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Formats a `Date` from MUI X `DatePicker`'s `onChange` back into the
 * `YYYY-MM-DD` string the form schema/API contract expects.
 */
export function toIsoDateString(date: Date | null): string {
  if (!date || Number.isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export interface StatusToggleConfig {
  /** The employmentStatus the entity will move to if this action is taken. */
  nextStatus: EmploymentStatus;
  /** User-facing label for the destination state this action would move the entity to. */
  actionLabel: 'Active' | 'Inactive';
  color: 'success' | 'error';
}

/** Maps an employee's current status to the toggle action that should be offered next. */
export function getStatusToggleConfig(status: EmploymentStatus): StatusToggleConfig {
  return status === 'ACTIVE'
    ? { nextStatus: 'INACTIVE', actionLabel: 'Inactive', color: 'error' }
    : { nextStatus: 'ACTIVE', actionLabel: 'Active', color: 'success' };
}

/**
 * Thin wrappers around react-toastify so every mutation surfaces feedback
 * with the same copy/behavior conventions instead of each caller reaching
 * into the library directly.
 */
export function notifySuccess(message: string): void {
  toast.success(message);
}

export function notifyError(message: string): void {
  toast.error(message);
}
