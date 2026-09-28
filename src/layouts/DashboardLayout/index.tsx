import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Container, Drawer, IconButton, Tooltip } from '@mui/material';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from '@/store/hooks';
import { toggleCollapsed as toggleSidebarCollapsed } from '@/services';
import { DashDrawer, DASH_DRAWER_COLLAPSED_WIDTH, DASH_DRAWER_WIDTH } from '../DashDrawer';
import { DashHeader } from '../DashHeader';
import { DashFooter } from '../DashFooter';
import { dashboardLayoutSx } from './dashboardLayout.style';

/**
 * Root layout: permanent sidebar on desktop (`md+`, collapsible to an
 * icon-only rail), temporary overlay drawer on mobile toggled from the
 * DashHeader's hamburger icon, top app bar, and a centered, responsive
 * content container.
 */
export function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.sidebar.collapsed);
  const desktopWidth = collapsed ? DASH_DRAWER_COLLAPSED_WIDTH : DASH_DRAWER_WIDTH;

  return (
    <Box sx={dashboardLayoutSx.root}>
      <Box component="nav" sx={dashboardLayoutSx.nav(desktopWidth)} aria-label="Main navigation">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={dashboardLayoutSx.mobileDrawer(DASH_DRAWER_WIDTH)}
        >
          <DashDrawer onNavigate={() => setMobileOpen(false)} />
        </Drawer>
        <Drawer variant="permanent" sx={dashboardLayoutSx.desktopDrawer(desktopWidth)} open>
          <DashDrawer collapsed={collapsed} />
          <Tooltip title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} placement="right">
            <IconButton
              size="small"
              onClick={() => dispatch(toggleSidebarCollapsed())}
              aria-label="Toggle sidebar width"
              sx={dashboardLayoutSx.collapseButton}
            >
              {collapsed ? (
                <ChevronRightIcon fontSize="small" />
              ) : (
                <ChevronLeftIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Drawer>
      </Box>
      <Box sx={dashboardLayoutSx.content}>
        <DashHeader onMenuClick={() => setMobileOpen(true)} />
        <Container maxWidth="xl" sx={dashboardLayoutSx.container}>
          <Outlet />
        </Container>
        <DashFooter />
      </Box>
    </Box>
  );
}
