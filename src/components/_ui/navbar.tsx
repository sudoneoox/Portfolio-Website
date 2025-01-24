import React from "react";
import { NavConfig, NavbarProps } from "../_utils/types.ts";
import { useScrollDirection } from "../_utils/scrollHide.ts";
import { Github, Linkedin } from "lucide-react";
import { useTheme } from "../../config.tsx";
import { PERSONAL_INFO } from "../_utils/constants.ts";
import { cn } from "../_utils/cn.ts";
import "../../output.css";

const Navbar: React.FC<NavbarProps> = ({
  config = defaultNavConfig,
}: {
  config: any;
}) => {
  const { activeRoute, setActiveRoute } = useTheme();

  // hide navbar when scrolling on blog like _pages
  const isVisible = useScrollDirection();

  const handleNavigation = (route: string) => {
    if (route) {
      setActiveRoute(route);
    }
  };

  return (
    <nav
      className={cn(
        config.styles.navbar,
        "transform transition-transform duration-300 !important",
        !isVisible ? "-translate-y-full" : "translate-y-0",
      )}
    >
      {" "}
      <div className={config.styles.container}>
        <div className={config.styles.wrapper}>
          {/* Brand */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(config.brand.route);
            }}
            className={config.styles.logo}
          >
            {config.brand.name}
          </a>

          {/* Menu Items and Social Icons */}
          <div className={config.styles.menuContainer}>
            {config.menuItems.map((item) =>
              item.route ? (
                <p
                  key={item.name}
                  onClick={() => handleNavigation(item.route)}
                  className={cn(
                    config.styles.menuItem,
                    "relative group",
                    activeRoute === item.route &&
                      "text-indigo-600 dark:text-indigo-400",
                  )}
                >
                  {item.name}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full",
                      activeRoute === item.route && "w-full",
                    )}
                  />
                </p>
              ) : (
                <a
                  key={item.name}
                  href={item?.href}
                  className={cn(
                    config.styles.menuItem,
                    "hover:text-zinc-900 dark:hover:text-white no-underline",
                  )}
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

// styles config
const defaultNavConfig: NavConfig = {
  styles: {
    navbar:
      "w-full top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 transition-all duration-300",
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    wrapper: "flex items-center justify-between h-16",
    logo: "text-zinc-900 dark:text-white font-medium tracking-tight transition-colors duration-200 no-underline text-2xl font-serif",
    menuContainer: "flex items-center space-x-8",
    menuItem:
      "relative text-zinc-600 dark:text-zinc-400 transition-all duration-200",
    iconContainer: "flex items-center ml-8 space-x-5",
    icon: "w-5 h-5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors duration-200",
  },

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
