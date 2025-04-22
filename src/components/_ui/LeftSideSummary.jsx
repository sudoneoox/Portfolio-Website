import { PERSONAL_INFO } from "../_utils/constants.ts";
import { School, Mail, Github, Linkedin, Earth } from "lucide-react";
import { cn } from "../_utils/cn.ts";
import "../../styles/output.css";

const LeftSideSummary = () => {
  return (
    <>
      {/* Sidebar - hidden on mobile */}
      <aside className="left-side-summary-container">
        {/* Profile Image */}
        <div className="left-side-summary-container-flex-container">
          <div className="left-side-summary-container-profile-image bg-zinc-100 dark:bg-zinc-800">
            {/* <span className="left-side-summary-container-profile-image-initials text-zinc-400 dark:text-zinc-500"> */}
            {/*   {PERSONAL_INFO.name */}
            {/*     .split(" ") */}
            {/*     .map((n) => n[0]) */}
            {/*     .join("")} */}
            {/* </span> */}
            <img
              src="/assets/images/ProfileImage_optimized.jpg"
              alt={`${PERSONAL_INFO.name} profile`}
              className="left-side-summary-container-profile-image-photo"
            />
          </div>
          {/*Name*/}
          <h2 className="left-side-summary-container-title-name text-zinc-900 dark:text-white">
            {PERSONAL_INFO.name}
          </h2>
          {/*Bio*/}
          <p className="left-side-summary-container-text-bio text-zinc-600 dark:text-zinc-400">
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* Contact Links */}
        <div className="left-side-summary-container-contact-links space-y-6">
          <SidebarLink icon={Earth} text={PERSONAL_INFO.location} />
          <SidebarLink
            icon={School}
            text={PERSONAL_INFO.university}
            href="https://uh.edu/nsm/computer-science"
          />
          <SidebarLink
            icon={Mail}
            text={PERSONAL_INFO.email}
            href={`mailto:${PERSONAL_INFO.email}`}
          />
          <SidebarLink
            icon={Github}
            text="sudoneoox"
            href="https://github.com/sudoneoox"
          />
          <SidebarLink
            icon={Linkedin}
            text="diegocoronado0"
            href="https://linkedin.com/in/diegocoronado0"
          />
        </div>

        {/* Education */}
        <div className="space-y-0">
          <h3 className="left-side-summary-container-semiheaders text-zinc-900 dark:text-white ">
            Education
          </h3>
          <div className="left-side-summary-container-educ-text text-zinc-600 dark:text-zinc-400">
            <p className="font-medium">{PERSONAL_INFO.education.degree}</p>
            <p>
              {PERSONAL_INFO.education.institution}
              {" ("}
              {PERSONAL_INFO.education.period}
              {") "}
            </p>
          </div>
        </div>

        {/* Research Interests */}
        <div className="space-y-2">
          <h3 className="left-side-summary-container-semiheaders text-zinc-900 dark:text-white">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2 ">
            {PERSONAL_INFO.interests.map((interest, index) => (
              <span
                key={index}
                className="left-side-summary-container-interests-text bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

const SidebarLink = ({ icon: Icon, text, href }) => {
  const content = (
    <div
      className={cn(
        "flex items-center space-x-3 text-sm text-zinc-600 dark:text-zinc-400",
        href &&
          "hover:text-zinc-900 dark:hover:text-white transition-colors no-underline",
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{text}</span>
    </div>
  );

  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="block no-underline"
    >
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
};

export default LeftSideSummary;
