"client"
import React, { useState, useEffect, useRef, useCallback } from "react";
import '../../index.css';
import {ReactComponent as LinkedInIcon} from '../../assets/icons/linkedin.svg';
import {ReactComponent as GitHubIcon} from '../../assets/icons/github1.svg';

const linkedInProfileUrl = "https://www.linkedin.com/in/diegocoronado0/";
const gitHubProfileUrl = "https://www.github.com/sudoneoox";

export const TextGenerator = ({ className, setIsVisible}) => {
  const [displayString, setDisplayString] = useState("");
  const [initialBuffer, setInitialBuffer] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const appendFlagRef = useRef(true);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        const newDisplayString = generateRandomString(offsetWidth * offsetHeight / 200);
        setDisplayString(newDisplayString);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTextUpdate = useCallback(() => {
    if (appendFlagRef.current && containerRef.current) {
      const chunkSize = 50;
      const newDisplayString = initialBuffer.substring(0, displayString.length + chunkSize);
      setDisplayString(newDisplayString);
      console.log("handle text update", newDisplayString.length, initialBuffer.length);
    } else {
      const chunkSize = 50;
      setDisplayString((currentDisplay) => {
        const start = currentDisplay.substring(chunkSize);
        const end = initialBuffer.substring(start.length, start.length + chunkSize);
        return start + end;
      });
    }
  }, [displayString, initialBuffer]);

  useEffect(() => {
    const handleAnimationFrame = () => {
      handleTextUpdate();
      requestAnimationFrame(handleAnimationFrame);
    };

    const initialBufferValue = generateRandomString(window.innerWidth * window.innerHeight / 200);
    setInitialBuffer(initialBufferValue);
    const intervalId = requestAnimationFrame(handleAnimationFrame);

    return () => cancelAnimationFrame(intervalId);
  }, [handleTextUpdate]);



  return (
    <>
    <div ref={containerRef} className={`${className}`} onClick={setIsVisible} style={{ fontFamily: 'vt323', fontSize: '2.5vh'}}>
      <p className="" style={{ color: 'red'}}>
        {displayString}
      </p>
    </div>
    <div className="absolute navigation-links top-0 right-0 m-4" style={{ display: 'flex', gap: '20px'}}>

      <a href="#" style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>.about()</a>
      <a href="#" style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>.projects()</a>
      <a href="#" style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>.contact()</a> 

      <a href={gitHubProfileUrl} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>
        <GitHubIcon className="w-6 h-6" />
      </a>

      <a href={linkedInProfileUrl} style={{ color: 'white', cursor: 'pointer', fontFamily:'vt323', fontSize:'2.5vh' }}>
      <LinkedInIcon className="w-6 h-6"/>
      </a>
    </div>
      
    <h1 className="hello-im-tag z-20 text-white absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ fontFamily: 'vt323', fontSize: '7vh', fontWeight:'100'}}>Hello, I'm</h1> 
    <h1 className="z-20 text-white absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/8" style={{fontFamily: 'vt323', fontSize: '7vh'}}>Diego</h1>    </>
  );
};

let generateRandomString = (length: number) => {
  const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}[]|;:,.<>?/`~";
  let result:string= "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

