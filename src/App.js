import logo from './logo.svg';
import './App.scss';
import Router from './router.js';
import { BrowserRouter, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.js';

function App() {
  const ConditionalNavBar = () => {
    const location = useLocation();
    const showNavBar =['/'].includes(location.pathname);
    return showNavBar ? <NavBar /> : null;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ConditionalNavBar />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
