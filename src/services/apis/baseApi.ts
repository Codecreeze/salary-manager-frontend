import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';

// Single RTK Query root API instance; feature API slices inject endpoints
// into this instance instead of creating separate `createApi` roots, so all
// server state shares one cache/tag namespace (DRY, per ARCHITECTURE.md).
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Employee', 'EmployeeList', 'Department', 'Country', 'Analytics'],
  endpoints: () => ({}),
});
