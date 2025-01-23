import React, { useState } from "react";
import { NavConfig, NavbarProps, ActiveItem } from "../_utils/types.ts";
import { Github, Linkedin } from "lucide-react";
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
  currentlyActiveItem,
}: {
  config: any;
  currentlyActiveItem: string;
}) => {
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const { styles, brand, menuItems, socialIcons } = config;

  const handleClick = (itemName: string) => {
    setClickedItem(itemName);
    currentlyActiveItem = clickedItem;
    setTimeout(() => setClickedItem(null), 300); // Reset after animation
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* Left side - Brand */}
          <div>
            <a href={brand.href} className={styles.logo}>
              {brand.name}
            </a>
          </div>

          {/* Right side - Menu Items and Social Icons */}
          <div className={styles.menuContainer}>
            {/* Menu Items */}
            {menuItems.map((item: any) => (
              <a
                key={item.name}
                href={item.href}
                className={`${styles.menuItem} ${
                  clickedItem === item.name ? "scale-105" : ""
                }`}
                onClick={() => handleClick(item.name)}
              >
                {item.name}
              </a>
            ))}

            {/* Social Icons */}
            <div className={styles.iconContainer}>
              {socialIcons.map((item: any) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={styles.icon}
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
