import React from "react";
import PortfolioManager from "./components/PortfolioManager.jsx";
import { ThemeProvider } from "./config.tsx";
import "./styles/output.css";

export function App() {
  return (
    <>
      <ThemeProvider>
        <PortfolioManager />
      </ThemeProvider>
    </>
  );
}

export default App;
