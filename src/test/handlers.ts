import { http, HttpResponse } from 'msw';
import type { Department, EmployeeListItem, RawPaginatedResponse } from '@/services';

const API_BASE_URL = 'http://localhost:3000';

export const mockDepartments: Department[] = [
  { id: 'dept-1', name: 'Engineering' },
  { id: 'dept-2', name: 'Sales' },
];

export const mockEmployee: EmployeeListItem = {
  id: 'emp-1',
  employeeCode: 'EMP-00001',
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@acme.com',
  department: mockDepartments[0],
  country: { id: 'country-1', name: 'United States', code: 'US' },
  jobLevel: 'L4',
  employmentStatus: 'ACTIVE',
  hireDate: '2020-01-15',
  currentSalary: { amount: 120000, currency: 'USD' },
};

// Mirrors the backend's raw response shape ({ data, meta }) — RTK Query's
// transformResponse maps this to the frontend's PaginatedResponse.
const mockEmployeeListResponse: RawPaginatedResponse<EmployeeListItem> = {
  data: [mockEmployee],
  meta: { total: 1, page: 1, pageSize: 25, pageCount: 1 },
};

export const handlers = [
  http.get(`${API_BASE_URL}/employees`, () => HttpResponse.json(mockEmployeeListResponse)),
  http.get(`${API_BASE_URL}/departments`, () => HttpResponse.json(mockDepartments)),
  http.get(`${API_BASE_URL}/countries`, () => HttpResponse.json([])),
];
