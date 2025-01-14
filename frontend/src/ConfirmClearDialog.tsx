import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from './hooks';
import { setConfirmClearClosed } from './features/confirmClearSlice';
import { clearMetadata, setSelectedMetadata } from './features/metadataSlice';
import { EMPTY_METADATA } from './constants';

export const ConfirmClearDialog = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.confirmClearDialog.open);

  const handleClose = (answer: boolean) => {
    if (typeof answer === 'object') {
      // nothing, user dismissed dialog
    } else if (typeof answer === 'boolean' && answer) {
      dispatch(setSelectedMetadata(EMPTY_METADATA));
      dispatch(clearMetadata());
    }
    dispatch(setConfirmClearClosed());
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'Discard data?'}</DialogTitle>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>No</Button>
        <Button onClick={() => handleClose(true)} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
