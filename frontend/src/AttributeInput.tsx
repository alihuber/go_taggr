import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { updateAttributeByType } from './features/metadataSlice';
import { useAppDispatch } from './hooks';

export const AttributeInput = ({
  type,
  value,
  filesLoaded,
  oneSelected,
  allSelected,
  moreThanOneSelected,
}: {
  type: string;
  value: string;
  filesLoaded: boolean;
  oneSelected: boolean;
  allSelected: boolean;
  moreThanOneSelected: boolean;
}) => {
  let disabled = false;
  const dispatch = useAppDispatch();

  const handleChange = (type: string, event: ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value;
    dispatch(updateAttributeByType({ inputType: type, newValue: value }));
  };

  const handleBlur = (type: string, event: ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value;
    dispatch(updateAttributeByType({ inputType: type, newValue: value }));
  };

  if (type === 'title') {
    disabled = !filesLoaded || !oneSelected || allSelected || moreThanOneSelected;
  } else {
    disabled = !filesLoaded || (!allSelected && !oneSelected && !moreThanOneSelected);
  }
  const label = type.charAt(0).toUpperCase() + type.slice(1);
  if (moreThanOneSelected && type == 'title') {
    value = '-- more than one selected --';
  }
  return (
    <TextField
      slotProps={{ inputLabel: { shrink: true } }}
      sx={{ width: '27vw', margin: 1 }}
      label={label}
      variant="standard"
      value={value}
      disabled={disabled}
      onChange={(event) => handleChange(type, event)}
      onBlur={(event) => handleBlur(type, event)}
    />
  );
};
