import React from "react";
import { PERSONAL_INFO } from "../_utils/constants.ts";
import "../../styles/output.css";

const Footer = () => {
  return (
    <footer className="main-footer bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 ">
      <div className="main-footer-container">
        <div className="main-footer-container-flex space-y-6 md:space-y-0">
          {/* Copyright Text */}
          <p className="main-footer-copyright text-zinc-600 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights
            reserved.
          </p>
          {/* make sitemap here */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
