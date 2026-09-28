import { Navigate, useRoutes } from 'react-router';
import { DashboardLayout } from '@/layouts';
import { paths } from '@/routes/paths';
import { Analytics, EmployeeDetail, EmployeeForm, Employees } from '@/routes/elements';

/** Central route table for the application. */
export default function Router() {
  return useRoutes([
    {
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Navigate to={paths.employees.root} replace />,
        },
        { path: 'employees', element: <Employees /> },
        { path: 'employees/new', element: <EmployeeForm /> },
        { path: 'employees/:id', element: <EmployeeDetail /> },
        { path: 'employees/:id/edit', element: <EmployeeForm /> },
        { path: 'analytics', element: <Analytics /> },
        { path: '*', element: <Navigate to={paths.employees.root} replace /> },
      ],
    },
  ]);
}

export { Router as AppRouter };
