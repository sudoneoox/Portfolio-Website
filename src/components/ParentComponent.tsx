import React, { useState } from "react";
import { TextGenerator } from "./ui/TextGenerator.tsx"; // Adjust the import path as necessary
import { DotBackgroundDemo } from "./ui/grid-background.tsx"; // Adjust the import path as necessary
import {ReactComponent as LinkedInIcon} from '../assets/icons/linkedin.svg';
import {ReactComponent as GitHubIcon} from '../assets/icons/github1.svg';
import { Xterm } from "./ui/Terminal.tsx";
import '../index.css';

const linkedInProfileUrl = "https://www.linkedin.com/in/diegocoronado0/";
const gitHubProfileUrl = "https://www.github.com/sudoneoox";

export function ParentComponent() {

    const [isVisible, setIsVisible] = useState({
        TextGenerator: true,
        xterm: false,
        about: false,
        contact: false,
        projects:false,
    })

    const showSection = (section: string) => {
        console.log(section);
        setIsVisible(prevState => {
            const updatedState = { ...prevState };
            Object.keys(updatedState).forEach(key => {
                if (key === section) {
                    updatedState[key] = true;
                } else {
                    updatedState[key] = false;
                }
            });
            return updatedState;
        });
    };
    
 

    return (
        <>
             { !isVisible.xterm && (
                <>
            <div className="absolute navigation-links top-0 left-0 m-4" style={{ display: 'flex', gap: '20px'}}>
            <button onClick={() => showSection('xterm')} style={{color:"white", cursor:"pointer", fontFamily:'vt323', fontSize:'2.5vh'}}>xterm</button>
            </div>
            <div className="absolute navigation-links top-0 right-0 m-4" style={{ display: 'flex', gap: '20px'}}>
            <button onClick={() => showSection('TextGenerator')} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>.about()</button>
                <button onClick={() => showSection('projects')} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>.projects()</button>
            <button onClick={() => showSection('contact')} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>.contact()</button> 
                <a href={gitHubProfileUrl} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>
                    <GitHubIcon className="w-6 h-6" />
                </a>
                <a href={linkedInProfileUrl} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>
                <LinkedInIcon className="w-6 h-6"/>
                </a>
            </div>
            </>
             )}

        
            {isVisible.xterm && <Xterm className="h-[50rem] w-full dark:bg-black bg-black  bg-dot-white/[0.3] relative flex items-center justify-center" />}
            {isVisible.TextGenerator && <TextGenerator className="dark:bg-black bg-dot-white/[0.3]  relative font-bold z-20 text-pretty justify-center"/>}
            {/* {isVisible.about && <div className="bg-black text-white">About</div>} */}
            {/* {isVisible.contact && <div className="bg-black text-white">Contact</div>} */}
            {/* {isVisible.projects && <div className="bg-black text-white">Projects</div>} */}
        </>
    );
}
