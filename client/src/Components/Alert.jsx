// CustomAlert.jsx
import React, { useEffect, useState } from 'react';
import './Alert.css';

const Alert = ({ message, color = '#ff4d4f', onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    // Auto-dismiss after 3 seconds
    const autoCloseTimer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(autoCloseTimer);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // match CSS transition duration
  };

  return (
    <div className={`custom-alert ${visible ? 'show' : 'hide'}`} style={{ backgroundColor: color }}>
      <div className="alert-content">
        <p>{message}</p>
        <button onClick={handleClose}>OK</button>
      </div>
    </div>
  );
};

export default Alert;
