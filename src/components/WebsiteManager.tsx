import React, { useState } from "react";
import { TextGenerator } from "./ui/TextGenerator.tsx"; 
import {ReactComponent as LinkedInIcon} from '../assets/icons/linkedin.svg';
import {ReactComponent as GitHubIcon} from '../assets/icons/github1.svg';
import {Projects} from "./ui/Projects.tsx";
import { Xterm } from "./ui/Terminal.tsx";
import '../index.css';

const linkedInProfileUrl = "https://www.linkedin.com/in/diegocoronado0/";
const gitHubProfileUrl = "https://www.github.com/sudoneoox";

export function WebsiteManager() {

    const [currentSection, setCurrentSection] = useState('TextGenerator');
    const [showContact, setShowContact] = useState(false);

    const toggleContactInfo = (isAbout: boolean) => {
        if (isAbout) {
            setShowContact(false); // Directly toggle the state
            console.log("Toggled contact info to: " + !showContact);
        } else {
            setShowContact(true); // Ensure contact info is hidden when navigating away from about section
            console.log("Contact info hidden");
        }
    };
    const showSection = (section: string, isAbout: boolean) => {
        setCurrentSection(section);
        if (section !== 'TextGenerator') {
            setShowContact(false); // Ensure contact info is hidden when navigating away
        }
        else if (section === 'TextGenerator') {
            toggleContactInfo(isAbout);
        }
    };

    
    const openResume = () => { 
        window.open('../../assets/Resume.pdf', '_blank');
    } 


    return (
        <>
            { currentSection !== 'xterm' && (
            <>
                <div className="absolute navigation-links top-0 left-0 m-4" style={{ display: 'flex', gap: '20px'}}>
                <button onClick={() => showSection('xterm', false)} style={{color:"white", cursor:"pointer", fontFamily:'vt323', fontSize:'2.5vh'}}>.xterm()</button>
                </div>


                <div className="absolute navigation-links top-0 right-0 m-4" style={{ display: 'flex', gap: '20px'}}>
                <button onClick={() => showSection('TextGenerator', true)} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>.about()</button>
                <button onClick={()=>  showSection('TextGenerator', false)} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>.contact()</button>
                <button onClick={() => showSection('projects', false)} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>.projects()</button>
                <button onClick={openResume} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>.resume()</button>
                
                    <a href={gitHubProfileUrl} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>
                        <GitHubIcon className="w-6 h-6" />
                    </a>
                    <a href={linkedInProfileUrl} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>
                        <LinkedInIcon className="w-6 h-6"/>
                    </a>
                </div>
            </>
            )}

        
            {currentSection === 'xterm' && <Xterm className="h-[50rem] w-full dark:bg-black bg-black bg-dot-white/[0.3] relative flex items-center justify-center" />}
            {currentSection === 'TextGenerator' && <TextGenerator className="dark:bg-black bg-dot-white/[0.3] relative font-bold z-20 text-pretty justify-center" showContact={showContact} />}
            {currentSection === 'projects' && <div className="w-full h-[50rem] flex items-center justify-center"><Projects /></div>}
        </>
    );
}
