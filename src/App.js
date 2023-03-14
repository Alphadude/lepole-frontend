import logo from './logo.svg';
import './App.css';
import AppRouter from './router/AppRouter';
import AppContext from './store/appContext';
import '@deposits/ui-kit-react/dist/index.css';

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
