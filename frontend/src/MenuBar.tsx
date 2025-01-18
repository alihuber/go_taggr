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
import { setConfirmClearOpenState } from './features/confirmClearSlice';
import { setFilenameCopyDialogOpenState } from './features/filenameCopySlice';
import { setNumberingDialogOpenState } from './features/numberingSlice';
import { setMessage } from './features/messageSlice';

export const MenuBar = () => {
  const dispatch = useAppDispatch();
  const metadataList = useAppSelector((state) => state.metadata.metadataList);

  return (
    <AppBar position="static" sx={{ position: 'fixed !important', width: '100%', zIndex: '99' }}>
      <Toolbar variant="dense">
        <Tooltip title="Open files">
          <IconButton
            color="inherit"
            disabled={metadataList?.length !== 0}
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
            disabled={metadataList?.length === 0}
            onClick={() => dispatch(setNumberingDialogOpenState(true))}
          >
            <FormatListNumberedOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Set title from file name">
          <IconButton
            color="inherit"
            disabled={metadataList?.length === 0}
            onClick={() => dispatch(setFilenameCopyDialogOpenState(true))}
          >
            <FileCopyOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save to disk">
          <IconButton
            color="inherit"
            disabled={metadataList?.length === 0}
            onClick={() => {
              SaveMetadata(metadataList).then(
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
            disabled={metadataList?.length === 0}
            onClick={() => dispatch(setConfirmClearOpenState(true))}
          >
            <ClearAllOutlined />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
