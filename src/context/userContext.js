import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedRememberMe = localStorage.getItem("rememberMe") === 'true';

  const [user, setUser] = useState(storedUser || null);
  const [role, setRole] = useState(storedUser ? storedUser.role : "funcionario");
  const [needsRegistration, setNeedsRegistration] = useState(false);

  useEffect(() => {
    const checkFirstLogin = async () => {
      try {
        const response = await api.get('/check-login');
        setNeedsRegistration(response.data.needsRegistration);
      } catch (error) {
        console.error("Erro ao verificar primeiro login:", error);
      }
    };

    checkFirstLogin();
  }, []);

  useEffect(() => {
    if (user && storedRememberMe) {
      // Apenas persiste no localStorage se "Lembrar-me" for true
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      // Remove o storage em todas as condições de limpeza
      localStorage.removeItem("user");
      localStorage.removeItem("rememberMe");
    }
  }, [user, storedRememberMe]);

  return (
    <UserContext.Provider value={{ user, setUser, role, setRole, needsRegistration }}>
      {children}
    </UserContext.Provider>
  );
};
