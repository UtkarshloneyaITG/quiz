import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const token = localStorage.getItem("token") || null;
  const [isAuth, setIsAuth] = useState(token);

  return (
    <MyContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyFunctions = () => useContext(MyContext);
