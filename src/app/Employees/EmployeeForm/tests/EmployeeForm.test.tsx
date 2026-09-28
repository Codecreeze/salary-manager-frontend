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
import EmployeeFormPage from '../index';

const API_BASE_URL = 'http://localhost:3000';
const theme = getTheme('light');

function renderAtRoute(path: string) {
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
            <MemoryRouter initialEntries={[path]}>
              <ErrorBoundary>
                <Routes>
                  <Route path="/employees/new" element={<EmployeeFormPage />} />
                  <Route path="/employees/:id/edit" element={<EmployeeFormPage />} />
                </Routes>
              </ErrorBoundary>
            </MemoryRouter>
          </SettingsProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>,
  );
}

describe('EmployeeFormPage', () => {
  it('renders in create mode with an "Add employee" heading and empty fields', () => {
    renderAtRoute('/employees/new');

    expect(screen.getByRole('heading', { name: 'Add employee' })).toBeInTheDocument();
    expect(screen.getByLabelText('First name')).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Create employee' })).toBeInTheDocument();
  });

  it('shows a loading state while fetching the existing employee in edit mode', () => {
    server.use(
      http.get(`${API_BASE_URL}/employees/emp-1`, async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        return HttpResponse.json(mockEmployee);
      }),
    );

    const { container } = renderAtRoute('/employees/emp-1/edit');

    expect(
      container.querySelectorAll('.MuiSkeleton-root, .MuiCircularProgress-root').length,
    ).toBeGreaterThan(0);
  });

  it('renders the employee name as the heading and pre-fills the form in edit mode', async () => {
    server.use(
      http.get(`${API_BASE_URL}/employees/emp-1`, () => HttpResponse.json(mockEmployee)),
      http.get(`${API_BASE_URL}/countries`, () =>
        HttpResponse.json([{ id: 'country-1', name: 'United States', code: 'US' }]),
      ),
    );

    renderAtRoute('/employees/emp-1/edit');

    expect(await screen.findByRole('heading', { name: 'Ada Lovelace' })).toBeInTheDocument();
    // Wait for the department/country lookups to resolve so the selects'
    // pre-filled values match a loaded option, instead of asserting mid-fetch.
    expect(await screen.findByText('Engineering')).toBeInTheDocument();
    expect(await screen.findByText('United States')).toBeInTheDocument();
    expect(screen.getByLabelText('First name')).toHaveValue('Ada');
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
  });

  it('throws (caught by ErrorBoundary) when the employee cannot be loaded in edit mode', async () => {
    const restoreConsoleError = suppressConsoleError();
    server.use(
      http.get(`${API_BASE_URL}/employees/missing`, () => new HttpResponse(null, { status: 404 })),
    );

    renderAtRoute('/employees/missing/edit');

    expect(await screen.findByText('Whoops! Something went wrong.')).toBeInTheDocument();
    restoreConsoleError();
  });
});
