import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { employeeNameCellSx, employeeNameCellUnderlineStyle } from './employeeNameCell.style';

export interface EmployeeNameCellProps {
  employeeId: string;
  name: string;
}

/**
 * Name cell for the employee directory grid: the ONLY clickable/hoverable
 * surface in a row (see SalaryTable — `onRowClick` was removed from the
 * grid itself so the rest of the row stays inert). Shows an animated
 * left-to-right underline draw on hover and navigates to the employee's
 * full detail page on click.
 */
export function EmployeeNameCell({ employeeId, name }: EmployeeNameCellProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      onClick={() => navigate(`/employees/${employeeId}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={employeeNameCellSx.container}
    >
      <Typography variant="body2" component="span">
        {name}
      </Typography>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={employeeNameCellUnderlineStyle}
      />
    </Box>
  );
}
