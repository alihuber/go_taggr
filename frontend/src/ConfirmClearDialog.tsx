import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from './hooks';
import { setConfirmClearClosed } from './features/confirmClearSlice';
import { clearMetadata, setSelectedMetadata } from './features/metadataSlice';

export const ConfirmClearDialog = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.confirmClearDialog.open);

  const handleClose = (answer: boolean) => {
    if (typeof answer === 'object') {
      // nothing, user dismissed dialog
    } else if (typeof answer === 'boolean' && answer) {
      const emptyData = {
        album: '',
        albumArtist: '',
        artist: '',
        comment: '',
        cover: '',
        fileName: '',
        genre: '',
        index: 0,
        selected: false,
        title: '',
        track: '',
        year: '',
      };
      dispatch(setSelectedMetadata(emptyData));
      dispatch(clearMetadata());
    }
    dispatch(setConfirmClearClosed());
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Discard data?'}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>No</Button>
          <Button onClick={() => handleClose(true)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
