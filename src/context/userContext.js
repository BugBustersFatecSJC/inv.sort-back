import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [role, setRole] = useState(storedUser ? storedUser.role : "funcionario");

  useEffect(() => {
    if (storedUser) {
      localStorage.setItem("user", JSON.stringify({ ...storedUser, role }));
    }
  }, [role, storedUser]);

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};