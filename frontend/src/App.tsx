import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { MenuBar } from './MenuBar';
import { Grid2 } from '@mui/material';
import { SongsTable } from './SongsTable';
import { ConfirmClearDialog } from './ConfirmClearDialog';
import { AttributesSegment } from './AttributeSegment';

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
        <Grid2 container spacing={2}>
          <Grid2 size={4} sx={{ marginTop: 10, height: 720 }}>
            <AttributesSegment />
          </Grid2>
          <Grid2 size={8} className="songsTableGrid">
            <SongsTable />
          </Grid2>
        </Grid2>
        <ToastContainer />
      </div>
      <ConfirmClearDialog />
    </ThemeProvider>
  );
}

export default App;
