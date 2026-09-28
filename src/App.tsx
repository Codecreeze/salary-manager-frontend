import { lazy } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { store } from '@/store/store';
import { SettingsProvider } from '@/hooks/SettingsContext';
import ThemeProvider from '@/themes/ThemeProvider';
import { SnackbarStyles } from '@/components/Snackbar';
import ErrorBoundary from '@/hoc/ErrorBoundary';
import { AppLoader } from './utils/AppLoader';

const AppRouter = AppLoader(lazy(() => import('@/routes/AppRouter')));

export default function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SettingsProvider>
          <ThemeProvider>
            <SnackbarStyles />
            <ErrorBoundary>
              <BrowserRouter>
                <AppRouter />
              </BrowserRouter>
            </ErrorBoundary>
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </Provider>
  );
}
