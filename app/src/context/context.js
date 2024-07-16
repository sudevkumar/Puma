import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const getUser = () => {
    const logUser = JSON.parse(localStorage.getItem("puma-data")) || null;
    setUser(logUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
}
