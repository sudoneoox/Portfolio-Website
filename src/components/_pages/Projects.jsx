import { BentoGrid, BentoGridItem } from "../_ui/bentogrid.jsx";
import { Github, ExternalLink, Youtube } from "lucide-react";
import { useEffect, useRef } from "react";
import { PROJECTS } from "../_utils/constants.ts";
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
  // Function to render the icon based on the string
  const renderIcon = (iconString) => {
    if (iconString) {
      return <span>{iconString}</span>;
    }
    return null;
  };

  // Function to render the header based on header text
  const renderHeader = (headerText) => {
    if (headerText) {
      return <div className="text-xl font-bold">{headerText}</div>;
    }
    return null;
  };

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
          opacity: 0.7
        }}
      />
      <div className="project-container-content">
        <h1 className="project-container-title">My Projects</h1>
        <BentoGrid>
          {PROJECTS.map((project) => (
            <BentoGridItem
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              icon={renderIcon(project.icon)}
              header={renderHeader(project.headerText)}
              githubLink={project.githubLink}
              websiteLink={project.websiteLink}
              videoLink={project.videoLink}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

export default Projects;
