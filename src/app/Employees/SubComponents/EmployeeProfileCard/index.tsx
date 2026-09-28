import type { ReactNode } from 'react';
import { Box, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material';
import { MuiButton as Button } from '@/components/MUI/MuiButton';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router';
import { useSettings } from '@/hooks/useSettings';
import type { EmployeeDetail } from '@/services';
import { MuiDetailList as DetailList } from '@/components/MUI/MuiDetailList';
import { formatCurrency, formatDate } from '@/utils/utilityFunctions';
import { employeeProfileCardSx } from './employeeProfileCard.style';

export interface EmployeeProfileCardProps {
  employee: EmployeeDetail;
  /** 'card' (default) for the full-page detail view; 'plain' to render without a Card wrapper, e.g. inside a Drawer. */
  variant?: 'card' | 'plain';
  /**
   * Whether to render the inline "Edit" button in the name row. Defaults to
   * true — independent of `variant`, since a `plain`-rendered usage (e.g. the
   * full detail page's single-card layout) still needs its own edit
   * affordance. Set to `false` when the caller already offers editing
   * elsewhere (e.g. `DetailDrawer`'s own header edit icon).
   */
  showEditButton?: boolean;
}

/** Read-only summary of an employee's core record and current compensation. */
export function EmployeeProfileCard({
  employee,
  variant = 'card',
  showEditButton = true,
}: EmployeeProfileCardProps) {
  const navigate = useNavigate();
  const { numberFormatLocale } = useSettings();

  const nameRow = (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      sx={employeeProfileCardSx.nameRow}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Typography variant="h6">
          {employee.firstName} {employee.lastName}
        </Typography>
        <Chip
          size="small"
          label={employee.employmentStatus}
          color={employee.employmentStatus === 'ACTIVE' ? 'success' : 'default'}
          variant="outlined"
        />
      </Stack>
      {showEditButton ? (
        <Button
          variant="outlined"
          startIcon={<EditOutlinedIcon />}
          onClick={() => navigate(`/employees/${employee.id}/edit`)}
        >
          Edit
        </Button>
      ) : null}
    </Stack>
  );

  const detailItems = [
    { label: 'Employee ID', value: employee.employeeCode },
    { label: 'Email', value: employee.email },
    { label: 'Department', value: employee.department.name },
    { label: 'Country', value: employee.country.name },
    { label: 'Job level', value: employee.jobLevel },
    {
      label: 'Manager',
      value: employee.manager ? `${employee.manager.firstName} ${employee.manager.lastName}` : '—',
    },
    { label: 'Hire date', value: formatDate(employee.hireDate) },
    {
      label: 'Current salary',
      value: employee.currentSalary
        ? formatCurrency(
            employee.currentSalary.amount,
            employee.currentSalary.currency,
            numberFormatLocale,
          )
        : '—',
    },
  ];

  if (variant === 'plain') {
    return (
      <Box sx={employeeProfileCardSx.plainRoot}>
        {nameRow}
        <DetailList items={detailItems} />
      </Box>
    );
  }

  return (
    <Card sx={employeeProfileCardSx.card}>
      <CardContent>
        {nameRow}
        <Grid container spacing={2}>
          {detailItems.map((item) => (
            <Field key={item.label} label={item.label} value={item.value} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <Typography variant="caption" color="text.secondary" component="div">
        {label}
      </Typography>
      <Typography variant="body2" sx={employeeProfileCardSx.fieldValue}>
        {value}
      </Typography>
    </Grid>
  );
}
