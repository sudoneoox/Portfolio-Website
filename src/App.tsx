import React from "react";
import PortfolioManager from "./components/PortfolioManager.tsx";
import "./output.css";

export function App() {
  return (
    <>
      <React.StrictMode>
        <PortfolioManager />
      </React.StrictMode>
    </>
  );
}

export default App;
