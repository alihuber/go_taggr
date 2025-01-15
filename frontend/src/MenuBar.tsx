import {
  ClearAllOutlined,
  FileCopyOutlined,
  FileOpenOutlined,
  FormatListNumberedOutlined,
  SaveOutlined,
} from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from './hooks';
import { OpenMusicFiles, SaveMetadata } from '../wailsjs/go/main/App';
import { setLoadedMetadata } from './features/metadataSlice';
import { setConfirmClearOpen } from './features/confirmClearSlice';
import { setFilenameCopyDialogOpen } from './features/filenameCopySlice';
import { setNumberingDialogOpen } from './features/numberingSlice';
import { setMessage } from './features/messageSlice';

export const MenuBar = () => {
  const dispatch = useAppDispatch();
  const metadata = useAppSelector((state) => state.metadata);

  return (
    // <AppBar position="static" className="appBarStyle">
    <AppBar position="static" sx={{ position: 'fixed !important', width: '100%', zIndex: '99' }}>
      <Toolbar variant="dense">
        <Tooltip title="Open files">
          <IconButton
            color="inherit"
            disabled={metadata?.value?.length !== 0}
            onClick={() => {
              OpenMusicFiles().then(
                (result) => {
                  dispatch(setLoadedMetadata(result));
                },
                (error) => {
                  dispatch(setMessage({ message: error, severity: 'error' }));
                }
              );
            }}
          >
            <FileOpenOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Numbering">
          <IconButton
            color="inherit"
            disabled={metadata?.value?.length === 0}
            onClick={() => dispatch(setNumberingDialogOpen())}
          >
            <FormatListNumberedOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Set title from file name">
          <IconButton
            color="inherit"
            disabled={metadata?.value?.length === 0}
            onClick={() => dispatch(setFilenameCopyDialogOpen())}
          >
            <FileCopyOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save to disk">
          <IconButton
            color="inherit"
            disabled={metadata?.value?.length === 0}
            onClick={() => {
              SaveMetadata(metadata.value).then(
                (result) => {
                  dispatch(setMessage({ message: 'Metadata saved!', severity: 'info' }));
                },
                (error) => {
                  dispatch(setMessage({ message: error, severity: 'error' }));
                }
              );
            }}
          >
            <SaveOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Clear data">
          <IconButton
            sx={{ marginLeft: 'auto' }}
            color="inherit"
            disabled={metadata?.value?.length === 0}
            onClick={() => dispatch(setConfirmClearOpen())}
          >
            <ClearAllOutlined />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
