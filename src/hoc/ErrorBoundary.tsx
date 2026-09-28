import { Component, Fragment, type ErrorInfo, type ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { errorBoundarySx } from './errorBoundary.style';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Simple class-component error boundary. Nest as many instances as needed —
 * wrapping a route's layout AND each page/section within it means one
 * section crashing doesn't take the rest of the tree down with it.
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // Error captured by boundary
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Fragment>
          <Box sx={errorBoundarySx.container}>
            <Typography variant="subtitle1" sx={errorBoundarySx.message}>
              Whoops! Something went wrong.
            </Typography>
          </Box>
        </Fragment>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
