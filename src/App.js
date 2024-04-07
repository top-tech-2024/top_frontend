import './App.scss';
import Router from './router.js';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar.tsx';
import Footer from "./components/Footer.tsx";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Router />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
