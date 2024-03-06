import React, { useState, useEffect, useRef, useCallback } from "react";
import TypeWriterEffect from 'react-typewriter-effect';
import '../../index.css';

const linkedInProfileUrl = "https://www.linkedin.com/in/diegocoronado0/";
const gitHubProfileUrl = "https://www.github.com/sudoneoox";

export const TextGenerator = ({ className, showLight }) => {
  const [displayString, setDisplayString] = useState("");
  const [initialBuffer, setInitialBuffer] = useState("");
  const bodyRef = useRef<HTMLBodyElement>(document.body);
  const [phase, setPhase] = useState('typing'); // typing, deleting, rewriting
  const [textStyle, setTextStyle] = useState({ color: '#606643', fontSize: '150%', fontStyle: 'VT323' });
  const [bigText, setBigText] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef(null);
  const transitionCompleteRef = useRef(false);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        const newDisplayString = generateRandomString(offsetWidth * offsetHeight / 200);
        setInitialBuffer(newDisplayString);
        setDisplayString(newDisplayString);
      }
    };
  
    const debouncedHandleResize = debounce(handleResize, 200);
    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  useEffect(() => {
    if (showLight && phase === 'typing' && transitionCompleteRef.current) {
      setPhase('deleting');
      transitionCompleteRef.current = false;
    } else if (!showLight && phase === 'deleting' && transitionCompleteRef.current) {
      setPhase('typing');
      transitionCompleteRef.current = false;
    }
  }, [showLight, phase]);

  const handleTextUpdate = useCallback(() => {
    console.log(phase);
    if (phase === 'deleting') {
      setDisplayString((currentDisplay) => currentDisplay.slice(0, -200));
      console.log(displayString.length);
      if (displayString.length <= 0) {
        setTextStyle({
          color: showLight ? '#2C3E50' : '#C06D44',
          fontSize: '150%',
          fontStyle: 'VT323',
        });
        setBigText(!bigText);
        setPhase('typing');
        bodyRef.current.style.backgroundColor = showLight ? '#0D1926' : '#141414';
        transitionCompleteRef.current = true;
      }
    } else if (phase === 'typing') {
      const chunkSize = 50;
      const newDisplayString = initialBuffer.slice(0, displayString.length + chunkSize);
      setDisplayString(newDisplayString);
      if (displayString.length >= initialBuffer.length) {
        transitionCompleteRef.current = true;
      }
    }
  }, [bigText, displayString.length, initialBuffer, phase, showLight]);

  useEffect(() => {
    const handleAnimationFrame = () => {
      handleTextUpdate();
      animationFrameRef.current = requestAnimationFrame(handleAnimationFrame);
    };
    const initialBufferValue = generateRandomString(window.innerWidth * window.innerHeight / 200);
    setInitialBuffer(initialBufferValue);
    animationFrameRef.current = requestAnimationFrame(handleAnimationFrame);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [handleTextUpdate]);

  return (
    <>
      {/* GENERATED CODE */}
      <div ref={containerRef} className={`${className}`} style={{ fontFamily: 'vt323', ...textStyle }}>
        <p className="">
          {displayString}
        </p>
      </div>
      {/* TYPEWRITER MIDDLE OF PAGE */}
      <div className='hello-im-tag z-20 text-white absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <TypeWriterEffect
          textStyle={{ fontFamily: 'vt323', fontSize: '500%', color: !bigText ? 'white' : '#BBBBBB' }}
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

const generateRandomString = (length: number) => {
  const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}[]|;:,.<>?/`~";
  let result: string = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};