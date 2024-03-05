import React, { useState, useEffect, useRef, useCallback } from "react";
import TypeWriterEffect from 'react-typewriter-effect';
import '../../index.css';
import { ReactComponent as LinkedInIcon } from '../../assets/icons/linkedin.svg';
import { ReactComponent as GitHubIcon } from '../../assets/icons/github1.svg';

const linkedInProfileUrl = "https://www.linkedin.com/in/diegocoronado0/";
const gitHubProfileUrl = "https://www.github.com/sudoneoox";

export const TextGenerator = ({ className, showContact }) => {
  const [displayString, setDisplayString] = useState("");
  const [initialBuffer, setInitialBuffer] = useState("");
  const contactInfo = `Feel free to reach out to me with any questions or business inquiries. I'm always open to new opportunities and meeting new people. Let's connect!
  
  Email: diegoa2992@gmail.com
  LinkedIn: ${linkedInProfileUrl}
  GitHub: ${gitHubProfileUrl}`;
  const [phase, setPhase] = useState('typing'); // typing, deleting, contactInfo
  const containerRef = useRef<HTMLDivElement>(null);
  const appendFlagRef = useRef(true);



  useEffect(() => {
    if(showContact === true) {
      setPhase('deleting');
    } else {
      setPhase('typing');
    }
  }, [showContact]);

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
    if(phase === 'typing') {
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
    } else if (phase == 'deleting'){
      if (displayString.length > 0) {
        setDisplayString((currentDisplay) => {
          return currentDisplay.substring(0, currentDisplay.length - 200);
        });
      } else {
        setPhase('contactInfo');
      }
    } else {
      const chunkSize = 10;
      const contactinfosubs = contactInfo.substring(0, displayString.length + chunkSize);
      setDisplayString(contactinfosubs);
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


      {/* GENERATED CODE  */}
      <div ref={containerRef} className={`${className}`} style={{ fontFamily: 'vt323', fontSize: '2.5vh' }}>
        {phase !== 'contactInfo' ? (
        <p className="" style={{ color: '#174d25' }}>{displayString}</p>
      ) : (
        <pre style={{ color: 'red', fontFamily: 'vt323', fontSize: '3.5vh' }}>{displayString}</pre>
      )}
      </div>




        {/* TYPEWRITER MIDDLE OF PAGE */}
      <div className='hello-im-tag z-20 text-white absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <TypeWriterEffect
          textStyle={{ fontFamily: 'vt323', fontSize: '7.0vh', color: 'white' }}
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
