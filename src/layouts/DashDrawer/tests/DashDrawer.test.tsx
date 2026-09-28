import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { getTheme } from '@/themes/theme';
import { DashDrawer } from '../index';

const theme = getTheme('light');

function renderDrawer(props: Parameters<typeof DashDrawer>[0] = {}, initialPath = '/employees') {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[initialPath]}>
        <DashDrawer {...props} />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe('DashDrawer', () => {
  it('renders each nav item', () => {
    renderDrawer();

    expect(screen.getByRole('link', { name: /employees/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /analytics/i })).toBeInTheDocument();
  });

  it('marks the nav item matching the current route as active', () => {
    renderDrawer({}, '/analytics');

    expect(screen.getByRole('link', { name: /analytics/i })).toHaveClass('Mui-selected');
    expect(screen.getByRole('link', { name: /employees/i })).not.toHaveClass('Mui-selected');
  });

  it('renders the brand name in expanded mode', () => {
    renderDrawer({ collapsed: false });
    expect(screen.getByText('Salary Manager')).toBeInTheDocument();
  });

  it('hides the brand name and item text in collapsed mode', () => {
    renderDrawer({ collapsed: true });
    expect(screen.queryByText('Salary Manager')).not.toBeInTheDocument();
    expect(screen.queryByText('Employees')).not.toBeInTheDocument();
  });
});
