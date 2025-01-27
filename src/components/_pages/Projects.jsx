import React from "react";
import { BentoGrid, BentoGridItem } from "../_ui/bentogrid.jsx";
import "../../styles/output.css";

const Projects = () => {
  return (
    <div className="project-container">
      <BentoGrid>
        {/* Project 1 */}
        <BentoGridItem
          image="https://placehold.co/600x400"
          title="Project One"
          description="Lorem Ipsum"
          header={<div className="text-xl font-bold">Header 1</div>}
          icon={<span>📘</span>}
        />

        {/* Project 2 */}
        <BentoGridItem
          image="https://placehold.co/600x400"
          title="Project Two"
          description="Lorem Ipsum"
          header={<div className="text-xl font-bold">Header 2</div>}
          icon={<span>📙</span>}
        />

        {/* Project 3 */}
        <BentoGridItem
          image="https://placehold.co/600x400"
          title="Project Three"
          description="Lorem Ipsum"
          header={<div className="text-xl font-bold">Header 3</div>}
          icon={<span>📗</span>}
        />
      </BentoGrid>
    </div>
  );
};

export default Projects;
