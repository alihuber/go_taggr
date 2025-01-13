import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { cloneDeep } from 'lodash';
import { useAppDispatch, useAppSelector } from './hooks';
import { OpenMusicFiles } from '../wailsjs/go/main/App';
import { Metadata, setLoadedMetadata, setMetadata, setSelectedMetadata } from './features/metadataSlice';
import { MouseEvent } from 'react';
import { setMessage } from './features/messageSlice';
import { EMPTY_METADATA } from './constants';

export const SongsTable = () => {
  const dispatch = useAppDispatch();
  const metadata = useAppSelector((state) => state?.metadata?.value);
  let selectedCount = 0;
  metadata.forEach((value) => {
    if (value.selected) selectedCount++;
  });

  const onSelectAllClick = () => {
    const clonedData: Metadata[] = [];
    if (selectedCount === metadata.length) {
      metadata.forEach((data) => {
        const clone = cloneDeep(data);
        clone.selected = false;
        clonedData.push(clone);
      });
      dispatch(setSelectedMetadata(EMPTY_METADATA));
    } else {
      metadata.forEach((data) => {
        const clone = cloneDeep(data);
        clone.selected = true;
        clonedData.push(clone);
      });
      dispatch(setSelectedMetadata(clonedData[0]));
    }
    dispatch(setMetadata(clonedData));
  };

  const handleClick = (_event: MouseEvent, data: Metadata) => {
    const clonedData = { ...data, selected: !data.selected };
    dispatch(setSelectedMetadata(clonedData));
  };

  if (metadata?.length === 0) {
    return (
      <div className="emptyButton">
        <Button
          variant="outlined"
          color="inherit"
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
          <Typography variant="subtitle1">No files loaded. Click here to open...</Typography>
        </Button>
      </div>
    );
  } else {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedCount > 0 && selectedCount === metadata.length}
                  onChange={onSelectAllClick}
                  inputProps={{
                    'aria-label': 'select all',
                  }}
                />
              </TableCell>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>File Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {metadata?.map((data) => (
              <TableRow
                hover
                onClick={(event) => handleClick(event, data)}
                role="checkbox"
                aria-checked={data.selected}
                tabIndex={-1}
                key={data.index}
                selected={data.selected}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={data.selected || false} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {data.track}
                </TableCell>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.artist}</TableCell>
                <TableCell>{data.fileName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};
