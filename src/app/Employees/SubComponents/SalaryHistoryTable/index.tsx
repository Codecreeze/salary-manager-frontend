import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSettings } from '@/hooks/useSettings';
import type { SalaryRecord } from '@/services';
import { EmptyState } from '@/components/EmptyState';
import { formatCurrency, formatDate } from '@/utils/utilityFunctions';

export interface SalaryHistoryTableProps {
  records: SalaryRecord[];
}

/** Read-only audit trail of salary changes for one employee, newest first. */
export function SalaryHistoryTable({ records }: SalaryHistoryTableProps) {
  const { numberFormatLocale } = useSettings();

  if (records.length === 0) {
    return <EmptyState />;
  }

  const sorted = [...records].sort(
    (a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime(),
  );

  return (
    <TableContainer>
      <Table size="small" aria-label="Salary history">
        <TableHead>
          <TableRow>
            <TableCell>Effective date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Recorded</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{formatDate(record.effectiveDate)}</TableCell>
              <TableCell>
                {formatCurrency(record.amount, record.currency, numberFormatLocale)}
              </TableCell>
              <TableCell>{record.reason}</TableCell>
              <TableCell>{formatDate(record.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
