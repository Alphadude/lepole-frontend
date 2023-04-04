import logo from './logo.svg';
import './App.css';
import AppRouter from './router/AppRouter';
import AppContext from './store/appContext';

function App() {
  return (
    <div className="App">
      <AppContext>
        <AppRouter />
      </AppContext>
    </div>
  );
}

export default App;
