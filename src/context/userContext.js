import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedUser = JSON.parse(sessionStorage.getItem("user") || localStorage.getItem("user"));
  const storedRememberMe = localStorage.getItem("rememberMe") === 'true';

  const [user, setUser] = useState(storedUser || null);
  const [role, setRole] = useState(storedUser ? storedUser.role : "funcionario");

  useEffect(() => {
    if (user) {
      if (storedRememberMe) {
        // Salva no localStorage se "Lembrar-me" for true
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("rememberMe", 'true');
      } else {
        // Salva no sessionStorage se "Lembrar-me" for false
        sessionStorage.setItem("user", JSON.stringify(user));
        localStorage.removeItem("rememberMe");
      }
    } else {
      // Remove os dados de autenticação ao deslogar
      localStorage.removeItem("user");
      localStorage.removeItem("rememberMe");
      sessionStorage.removeItem("user");
    }
  }, [user, storedRememberMe]);

  return (
    <UserContext.Provider value={{ user, setUser, role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};
