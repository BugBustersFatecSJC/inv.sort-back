import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './context/userContext';
import Login from './pages/Login/Login';
import InitialSignUp from './pages/InitialSignUp/InitialSignUp';
import MainPageRender from './pages/MainPageRender/MainPageRender';
import MovementPage from './pages/MovementPage/MovementPage';
import UserPage from './pages/UserPage/UserPage';
import Analytics from './pages/Analytics/Analytics';
import Batch from './pages/Batch/Batch';
import Sector from './pages/Sector/Sector';
import Supplier from './pages/Supplier/Supplier';
import UserProfile from './pages/UserProfile/UserProfile';
import BuyAndSell from './pages/BuyAndSell/BuyAndSell';
import UserRegister from './pages/UserRegister/UserRegister';

// Define rotas protegidas que direcionam o usuário para login se não estiver autenticado
function ProtectedRoute({ element: Element }) {
  const user = localStorage.getItem("user");
  return user ? <Element /> : <Navigate to="/login" />;
}

// Evita que usuários autenticados vejam a página de login
function ProtectedLogin({ element: Element }) {
  const user = localStorage.getItem("user");
  return !user ? <Element /> : <Navigate to="/products" />;
}

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedLogin element={Login} />} />
          <Route path="/cadastro" element={<InitialSignUp />} />
          <Route path="/login" element={<ProtectedLogin element={Login} />} />
          <Route path="/products" element={<ProtectedRoute element={MainPageRender} />} />
          <Route path="/analytics" element={<ProtectedRoute element={Analytics} />} />
          <Route path="/userpage" element={<ProtectedRoute element={UserPage} />} />
          <Route path="/historic" element={<ProtectedRoute element={MovementPage} />} />
          <Route path="/batches" element={<ProtectedRoute element={Batch} />} />
          <Route path="/sectors" element={<ProtectedRoute element={Sector} />} />
          <Route path="/suppliers" element={<ProtectedRoute element={Supplier} />} />
          <Route path="/profile" element={<ProtectedRoute element={UserProfile} />} />
          <Route path="/buyandsell" element={<ProtectedRoute element={BuyAndSell} />} />
          <Route path="/cadastra-usuario" element={<ProtectedRoute element={UserRegister} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;