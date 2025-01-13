import { ClearAllOutlined, FileCopyOutlined, FileOpenOutlined, FormatListNumberedOutlined, SaveOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from './hooks';
import { OpenMusicFiles } from '../wailsjs/go/main/App';
import { setLoadedMetadata } from './features/metadataSlice';
import { setConfirmClearOpen } from './features/confirmClearSlice';
import { setFilenameCopyDialogOpen } from './features/filenameCopySlice';
import { setNumberingDialogOpen } from './features/numberingSlice';

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
              OpenMusicFiles().then((result) => {
                dispatch(setLoadedMetadata(result));
              });
            }}
          >
            <FileOpenOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Numbering">
          <IconButton
            color="inherit"
            aria-label="Numbering"
            disabled={metadata?.value?.length === 0}
            onClick={() => dispatch(setNumberingDialogOpen())}
          >
            <FormatListNumberedOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Set title from file name">
          <IconButton
            color="inherit"
            aria-label="CopyFilenames"
            disabled={metadata?.value?.length === 0}
            onClick={() => dispatch(setFilenameCopyDialogOpen())}
          >
            <FileCopyOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save to disk">
          <IconButton
            color="inherit"
            aria-label="Save"
            disabled={metadata?.value?.length === 0}
            onClick={() => {
              // TODO:
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
            onClick={() => dispatch(setConfirmClearOpen())}
          >
            <ClearAllOutlined />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};
