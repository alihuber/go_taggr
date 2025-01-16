import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { cloneDeep } from 'lodash';
import { useAppDispatch, useAppSelector } from './hooks';
import { OpenMusicFiles } from '../wailsjs/go/main/App';
import { Metadata, setLoadedMetadata, setMetadata, setSelectedMetadata } from './features/metadataSlice';
import { MouseEvent } from 'react';
import { setMessage } from './features/messageSlice';
import { EMPTY_METADATA } from './constants';

export const SongsTable = () => {
  const dispatch = useAppDispatch();
  const metadataList = useAppSelector((state) => state?.metadata?.metadataList);
  let selectedCount = 0;
  metadataList.forEach((data) => {
    if (data.selected) selectedCount++;
  });

  const onSelectAllClick = () => {
    const clonedData: Metadata[] = [];
    // all already selected, deselect
    if (selectedCount === metadataList.length) {
      metadataList.forEach((data) => {
        const clone = cloneDeep(data);
        clone.selected = false;
        clonedData.push(clone);
      });
    } else {
      metadataList.forEach((data) => {
        const clone = cloneDeep(data);
        clone.selected = true;
        clonedData.push(clone);
      });
    }
    dispatch(setSelectedMetadata(EMPTY_METADATA));
    dispatch(setMetadata(clonedData));
  };

  const handleClick = (_event: MouseEvent, data: Metadata) => {
    const clonedData = { ...data, selected: !data.selected };
    dispatch(setSelectedMetadata(clonedData));
  };

  if (metadataList?.length === 0) {
    return (
      <Button
        sx={{ opacity: 0.5, marginTop: '320px' }}
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
    );
  } else {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedCount > 0 && selectedCount === metadataList.length}
                  onChange={onSelectAllClick}
                />
              </TableCell>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>File Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {metadataList?.map((data) => (
              <TableRow
                hover
                onClick={(event) => handleClick(event, data)}
                role="checkbox"
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
