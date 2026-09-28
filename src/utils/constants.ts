/** Shared, non-component-specific magic numbers/constants used across the UI layer. */

import type { EmploymentStatus, JobLevel, SalaryReason } from '@/services';

/** Alpha opacity applied over `theme.palette.text.primary` for subtle, mode-agnostic borders. */
export const SUBTLE_BORDER_ALPHA = 0.08;

/**
 * Theme-toggle icon colors — intentionally fixed (not palette-derived): the
 * moon (switch-to-dark) icon is always black, the sun (switch-to-light) icon
 * is always amber, regardless of which mode is currently active, so each
 * icon reads as its own affordance rather than blending into the header.
 */
export const THEME_TOGGLE_MOON_COLOR = '#000000';
export const THEME_TOGGLE_SUN_COLOR = '#f59e0b';

export const JOB_LEVELS: JobLevel[] = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'];

export const EMPLOYMENT_STATUSES: EmploymentStatus[] = ['ACTIVE', 'INACTIVE'];

export const SALARY_REASONS: SalaryReason[] = [
  'HIRE',
  'PROMOTION',
  'MERIT',
  'MARKET_ADJUSTMENT',
  'CORRECTION',
];

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD'];
