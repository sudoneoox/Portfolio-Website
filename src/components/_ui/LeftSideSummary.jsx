import { PERSONAL_INFO } from "../_utils/constants.ts";
import { School, Mail, Github, Linkedin, Earth } from "lucide-react";
import { cn } from "../_utils/cn.ts";

const LeftSideSummary = () => {
  return (
    <>
      {" "}
      {/* Sidebar - hidden on mobile */}
      <aside className="hidden lg:block px-10 py-10">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-48 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
            <span className="text-7xl text-zinc-400 dark:text-zinc-500">
              {PERSONAL_INFO.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          {/*Name*/}
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mt-0">
            {PERSONAL_INFO.name}
          </h2>
          {/*Bio*/}
          <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center mt-0 mb-6">
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* Contact Links */}
        <div className="space-y-4 mb-6">
          <SidebarLink icon={Earth} text={PERSONAL_INFO.location} />
          <SidebarLink
            icon={School}
            text={PERSONAL_INFO.university}
            href="https://www.uh.edu"
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
        <div className="space-y-0 mb-2">
          <h3 className="text-md font-bold text-zinc-900 dark:text-white ">
            Education
          </h3>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
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
          <h3 className="text-md font-bold text-zinc-900 dark:text-white">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2 -ml-1 ">
            {PERSONAL_INFO.interests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-sm text-zinc-700 dark:text-zinc-300"
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
