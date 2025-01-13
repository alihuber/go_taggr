import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel } from '@mui/material';
import { useAppDispatch, useAppSelector } from './hooks';
import { setNumberingDialogClosed, setStoreLeadingZeros, setStoreTrackCount } from './features/numberingSlice';
import { setTracksFromNumbering } from './features/metadataSlice';

const NumberingDialog = () => {
  const storeZeros = useAppSelector((state) => state.numberingDialog.storeLeadingZeros);
  const storeTracks = useAppSelector((state) => state.numberingDialog.storeTrackCount);
  const open = useAppSelector((state) => state.numberingDialog.open);
  const dispatch = useAppDispatch();

  const handleAbort = () => {
    dispatch(setNumberingDialogClosed());
  };

  const handleClose = (storeZeros: boolean, storeTracks: boolean) => {
    dispatch(setTracksFromNumbering({ storeLeadingZeros: storeZeros, storeTrackCount: storeTracks }));
    dispatch(setNumberingDialogClosed());
  };

  return (
    <Dialog open={open} onClose={() => handleAbort()} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Numbering</DialogTitle>
      <DialogContent>
        <FormControlLabel
          control={<Checkbox checked={storeZeros} onChange={() => dispatch(setStoreLeadingZeros(!storeZeros))} value="StoreLeadingZeros" />}
          label="Store leading zeros"
        />
        <FormControlLabel
          control={<Checkbox checked={storeTracks} onChange={() => dispatch(setStoreTrackCount(!storeTracks))} value="StoreTrackCount" />}
          label="Store track count"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(storeZeros, storeTracks)} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NumberingDialog;
