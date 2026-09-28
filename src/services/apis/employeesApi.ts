import { baseApi } from './baseApi';
import type {
  AddSalaryRecordRequest,
  CreateEmployeeRequest,
  EmployeeDetail,
  EmployeeListItem,
  EmployeeListQuery,
  PaginatedResponse,
  RawPaginatedResponse,
  UpdateEmployeeRequest,
} from '../types/types';

function buildEmployeeListParams(query: EmployeeListQuery) {
  const params: Record<string, string> = {};
  if (query.search) params.search = query.search;
  if (query.departmentId) params.departmentId = query.departmentId;
  if (query.countryId) params.countryId = query.countryId;
  if (query.jobLevel) params.jobLevel = query.jobLevel;
  if (query.status) params.status = query.status;
  params.page = String(query.page ?? 1);
  params.pageSize = String(query.pageSize ?? 25);
  if (query.sortBy) {
    params.sortBy = query.sortBy;
    if (query.sortOrder) params.sortOrder = query.sortOrder;
  }
  return params;
}

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<PaginatedResponse<EmployeeListItem>, EmployeeListQuery>({
      query: (params) => ({
        url: '/employees',
        params: buildEmployeeListParams(params),
      }),
      transformResponse: (response: RawPaginatedResponse<EmployeeListItem>) => ({
        items: response.data,
        total: response.meta.total,
        page: response.meta.page,
        pageSize: response.meta.pageSize,
        pageCount: response.meta.pageCount,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map((e) => ({
                type: 'Employee' as const,
                id: e.id,
              })),
              { type: 'EmployeeList' as const, id: 'LIST' },
            ]
          : [{ type: 'EmployeeList' as const, id: 'LIST' }],
    }),
    getEmployeeById: builder.query<EmployeeDetail, string>({
      query: (id) => `/employees/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Employee', id }],
    }),
    createEmployee: builder.mutation<EmployeeDetail, CreateEmployeeRequest>({
      query: (body) => ({ url: '/employees', method: 'POST', body }),
      invalidatesTags: [{ type: 'EmployeeList', id: 'LIST' }, 'Analytics'],
    }),
    updateEmployee: builder.mutation<EmployeeDetail, { id: string; body: UpdateEmployeeRequest }>({
      query: ({ id, body }) => ({
        url: `/employees/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Employee', id },
        { type: 'EmployeeList', id: 'LIST' },
      ],
    }),
    addSalaryRecord: builder.mutation<
      EmployeeDetail,
      { employeeId: string; body: AddSalaryRecordRequest }
    >({
      query: ({ employeeId, body }) => ({
        url: `/employees/${employeeId}/salary`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, { employeeId }) => [
        { type: 'Employee', id: employeeId },
        { type: 'EmployeeList', id: 'LIST' },
        'Analytics',
      ],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useAddSalaryRecordMutation,
} = employeesApi;
