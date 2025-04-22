import { cn } from "../_utils/cn.ts";
import "../../styles/output.css";
import { Github, ExternalLink, Youtube } from "lucide-react";


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
  githubLink,
  websiteLink,
  videoLink,
  key,
}) => {
  // Use the main link or githubLink as fallback
  const mainLink = link || githubLink;

  return (
    <div
      className={cn(
        "project-container-bento-grid-item-contain group/bento hover:shadow-xl transition duration-200",
        className,
      )}
      key={key}
    >
      {header && (
        <div className="mb-3">
          {header}
        </div>
      )}

      <div className="group-hover/bento:translate-x-2 transition duration-200 flex-grow">
        {image && (
          <div className="project-container-bento-grid-img-container">
            <img
              src={image}
              alt={title}
              className="project-container-bento-grid-img-container-img group-hover/bento:scale-105"
            />
          </div>
        )}

        <div className="flex items-center gap-2 mb-1">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <div className="project-container-bento-grid-item-contain-title">
            {title}
          </div>
        </div>

        <div className="project-container-bento-grid-item-contain-desc mb-auto pb-3">
          {description}
        </div>

        <div className="project-container-bento-grid-item-links flex mt-auto pt-2 space-x-3 border-t border-zinc-200 dark:border-zinc-700">
          {(githubLink || websiteLink || videoLink) && (
            <div className="project-container-bento-grid-item-links flex mt-auto pt-3 space-x-2 border-t border-zinc-100 dark:border-zinc-800" onClick={(e) => e.stopPropagation()}>
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-full text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors"
                  aria-label={`GitHub repository for ${title}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={18} />
                </a>
              )}

              {websiteLink && (
                <a
                  href={websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-full text-zinc-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors"
                  aria-label={`Live website for ${title}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={18} />
                </a>
              )}

              {videoLink && (
                <a
                  href={videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-full text-zinc-600 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-500 transition-colors"
                  aria-label={`Video demo for ${title}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Youtube size={18} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
