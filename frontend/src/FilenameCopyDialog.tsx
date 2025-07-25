import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from './hooks';
import { setFilenameCopyDialogOpenState, setFilenameCopyRegex } from './features/filenameCopySlice';
import { ChangeEvent } from 'react';
import { setTitlesFromFilename } from './features/metadataSlice';

export const FilenameCopyDialog = () => {
  const handleClose = (regexp?: string) => {
    if (regexp) {
      dispatch(setTitlesFromFilename(regexp));
    }
    dispatch(setFilenameCopyDialogOpenState(false));
  };

  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.filenameCopyDialog.open);
  const regexp = useAppSelector((state) => state.filenameCopyDialog.regex);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = (event.target as HTMLInputElement).value;
    dispatch(setFilenameCopyRegex(value));
  };

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle id="form-dialog-title">Copy title from file name</DialogTitle>
      <DialogContent>
        <TextField id="standard-name" label="RegExp" value={regexp} onChange={handleChange} margin="normal" />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(regexp)} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};
