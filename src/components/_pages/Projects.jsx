import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "../_ui/bentogrid.jsx";
import BlobCursor from "../_ui/BlobCursor/BlobCursor.jsx";
import "../../styles/output.css";

const Projects = ({ isDarkMode }) => {
  return (
    <div className="project-container">
      <BlobCursor fillColor={`${isDarkMode ? "#ff9900" : "#00aaff"}`} />
      <BentoGrid>
        <BentoGridItem
          link="google.com"
          image="https://placehold.co/600x400"
          title="Project One"
          description="Lorem Ipsum"
          header={<div className="text-xl font-bold">Header 1</div>}
          icon={<span>📘</span>}
        />

        <BentoGridItem
          image="https://placehold.co/600x400"
          title="Project Two"
          description="Lorem Ipsum"
          header={<div className="text-xl font-bold">Header 2</div>}
          icon={<span>📙</span>}
        />

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
