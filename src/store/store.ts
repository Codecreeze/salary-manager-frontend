import { configureStore } from '@reduxjs/toolkit';
import { baseApi, employeeFiltersReducer, sidebarReducer } from '@/services';

// Redux holds only UI-only client state (filters in flight, dialog open,
// selected row). Server state (employees/analytics/lookups) lives solely in
// RTK Query's cache via `baseApi.reducer` — no duplication (see RULES.md).
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    employeeFilters: employeeFiltersReducer,
    sidebar: sidebarReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
