import logo from './logo.svg';
import './App.scss';
import Login from './pages/login/Login';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import GodRoom from './pages/godRoom/GodRoom';
import Home from './pages/home/Home';
import Admin from './pages/admin/Admin';
import AdminHome from './pages/adminHome/AdminHome';
import GameMasterLogin from './pages/gm/GameMasterLogin';
import GameMasterHome from './pages/gm/GameMasterHome';
import GLLogin from './pages/gl/GLLogin';
import GLHome from './pages/gl/GLHome';


function App() {
  return (
    <>
    <ToastContainer />
    <Router>
    <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Home />}/>
        <Route path='/admin' element={<Admin />}/>
        <Route path='/admin_home' element={<AdminHome />}/>
        <Route path='/gm' element={<GameMasterLogin />}/>
        <Route path='/gm_home' element={<GameMasterHome />}/>
        <Route path='/gl' element={<GLLogin />}/>
        <Route path='/gl_home' element={<GLHome />}/>

        <Route path='/*' element={<GodRoom/>}/>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
    </Router>
    </>
  );
}

export default App;
