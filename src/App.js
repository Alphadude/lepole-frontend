import AppRouter from './router/AppRouter';
import AppContext from './store/appContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <AppContext>
        <AppRouter />
        <ToastContainer />
      </AppContext>
    </div>
  );
}

export default App;
