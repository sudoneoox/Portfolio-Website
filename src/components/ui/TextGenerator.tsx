import React, { useState, useEffect, useRef, useCallback } from "react";
import TypeWriterEffect from 'react-typewriter-effect';
import '../../index.css';

const linkedInProfileUrl = "https://www.linkedin.com/in/diegocoronado0/";
const gitHubProfileUrl = "https://www.github.com/sudoneoox";

export const TextGenerator = ({ className, showContact }) => {
  const [displayString, setDisplayString] = useState("");
  const [initialBuffer, setInitialBuffer] = useState("");
  const contactInfo = `
 Feel free to reach out to me with any questions or business inquiries.
 I'm always open to new opportunities and meeting new people. Let's connect!
                                                                             
                                                                          
                                                                           
                                                                  
 
 
  

  
  Email: diegoa2992@gmail.com
  LinkedIn: ${linkedInProfileUrl}
  GitHub: ${gitHubProfileUrl}\n\n\n\n\n\n\n\n\n\n`;

  const [applyPstyle, setApplyPstyle] = useState(false);
  const [phase, setPhase] = useState('typing'); // typing, deleting, contactInfo, reverting
  const containerRef = useRef<HTMLDivElement>(null);
  const appendFlagRef = useRef(true);



  useEffect(() => {
    if(showContact) {
      if(phase !== 'contactInfo') { // Only set to deleting if not already showing contact info
        setPhase('deleting');
      }
    } else {
      if(phase === 'contactInfo' || phase === 'deleting') { // Reset to typing only if needed
        setPhase('reverting'); // Use reverting to clear contact info before typing again
      }
    }
  }, [showContact, phase]);


  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        const newDisplayString = generateRandomString(offsetWidth * offsetHeight / 200);
        setInitialBuffer(newDisplayString);
        if(phase !== 'contactInfo'){
          setDisplayString(newDisplayString);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [phase]);



  const handleTextUpdate = useCallback(() => {
    // console.log(phase)
    if(phase === 'typing') {
      if (appendFlagRef.current && containerRef.current) {
        const chunkSize = 50;
        const newDisplayString = initialBuffer.substring(0, displayString.length + chunkSize);
        setDisplayString(newDisplayString);
        if(!applyPstyle) {
          setApplyPstyle(true);
        }
      } else {
        const chunkSize = 50;
        setDisplayString((currentDisplay) => {
          const start = currentDisplay.substring(chunkSize);
          const end = initialBuffer.substring(start.length, start.length + chunkSize);
          return start + end;
        });
      }
    } else if (phase === 'deleting'){
        setDisplayString((currentDisplay) => {
          return currentDisplay.substring(0, currentDisplay.length - 200);
        });
       if(displayString.length <= 0){
          setPhase('contactInfo');
          setApplyPstyle(false);
      }
    } else if(phase === 'contactInfo'){
      const chunkSize = 10;
      const contactinfosubs = contactInfo.substring(0, displayString.length + chunkSize);
      setDisplayString(contactinfosubs);
    } else if(phase === 'reverting'){
      setDisplayString((currentDisplay) => {
        return currentDisplay.substring(0, currentDisplay.length - 10);
      });
      if(displayString.length <= 0){
        setPhase('typing');
      }
    }
  }, [applyPstyle, contactInfo, displayString.length, initialBuffer, phase]);

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
      <div ref={containerRef} className={`${className}`} style={{ fontFamily: 'vt323' }}>
        {
          phase !== 'contactInfo' ? (
            <p className="" style={{ color: applyPstyle ? '#174d25' : 'red', fontSize: applyPstyle ? '150%' : '250%' }}>
              {displayString}
            </p>
          ) : (
            <pre style={{ color: 'red', fontFamily: 'vt323', fontSize: '225%', whiteSpace: 'pre-wrap' }}>
              {displayString}
            </pre>
          )
        }
      </div>




        {/* TYPEWRITER MIDDLE OF PAGE */}
      <div className='hello-im-tag z-20 text-white absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <TypeWriterEffect
          textStyle={{ fontFamily: 'vt323', fontSize: '500%', color: 'white' }}
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
