import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import {
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { NavLink, useLocation } from 'react-router';
import logo from '@/assets/images/logo.svg';
import { dashDrawerSx } from './dashDrawer.style';

export const DASH_DRAWER_WIDTH = 260;
export const DASH_DRAWER_COLLAPSED_WIDTH = 72;

const NAV_ITEMS = [
  { label: 'Employees', to: '/employees', icon: <PeopleAltOutlinedIcon /> },
  { label: 'Analytics', to: '/analytics', icon: <InsightsOutlinedIcon /> },
];

export interface DashDrawerProps {
  onNavigate?: () => void;
  /** Icon-only rail mode (desktop collapsed state). Mobile drawer never collapses. */
  collapsed?: boolean;
}

/**
 * Sidebar navigation content: brand header and nav items with active-route
 * highlighting. Rendered inside either a permanent or a temporary Drawer by
 * DashboardLayout. The user/account entry point lives in DashHeader's avatar
 * menu, not here.
 */
export function DashDrawer({ onNavigate, collapsed = false }: DashDrawerProps) {
  const location = useLocation();
  const theme = useTheme();

  return (
    <Stack sx={dashDrawerSx.root}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.5}
        sx={dashDrawerSx.brandBar(theme, collapsed)}
      >
        <Avatar src={logo} alt="Salary Manager logo" sx={dashDrawerSx.logo} />
        {collapsed ? null : (
          <Typography variant="h6" component="span" sx={dashDrawerSx.brandTitle}>
            Salary Manager
          </Typography>
        )}
      </Stack>
      <List sx={dashDrawerSx.navList}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.to);
          const button = (
            <ListItemButton
              key={item.to}
              component={NavLink}
              to={item.to}
              onClick={onNavigate}
              selected={isActive}
              sx={dashDrawerSx.navItem(collapsed)}
            >
              <ListItemIcon sx={dashDrawerSx.navItemIcon(collapsed, isActive)}>
                {item.icon}
              </ListItemIcon>
              {collapsed ? null : (
                <ListItemText
                  primary={item.label}
                  slotProps={{ primary: { fontWeight: isActive ? 700 : 500 } }}
                />
              )}
            </ListItemButton>
          );

          return collapsed ? (
            <Tooltip key={item.to} title={item.label} placement="right">
              {button}
            </Tooltip>
          ) : (
            button
          );
        })}
      </List>
    </Stack>
  );
}
