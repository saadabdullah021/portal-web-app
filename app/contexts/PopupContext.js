// app/contexts/PopupContext.js
"use client";

import { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within PopupProvider");
  }
  return context;
};

export const PopupProvider = ({ children }) => {
  const [popups, setPopups] = useState({
    signup: false,
    login: false,
    verification: false,
    confirmIdentity: false,
  });

  const openPopup = (popupName) => {
    setPopups(prev => ({
      ...prev,
      [popupName]: true
    }));
  };

  const closePopup = (popupName) => {
    setPopups(prev => ({
      ...prev,
      [popupName]: false
    }));
  };

  const closeAllPopups = () => {
    setPopups({
      signup: false,
      login: false,
      verification: false,
      confirmIdentity: false,
    });
  };

  return (
    <PopupContext.Provider value={{
      popups,
      openPopup,
      closePopup,
      closeAllPopups
    }}>
      {children}
    </PopupContext.Provider>
  );
};