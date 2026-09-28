import { Box, Breadcrumbs, Link as MuiLink, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router';
import { breadCrumbsSx } from './breadCrumbs.style';

export interface BreadCrumbsItem {
  label: string;
  to?: string;
}

export interface BreadCrumbsProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  /** Optional breadcrumb trail rendered above the title. Last entry is the current page (plain text). */
  breadcrumbs?: BreadCrumbsItem[];
}

/** Shared page title bar (with optional breadcrumb trail) reused across every feature page. */
export function BreadCrumbs({ title, subtitle, actions, breadcrumbs }: BreadCrumbsProps) {
  return (
    <Stack sx={breadCrumbsSx.root} spacing={breadcrumbs?.length ? 1 : 0}>
      {breadcrumbs?.length ? (
        <Breadcrumbs aria-label="breadcrumb" separator={<Box sx={breadCrumbsSx.separatorDot} />}>
          {breadcrumbs.map((crumb) =>
            crumb.to ? (
              <MuiLink
                key={crumb.label}
                component={RouterLink}
                to={crumb.to}
                underline="hover"
                color="text.secondary"
                variant="body2"
              >
                {crumb.label}
              </MuiLink>
            ) : (
              <Typography key={crumb.label} variant="body2" color="text.primary">
                {crumb.label}
              </Typography>
            ),
          )}
        </Breadcrumbs>
      ) : null}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
      >
        <Box>
          <Typography variant="h5" component="h1">
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="body2" color="text.secondary" sx={breadCrumbsSx.subtitle}>
              {subtitle}
            </Typography>
          ) : null}
        </Box>
        {actions ? <Box>{actions}</Box> : null}
      </Stack>
    </Stack>
  );
}
