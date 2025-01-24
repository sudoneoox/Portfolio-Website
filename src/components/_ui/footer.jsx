import React from "react";
import { PERSONAL_INFO } from "../_utils/constants.ts";
import { cn } from "../_utils/cn.ts";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-zinc-900/80 border-t border-zinc-200 dark:border-zinc-800 py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Copyright Text */}
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
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
