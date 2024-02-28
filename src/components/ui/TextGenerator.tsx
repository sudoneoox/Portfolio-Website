import React, { useState, useEffect, useRef, useCallback } from "react";
import TypeWriterEffect from 'react-typewriter-effect';
import '../../index.css';
import {ReactComponent as LinkedInIcon} from '../../assets/icons/linkedin.svg';
import {ReactComponent as GitHubIcon} from '../../assets/icons/github1.svg';

const linkedInProfileUrl = "https://www.linkedin.com/in/diegocoronado0/";
const gitHubProfileUrl = "https://www.github.com/sudoneoox";

export const TextGenerator = ({ className}) => {
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
    <div ref={containerRef} className={`${className}`}  style={{ fontFamily: 'vt323', fontSize: '2.5vh'}}>
      <p className="" style={{ color: '#174d25'}}>
        {displayString}
      </p>
    </div>

    <div className='hello-im-tag z-20 text-white absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
    <TypeWriterEffect
      textStyle={{ fontFamily: 'vt323', fontSize: '7.0vh', color: 'white'}}
      startDelay={100}
      cursorColor="white"
      multiText={[
        'Hello, I\'m Diego',
        'I\'m a student',
        'I\'m a software engineer',
        'I\'m a problem solver',
        'I\'m a team player',
        'Hello, I\'m Diego'
      ]}
      typeSpeed={100}
      hideCursorAfterText={true}
    />
    </div>
    </>
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

