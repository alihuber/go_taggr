import { ToastContainer } from 'react-toastify';
import Button from '@mui/material/Button';
import './App.css';
import { MenuBar } from './MenuBar';
import { useAppDispatch } from './hooks';
import { setMessage } from './features/messageSlice';

function App() {
  const dispatch = useAppDispatch();

  return (
    <div id="App">
      <MenuBar />
      <Button variant="contained" onClick={() => dispatch(setMessage('boo'))}>
        Hello world
      </Button>
      <ToastContainer />
    </div>
  );
}

export default App;
