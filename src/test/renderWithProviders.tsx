import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { baseApi, employeeFiltersReducer, sidebarReducer } from '@/services';
import { SettingsProvider } from '@/hooks/SettingsContext';
import { getTheme } from '@/themes/theme';

const theme = getTheme('light');

/**
 * Shared test-rendering helper: wraps a component with a fresh Redux store
 * (real RTK Query reducer, so cache/loading/error states behave for real)
 * plus router and theme providers, matching the app's real provider tree.
 */
export function renderWithProviders(ui: ReactElement) {
  const store = configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      employeeFilters: employeeFiltersReducer,
      sidebar: sidebarReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SettingsProvider>
              <MemoryRouter>{ui}</MemoryRouter>
            </SettingsProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>,
    ),
  };
}
