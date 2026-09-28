import { describe, expect, it } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { HttpResponse, http } from 'msw';
import { baseApi, employeeFiltersReducer, sidebarReducer } from '@/services';
import { SettingsProvider } from '@/hooks/SettingsContext';
import { getTheme } from '@/themes/theme';
import { server } from '@/test/server';
import { mockEmployee } from '@/test/handlers';
import { suppressConsoleError } from '@/test/suppressConsoleError';
import ErrorBoundary from '@/hoc/ErrorBoundary';
import EmployeeDetailPage from '../index';

const API_BASE_URL = 'http://localhost:3000';
const theme = getTheme('light');

function renderAtEmployeeRoute(employeeId: string) {
  const store = configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      employeeFilters: employeeFiltersReducer,
      sidebar: sidebarReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  });

  return render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SettingsProvider>
            <MemoryRouter initialEntries={[`/employees/${employeeId}`]}>
              <ErrorBoundary>
                <Routes>
                  <Route path="/employees/:id" element={<EmployeeDetailPage />} />
                </Routes>
              </ErrorBoundary>
            </MemoryRouter>
          </SettingsProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>,
  );
}

describe('EmployeeDetailPage', () => {
  it('renders the employee profile and salary history once loaded', async () => {
    server.use(
      http.get(`${API_BASE_URL}/employees/emp-1`, () =>
        HttpResponse.json({
          ...mockEmployee,
          managerId: null,
          manager: null,
          createdAt: '2020-01-15T00:00:00.000Z',
          updatedAt: '2020-01-15T00:00:00.000Z',
          salaryHistory: [
            {
              id: 'sal-1',
              employeeId: 'emp-1',
              amount: 120000,
              currency: 'USD',
              effectiveDate: '2020-01-15',
              reason: 'HIRE',
              createdAt: '2020-01-15T00:00:00.000Z',
            },
          ],
        }),
      ),
    );

    renderAtEmployeeRoute('emp-1');

    expect((await screen.findAllByText('EMP-00001')).length).toBeGreaterThan(0);
    expect(screen.getByText('Salary history')).toBeInTheDocument();
    expect(screen.getAllByText('$120,000').length).toBeGreaterThan(0);
  });

  it('throws (caught by ErrorBoundary) when the employee cannot be loaded', async () => {
    const restoreConsoleError = suppressConsoleError();
    server.use(
      http.get(`${API_BASE_URL}/employees/missing`, () => new HttpResponse(null, { status: 404 })),
    );

    renderAtEmployeeRoute('missing');

    expect(await screen.findByText('Whoops! Something went wrong.')).toBeInTheDocument();
    restoreConsoleError();
  });
});
