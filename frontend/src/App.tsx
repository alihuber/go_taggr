import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import Button from '@mui/material/Button';
import './App.css';
import { Greet } from '../wailsjs/go/main/App';
import { MenuBar } from './MenuBar';
import { Typography } from '@mui/material';

function App() {
  const [resultText, setResultText] = useState('Choose');
  const [name, setName] = useState('');
  const updateName = (e: any) => setName(e.target.value);
  const updateResultText = (result: string) => setResultText(result);

  function greet() {
    Greet(name).then(updateResultText);
  }

  const notify = () => {
    toast.info('Hey 👋!', {
      position: 'bottom-center',
    });
  };

  return (
    <div id="App">
      <MenuBar />
      <Typography variant="h1" gutterBottom>
        Name: {resultText}
      </Typography>
      <Button variant="contained" onClick={greet}>
        File
      </Button>
      <Button variant="contained" onClick={notify}>
        Hello world
      </Button>
      <ToastContainer />
    </div>
  );
}

export default App;
