import React, { useState } from "react";
import { useScrollDirection } from "../_utils/scrollHide.ts";
import { Github, Linkedin, Menu } from "lucide-react";
import { useTheme } from "../../config.tsx";
import { PERSONAL_INFO } from "../_utils/constants.ts";
import { cn } from "../_utils/cn.ts";
import "../../styles/output.css";

const Navbar = ({ config = defaultNavConfig }) => {
  const { activeRoute, setActiveRoute } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (route) => {
    if (route) {
      setActiveRoute(route);
    }
  };

  return (
    <nav className="main-navbar bg-white/80 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 transition-all duration-300">
      <div className="navbar-container">
        <div className="navbar-wrapper">
          {/* Brand */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(config.brand.route);
            }}
            className="navbar-brand"
          >
            {config.brand.name}
          </a>

          {/* MOBILE MENU  */}
          <button
            className="navbar-mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu />
          </button>

          {/* Menu Items and Social Icons */}
          <div className={`navbar-menu ${isMobileMenuOpen ? "active" : ""}`}>
            {config.menuItems.map((item) =>
              item.route ? (
                <p
                  key={item.name}
                  onClick={() => handleNavigation(item.route)}
                  className={cn(
                    "navbar-item",
                    activeRoute === item.route &&
                      "text-indigo-600 dark:text-indigo-400",
                  )}
                >
                  {item.name}
                  <span
                    className={cn(
                      "navbar-item-underline",
                      activeRoute === item.route &&
                        "navbar-item-underline--active",
                    )}
                  />
                </p>
              ) : (
                <a
                  key={item.name}
                  href={item?.href}
                  className="navbar-item hover:text-zinc-900 dark:hover:text-white"
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

            <div className="navbar-icons">
              {config.socialIcons.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="navbar-icon"
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

const defaultNavConfig = {
  brand: {
    name: PERSONAL_INFO.name,
    route: "home",
  },
  menuItems: [
    { name: "Playground", href: "", route: "playground" },
    { name: "Posts", href: "", route: "posts" },
    { name: "Projects", href: "", route: "projects" },
    { name: "Contact", href: `mailto:${PERSONAL_INFO.email}` },
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

export default Navbar;
