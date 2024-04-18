import React, { createContext, useContext, useState } from "react";

const ConfigContext = createContext();

export function useConfig() {
  return useContext(ConfigContext);
}

export function ConfigProvider({ children }) {
  const [time, setTime] = useState(0);
  const [incremento, setIncremento] = useState(0);
  const [color, setColor] = useState("#aeae");

  return (
    <ConfigContext.Provider
      value={{ time, setTime, incremento, setIncremento, color, setColor }}
    >
      {children}
    </ConfigContext.Provider>
  );
}
