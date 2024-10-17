import {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
  redirect
} from 'react-router-dom';
import './App.css'; 
import Login from './pages/Login/Login'; 
import InitialSignUp from './pages/InitialSignUp/InitialSignUp'
import api from "./services/api"
// import UserPage from './pages/UserPage'
import MainPageRender from './pages/MainPageRender/MainPageRender'

/*ProtectedRoute redireciona o usuario para a pagina de login, caso o mesmo não eseteja logado
IMPORTANTE: Use essa função em toda pagina que não deve ser acessada antes do login*/
function ProtectedRoute({ element: Element }) {
  const user = localStorage.getItem("user");
  return user ? <Element /> : <Navigate to="/login" />;
}

/*ProtectedLogin redireciona o usuario da pagina de login para a pagina de produtos, caso o mesmo já esteja logado*/
function ProtectedLogin({ element: Element }) {
  const user = localStorage.getItem("user");
  return !user ? <Element /> : <Navigate to="/products" />;
}

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<InitialSignUp />} />
          <Route path="/login" element={<ProtectedLogin element={Login} />} /> {/*Adicionado ProtectedLogin na pagina de login*/}
          <Route path="/products" element={<ProtectedRoute element={MainPageRender} />} /> {/*Adicionado ProtectedRoute na pagina de produtos*/}
          {/* <Route path="/userpage" element={<UserPage />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;