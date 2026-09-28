import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import { MENU_PROPS } from '@/themes/menuProps';
import { currencySelectSx } from './currencySelect.style';

export interface CurrencySelectProps {
  currencies: string[];
  value: string;
  onChange: (currency: string) => void;
}

/**
 * Salary figures are never blended across currencies (see PRD "scope out" —
 * no FX conversion), so every per-group chart is filtered to one currency
 * at a time, picked here.
 */
export function CurrencySelect({ currencies, value, onChange }: CurrencySelectProps) {
  const handleChange = (event: SelectChangeEvent) => onChange(event.target.value);

  return (
    <FormControl size="small" sx={currencySelectSx.formControl}>
      <InputLabel id="currency-select-label">Currency</InputLabel>
      <Select
        labelId="currency-select-label"
        label="Currency"
        value={value}
        onChange={handleChange}
        MenuProps={MENU_PROPS}
      >
        {currencies.map((currency) => (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
