import { useEffect, useState } from 'react';
import { Box, Grid, MenuItem, TextField } from '@mui/material';
import {
  useGetCountriesQuery,
  useGetDepartmentsQuery,
  setCountryId,
  setDepartmentId,
  setJobLevel,
  setSearch,
  setStatus,
} from '@/services';
import { useDispatch, useSelector } from '@/store/hooks';
import { useDebounce } from '@/hooks/useDebounce';
import { MENU_PROPS } from '@/themes/menuProps';
import type { EmploymentStatus, JobLevel } from '@/services';
import { EMPLOYMENT_STATUSES, JOB_LEVELS } from '@/utils/constants';
import { employeeFiltersSx } from './employeeFilters.style';

const ALL_VALUE = '__all__';
const SEARCH_DEBOUNCE_MS = 400;

/** Search + filter bar for the employee list. Reads/writes UI-only filter state. */
export function EmployeeFilters() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.employeeFilters);
  const { data: departments = [] } = useGetDepartmentsQuery();
  const { data: countries = [] } = useGetCountriesQuery();

  // Typed characters update this immediately so the field stays responsive;
  // only the debounced value is dispatched, so the employee list doesn't
  // refetch on every keystroke.
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      dispatch(setSearch(debouncedSearch));
    }
    // Only react to the debounced value changing — including `filters.search`
    // here would re-fire this effect on every dispatch it causes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, dispatch]);

  return (
    <Box sx={employeeFiltersSx.root}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            fullWidth
            size="small"
            label="Search"
            placeholder="Name, email, employee ID"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            inputProps={{ 'aria-label': 'Search employees' }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Department"
            slotProps={{ select: { MenuProps: MENU_PROPS } }}
            value={filters.departmentId ?? ALL_VALUE}
            onChange={(e) =>
              dispatch(setDepartmentId(e.target.value === ALL_VALUE ? null : e.target.value))
            }
          >
            <MenuItem value={ALL_VALUE}>All departments</MenuItem>
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.id}>
                {dept.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Country"
            slotProps={{ select: { MenuProps: MENU_PROPS } }}
            value={filters.countryId ?? ALL_VALUE}
            onChange={(e) =>
              dispatch(setCountryId(e.target.value === ALL_VALUE ? null : e.target.value))
            }
          >
            <MenuItem value={ALL_VALUE}>All countries</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Job level"
            slotProps={{ select: { MenuProps: MENU_PROPS } }}
            value={filters.jobLevel ?? ALL_VALUE}
            onChange={(e) =>
              dispatch(
                setJobLevel(e.target.value === ALL_VALUE ? null : (e.target.value as JobLevel)),
              )
            }
          >
            <MenuItem value={ALL_VALUE}>All levels</MenuItem>
            {JOB_LEVELS.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Status"
            slotProps={{ select: { MenuProps: MENU_PROPS } }}
            value={filters.status ?? ALL_VALUE}
            onChange={(e) =>
              dispatch(
                setStatus(
                  e.target.value === ALL_VALUE ? null : (e.target.value as EmploymentStatus),
                ),
              )
            }
          >
            <MenuItem value={ALL_VALUE}>All statuses</MenuItem>
            {EMPLOYMENT_STATUSES.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
}
