// Shared DTO / response types mirroring the backend contract (see docs/TRD.md).
// Single source of truth for API shapes consumed by RTK Query endpoints.

export type JobLevel = 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6';

export type EmploymentStatus = 'ACTIVE' | 'INACTIVE';

export type SalaryReason = 'HIRE' | 'PROMOTION' | 'MERIT' | 'MARKET_ADJUSTMENT' | 'CORRECTION';

export interface Department {
  id: string;
  name: string;
}

export interface Country {
  id: string;
  name: string;
  code: string;
}

export interface SalaryRecord {
  id: string;
  employeeId: string;
  amount: number;
  currency: string;
  effectiveDate: string;
  reason: SalaryReason;
  createdAt: string;
}

export interface EmployeeListItem {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  department: Department;
  country: Country;
  jobLevel: JobLevel;
  employmentStatus: EmploymentStatus;
  hireDate: string;
  currentSalary: {
    amount: number;
    currency: string;
  } | null;
}

export interface EmployeeDetail extends EmployeeListItem {
  managerId: string | null;
  manager: Pick<EmployeeListItem, 'id' | 'firstName' | 'lastName'> | null;
  createdAt: string;
  updatedAt: string;
  salaryHistory: SalaryRecord[];
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}

/** Raw shape returned by the backend's list endpoints (see TRD.md). */
export interface RawPaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
}

/** Fields the backend accepts for `GET /employees?sortBy=`. */
export type EmployeeSortField =
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'department'
  | 'country'
  | 'hireDate'
  | 'jobLevel'
  | 'employeeCode';

export type SortOrder = 'asc' | 'desc';

export interface EmployeeListQuery {
  search?: string;
  departmentId?: string;
  countryId?: string;
  jobLevel?: JobLevel;
  status?: EmploymentStatus;
  page?: number;
  pageSize?: number;
  sortBy?: EmployeeSortField;
  sortOrder?: SortOrder;
}

export interface CreateEmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  departmentId: string;
  countryId: string;
  jobLevel: JobLevel;
  employmentStatus: EmploymentStatus;
  managerId?: string | null;
  hireDate: string;
  salaryAmount: number;
  currency: string;
  salaryEffectiveDate?: string;
  salaryReason?: SalaryReason;
}

export type UpdateEmployeeRequest = Partial<
  Omit<CreateEmployeeRequest, 'salaryAmount' | 'currency' | 'salaryEffectiveDate' | 'salaryReason'>
>;

export interface AddSalaryRecordRequest {
  amount: number;
  currency: string;
  effectiveDate: string;
  reason: SalaryReason;
}

export interface AnalyticsSummary {
  headcount: number;
  payrollByCurrency: Array<{
    currency: string;
    total: number;
    average: number;
  }>;
}

/** Raw shape returned by GET /analytics/summary (see TRD.md). */
export interface RawAnalyticsSummary {
  headcount: number;
  payrollByCurrency: Array<{
    currency: string;
    headcount: number;
    totalPayroll: number;
    averagePayroll: number;
  }>;
}

export interface GroupedSalaryStat {
  key: string;
  label: string;
  headcount: number;
  averageSalary: number;
  medianSalary: number;
  currency: string;
}

/** Raw shape returned by GET /analytics/by-department|by-country|by-level. */
export interface RawGroupedSalaryStat {
  id: string;
  name: string;
  currency: string;
  headcount: number;
  averageSalary: number;
  medianSalary: number;
}

export interface SalaryDistributionBucket {
  currency: string;
  bucketStart: number;
  bucketEnd: number;
  count: number;
}

/** Raw shape returned by GET /analytics/distribution — segmented per
 * currency, since PRD explicitly rules out blending currencies. */
export interface RawCurrencyDistribution {
  currency: string;
  buckets: Array<{ rangeStart: number; rangeEnd: number; count: number }>;
}
