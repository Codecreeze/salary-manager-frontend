import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { EmployeeSortField, EmploymentStatus, JobLevel } from '@/services';

// UI-only state: the in-flight filter/pagination selections for the employee
// list. This is NOT server data (that lives in RTK Query's cache) — it is
// just "what the user has currently selected in the filter bar."
export interface EmployeeFiltersState {
  search: string;
  departmentId: string | null;
  countryId: string | null;
  jobLevel: JobLevel | null;
  status: EmploymentStatus | null;
  page: number;
  pageSize: number;
  /** `null` = no explicit sort — the backend's own default (lastName asc) applies. */
  sortBy: EmployeeSortField | null;
  sortOrder: 'asc' | 'desc';
}

const initialState: EmployeeFiltersState = {
  search: '',
  departmentId: null,
  countryId: null,
  jobLevel: null,
  status: null,
  page: 1,
  pageSize: 25,
  sortBy: null,
  sortOrder: 'asc',
};

const employeeFiltersSlice = createSlice({
  name: 'employeeFilters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    },
    setDepartmentId(state, action: PayloadAction<string | null>) {
      state.departmentId = action.payload;
      state.page = 1;
    },
    setCountryId(state, action: PayloadAction<string | null>) {
      state.countryId = action.payload;
      state.page = 1;
    },
    setJobLevel(state, action: PayloadAction<JobLevel | null>) {
      state.jobLevel = action.payload;
      state.page = 1;
    },
    setStatus(state, action: PayloadAction<EmploymentStatus | null>) {
      state.status = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
      state.page = 1;
    },
    setSort(
      state,
      action: PayloadAction<{
        sortBy: EmployeeSortField | null;
        sortOrder: 'asc' | 'desc';
      }>,
    ) {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
      state.page = 1;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setSearch,
  setDepartmentId,
  setCountryId,
  setJobLevel,
  setStatus,
  setPage,
  setPageSize,
  setSort,
  resetFilters,
} = employeeFiltersSlice.actions;

export const employeeFiltersReducer = employeeFiltersSlice.reducer;
