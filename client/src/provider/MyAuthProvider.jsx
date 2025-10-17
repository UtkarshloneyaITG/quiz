import React, { createContext, useContext, useEffect, useState } from "react";
import { useAlert } from "../servics/ApiChanger";
import { FaStepForward } from "react-icons/fa";
const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const { showAlert } = useAlert();
  const token = localStorage.getItem("token") || null;
  const [isAuth, setIsAuth] = useState(token);
  const [userName, setUserName] = useState("u");
  const [loding, setLoding] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || false;
    if (user) {
      const fristLater = user.fullName;
      setUserName(fristLater);
      setTimeout(() => {
        showAlert(`Welcome ${fristLater}`, "#006400");
      }, 1e3);
    } else {
      setUserName("U");
    }
  }, [isAuth]);

  return (
    <MyContext.Provider value={{ isAuth, setIsAuth, userName, setUserName , loding, setLoding }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyFunctions = () => useContext(MyContext);
