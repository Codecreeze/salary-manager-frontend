import { Suspense, type ElementType } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export const AppLoader = (Component: ElementType) => (props: any) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);
