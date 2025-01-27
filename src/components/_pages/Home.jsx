import "../../styles/output.css";

import LeftSideSummary from "../_ui/LeftSideSummary.jsx";

const Home = () => {
  return (
    <>
      {/* Container with max width and centered */}
      {/* Grid layout with fixed sidebar and flexible content */}
      <div className="main-content-left-summary">
        <LeftSideSummary />
      </div>
      <div className="main-content-right-summary">
        <AboutMeRightHandSide />
      </div>
    </>
  );
};

const AboutMeRightHandSide = () => {
  return (
    <div className="main-content-right-summary-aboutme-container">
      <h1 className="main-content-right-summary-aboutme-title text-zinc-900 dark:text-white">
        About Me
      </h1>
      <div className="main-content-right-summary-text-contain text-zinc-600 dark:text-zinc-400 space-y-4">
        <p>
          Welcome! I'm a passionate student with a strong interest in
          mathematics and computer science.
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages
        </p>
      </div>
      <h2 className="main-content-right-summary-aboutme-title">
        Skills & Interests
      </h2>
      <div>
        <ul className="main-content-right-summary-list text-zinc-600 dark:text-zinc-400 space-y-4">
          <li>Operating System Development</li>
          <li>Database Design & Optimization</li>
          <li>Programming with C/C++ & Javascript/Typescript</li>
          <li>Problem Solving</li>
          <li>Passion for Cultural Diversity & Exploration</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
