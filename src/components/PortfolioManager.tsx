import React from "react";
import { useTheme } from "../config.tsx";
import Footer from "./_ui/footer.jsx";
import Navbar from "./_ui/navbar.tsx";
import Posts from "./_pages/Posts.jsx";
import Projects from "./_pages/Projects.jsx";
import Playground from "./_pages/Playground.jsx";
import Home from "./_pages/Home.jsx";

import { Sun, Moon } from "lucide-react";

import "../output.css";

const PortfolioManager: React.FC = () => {
  const { isDarkMode, toggleDarkMode, activeRoute, setActiveRoute } =
    useTheme();

  const renderContent = () => {
    switch (activeRoute) {
      case "posts":
        return <Posts />;
      case "projects":
        return <Projects />;
      case "playground":
        return <Playground />;
      default:
        return <Home />;
    }
  };
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-gray-0" : "bg-gray-50"}`}
    >
      <Navbar />
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:scale-110 transition-transform duration-200"
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )}
      </button>
      <main className="pt-0 px-4 max-w-7xl mx-auto">{renderContent()}</main>
      <Footer />
    </div>
  );
};

export default PortfolioManager;
