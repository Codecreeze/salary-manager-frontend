/** Central route path constants — the single source of truth for every route string in the app. */
export const paths = {
  root: '/',
  employees: {
    root: '/employees',
    new: '/employees/new',
    detail: (id: string) => `/employees/${id}`,
    edit: (id: string) => `/employees/${id}/edit`,
  },
  analytics: '/analytics',
};
