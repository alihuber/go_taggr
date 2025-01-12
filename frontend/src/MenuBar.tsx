import { ClearAllOutlined, FileCopyOutlined, FileOpenOutlined, FormatListNumberedOutlined, SaveOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from './hooks';
import { OpenFiles } from '../wailsjs/go/main/App';
import { setLoadedMetadata } from './features/metadataSlice';
import { setConfirmClearOpen } from './features/confirmClearSlice';

export const MenuBar = () => {
  const dispatch = useAppDispatch();
  const metadata = useAppSelector((state) => state.metadata);

  return (
    <AppBar position="static" className="appBarStyle">
      <Toolbar variant="dense">
        <Tooltip title="Open files">
          <IconButton
            color="inherit"
            aria-label="Open"
            disabled={metadata?.value?.length !== 0}
            onClick={() => {
              OpenFiles().then((result) => {
                dispatch(setLoadedMetadata(result));
              });
            }}
          >
            <FileOpenOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Numbering">
          <IconButton color="inherit" aria-label="Numbering" onClick={() => dispatch({ type: 'SET_NUMBERING_DIALOG_OPEN', payload: true })}>
            <FormatListNumberedOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Set title from file name">
          <IconButton
            color="inherit"
            aria-label="CopyFilenames"
            onClick={() => dispatch({ type: 'SET_FILENAME_DIALOG_OPEN', payload: true })}
          >
            <FileCopyOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save to disk">
          <IconButton
            color="inherit"
            aria-label="Save"
            onClick={() => {
              console.log('foo');
            }}
          >
            <SaveOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Clear data">
          <IconButton
            sx={{ marginLeft: 'auto' }}
            color="inherit"
            aria-label="Clear"
            disabled={metadata?.value?.length === 0}
            onClick={() => {
              dispatch(setConfirmClearOpen());
            }}
          >
            <ClearAllOutlined />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
