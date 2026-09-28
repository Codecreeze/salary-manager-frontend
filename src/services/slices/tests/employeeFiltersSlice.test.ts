import { describe, expect, it } from 'vitest';
import {
  employeeFiltersReducer,
  resetFilters,
  setCountryId,
  setDepartmentId,
  setJobLevel,
  setPage,
  setPageSize,
  setSearch,
  setSort,
  setStatus,
  type EmployeeFiltersState,
} from '../employeeFiltersSlice';

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

const pagedState: EmployeeFiltersState = { ...initialState, page: 3 };

describe('employeeFiltersSlice', () => {
  it('setSearch updates search and resets page to 1', () => {
    const state = employeeFiltersReducer(pagedState, setSearch('Ada'));
    expect(state.search).toBe('Ada');
    expect(state.page).toBe(1);
  });

  it('setDepartmentId updates departmentId and resets page to 1', () => {
    const state = employeeFiltersReducer(pagedState, setDepartmentId('dept-1'));
    expect(state.departmentId).toBe('dept-1');
    expect(state.page).toBe(1);
  });

  it('setCountryId updates countryId and resets page to 1', () => {
    const state = employeeFiltersReducer(pagedState, setCountryId('country-1'));
    expect(state.countryId).toBe('country-1');
    expect(state.page).toBe(1);
  });

  it('setJobLevel updates jobLevel and resets page to 1', () => {
    const state = employeeFiltersReducer(pagedState, setJobLevel('L3'));
    expect(state.jobLevel).toBe('L3');
    expect(state.page).toBe(1);
  });

  it('setStatus updates status and resets page to 1', () => {
    const state = employeeFiltersReducer(pagedState, setStatus('ACTIVE'));
    expect(state.status).toBe('ACTIVE');
    expect(state.page).toBe(1);
  });

  it('setPage updates page without resetting it', () => {
    const state = employeeFiltersReducer(initialState, setPage(5));
    expect(state.page).toBe(5);
  });

  it('setPageSize updates pageSize and resets page to 1', () => {
    const state = employeeFiltersReducer(pagedState, setPageSize(50));
    expect(state.pageSize).toBe(50);
    expect(state.page).toBe(1);
  });

  it('setSort updates sortBy/sortOrder and resets page to 1', () => {
    const state = employeeFiltersReducer(
      pagedState,
      setSort({ sortBy: 'lastName', sortOrder: 'desc' }),
    );
    expect(state.sortBy).toBe('lastName');
    expect(state.sortOrder).toBe('desc');
    expect(state.page).toBe(1);
  });

  it('resetFilters restores the initial state', () => {
    const dirtyState: EmployeeFiltersState = {
      search: 'Ada',
      departmentId: 'dept-1',
      countryId: 'country-1',
      jobLevel: 'L3',
      status: 'ACTIVE',
      page: 7,
      pageSize: 50,
      sortBy: 'lastName',
      sortOrder: 'desc',
    };
    const state = employeeFiltersReducer(dirtyState, resetFilters());
    expect(state).toEqual(initialState);
  });
});
