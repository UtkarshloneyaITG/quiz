// AlertContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import Alert from '../Components/Alert'; // adjust path as needed

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alertConfig, setAlertConfig] = useState(null);

  // ✅ Automatically clear alert after 3s when alert is shown
  useEffect(() => {
    if (alertConfig) {
      const timer = setTimeout(() => {
        setAlertConfig(null);
      }, 3000);
      return () => clearTimeout(timer); // clear previous timer on change
    }
  }, []);

  // ✅ Just show alert — logic is clean
  const showAlert = (message, color = '#f44336') => {
    setAlertConfig({ message, color });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alertConfig && (
        <Alert
          message={alertConfig.message}
          color={alertConfig.color}
          onClose={() => setAlertConfig(null)}
        />
      )}
    </AlertContext.Provider>
  );
};
