import React, { useState } from "react";
import { Clock } from "./components/Clock";
import { Config } from "./components/Config";
import { ConfigProvider } from "./components/configContext";

function App() {
  const [showConfig, setShowConfig] = useState(true);

  const handleStartClick = () => {
    setShowConfig(false);
  };

  const handleSettingsClick = () => {
    setShowConfig(true);
  };

  return (
    <ConfigProvider>
      <div className="App">
        {showConfig ? (
          <Config onStartClick={handleStartClick} />
        ) : (
          <Clock onSettingsClick={handleSettingsClick} />
        )}
      </div>
    </ConfigProvider>
  );
}

export default App;
