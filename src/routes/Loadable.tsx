import { Suspense, type ElementType } from 'react';
import DashLoader from '@/components/DashLoader';

export const Loadable = (Component: ElementType) => (props: any) => (
  <Suspense fallback={<DashLoader />}>
    <Component {...props} />
  </Suspense>
);
