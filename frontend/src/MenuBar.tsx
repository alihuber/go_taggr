import { ClearAllOutlined, FileCopyOutlined, FileOpenOutlined, FormatListNumberedOutlined, SaveOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material';
import { useAppDispatch } from './hooks';
import { OpenFiles } from '../wailsjs/go/main/App';
import { setMetadata, clearMetadata } from './features/metadataSlice';
import { useState } from 'react';

export const MenuBar = () => {
  const dispatch = useAppDispatch();
  // const [clearAlertOpen, setClearAlertOpen] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Tooltip title="Open files">
          <IconButton
            color="inherit"
            aria-label="Open"
            onClick={() => {
              OpenFiles().then((result) => {
                dispatch(setMetadata(result));
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
            onClick={() => {
              dispatch(clearMetadata());
            }}
          >
            <ClearAllOutlined />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
