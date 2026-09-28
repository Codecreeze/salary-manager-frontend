import { baseApi } from './baseApi';
import type { Country, Department } from '../types/types';

export const lookupsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<Department[], void>({
      query: () => '/departments',
      providesTags: ['Department'],
    }),
    getCountries: builder.query<Country[], void>({
      query: () => '/countries',
      providesTags: ['Country'],
    }),
  }),
});

export const { useGetDepartmentsQuery, useGetCountriesQuery } = lookupsApi;
