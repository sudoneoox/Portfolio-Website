import { cn } from "../_utils/cn.ts";
import "../../styles/output.css";

export const BentoGrid = ({ className, children }) => {
  return (
    <div className={cn("project-container-bento-grid", className)}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  image,
  link,
  key,
}) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "project-container-bento-grid-item-contain group/bento hover:shadow-xl transition duration-200 space-y-4",
        className,
      )}
      key={key}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {image && (
          <div className="project-container-bento-grid-img-container ">
            <img
              src={image}
              alt={title}
              className="project-container-bento-grid-img-container-img group-hover/bento:scale-105"
            />
          </div>
        )}
        {icon}
        <div className="project-container-bento-grid-item-contain-title">
          {title}
        </div>
        <div className="project-container-bento-grid-item-contain-desc">
          {description}
        </div>
      </div>
    </a>
  );
};
