import React, { useRef, useState, useEffect } from 'react';
import 'winbox/dist/css/winbox.min.css';
import 'winbox/dist/css/themes/modern.min.css';
import 'winbox/dist/css/themes/white.min.css';
import Terminal from 'terminal-in-react';
import WinBox from 'react-winbox';



const SnakeGameCanvas = ({ width = 200, height = 200 }) => {
  const canvasRef = useRef(null);
  let gameOver = false;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let snake = [{x: 10, y: 10}]; // Initial snake position
    let snakeDir = {x: 1, y: 0}; // Initial movement direction
    let food = {x: 5, y: 5}; // Initial food position
    let score = 0;

    const moveSnake = () => {
      const newHead = {x: snake[0].x + snakeDir.x, y: snake[0].y + snakeDir.y};
      snake.unshift(newHead);
      if (snake[0].x === food.x && snake[0].y === food.y) {
        score += 1;
        food = {x: Math.floor(Math.random() * width / 10), y: Math.floor(Math.random() * height / 10)};
      } else {
        snake.pop();
      }
    };

    const checkCollision = () => {
      for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
          gameOver = true;
        }
      }
      if (snake[0].x >= width / 10 || snake[0].x < 0 || snake[0].y >= height / 10 || snake[0].y < 0) {
        gameOver = true;
      }
    };

    const gameLoop = setInterval(() => {
      ctx.clearRect(0, 0, width, height); // Clear canvas
      moveSnake();
      checkCollision();

      // Draw food
      ctx.fillStyle = 'red';
      ctx.fillRect(food.x * 10, food.y * 10, 10, 10);

      // Draw snake
      snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
      });

      if (gameOver) {
        ctx.clearRect(0, 0, width, height);
        clearInterval(gameLoop);
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', width / 3.4 , height / 4 );
        ctx.fillText(`Score: ${score}`, width / 2.9, height / 4 + 30);
      }

    }, 100);

    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowUp': if (snakeDir.y === 0) snakeDir = {x: 0, y: -1}; break;
        case 'ArrowDown': if (snakeDir.y === 0) snakeDir = {x: 0, y: 1}; break;
        case 'ArrowLeft': if (snakeDir.x === 0) snakeDir = {x: -1, y: 0}; break;
        case 'ArrowRight': if (snakeDir.x === 0) snakeDir = {x: 1, y: 0}; break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(gameLoop);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export const Xterm: React.FC<{ className: string }> = ({ className }) => {
  const [ShowInfoWinBox, setShowInfoWinBox] = useState(false);
  const [showContactWinBox, setShowContactWinBox] = useState(false);
  const [showSnakeGameWinBox, setshowSnakeGameWinBox] = useState(false);
  const infoRef = useRef<WinBox>(null);
  const contactRef = useRef<WinBox>(null);
  const renderRef = useRef<WinBox>(null);
  const terminalRef = useRef(null);

  const showInfo = () => setShowInfoWinBox(true);
  const showContact = () => setShowContactWinBox(true);
  const showSnakeGame = () => setshowSnakeGameWinBox(true);

  // This function dynamically adjusts color based on the command
  const executeCommandWithColor = (command, args, print, runCommand, customMessage) => {
    
    const commandsWithColors = {
      show: 'magenta',
      help: 'white',
      else: 'red'
      // Add more commands and their associated colors here
    };

    const color = commandsWithColors[command] || 'white';
    const message = customMessage || args.join(' ');
    const style = {color, fontFamily: 'VT323', fontWeight: '100', fontSize: '2.5vh'};

    // This part simulates the execution of the command. In a real scenario, you would
    // call the actual command function here.
    if (command === 'help') {
      if (terminalRef.current) {
      const messages = message.split('\\');
     
        Object.entries(terminalRef.current.props['descriptions']).forEach(([command, color]) => {
          print(
            <p style={style}>{`${command}: ${color}`}</p>
          );
        });
      }
    } else {
      print(<p style={style}>{message}</p>);
    }
  };
  if(terminalRef.current) console.log(terminalRef.current.style);

  return (
    <>
      {ShowInfoWinBox && (
        <WinBox
          title="About Me"
          ref={infoRef}
          width={500}
          height={300}
          x="center"
          y="center"
          background='black'
          onClose={() => setShowInfoWinBox(false)}

        >
          <p style={{ color: 'black', fontFamily:'VT323', fontSize:'2.5vh' }}>Hello, I'm Diego, a software engineer...</p>
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
          <p style={{ color: 'black', fontFamily:'VT323', fontSize:'2.5vh' }}>Feel free to reach out to me at...</p>
        </WinBox>
      )}
      {showSnakeGameWinBox && (
        <WinBox
          title="Snake Game"
          ref={renderRef}
          width={400}
          height={400}
          x="center"
          y="center"
          background='black'
          onClose={() => setshowSnakeGameWinBox(false)}
        >
          <>
          <SnakeGameCanvas width={400} height={400}/>
          </>
        </WinBox>
      )}
      <div className={`${className}`}>
        <Terminal
          prompt='white'
          outputColor='magenta'
          ref={terminalRef}
          color='white'
          backgroundColor='black'
          barColor='black'
          style={{ fontWeight: "400", fontSize: "2.25vh", fontFamily: "VT323", }}
          commands={{
            info: showInfo,
            contact: showContact,
            snake: showSnakeGame,
            'gui': () => {window.location.reload()},
            help: (args, print, runCommand) => executeCommandWithColor('help', args, print, runCommand, ''),
            show: (args, print, runCommand) => executeCommandWithColor('show', args, print, runCommand, 'Welcome to my portfolio! Type "help" to see the available commands.'),
            debug:()=>{console.log(terminalRef.current)},
            opentab:()=>{if(terminalRef.current) terminalRef.current.createTab();}
          }}
          descriptions={{
            'info': 'shows about me info',
            'contact': 'shows contact info',
            'snake': 'renders a terminal snake game',
            'gui': 'graphical portfolio interface',
            'opentab': 'opens a terminal tab',
          }}
          watchConsoleLogging={true}
          msg='Welcome to my portfolio! Type "help" to see the available commands.'
          startState='maximised'
          actionHandlers={{handleClose: () => window.location.reload()}}
          commandPassThrough={(cmd, print, runCommand) => executeCommandWithColor('else', null, print, null, `-Passed through command: ${cmd} Not found-`)}
          
        />
      </div>
    </>
  );
};
