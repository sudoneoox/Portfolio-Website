import React from "react";
import { NavConfig, NavbarProps } from "../_utils/types.ts";
import { Github, Linkedin } from "lucide-react";
import { useTheme } from "../../config.tsx";
import { PERSONAL_INFO } from "../_utils/constants.ts";
import "../../output.css";

const defaultNavConfig: NavConfig = {
  styles: {
    navbar: "fixed w-full top-0 z-50 bg-zinc-100",
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    wrapper: "flex items-center justify-between h-16",
    logo: "text-zinc-900 font-medium tracking-tight hover:text-zinc-600 transition-colors duration-200",
    menuContainer: "flex items-center space-x-8",
    menuItem:
      "text-zinc-900 hover:text-zinc-600 transition-colors duration-200 text-sm font-regular",
    iconContainer: "flex items-center ml-8 space-x-5",
    icon: "w-5 h-5 text-zinc-900 hover:text-zinc-600 transition-colors duration-200",
  },

  brand: {
    name: PERSONAL_INFO.name,
    route: "home",
  },
  menuItems: [
    { name: "Playground", href: "", route: "playground" },
    { name: "About", href: "", route: "about" },
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
                  href={item?.href === "" ? undefined : item.href}
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
