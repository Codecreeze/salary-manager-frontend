import { baseApi } from './baseApi';
import type {
  AnalyticsSummary,
  GroupedSalaryStat,
  RawAnalyticsSummary,
  RawCurrencyDistribution,
  RawGroupedSalaryStat,
  SalaryDistributionBucket,
} from '../types/types';

function toGroupedSalaryStat(raw: RawGroupedSalaryStat): GroupedSalaryStat {
  return {
    key: raw.id,
    label: raw.name,
    currency: raw.currency,
    headcount: raw.headcount,
    averageSalary: raw.averageSalary,
    medianSalary: raw.medianSalary,
  };
}

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalyticsSummary: builder.query<AnalyticsSummary, void>({
      query: () => '/analytics/summary',
      transformResponse: (response: RawAnalyticsSummary): AnalyticsSummary => ({
        headcount: response.headcount,
        payrollByCurrency: response.payrollByCurrency.map((entry) => ({
          currency: entry.currency,
          total: entry.totalPayroll,
          average: entry.averagePayroll,
        })),
      }),
      providesTags: ['Analytics'],
    }),
    getAnalyticsByDepartment: builder.query<GroupedSalaryStat[], void>({
      query: () => '/analytics/by-department',
      transformResponse: (response: RawGroupedSalaryStat[]) => response.map(toGroupedSalaryStat),
      providesTags: ['Analytics'],
    }),
    getAnalyticsByCountry: builder.query<GroupedSalaryStat[], void>({
      query: () => '/analytics/by-country',
      transformResponse: (response: RawGroupedSalaryStat[]) => response.map(toGroupedSalaryStat),
      providesTags: ['Analytics'],
    }),
    getAnalyticsByLevel: builder.query<GroupedSalaryStat[], void>({
      query: () => '/analytics/by-level',
      transformResponse: (response: RawGroupedSalaryStat[]) => response.map(toGroupedSalaryStat),
      providesTags: ['Analytics'],
    }),
    getAnalyticsDistribution: builder.query<SalaryDistributionBucket[], void>({
      query: () => '/analytics/distribution',
      // Backend segments buckets per currency (never blends them, per PRD);
      // flatten to one array here, tagged with currency, so the UI can filter.
      transformResponse: (response: RawCurrencyDistribution[]): SalaryDistributionBucket[] =>
        response.flatMap((group) =>
          group.buckets.map((bucket) => ({
            currency: group.currency,
            bucketStart: bucket.rangeStart,
            bucketEnd: bucket.rangeEnd,
            count: bucket.count,
          })),
        ),
      providesTags: ['Analytics'],
    }),
  }),
});

export const {
  useGetAnalyticsSummaryQuery,
  useGetAnalyticsByDepartmentQuery,
  useGetAnalyticsByCountryQuery,
  useGetAnalyticsByLevelQuery,
  useGetAnalyticsDistributionQuery,
} = analyticsApi;
