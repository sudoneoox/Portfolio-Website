"use client";
import React, { useState, memo } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../utils/navbar-menu.tsx";
import { cn } from "../utils/cn.ts";


const linkedInProfileUrl = "https://www.linkedin.com/in/diegocoronado0/";
const gitHubProfileUrl = "https://www.github.com/sudoneoox";


export function NavPhone() {
  return (
    <div className="fixed w-full flex items-center justify-center z-50">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className, showSection, isLight, openResume }: { className?: string; showSection:(string, boolean)=>void, isLight:boolean; openResume:()=>void }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed inset-x-0 mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        {/* <MenuItem setActive={setActive} active={active} item="Website">
          <MenuItems showSection={showSection} openResume={openResume} />
        </MenuItem> */}
        <MenuItem setActive={setActive} active={active} item="xterm">
            <HoveredLink onClick={() => showSection("xterm", false)}>.xterm()</HoveredLink>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="about">
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="contact">
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="projects">
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="resume">
        </MenuItem>

      </Menu>
    </div>
  );
}

const MenuItems = memo(({ showSection, openResume }) => {
  return (
    <div className="flex flex-col space-y-4 text-sm">
      <HoveredLink onClick={() => showSection("xterm", false)}>.xterm()</HoveredLink>
      <HoveredLink onClick={() => showSection("TextGenerator", false)}>.about()</HoveredLink>
      <HoveredLink href="mailto:diegoa2992@gmail.com">.contact()</HoveredLink>
      <HoveredLink onClick={() => showSection("projects", false)}>.projects()</HoveredLink>
      <HoveredLink onClick={openResume}>.resume()</HoveredLink>
      <a href={gitHubProfileUrl}>
        <HoveredLink>.github()</HoveredLink>
      </a>
      <a href={linkedInProfileUrl}>
        <HoveredLink>.linkedin()</HoveredLink>
      </a>
    </div>
  );
});