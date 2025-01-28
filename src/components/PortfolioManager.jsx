import React from "react";
import { useTheme } from "../config.tsx";
import Footer from "./_ui/footer.jsx";
import Navbar from "./_ui/navbar.jsx";
import Posts from "./_pages/Posts.jsx";
import Projects from "./_pages/Projects.jsx";
import Playground from "./_pages/Playground.jsx";
import Home from "./_pages/Home.jsx";
import { Sun, Moon } from "lucide-react";

import "../styles/output.css";

const PortfolioManager = () => {
  const { isDarkMode, toggleDarkMode, activeRoute, setActiveRoute } =
    useTheme();

  const renderContent = () => {
    switch (activeRoute) {
      case "posts":
        return <Posts />;
      case "projects":
        return <Projects isDarkMode={isDarkMode} />;
      case "playground":
        return <Playground />;
      default:
        return <Home />;
    }
  };
  return (
    <div
      className={`transition-colors duration-300 ${isDarkMode ? "dark bg-gray-0" : "bg-gray-50"}`}
    >
      <Navbar />
      <button
        onClick={toggleDarkMode}
        className="dark-mode-button bg-white/90 dark:bg-gray-800/90 shadow-lg hover:scale-110 transition-transform duration-200 "
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <Sun className="dark-mode-button-sun" />
        ) : (
          <Moon className="dark-mode-button-moon" />
        )}
      </button>
      <main
        className={`${activeRoute === "playground" || activeRoute === "projects" ? "" : "main-content"} bg-white dark:bg-zinc-900`}
      >
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioManager;
