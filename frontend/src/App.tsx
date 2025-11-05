import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { MenuBar } from './MenuBar';
import { Grid } from '@mui/material';
import { SongsTable } from './SongsTable';
import { ConfirmClearDialog } from './ConfirmClearDialog';
import { AttributesSegment } from './AttributeSegment';
import { FilenameCopyDialog } from './FilenameCopyDialog';
import NumberingDialog from './NumberingDialog';
import { CoverInput } from './CoverInput';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div id="App">
        <MenuBar />
        <Grid container spacing={2}>
          <Grid size={4} sx={{ marginTop: 10, height: 720 }}>
            <AttributesSegment />
            <br />
            <CoverInput />
          </Grid>
          <Grid size={8} sx={{ marginTop: '50px', borderLeftStyle: 'solid', borderWidth: '1px' }}>
            <SongsTable />
          </Grid>
        </Grid>
        <ToastContainer />
      </div>
      <FilenameCopyDialog />
      <NumberingDialog />
      <ConfirmClearDialog />
    </ThemeProvider>
  );
}

export default App;
