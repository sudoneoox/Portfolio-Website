import React, { useState } from "react";
import { NavConfig, NavbarProps, ActiveItem } from "../_utils/types.ts";
import { Github, Linkedin } from "lucide-react";
import { useTheme } from "../../config.tsx";
import "../../output.css";

const defaultNavConfig: NavConfig = {
  styles: {
    navbar: "fixed w-full top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm",
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    wrapper: "flex items-center justify-between h-20",
    logo: "font-semibold text-2xl bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-indigo-500 transition-all duration-300",
    menuContainer: "flex items-center space-x-8",
    menuItem:
      "relative text-gray-600 hover:text-gray-900 transition-all duration-300 transform hover:scale-110 text-sm uppercase tracking-wide no-underline font-medium",
    iconContainer: "flex items-center ml-8 space-x-6",
    icon: "w-5 h-5 text-gray-600 hover:text-gray-900 transition-all duration-300 transform hover:scale-125",
  },
  brand: {
    name: "Diego Coronado",
  },
  menuItems: [
    { name: "Playground" },
    { name: "About" },
    { name: "Projects" },
    { name: "Contact", href: "mailto:diegoa2992@gmail.com" },
    { name: "Resume", href: "assets/Resume-Tex/resume.pdf" },
  ],
  socialIcons: [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/diegocoronado0",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      href: "https://github.com/sudoneoox",
      icon: Github,
    },
  ],
};

const Navbar: React.FC<NavbarProps> = ({
  config = defaultNavConfig,
}: {
  config: any;
}) => {
  const { activeRoute, setActiveRoute } = useTheme();
  const handleNavigation = (route: string) => {
    if (route) {
      setActiveRoute(route);
    }
  };

  return (
    <nav className={config.styles.navbar}>
      <div className={config.styles.container}>
        <div className={config.styles.wrapper}>
          {/* Brand */}
          <div>
            <button
              onClick={() => handleNavigation(config.brand.route)}
              className={config.styles.logo}
            >
              {config.brand.name}
            </button>
          </div>

          {/* Menu Items and Social Icons */}
          <div className={config.styles.menuContainer}>
            {config.menuItems.map((item) =>
              item.route ? (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.route)}
                  className={`${config.styles.menuItem} ${
                    activeRoute === item.route
                      ? "scale-105 text-indigo-600 dark:text-indigo-400"
                      : ""
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className={config.styles.menuItem}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {item.name}
                </a>
              ),
            )}

            <div className={config.styles.iconContainer}>
              {config.socialIcons.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={config.styles.icon}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
