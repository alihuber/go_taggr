import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from './hooks';
import { OpenFiles } from '../wailsjs/go/main/App';
import { setMetadata } from './features/metadataSlice';
import { MouseEvent, useState } from 'react';

export const SongsTable = () => {
  const dispatch = useAppDispatch();
  const metadata = useAppSelector((state) => state.metadata);
  const [selected, setSelected] = useState<number[]>([]);

  const onSelectAllClick = () => {};
  const handleClick = (event: MouseEvent, index: number) => {};

  if (metadata?.value?.length === 0) {
    return (
      <div className="emptyButton">
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => {
            OpenFiles().then((result) => {
              dispatch(setMetadata(result));
            });
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
                  checked={selected.length > 0 && selected.length === metadata.value.length}
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
            {metadata?.value.map((data) => (
              <TableRow
                hover
                onClick={(event) => handleClick(event, data.index)}
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
