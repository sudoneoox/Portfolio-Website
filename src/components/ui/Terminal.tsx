import React, { useRef, useState, useEffect } from 'react';
import 'winbox/dist/css/winbox.min.css';
import 'winbox/dist/css/themes/modern.min.css';
import 'winbox/dist/css/themes/white.min.css';
import Terminal from 'terminal-in-react';
import WinBox from 'react-winbox';

export const Xterm: React.FC<{ className: string }> = ({ className }) => {
  const [showWinBox, setShowWinBox] = useState(false);
  const [showContactWinBox, setShowContactWinBox] = useState(false);
  const [showRenderWinBox, setShowRenderWinBox] = useState(false);
  const infoRef = useRef<WinBox>(null);
  const contactRef = useRef<WinBox>(null);
  const renderRef = useRef<WinBox>(null);
  const terminalRef = useRef(null);

  const showInfo = () => setShowWinBox(true);
  const showContact = () => setShowContactWinBox(true);
  const showRender = () => setShowRenderWinBox(true);

  // This function dynamically adjusts color based on the command
  const executeCommandWithColor = (command, args, print, runCommand, customMessage) => {
    
    const commandsWithColors = {
      info: 'cyan',
      contact: 'green',
      'open-google': 'blue',
      'type-text': 'magenta',
      show: 'darkgreen',
      // Add more commands and their associated colors here
    };

    const color = commandsWithColors[command] || 'white';
    const message = customMessage || args.join(' ');
    const style = {color, fontFamily: 'VT323', fontWeight: '', fontSize: '2vh'};

    // This part simulates the execution of the command. In a real scenario, you would
    // call the actual command function here.
    setTimeout(() => {
      print(<p style={style}>{message}</p>);
    }, command === 'type-text' ? 100 * args.length : 0);
  };

  return (
    <>
      {showWinBox && (
        <WinBox
          title="About Me"
          ref={infoRef}
          width={500}
          height={300}
          x="center"
          y="center"
          background='black'
          onClose={() => setShowWinBox(false)}
        >
          <p style={{ color: 'black' }}>Hello, I'm Diego, a software engineer...</p>
        </WinBox>
      )}
      {showContactWinBox && (
        <WinBox
          title="Contact"
          ref={contactRef}
          width={500}
          height={300}
          x="center"
          y="center"
          background='black'
          onClose={() => setShowContactWinBox(false)}
        >
          <p style={{ color: 'black' }}>Feel free to reach out to me at...</p>
        </WinBox>
      )}
      {showRenderWinBox && (
        <WinBox
          title="Render ASCII Cube"
          ref={renderRef}
          width={500}
          height={300}
          x="center"
          y="center"
          background='black'
          onClose={() => setShowRenderWinBox(false)}
        >
          {/* Placeholder for ASCII Art or Three.js cube representation */}
          <pre style={{ color: 'lime' }}>
            +---+<br/>
            |\  |\ <br/>
            | +---+<br/>
            +/   /<br/>
             +---+<br/>
          </pre>
        </WinBox>
      )}
      <div className={`${className}`}>
        <Terminal
          outputColor='white'
          ref={terminalRef}
          color='white'
          backgroundColor='black'
          barColor='black'
          style={{ fontWeight: "bold", fontSize: "2vh", fontFamily: "VT323" }}
          commands={{
            popup: () => alert('Terminal in React'),
            info: showInfo,
            contact: showContact,
            render: showRender,
            'type-text': executeCommandWithColor.bind(null, 'type-text'),
            gui: () => {window.location.reload()},
            show: (args, print, runCommand) => executeCommandWithColor('show', args, print, runCommand, 'Welcome to my portfolio! Type "help" to see the available commands.'),
          }}
          description={{
            popup: 'alert',
            info: 'shows about me info',
            contact: 'shows contact info',
            render: 'renders an ASCII art of a Three.js cube',
            'type-text': 'types text incrementally with color',
            gui: 'graphical portfolio interface'
          }}
          msg='Welcome to my portfolio! Type "help" to see the available commands.'
          startState='maximised'
          
        />
      </div>
    </>
  );
};
