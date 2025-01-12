import { FileCopyOutlined, FormatListNumberedOutlined, MusicNoteOutlined, SaveOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Tooltip } from '@mui/material';

export const MenuBar = () => {
  const dispatch = ({}: { type: string; payload: boolean }) => {};
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
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
        {/* <div className={classes.grow} /> */}
        {/* {
          <BottomNavigationAction
            className={classes.statusIcon}
            label="Clear"
            icon={<ClearIcon />}
            showLabel
            value={2}
            onClick={() => handleClear()}
          />
        }
        <div className={classes.grow} />
        <div className={classes.title}>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            taggr
          </Typography>
        </div> */}
      </Toolbar>
      {/* {<BottomNavigationAction label={'loaded X files'} icon={<MusicNoteOutlined />} disabled showLabel />} */}
    </AppBar>
  );
};
