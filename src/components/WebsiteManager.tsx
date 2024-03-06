import React, { useState, useCallback, useMemo, useEffect, memo} from "react";
import { TextGenerator } from "./ui/TextGenerator.tsx"; 
import {ReactComponent as LinkedInIcon} from '../assets/icons/linkedin.svg';
import {ReactComponent as GitHubIcon} from '../assets/icons/github1.svg';
import {Projects} from "./ui/Projects.tsx";

import { HoveredLink, Menu, MenuItem, ProductItem } from "./utils/navbar-menu.tsx";
import { cn } from "./utils/cn.ts";


import { Xterm } from "./ui/Terminal.tsx";
import '../index.css';




const MemoizedLinkedInIcon = memo(LinkedInIcon);
const MemoizedGitHubIcon = memo(GitHubIcon);

const linkedInProfileUrl = "https://www.linkedin.com/in/diegocoronado0/";
const gitHubProfileUrl = "https://www.github.com/sudoneoox";

export function WebsiteManager() {

    const [currentSection, setCurrentSection] = useState('TextGenerator');
    const [showLight, setShowLight] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isMenuOpen = useMemo(() => windowWidth > 768, [windowWidth]);

    const showSection = useCallback((section:string, isLight:boolean) => {
      setCurrentSection(section);
      if (section !== 'TextGenerator') {
        setShowLight(false);
      } else if (section === 'TextGenerator') {
        setShowLight(!isLight);
      }
    }, []);
  
    const openResume = useCallback(() => {
      window.open('../../assets/Resume.pdf', '_blank');
    }, []);
  
    const renderSection = useMemo(() => {
      switch (currentSection) {
        case 'xterm':
          return <Xterm className="w-full dark:bg-black bg-black bg-dot-white/[0.3] relative flex items-center justify-center" />;
        case 'projects':
            return (
                <div className="container" >
                    <Projects className=""/>
                </div>
            );
        case 'TextGenerator':
          return <TextGenerator className="dark:bg-black bg-dot-white/[0.3] relative font-bold z-20 text-pretty justify-center" showLight={showLight} />;
       
        default:
          return null;
      }
    }, [currentSection, showLight]);



   

    useEffect(() => {
      function handleResize() {
        setWindowWidth(window.innerWidth);
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []); 

    return (
        <>
            { currentSection !== 'xterm' && (
            <>
            {isMenuOpen ? (
              <>
                <div className="absolute navigation-links top-0 left-0 m-4 z-50" style={{ display: 'flex', gap: '20px'}}>
                <button onClick={() => showSection('xterm', false)} style={{color:"white", cursor:"pointer", fontFamily:'vt323', fontSize:'2.5vh'}}>.xterm()</button>
                </div>


                <div className="absolute navigation-links top-0 right-0 m-4 z-50" style={{ display: 'flex', gap: '20px'}}>
                <button onClick={() => showSection('TextGenerator', showLight)} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>.about()</button>
                <a href="mailto:diegoa2992@gmail.com" style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>.contact()</a>
                <button onClick={() => showSection('projects', false)} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>.projects()</button>
                <button onClick={openResume} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>.resume()</button>
                
                    <a href={gitHubProfileUrl} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>
                        <MemoizedGitHubIcon className="w-6 h-6" />
                    </a>
                    <a href={linkedInProfileUrl} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>
                        <MemoizedLinkedInIcon className="w-6 h-6"/>
                    </a>
                   
                </div>
              </>
            ): (
            <div className="absolute top-0 z-100 right-0">
              <NavPhone showSection={showSection} openResume={openResume}/>
            </div>)}
            </>
            )}
            
            {renderSection}
            
        </>
    );
}


function NavPhone() {
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
