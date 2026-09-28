import { lazy } from 'react';
import { Loadable } from './Loadable';

export const Employees = Loadable(lazy(() => import('@/app/Employees')));
export const EmployeeDetail = Loadable(lazy(() => import('@/app/Employees/EmployeeDetail')));
export const EmployeeForm = Loadable(lazy(() => import('@/app/Employees/EmployeeForm')));
export const Analytics = Loadable(lazy(() => import('@/app/Analytics')));
