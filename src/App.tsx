import React from "react";
import PortfolioManager from "./components/PortfolioManager.tsx";
import { ThemeProvider } from "./config.tsx";
import "./output.css";

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
