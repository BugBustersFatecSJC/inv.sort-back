import {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate
} from 'react-router-dom';
import './App.css'; 
import Login from './pages/Login/Login'; 
import InitialSignUp from './pages/InitialSignUp/InitialSignUp'
import api from "./services/api"
// import UserPage from './pages/UserPage'
import MainPageRender from './pages/MainPageRender/MainPageRender'
import MovimentsPage from './pages/MovementPage/MovementPage'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<InitialSignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<MainPageRender />} />
          <Route path="/movements" element={<MovimentsPage />} />
          {/* <Route path="/userpage" element={<UserPage />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
