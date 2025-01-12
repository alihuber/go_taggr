import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';

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

  // console.log('### moreThanOneSelected', moreThanOneSelected);
  // console.log('### allSelected', allSelected);
  // console.log('### filesLoaded', filesLoaded);
  // console.log('### oneSelected', oneSelected);

  const handleChange = (type: string, event: ChangeEvent) => {
    console.log('### type', type);
    console.log('### event', event);
  };

  const handleBlur = (type: string, event: ChangeEvent) => {
    console.log('### type', type);
    console.log('### event', event);
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
