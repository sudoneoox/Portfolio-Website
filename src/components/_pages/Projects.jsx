import { BentoGrid, BentoGridItem } from "../_ui/bentogrid.jsx";
import { Github, ExternalLink, Youtube } from "lucide-react";
import { useEffect, useRef } from "react";
import "../../styles/output.css";

const Projects = ({ isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];

    // Set canvas to full size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;

        this.color = isDarkMode ?
          `hsla(${Math.random() * 30 + 210}, ${Math.random() * 30 + 50}%, ${Math.random() * 30 + 50}%, ${Math.random() * 0.3 + 0.2})` :
          `hsla(${Math.random() * 30 + 190}, ${Math.random() * 20 + 60}%, ${Math.random() * 20 + 60}%, ${Math.random() * 0.25 + 0.15})`;
      }


      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    const initParticles = () => {
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDarkMode]);

  return (
    <div className="project-container">
      <canvas
        ref={canvasRef}
        className="project-container-canvas"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.7,
          pointerEvents: 'none' // Add this line to make canvas non-interactive
        }}
      />      <div className="project-container-content">
        <h1 className="project-container-title"></h1>
        <BentoGrid>
          <BentoGridItem
            link="https://github.com/username/project1"
            image="https://placehold.co/600x400"
            title="Project One"
            description="Lorem Ipsum dolor sit amet"
            header={<div className="text-xl font-bold">Header 1</div>}
            icon={<span>📘</span>}
            githubLink="https://github.com/username/project1"
            websiteLink="https://project1-demo.com"
            videoLink="https://youtube.com/watch?v=example1"
          />

          <BentoGridItem
            image="https://placehold.co/600x400"
            title="Project Two"
            description="Lorem Ipsum dolor sit amet"
            header={<div className="text-xl font-bold">Header 2</div>}
            icon={<span>📙</span>}
            githubLink="https://github.com/username/project2"
          />

          <BentoGridItem
            image="https://placehold.co/600x400"
            title="Project Three"
            description="Lorem Ipsum dolor sit amet"
            header={<div className="text-xl font-bold">Header 3</div>}
            icon={<span>📗</span>}
            githubLink="https://github.com/username/project3"
            websiteLink="https://project3-demo.com"
          />
        </BentoGrid>
      </div>
    </div>
  );
};

export default Projects;
