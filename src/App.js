import './App.css';
import { SnackbarProvider } from 'notistack';
// import { Typography } from '@mui/material';
import ExpenseTracker from './components/Main-component/ExpenseTracker';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
    <div className="App">
      <span className='heading'>Expense Tracker</span>
     <ExpenseTracker />
    </div>
    </SnackbarProvider>
  );
}

export default App;
